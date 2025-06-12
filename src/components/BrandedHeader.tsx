
import React from 'react';

interface BrandedHeaderProps {
  title: string;
  subtitle?: string;
}

const BrandedHeader: React.FC<BrandedHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-8 animate-fade-in">
      <div className="flex items-center justify-center mb-6">
        <img 
          src="/lovable-uploads/994b9c40-ee8b-4c0a-a3f8-14fe98278902.png" 
          alt="The Baap Company Logo" 
          className="w-16 h-16 mr-4"
        />
        <div className="text-left">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
            The Baap Company
          </h1>
          <p className="text-sm text-slate-600 font-medium">
            Business Applications and Platforms
          </p>
        </div>
      </div>
      <h2 className="text-4xl font-bold text-slate-800 mb-3 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-600 font-medium">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default BrandedHeader;
