# Promptly - AI-Powered Prompt Engineering Platform

> **✨ A comprehensive web application for crafting, analyzing, and optimizing AI prompts with enterprise-level features.**

![Version](https://img.shields.io/badge/version-0.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-13.5.11-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue)
![Status](https://img.shields.io/badge/status-Beta-green)

## 🌟 Overview

**Promptly** is a modern, full-stack web application designed for AI prompt engineering and optimization. Built with cutting-edge technologies, it provides users with powerful tools to create, analyze, and refine AI prompts for better results. The platform features real-time AI analysis, collaborative tools, and comprehensive prompt management capabilities.

### 🎯 Key Features

- **🤖 AI-Powered Analysis**: Real-time prompt scoring and optimization suggestions
- **📝 Advanced Editor**: Rich text editing with syntax highlighting and auto-completion
- **📊 Analytics Dashboard**: Comprehensive metrics and performance insights
- **🎨 Prompt Gallery**: Community-driven template library and sharing platform
- **💾 Document Management**: Organized storage with search, tags, and categories
- **🔄 Version Control**: Track changes and maintain prompt evolution history
- **🌙 Dark/Light Mode**: Seamless theme switching with system preference detection
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **🔐 Enterprise Authentication**: Secure user management with Clerk integration
- **⚡ Real-time Collaboration**: Share and collaborate on prompts with team members

## 🏗️ Architecture

### Tech Stack

#### Frontend
- **Framework**: Next.js 13.5.11 with App Router
- **Language**: TypeScript 5.3.3
- **Styling**: Tailwind CSS 3.4.11 with custom design system
- **UI Components**: Radix UI primitives with custom styling
- **State Management**: React hooks with local storage persistence
- **Authentication**: Clerk for secure user management
- **Icons**: Lucide React for consistent iconography
- **Animations**: Framer Motion for smooth interactions

#### Backend & Services
- **API Routes**: Next.js API routes for server-side logic
- **AI Integration**: Hugging Face Transformers and Together AI
- **Database**: Local storage with plans for PostgreSQL/Supabase
- **File Handling**: Browser-based with planned cloud storage
- **Middleware**: Custom authentication and request handling

#### Development & Build Tools
- **Package Manager**: PNPM for fast, efficient dependency management
- **Linting**: ESLint with Next.js configuration
- **Code Formatting**: Prettier (integrated)
- **Build System**: Next.js webpack configuration
- **Type Checking**: TypeScript strict mode

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   └── analyze/       # AI analysis endpoint
│   ├── dashboard/         # Main application dashboard
│   ├── results/           # Analysis results pages
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx          # Landing page
│   └── not-found.tsx     # 404 error page
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (buttons, inputs, etc.)
│   ├── Header.tsx        # Application header
│   ├── DashboardSidebar.tsx  # Navigation sidebar
│   ├── LandingPage.tsx   # Landing page component
│   └── [feature]Tab.tsx  # Feature-specific tab components
├── lib/                  # Utility libraries and services
│   ├── ai-service.ts     # Enterprise AI analysis service
│   ├── ai-client.ts      # Client-side AI utilities
│   └── utils.ts          # General utility functions
├── hooks/                # Custom React hooks
│   ├── use-documents.ts  # Document management
│   ├── use-mobile.tsx    # Mobile detection
│   └── use-toast.ts      # Toast notifications
├── types/                # TypeScript type definitions
├── constants/            # Application constants and configuration
├── services/             # External service integrations
└── middleware.ts         # Custom middleware for authentication
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 18.0.0 or higher
- **PNPM**: Version 8.0.0 or higher (recommended package manager)
- **Git**: For version control

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
   Create a `.env.local` file in the root directory:
   ```env
   # Clerk Authentication (Required)
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...

   # AI Services (Optional - defaults to mock responses)
   TOGETHER_API_KEY=your_together_ai_key
   NEXT_PUBLIC_HUGGING_FACE_API_KEY=your_hugging_face_key

   # Next.js Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Start the development server**
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

## 🎨 Features Deep Dive

### 1. Landing Page & Authentication
- **Modern Hero Section**: Engaging introduction with clear value proposition
- **Clerk Integration**: Secure authentication with social login options
- **Responsive Design**: Optimized for all device sizes
- **Call-to-Action**: Strategic placement for user conversion

### 2. Dashboard Overview
The main dashboard provides a comprehensive workspace with:

#### Navigation Sidebar
- **Documents**: Manage all your prompt documents
- **Saved**: Quick access to bookmarked prompts
- **Trash**: Restore or permanently delete documents
- **Prompt Gallery**: Browse community templates
- **Account**: User settings and preferences

#### Document Management
- **Smart Search**: Find documents by title, content, or tags
- **Grid/List Views**: Flexible viewing options
- **Status Indicators**: Active, saved, draft, and archived states
- **Bulk Operations**: Select multiple documents for batch actions

### 3. AI Analysis Engine

#### Prompt Scoring System
- **Clarity Score** (0-100): Measures how clear and understandable the prompt is
- **Context Score** (0-100): Evaluates contextual information and specificity
- **Format Score** (0-100): Assesses structure and formatting quality
- **Overall Score**: Weighted average of all metrics

#### Analysis Features
- **Real-time Feedback**: Instant analysis as you type
- **Improvement Suggestions**: Actionable recommendations
- **Prompt Rewrites**: AI-generated alternative versions
- **Best Practices**: Contextual tips and guidelines

#### Supported AI Models
- **Llama 2 70B**: High-quality analysis with detailed feedback
- **Mixtral 8x7B**: Fast processing with good accuracy
- **Meta Llama**: Latest model for cutting-edge analysis
- **Fallback System**: Automatic model switching for reliability

### 4. Document Editor
- **Rich Text Editing**: Advanced text editor with formatting options
- **Auto-save**: Automatic saving every few seconds
- **Version History**: Track changes and revert if needed
- **Export Options**: Multiple formats (JSON, TXT, MD)
- **Collaboration**: Share documents with team members

### 5. Prompt Gallery
- **Community Templates**: Curated collection of effective prompts
- **Categories**: Organized by use case and industry
- **Rating System**: Community-driven quality assessment
- **Search & Filter**: Find relevant templates quickly
- **Personal Collection**: Save and organize your favorite templates

### 6. User Account Management
- **Profile Settings**: Update personal information
- **Preferences**: Customize application behavior
- **Usage Statistics**: Track your prompt analysis history
- **API Key Management**: Configure AI service integrations
- **Subscription Plans**: Free and Pro tier options

## 🔧 Configuration

### Environment Variables

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | ✅ | Clerk authentication public key | - |
| `CLERK_SECRET_KEY` | ✅ | Clerk authentication secret key | - |
| `TOGETHER_API_KEY` | ⚠️ | Together AI API key for analysis | Mock responses |
| `NEXT_PUBLIC_HUGGING_FACE_API_KEY` | ⚠️ | Hugging Face API key | Mock responses |
| `NEXT_PUBLIC_APP_URL` | ⚠️ | Application base URL | `http://localhost:3000` |

### Feature Flags

The application includes several feature flags in `src/constants/index.ts`:

```typescript
export const FEATURE_FLAGS = {
  ANALYTICS: true,                 // Enable analytics tracking
  BETA_FEATURES: true,            // Enable beta features
  DEBUG_MODE: isDevelopment,      // Debug logging
  ADVANCED_ANALYSIS: true,        // Advanced AI analysis
  COLLABORATION: false,           // Team collaboration (coming soon)
  EXPORT_FUNCTIONALITY: true,     // Document export features
  REAL_TIME_SYNC: false,         // Real-time synchronization
} as const;
```

### AI Model Configuration

Models are configured in `src/constants/index.ts`:

```typescript
export const AI_MODELS = {
  'llama-70b': {
    name: 'Llama 2 70B',
    provider: 'together',
    maxTokens: 4096,
    costPerToken: 0.0008,
  },
  'mixtral-8x7b': {
    name: 'Mixtral 8x7B',
    provider: 'together',
    maxTokens: 32768,
    costPerToken: 0.0006,
  },
  // ... more models
} as const;
```

## 🎯 Usage Guide

### Creating Your First Prompt

1. **Sign In**: Use the authentication modal or create a new account
2. **Navigate to Dashboard**: Click "Dashboard" in the header
3. **Create Document**: Click "New Document" button
4. **Write Your Prompt**: Enter your prompt in the editor
5. **Analyze**: The AI will automatically analyze your prompt
6. **Iterate**: Use suggestions to improve your prompt
7. **Save**: Your document is automatically saved

### Analyzing Existing Prompts

1. **Upload**: Use the "Attach" button to upload existing prompts
2. **Paste**: Copy and paste prompts directly into the editor
3. **Import**: Import from the Prompt Gallery
4. **Review Scores**: Check clarity, context, and format scores
5. **Apply Suggestions**: Implement recommended improvements
6. **Compare Versions**: Use the rewrite suggestions

### Managing Documents

#### Organization
- **Search**: Use the search bar to find specific documents
- **Filter**: Filter by status (active, saved, archived)
- **Tags**: Add tags for better organization
- **Categories**: Organize by project or use case

#### Actions
- **Star/Save**: Mark important documents
- **Share**: Generate sharing links for collaboration
- **Export**: Download in various formats
- **Archive**: Move to archive without deletion
- **Delete**: Move to trash (recoverable for 30 days)

### Collaboration Features

#### Sharing (Pro Feature)
- **Public Links**: Share read-only versions
- **Team Workspaces**: Collaborate with team members
- **Comments**: Add feedback and suggestions
- **Version Control**: Track changes and contributors

## 🛠️ Development

### Code Style & Standards

- **TypeScript**: Strict mode enabled for type safety
- **ESLint**: Configured with Next.js recommended rules
- **Component Structure**: Functional components with hooks
- **File Naming**: kebab-case for files, PascalCase for components
- **Import Organization**: Grouped and sorted imports

### Component Development

#### Creating New Components

1. **Create Component File**
   ```typescript
   // src/components/MyComponent.tsx
   import { FC } from 'react';
   
   interface MyComponentProps {
     title: string;
     children?: React.ReactNode;
   }
   
   export const MyComponent: FC<MyComponentProps> = ({ title, children }) => {
     return (
       <div className="my-component">
         <h2>{title}</h2>
         {children}
       </div>
     );
   };
   ```

2. **Add Styling**
   ```typescript
   // Use Tailwind classes with the cn utility
   import { cn } from '@/lib/utils';
   
   <div className={cn(
     "base-classes",
     conditional && "conditional-classes",
     className
   )}>
   ```

3. **Export from Index**
   ```typescript
   // src/components/index.ts
   export { MyComponent } from './MyComponent';
   ```

### API Development

#### Creating API Routes

```typescript
// src/app/api/my-endpoint/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Process request
    const result = await processData(body);
    
    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Testing Strategy

#### Unit Testing (Planned)
- **Framework**: Jest with React Testing Library
- **Coverage**: Components, hooks, and utilities
- **Integration**: API route testing

#### E2E Testing (Planned)
- **Framework**: Playwright or Cypress
- **Scenarios**: User workflows and critical paths
- **CI/CD**: Automated testing on PRs

### Performance Optimization

#### Current Optimizations
- **Code Splitting**: Automatic with Next.js
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: Webpack bundle optimization
- **Lazy Loading**: Dynamic imports for heavy components

#### Monitoring
- **Core Web Vitals**: Performance metrics tracking
- **Error Boundaries**: Graceful error handling
- **Loading States**: Skeleton screens and spinners

## 📱 Mobile Experience

### Responsive Design
- **Breakpoints**: Tailored for all screen sizes
- **Touch Interactions**: Optimized for mobile devices
- **Navigation**: Mobile-first sidebar design
- **Performance**: Optimized bundle size for mobile

### Mobile-Specific Features
- **Gesture Support**: Swipe navigation
- **Offline Capability**: Service worker (planned)
- **Push Notifications**: For collaboration updates (planned)

## 🔒 Security & Privacy

### Authentication Security
- **Clerk Integration**: Enterprise-grade authentication
- **JWT Tokens**: Secure session management
- **CSRF Protection**: Built-in Next.js protection
- **Rate Limiting**: API endpoint protection

### Data Privacy
- **Local Storage**: Documents stored locally by default
- **Encryption**: Sensitive data encryption (planned)
- **GDPR Compliance**: Privacy-first design
- **Data Export**: User data portability

### API Security
- **Input Validation**: Zod schema validation
- **Error Handling**: Secure error messages
- **CORS Configuration**: Proper origin handling
- **Middleware Protection**: Route-level security

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

2. **Environment Variables**
   Configure in Vercel dashboard:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `TOGETHER_API_KEY`

3. **Domain Configuration**
   - Custom domain setup
   - SSL certificate (automatic)
   - CDN distribution

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]
```

### Self-Hosting

1. **Build Application**
   ```bash
   pnpm build
   ```

2. **Configure Server**
   - Nginx/Apache reverse proxy
   - SSL certificate setup
   - Environment variables
   - Process management (PM2)

## 📈 Roadmap

### Short Term (Q1 2024)
- [ ] **Real-time Collaboration**: Multi-user editing
- [ ] **Advanced Analytics**: Usage metrics and insights
- [ ] **API Improvements**: Better error handling and rate limiting
- [ ] **Mobile App**: React Native application
- [ ] **Offline Support**: Service worker implementation

### Medium Term (Q2-Q3 2024)
- [ ] **Team Workspaces**: Organization-level accounts
- [ ] **Advanced AI Models**: GPT-4, Claude integration
- [ ] **Template Marketplace**: Community-driven templates
- [ ] **Integrations**: Slack, Discord, API webhooks
- [ ] **Advanced Export**: PDF, DOCX formats

### Long Term (Q4 2024+)
- [ ] **Enterprise Features**: SSO, audit logs, compliance
- [ ] **AI Training**: Custom model fine-tuning
- [ ] **Workflow Automation**: Automated prompt optimization
- [ ] **Multi-language Support**: Internationalization
- [ ] **Desktop Application**: Electron-based app

## 🤝 Contributing

### Getting Started

1. **Fork the Repository**
2. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make Changes**
4. **Add Tests** (when testing framework is added)
5. **Submit Pull Request**

### Development Guidelines

- **Code Style**: Follow existing patterns
- **Commit Messages**: Use conventional commits
- **Documentation**: Update README for new features
- **Testing**: Add tests for new functionality

### Issue Reporting

- **Bug Reports**: Use the bug report template
- **Feature Requests**: Detailed description with use cases
- **Security Issues**: Report privately to maintainers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing framework
- **Vercel**: For hosting and deployment platform
- **Clerk**: For authentication services
- **Radix UI**: For accessible component primitives
- **Tailwind CSS**: For the utility-first CSS framework
- **Lucide**: For beautiful icons
- **Community**: For feedback and contributions

## 📞 Support

### Getting Help

- **Documentation**: Check this README first
- **Issues**: Search existing issues on GitHub
- **Discussions**: Join community discussions
- **Email**: Contact support for urgent issues

### Community

- **GitHub Discussions**: Technical questions and ideas
- **Discord** (planned): Real-time chat with community
- **Twitter**: Follow for updates and announcements
- **Blog** (planned): Tutorials and best practices

---

**Built with ❤️ by the Sri**

*Making AI prompt engineering accessible to everyone.*
