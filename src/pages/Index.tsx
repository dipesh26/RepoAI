import { SEO } from "@/components/SEO";
import { useState } from "react";
import { GlobalBackground } from "@/components/GlobalBackground";
import { FloatingNavbar } from "@/components/FloatingNavbar";
import { HeroSection } from "@/components/HeroSection";
import { AIConfigContainer } from "@/components/AIConfigContainer";
import { ChatAgent } from "@/components/ChatAgent";
import { LoadingModal } from "@/components/LoadingModal";
import { OutputModal } from "@/components/OutputModal";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { WorkflowSection } from "@/components/WorkflowSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

interface Tab {
  id: string;
  label: string;
  icon: React.ElementType;
  content: string;
}

const mockOutputs: Record<string, string> = {
  summarize: `# Repository Summary

## Overview
This is a modern React application built with TypeScript, featuring a comprehensive component library and robust state management.

## Key Technologies
- React 18.x with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- React Query for data fetching

## Architecture
The codebase follows a modular component-based architecture with clear separation of concerns. Components are organized by feature domains, with shared utilities in dedicated directories.

## Statistics
- **Total Files**: 247
- **Components**: 42
- **Hooks**: 12
- **Utilities**: 18`,

  readme: `# Project Name

> A powerful React application for modern web development.

## 🚀 Quick Start

\`\`\`bash
npm install
npm run dev
\`\`\`

## 📦 Installation

1. Clone the repository
2. Install dependencies with \`npm install\`
3. Copy \`.env.example\` to \`.env\`
4. Run the development server

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **State**: React Query, Zustand
- **Testing**: Vitest, Testing Library

## 📖 Documentation

See the \`/docs\` folder for detailed documentation.`,

  setup: `# Setup Guide

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0 or yarn >= 1.22.0
- Git

## Step 1: Clone Repository

\`\`\`bash
git clone https://github.com/user/repo.git
cd repo
\`\`\`

## Step 2: Install Dependencies

\`\`\`bash
npm install
\`\`\`

## Step 3: Environment Configuration

Create a \`.env\` file:
\`\`\`
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=MyApp
\`\`\`

## Step 4: Start Development Server

\`\`\`bash
npm run dev
\`\`\`

The app will be available at http://localhost:5173`,

  techdebt: `# Technical Debt Analysis

## 🔴 Critical Issues (3)

### 1. Outdated Dependencies
- \`react-router-dom\` is 2 major versions behind
- Security vulnerabilities in transitive dependencies

### 2. Missing Error Boundaries
- No error boundaries in critical paths
- Unhandled promise rejections in async operations

### 3. Accessibility Gaps
- Missing ARIA labels on 12 interactive elements
- Insufficient color contrast in 4 components

## 🟡 Warnings (7)

- Large bundle size (1.2MB uncompressed)
- Unused exports in 8 files
- Missing TypeScript strict mode
- No unit tests for 15 components

## 💡 Recommendations

1. Update critical dependencies
2. Implement error boundaries
3. Add comprehensive testing
4. Enable strict TypeScript checks`,
};

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentFeature, setCurrentFeature] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [showFab, setShowFab] = useState(false);
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState("");

  const handleAnalyze = (feature: string, input: string) => {
    setCurrentFeature(feature);
    setIsLoading(true);

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);

      // Check if tab already exists
      const existingTabIndex = tabs.findIndex((t) => t.id === feature);
      if (existingTabIndex >= 0) {
        // Update existing tab
        setTabs((prev) =>
          prev.map((t) =>
            t.id === feature
              ? { ...t, content: mockOutputs[feature] || "Analysis complete." }
              : t
          )
        );
      } else {
        // Add new tab
        const newTab: Tab = {
          id: feature,
          label: feature,
          icon: () => null,
          content: mockOutputs[feature] || "Analysis complete.",
        };
        setTabs((prev) => [...prev, newTab]);
      }

      setActiveTab(feature);
      setShowOutput(true);
    }, 3000);
  };

  const handleCloseOutput = () => {
    setShowOutput(false);
    setShowFab(true);
  };

  const handleFabClick = () => {
    setShowOutput(true);
    setShowFab(false);
  };

  return (
    <>
      <SEO
        title="Home"
        description="Analyze repositories instantly. Generate documentation, detect technical debt, and interact with your code using AI."
      />

      <div className="relative min-h-screen">
        <GlobalBackground />
        <FloatingNavbar />

        {/* --- SCROLL FADE MASKS --- */}
        {/* Sits between Navbar and Content to create the smooth fade effect */}
        <div className="pointer-events-none fixed inset-0 z-40">
          {/* Top Fade (Hides content going under navbar) */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-50 via-slate-50/80 to-transparent dark:from-slate-950 dark:via-slate-950/80" />

          {/* Bottom Fade (Optional: Fades content in from bottom) */}
          {/* <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent dark:from-slate-950 dark:via-slate-950/80" /> */}
        </div>

        <main className="relative z-0">
          <HeroSection />

          <section className="pb-16 px-6">
            <AIConfigContainer onAnalyze={handleAnalyze} />
            <ChatAgent />
          </section>

          <WorkflowSection />
          <AboutSection />
          <ContactSection />
        </main>

        <Footer />

        {/* Modals */}
        <LoadingModal isOpen={isLoading} feature={currentFeature} />
        <OutputModal
          isOpen={showOutput}
          onClose={handleCloseOutput}
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <FloatingActionButton isVisible={showFab} onClick={handleFabClick} />
      </div>
    </>
  );
};

export default Index;