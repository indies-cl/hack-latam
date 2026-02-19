/// <reference types="@cloudflare/workers-types" />

interface Env {
  PARTICIPANTS: KVNamespace;
  RATE_LIMIT: KVNamespace;
}

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
}
