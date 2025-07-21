import React, { useState, useEffect } from 'react';
import { 
  Wifi, 
  Star, 
  Users, 
  FileText, 
  Package, 
  X, 
  Clock,
  Timer,
  Calendar,
  Clock3
} from 'lucide-react';

interface MachineData {
  id: string;
  temperature: number;
  efficiency: number;
  rating: number;
  operators: number;
  partNumber: string;
  totalParts: number;
  scrapParts: number;
  parts: {
    last5min: number;
    lastHour: number;
    shiftStart: number;
    last24hr: number;
  };
  status: 'running' | 'warning' | 'error' | 'idle';
  isOnline: boolean;
}

const MachineCard: React.FC<{ data: MachineData }> = ({ data }) => {
  const getStatusColor = (efficiency: number, status: string) => {
    if (status === 'error') return 'text-red-600';
    if (status === 'warning') return 'text-yellow-600';
    if (efficiency >= 90) return 'text-green-600';
    if (efficiency >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressBarColor = (efficiency: number, status: string) => {
    if (status === 'error') return 'bg-red-500';
    if (status === 'warning') return 'bg-yellow-500';
    if (efficiency >= 90) return 'bg-green-500';
    if (efficiency >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getProgressBarBg = (efficiency: number, status: string) => {
    if (status === 'error') return 'bg-red-100';
    if (status === 'warning') return 'bg-yellow-100';
    if (efficiency >= 90) return 'bg-green-100';
    if (efficiency >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 relative shadow-sm">
      {/* Top left - WiFi and temperature */}
      <div className="absolute top-2 left-2 flex items-center space-x-1 text-sm">
        <Wifi className={`w-4 h-4 ${data.isOnline ? 'text-green-500' : 'text-red-500'}`} />
        <span className="text-gray-600">{data.temperature}°</span>
      </div>

      {/* Top right - Machine ID and rating */}
      <div className="absolute top-2 right-2 text-right">
        <div className="text-lg font-bold text-gray-800">{data.id}</div>
        <div className="flex items-center justify-end space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-base text-gray-600">{data.rating}</span>
        </div>
      </div>

      {/* Center - Efficiency circle */}
      <div className="flex justify-center items-center mt-8 mb-6">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-200"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - data.efficiency / 100)}`}
              className={getStatusColor(data.efficiency, data.status)}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-xl font-bold ${getStatusColor(data.efficiency, data.status)}`}>
              {data.efficiency}%
            </span>
          </div>
        </div>
      </div>

      {/* Bottom section with data */}
      <div className="space-y-1 text-sm">
        {/* Left column data */}
        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-purple-500" />
            <span className="font-medium">{data.operators}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 text-xs">Last 5 min</span>
            <Clock className="w-3 h-3 text-gray-400" />
            <span className="font-medium text-purple-600">{data.parts.last5min}</span>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-blue-500" />
            <span className="font-medium">{data.partNumber}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 text-xs">Last hour</span>
            <Timer className="w-3 h-3 text-gray-400" />
            <span className="font-medium text-purple-600">{data.parts.lastHour}</span>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <Package className="w-4 h-4 text-orange-500" />
            <span className="font-medium">{data.totalParts}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 text-xs">Shift start</span>
            <Calendar className="w-3 h-3 text-gray-400" />
            <span className="font-medium text-purple-600">{data.parts.shiftStart}</span>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <X className="w-4 h-4 text-red-500" />
            <span className="font-medium">{data.scrapParts}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 text-xs">Last 24hr</span>
            <Clock3 className="w-3 h-3 text-gray-400" />
            <span className="font-medium text-purple-600">{data.parts.last24hr}</span>
          </div>
        </div>
      </div>

      {/* Progress bar at bottom */}
      <div className={`mt-4 h-2 rounded-full ${getProgressBarBg(data.efficiency, data.status)}`}>
        <div 
          className={`h-2 rounded-full ${getProgressBarColor(data.efficiency, data.status)}`}
          style={{ width: `${data.efficiency}%` }}
        />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [machines] = useState<MachineData[]>([
    {
      id: 'D16',
      temperature: 102,
      efficiency: 87,
      rating: 5.4,
      operators: 648,
      partNumber: 'BL0250',
      totalParts: 9817,
      scrapParts: 0,
      parts: {
        last5min: 83,
        lastHour: 468,
        shiftStart: 648,
        last24hr: 9817
      },
      status: 'running',
      isOnline: true
    },
    {
      id: 'D22',
      temperature: 110,
      efficiency: 66,
      rating: 5.4,
      operators: 480,
      partNumber: 'BL1118',
      totalParts: 2431,
      scrapParts: 0,
      parts: {
        last5min: 36,
        lastHour: 173,
        shiftStart: 480,
        last24hr: 2431
      },
      status: 'warning',
      isOnline: true
    },
    {
      id: 'D18',
      temperature: 117,
      efficiency: 84,
      rating: 5.0,
      operators: 2832,
      partNumber: 'BK5109',
      totalParts: 320,
      scrapParts: 0,
      parts: {
        last5min: 57,
        lastHour: 702,
        shiftStart: 2145,
        last24hr: 8903
      },
      status: 'running',
      isOnline: true
    },
    {
      id: 'D11',
      temperature: 109,
      efficiency: 86,
      rating: 5.6,
      operators: 2851,
      partNumber: 'BK5740',
      totalParts: 081,
      scrapParts: 0,
      parts: {
        last5min: 54,
        lastHour: 506,
        shiftStart: 1974,
        last24hr: 7671
      },
      status: 'running',
      isOnline: true
    },
    {
      id: 'D10',
      temperature: 115,
      efficiency: 95,
      rating: 4.8,
      operators: 2842,
      partNumber: 'BL0420',
      totalParts: 990,
      scrapParts: 0,
      parts: {
        last5min: 66,
        lastHour: 780,
        shiftStart: 2527,
        last24hr: 12603
      },
      status: 'running',
      isOnline: true
    },
    {
      id: 'D3',
      temperature: 89,
      efficiency: 69,
      rating: 5.4,
      operators: 8040,
      partNumber: 'BL0417',
      totalParts: 452,
      scrapParts: 0,
      parts: {
        last5min: 24,
        lastHour: 138,
        shiftStart: 1640,
        last24hr: 11004
      },
      status: 'warning',
      isOnline: true
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">Manufacturing Machine Analytics Dashboard</h1>
          <p className="text-gray-300 mt-1">Real-time monitoring and performance metrics</p>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {machines.map((machine) => (
            <MachineCard key={machine.id} data={machine} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;