"use client";

import { useEffect, useId, useRef } from "react";
import styles from "./BriefSubmissionSuccess.module.css";

export default function BriefSubmissionSuccess({ onReset }: { onReset: () => void }) {
  const headingId = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <section className={styles.card} aria-labelledby={headingId}>
      <div className={styles.topline}>
        <span>The Unboxing</span>
        <span className={styles.received}><span aria-hidden="true" />Brief received</span>
      </div>

      <div className={styles.main}>
        <div className={styles.seal} aria-hidden="true">
          <svg viewBox="0 0 144 144" fill="none">
            <circle className={styles.outerRing} cx="72" cy="72" r="59" />
            <circle className={styles.innerRing} cx="72" cy="72" r="47" />
            <circle className={styles.disc} cx="72" cy="72" r="34" />
            <path className={styles.check} pathLength="1" d="m58 72 9 9 20-20" />
            <g className={styles.sparkles}>
              <path d="M119 22v10m-5-5h10M22 101v8m-4-4h8" />
              <circle cx="32" cy="29" r="2" fill="currentColor" stroke="none" />
              <circle cx="112" cy="116" r="2" fill="currentColor" stroke="none" />
            </g>
          </svg>
        </div>
        <p className={styles.eyebrow}>Thank you for the inspiration</p>
        <h3 ref={headingRef} id={headingId} tabIndex={-1} aria-label="Brief received. Good things start here." className={styles.title}>
          Good things<br />start here.
        </h3>
        <p className={styles.description}>
          Your brief is with our team. We can&apos;t wait to<br className={styles.desktopBreak} /> turn your ideas into something worth keeping.
        </p>
      </div>

      <div className={styles.next}>
        <div className={styles.timing}>
          <span className={styles.eyebrow}>What happens next</span>
          <p>24<span>hours</span></p>
        </div>
        <p className={styles.nextDescription}>
          We&apos;ll review your brief and get back to you within 24 hours to discuss the next steps.
        </p>
      </div>

      <div className={styles.footer}>
        <span>A little anticipation. A lot of possibility.</span>
        <button type="button" onClick={onReset} className={styles.reset}>
          Send another brief
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
            <path d="M4 12h15m-6-6 6 6-6 6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
