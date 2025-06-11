
import React, { useState } from 'react';
import CredentialForm from '../components/CredentialForm';
import Dashboard from '../components/Dashboard';
import FloatingAssistant from '../components/FloatingAssistant';

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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200" style={{ backgroundColor: '#e0e5ec' }}>
      {!isConnected ? (
        <CredentialForm onConnectionSuccess={handleConnectionSuccess} />
      ) : (
        <Dashboard config={config!} onDisconnect={handleDisconnect} />
      )}
      <FloatingAssistant />
    </div>
  );
};

export default Index;
