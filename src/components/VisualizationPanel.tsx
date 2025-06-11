
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface VisualizationPanelProps {
  data: any[];
  chartType: 'bar' | 'line' | 'pie';
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1'];

const VisualizationPanel: React.FC<VisualizationPanelProps> = ({ data, chartType }) => {
  // Transform data for visualization with better labels
  const transformedData = data.map((item, index) => {
    const keys = Object.keys(item);
    
    // Find the most appropriate key for labels and values
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
              <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
              <XAxis 
                dataKey="name" 
                stroke="#6b7280" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#f3f4f6', 
                  border: 'none', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={transformedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
              <XAxis 
                dataKey="name" 
                stroke="#6b7280" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#f3f4f6', 
                  border: 'none', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={3} dot={{ fill: '#8884d8', strokeWidth: 2, r: 6 }} />
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
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {transformedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#f3f4f6', 
                  border: 'none', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
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
    <div className="bg-gray-50 p-4 rounded-lg shadow-neumorphic-inset">
      {renderChart()}
    </div>
  );
};

export default VisualizationPanel;
