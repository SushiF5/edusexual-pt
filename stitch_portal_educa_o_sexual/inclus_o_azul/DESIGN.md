---
name: Inclusão Azul
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#434655'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#006686'
  on-secondary: '#ffffff'
  secondary-container: '#7ed4fd'
  on-secondary-container: '#005b78'
  tertiary: '#4b566a'
  on-tertiary: '#ffffff'
  tertiary-container: '#636e83'
  on-tertiary-container: '#ecf1ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#c0e8ff'
  secondary-fixed-dim: '#7bd1fa'
  on-secondary-fixed: '#001e2b'
  on-secondary-fixed-variant: '#004d66'
  tertiary-fixed: '#d8e3fb'
  tertiary-fixed-dim: '#bcc7de'
  on-tertiary-fixed: '#111c2d'
  on-tertiary-fixed-variant: '#3c475a'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  h1:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h3:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1200px
  gutter: 24px
---

## Brand & Style
The brand personality of this design system is rooted in empathy, clarity, and safety. Designed for a sexual education portal, the UI must act as a calm, non-judgmental guide. It balances the authority of a healthcare resource with the warmth of a supportive community. 

The chosen style is **Modern Corporate with Soft Tactility**. By utilizing a refined "Soft Modern" aesthetic, the design system avoids the cold, sterile feeling of traditional medical portals while maintaining professional credibility. High whitespace and a monochromatic-adjacent blue palette create a sense of serenity, reducing user anxiety during the exploration of sensitive topics.

## Colors
The palette is built on a foundation of "Atmospheric Blues" to ensure a cohesive and calming user experience. To avoid the "clinical" feel requested, the whites are slightly warmed with blue undertones, and the blacks are replaced with deep, rich Navies.

- **Primary (Trust Blue):** Used for main actions and brand recognition. It is vibrant enough to feel modern but deep enough to signify authority.
- **Secondary (Sky):** Utilized for highlights, progress indicators, and decorative elements.
- **Tertiary (Navy):** Reserved for high-level headings and heavy structural elements to provide grounding without the harshness of pure black.
- **Neutrals (Crisp Whites):** The background layers use a "Paper White" (#F8FAFC) to remain easy on the eyes during long reading sessions.

## Typography
This design system uses **Plus Jakarta Sans** exclusively to ensure a friendly, optimistic, and approachable tone. The typeface features soft, open counters that maximize legibility at various sizes—a critical requirement for educational content.

To maintain a "professional yet approachable" hierarchy, headlines use a heavier weight with tighter letter spacing for impact, while body text uses generous line heights (1.6x) to facilitate comfortable reading and information retention.

## Layout & Spacing
The layout follows a **Fixed Grid** model on desktop to keep content centered and focused, transitioning to a fluid model on mobile devices. A 12-column grid provides the structural integrity needed for diverse content types, from long-form articles to interactive quizzes.

A strict 8px spacing scale governs the rhythm. Generous outer margins and internal padding within cards ensure that the UI feels "airy" and never claustrophobic, reinforcing the calming aesthetic.

## Elevation & Depth
Depth in this design system is achieved through **Ambient Shadows**. Instead of using grey-scale shadows, shadows are tinted with the Primary Navy color at very low opacities (5-10%). This creates a more natural, "liquid" transition between layers.

Three levels of elevation are defined:
1. **Flat:** Background elements and secondary containers.
2. **Low (Raised):** Cards and interactive elements in a resting state.
3. **Mid (Floating):** Navigation bars, dropdowns, and modals to draw immediate focus.

The use of semi-transparent "Sky Blue" washes behind content blocks provides a subtle sense of layering without the need for heavy borders.

## Shapes
The shape language is consistently **Rounded**, utilizing a base radius of 8px (0.5rem). This softens the overall interface, making it feel more human and less "institutional."

Large containers like educational cards or feature headers use the `rounded-xl` setting (1.5rem) to emphasize a modern, friendly character. Buttons and input fields adhere to the standard `rounded` setting to maintain a professional alignment with standard UI patterns.

## Components
Consistent component styling is vital for building trust within the design system:

- **Buttons:** Feature a solid Primary Blue fill for main actions and a soft Sky Blue tint for secondary actions. They utilize the `rounded` setting and subtle transitions on hover.
- **Input Fields:** Use a light neutral background with a 1px border in a soft blue-grey. On focus, the border thickens and glows with a Primary Blue shadow.
- **Cards:** White backgrounds with the "Low" elevation shadow and `rounded-lg` corners. These are the primary containers for educational modules.
- **Chips:** Highly rounded (pill-shaped) with low-contrast background tints. These are used for tagging content categories (e.g., "Anatomy," "Consent").
- **Progress Bars:** Smooth, thick tracks using Sky Blue as the base and Primary Blue for the fill, used to track course completion.
- **Info Banners:** Soft blue backgrounds with matching blue icons, providing essential "Did you know?" facts or safety warnings without using alarming red tones.