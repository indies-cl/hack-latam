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
}

const inputClass =
  "w-full p-4 border border-ui-2 bg-bg-2 font-serif placeholder:text-tx-3 rounded-none";
const optionClass =
  "p-4 border-b border-ui-2 last:border-b-0 cursor-pointer data-[focus]:bg-bg-2 data-[selected]:border-ui-3";

export default function ParticipateDialog({ countries }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [savedName, setSavedName] = useState<string | null>(null);
  const [addingSomeoneElse, setAddingSomeoneElse] = useState(false);
  const [selected, setSelected] = useState<Country | null>(null);
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
  };

  return (
    <>
      <div className="flex flex-col gap-4 items-center justify-center">
        <p className="text-2xl text-balance text-center font-sans">
          ¿Quieres participar en la hackathon de impacto social más grande de
          América Latina?
        </p>
        <p className="text-tx-2">
          Finales de abril 2026. Remoto desde cualquier país del mundo.
        </p>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="bg-tx text-bg py-4 px-16 border border-ui rounded-none font-serif"
        >
          Quiero participar
        </button>
      </div>

      <Dialog open={isOpen} onClose={close} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-bg/80">
          <DialogPanel className="normal-case p-0 border border-ui bg-bg text-tx text-xl font-serif rounded-none w-full max-w-lg min-w-[320px]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                try {
                  const trimmed = name.trim();
                  localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify({ name: trimmed }),
                  );
                  setSavedName(trimmed);
                } catch {
                  // ignore
                }
                setSubmitted(true);
              }}
              className="p-4 space-y-4 w-full min-w-0"
            >
              {submitted ? (
                <div className="space-y-4">
                  <DialogTitle className="font-sans text-2xl">
                    Gracias
                  </DialogTitle>
                  <Description className="font-serif font-normal text-tx-2 space-y-4 block">
                    La hackathon aún no tiene fecha definida. Te enviaremos un
                    email cuando tengamos una fecha clara, con los premios y más
                    información.
                    <br />
                    <br />
                    Mientras tanto, puedes unirte al{" "}
                    <a
                      href="https://indies.la"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-tx underline font-sans"
                    >
                      Discord de indies.la
                    </a>{" "}
                    para compartir con gente construyendo cosas cool para
                    internet.
                  </Description>
                  <button
                    type="button"
                    onClick={close}
                    className="w-full py-4 px-8 border border-ui rounded-none"
                  >
                    Cerrar
                  </button>
                </div>
              ) : savedName && !addingSomeoneElse ? (
                <div className="space-y-4">
                  <DialogTitle className="font-sans text-2xl">
                    Hola {savedName}
                  </DialogTitle>
                  <Description className="font-serif font-normal text-tx-2 space-y-4 block">
                    Ya te agregamos a la waitlist. Si tienes a alguien más que
                    quiera unirse,{" "}
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
                      haz clic aquí
                    </button>
                    .
                  </Description>
                  <button
                    type="button"
                    onClick={close}
                    className="w-full py-4 px-8 border border-ui font-serif rounded-none"
                  >
                    Cerrar
                  </button>
                </div>
              ) : (
                <>
              <DialogTitle className="font-sans text-2xl">
                :)
              </DialogTitle>
              <Description className="font-serif font-normal text-tx-2">
                Se realizará a finales de abril 2026. <br /> Remoto desde cualquier país del mundo.
              </Description>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block space-y-1">
                    <span className="font-sans block">
                      Nombre o Apodo
                    </span>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="¿Cómo te llamamos?"
                      className={inputClass}
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="font-sans block">Email</span>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rene@indies.cl"
                      className={inputClass}
                    />
                  </label>
                </div>
                <label className="block space-y-1">
                  <span className="font-sans block">País</span>
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
                      placeholder="¿De dónde en este mundo tan amplio?"
                      className={inputClass}
                      aria-label="país"
                    />
                    <ComboboxOptions
                      anchor={false}
                      className="z-60 mt-1 w-full max-h-60 overflow-auto border border-ui-2 bg-bg-2 rounded-none empty:invisible"
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
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="bg-tx text-bg py-4 px-8 border border-ui font-serif rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Enviar
                </button>
              </div>
                </>
              )}
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
