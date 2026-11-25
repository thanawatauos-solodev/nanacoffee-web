type JsonLdData = Record<string, unknown>;

/**
 * Serializes schema.org data for a <script type="application/ld+json"> tag.
 * Escaping <, >, & and the JS line separators means no value can close the script
 * element or be parsed as HTML (the sanitizing step the Next.js JSON-LD guide asks for).
 */
function serialize(data: JsonLdData): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

/**
 * Structured data for search engines. Only pass objects built from our own config and
 * catalog (see `features/*\/structured-data.ts`), never raw user input.
 */
export function JsonLd({ data }: { data: JsonLdData }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serialize(data) }} />;
}
