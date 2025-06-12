
import React, { useState } from 'react';
import { DatabaseConfig } from '../pages/Index';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Database, LogOut, BarChart3, Table, TrendingUp } from 'lucide-react';
import DataTable from './DataTable';
import MetricsGrid from './MetricsGrid';
import VisualizationPanel from './VisualizationPanel';
import InsightsPanel from './InsightsPanel';
import BrandedHeader from './BrandedHeader';

interface DashboardProps {
  config: DatabaseConfig;
  onDisconnect: () => void;
}

interface Metric {
  title: string;
  value: number;
  type: string;
}

const mockMetrics: Metric[] = [
  { title: 'Total Queries', value: 12345, type: 'count' },
  { title: 'Average Response Time', value: 250, type: 'average' },
  { title: 'Maximum Rows', value: 5000, type: 'maximum' },
  { title: 'Minimum Connections', value: 10, type: 'minimum' },
];

const mockTableData = [
  { id: 1, name: 'Record 1', value: 100 },
  { id: 2, name: 'Record 2', value: 200 },
  { id: 3, name: 'Record 3', value: 300 },
];

const mockChartData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 200 },
  { name: 'Group D', value: 100 },
];

const mockInsights = [
  "Database performance is optimal with 99.5% uptime",
  "Query response time has improved by 15% this month",
  "Most active users are accessing data between 9-11 AM",
  "Consider indexing the 'users' table for better performance"
];

const Dashboard: React.FC<DashboardProps> = ({ config, onDisconnect }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <BrandedHeader />
      
      <div className="p-6 space-y-6">
        {/* Connection Status Card */}
        <Card className="bg-gradient-to-r from-emerald-900/50 to-emerald-800/50 border-emerald-700/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Database className="w-5 h-5 text-emerald-400" />
              <span>Database Connection</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300">
            <p>Connected to: <span className="font-semibold">{config.database}</span></p>
            <p>Server: <span className="font-semibold">{config.server}:{config.port}</span></p>
            <Button variant="secondary" size="sm" onClick={onDisconnect} className="mt-4">
              <LogOut className="w-4 h-4 mr-2" />
              Disconnect
            </Button>
          </CardContent>
        </Card>

        {/* Main Dashboard */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview" onClick={() => setActiveTab('overview')}>
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="data" onClick={() => setActiveTab('data')}>
              <Table className="w-4 h-4 mr-2" />
              Data Table
            </TabsTrigger>
            <TabsTrigger value="insights" onClick={() => setActiveTab('insights')}>
              <TrendingUp className="w-4 h-4 mr-2" />
              Insights
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <MetricsGrid metrics={mockMetrics} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Data Visualization</CardTitle>
              </CardHeader>
              <CardContent>
                <VisualizationPanel data={mockChartData} chartType="bar" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="data" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Data Table</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable data={mockTableData} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="insights" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Insights Panel</CardTitle>
              </CardHeader>
              <CardContent>
                <InsightsPanel insights={mockInsights} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
