"use client";

import "@photo-sphere-viewer/core/index.css";
import type { PanoramaOptions, Viewer, ViewerConfig } from "@photo-sphere-viewer/core";
import { ChevronLeft, ChevronRight, Move } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/client";
import { fill } from "@/i18n/format";
import { cn } from "@/lib/cn";
import type { TourSpot } from "../data/tour";

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * The 360° viewer (Photo Sphere Viewer on three.js) and the spots to walk between.
 * The viewer's code is fetched only on this page, after hydration. Until it draws, and without
 * JavaScript, the first spot's photo shows flat behind it as a poster.
 */
export function TourViewer({ spots }: { spots: readonly TourSpot[] }) {
  const { locale, t } = useI18n();
  const labels = t.tour.viewer;
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  // The spot to open with, should the viewer be created again (e.g. React's dev double-mount).
  const indexRef = useRef(0);
  const [index, setIndex] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const spot = spots[index];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let cancelled = false;
    let viewer: Viewer | undefined;

    Promise.all([
      import("@photo-sphere-viewer/core"),
      import("@photo-sphere-viewer/gyroscope-plugin"),
      import("@photo-sphere-viewer/autorotate-plugin"),
    ])
      .then(([{ Viewer }, { GyroscopePlugin }, { AutorotatePlugin }]) => {
        if (cancelled) return;
        const reduceMotion = prefersReducedMotion();
        const plugins: NonNullable<ViewerConfig["plugins"]> = [[GyroscopePlugin, {}]];
        if (!reduceMotion) {
          // Slow turn while nobody is touching it, so the page feels alive.
          plugins.push([AutorotatePlugin, { autostartDelay: 2500, autostartOnIdle: true, autorotateSpeed: "1rpm", autorotatePitch: 0 }]);
        }
        viewer = new Viewer({
          container,
          panorama: spots[indexRef.current].image,
          plugins,
          navbar: reduceMotion ? ["zoom", "gyroscope", "fullscreen"] : ["autorotate", "zoom", "gyroscope", "fullscreen"],
          lang: labels,
          loadingTxt: labels.loading,
          defaultZoomLvl: 0,
          moveInertia: !reduceMotion,
          // Scrolling the page over the viewer scrolls the page; Ctrl + scroll zooms.
          mousewheelCtrlKey: true,
        });
        viewerRef.current = viewer;
      })
      .catch((error: unknown) => console.error("[tour] The 360° viewer failed to start", error));

    return () => {
      cancelled = true;
      viewer?.destroy();
      viewerRef.current = null;
    };
  }, [spots, labels]);

  function goTo(next: number) {
    const target = (next + spots.length) % spots.length;
    if (target === index) return;
    indexRef.current = target;
    setIndex(target);
    const options: PanoramaOptions = {
      position: { yaw: 0, pitch: 0 },
      zoom: 0,
      showLoader: true,
      transition: prefersReducedMotion() ? false : { speed: 1500, rotation: false, effect: "fade" },
    };
    viewerRef.current?.setPanorama(spots[target].image, options).catch(() => {
      // The viewer shows its own "couldn't be loaded" message.
    });
  }

  const several = spots.length > 1;
  const stepButton =
    "grid size-11 shrink-0 place-items-center rounded-full bg-foam text-roast shadow-soft ring-1 ring-roast/8 transition-colors hover:bg-oat";

  return (
    <div>
      <div
        role="region"
        aria-label={fill(t.tour.viewerLabel, { name: spot.name[locale] })}
        onPointerDown={() => setInteracted(true)}
        className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-espresso bg-cover bg-center shadow-lift ring-1 ring-roast/10 sm:aspect-video"
        style={{ backgroundImage: `url(${spots[0].image})` }}
      >
        <div ref={containerRef} className="absolute inset-0" />
        <p className="pointer-events-none absolute left-4 top-4 z-[100] rounded-full bg-foam/90 px-3.5 py-1.5 text-sm font-semibold text-espresso shadow-soft">
          {spot.name[locale]}
        </p>
        <p
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-16 z-[100] mx-auto flex w-fit items-center gap-2 rounded-full bg-espresso/75 px-4 py-2 text-sm text-cream transition-opacity duration-500",
            interacted && "opacity-0",
          )}
        >
          <Move size={16} />
          {t.tour.hint}
        </p>
      </div>

      <div className="mt-5 flex items-start gap-3">
        {several ? (
          <button type="button" onClick={() => goTo(index - 1)} aria-label={t.tour.previous} className={stepButton}>
            <ChevronLeft size={20} />
          </button>
        ) : null}
        <div className="min-w-0 flex-1" aria-live="polite">
          {several ? (
            <p className="text-xs font-medium text-mocha">{fill(t.tour.spotOf, { index: index + 1, total: spots.length })}</p>
          ) : null}
          <h2 className="text-2xl font-semibold text-espresso">{spot.name[locale]}</h2>
          {spot.description[locale] ? <p className="mt-1 text-[15px] text-mocha">{spot.description[locale]}</p> : null}
        </div>
        {several ? (
          <button type="button" onClick={() => goTo(index + 1)} aria-label={t.tour.next} className={stepButton}>
            <ChevronRight size={20} />
          </button>
        ) : null}
      </div>

      {several ? (
        <div
          role="group"
          aria-label={t.tour.spotsLabel}
          className="no-scrollbar -mx-4 mt-5 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {spots.map((item, i) => {
            const active = i === index;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => goTo(i)}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-full py-2 pl-2 pr-4 text-sm font-medium ring-1 transition-colors",
                  active ? "bg-espresso text-cream ring-espresso" : "bg-foam text-roast ring-roast/10 hover:bg-oat",
                )}
              >
                <span className={cn("grid size-6 place-items-center rounded-full text-xs", active ? "bg-cream/15" : "bg-oat")}>
                  {i + 1}
                </span>
                {item.name[locale]}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
