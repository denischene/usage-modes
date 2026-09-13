import type { Mode } from "@/lib/modes";
import graphicDarkAsset from "@/assets/graphic-p-black.png.asset.json";
import microgesteDarkAsset from "@/assets/microgeste-p-black.png.asset.json";
import visionLightAsset from "@/assets/vision-p.svg.asset.json";
import visionPpLightAsset from "@/assets/vision-pp.svg.asset.json";
import vocalLightAsset from "@/assets/vocal-p.svg.asset.json";

/** Modes whose pictos are entirely black (no light/orange detail).
 *  In small card contexts they need a white circular backdrop to stay visible. */
const NEEDS_WHITE_BG = new Set(["vocal-p", "vision-p", "vision-pp", "graphique-p", "moteur-p", "moteur-pp"]);

const DARK_MODE_PICTOS: Record<string, string> = {
  "facile-p": "/pictos-modes/easy-p-black.svg",
  "facile-pp": "/pictos-modes/easy-pp-black.svg",
  "vocal-p": "/pictos-modes/vocal-p-black.png",
  "vision-p": "/pictos-modes/vision-p-black.svg",
  "vision-pp": "/pictos-modes/vision-pp-black.svg",
  "lecture-p": "/pictos-modes/reading-p-black.svg",
  "lecture-pp": "/pictos-modes/reading-pp-black.svg",
  "pointage-p": "/pictos-modes/pointing-p-black.svg",
  "moteur-p": "/pictos-modes/motor-p-black.svg",
  "moteur-pp": "/pictos-modes/motor-pp-black.png",
  "audio-p": "/pictos-modes/audio-p-black.svg",
  "lsf-p": "/pictos-modes/sign-language-p-black.svg",
  "serein-p": "/pictos-modes/serene-p-black.svg",
  "microgeste-p": microgesteDarkAsset.url,
  "graphique-p": graphicDarkAsset.url,
};

const LIGHT_MODE_PICTOS: Record<string, string> = {
  "vocal-p": vocalLightAsset.url,
  "vision-p": visionLightAsset.url,
  "vision-pp": visionPpLightAsset.url,
};

export function ModePicto({ mode, size = "h-16 w-16" }: { mode: Mode; size?: string }) {
  const needsBg = NEEDS_WHITE_BG.has(mode.slug);
  const lightPicto = LIGHT_MODE_PICTOS[mode.slug] ?? mode.picto;
  const image = (
    <picture className="block h-full w-full">
      {DARK_MODE_PICTOS[mode.slug] && <source media="(prefers-color-scheme: dark)" srcSet={DARK_MODE_PICTOS[mode.slug]} />}
      <img src={lightPicto} alt="" className="block h-full w-full object-contain" />
    </picture>
  );
  return (
    <span className={`${size} shrink-0 inline-block`} aria-hidden="true">
      {needsBg ? (
        <span className="grid h-full w-full place-items-center rounded-full bg-white p-1 dark:bg-transparent dark:p-0">
          {image}
        </span>
      ) : (
        image
      )}
    </span>
  );
}
