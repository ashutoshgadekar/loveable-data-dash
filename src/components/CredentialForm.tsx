
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Database, Loader, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { DatabaseConfig } from '../pages/Index';

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
      <Card className="w-full max-w-md p-8 bg-gray-100 border-0 shadow-neumorphic">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 shadow-neumorphic-inset mb-4">
            <Database className="w-8 h-8 text-gray-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Database Connection</h1>
          <p className="text-gray-600">Configure your database credentials to get started</p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="driver" className="text-gray-700 font-medium">Driver</Label>
              <Input
                id="driver"
                value={config.driver}
                onChange={(e) => handleInputChange('driver', e.target.value)}
                className="mt-1 bg-gray-100 border-0 shadow-neumorphic-inset focus:shadow-neumorphic-inset-focus"
              />
            </div>
            <div>
              <Label htmlFor="port" className="text-gray-700 font-medium">Port</Label>
              <Input
                id="port"
                type="number"
                value={config.port}
                onChange={(e) => handleInputChange('port', parseInt(e.target.value))}
                className="mt-1 bg-gray-100 border-0 shadow-neumorphic-inset focus:shadow-neumorphic-inset-focus"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="server" className="text-gray-700 font-medium">Host/Server</Label>
            <Input
              id="server"
              value={config.server}
              onChange={(e) => handleInputChange('server', e.target.value)}
              className="mt-1 bg-gray-100 border-0 shadow-neumorphic-inset focus:shadow-neumorphic-inset-focus"
            />
          </div>

          <div>
            <Label htmlFor="database" className="text-gray-700 font-medium">Database</Label>
            <Input
              id="database"
              value={config.database}
              onChange={(e) => handleInputChange('database', e.target.value)}
              className="mt-1 bg-gray-100 border-0 shadow-neumorphic-inset focus:shadow-neumorphic-inset-focus"
            />
          </div>

          <div>
            <Label htmlFor="username" className="text-gray-700 font-medium">Username</Label>
            <Input
              id="username"
              value={config.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className="mt-1 bg-gray-100 border-0 shadow-neumorphic-inset focus:shadow-neumorphic-inset-focus"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
            <Input
              id="password"
              type="password"
              value={config.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="mt-1 bg-gray-100 border-0 shadow-neumorphic-inset focus:shadow-neumorphic-inset-focus"
            />
          </div>

          <Button
            onClick={testConnection}
            disabled={isLoading}
            className="w-full bg-gray-100 hover:bg-gray-50 text-gray-800 border-0 shadow-neumorphic hover:shadow-neumorphic-hover active:shadow-neumorphic-active transition-all duration-200"
          >
            {isLoading ? (
              <Loader className="w-4 h-4 mr-2 animate-spin" />
            ) : testResult === 'success' ? (
              <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
            ) : testResult === 'error' ? (
              <XCircle className="w-4 h-4 mr-2 text-red-600" />
            ) : (
              <Database className="w-4 h-4 mr-2" />
            )}
            {isLoading ? 'Testing Connection...' : 'Test Connection'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CredentialForm;
