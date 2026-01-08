import { useEffect, useRef } from 'react';
import { trackSectionView, trackSectionTimeSpent } from '../lib/analytics';

interface UseSectionViewOptions {
  sectionName: string;
  sectionId: string;
  threshold?: number;
  debounceMs?: number;
}

export const useSectionView = ({
  sectionName,
  sectionId,
  threshold = 0.5,
  debounceMs = 500,
}: UseSectionViewOptions) => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasTrackedView = useRef(false);
  const timeEnteredRef = useRef<number | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            // Clear any existing debounce timer
            if (debounceTimerRef.current) {
              clearTimeout(debounceTimerRef.current);
            }

            // Debounce the view tracking
            debounceTimerRef.current = setTimeout(() => {
              if (!hasTrackedView.current) {
                trackSectionView(sectionName, sectionId);
                hasTrackedView.current = true;
                timeEnteredRef.current = Date.now();
              }
            }, debounceMs);
          } else if (!entry.isIntersecting && hasTrackedView.current && timeEnteredRef.current) {
            // Track time spent when section leaves viewport
            const timeSpent = (Date.now() - timeEnteredRef.current) / 1000; // Convert to seconds
            if (timeSpent > 1) {
              // Only track if user spent more than 1 second
              trackSectionTimeSpent(sectionName, sectionId, Math.round(timeSpent));
            }
            // Reset for potential re-entry
            hasTrackedView.current = false;
            timeEnteredRef.current = null;
          }
        });
      },
      {
        threshold,
        rootMargin: '0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      // Track final time spent if still in view when component unmounts
      if (hasTrackedView.current && timeEnteredRef.current) {
        const timeSpent = (Date.now() - timeEnteredRef.current) / 1000;
        if (timeSpent > 1) {
          trackSectionTimeSpent(sectionName, sectionId, Math.round(timeSpent));
        }
      }
    };
  }, [sectionName, sectionId, threshold, debounceMs]);

  return sectionRef;
};
