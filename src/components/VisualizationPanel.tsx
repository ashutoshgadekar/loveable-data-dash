
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface VisualizationPanelProps {
  data: any[];
  chartType: 'bar' | 'line' | 'pie';
}

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];

const VisualizationPanel: React.FC<VisualizationPanelProps> = ({ data, chartType }) => {
  // Transform data for visualization with better labels
  const transformedData = data.map((item, index) => {
    const keys = Object.keys(item);
    
    const labelKey = keys.find(key => 
      key.toLowerCase().includes('name') || 
      key.toLowerCase().includes('section') || 
      key.toLowerCase().includes('class') ||
      key.toLowerCase().includes('category')
    ) || keys[0];
    
    const valueKey = keys.find(key => 
      key.toLowerCase().includes('count') || 
      key.toLowerCase().includes('total') ||
      key.toLowerCase().includes('amount') ||
      typeof item[key] === 'number'
    ) || keys[keys.length - 1];
    
    const label = item[labelKey] || `Item ${index + 1}`;
    const value = typeof item[valueKey] === 'number' ? item[valueKey] : 
                  typeof item[valueKey] === 'string' && !isNaN(Number(item[valueKey])) ? 
                  Number(item[valueKey]) : index + 1;
    
    return {
      name: label,
      value: value,
      originalData: item
    };
  });

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={transformedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="name" 
                stroke="#9CA3AF" 
                tick={{ fontSize: 12, fill: '#9CA3AF', fontFamily: 'Afacad Flux' }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="#9CA3AF" tick={{ fontSize: 12, fill: '#9CA3AF', fontFamily: 'Afacad Flux' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                  color: '#F9FAFB',
                  fontFamily: 'Afacad Flux',
                  fontWeight: '500'
                }} 
              />
              <Bar dataKey="value" fill="#FF6B6B" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={transformedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="name" 
                stroke="#9CA3AF" 
                tick={{ fontSize: 12, fill: '#9CA3AF', fontFamily: 'Afacad Flux' }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="#9CA3AF" tick={{ fontSize: 12, fill: '#9CA3AF', fontFamily: 'Afacad Flux' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                  color: '#F9FAFB',
                  fontFamily: 'Afacad Flux',
                  fontWeight: '500'
                }} 
              />
              <Line type="monotone" dataKey="value" stroke="#4ECDC4" strokeWidth={4} dot={{ fill: '#4ECDC4', strokeWidth: 3, r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={transformedData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent, value }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={130}
                fill="#FF6B6B"
                dataKey="value"
              >
                {transformedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                  color: '#F9FAFB',
                  fontFamily: 'Afacad Flux',
                  fontWeight: '500'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 professional-shadow">
      {renderChart()}
    </div>
  );
};

export default VisualizationPanel;
