---
name: Serene Clarity
colors:
  surface: '#f8fafa'
  surface-dim: '#d8dada'
  surface-bright: '#f8fafa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f4'
  surface-container: '#eceeee'
  surface-container-high: '#e6e8e9'
  surface-container-highest: '#e1e3e3'
  on-surface: '#191c1d'
  on-surface-variant: '#42474d'
  inverse-surface: '#2e3131'
  inverse-on-surface: '#eff1f1'
  outline: '#72787e'
  outline-variant: '#c2c7ce'
  surface-tint: '#366284'
  primary: '#0f4262'
  on-primary: '#ffffff'
  primary-container: '#2d5a7b'
  on-primary-container: '#a5d1f7'
  inverse-primary: '#a0cbf1'
  secondary: '#416652'
  on-secondary: '#ffffff'
  secondary-container: '#c0e9d0'
  on-secondary-container: '#456a56'
  tertiary: '#104648'
  on-tertiary: '#ffffff'
  tertiary-container: '#2d5e60'
  on-tertiary-container: '#a3d5d7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cbe6ff'
  primary-fixed-dim: '#a0cbf1'
  on-primary-fixed: '#001e31'
  on-primary-fixed-variant: '#1a4a6b'
  secondary-fixed: '#c3ecd2'
  secondary-fixed-dim: '#a7d0b7'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#294e3b'
  tertiary-fixed: '#b9ecee'
  tertiary-fixed-dim: '#9ecfd1'
  on-tertiary-fixed: '#002021'
  on-tertiary-fixed-variant: '#1a4e50'
  background: '#f8fafa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e3'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  h1:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  h2:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  h3:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  caption:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  section-gap: 64px
---

## Brand & Style

The visual identity of this design system is built on the pillars of **discretion, trust, and academic clarity**. Given the sensitive nature of sexual education, the UI must act as a calm, non-judgmental guide. We employ a **Modern Minimalist** style that prioritizes content legibility and ease of navigation above all else.

The target audience ranges from adolescents seeking first-time information to educators and parents looking for reliable resources. The emotional response should be one of safety and reassurance—avoiding the "clinical" coldness of traditional medical portals while maintaining a high level of professional authority. The "fast-loading aesthetic" is achieved through generous whitespace, vector-based iconography, and a lack of heavy textures or complex gradients.

## Colors

The palette is anchored in **soft teals and sage greens** to evoke a sense of organic growth and mental well-being. 

- **Primary (Calm Blue):** Used for primary actions and navigation headers to establish authority and trust.
- **Secondary (Sage Green):** Used for success states, progress indicators, and supportive UI elements.
- **Tertiary (Mint):** Applied to backgrounds of highlighted sections to differentiate content without causing visual fatigue.
- **Neutral:** A very light teal-grey is used for the main background instead of pure white to reduce eye strain during long reading sessions.

For the Portuguese (PT-PT) context, color usage remains sober. Interactive elements use the Primary Blue, while educational "Safe Zones" utilize the Secondary Sage.

## Typography

This design system utilizes **Plus Jakarta Sans** across all levels. Its open apertures and modern geometric shapes provide the "approachable" feel required for educational content.

In PT-PT, word lengths can be significantly longer than in English (e.g., "Informação" vs "Info"). Therefore, we have opted for generous line heights (1.5x for body text) to ensure that dense paragraphs of educational text remain digestible. Headlines use a slightly tighter letter spacing to maintain a strong visual impact without sacrificing the friendly, rounded character of the typeface.

## Layout & Spacing

The layout follows a **12-column fixed grid** for desktop, ensuring content remains centered and focused. On smaller devices, the system transitions to a fluid model with 16px side margins.

The spacing rhythm is strictly based on an 8px base unit. We prioritize "vertical rhythm" to help users scan through long-form articles. Large gaps (64px+) are used between major content sections to prevent information overload, keeping the "light and responsive" feel requested.

## Elevation & Depth

To maintain a "fast-loading" and clean aesthetic, this design system avoids heavy shadows. Instead, we use **Tonal Layers** and **Low-Contrast Outlines**.

- **Level 0 (Background):** Neutral light teal-grey.
- **Level 1 (Cards/Surface):** White surfaces with a subtle 1px border in a darkened neutral shade.
- **Level 2 (Interactive/Floating):** A very soft, ambient shadow (10% opacity of the Primary color) is applied only to active elements like open menus or primary buttons upon hover.

This approach creates a sense of organized hierarchy without the visual weight of traditional skeuomorphism.

## Shapes

The shape language is consistently **Rounded**. A 0.5rem (8px) border radius is the standard for cards and input fields, while `rounded-xl` (1.5rem) is used for decorative containers and call-to-action sections.

This roundedness softens the professional tone, making the platform feel like a "safe space." Sharp corners are avoided entirely as they can feel too aggressive or clinical for a sensitive education portal.

## Components

### Buttons
Primary buttons use the Primary Blue with white text. Secondary buttons use a "Ghost" style with a Sage Green border. All buttons have a minimum height of 48px to ensure accessibility on touch devices.

### Cards (Módulos de Aprendizagem)
Cards are the primary vehicle for content. They feature a white background, 8px rounded corners, and a 1px soft teal border. Article cards include a small "tempo de leitura" (reading time) label in the top right.

### Input Fields
Forms use a subtle background fill (Neutral) rather than just an outline. The focus state transitions the border to Primary Blue. Labels are always positioned above the field for maximum clarity.

### Progress Bars (Indicadores de Progresso)
Essential for the educational portal. These use the Secondary Sage Green on a light mint track, providing a positive reinforcement visual as the user completes lessons.

### Chips/Tags
Used for categorizing content (e.g., "Saúde", "Relacionamentos", "Consentimento"). These are pill-shaped with a light mint background and dark teal text.

### Breadcrumbs
Essential for navigation in a deep portal. Use the Label-MD typography style to show the user's path (e.g., Início > Biblioteca > Anatomia).