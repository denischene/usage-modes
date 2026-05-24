import type { Mode } from "@/lib/modes";

/** Modes whose pictos are entirely black (no light/orange detail).
 *  In small card contexts they need a white circular backdrop to stay visible. */
const NEEDS_WHITE_BG = new Set(["vocal-p", "vision-p", "vision-pp", "graphique-p", "moteur-p", "moteur-pp"]);

export function ModePicto({ mode, size = "h-16 w-16" }: { mode: Mode; size?: string }) {
  const needsBg = NEEDS_WHITE_BG.has(mode.slug);
  return (
    <span className={`${size} shrink-0 inline-block`} aria-hidden="true">
      {needsBg ? (
        <span className="grid h-full w-full place-items-center rounded-full bg-background p-1">
          <img src={mode.picto} alt="" className="h-full w-full object-contain" />
        </span>
      ) : (
        <img src={mode.picto} alt="" className="h-full w-full object-contain" />
      )}
    </span>
  );
}
