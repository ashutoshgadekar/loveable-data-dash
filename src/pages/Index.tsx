
import React, { useState } from 'react';
import CredentialForm from '../components/CredentialForm';
import Dashboard from '../components/Dashboard';

export interface DatabaseConfig {
  driver: string;
  server: string;
  port: number;
  database: string;
  username: string;
  password: string;
}

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [config, setConfig] = useState<DatabaseConfig | null>(null);

  const handleConnectionSuccess = (dbConfig: DatabaseConfig) => {
    setConfig(dbConfig);
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setConfig(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 font-afacad">
      {!isConnected ? (
        <CredentialForm onConnectionSuccess={handleConnectionSuccess} />
      ) : (
        <Dashboard config={config!} onDisconnect={handleDisconnect} />
      )}
    </div>
  );
};

export default Index;
