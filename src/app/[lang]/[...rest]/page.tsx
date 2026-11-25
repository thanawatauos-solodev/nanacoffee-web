import { notFound } from "next/navigation";

/** Any unknown path inside a language renders that language's not-found page, inside the site layout. */
export default function CatchAll() {
  notFound();
}
