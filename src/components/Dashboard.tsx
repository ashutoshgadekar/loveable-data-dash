
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader, LogOut, BarChart3, LineChart, PieChart } from 'lucide-react';
import { toast } from 'sonner';
import { DatabaseConfig } from '../pages/Index';
import MetricsGrid from './MetricsGrid';
import VisualizationPanel from './VisualizationPanel';
import InsightsPanel from './InsightsPanel';
import DataTable from './DataTable';

interface DashboardProps {
  config: DatabaseConfig;
  onDisconnect: () => void;
}

interface QueryResponse {
  metadata: {
    raw_data: any[];
    data_points: number;
    generated_sql: string;
    chart_requested: boolean;
    data_suitable_for_viz: boolean;
    relationships_found: number;
    tables_with_relationships: string[];
  };
  visualizations: any[];
  metrics: Array<{
    title: string;
    value: number;
    type: string;
  }>;
  insights: string[];
  graph_generated: boolean;
  relationships: any;
}

const Dashboard: React.FC<DashboardProps> = ({ config, onDisconnect }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<QueryResponse | null>(null);
  const [selectedChart, setSelectedChart] = useState<'bar' | 'line' | 'pie'>('bar');

  const executeQuery = async () => {
    if (!query.trim()) {
      toast.error('Please enter a query');
      return;
    }

    setIsLoading(true);
    
    try {
      const apiResponse = await fetch('http://127.0.0.1:8000/api/query', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          config: config,
          query: query
        }),
      });

      if (apiResponse.ok) {
        const data = await apiResponse.json();
        setResponse(data);
        toast.success('Query executed successfully!');
      } else {
        toast.error('Query failed. Please check your input.');
      }
    } catch (error) {
      toast.error('Failed to execute query. Please try again.');
      console.error('Query error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Data Analytics Dashboard</h1>
            <p className="text-gray-600">Connected to {config.database} database</p>
          </div>
          <Button
            onClick={onDisconnect}
            variant="outline"
            className="bg-gray-100 hover:bg-gray-50 text-gray-800 border-0 shadow-neumorphic hover:shadow-neumorphic-hover"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Disconnect
          </Button>
        </div>

        {/* Query Interface */}
        <Card className="p-6 mb-8 bg-gray-100 border-0 shadow-neumorphic">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Ask Loveable</h2>
          <div className="space-y-4">
            <Textarea
              placeholder="Ask your question in natural language... (e.g., 'How many students are in 8th class?')"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-[100px] bg-gray-100 border-0 shadow-neumorphic-inset focus:shadow-neumorphic-inset-focus resize-none"
            />
            <Button
              onClick={executeQuery}
              disabled={isLoading}
              className="bg-gray-100 hover:bg-gray-50 text-gray-800 border-0 shadow-neumorphic hover:shadow-neumorphic-hover active:shadow-neumorphic-active transition-all duration-200"
            >
              {isLoading ? (
                <Loader className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              {isLoading ? 'Processing...' : 'Ask Loveable'}
            </Button>
          </div>
        </Card>

        {/* Results */}
        {response && (
          <div className="space-y-8">
            {/* Generated SQL */}
            <Card className="p-6 bg-gray-100 border-0 shadow-neumorphic">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Generated SQL Query</h3>
              <div className="bg-gray-200 p-4 rounded-lg shadow-neumorphic-inset font-mono text-sm text-gray-700">
                {response.metadata.generated_sql}
              </div>
            </Card>

            {/* Metrics */}
            <MetricsGrid metrics={response.metrics} />

            {/* Data Table */}
            {response.metadata.raw_data.length > 0 && (
              <DataTable data={response.metadata.raw_data} />
            )}

            {/* Visualization Controls - Only show if graph_generated is true */}
            {response.graph_generated && response.metadata.raw_data.length > 0 && (
              <Card className="p-6 bg-gray-100 border-0 shadow-neumorphic">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Visualizations</h3>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => setSelectedChart('bar')}
                      variant={selectedChart === 'bar' ? 'default' : 'outline'}
                      size="sm"
                      className="bg-gray-100 hover:bg-gray-50 text-gray-800 border-0 shadow-neumorphic hover:shadow-neumorphic-hover"
                    >
                      <BarChart3 className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => setSelectedChart('line')}
                      variant={selectedChart === 'line' ? 'default' : 'outline'}
                      size="sm"
                      className="bg-gray-100 hover:bg-gray-50 text-gray-800 border-0 shadow-neumorphic hover:shadow-neumorphic-hover"
                    >
                      <LineChart className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => setSelectedChart('pie')}
                      variant={selectedChart === 'pie' ? 'default' : 'outline'}
                      size="sm"
                      className="bg-gray-100 hover:bg-gray-50 text-gray-800 border-0 shadow-neumorphic hover:shadow-neumorphic-hover"
                    >
                      <PieChart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <VisualizationPanel 
                  data={response.metadata.raw_data} 
                  chartType={selectedChart}
                />
              </Card>
            )}

            {/* Insights */}
            <InsightsPanel insights={response.insights} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
