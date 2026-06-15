import { useEffect, useState } from "react";

export function RuleImage({ src, alt: _alt, caption }: { src: string; alt?: string; caption: string }) {
  // Images de règles considérées comme décoratives : pas d'alternative textuelle.
  const alt = "";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full cursor-zoom-in bg-surface focus-visible:outline-3 focus-visible:outline-primary"
        aria-label={`Agrandir l'illustration : ${caption}`}
      >
        <img src={src} alt={alt} loading="lazy" className="block h-auto w-full" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Illustration agrandie : ${caption}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-4"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 bg-primary px-4 py-2 font-bold text-primary-foreground"
            aria-label="Fermer l'aperçu"
          >
            Fermer ✕
          </button>
          <img
            src={src}
            alt={alt}
            className="max-h-[90vh] max-w-[95vw] object-contain bg-background"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
