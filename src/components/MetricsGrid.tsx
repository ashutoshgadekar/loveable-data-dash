
import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, Hash, BarChart3, Activity } from 'lucide-react';

interface Metric {
  title: string;
  value: number;
  type: string;
}

interface MetricsGridProps {
  metrics: Metric[];
}

const MetricsGrid: React.FC<MetricsGridProps> = ({ metrics }) => {
  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'count':
        return <Hash className="w-6 h-6 text-blue-600" />;
      case 'average':
        return <Activity className="w-6 h-6 text-green-600" />;
      case 'maximum':
        return <TrendingUp className="w-6 h-6 text-red-600" />;
      case 'minimum':
        return <BarChart3 className="w-6 h-6 text-purple-600" />;
      default:
        return <Hash className="w-6 h-6 text-gray-600" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="p-6 bg-gray-100 border-0 shadow-neumorphic hover:shadow-neumorphic-hover transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                {metric.title}
              </p>
              <p className="text-2xl font-bold text-gray-800 mt-2">
                {metric.value.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-gray-100 rounded-full shadow-neumorphic-inset">
              {getIcon(metric.type)}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MetricsGrid;
