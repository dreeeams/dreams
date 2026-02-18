# UI/UX — Design Standards

## Design Bar

Target: Vercel, Linear, Notion-level polish. Clean, intentional, zero clutter.

## Spacing

- Use Tailwind's spacing scale consistently. Do not invent custom values.
- Sections: `py-16` minimum on mobile, `py-24` on desktop.
- Between elements within a section: `gap-6` to `gap-12` depending on hierarchy.
- Never use margin for layout. Use flex/grid gap.
- Padding inside cards/containers: `p-4` mobile, `p-6` desktop minimum.

## Typography

- Clear hierarchy: one `h1` per page, `h2` for sections, `h3` for subsections.
- Body text: `text-base` (16px) minimum. Never smaller for readable content.
- Headings scale: `text-2xl` mobile -> `text-4xl` or `text-5xl` desktop.
- Line height: relaxed for body (`leading-relaxed`), tight for headings (`leading-tight`).
- Font weight: use at most 3 weights per page. More creates visual noise.

## Color

- Respect the existing palette. Do not introduce new colors without justification.
- Contrast ratios must meet WCAG AA minimum (4.5:1 for text, 3:1 for large text).
- Dark mode must be tested. Not just inverted.

## Components

- Consistent border radius across the app. Match what exists.
- Buttons: clear primary/secondary/ghost hierarchy. One primary CTA per viewport.
- Inputs: visible focus states, error states, disabled states.
- Cards: consistent padding, shadow, and border treatment.
- No orphan components. If it is used once and has no reuse path, inline it.

## Motion

- Motion is earned, not decorative. Every animation must answer: "What does this help the user understand?"
- Acceptable: entrance transitions, state changes, feedback on interaction.
- Not acceptable: gratuitous parallax, random floating elements, animation for "wow factor."
- Duration: 150-300ms for micro-interactions, 300-500ms for layout transitions.
- Easing: `ease-out` for entrances, `ease-in` for exits. Never linear for UI elements.
- If removing the animation does not reduce clarity, remove the animation.

## Responsive

- Mobile-first. Always. No exceptions.
- Breakpoints: `sm` (640), `md` (768), `lg` (1024), `xl` (1280).
- Test at 320px width. If it breaks there, it is not done.
- Touch targets: 44px minimum.
- No horizontal scroll. Ever.

## Accessibility

- All images have `alt` text.
- All interactive elements are keyboard navigable.
- Focus indicators are visible.
- Semantic HTML: `button` for actions, `a` for navigation, `main`/`section`/`nav` for structure.
