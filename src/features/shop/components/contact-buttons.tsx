import { MessageCircle, Navigation, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { buttonStyles, type ButtonSize, type ButtonVariant } from "@/components/ui/button";
import { fill } from "@/i18n/format";
import { getDictionary } from "@/i18n/server";
import { lineUrl, siteConfig } from "@/lib/site-config";

type ContactButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: ReactNode;
};

/** Ordering happens by phone or LINE, so these are the site's main calls to action. */
export async function CallButton({ variant = "primary", size = "lg", className, children }: ContactButtonProps) {
  const t = await getDictionary();
  return (
    <a href={siteConfig.phone.href} className={buttonStyles({ variant, size, className })}>
      <Phone size={18} aria-hidden />
      {children ?? fill(t.contact.call, { phone: siteConfig.phone.display })}
    </a>
  );
}

/** Renders nothing until a LINE Official Account is set in site-config. */
export async function LineButton({ variant = "line", size = "lg", className, children }: ContactButtonProps) {
  if (!lineUrl) return null;
  const t = await getDictionary();
  return (
    <a href={lineUrl} target="_blank" rel="noopener noreferrer" className={buttonStyles({ variant, size, className })}>
      <MessageCircle size={18} aria-hidden />
      {children ?? t.contact.line}
    </a>
  );
}

export async function DirectionsButton({ variant = "dark", size = "lg", className, children }: ContactButtonProps) {
  const t = await getDictionary();
  return (
    <a
      href={siteConfig.maps.directionsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonStyles({ variant, size, className })}
    >
      <Navigation size={18} aria-hidden />
      {children ?? t.contact.directions}
    </a>
  );
}
