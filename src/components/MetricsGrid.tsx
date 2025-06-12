
import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, Hash, BarChart3, Activity, Target, Zap } from 'lucide-react';

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
        return <Activity className="w-6 h-6 text-emerald-600" />;
      case 'maximum':
        return <TrendingUp className="w-6 h-6 text-red-500" />;
      case 'minimum':
        return <Target className="w-6 h-6 text-purple-600" />;
      default:
        return <Zap className="w-6 h-6 text-primary" />;
    }
  };

  const getGradient = (index: number) => {
    const gradients = [
      'from-blue-500 to-blue-600',
      'from-emerald-500 to-emerald-600',
      'from-purple-500 to-purple-600',
      'from-orange-500 to-orange-600',
      'from-pink-500 to-pink-600',
      'from-indigo-500 to-indigo-600'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="p-6 bg-white/80 backdrop-blur-sm border border-white/20 professional-shadow-lg hover:professional-shadow-xl transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-2">
                {metric.title}
              </p>
              <p className="text-3xl font-bold text-slate-800 mb-1">
                {metric.value.toLocaleString()}
              </p>
              <div className="flex items-center text-xs text-slate-500">
                <div className="w-1 h-1 bg-emerald-500 rounded-full mr-2"></div>
                {metric.type.charAt(0).toUpperCase() + metric.type.slice(1)}
              </div>
            </div>
            <div className={`p-4 rounded-xl bg-gradient-to-br ${getGradient(index)} group-hover:scale-110 transition-transform duration-200`}>
              <div className="text-white">
                {getIcon(metric.type)}
              </div>
            </div>
          </div>
          <div className="mt-4 h-1 bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full bg-gradient-to-r ${getGradient(index)} rounded-full transition-all duration-1000 ease-out`} 
                 style={{ width: '75%' }}></div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MetricsGrid;
