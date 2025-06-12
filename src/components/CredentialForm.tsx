import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Database, Shield, Zap } from 'lucide-react';
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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Branded Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/ef401703-93b4-4092-a126-10c8ef5bbb92.png" 
              alt="The Baap Company Logo" 
              className="w-20 h-20 rounded-2xl shadow-2xl"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white font-afacad tracking-wide mb-2">
              The Baap Company
            </h1>
            <p className="text-slate-300 font-afacad text-lg">
              Business Applications and Platforms
            </p>
            <p className="text-slate-400 font-afacad text-sm mt-2">
              Professional Database Analytics Platform
            </p>
          </div>
        </div>

        {/* Connection Form */}
        <Card className="bg-slate-800/80 backdrop-blur-lg border-slate-600/50 professional-shadow-lg">
          <CardContent>
            <CardHeader>
              <CardTitle>Connect to Your Database</CardTitle>
              <CardDescription>Unlock powerful insights with our professional analytics platform.</CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="flex items-center justify-center">
            <Shield className="w-12 h-12 text-primary" />
            <p className="text-slate-700 font-semibold text-sm">Secure Data Protection</p>
          </div>
          <div className="flex items-center justify-center">
            <Zap className="w-12 h-12 text-primary" />
            <p className="text-slate-700 font-semibold text-sm">Automated Analytics</p>
          </div>
          <div className="flex items-center justify-center">
            <Database className="w-12 h-12 text-primary" />
            <p className="text-slate-700 font-semibold text-sm">Powerful Insights</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CredentialForm;
