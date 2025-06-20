
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface VisualizationPanelProps {
  data: any[];
  chartType: 'bar' | 'line' | 'pie';
}

const COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#84cc16', '#f97316'];

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
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="name" 
                stroke="#64748b" 
                tick={{ fontSize: 12, fill: '#64748b', fontFamily: 'Afacad Flux' }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="#64748b" tick={{ fontSize: 12, fill: '#64748b', fontFamily: 'Afacad Flux' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: 'none', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  color: '#1e293b',
                  fontFamily: 'Afacad Flux',
                  fontWeight: '500'
                }} 
              />
              <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={transformedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="name" 
                stroke="#64748b" 
                tick={{ fontSize: 12, fill: '#64748b', fontFamily: 'Afacad Flux' }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="#64748b" tick={{ fontSize: 12, fill: '#64748b', fontFamily: 'Afacad Flux' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: 'none', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  color: '#1e293b',
                  fontFamily: 'Afacad Flux',
                  fontWeight: '500'
                }} 
              />
              <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={4} dot={{ fill: '#8b5cf6', strokeWidth: 3, r: 8 }} />
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
                fill="#6366f1"
                dataKey="value"
              >
                {transformedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: 'none', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  color: '#1e293b',
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
    <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-xl border border-slate-200 professional-shadow">
      {renderChart()}
    </div>
  );
};

export default VisualizationPanel;
