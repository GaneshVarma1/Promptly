# Promptly - AI-Powered Prompt Engineering Platform

> **✨ A modern web application for crafting, analyzing, and optimizing AI prompts with real-time feedback.**

![Version](https://img.shields.io/badge/version-0.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-13.5.7-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue)
![Status](https://img.shields.io/badge/status-Beta-green)

## 🌟 Overview

**Promptly** is a modern, full-stack web application designed for AI prompt engineering and optimization. Built with Next.js 13 and TypeScript, it provides users with powerful tools to create, analyze, and refine AI prompts for better results.

### 🎯 Key Features

- **🤖 AI-Powered Analysis**: Real-time prompt scoring and optimization suggestions
- **📝 Advanced Editor**: Rich text editing with syntax highlighting
- **📊 Analytics Dashboard**: Comprehensive metrics and performance insights
- **🎨 Prompt Gallery**: Template library with search and filtering
- **💾 Document Management**: Organized storage with search and categories
- **🌙 Dark/Light Mode**: Seamless theme switching
- **📱 Responsive Design**: Optimized for all devices
- **🔐 Authentication**: Secure user management with Clerk
- **⚡ Smooth Scrolling**: Enhanced user experience with Lenis

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 13.5.7 with App Router
- **Language**: TypeScript 5.3.3 (strict mode)
- **Styling**: Tailwind CSS 3.4.11
- **UI Components**: Radix UI primitives
- **State Management**: React hooks with local storage
- **Authentication**: Clerk
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Smooth Scrolling**: Lenis

### Development Tools
- **Package Manager**: PNPM
- **Linting**: ESLint with TypeScript support
- **Build System**: Next.js webpack
- **Bundle Analysis**: @next/bundle-analyzer

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── dashboard/         # Main application dashboard
│   ├── results/           # Analysis results pages
│   ├── layout.tsx         # Root layout component
│   └── page.tsx          # Landing page
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── landing/          # Landing page components
│   └── providers/        # Context providers
├── lib/                  # Utility libraries
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
├── services/             # External service integrations
└── constants/            # Application constants
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 18.0.0 or higher
- **PNPM**: Version 8.0.0 or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd refine-ai-write
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file:
   ```env
   # Clerk Authentication (Required)
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...

   # AI Services (Optional)
   TOGETHER_API_KEY=your_together_ai_key
   NEXT_PUBLIC_HUGGING_FACE_API_KEY=your_hugging_face_key
   ```

4. **Start development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start

# Check for linting issues
pnpm lint
```

## 🎨 Features

### 1. Landing Page
- Modern hero section with clear value proposition
- Responsive design optimized for all devices
- Smooth scrolling animations

### 2. Dashboard
- **Documents**: Manage all your prompt documents
- **Saved**: Quick access to bookmarked prompts
- **Trash**: Restore or permanently delete documents
- **Prompt Gallery**: Browse community templates
- **Account**: User settings and preferences

### 3. AI Analysis
- **Real-time Scoring**: Clarity, context, and format scores
- **Improvement Suggestions**: Actionable recommendations
- **Prompt Rewrites**: AI-generated alternative versions
- **Multiple Models**: Support for various AI models

### 4. Document Management
- **Smart Search**: Find documents by title, content, or tags
- **Grid/List Views**: Flexible viewing options
- **Auto-save**: Automatic saving every few seconds
- **Export Options**: Multiple formats support

### 5. Prompt Gallery
- **Community Templates**: Curated collection of effective prompts
- **Categories**: Organized by use case and industry
- **Search & Filter**: Find relevant templates quickly
- **Personal Collection**: Save and organize favorites

## 🔧 Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | ✅ | Clerk authentication public key |
| `CLERK_SECRET_KEY` | ✅ | Clerk authentication secret key |
| `TOGETHER_API_KEY` | ⚠️ | Together AI API key for analysis |
| `NEXT_PUBLIC_HUGGING_FACE_API_KEY` | ⚠️ | Hugging Face API key |

## 🛠️ Development

### Code Style
- **TypeScript**: Strict mode enabled
- **ESLint**: Configured with Next.js rules
- **Component Structure**: Functional components with hooks
- **File Naming**: kebab-case for files, PascalCase for components

### Bundle Analysis
```bash
# Analyze bundle size
ANALYZE=true pnpm build
```

## 📱 Mobile Experience

- **Responsive Design**: Optimized for all screen sizes
- **Touch Interactions**: Mobile-friendly interface
- **Performance**: Optimized bundle size (380kB total)

## 🔒 Security

- **Clerk Authentication**: Enterprise-grade security
- **Local Storage**: Documents stored locally by default
- **Input Validation**: Comprehensive validation
- **Error Handling**: Secure error messages

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Environment Variables**
   Configure in Vercel dashboard:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `TOGETHER_API_KEY`

## 📈 Roadmap

### Short Term
- [ ] Real-time collaboration
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] Offline support

### Medium Term
- [ ] Team workspaces
- [ ] Advanced AI models
- [ ] Template marketplace
- [ ] API integrations

## 🤝 Contributing

1. **Fork the Repository**
2. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make Changes**
4. **Submit Pull Request**

### Development Guidelines
- Follow existing code patterns
- Use conventional commits
- Update documentation for new features
- Ensure TypeScript strict mode compliance

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing framework
- **Vercel**: For hosting and deployment
- **Clerk**: For authentication services
- **Radix UI**: For accessible components
- **Tailwind CSS**: For utility-first styling
- **Lucide**: For beautiful icons

---

**Built with ❤️ by the Sri**

*Making AI prompt engineering accessible to everyone.*
