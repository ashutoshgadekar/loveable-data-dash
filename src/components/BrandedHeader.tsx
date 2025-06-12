
import React from 'react';

const BrandedHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700">
      <div className="flex items-center space-x-4">
        <img 
          src="/lovable-uploads/ef401703-93b4-4092-a126-10c8ef5bbb92.png" 
          alt="The Baap Company Logo" 
          className="w-12 h-12 rounded-lg"
        />
        <div>
          <h1 className="text-2xl font-bold text-white font-afacad tracking-wide">
            The Baap Company
          </h1>
          <p className="text-sm text-slate-300 font-afacad">
            Business Applications and Platforms
          </p>
        </div>
      </div>
      <div className="text-right">
        <div className="text-xs text-slate-400 font-afacad">Database Analytics</div>
        <div className="text-sm text-slate-200 font-afacad">Professional Dashboard</div>
      </div>
    </div>
  );
};

export default BrandedHeader;
