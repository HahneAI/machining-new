import React, { useState, useEffect } from 'react';
import { AlertTriangle, TrendingUp, Wrench, CheckCircle, Clock, DollarSign, Activity, Settings, Wifi } from 'lucide-react';

const RealisticHydromatDemo = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Realistic machine data matching the actual dashboard
  const [machineData, setMachineData] = useState({
    D16: {
      efficiency: 87,
      temp: 102,
      partNumber: 'BL0250',
      parts: { last5min: 35, lastHour: 468, shiftStart: 648, last24hr: 9817 },
      target: { current: 622, total: 1000 },
      status: 'running',
      wifi: true
    },
    D18: {
      efficiency: 84,
      temp: 117,
      partNumber: 'BK5409',
      parts: { last5min: 57, lastHour: 702, shiftStart: 320, last24hr: 8903 },
      target: { current: 572, total: 800 },
      status: 'running',
      wifi: true
    },
    D22: {
      efficiency: 66,
      temp: 110,
      partNumber: 'BL1118',
      parts: { last5min: 0, lastHour: 173, shiftStart: 480, last24hr: 2431 },
      target: { current: 122, total: 800 },
      status: 'alert',
      wifi: true
    },
    D7: {
      efficiency: 72,
      temp: 139,
      partNumber: 'BK5744',
      parts: { last5min: 80, lastHour: 512, shiftStart: 386, last24hr: 12359 },
      target: { current: 87, total: 1000 },
      status: 'warning',
      wifi: true
    },
    D12: {
      efficiency: 94,
      temp: 115,
      partNumber: 'BL0420',
      parts: { last5min: 62, lastHour: 487, shiftStart: 1127, last24hr: 11038 },
      target: { current: 540, total: 1008 },
      status: 'running',
      wifi: true
    }
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate real-time updates
      setMachineData(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(machine => {
          if (Math.random() > 0.7) { // 30% chance of update
            updated[machine].parts.last5min = Math.floor(Math.random() * 80) + 20;
            updated[machine].efficiency = Math.max(50, Math.min(110, updated[machine].efficiency + (Math.random() - 0.5) * 4));
          }
        });
        return updated;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 85) return 'text-green-600';
    if (efficiency >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getEfficiencyBgColor = (efficiency) => {
    if (efficiency >= 85) return 'bg-green-500';
    if (efficiency >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const predefinedQueries = [
    {
      query: "Show me D22's button sequences from the last hour",
      response: {
        type: "button_sequence",
        data: [
          { time: "14:32:15", sequence: "CYCLE_START → FEED_HOLD → ALARM_RESET", error: "Tool Break Detected - T04", operator: "Nathan M.", station: "Station 3" },
          { time: "14:28:43", sequence: "PROG_STOP → TOOL_CHANGE → CYCLE_START", error: "None", operator: "Nathan M.", station: "Station 2" },
          { time: "14:25:12", sequence: "OVERRIDE_100 → FEED_HOLD → CYCLE_START", error: "Feed Rate Warning", operator: "Nathan M.", station: "Station 1" },
          { time: "14:20:09", sequence: "ALARM_RESET → MANUAL_MODE → AUTO_MODE", error: "Spindle Overload", operator: "Nathan M.", station: "Station 3" },
          { time: "14:15:33", sequence: "CYCLE_START → EMERGENCY_STOP", error: "Coolant Low Pressure", operator: "Nathan M.", station: "Station 4" }
        ]
      }
    },
    {
      query: "What's on the maintenance docket for today?",
      response: {
        type: "maintenance_schedule",
        data: [
          {
            machine: "D22",
            priority: "HIGH",
            issue: "Broken 2 ID drills in last 6 hours",
            analysis: "Drill failure pattern indicates spindle bearing wear",
            sources: [
              "TechniCheck fault logs (6 failures, Station 3)",
              "Operator inspection notes (yesterday - vibration reported)",
              "Part quality trends (bore diameter drift +0.0002\")"
            ],
            recommendation: "Replace spindle bearings during lunch break",
            costImpact: "Prevent $3,200 downtime vs $400 repair cost"
          },
          {
            machine: "D7",
            priority: "MEDIUM",
            issue: "Temperature running 130°F (15° above normal)",
            analysis: "Coolant pump seal degradation detected",
            sources: [
              "Temperature monitoring (consistent 130°F for 4 hours)",
              "Coolant pressure readings (8% below target)",
              "Maintenance history (last seal replacement 18 months ago)"
            ],
            recommendation: "Schedule pump seal replacement this week",
            costImpact: "Prevent $1,800 emergency repair vs $250 planned maintenance"
          },
          {
            machine: "D12",
            priority: "LOW",
            issue: "Tool holder showing minor wobble",
            analysis: "Tool holder balance needs adjustment",
            sources: [
              "Vibration analysis (2x normal at 3000 RPM)",
              "Surface finish measurements (0.0001\" variation increase)",
              "Operator feedback (slight vibration reported)"
            ],
            recommendation: "Rebalance tool holder during next tool change",
            costImpact: "Prevent $600 quality issues vs $150 rebalancing"
          }
        ]
      }
    },
    {
      query: "Show me D16's records on the BL0250 part from last month",
      response: {
        type: "audit_trail",
        data: {
          machine: "D16",
          partNumber: "BL0250",
          dateRange: "December 15-31, 2024",
          totalParts: 45680,
          qualityMetrics: {
            overallOEE: 91.2,
            scrapRate: 0.8,
            reworkRate: 2.1
          },
          keyEvents: [
            {
              date: "Dec 29, 2024",
              event: "Tool change T03 (end mill)",
              reason: "Scheduled replacement at 50,000 parts",
              impact: "Efficiency improved from 89% to 94%"
            },
            {
              date: "Dec 22, 2024", 
              event: "Quality issue - bore diameter +0.0003\"",
              reason: "Tool wear on T01 (drill)",
              resolution: "Tool replaced, parts re-inspected",
              impact: "12 parts scrapped, $340 cost"
            },
            {
              date: "Dec 18, 2024",
              event: "Coolant system maintenance",
              reason: "Scheduled PM",
              impact: "2 hour downtime, no quality impact"
            }
          ],
          machineSettings: {
            spindleSpeed: "2800 RPM",
            feedRate: "12.5 IPM", 
            coolantPressure: "85 PSI",
            toolLife: "Station 1: 87%, Station 2: 92%, Station 3: 76%"
          }
        }
      }
    }
  ];

  const handleSendMessage = async (message) => {
    const newMessage = { type: 'user', content: message, timestamp: new Date() };
    setChatMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    const matchedQuery = predefinedQueries.find(q => 
      message.toLowerCase().includes(q.query.toLowerCase().split(' ').slice(0, 3).join(' '))
    );

    setTimeout(() => {
      const response = matchedQuery || {
        query: message,
        response: {
          type: "general",
          data: "AI Analysis: Based on current machine data and historical patterns, I can provide detailed insights. Try asking about 'maintenance docket', 'button sequences', or 'audit records'."
        }
      };

      setChatMessages(prev => [...prev, {
        type: 'ai',
        content: response.response,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const renderChatResponse = (response) => {
    switch(response.type) {
      case 'button_sequence':
        return (
          <div className="space-y-2">
            <h4 className="font-semibold text-blue-600">Machine {response.data[0]?.sequence?.includes('D22') ? 'D22' : 'D22'} - Button Sequence Analysis</h4>
            {response.data.map((entry, idx) => (
              <div key={idx} className="bg-gray-50 p-3 rounded border-l-4 border-blue-400">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-mono text-sm text-gray-600">{entry.time}</span>
                      <span className="text-sm text-blue-600">{entry.station}</span>
                    </div>
                    <div className="font-medium text-gray-800">{entry.sequence}</div>
                    <div className={`text-sm ${entry.error === 'None' ? 'text-green-600' : 'text-red-600'}`}>
                      {entry.error}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 ml-4">{entry.operator}</span>
                </div>
              </div>
            ))}
            <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
              <strong>🤖 AI Pattern Analysis:</strong> Multiple tool breaks on Station 3 correlating with spindle overload events. Recommend immediate spindle bearing inspection.
            </div>
          </div>
        );

      case 'maintenance_schedule':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-blue-600">🔧 Today's Maintenance Schedule</h4>
            {response.data.map((item, idx) => (
              <div key={idx} className={`p-4 rounded-lg border-l-4 ${
                item.priority === 'HIGH' ? 'bg-red-50 border-red-400' :
                item.priority === 'MEDIUM' ? 'bg-yellow-50 border-yellow-400' :
                'bg-green-50 border-green-400'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="font-semibold text-lg">Machine {item.machine}</div>
                  <span className={`px-2 py-1 rounded text-sm font-semibold ${
                    item.priority === 'HIGH' ? 'bg-red-100 text-red-700' :
                    item.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {item.priority}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div><strong>Issue:</strong> {item.issue}</div>
                  <div><strong>AI Analysis:</strong> {item.analysis}</div>
                  
                  <div>
                    <strong>Data Sources:</strong>
                    <ul className="ml-4 mt-1">
                      {item.sources.map((source, i) => (
                        <li key={i} className="text-sm text-gray-700">✓ {source}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-white p-2 rounded border">
                    <strong>Recommendation:</strong> {item.recommendation}
                  </div>
                  
                  <div className="bg-green-100 p-2 rounded">
                    <strong>💰 Cost Impact:</strong> {item.costImpact}
                  </div>
                </div>
                
                <div className="mt-3 flex gap-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                    Schedule Now
                  </button>
                  <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300">
                    Create Work Ticket
                  </button>
                </div>
              </div>
            ))}
            
            <div className="bg-blue-50 p-3 rounded border border-blue-200">
              <strong>💡 AI Insight:</strong> Scheduling all three maintenance items will prevent $5,600 in potential downtime costs for a total investment of $800.
            </div>
          </div>
        );

      case 'audit_trail':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-blue-600">📊 Historical Production Analysis</h4>
            <div className="bg-white border rounded p-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <strong>Machine:</strong> {response.data.machine}<br/>
                  <strong>Part Number:</strong> {response.data.partNumber}<br/>
                  <strong>Date Range:</strong> {response.data.dateRange}
                </div>
                <div>
                  <strong>Total Parts:</strong> {response.data.totalParts.toLocaleString()}<br/>
                  <strong>OEE:</strong> {response.data.qualityMetrics.overallOEE}%<br/>
                  <strong>Scrap Rate:</strong> {response.data.qualityMetrics.scrapRate}%
                </div>
              </div>
              
              <div className="mb-4">
                <strong>Key Events:</strong>
                <div className="space-y-2 mt-2">
                  {response.data.keyEvents.map((event, i) => (
                    <div key={i} className="bg-gray-50 p-3 rounded border-l-2 border-blue-400">
                      <div className="flex justify-between">
                        <strong>{event.date}</strong>
                        <span className="text-sm text-gray-600">{event.event}</span>
                      </div>
                      <div className="text-sm text-gray-700">{event.reason}</div>
                      <div className="text-sm font-medium text-blue-600">{event.impact}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <strong>Machine Settings During Period:</strong>
                <div className="bg-gray-50 p-3 rounded mt-2">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>Spindle Speed: {response.data.machineSettings.spindleSpeed}</div>
                    <div>Feed Rate: {response.data.machineSettings.feedRate}</div>
                    <div>Coolant Pressure: {response.data.machineSettings.coolantPressure}</div>
                    <div>Tool Life: {response.data.machineSettings.toolLife}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div className="text-gray-700">{response.data}</div>;
    }
  };

  const MachineCard = ({ machineId, data }) => {
    const efficiency = Math.round(data.efficiency);
    const progressPercentage = (data.target.current / data.target.total) * 100;
    
    return (
      <div className="bg-white border-2 border-gray-200 rounded-lg p-4 relative">
        {/* WiFi indicator */}
        <div className="absolute top-2 left-2 flex items-center">
          <Wifi className={`w-4 h-4 ${data.wifi ? 'text-green-500' : 'text-red-500'}`} />
          <span className="text-xs ml-1">{data.temp}°</span>
        </div>
        
        {/* Machine ID and rating */}
        <div className="absolute top-2 right-2 text-right">
          <div className="text-lg font-bold">{machineId}</div>
          <div className="text-base text-gray-600">⭐ 5.4</div>
        </div>
        
        {/* Efficiency gauge */}
        <div className="flex justify-center items-center mt-8 mb-4">
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-200"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${efficiency * 2.827} 283`}
                className={getEfficiencyColor(efficiency)}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-xl font-bold ${getEfficiencyColor(efficiency)}`}>
                {efficiency}%
              </span>
            </div>
          </div>
        </div>
        
        {/* Production data */}
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>👥 {data.parts.shiftStart}</span>
            <span className="flex items-center">
              <span className="text-gray-500 mr-1">Last 5 min</span>
              <Clock className="w-3 h-3 mx-1 text-gray-400" />
              <span className="font-medium">{data.parts.last5min}</span>
            </span>
          </div>
          <div className="flex justify-between">
            <span>🔄 {data.partNumber}</span>
            <span className="flex items-center">
              <span className="text-gray-500 mr-1">Last hour</span>
              <Clock className="w-3 h-3 mx-1 text-gray-400" />
              <span className="font-medium">{data.parts.lastHour}</span>
            </span>
          </div>
          <div className="flex justify-between">
            <span>📦 {data.parts.last24hr.toLocaleString()}</span>
            <span className="flex items-center">
              <span className="text-gray-500 mr-1">Shift start</span>
              <Clock className="w-3 h-3 mx-1 text-gray-400" />
              <span className="font-medium">{data.parts.shiftStart}</span>
            </span>
          </div>
          <div className="flex justify-between">
            <span>❌ 0</span>
            <span className="flex items-center">
              <span className="text-gray-500 mr-1">Last 24hr</span>
              <Clock className="w-3 h-3 mx-1 text-gray-400" />
              <span className="font-medium">{data.parts.last24hr.toLocaleString()}</span>
            </span>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-3">
          <div className={`h-6 rounded-full overflow-hidden ${
            progressPercentage >= 80 ? 'bg-green-200' :
            progressPercentage >= 60 ? 'bg-yellow-200' : 'bg-red-200'
          }`}>
            <div 
              className={`h-full ${getEfficiencyBgColor(efficiency)} transition-all duration-300`}
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            ></div>
            <div className="text-center text-xs font-semibold text-white mt-1">
              {data.target.current} / {data.target.total}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-gray-100 min-h-screen">
      <div className="bg-gradient-to-r from-green-800 to-blue-800 text-white p-6 rounded-t-lg">
        <h1 className="text-3xl font-bold mb-2">DEUTSCHE PRECISION</h1>
        <p className="text-green-200">Division of Pamecha - Hydromat AI Integration Demo</p>
        <div className="text-sm text-blue-200 mt-2">
          Today is: {Math.floor(Math.random() * 300) + 150} | Current Time: {currentTime.toLocaleTimeString()}
        </div>
      </div>

      <div className="border-x border-gray-200 bg-white">
        <div className="flex bg-gray-50 border-b">
          {[
            { id: 'dashboard', label: 'Machine Dashboard', icon: Activity },
            { id: 'audit', label: 'Audit Trail', icon: Clock },
            { id: 'chat', label: 'AI Assistant', icon: Settings },
            { id: 'metrics', label: 'Impact Analysis', icon: DollarSign }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 font-medium ${
                  activeTab === tab.id 
                    ? 'bg-white border-b-2 border-blue-500 text-blue-600' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === 'dashboard' && (
          <div className="p-6 bg-gray-100">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">AI-Enhanced Production Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-green-600 font-medium">Fleet Efficiency</div>
                      <div className="text-2xl font-bold text-green-700">80.6%</div>
                      <div className="text-sm text-green-600">5 machines active</div>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-blue-600 font-medium">AI Predictions Active</div>
                      <div className="text-2xl font-bold text-blue-700">47</div>
                      <div className="text-sm text-blue-600">Maintenance alerts</div>
                    </div>
                    <CheckCircle className="w-8 h-8 text-blue-600" />
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-yellow-600 font-medium">Cost Savings Today</div>
                      <div className="text-2xl font-bold text-yellow-700">$8,240</div>
                      <div className="text-sm text-yellow-600">Prevented downtime</div>
                    </div>
                    <DollarSign className="w-8 h-8 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {Object.entries(machineData).map(([machineId, data]) => (
                <MachineCard key={machineId} machineId={machineId} data={data} />
              ))}
            </div>

            <div className="mt-6 bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border">
              <h3 className="font-semibold text-gray-800 mb-3">🤖 AI Real-Time Insights</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded shadow-sm border-l-4 border-red-400">
                  <div className="text-sm font-medium text-red-600">Critical Alert - D22</div>
                  <div className="text-sm">Tool failure imminent. Efficiency dropped to 66%. Schedule immediate maintenance to prevent $3,200 downtime.</div>
                </div>
                <div className="bg-white p-3 rounded shadow-sm border-l-4 border-yellow-400">
                  <div className="text-sm font-medium text-yellow-600">Performance Warning - D7</div>
                  <div className="text-sm">Temperature 139°F (24° above normal). Coolant system requires attention within 48 hours.</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="p-6">
            <div className="bg-white border rounded-lg">
              <div className="border-b border-gray-200 p-4">
                <h3 className="text-lg font-semibold">Historical Production Audit Trail</h3>
                <p className="text-sm text-gray-600">Query historical machine data, quality records, and operational events</p>
              </div>
              
              <div className="p-4">
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Machine</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>D16</option>
                      <option>D18</option>
                      <option>D22</option>
                      <option>D7</option>
                      <option>D12</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Part Number</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>BL0250</option>
                      <option>BK5744</option>
                      <option>BL0420</option>
                      <option>386 Part</option>
                      <option>2847 Part</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>January 14, 2023</option>
                      <option>Last 18 months</option>
                      <option>March 2024 Quality Issue</option>
                      <option>Custom Range</option>
                    </select>
                  </div>
                </div>

                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors mb-6">
                  Generate Audit Report
                </button>

                {/* Sample Audit Report */}
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">📋 Audit Report Generated</h4>
                    <div className="grid md:grid-cols-4 gap-4 text-sm">
                      <div><strong>Machine:</strong> D16</div>
                      <div><strong>Part:</strong> 386 Part</div>
                      <div><strong>Period:</strong> Jan 14, 2023 - Jan 28, 2023</div>
                      <div><strong>Total Parts:</strong> 18,640</div>
                    </div>
                  </div>

                  {/* Quality Metrics */}
                  <div className="bg-white border rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">📊 Quality Performance Summary</h4>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-green-50 p-3 rounded border border-green-200">
                        <div className="text-sm text-green-600 font-medium">Overall OEE</div>
                        <div className="text-2xl font-bold text-green-700">94.2%</div>
                        <div className="text-xs text-green-600">Above target (+2.2%)</div>
                      </div>
                      <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                        <div className="text-sm text-yellow-600 font-medium">Scrap Rate</div>
                        <div className="text-2xl font-bold text-yellow-700">0.6%</div>
                        <div className="text-xs text-yellow-600">Below target (-0.4%)</div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded border border-blue-200">
                        <div className="text-sm text-blue-600 font-medium">Rework Rate</div>
                        <div className="text-2xl font-bold text-blue-700">1.8%</div>
                        <div className="text-xs text-blue-600">Within tolerance</div>
                      </div>
                      <div className="bg-purple-50 p-3 rounded border border-purple-200">
                        <div className="text-sm text-purple-600 font-medium">First Pass Yield</div>
                        <div className="text-2xl font-bold text-purple-700">97.6%</div>
                        <div className="text-xs text-purple-600">Excellent performance</div>
                      </div>
                    </div>

                    {/* Dimensional Analysis */}
                    <div className="mb-4">
                      <h5 className="font-medium text-gray-700 mb-2">📏 Dimensional Analysis Trends</h5>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <strong>Bore Diameter:</strong><br/>
                            Target: 0.3750" ± 0.0005"<br/>
                            Actual Range: 0.3748" - 0.3752"<br/>
                            <span className="text-green-600">✓ Within specification</span>
                          </div>
                          <div>
                            <strong>Overall Length:</strong><br/>
                            Target: 2.125" ± 0.003"<br/>
                            Actual Range: 2.123" - 2.127"<br/>
                            <span className="text-green-600">✓ Within specification</span>
                          </div>
                          <div>
                            <strong>Surface Finish:</strong><br/>
                            Target: 32 Ra max<br/>
                            Actual Range: 18-28 Ra<br/>
                            <span className="text-green-600">✓ Excellent finish quality</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Operational Events Timeline */}
                  <div className="bg-white border rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">⏰ Operational Events Timeline</h4>
                    <div className="space-y-3">
                      <div className="border-l-4 border-green-400 bg-green-50 p-3 rounded">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium text-green-800">January 28, 2023 - 14:30</div>
                            <div className="text-sm text-green-700">Scheduled tool change completed - T02 (finish reamer)</div>
                            <div className="text-xs text-green-600">Operator: Nathan M. | Duration: 12 minutes</div>
                          </div>
                          <div className="text-sm text-green-600 font-medium">+2% efficiency gain</div>
                        </div>
                      </div>

                      <div className="border-l-4 border-yellow-400 bg-yellow-50 p-3 rounded">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium text-yellow-800">January 25, 2023 - 09:15</div>
                            <div className="text-sm text-yellow-700">Quality alert - Bore dimension trending +0.0002"</div>
                            <div className="text-xs text-yellow-600">Detected by: TechniCheck AI | Resolution: Tool offset adjustment</div>
                          </div>
                          <div className="text-sm text-yellow-600 font-medium">Prevented 47 scrap parts</div>
                        </div>
                      </div>

                      <div className="border-l-4 border-blue-400 bg-blue-50 p-3 rounded">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium text-blue-800">January 22, 2023 - 16:45</div>
                            <div className="text-sm text-blue-700">Preventive maintenance completed - Spindle bearing lubrication</div>
                            <div className="text-xs text-blue-600">Maintenance Tech: Marvin | Duration: 45 minutes</div>
                          </div>
                          <div className="text-sm text-blue-600 font-medium">Scheduled PM</div>
                        </div>
                      </div>

                      <div className="border-l-4 border-red-400 bg-red-50 p-3 rounded">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium text-red-800">January 18, 2023 - 11:20</div>
                            <div className="text-sm text-red-700">Emergency stop - Coolant leak detected at Station 2</div>
                            <div className="text-xs text-red-600">Response time: 3 minutes | Repair time: 1.2 hours</div>
                          </div>
                          <div className="text-sm text-red-600 font-medium">$890 repair cost</div>
                        </div>
                      </div>

                      <div className="border-l-4 border-green-400 bg-green-50 p-3 rounded">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium text-green-800">January 14, 2023 - 07:00</div>
                            <div className="text-sm text-green-700">Production run started - 386 Part setup complete</div>
                            <div className="text-xs text-green-600">Setup by: Ken (Production Supervisor) | First article approved</div>
                          </div>
                          <div className="text-sm text-green-600 font-medium">Run started</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Machine Settings Archive */}
                  <div className="bg-white border rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">⚙️ Machine Settings Archive</h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Spindle Parameters</h5>
                        <div className="bg-gray-50 p-3 rounded text-sm space-y-1">
                          <div>Station 1 (Drill): 2,800 RPM, 0.008 IPR feed</div>
                          <div>Station 2 (Rough Ream): 1,200 RPM, 0.012 IPR feed</div>
                          <div>Station 3 (Finish Ream): 800 RPM, 0.006 IPR feed</div>
                          <div>Station 4 (Chamfer): 3,200 RPM, 0.004 IPR feed</div>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Process Parameters</h5>
                        <div className="bg-gray-50 p-3 rounded text-sm space-y-1">
                          <div>Coolant Pressure: 85 PSI</div>
                          <div>Coolant Flow Rate: 12 GPM</div>
                          <div>Part Clamp Pressure: 350 PSI</div>
                          <div>Index Time: 8.2 seconds</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Operator Performance */}
                  <div className="bg-white border rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">👥 Operator Performance Summary</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left p-2">Operator</th>
                            <th className="text-left p-2">Shift</th>
                            <th className="text-left p-2">Parts Produced</th>
                            <th className="text-left p-2">Efficiency</th>
                            <th className="text-left p-2">Quality Issues</th>
                            <th className="text-left p-2">Response Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-100">
                            <td className="p-2 font-medium">Nathan M.</td>
                            <td className="p-2">Day Shift</td>
                            <td className="p-2">12,840</td>
                            <td className="p-2 text-green-600">96.2%</td>
                            <td className="p-2 text-green-600">0</td>
                            <td className="p-2 text-green-600">2.1 min avg</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="p-2 font-medium">Mike T.</td>
                            <td className="p-2">Afternoon</td>
                            <td className="p-2">3,920</td>
                            <td className="p-2 text-yellow-600">91.8%</td>
                            <td className="p-2 text-yellow-600">1</td>
                            <td className="p-2 text-yellow-600">3.4 min avg</td>
                          </tr>
                          <tr>
                            <td className="p-2 font-medium">Sarah K.</td>
                            <td className="p-2">Night Shift</td>
                            <td className="p-2">1,880</td>
                            <td className="p-2 text-blue-600">93.5%</td>
                            <td className="p-2 text-green-600">0</td>
                            <td className="p-2 text-blue-600">2.8 min avg</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* AI Insights */}
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border">
                    <h4 className="font-semibold text-gray-800 mb-3">🤖 AI Historical Analysis</h4>
                    <div className="space-y-2 text-sm">
                      <div className="bg-white p-3 rounded border-l-4 border-blue-400">
                        <strong>Pattern Recognition:</strong> D16 shows consistent high performance on 386 Part. Nathan M.'s operation resulted in 96.2% efficiency with zero quality issues.
                      </div>
                      <div className="bg-white p-3 rounded border-l-4 border-green-400">
                        <strong>Predictive Insight:</strong> TechniCheck AI successfully predicted bore dimension drift 2.3 hours before tolerance breach, preventing 47 scrap parts worth $1,645.
                      </div>
                      <div className="bg-white p-3 rounded border-l-4 border-yellow-400">
                        <strong>Optimization Opportunity:</strong> Station 2 rough reaming speed could be increased by 15% based on tool wear patterns and surface finish results from this run.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="p-6">
            <div className="bg-white border rounded-lg h-96 flex flex-col">
              <div className="border-b border-gray-200 p-4">
                <h3 className="text-lg font-semibold">Hydromat Manufacturing Intelligence</h3>
                <p className="text-sm text-gray-600">Ask about maintenance schedules, audit trails, or machine analysis</p>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-4xl p-3 rounded-lg ${
                      msg.type === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {msg.type === 'user' ? (
                        <div>{msg.content}</div>
                      ) : (
                        renderChatResponse(msg.content)
                      )}
                      <div className={`text-xs mt-1 ${
                        msg.type === 'user' ? 'text-blue-200' : 'text-gray-500'
                      }`}>
                        {msg.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 p-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && inputMessage.trim() && handleSendMessage(inputMessage)}
                    placeholder="Ask about maintenance, audit trails, or machine analysis..."
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => inputMessage.trim() && handleSendMessage(inputMessage)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Send
                  </button>
                </div>
                
                <div className="mt-3 flex flex-wrap gap-2">
                  {predefinedQueries.map((query, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(query.query)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-gray-700 transition-colors"
                    >
                      {query.query}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Financial Impact Projection</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Increased Production Revenue</span>
                    <span className="font-semibold text-green-600">+$13.2M/year</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Labor Cost Savings (30%)</span>
                    <span className="font-semibold text-green-600">+$2.8M/year</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Maintenance Cost Reduction</span>
                    <span className="font-semibold text-green-600">+$800K/year</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Quality Improvement Savings</span>
                    <span className="font-semibold text-green-600">+$500K/year</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 text-lg font-bold">
                    <span>Total Annual Value</span>
                    <span className="text-green-600">$17.3M</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Implementation Investment</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Development Investment</span>
                    <span className="font-semibold">$650K</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Performance Bonuses</span>
                    <span className="font-semibold">$800K</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Total Investment</span>
                    <span className="font-semibold">$1.45M</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 text-lg font-bold">
                    <span>ROI Payback Period</span>
                    <span className="text-blue-600">4-6 months</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">🚀 Competitive Advantage</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded shadow-sm">
                  <div className="font-semibold text-blue-600">First-Mover Advantage</div>
                  <div className="text-sm text-gray-700">Industry's first AI-integrated precision manufacturer</div>
                </div>
                <div className="bg-white p-4 rounded shadow-sm">
                  <div className="font-semibold text-green-600">Technology Leadership</div>
                  <div className="text-sm text-gray-700">Capabilities competitors cannot easily replicate</div>
                </div>
                <div className="bg-white p-4 rounded shadow-sm">
                  <div className="font-semibold text-purple-600">Market Position</div>
                  <div className="text-sm text-gray-700">Premium pricing through technological sophistication</div>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">📈 Current Demo Performance vs Target</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">80.6%</div>
                  <div className="text-sm text-gray-600">Current Fleet Efficiency</div>
                  <div className="text-xs text-green-600">+5.6% vs baseline</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">$8,240</div>
                  <div className="text-sm text-gray-600">Cost Savings Today</div>
                  <div className="text-xs text-green-600">Prevented downtime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">47</div>
                  <div className="text-sm text-gray-600">AI Predictions Active</div>
                  <div className="text-xs text-blue-600">Real-time monitoring</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">1.6M</div>
                  <div className="text-sm text-gray-600">Target Weekly Parts</div>
                  <div className="text-xs text-green-600">vs 1.1M current</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-50 p-4 rounded-b-lg border border-t-0 border-gray-200">
        <div className="text-sm text-gray-600 text-center">
          <strong>Demonstration Status:</strong> This simulation replicates the exact Deutsche Precision machine interface with AI enhancement capabilities.
          <br />
          <em>Real implementation connects to FANUC 30i-B controls via FOCAS protocol for live production intelligence.</em>
        </div>
      </div>
    </div>
  );
};

export default RealisticHydromatDemo;