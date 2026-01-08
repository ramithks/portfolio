import posthog from "posthog-js";

// Initialize PostHog
export const initAnalytics = () => {
  const apiKey = import.meta.env.VITE_POSTHOG_API_KEY;
  const host = import.meta.env.VITE_POSTHOG_HOST || "https://us.i.posthog.com";

  if (!apiKey) {
    console.warn("PostHog API key not found. Analytics will be disabled.");
    return;
  }

  posthog.init(apiKey, {
    api_host: host,
    loaded: (posthog) => {
      if (import.meta.env.DEV) {
        console.log("PostHog initialized:", posthog);
      }
    },
    capture_pageview: true,
    capture_pageleave: true,
  });
};

// Tracking functions
export const trackSectionView = (section: string, sectionId: string) => {
  posthog.capture("section_viewed", {
    section,
    section_id: sectionId,
    timestamp: new Date().toISOString(),
  });
};

export const trackSectionTimeSpent = (
  section: string,
  sectionId: string,
  timeSpent: number
) => {
  posthog.capture("section_time_spent", {
    section,
    section_id: sectionId,
    time_spent_seconds: timeSpent,
    timestamp: new Date().toISOString(),
  });
};

export const trackEmailClick = (email: string, source: string) => {
  posthog.capture("email_clicked", {
    email,
    source,
    timestamp: new Date().toISOString(),
  });
};

export const trackButtonClick = (buttonName: string, location: string) => {
  posthog.capture("button_clicked", {
    button_name: buttonName,
    location,
    timestamp: new Date().toISOString(),
  });
};

export const trackLinkClick = (
  linkUrl: string,
  linkText: string,
  linkType: "internal" | "external" | "social"
) => {
  posthog.capture("link_clicked", {
    link_url: linkUrl,
    link_text: linkText,
    link_type: linkType,
    timestamp: new Date().toISOString(),
  });
};

export const trackResumeDownload = (fileName: string, source: string) => {
  posthog.capture("resume_downloaded", {
    file_name: fileName,
    source,
    timestamp: new Date().toISOString(),
  });
};

export const trackNavigationClick = (targetSection: string) => {
  posthog.capture("navigation_clicked", {
    target_section: targetSection,
    timestamp: new Date().toISOString(),
  });
};

// Export posthog instance for advanced usage
export { posthog };
