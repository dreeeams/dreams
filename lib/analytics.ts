import { track } from '@vercel/analytics';

export const analytics = {
  // Form events
  formStarted: (formName: string) => {
    track('form_started', { form: formName });
  },

  formCompleted: (formName: string, data?: Record<string, unknown>) => {
    track('form_completed', { form: formName, ...data });
  },

  formError: (formName: string, error: string) => {
    track('form_error', { form: formName, error });
  },

  // Navigation events
  linkClicked: (linkName: string, destination: string) => {
    track('link_clicked', { name: linkName, destination });
  },

  sectionViewed: (sectionName: string) => {
    track('section_viewed', { section: sectionName });
  },

  // CTA events
  ctaClicked: (ctaName: string, location: string) => {
    track('cta_clicked', { name: ctaName, location });
  },

  // Project events
  projectViewed: (projectName: string) => {
    track('project_viewed', { project: projectName });
  },

  projectLinkClicked: (projectName: string, url: string) => {
    track('project_link_clicked', { project: projectName, url });
  },

  // Language events
  languageChanged: (from: string, to: string) => {
    track('language_changed', { from, to });
  },
};
