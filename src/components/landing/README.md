# Landing Page Components

This folder contains modular components that make up the landing page of the application. Each component is self-contained and reusable.

## Component Structure

### 🎯 **HeroSection.tsx**
- Contains the main hero area with the PromptlyChat component
- Handles prompt submission functionality
- Responsive design with fade-in animation

### 🔥 **ProblemStatementSection.tsx**
- Before/after comparison cards (Shallow vs Strategic Prompting)
- Professional futuristic UI with grid patterns and glassmorphism
- Mobile-responsive badges and interactive hover effects
- Impact metrics cards (5x, 80%, 95%)
- Call-to-action bridge to the analyzer

### ⭐ **WhyChooseSection.tsx**
- Three feature cards explaining tool benefits
- End Shallow Prompting, Build Critical Thinking, Professional Development
- Interactive hover animations and scaling effects
- CheckCircle icons with scaling animations

### ⚙️ **HowItWorksSection.tsx**
- Four-step process explanation with numbered badges
- Interactive process steps with slide animations
- 2x2 feature grid showing key capabilities
- Background color section with muted styling

### 🚀 **BenefitsSection.tsx**
- Career-focused benefits with icon animations
- Statistics cards on the right column
- Final call-to-action button with Get Started functionality
- Professional development focus

### 🎨 **AnimatedBackground.tsx**
- Flickering grid background effects
- Dual-mode support (light/dark)
- Subtle animations for visual appeal

## Props Interface

```typescript
interface SectionProps {
  isVisible: boolean;          // Controls animation timing
  onGetStarted?: () => void;   // CTA button handler (BenefitsSection)
  onPromptSubmit?: (prompt: string) => void; // Prompt handler (HeroSection)
}
```

## Design Principles

- **Mobile-First**: All components are responsive
- **Professional**: Clean, business-focused design without overwhelming effects
- **Accessible**: Proper contrast and semantic structure
- **Performant**: Uses CSS transforms for 60fps animations
- **Consistent**: Shared design tokens and animation patterns

## Usage

```tsx
import {
  HeroSection,
  ProblemStatementSection,
  WhyChooseSection,
  HowItWorksSection,
  BenefitsSection,
  AnimatedBackground
} from "@/components/landing";
```

## Animation System

All sections use a consistent animation system based on:
- `isVisible` state for page-wide animation coordination
- Staggered delays for sequential reveals
- Hover animations for interactivity
- Smooth transitions for professional feel 