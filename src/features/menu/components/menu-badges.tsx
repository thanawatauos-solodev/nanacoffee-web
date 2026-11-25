"use client";

import { Flame } from "lucide-react";
import { fill } from "@/i18n/format";
import { useI18n } from "@/i18n/client";
import { cn } from "@/lib/cn";
import type { MenuItem, MenuTag } from "../types";

const tagStyles: Record<MenuTag, string> = {
  signature: "bg-caramel/14 text-caramel-deep",
  bestseller: "bg-leaf/12 text-leaf",
  new: "bg-chili/10 text-chili",
};

export function MenuBadges({ item, className }: { item: MenuItem; className?: string }) {
  const { t } = useI18n();
  if (!item.tags?.length && !item.spicy) return null;
  const spicyLabel = item.spicy ? fill(t.menu.spicy, { level: item.spicy }) : "";
  return (
    <div className={cn("flex flex-wrap items-center gap-1.5", className)}>
      {item.tags?.map((tag) => (
        <span key={tag} className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold leading-4", tagStyles[tag])}>
          {t.menu.tags[tag]}
        </span>
      ))}
      {item.spicy ? (
        <span className="inline-flex items-center text-chili" title={spicyLabel}>
          {Array.from({ length: item.spicy }, (_, i) => (
            <Flame key={i} size={13} strokeWidth={2.2} className="-mx-[1px] fill-chili/25" aria-hidden />
          ))}
          <span className="sr-only">{spicyLabel}</span>
        </span>
      ) : null}
    </div>
  );
}
