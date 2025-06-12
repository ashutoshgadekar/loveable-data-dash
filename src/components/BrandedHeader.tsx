
import React from 'react';
import { Brain, Database, Sparkles } from 'lucide-react';

interface BrandedHeaderProps {
  title: string;
  subtitle?: string;
}

const BrandedHeader: React.FC<BrandedHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-8 animate-fade-in">
      {/* AI-themed logo section */}
      <div className="flex items-center justify-center mb-8">
        <div className="relative">
          {/* Glowing background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-indigo-500/20 blur-xl rounded-full"></div>
          
          {/* Logo container with glass morphism */}
          <div className="relative bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl p-6 professional-shadow-lg">
            <div className="flex items-center space-x-4">
              {/* Company logo */}
              <div className="relative">
                <img 
                  src="/lovable-uploads/994b9c40-ee8b-4c0a-a3f8-14fe98278902.png" 
                  alt="The Baap Company Logo" 
                  className="w-12 h-12 rounded-lg professional-shadow"
                />
                {/* AI sparkle effect */}
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-primary animate-pulse" />
              </div>
              
              {/* AI Database icons */}
              <div className="flex space-x-2">
                <div className="p-2 bg-gradient-primary rounded-lg text-white professional-shadow">
                  <Brain className="w-5 h-5" />
                </div>
                <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white professional-shadow">
                  <Database className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Company branding */}
      <div className="mb-6">
        <div className="inline-block">
          <h1 className="text-2xl font-bold text-slate-700 mb-1 tracking-wide">
            THE BAAP COMPANY
          </h1>
          <div className="h-0.5 bg-gradient-primary rounded-full"></div>
        </div>
      </div>

      {/* Main application title with AI theme */}
      <div className="relative mb-6">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-indigo-500/10 blur-2xl"></div>
        
        <div className="relative">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-slate-800 via-primary to-indigo-600 bg-clip-text text-transparent mb-2 tracking-tight leading-tight">
            Baap AI
          </h2>
          <h3 className="text-3xl font-semibold text-slate-700 mb-3 tracking-wide">
            Database Analytics
          </h3>
          
          {/* AI-powered badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-primary text-white px-4 py-2 rounded-full text-sm font-medium professional-shadow">
            <Brain className="w-4 h-4" />
            <span>AI-Powered Intelligence</span>
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Subtitle with enhanced styling */}
      {subtitle && (
        <div className="max-w-2xl mx-auto">
          <p className="text-lg text-slate-600 font-medium leading-relaxed">
            {subtitle}
          </p>
          
          {/* Decorative elements */}
          <div className="flex justify-center items-center mt-4 space-x-2">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-primary rounded-full"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-primary rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandedHeader;
