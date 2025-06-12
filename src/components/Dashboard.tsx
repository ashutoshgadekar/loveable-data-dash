import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader, LogOut, BarChart3, LineChart, PieChart, Database, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { DatabaseConfig } from '../pages/Index';
import MetricsGrid from './MetricsGrid';
import VisualizationPanel from './VisualizationPanel';
import InsightsPanel from './InsightsPanel';
import DataTable from './DataTable';
import BrandedHeader from './BrandedHeader';

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
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto">
        {/* Branded Header */}
        <BrandedHeader 
          title="Analytics Dashboard"
          subtitle="Connect to your database to unlock powerful insights"
        />

        {/* Connection Status and Disconnect */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <p className="text-slate-600 font-medium">Connected to {config.database}</p>
          </div>
          <Button
            onClick={onDisconnect}
            variant="outline"
            className="bg-white hover:bg-slate-50 text-slate-700 border-slate-200 font-semibold professional-shadow hover:professional-shadow-lg transition-all duration-200"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Disconnect
          </Button>
        </div>

        {/* Query Interface */}
        <Card className="p-8 mb-8 bg-white/80 backdrop-blur-sm border border-white/20 professional-shadow-lg">
          <div className="flex items-center mb-6">
            <Sparkles className="w-6 h-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-slate-800">AI Query Assistant</h2>
          </div>
          <div className="space-y-6">
            <Textarea
              placeholder="Ask your question in natural language... (e.g., 'How many students are in 8th class?')"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-[120px] bg-white border-slate-200 focus:border-primary focus:ring-primary/20 resize-none font-medium text-slate-700 placeholder:text-slate-400"
            />
            <Button
              onClick={executeQuery}
              disabled={isLoading}
              className="gradient-primary text-white font-semibold py-3 px-8 rounded-lg hover:opacity-90 transition-all duration-200 professional-shadow"
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Processing Query...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Execute Query
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Results */}
        {response && (
          <div className="space-y-8 animate-fade-in">
            {/* Generated SQL */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border border-white/20 professional-shadow-lg">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                Generated SQL Query
              </h3>
              <div className="bg-slate-900 p-6 rounded-xl font-mono text-sm text-green-400 border border-slate-700">
                {response.metadata.generated_sql}
              </div>
            </Card>

            {/* Metrics */}
            <MetricsGrid metrics={response.metrics} />

            {/* Data Table */}
            {response.metadata.raw_data.length > 0 && (
              <DataTable data={response.metadata.raw_data} />
            )}

            {/* Visualization Controls */}
            {response.graph_generated && response.metadata.raw_data.length > 0 && (
              <Card className="p-8 bg-white/80 backdrop-blur-sm border border-white/20 professional-shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-slate-800 flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Data Visualizations
                  </h3>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => setSelectedChart('bar')}
                      variant={selectedChart === 'bar' ? 'default' : 'outline'}
                      size="sm"
                      className={selectedChart === 'bar' 
                        ? 'gradient-primary text-white' 
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                      }
                    >
                      <BarChart3 className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => setSelectedChart('line')}
                      variant={selectedChart === 'line' ? 'default' : 'outline'}
                      size="sm"
                      className={selectedChart === 'line' 
                        ? 'gradient-primary text-white' 
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                      }
                    >
                      <LineChart className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => setSelectedChart('pie')}
                      variant={selectedChart === 'pie' ? 'default' : 'outline'}
                      size="sm"
                      className={selectedChart === 'pie' 
                        ? 'gradient-primary text-white' 
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                      }
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
