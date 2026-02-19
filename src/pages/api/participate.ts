import type { APIRoute } from "astro";
import { Context, Data, Effect, Either, Match } from "effect";
import { z } from "zod";

export const prerender = false;

const RATE_LIMIT_WINDOW_S = 3600; // 1 hour
const RATE_LIMIT_MAX = 5;

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "tempmail.com",
  "10minutemail.com",
  "throwaway.email",
  "fakeinbox.com",
  "temp-mail.org",
  "maildrop.cc",
  "yopmail.com",
  "trashmail.com",
  "getnada.com",
  "mailnesia.com",
  "dispostable.com",
  "tempinbox.com",
  "sharklasers.com",
  "guerrillamailblock.com",
  "spam4.me",
  "mail-temporaire.fr",
  "mintemail.com",
  "emailondeck.com",
  "tempail.com",
  "mailcatch.com",
]);

function isDisposableEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  return domain ? DISPOSABLE_DOMAINS.has(domain) : true;
}

const bodySchema = z
  .object({
    name: z
      .string()
      .min(1, "nombre requerido")
      .max(120)
      .transform((s) => s.trim()),
    email: z
      .string()
      .email("email inválido")
      .transform((s) => s.toLowerCase().trim())
      .refine((e) => !isDisposableEmail(e), "email desechable no permitido"),
    country: z
      .string()
      .length(2, "país debe ser código de 2 letras")
      .refine((s) => /^[A-Za-z]{2}$/.test(s), "código de país inválido")
      .transform((s) => s.toUpperCase()),
  })
  .strict();

/** Tagged errors for discriminated handling */
class RuntimeUnavailable extends Data.TaggedError("RuntimeUnavailable")<{}> {}
class RateLimited extends Data.TaggedError("RateLimited")<{}> {}
class InvalidJson extends Data.TaggedError("InvalidJson")<{}> {}
class ValidationFailed extends Data.TaggedError("ValidationFailed")<{
  readonly message: string;
}> {}
class AlreadyRegistered extends Data.TaggedError("AlreadyRegistered")<{}> {}

type ApiError =
  | RuntimeUnavailable
  | RateLimited
  | InvalidJson
  | ValidationFailed
  | AlreadyRegistered;

/** Env service – inject KV bindings instead of prop drilling */
const EnvService = Context.GenericTag<Env>("ParticipateEnv");

function toResponse(error: ApiError): Response {
  return Match.value(error).pipe(
    Match.tag("RuntimeUnavailable", () =>
      jsonResponse(500, "servicio no disponible, intenta más tarde"),
    ),
    Match.tag("RateLimited", () =>
      jsonResponse(429, "demasiados intentos, intenta más tarde"),
    ),
    Match.tag("InvalidJson", () =>
      jsonResponse(400, "datos inválidos"),
    ),
    Match.tag("ValidationFailed", (e) => jsonResponse(400, e.message)),
    Match.tag("AlreadyRegistered", () =>
      jsonResponse(409, "ya estás registrado"),
    ),
    Match.exhaustive,
  );
}

function jsonResponse(status: number, message: string): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function getClientIp(request: Request): string {
  return (
    request.headers.get("CF-Connecting-IP") ??
    request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

function checkRateLimit(
  ip: string,
): Effect.Effect<
  { rl: number; rlKey: string },
  RateLimited | RuntimeUnavailable,
  Env
> {
  return Effect.gen(function* () {
    const env = yield* EnvService;
    const rlKey = `rl:${ip}`;
    return yield* Effect.tryPromise({
      try: () =>
        env.RATE_LIMIT.get(rlKey).then((rlRaw) => {
          const rl = rlRaw ? Number.parseInt(rlRaw, 10) : 0;
          if (rl >= RATE_LIMIT_MAX) throw new RateLimited();
          return { rl, rlKey };
        }),
      catch: (e) =>
        e instanceof RateLimited ? e : new RuntimeUnavailable(),
    });
  });
}

function parseBody(request: Request): Effect.Effect<unknown, InvalidJson> {
  return Effect.tryPromise({
    try: () => request.json(),
    catch: () => new InvalidJson(),
  });
}

type BodyData = z.infer<typeof bodySchema>;

function validateBody(body: unknown): Effect.Effect<BodyData, ValidationFailed> {
  const parsed = bodySchema.safeParse(body);
  return parsed.success
    ? Effect.succeed(parsed.data)
    : Effect.fail(
        new ValidationFailed({
          message: parsed.error.issues[0]?.message ?? "datos inválidos",
        }),
      );
}

function saveParticipant(
  rl: number,
  rlKey: string,
  data: BodyData,
): Effect.Effect<void, AlreadyRegistered | RuntimeUnavailable, Env> {
  return Effect.gen(function* () {
    const env = yield* EnvService;
    const participantKey = `participant:${data.email}`;
    yield* Effect.tryPromise({
      try: async () => {
        const existing = await env.PARTICIPANTS.get(participantKey);
        if (existing) throw new AlreadyRegistered();
        const record = {
          name: data.name,
          email: data.email,
          country: data.country,
          createdAt: new Date().toISOString(),
        };
        await env.PARTICIPANTS.put(participantKey, JSON.stringify(record));
        const rlOptions: { expirationTtl?: number } =
          rl === 0 ? { expirationTtl: RATE_LIMIT_WINDOW_S } : {};
        await env.RATE_LIMIT.put(rlKey, String(rl + 1), rlOptions);
      },
      catch: (e) =>
        e instanceof AlreadyRegistered ? e : new RuntimeUnavailable(),
    });
  });
}

export const POST: APIRoute = async (context) => {
  const { request, locals } = context;
  const runtime = locals.runtime;

  const env = runtime?.env;
  if (!env) {
    return toResponse(new RuntimeUnavailable());
  }

  const program = Effect.gen(function* () {
    const ip = getClientIp(request);
    const { rl, rlKey } = yield* checkRateLimit(ip);
    const body = yield* parseBody(request);
    const data = yield* validateBody(body);
    yield* saveParticipant(rl, rlKey, data);
  }).pipe(Effect.provideService(EnvService, env));

  const result = await Effect.runPromise(Effect.either(program));

  return Either.match(result, {
    onLeft: toResponse,
    onRight: () =>
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
  });
};
