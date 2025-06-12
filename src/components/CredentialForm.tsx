import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Database, Loader, CheckCircle, XCircle, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { DatabaseConfig } from '../pages/Index';
import BrandedHeader from './BrandedHeader';

interface CredentialFormProps {
  onConnectionSuccess: (config: DatabaseConfig) => void;
}

const CredentialForm: React.FC<CredentialFormProps> = ({ onConnectionSuccess }) => {
  const [config, setConfig] = useState<DatabaseConfig>({
    driver: 'mysql',
    server: 'localhost',
    port: 3306,
    database: 'schools',
    username: 'root',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);

  const handleInputChange = (field: keyof DatabaseConfig, value: string | number) => {
    setConfig(prev => ({ ...prev, [field]: value }));
    setTestResult(null);
  };

  const testConnection = async () => {
    setIsLoading(true);
    setTestResult(null);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/query', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          config: config,
          query: 'test connection'
        }),
      });

      if (response.ok) {
        setTestResult('success');
        toast.success('Connection successful!');
        setTimeout(() => {
          onConnectionSuccess(config);
        }, 1000);
      } else {
        setTestResult('error');
        toast.error('Connection failed. Please check your credentials.');
      }
    } catch (error) {
      setTestResult('error');
      toast.error('Connection failed. Make sure the server is running.');
      console.error('Connection error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Branded Header */}
        <BrandedHeader 
          title="Database Analytics"
          subtitle="Connect to your database to unlock powerful insights"
        />

        {/* Connection Form */}
        <Card className="p-8 bg-white/80 backdrop-blur-sm border border-white/20 professional-shadow-lg">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="driver" className="text-slate-700 font-semibold text-sm">Database Driver</Label>
                <Input
                  id="driver"
                  value={config.driver}
                  onChange={(e) => handleInputChange('driver', e.target.value)}
                  className="mt-2 bg-white border-slate-200 focus:border-primary focus:ring-primary/20 font-medium"
                />
              </div>
              <div>
                <Label htmlFor="port" className="text-slate-700 font-semibold text-sm">Port</Label>
                <Input
                  id="port"
                  type="number"
                  value={config.port}
                  onChange={(e) => handleInputChange('port', parseInt(e.target.value))}
                  className="mt-2 bg-white border-slate-200 focus:border-primary focus:ring-primary/20 font-medium"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="server" className="text-slate-700 font-semibold text-sm">Host/Server</Label>
              <Input
                id="server"
                value={config.server}
                onChange={(e) => handleInputChange('server', e.target.value)}
                className="mt-2 bg-white border-slate-200 focus:border-primary focus:ring-primary/20 font-medium"
              />
            </div>

            <div>
              <Label htmlFor="database" className="text-slate-700 font-semibold text-sm">Database Name</Label>
              <Input
                id="database"
                value={config.database}
                onChange={(e) => handleInputChange('database', e.target.value)}
                className="mt-2 bg-white border-slate-200 focus:border-primary focus:ring-primary/20 font-medium"
              />
            </div>

            <div>
              <Label htmlFor="username" className="text-slate-700 font-semibold text-sm">Username</Label>
              <Input
                id="username"
                value={config.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="mt-2 bg-white border-slate-200 focus:border-primary focus:ring-primary/20 font-medium"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-slate-700 font-semibold text-sm">Password</Label>
              <Input
                id="password"
                type="password"
                value={config.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="mt-2 bg-white border-slate-200 focus:border-primary focus:ring-primary/20 font-medium"
              />
            </div>

            <Button
              onClick={testConnection}
              disabled={isLoading}
              className="w-full gradient-primary text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-all duration-200 professional-shadow"
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Testing Connection...
                </>
              ) : testResult === 'success' ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                  Connection Successful
                </>
              ) : testResult === 'error' ? (
                <>
                  <XCircle className="w-5 h-5 mr-2 text-red-400" />
                  Connection Failed
                </>
              ) : (
                <>
                  <Database className="w-5 h-5 mr-2" />
                  Connect to Database
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CredentialForm;
