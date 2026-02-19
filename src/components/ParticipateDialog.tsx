import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import type { Country } from "country-list";

const STORAGE_KEY = "participate-waitlist";

interface Props {
  countries: readonly Country[];
  content: any; // Using any for simplicity as it's a deep object from i18n
}

const inputClass =
  "w-full p-4 border border-ui-2 bg-bg-2 font-serif placeholder:text-tx-3 rounded-none";
const optionClass =
  "p-4 border-b border-ui-2 last:border-b-0 cursor-pointer data-[focus]:bg-bg-2 data-[selected]:border-ui-3";

export default function ParticipateDialog({ countries, content }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [savedName, setSavedName] = useState<string | null>(null);
  const [addingSomeoneElse, setAddingSomeoneElse] = useState(false);
  const [selected, setSelected] = useState<Country | null>(null);
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw) as { name?: string };
        if (typeof data.name === "string" && data.name.trim() !== "") {
          setSavedName(data.name.trim());
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const canSubmit =
    name.trim() !== "" && email.trim() !== "" && selected !== null;

  const filtered =
    query === ""
      ? countries
      : countries.filter((c) =>
          c.name.toLowerCase().includes(query.toLowerCase()),
        );

  useEffect(() => {
    const h = () => setIsOpen(true);
    window.addEventListener("participate-open", h);
    return () => window.removeEventListener("participate-open", h);
  }, []);

  const close = () => {
    setIsOpen(false);
    setSubmitted(false);
    setAddingSomeoneElse(false);
    setError(null);
  };

  return (
    <div className="bg-bg-2">
      <div className="flex flex-col gap-4 items-center justify-center p-8 max-w-2xl text-balance text-center mx-auto">
        <p className="text-2xl text-balance text-center font-sans">
          {content.title}
        </p>
        <p className="text-tx-2" dangerouslySetInnerHTML={{ __html: content.subtitle }} />
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="bg-tx hover:bg-[#fff] text-bg py-4 px-8 border border-ui rounded-none font-serif"
        >
          {content.button}
        </button>
      </div>

      <Dialog open={isOpen} onClose={close} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-8 bg-bg/80">
          <DialogPanel className="normal-case p-0 border border-ui bg-bg text-tx text-xl font-serif rounded-none w-full max-w-lg min-w-[320px]">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setError(null);
                setLoading(true);
                try {
                  const res = await fetch("/api/participate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      name: name.trim(),
                      email: email.trim(),
                      country: selected?.code ?? "",
                    }),
                  });
                  const data = (await res.json().catch(() => ({}))) as {
                    error?: string;
                    code?: string;
                  };
                  if (!res.ok) {
                    const errs = content.errors as Record<string, string>;
                    const codeKey =
                      data.code &&
                      data.code
                        .split("_")
                        .map((s, i) =>
                          i === 0
                            ? s.toLowerCase()
                            : s.charAt(0).toUpperCase() + s.slice(1).toLowerCase(),
                        )
                        .join("");
                    const msg =
                      (codeKey && errs[codeKey]) ?? data.error ?? errs.generic;
                    setError(msg);
                    return;
                  }
                  const trimmed = name.trim();
                  localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify({ name: trimmed }),
                  );
                  setSavedName(trimmed);
                  setSubmitted(true);
                } finally {
                  setLoading(false);
                }
              }}
              className="p-4 space-y-4 w-full min-w-0"
            >
              {submitted ? (
                <div className="space-y-4">
                  <DialogTitle className="font-sans text-2xl">
                    {content.successTitle}
                  </DialogTitle>
                  <Description
                    className="font-serif font-normal text-tx-2 space-y-4 block"
                    dangerouslySetInnerHTML={{
                      __html: content.successMessage.replace(
                        /\[(.*?)\]\((.*?)\)/g,
                        '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-tx underline font-sans">$1</a>',
                      ),
                    }}
                  />
                  <button
                    type="button"
                    onClick={close}
                    className="w-full py-4 px-8 border border-ui rounded-none"
                  >
                    {content.form.cancel === "Cancelar" ? "Cerrar" : "Close"}
                  </button>
                </div>
              ) : savedName && !addingSomeoneElse ? (
                <div className="space-y-4">
                  <DialogTitle className="font-sans text-2xl">
                    {content.alreadyRegisteredTitle.replace("{name}", savedName)}
                  </DialogTitle>
                  <Description className="font-serif font-normal text-tx-2 space-y-4 block">
                    {content.alreadyRegisteredMessage.split("[")[0]}
                    <button
                      type="button"
                      onClick={() => {
                        setAddingSomeoneElse(true);
                        setName("");
                        setEmail("");
                        setSelected(null);
                        setQuery("");
                      }}
                      className="text-tx underline font-sans"
                    >
                      {content.alreadyRegisteredMessage.match(/\[(.*?)\]/)?.[1] || "haz clic aquí"}
                    </button>
                    {content.alreadyRegisteredMessage.split("]")[1]?.split(")")[1] || ""}
                  </Description>
                  <button
                    type="button"
                    onClick={close}
                    className="w-full py-4 px-8 border border-ui font-serif rounded-none"
                  >
                    {content.form.cancel === "Cancelar" ? "Cerrar" : "Close"}
                  </button>
                </div>
              ) : (
                <>
                  <DialogTitle className="font-sans text-2xl">
                    {content.dialogTitle}
                  </DialogTitle>
                  <Description
                    className="font-serif font-normal text-tx-2"
                    dangerouslySetInnerHTML={{ __html: content.dialogSubtitle }}
                  />
                  {error && (
                    <p className="font-serif text-og" role="alert">
                      {error}
                    </p>
                  )}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <label className="block space-y-4">
                        <span className="font-sans block">{content.form.name}</span>
                        <input
                          type="text"
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={content.form.namePlaceholder}
                          className={inputClass}
                        />
                      </label>
                      <label className="block space-y-4">
                        <span className="font-sans block">{content.form.email}</span>
                        <input
                          type="email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={content.form.emailPlaceholder}
                          className={inputClass}
                        />
                      </label>
                    </div>
                    <label className="block space-y-4">
                      <span className="font-sans block">{content.form.country}</span>
                      <input
                        type="hidden"
                        name="country"
                        value={selected?.code ?? ""}
                      />
                      <Combobox
                        value={selected}
                        onChange={setSelected}
                        onClose={() => setQuery("")}
                        by="code"
                      >
                        <ComboboxInput
                          displayValue={(c: Country | null) => c?.name ?? ""}
                          onChange={(e) => setQuery(e.target.value)}
                          placeholder={content.form.countryPlaceholder}
                          className={inputClass}
                          aria-label="país"
                        />
                        <ComboboxOptions
                          anchor={false}
                          className="z-60 mt-4 w-full max-h-60 overflow-auto border border-ui-2 bg-bg-2 rounded-none empty:invisible"
                        >
                          {filtered.map((c) => (
                            <ComboboxOption
                              key={c.code}
                              value={c}
                              className={optionClass}
                            >
                              {c.name}
                            </ComboboxOption>
                          ))}
                        </ComboboxOptions>
                      </Combobox>
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <button
                      type="button"
                      onClick={close}
                      className="py-4 px-8 font-serif rounded-none"
                    >
                      {content.form.cancel}
                    </button>
                    <button
                      type="submit"
                      disabled={!canSubmit || loading}
                      className="bg-tx text-bg py-4 px-8 border border-ui font-serif rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? content.form.loading : content.form.submit}
                    </button>
                  </div>
                </>
              )}
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
