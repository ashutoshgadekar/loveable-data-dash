
import React from 'react';
import { Card } from '@/components/ui/card';
import { Lightbulb, TrendingUp, Users, BarChart3, Brain, Sparkles } from 'lucide-react';

interface InsightsPanelProps {
  insights: string[];
}

const InsightsPanel: React.FC<InsightsPanelProps> = ({ insights }) => {
  const suggestions = [
    "Try comparing by gender for detailed demographics",
    "Add school-wise breakdown for institutional analysis", 
    "Filter by class level to see grade distribution",
    "Analyze attendance patterns by month",
    "Compare performance metrics across subjects"
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* AI Insights */}
      <Card className="p-8 bg-white/80 backdrop-blur-sm border border-white/20 professional-shadow-lg">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl mr-4">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">AI Insights</h3>
            <p className="text-sm text-slate-600 font-medium">Intelligent data analysis</p>
          </div>
        </div>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200/50 hover:border-yellow-300/50 transition-all duration-200">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-slate-700 font-medium leading-relaxed">{insight}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Smart Suggestions */}
      <Card className="p-8 bg-white/80 backdrop-blur-sm border border-white/20 professional-shadow-lg">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mr-4">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">Smart Suggestions</h3>
            <p className="text-sm text-slate-600 font-medium">Recommended analyses</p>
          </div>
        </div>
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="group p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200/50 hover:border-blue-300/50 transition-all duration-200 cursor-pointer hover:scale-[1.02]">
              <div className="flex items-center">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-200">
                  {index % 4 === 0 && <Users className="w-4 h-4 text-white" />}
                  {index % 4 === 1 && <BarChart3 className="w-4 h-4 text-white" />}
                  {index % 4 === 2 && <TrendingUp className="w-4 h-4 text-white" />}
                  {index % 4 === 3 && <Lightbulb className="w-4 h-4 text-white" />}
                </div>
                <p className="text-slate-700 font-medium group-hover:text-slate-800 transition-colors duration-200 leading-relaxed">{suggestion}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default InsightsPanel;
