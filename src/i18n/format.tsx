import { Fragment, type ReactNode } from "react";

/** fill("จาก {count} รีวิว", { count: 10 }) → "จาก 10 รีวิว" */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}

/**
 * Renders [[text]] as a non-breaking span. Browsers' Thai word-breaking doesn't know
 * local names like "ถนนนิตโย", so dictionary strings mark the words that must stay whole.
 */
export function rich(text: string): ReactNode {
  return text.split(/(\[\[.+?\]\])/).map((part, i) =>
    part.startsWith("[[") ? (
      <span key={i} className="whitespace-nowrap">
        {part.slice(2, -2)}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

/** Same text with the [[ ]] markers removed, for metadata and aria labels. */
export function plain(text: string): string {
  return text.replace(/\[\[(.+?)\]\]/g, "$1");
}
