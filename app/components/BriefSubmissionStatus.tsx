"use client";

import { useEffect, useState } from "react";
import styles from "./BriefSubmissionStatus.module.css";

export default function BriefSubmissionStatus({
  uploading,
  progress,
  fileName,
}: {
  uploading: boolean;
  progress: number | null;
  fileName?: string;
}) {
  const [takingLonger, setTakingLonger] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setTakingLonger(true), 12000);
    return () => window.clearTimeout(timer);
  }, []);

  const title = uploading ? "Uploading your reference" : "Sending your brief";

  return (
    <div className={styles.panel}>
      <div className={styles.heading}>
        <div className={styles.artwork} aria-hidden="true">
          <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.4">
            <g className={styles.sparkles}>
              <path d="M14 20v8m-4-4h8M66 34v6m-3-3h6M58 12v6m-3-3h6" />
            </g>
            <path d="M22 42v24h36V42M40 42v24" />
            <g className={styles.lid}>
              <path d="M18 34h44v8H18zM40 34v8" />
              <path d="M40 34c-18 0-18-17-9-13 5 2 9 13 9 13Zm0 0c18 0 18-17 9-13-5 2-9 13-9 13Z" />
            </g>
          </svg>
          <span className={styles.shadow} />
        </div>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>A thoughtful start</p>
          <div role="status" aria-live="polite" aria-atomic="true">
            <p className={styles.title}>{title}<span className={styles.dots} aria-hidden="true"><i /><i /><i /></span></p>
            <p className={styles.description}>
              {takingLonger
                ? uploading
                  ? "Still uploading. Larger files can take a little longer. Please keep this page open."
                  : "Still sending your brief. Thank you for your patience. Please keep this page open."
                : uploading
                  ? "Making room for your inspiration. Please keep this page open."
                  : "Your ideas are on their way to our team. Just a moment."}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.meta} aria-hidden="true">
        <span className={styles.fileName}>{uploading ? fileName : fileName ? "Reference uploaded" : "Your next great unboxing starts here"}</span>
        <span className={styles.value}>{uploading && progress !== null ? `${progress}%` : "In progress"}</span>
      </div>
      <div
        className={styles.track}
        role="progressbar"
        aria-label={title}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={uploading ? progress ?? undefined : undefined}
      >
        <span
          className={uploading && progress !== null ? styles.fill : styles.indeterminate}
          style={uploading && progress !== null ? { width: `${progress}%` } : undefined}
        />
      </div>
      <div className={styles.steps} aria-hidden="true">
        <span className={!uploading ? styles.complete : undefined}>{uploading ? "01" : "✓"} {fileName ? "Upload reference" : "Brief prepared"}</span>
        <span className={!uploading ? styles.active : undefined}>02 Send brief</span>
        <span>03 Confirmation</span>
      </div>
    </div>
  );
}
