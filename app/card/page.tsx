import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import QRCode from "qrcode";
import type { ReactNode } from "react";
import { profile } from "./profile";
import styles from "./card.module.css";

export const metadata: Metadata = {
  title: `${profile.name} | ${profile.company}`,
  description: `Connect with ${profile.name}, ${profile.role} at ${profile.company}. Bespoke gifting, branded merchandise and packaging in Dubai.`,
  alternates: { canonical: "/card" },
  openGraph: {
    title: `${profile.name} | ${profile.company}`,
    description: "Considered gifts. Lasting impressions. Let's create something worth keeping.",
    url: profile.cardUrl,
  },
  twitter: {
    card: "summary",
    title: `${profile.name} | ${profile.company}`,
    description: `Connect with ${profile.name}, ${profile.role}.`,
  },
};

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

const phoneIcon = <Icon><path d="m8 3 2 5-2.5 2a15 15 0 0 0 6.5 6.5l2-2.5 5 2v3a2 2 0 0 1-2 2C9.6 20.4 3.6 14.4 3 5a2 2 0 0 1 2-2Z" /></Icon>;
const emailIcon = <Icon><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></Icon>;
const whatsappIcon = <Icon><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.7A8.5 8.5 0 1 1 20.5 11.7Z" /><path d="m9 7-1 1c-.5 2.8 3.2 6.5 6 6l1-1-2-1-1 1-2-2 1-1Z" /></Icon>;
const websiteIcon = <Icon><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="3.6" ry="9" /><path d="M3 12h18" /></Icon>;
const arrowIcon = <Icon><path d="M6 18 18 6M6 6h12v12" /></Icon>;

const actions = [
  { label: "Call", href: `tel:${profile.phone}`, icon: phoneIcon },
  { label: "Email", href: `mailto:${profile.email}`, icon: emailIcon },
  { label: "WhatsApp", href: profile.whatsapp, icon: whatsappIcon, external: true },
  { label: "Website", href: profile.website, icon: websiteIcon, external: true },
];

export default async function CardPage() {
  const qrCode = await QRCode.toDataURL(profile.cardUrl, {
    errorCorrectionLevel: "M",
    margin: 4,
    width: 240,
    color: { dark: "#242420", light: "#ffffff" },
  });

  return (
    <main className={styles.page}>
      <Link className={styles.wordmark} href="/" aria-label="The Unboxing home">
        <Image src="/The-Unboxing.svg" alt="The Unboxing" width={174} height={25} priority />
      </Link>

      <article className={styles.card} aria-labelledby="card-name">
        <div className={styles.identity}>
          <div className={styles.identityTop}>
            <div className={styles.brand}>
              <svg className={styles.mark} width="43" height="56" viewBox="0 0 64 82" fill="currentColor" aria-hidden="true">
                <path d="M1 15 24 1v51L1 66ZM2 67l22-14 15 9v18l-5 2ZM40 36l24-14v44L40 80Z" />
              </svg>
              <p className={styles.company}>{profile.company}</p>
            </div>
            <span className={styles.eyebrow}>A personal connection</span>
          </div>

          <div className={styles.nameBlock}>
            <h1 id="card-name">{profile.firstName}<br />{profile.lastName}<span className={styles.nameDot}>.</span></h1>
            <p className={styles.role}>{profile.role}</p>
          </div>

          <div className={styles.identityBottom}>
            <span>Considered gifts. Lasting impressions.</span>
            <span className={styles.signature} aria-hidden="true">U.</span>
          </div>
        </div>

        <div className={styles.details}>
          <nav className={styles.actions} aria-label="Connect with Himanshu">
            {actions.map((action) => (
              <a key={action.label} href={action.href} target={action.external ? "_blank" : undefined} rel={action.external ? "noopener noreferrer" : undefined}>
                <span className={styles.actionIcon}>{action.icon}</span>
                <span>{action.label}</span>
              </a>
            ))}
          </nav>

          <div className={styles.contactSection}>
            <div className={styles.contactDetails}>
              <h2>Let&apos;s connect</h2>
              <a href={`tel:${profile.phone}`}>{profile.phoneLabel}</a>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <a className={styles.website} href={profile.website} target="_blank" rel="noopener noreferrer">{profile.websiteLabel}{arrowIcon}</a>
            </div>
            <a className={styles.qr} href={profile.cardUrl} aria-label="Open Himanshu's digital business card">
              <Image src={qrCode} alt="QR code for Himanshu Arora's digital business card" width={96} height={96} unoptimized />
              <span>Scan to connect</span>
            </a>
          </div>

          <a className={styles.saveContact} href="/card/contact" download="Himanshu-Arora.vcf">
            <Icon><path d="M12 3v12m-4-4 4 4 4-4M5 17v4h14v-4" /></Icon>
            <span>Save to contacts</span>
            <span className={styles.savePlus} aria-hidden="true">+</span>
          </a>

          <footer className={styles.cardFooter}>
            <span><span className={styles.locationDot} aria-hidden="true" />Dubai, United Arab Emirates</span>
            <span>Bespoke gifting</span>
          </footer>
        </div>
      </article>

      <p className={styles.endnote}>Something worth keeping.</p>
    </main>
  );
}
