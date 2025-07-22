import React, { useState, useEffect } from 'react';
import { AlertTriangle, TrendingUp, Wrench, CheckCircle, Clock, DollarSign, Activity, Settings, Wifi, Search, Calendar, FileText, BarChart3 } from 'lucide-react';

const Card = ({ children, className = '' }) => (
  <div className={`bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 ${className}`}>
    {children}
  </div>
);

const IconWrapper = ({ icon: Icon, className = '' }) => (
  <div className={`p-3 rounded-full ${className}`}>
    <Icon className="w-6 h-6" />
  </div>
);

const StatCard = ({ icon: Icon, iconBg, title, value, change, color }) => (
  <Card className="p-4">
    <div className="flex items-center">
      <IconWrapper icon={Icon} className={`${iconBg} text-${color}-600 mr-4`} />
      <div>
        <h3 className="text-sm font-semibold text-gray-500">{title}</h3>
        <div className={`text-2xl font-bold text-${color}-600`}>{value}</div>
        {change && <div className={`text-xs text-emerald-600 font-medium`}>{change}</div>}
      </div>
    </div>
  </Card>
);

const EnhancedHydromatDemo = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

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
      temp: 130,
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

    const initialLoadTimer = setTimeout(() => setIsLoading(false), 1500);

    return () => {
      clearInterval(timer);
      clearTimeout(initialLoadTimer);
    };
  }, []);

  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 90) return 'text-emerald-500';
    if (efficiency >= 75) return 'text-amber-500';
    return 'text-red-500';
  };

  const getEfficiencyBgColor = (efficiency) => {
    if (efficiency >= 90) return 'bg-emerald-500';
    if (efficiency >= 75) return 'bg-amber-500';
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
      query: "Show me D16's records on the BL0250 part from March 2024",
      response: {
        type: "audit_trail",
        data: {
          machine: "D16",
          partNumber: "BL0250",
          dateRange: "March 8-22, 2024",
          totalParts: 47850,
          qualityMetrics: {
            overallOEE: 93.7,
            scrapRate: 0.4,
            reworkRate: 1.2
          },
          keyEvents: [
            {
              date: "Mar 20, 2024",
              event: "Quality deviation detected - Bore dimension +0.0004\"",
              reason: "Tool wear on T01 (drill) exceeded threshold",
              resolution: "Emergency tool change, CMM verification on last 250 parts",
              impact: "8 parts scrapped, $280 cost, customer notification sent"
            },
            {
              date: "Mar 15, 2024", 
              event: "Preventive maintenance completed - Spindle bearing replacement",
              reason: "Scheduled 50,000 cycle maintenance",
              resolution: "OEM bearings installed, alignment verified",
              impact: "4 hour downtime, efficiency improved from 91% to 96%"
            },
            {
              date: "Mar 12, 2024",
              event: "Operator certification - New hire training",
              reason: "Sarah K. initial certification for BL0250 production",
              resolution: "Passed all quality checks, approved by Ken (supervisor)",
              impact: "Additional qualified operator, increased capacity"
            }
          ],
          machineSettings: {
            spindleSpeed: "2650 RPM",
            feedRate: "11.8 IPM", 
            coolantPressure: "88 PSI",
            toolLife: "Station 1: 92%, Station 2: 87%, Station 3: 84%"
          },
          customerImpact: "Ford Motor Company - 47,842 parts shipped, 8 parts quarantined"
        }
      }
    },
    {
      query: "Pull quality history for part BK5744 from last 18 months",
      response: {
        type: "quality_history",
        data: {
          partNumber: "BK5744",
          dateRange: "September 2023 - March 2024 (18 months)",
          totalProduced: 892540,
          overallMetrics: {
            scrapRate: 0.7,
            reworkRate: 2.1,
            customerComplaints: 3,
            firstPassYield: 97.2
          },
          qualityTrends: [
            {
              period: "Mar 2024",
              scrapRate: 0.3,
              issue: "None - Best performance period",
              action: "Process validated, parameters locked"
            },
            {
              period: "Jan 2024", 
              scrapRate: 1.4,
              issue: "Surface finish roughness exceeding 32 Ra",
              action: "Tool change frequency increased, coolant mixture adjusted"
            },
            {
              period: "Nov 2023",
              scrapRate: 2.8,
              issue: "Dimensional drift on outer diameter (+0.0008\")",
              action: "Machine D7 recalibration, new CMM protocol implemented"
            }
          ],
          customerFeedback: [
            {
              customer: "General Motors",
              date: "Feb 2024",
              issue: "3 parts found with minor surface defects",
              resolution: "Root cause analysis completed, process improved",
              status: "Closed - Customer satisfied"
            }
          ],
          correctiveActions: "Enhanced TechniCheck monitoring, operator training refresh, tool supplier audit"
        }
      }
    },
    {
      query: "What were D22's exact settings during the quality issue in January 2024",
      response: {
        type: "settings_investigation",
        data: {
          machine: "D22",
          incident: "Quality Issue - January 18, 2024, 11:47 AM",
          partNumber: "BL1118",
          issueDescription: "Bore diameter out of tolerance (+0.0012\")",
          machineSettings: {
            beforeIncident: {
              spindleSpeed: "2400 RPM",
              feedRate: "9.5 IPM",
              coolantPressure: "82 PSI",
              toolOffsets: "T01: +0.0002\", T02: -0.0001\", T03: +0.0004\"",
              operatorOverride: "Feed rate increased to 115% by Mike T."
            },
            duringIncident: {
              spindleSpeed: "2400 RPM (unchanged)",
              feedRate: "10.9 IPM (115% override active)",
              coolantPressure: "79 PSI (3 PSI drop detected)",
              alarms: "T01 Tool Wear Warning (ignored), Coolant Pressure Low",
              operatorActions: "Override increased to 120%, alarm acknowledged"
            }
          },
          rootCause: "Excessive feed rate override combined with worn drill T01 and low coolant pressure",
          partsAffected: 47,
          disposition: "23 parts scrapped, 24 parts reworked and approved",
          corrective: "Tool change procedure updated, operator retraining, coolant system PM",
          cost: "$1,640 total impact",
          customerNotification: "Ford Quality Engineering notified within 24 hours per contract"
        }
      }
    },
    {
      query: "Show me all operator certifications for BL0420 parts",
      response: {
        type: "operator_certifications",
        data: {
          partNumber: "BL0420",
          certificationRequirement: "Automotive Tier 1 - Critical Safety Component",
          certifiedOperators: [
            {
              name: "Nathan M.",
              certificationDate: "March 15, 2023",
              expirationDate: "March 15, 2025",
              trainingHours: 40,
              testScore: 98,
              supervisor: "Ken (Production Supervisor)",
              qualityRecord: "Zero defects in 18 months, 97.2% efficiency average",
              machinesQualified: ["D16", "D18", "D22", "D7"]
            },
            {
              name: "Sarah K.",
              certificationDate: "August 22, 2023", 
              expirationDate: "August 22, 2025",
              trainingHours: 44,
              testScore: 94,
              supervisor: "Rob (Shift Lead)",
              qualityRecord: "1 minor deviation (corrected), 94.8% efficiency average",
              machinesQualified: ["D16", "D12"]
            },
            {
              name: "Mike T.",
              certificationDate: "January 10, 2024",
              expirationDate: "January 10, 2026", 
              trainingHours: 36,
              testScore: 91,
              supervisor: "Ken (Production Supervisor)",
              qualityRecord: "2 minor deviations, retraining completed, 92.1% efficiency",
              machinesQualified: ["D22", "D7"],
              notes: "Additional monitoring required per corrective action"
            }
          ],
          recentTraining: [
            {
              date: "February 2024",
              type: "Refresher Training - Tool Change Procedures",
              attendees: "All certified operators",
              reason: "January quality incident root cause"
            }
          ],
          complianceStatus: "CURRENT - All certifications valid, next audit due April 2024"
        }
      }
    },
    {
      query: "Trace all parts shipped to Ford in February 2024",
      response: {
        type: "shipment_traceability", 
        data: {
          customer: "Ford Motor Company",
          shipmentPeriod: "February 1-29, 2024",
          totalShipped: 28450,
          shipmentDetails: [
            {
              shipDate: "Feb 5, 2024",
              quantity: 5000,
              machines: ["D16", "D18"],
              operators: ["Nathan M.", "Sarah K."],
              qualityInspector: "Christine",
              shippingDoc: "FMC-240205-001",
              lotNumbers: ["DP240205A", "DP240205B"],
              customerPO: "Ford-PO-8847392"
            },
            {
              shipDate: "Feb 12, 2024", 
              quantity: 7200,
              machines: ["D16", "D22"],
              operators: ["Nathan M.", "Mike T."],
              qualityInspector: "Christine",
              shippingDoc: "FMC-240212-001",
              lotNumbers: ["DP240212A", "DP240212B", "DP240212C"],
              customerPO: "Ford-PO-8847392"
            },
            {
              shipDate: "Feb 19, 2024",
              quantity: 8150,
              machines: ["D16", "D18", "D12"],
              operators: ["Nathan M.", "Sarah K."],
              qualityInspector: "Christine", 
              shippingDoc: "FMC-240219-001",
              lotNumbers: ["DP240219A", "DP240219B", "DP240219C"],
              customerPO: "Ford-PO-8851204"
            },
            {
              shipDate: "Feb 26, 2024",
              quantity: 8100,
              machines: ["D16", "D7"],
              operators: ["Nathan M.", "Mike T."],
              qualityInspector: "Christine",
              shippingDoc: "FMC-240226-001", 
              lotNumbers: ["DP240226A", "DP240226B"],
              customerPO: "Ford-PO-8851204"
            }
          ],
          qualityData: {
            inspectionRecords: "100% dimensional verification per Ford Q1 requirements",
            certificates: "Material certs, heat treat certs, dimensional reports included",
            nonConformances: "Zero - All shipments passed final inspection"
          },
          traceabilityChain: "Raw material lot → Machine production → Quality inspection → Packaging → Shipping → Customer receipt confirmation",
          auditTrail: "Complete documentation retained for 10 years per automotive standard"
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
          <div className="space-y-3">
            <h4 className="font-semibold text-blue-600 flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Machine D22 - Button Sequence Analysis
            </h4>
            {response.data.map((entry, idx) => (
              <div key={idx} className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border-l-4 border-blue-500 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-mono text-sm text-gray-600 bg-white px-2 py-1 rounded">{entry.time}</span>
                  <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">{entry.station}</span>
                </div>
                <div className="font-medium text-gray-800 mb-2 font-mono text-sm">{entry.sequence}</div>
                <div className={`text-sm flex items-center ${entry.error === 'None' ? 'text-emerald-600' : 'text-red-600'}`}>
                  {entry.error === 'None' ? 
                    <><CheckCircle className="w-4 h-4 mr-1" /> Normal Operation</> : 
                    <><AlertTriangle className="w-4 h-4 mr-1" /> {entry.error}</>
                  }
                </div>
                <div className="text-xs text-gray-500 mt-1">{entry.operator}</div>
              </div>
            ))}
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-start">
                <div className="bg-yellow-500 text-white rounded-full p-1 mr-3 mt-0.5">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-yellow-800">🤖 AI Pattern Analysis:</strong>
                  <div className="text-yellow-700 text-sm mt-1">
                    Multiple tool breaks on Station 3 correlating with spindle overload events. Recommend immediate spindle bearing inspection.
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'maintenance_schedule':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-blue-600 flex items-center">
              <Wrench className="w-4 h-4 mr-2" />
              Today's Maintenance Schedule
            </h4>
            {response.data.map((item, idx) => (
              <div key={idx} className={`p-4 rounded-xl border-l-4 shadow-sm ${
                item.priority === 'HIGH' ? 'bg-gradient-to-r from-red-50 to-pink-50 border-red-500' :
                item.priority === 'MEDIUM' ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-500' :
                'bg-gradient-to-r from-green-50 to-emerald-50 border-green-500'
              }`}>
                <div className="flex justify-between items-start mb-3">
                  <div className="font-semibold text-lg flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${
                      item.priority === 'HIGH' ? 'bg-red-500' :
                      item.priority === 'MEDIUM' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    Machine {item.machine}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    item.priority === 'HIGH' ? 'bg-red-100 text-red-700' :
                    item.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {item.priority} PRIORITY
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-white bg-opacity-70 p-3 rounded-lg">
                    <strong className="text-gray-800">Issue:</strong> {item.issue}
                  </div>
                  <div className="bg-white bg-opacity-70 p-3 rounded-lg">
                    <strong className="text-gray-800">AI Analysis:</strong> {item.analysis}
                  </div>
                  
                  <div className="bg-white bg-opacity-70 p-3 rounded-lg">
                    <strong className="text-gray-800">Data Sources:</strong>
                    <ul className="ml-4 mt-2 space-y-1">
                      {item.sources.map((source, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {source}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <strong className="text-blue-800">Recommendation:</strong> {item.recommendation}
                  </div>
                  
                  <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                    <strong className="text-emerald-800">💰 Cost Impact:</strong> {item.costImpact}
                  </div>
                </div>
                
                <div className="mt-4 flex gap-2">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Schedule Now
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors flex items-center">
                    <FileText className="w-4 h-4 mr-1" />
                    Create Work Ticket
                  </button>
                </div>
              </div>
            ))}
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-start">
                <div className="bg-blue-500 text-white rounded-full p-1 mr-3 mt-0.5">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-blue-800">💡 AI Insight:</strong>
                  <div className="text-blue-700 text-sm mt-1">
                    Scheduling all three maintenance items will prevent $5,600 in potential downtime costs for a total investment of $800.
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'audit_trail':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-blue-600 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Audit Trail: {response.data.machine} - {response.data.partNumber}
            </h4>
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-lg border border-gray-200">
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div><strong>Date Range:</strong> {response.data.dateRange}</div>
                <div><strong>Total Parts:</strong> {response.data.totalParts.toLocaleString()}</div>
                <div><strong>OEE:</strong> {response.data.qualityMetrics.overallOEE}%</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h5 className="font-medium text-gray-800">Key Events:</h5>
              {response.data.keyEvents.map((event, idx) => (
                <div key={idx} className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
                  <div className="font-medium text-gray-800">{event.date} - {event.event}</div>
                  <div className="text-sm text-gray-600 mt-2 space-y-1">
                    <div><strong>Reason:</strong> {event.reason}</div>
                    <div><strong>Resolution:</strong> {event.resolution}</div>
                    <div><strong>Impact:</strong> {event.impact}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-lg border border-gray-200">
              <h5 className="font-medium mb-3">Machine Settings:</h5>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div><strong>Spindle Speed:</strong> {response.data.machineSettings.spindleSpeed}</div>
                <div><strong>Feed Rate:</strong> {response.data.machineSettings.feedRate}</div>
                <div><strong>Coolant Pressure:</strong> {response.data.machineSettings.coolantPressure}</div>
                <div><strong>Tool Life:</strong> {response.data.machineSettings.toolLife}</div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <strong className="text-blue-800">Customer Impact:</strong> {response.data.customerImpact}
            </div>
          </div>
        );

      case 'quality_history':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-blue-600 flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              Quality History: {response.data.partNumber}
            </h4>
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-lg border border-gray-200">
              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div><strong>Period:</strong> {response.data.dateRange}</div>
                <div><strong>Total Produced:</strong> {response.data.totalProduced.toLocaleString()}</div>
                <div><strong>Scrap Rate:</strong> {response.data.overallMetrics.scrapRate}%</div>
                <div><strong>First Pass Yield:</strong> {response.data.overallMetrics.firstPassYield}%</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h5 className="font-medium text-gray-800">Quality Trends:</h5>
              {response.data.qualityTrends.map((trend, idx) => (
                <div key={idx} className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-medium">{trend.period} - Scrap Rate: {trend.scrapRate}%</div>
                      <div className="text-sm text-gray-600 mt-2 space-y-1">
                        <div><strong>Issue:</strong> {trend.issue}</div>
                        <div><strong>Action:</strong> {trend.action}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {response.data.customerFeedback.map((feedback, idx) => (
              <div key={idx} className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <strong className="text-yellow-800">Customer Feedback:</strong> {feedback.customer} ({feedback.date})
                <div className="text-sm mt-2 space-y-1">
                  <div><strong>Issue:</strong> {feedback.issue}</div>
                  <div><strong>Status:</strong> {feedback.status}</div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'settings_investigation':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-blue-600 flex items-center">
              <Search className="w-4 h-4 mr-2" />
              Settings Investigation: {response.data.machine}
            </h4>
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <div className="font-medium text-red-800">{response.data.incident}</div>
              <div className="text-sm text-red-700 mt-2">
                <div><strong>Part:</strong> {response.data.partNumber}</div>
                <div><strong>Issue:</strong> {response.data.issueDescription}</div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
                <h5 className="font-medium text-green-600 mb-3">Before Incident</h5>
                <div className="text-sm space-y-2">
                  <div><strong>Spindle:</strong> {response.data.machineSettings.beforeIncident.spindleSpeed}</div>
                  <div><strong>Feed:</strong> {response.data.machineSettings.beforeIncident.feedRate}</div>
                  <div><strong>Coolant:</strong> {response.data.machineSettings.beforeIncident.coolantPressure}</div>
                  <div><strong>Overrides:</strong> {response.data.machineSettings.beforeIncident.operatorOverride}</div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
                <h5 className="font-medium text-red-600 mb-3">During Incident</h5>
                <div className="text-sm space-y-2">
                  <div><strong>Spindle:</strong> {response.data.machineSettings.duringIncident.spindleSpeed}</div>
                  <div><strong>Feed:</strong> {response.data.machineSettings.duringIncident.feedRate}</div>
                  <div><strong>Coolant:</strong> {response.data.machineSettings.duringIncident.coolantPressure}</div>
                  <div><strong>Alarms:</strong> {response.data.machineSettings.duringIncident.alarms}</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-lg border border-gray-200">
              <div className="text-sm space-y-2">
                <div><strong>Root Cause:</strong> {response.data.rootCause}</div>
                <div><strong>Parts Affected:</strong> {response.data.partsAffected}</div>
                <div><strong>Disposition:</strong> {response.data.disposition}</div>
                <div><strong>Corrective Action:</strong> {response.data.corrective}</div>
                <div><strong>Total Cost:</strong> {response.data.cost}</div>
              </div>
            </div>
          </div>
        );

      case 'operator_certifications':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-blue-600 flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Operator Certifications: {response.data.partNumber}
            </h4>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <strong>Requirement:</strong> {response.data.certificationRequirement}
            </div>
            
            <div className="space-y-4">
              {response.data.certifiedOperators.map((operator, idx) => (
                <div key={idx} className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <h5 className="font-medium text-lg">{operator.name}</h5>
                    <span className="text-sm text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">Valid until {operator.expirationDate}</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <div><strong>Certified:</strong> {operator.certificationDate}</div>
                      <div><strong>Training Hours:</strong> {operator.trainingHours}</div>
                      <div><strong>Test Score:</strong> {operator.testScore}%</div>
                      <div><strong>Supervisor:</strong> {operator.supervisor}</div>
                    </div>
                    <div className="space-y-1">
                      <div><strong>Quality Record:</strong> {operator.qualityRecord}</div>
                      <div><strong>Machines:</strong> {operator.machinesQualified.join(', ')}</div>
                      {operator.notes && <div className="text-yellow-600"><strong>Notes:</strong> {operator.notes}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-lg border border-gray-200">
              <strong>Compliance Status:</strong> {response.data.complianceStatus}
            </div>
          </div>
        );

      case 'shipment_traceability':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-blue-600 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Shipment Traceability
            </h4>
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-lg border border-gray-200">
              <div className="grid md:grid-cols-3 gap-4">
                <div><strong>Customer:</strong> {response.data.customer}</div>
                <div><strong>Period:</strong> {response.data.shipmentPeriod}</div>
                <div><strong>Total Shipped:</strong> {response.data.totalShipped.toLocaleString()}</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h5 className="font-medium text-gray-800">Shipment Details:</h5>
              {response.data.shipmentDetails.map((shipment, idx) => (
                <div key={idx} className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <div><strong>Ship Date:</strong> {shipment.shipDate}</div>
                      <div><strong>Quantity:</strong> {shipment.quantity.toLocaleString()}</div>
                      <div><strong>Machines:</strong> {shipment.machines.join(', ')}</div>
                      <div><strong>Operators:</strong> {shipment.operators.join(', ')}</div>
                    </div>
                    <div className="space-y-1">
                      <div><strong>Inspector:</strong> {shipment.qualityInspector}</div>
                      <div><strong>Shipping Doc:</strong> {shipment.shippingDoc}</div>
                      <div><strong>Lot Numbers:</strong> {shipment.lotNumbers.join(', ')}</div>
                      <div><strong>Customer PO:</strong> {shipment.customerPO}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <h5 className="font-medium mb-3">Quality Verification:</h5>
              <div className="text-sm space-y-1">
                <div><strong>Inspection:</strong> {response.data.qualityData.inspectionRecords}</div>
                <div><strong>Certificates:</strong> {response.data.qualityData.certificates}</div>
                <div><strong>Non-conformances:</strong> {response.data.qualityData.nonConformances}</div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-gray-700">
            {typeof response.data === 'string' ? response.data : JSON.stringify(response.data)}
          </div>
        );
    }
  };

  const MachineCard = ({ machineId, data }) => {
    const statusColor = data.status === 'running' ? 'text-emerald-600' : 
                       data.status === 'warning' ? 'text-amber-600' : 'text-red-600';
    const statusBg = data.status === 'running' ? 'bg-emerald-100' : 
                    data.status === 'warning' ? 'bg-amber-100' : 'bg-red-100';
    
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-blue-400 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-xl text-gray-800">{machineId}</h3>
            <div className="text-sm text-gray-500 font-medium">{data.partNumber}</div>
          </div>
          <div className="flex items-center space-x-2">
            <Wifi className={`w-5 h-5 ${data.wifi ? 'text-emerald-500' : 'text-red-500'}`} />
            <div className={`px-3 py-1 rounded-full text-xs font-bold ${statusBg} ${statusColor}`}>
              {data.status.toUpperCase()}
            </div>
          </div>
        </div>

        <div className="space-y-5 flex-grow">
          <div>
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-sm text-gray-600 font-medium">Efficiency</span>
              <span className={`font-bold text-2xl ${getEfficiencyColor(data.efficiency)}`}>
                {data.efficiency}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full transition-all duration-500 ${getEfficiencyBgColor(data.efficiency)}`}
                style={{ width: `${Math.min(data.efficiency, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="text-gray-500 text-xs font-medium">TEMP</div>
              <div className="font-bold text-gray-800 text-lg">{data.temp}°F</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="text-gray-500 text-xs font-medium">LAST 5 MIN</div>
              <div className="font-bold text-gray-800 text-lg">{data.parts.last5min}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="text-gray-500 text-xs font-medium">LAST HOUR</div>
              <div className="font-bold text-gray-800 text-lg">{data.parts.lastHour}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="text-gray-500 text-xs font-medium">SHIFT TOTAL</div>
              <div className="font-bold text-gray-800 text-lg">{data.parts.shiftStart}</div>
            </div>
          </div>
        </div>

        <div className="pt-5 mt-5 border-t border-gray-100">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600 font-medium">Target Progress</span>
            <span className="text-sm font-bold text-gray-800">
              {data.target.current.toLocaleString()}/{data.target.total.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="h-2.5 rounded-full bg-blue-500 transition-all duration-500"
              style={{ width: `${(data.target.current / data.target.total) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  // Basic Error Boundary
  class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
      return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
      console.error("Uncaught error:", error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        return (
          <div className="p-6 text-center">
            <h2 className="text-lg font-semibold text-red-600">Something went wrong.</h2>
            <p className="text-gray-600">Please refresh the page or try again later.</p>
          </div>
        );
      }

      return this.props.children;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white shadow-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold">Deutsche Precision Manufacturing Intelligence</h1>
              <p className="text-blue-100 text-sm">AI-Enhanced Hydromat Operations • Live Demo</p>
            </div>
            <div className="text-right">
              <div className="text-blue-200 text-xs font-medium">CURRENT TIME</div>
              <div className="text-lg font-mono font-bold">{currentTime.toLocaleTimeString()}</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
          <div className="border-b border-gray-200 bg-white">
            <nav className="flex space-x-2 p-2">
              {[
                { id: 'dashboard', label: 'Production Dashboard', icon: Activity },
                { id: 'audit', label: 'Audit Trail', icon: FileText },
                { id: 'ai-chat', label: 'AI Assistant', icon: Settings },
                { id: 'metrics', label: 'Business Impact', icon: BarChart3 }
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-4 sm:p-6 bg-gray-50">
            {activeTab === 'dashboard' && (
              <ErrorBoundary>
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
                    <div className="lg:col-span-3 xl:col-span-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="bg-gray-200 h-80 rounded-2xl"></div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="bg-gray-200 h-20 rounded-xl"></div>
                      <div className="bg-gray-200 h-20 rounded-xl"></div>
                      <div className="bg-gray-200 h-20 rounded-xl"></div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <div className="lg:col-span-3 xl:col-span-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.entries(machineData).map(([machineId, data]) => (
                          <MachineCard key={machineId} machineId={machineId} data={data} />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <StatCard
                        icon={TrendingUp}
                        iconBg="bg-blue-100"
                        title="Fleet OEE"
                        value="80.6%"
                        change="+5.6% vs baseline"
                        color="blue"
                      />
                      <StatCard
                        icon={AlertTriangle}
                        iconBg="bg-amber-100"
                        title="Active Alerts"
                        value="3"
                        change="Maintenance items"
                        color="amber"
                      />
                      <StatCard
                        icon={CheckCircle}
                        iconBg="bg-emerald-100"
                        title="Parts Today"
                        value="12,847"
                        change="Target: 15,000"
                        color="emerald"
                      />
                    </div>
                  </div>
                )}
              </ErrorBoundary>
            )}

        {activeTab === 'ai-chat' && (
          <div className="h-96 bg-gray-50">
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {chatMessages.length === 0 && (
                  <div className="text-center text-gray-500 py-12">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Settings className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">Deutsche Precision AI Assistant</h3>
                    <p className="text-gray-600">Ask me about machine performance, maintenance schedules, quality history, or audit trails.</p>
                  </div>
                )}
                
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-4xl p-4 rounded-xl shadow-sm ${
                      msg.type === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white text-gray-800 border border-gray-200'
                    }`}>
                      {msg.type === 'user' ? (
                        <div>{msg.content}</div>
                      ) : (
                        <ErrorBoundary>{renderChatResponse(msg.content)}</ErrorBoundary>
                      )}
                      <div className={`text-xs mt-2 ${
                        msg.type === 'user' ? 'text-blue-200' : 'text-gray-500'
                      }`}>
                        {msg.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 p-6 bg-white">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && inputMessage.trim() && handleSendMessage(inputMessage)}
                    placeholder="Ask about maintenance, audit trails, or machine analysis..."
                    className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => inputMessage.trim() && handleSendMessage(inputMessage)}
                    className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors font-medium"
                  >
                    Send
                  </button>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {predefinedQueries.map((query, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(query.query)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-full text-gray-700 transition-colors border border-gray-200"
                    >
                      {query.query}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="p-6 bg-gray-50">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
              <div className="border-b border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <FileText className="w-6 h-6 mr-2" />
                  Historical Production Audit Trail
                </h3>
                <p className="text-sm text-gray-600 mt-2">Query historical machine data, quality records, and operational events for automotive compliance</p>
              </div>
              
              <div className="p-6">
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

                <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors mb-6 font-medium flex items-center">
                  <Search className="w-4 h-4 mr-2" />
                  Generate Audit Report
                </button>

                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      Audit Report Generated
                    </h4>
                    <div className="grid md:grid-cols-4 gap-4 text-sm">
                      <div><strong>Machine:</strong> D16</div>
                      <div><strong>Part:</strong> 386 Part</div>
                      <div><strong>Period:</strong> Jan 14, 2023 - Jan 28, 2023</div>
                      <div><strong>Total Parts:</strong> 18,640</div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Quality Performance Summary
                    </h4>
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                        <div className="text-sm text-emerald-600 font-medium">Overall OEE</div>
                        <div className="text-2xl font-bold text-emerald-700">94.2%</div>
                        <div className="text-xs text-emerald-600">+2.8% vs target</div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="text-sm text-blue-600 font-medium">Scrap Rate</div>
                        <div className="text-2xl font-bold text-blue-700">0.12%</div>
                        <div className="text-xs text-blue-600">-0.3% vs baseline</div>
                      </div>
                      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                        <div className="text-sm text-amber-600 font-medium">Cycle Time</div>
                        <div className="text-2xl font-bold text-amber-700">47.3s</div>
                        <div className="text-xs text-amber-600">-2.1s optimized</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <div className="text-sm text-purple-600 font-medium">Tool Changes</div>
                        <div className="text-2xl font-bold text-purple-700">12</div>
                        <div className="text-xs text-purple-600">Scheduled: 8, Emergency: 4</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Key Events Timeline
                    </h4>
                    <div className="space-y-3">
                      <div className="border-l-4 border-blue-400 bg-blue-50 p-4 rounded">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium text-red-800">January 18, 2023 - 11:20</div>
                            <div className="text-sm text-red-700">Emergency stop - Coolant leak detected at Station 2</div>
                            <div className="text-xs text-red-600">Response time: 3 minutes | Repair time: 1.2 hours</div>
                          </div>
                          <div className="text-sm text-red-600 font-medium">$890 repair cost</div>
                        </div>
                      </div>

                      <div className="border-l-4 border-green-400 bg-green-50 p-4 rounded">
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

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                      <Settings className="w-5 h-5 mr-2" />
                      Machine Settings Archive
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-3">Spindle Parameters</h5>
                        <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-2">
                          <div>Station 1 (Drill): 2,800 RPM, 0.008 IPR feed</div>
                          <div>Station 2 (Rough Ream): 1,200 RPM, 0.012 IPR feed</div>
                          <div>Station 3 (Finish Ream): 800 RPM, 0.006 IPR feed</div>
                          <div>Station 4 (Tap): 600 RPM, 0.040 IPR feed</div>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-700 mb-3">Quality Control</h5>
                        <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-2">
                          <div>Bore diameter: 0.3750" ±0.0002"</div>
                          <div>Surface finish: 32 Ra max</div>
                          <div>Thread class: 2B per ASME B1.1</div>
                          <div>CMM inspection: Every 50th part</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Operator Performance & Certifications
                    </h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                        <div className="font-medium text-emerald-800">Nathan M.</div>
                        <div className="text-sm text-emerald-700">Lead Operator - Shift 1</div>
                        <div className="text-xs text-emerald-600">Certified: BL0250, BK5744, 386 Part</div>
                        <div className="text-xs font-medium text-emerald-600 mt-2">96.8% Efficiency | Zero Quality Issues</div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="font-medium text-blue-800">Sarah K.</div>
                        <div className="text-sm text-blue-700">Operator - Shift 2</div>
                        <div className="text-xs text-blue-600">Certified: BL0250, BL0420</div>
                        <div className="text-xs font-medium text-blue-600 mt-2">94.2% Efficiency | 1 Minor Deviation</div>
                      </div>
                      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                        <div className="font-medium text-amber-800">Mike T.</div>
                        <div className="text-sm text-amber-700">Trainee - All Shifts</div>
                        <div className="text-xs text-amber-600">Training: 386 Part (In Progress)</div>
                        <div className="text-xs font-medium text-amber-600 mt-2">91.1% Efficiency | 2 Training Notes</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Customer Compliance & Traceability
                    </h4>
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-lg">
                      <div className="grid md:grid-cols-2 gap-6 text-sm">
                        <div>
                          <h5 className="font-medium text-gray-700 mb-3">Ford Motor Company Requirements</h5>
                          <div className="space-y-2">
                            <div className="flex items-center"><CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />Q1 Certification: Current</div>
                            <div className="flex items-center"><CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />Statistical Process Control: Active</div>
                            <div className="flex items-center"><CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />Dimensional verification: 100%</div>
                            <div className="flex items-center"><CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />Material certificates: On file</div>
                            <div className="flex items-center"><CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />Lot traceability: Complete</div>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-700 mb-3">Documentation Archive</h5>
                          <div className="space-y-2">
                            <div className="flex items-center"><FileText className="w-4 h-4 text-blue-500 mr-2" />18,640 parts shipped</div>
                            <div className="flex items-center"><FileText className="w-4 h-4 text-blue-500 mr-2" />Zero customer complaints</div>
                            <div className="flex items-center"><FileText className="w-4 h-4 text-blue-500 mr-2" />3 corrective action reports filed</div>
                            <div className="flex items-center"><FileText className="w-4 h-4 text-blue-500 mr-2" />1 process improvement implemented</div>
                            <div className="flex items-center"><FileText className="w-4 h-4 text-blue-500 mr-2" />7-year retention period active</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="p-6 space-y-6 bg-gray-50">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-6 text-gray-800">Financial Impact Projection</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-gray-700">Increased Production Revenue</span>
                    <span className="font-bold text-emerald-600 text-lg">+$13.2M/year</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-gray-700">Labor Cost Savings (30%)</span>
                    <span className="font-bold text-emerald-600 text-lg">+$2.8M/year</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-gray-700">Maintenance Cost Reduction</span>
                    <span className="font-bold text-emerald-600 text-lg">+$800K/year</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-gray-700">Quality Improvement Savings</span>
                    <span className="font-bold text-emerald-600 text-lg">+$500K/year</span>
                  </div>
                  <div className="flex justify-between items-center pt-4">
                    <span className="text-xl font-bold text-gray-800">Total Annual Value</span>
                    <span className="text-2xl font-bold text-emerald-600">$17.3M</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-6 text-gray-800">Implementation Phases</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <div className="font-semibold text-gray-800">Pilot Phase (Months 1-4)</div>
                      <div className="text-sm text-gray-600">5 machines • Basic AI chat • FOCAS integration</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <div className="font-semibold text-gray-800">Fleet Deployment (Months 5-8)</div>
                      <div className="text-sm text-gray-600">All 25 machines • Advanced AI chat • Predictive maintenance</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <div className="font-semibold text-gray-800">Autonomous Optimization (Months 9-12)</div>
                      <div className="text-sm text-gray-600">AI trainer system • Self-optimizing parameters • Expert knowledge capture</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">Competitive Advantages</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8" />
                  </div>
                  <div className="font-semibold text-blue-600 text-lg">Speed to Market</div>
                  <div className="text-sm text-gray-700 mt-2">Faster problem resolution and optimization cycles</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div className="font-semibold text-emerald-600 text-lg">Quality Leadership</div>
                  <div className="text-sm text-gray-700 mt-2">Predictive quality control and automotive compliance</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8" />
                  </div>
                  <div className="font-semibold text-purple-600 text-lg">Market Position</div>
                  <div className="text-sm text-gray-700 mt-2">Premium pricing through technological sophistication</div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                <BarChart3 className="w-6 h-6 mr-2" />
                Current Demo Performance vs Target
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center bg-blue-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">80.6%</div>
                  <div className="text-sm text-gray-600 font-medium">Current Fleet Efficiency</div>
                  <div className="text-xs text-emerald-600 font-semibold">+5.6% vs baseline</div>
                </div>
                <div className="text-center bg-emerald-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-emerald-600">$8,240</div>
                  <div className="text-sm text-gray-600 font-medium">Cost Savings Today</div>
                  <div className="text-xs text-emerald-600 font-semibold">Prevented downtime</div>
                </div>
                <div className="text-center bg-amber-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-amber-600">47</div>
                  <div className="text-sm text-gray-600 font-medium">AI Predictions Active</div>
                  <div className="text-xs text-blue-600 font-semibold">Real-time monitoring</div>
                </div>
                <div className="text-center bg-purple-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">1.6M</div>
                  <div className="text-sm text-gray-600 font-medium">Target Weekly Parts</div>
                  <div className="text-xs text-emerald-600 font-semibold">vs 1.1M current</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-b-xl border-t border-gray-200 mt-0">
        <div className="text-xs text-gray-600 text-center">
          <strong>Demonstration Status:</strong> This simulation replicates the exact Deutsche Precision machine interface with AI enhancement capabilities.
          <br />
          <em>Real implementation connects to FANUC 30i-B controls via FOCAS protocol for live production intelligence.</em>
        </div>
      </footer>
    </div>
    </ErrorBoundary>
  );
};

export default EnhancedHydromatDemo;
                            <div blue-800">January 26, 2023 - 14:20</div>
                            <div className="text-sm text-blue-700">Tool T03 (tap) reached 95% life - Auto-scheduled replacement</div>
                            <div className="text-xs text-blue-600">Operator: Nathan M. | Quality inspector: Christine</div>
                          </div>
                          <div className="text-sm text-blue-600 font-medium">Preventive</div>
                        </div>
                      </div>

                      <div className="border-l-4 border-red-400 bg-red-50 p-4 rounded">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium text-