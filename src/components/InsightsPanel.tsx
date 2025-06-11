
import React from 'react';
import { Card } from '@/components/ui/card';
import { Lightbulb, TrendingUp, Users, BarChart3 } from 'lucide-react';

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* AI Insights */}
      <Card className="p-6 bg-gray-100 border-0 shadow-neumorphic">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-gray-100 rounded-full shadow-neumorphic-inset mr-3">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">AI Insights</h3>
        </div>
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg shadow-neumorphic-inset">
              <p className="text-gray-700 text-sm">{insight}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Gemini Suggestions */}
      <Card className="p-6 bg-gray-100 border-0 shadow-neumorphic">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-gray-100 rounded-full shadow-neumorphic-inset mr-3">
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Suggested Analyses</h3>
        </div>
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="group p-3 bg-gray-50 rounded-lg shadow-neumorphic-inset hover:shadow-neumorphic-inset-focus transition-all duration-200 cursor-pointer">
              <div className="flex items-center">
                <div className="p-1 bg-gray-100 rounded-full shadow-neumorphic-inset mr-3 group-hover:shadow-neumorphic-inset-focus transition-all duration-200">
                  {index % 4 === 0 && <Users className="w-3 h-3 text-purple-600" />}
                  {index % 4 === 1 && <BarChart3 className="w-3 h-3 text-green-600" />}
                  {index % 4 === 2 && <TrendingUp className="w-3 h-3 text-blue-600" />}
                  {index % 4 === 3 && <Lightbulb className="w-3 h-3 text-yellow-600" />}
                </div>
                <p className="text-gray-700 text-sm group-hover:text-gray-800 transition-colors duration-200">{suggestion}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default InsightsPanel;
