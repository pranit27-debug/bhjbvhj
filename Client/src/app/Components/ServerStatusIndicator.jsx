'use client';

import { useState, useEffect } from 'react';
import { getServerStatus } from '../../utils/oauth';

export default function ServerStatusIndicator() {
  const [serverStatus, setServerStatus] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      setIsChecking(true);
      const status = await getServerStatus();
      setServerStatus(status);
      setIsChecking(false);
    };

    checkStatus();
    
    // Check status every 30 seconds
    const interval = setInterval(checkStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (isChecking) {
    return (
      <div className="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-300 rounded-lg px-3 py-2 text-sm text-yellow-800">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
          Checking server...
        </div>
      </div>
    );
  }

  if (!serverStatus) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'error':
        return 'bg-orange-100 border-orange-300 text-orange-800';
      case 'offline':
        return 'bg-red-100 border-red-300 text-red-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online':
        return '🟢';
      case 'error':
        return '🟠';
      case 'offline':
        return '🔴';
      default:
        return '⚪';
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 border rounded-lg px-3 py-2 text-sm ${getStatusColor(serverStatus.status)}`}>
      <div className="flex items-center gap-2">
        <span>{getStatusIcon(serverStatus.status)}</span>
        <span className="font-medium">
          {serverStatus.status === 'online' ? 'Server Online' : 'Server Offline'}
        </span>
      </div>
      <div className="text-xs opacity-75 mt-1">
        {serverStatus.message}
      </div>
    </div>
  );
}
