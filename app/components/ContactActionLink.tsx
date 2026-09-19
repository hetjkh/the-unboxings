"use client";

type ContactActionLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Prefer native <a href> behavior for mailto/tel — Safari/macOS often ignores
 * window.location.href = "mailto:..." after preventDefault.
 */
export default function ContactActionLink({ href, children, className }: ContactActionLinkProps) {
  const isHttp = /^https?:\/\//i.test(href);

  return (
    <a
      href={href}
      className={className}
      data-lenis-prevent
      target={isHttp ? "_blank" : undefined}
      rel={isHttp ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}
