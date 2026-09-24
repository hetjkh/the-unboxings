import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import manifest from '@/public/luxury-catalogue/manifest.json';
import styles from './catalogue.module.css';

export const metadata: Metadata = {
  title: 'Luxury Experience Catalogue 2026 | The Unboxing',
  description: 'Explore our 22-page collection of considered corporate gifting, bespoke packaging, materials and memorable brand experiences. Download the 2026 catalogue.',
  alternates: { canonical: '/catalogue' },
  openGraph: { title: 'The Unboxing — The Collection / 2026', description: 'Not just given. Remembered. Discover the luxury experience catalogue.', url: '/catalogue', images: [{ url: '/luxury-catalogue/previews/page-01.jpg', width: 1280, height: 800, alt: 'The Unboxing luxury catalogue cover' }] },
};
const pdf = '/luxury-catalogue/The-Unboxing-Luxury-Experience-2026.pdf';
const selections = [
  { page: '05', label: '01 / People & relationships', title: 'Recognition that feels personal.', description: 'Employee welcomes, client appreciation and occasions that deserve a considered gesture.' },
  { page: '11', label: '02 / Exceptional objects', title: 'Made to mean something.', description: 'Bespoke recognition pieces and executive gifts, developed around the people behind the achievement.' },
  { page: '16', label: '03 / Materials & craft', title: 'Character in every detail.', description: 'Explore the textures, materials and finishes that bring a distinctive gifting experience to life.' },
  { page: '19', label: '04 / Selected projects', title: 'From an idea to a lasting impression.', description: 'A closer look at considered briefs, bespoke presentation and the moments they create.' },
];
function Arrow({ down = false }: { down?: boolean }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">{down ? <path d="M12 3v13m-5-5 5 5 5-5M4 17v4h16v-4" /> : <path d="M5 12h14m-6-6 6 6-6 6" />}</svg>;
}
export default function CataloguePage() {
  return (
    <div className={styles.catalogue}>
      <a className={styles.skip} href="#collection">Skip to collection</a>
      <header className={styles.header}>
        <Link href="/" className={styles.wordmark} aria-label="The Unboxing home">THE UNBOXING<span>GIFTING, CONSIDERED.</span></Link>
        <nav aria-label="Catalogue navigation"><a href="#inside">Inside the collection</a><Link href="/request-a-quote">Start a project <Arrow /></Link></nav>
      </header>
      <main id="collection">
        <section className={styles.hero} aria-labelledby="catalogue-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span /> The collection / 2026</p>
            <h1 id="catalogue-title">Not just given.<br /><em>Remembered.</em></h1>
            <p className={styles.subtitle}>The luxury experience catalogue</p>
            <p className={styles.description}>A world of thoughtful gifting, beautiful materials and moments made around your brand. Discover what happens when every detail is considered.</p>
            <div className={styles.actions}><a className={styles.primary} href={pdf} download>Download the catalogue <Arrow down /></a><a className={styles.textLink} href="/luxury-catalogue/index.html">Explore all 22 pages <Arrow /></a></div>
            <p className={styles.fileInfo}>PDF FORMAT <span>22 PAGES</span> 2026 EDITION</p>
          </div>
          <div className={styles.heroArt}>
            <span className={styles.artCaption}>A CONSIDERED COLLECTION</span>
            <a href="/luxury-catalogue/index.html" className={styles.cover} aria-label="Open the full catalogue"><Image src="/luxury-catalogue/previews/page-01.jpg" alt="The redesigned catalogue: an ivory and gold title beside a bespoke illuminated gift box" width={1280} height={800} priority /></a>
            <div className={styles.artFooter}><span>THE ART OF A LASTING IMPRESSION</span><span>01 — 22</span></div>
          </div>
        </section>
        <div className={styles.strip}><span>UAE-BASED · WORLDWIDE DELIVERY</span><p>Thoughtful ideas. Beautifully made. <em>Designed around your brand.</em></p></div>
        <section id="inside" className={styles.inside} aria-labelledby="inside-title">
          <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Inside the collection</p><h2 id="inside-title">The gift is only<br /><em>the beginning.</em></h2></div><p>From the first idea to the final reveal, explore the experiences, objects and craftsmanship that make a gift worth remembering.</p></div>
          <div className={styles.chapterList}>{manifest.chapters.map((chapter, index) => <a key={chapter.page} href={`/luxury-catalogue/index.html#page-${chapter.page}`}><span>0{index + 1}</span><h3>{chapter.title}</h3><small>PP. {chapter.pages}</small><Arrow /></a>)}</div>
          <div className={styles.previews}>{selections.map(item => <article key={item.page}><a href={`/luxury-catalogue/index.html#page-${Number(item.page)}`} className={styles.previewImage} aria-label={`View page ${item.page}: ${item.title}`}><Image src={`/luxury-catalogue/previews/page-${item.page}.jpg`} alt={`Catalogue spread: ${item.title}`} width={1280} height={800} sizes="(max-width: 700px) 90vw, 45vw" /><span>View spread <Arrow /></span></a><p className={styles.eyebrow}>{item.label}</p><h3>{item.title}</h3><p className={styles.previewCopy}>{item.description}</p></article>)}</div>
        </section>
        <section className={styles.downloadSection} aria-labelledby="download-title"><p className={styles.eyebrow}>Yours to explore. Yours to share.</p><h2 id="download-title">A little inspiration.<br /><em>A lasting impression.</em></h2><p>Keep the full collection close. Download the catalogue<br className={styles.desktopBreak} /> and discover the possibilities for your next brief.</p><a href={pdf} download className={styles.lightButton}>Download the 2026 catalogue <Arrow down /></a><small>22 PAGES · PDF · NO SIGN-UP REQUIRED</small></section>
      </main>
      <footer className={styles.footer}><Link href="/" className={styles.wordmark}>THE UNBOXING<span>UAE-BASED · WORLDWIDE DELIVERY</span></Link><div><p>Let’s create something worth remembering.</p><a href="mailto:hello@theunboxing.ae">hello@theunboxing.ae <Arrow /></a></div><Link href="/request-a-quote" className={styles.textLink}>Start your brief <Arrow /></Link></footer>
    </div>
  );
}
