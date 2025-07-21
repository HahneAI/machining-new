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
      query: "Trace all 386 parts shipped to Ford in February 2024",
      response: {
        type: "shipment_traceability", 
        data: {
          customer: "Ford Motor Company",
          partNumber: "386 Part",
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
                      {event.resolution && <div className="text-sm text-purple-600">{event.resolution}</div>}
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
              
              {response.data.customerImpact && (
                <div className="mt-4 bg-blue-50 p-3 rounded border border-blue-200">
                  <strong>Customer Impact:</strong> {response.data.customerImpact}
                </div>
              )}
            </div>
          </div>
        );

      case 'quality_history':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-blue-600">📈 Quality History Analysis</h4>
            <div className="bg-white border rounded p-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <strong>Part Number:</strong> {response.data.partNumber}<br/>
                  <strong>Period:</strong> {response.data.dateRange}<br/>
                  <strong>Total Produced:</strong> {response.data.totalProduced.toLocaleString()}
                </div>
                <div>
                  <strong>Scrap Rate:</strong> {response.data.overallMetrics.scrapRate}%<br/>
                  <strong>First Pass Yield:</strong> {response.data.overallMetrics.firstPassYield}%<br/>
                  <strong>Customer Complaints:</strong> {response.data.overallMetrics.customerComplaints}
                </div>
              </div>
              
              <div className="mb-4">
                <strong>Quality Trends:</strong>
                <div className="space-y-2 mt-2">
                  {response.data.qualityTrends.map((trend, i) => (
                    <div key={i} className={`p-3 rounded border-l-4 ${
                      trend.scrapRate < 1 ? 'bg-green-50 border-green-400' :
                      trend.scrapRate < 2 ? 'bg-yellow-50 border-yellow-400' :
                      'bg-red-50 border-red-400'
                    }`}>
                      <div className="flex justify-between">
                        <strong>{trend.period}</strong>
                        <span className="text-sm">Scrap Rate: {trend.scrapRate}%</span>
                      </div>
                      <div className="text-sm text-gray-700">{trend.issue}</div>
                      <div className="text-sm font-medium text-blue-600">{trend.action}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {response.data.customerFeedback.length > 0 && (
                <div className="mb-4">
                  <strong>Customer Feedback:</strong>
                  <div className="space-y-2 mt-2">
                    {response.data.customerFeedback.map((feedback, i) => (
                      <div key={i} className="bg-orange-50 p-3 rounded border-l-2 border-orange-400">
                        <div className="flex justify-between">
                          <strong>{feedback.customer}</strong>
                          <span className="text-sm text-gray-600">{feedback.date}</span>
                        </div>
                        <div className="text-sm text-gray-700">{feedback.issue}</div>
                        <div className="text-sm text-blue-600">{feedback.resolution}</div>
                        <div className="text-sm font-medium text-green-600">{feedback.status}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="bg-blue-50 p-3 rounded">
                <strong>Corrective Actions:</strong> {response.data.correctiveActions}
              </div>
            </div>
          </div>
        );

      case 'settings_investigation':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-blue-600">🔍 Quality Issue Investigation</h4>
            <div className="bg-white border rounded p-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <strong>Machine:</strong> {response.data.machine}<br/>
                  <strong>Incident:</strong> {response.data.incident}<br/>
                  <strong>Part Number:</strong> {response.data.partNumber}
                </div>
                <div>
                  <strong>Issue:</strong> {response.data.issueDescription}<br/>
                  <strong>Parts Affected:</strong> {response.data.partsAffected}<br/>
                  <strong>Total Cost:</strong> {response.data.cost}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded">
                  <strong className="text-green-700">Before Incident:</strong>
                  <div className="text-sm mt-1 space-y-1">
                    <div>Spindle: {response.data.machineSettings.beforeIncident.spindleSpeed}</div>
                    <div>Feed Rate: {response.data.machineSettings.beforeIncident.feedRate}</div>
                    <div>Coolant: {response.data.machineSettings.beforeIncident.coolantPressure}</div>
                    <div>Override: {response.data.machineSettings.beforeIncident.operatorOverride}</div>
                  </div>
                </div>
                <div className="bg-red-50 p-3 rounded border border-red-200">
                  <strong className="text-red-700">During Incident:</strong>
                  <div className="text-sm mt-1 space-y-1">
                    <div>Feed Rate: {response.data.machineSettings.duringIncident.feedRate}</div>
                    <div>Coolant: {response.data.machineSettings.duringIncident.coolantPressure}</div>
                    <div>Alarms: {response.data.machineSettings.duringIncident.alarms}</div>
                    <div>Actions: {response.data.machineSettings.duringIncident.operatorActions}</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                  <strong>Root Cause:</strong> {response.data.rootCause}
                </div>
                <div className="bg-blue-50 p-3 rounded border border-blue-200">
                  <strong>Disposition:</strong> {response.data.disposition}
                </div>
                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <strong>Corrective Action:</strong> {response.data.corrective}
                </div>
                <div className="bg-purple-50 p-3 rounded border border-purple-200">
                  <strong>Customer Notification:</strong> {response.data.customerNotification}
                </div>
              </div>
            </div>
          </div>
        );

      case 'operator_certifications':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-blue-600">👥 Operator Certification Records</h4>
            <div className="bg-white border rounded p-4">
              <div className="mb-4">
                <strong>Part Number:</strong> {response.data.partNumber}<br/>
                <strong>Requirement:</strong> {response.data.certificationRequirement}<br/>
                <strong>Status:</strong> <span className="text-green-600 font-medium">{response.data.complianceStatus}</span>
              </div>
              
              <div className="space-y-3">
                {response.data.certifiedOperators.map((operator, i) => (
                  <div key={i} className="bg-gray-50 p-4 rounded border">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="font-semibold text-lg">{operator.name}</div>
                        <div className="text-sm space-y-1">
                          <div>Certified: {operator.certificationDate}</div>
                          <div>Expires: {operator.expirationDate}</div>
                          <div>Test Score: {operator.testScore}%</div>
                          <div>Supervisor: {operator.supervisor}</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm space-y-1">
                          <div><strong>Machines:</strong> {operator.machinesQualified.join(", ")}</div>
                          <div><strong>Quality Record:</strong> {operator.qualityRecord}</div>
                          {operator.notes && (
                            <div className="text-orange-600"><strong>Notes:</strong> {operator.notes}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 bg-blue-50 p-3 rounded">
                <strong>Recent Training:</strong>
                <div className="text-sm mt-1">
                  {response.data.recentTraining.map((training, i) => (
                    <div key={i}>
                      {training.date} - {training.type} ({training.attendees}) - {training.reason}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'shipment_traceability':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-blue-600">🚚 Shipment Traceability Report</h4>
            <div className="bg-white border rounded p-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <strong>Customer:</strong> {response.data.customer}<br/>
                  <strong>Part Number:</strong> {response.data.partNumber}<br/>
                  <strong>Period:</strong> {response.data.shipmentPeriod}
                </div>
                <div>
                  <strong>Total Shipped:</strong> {response.data.totalShipped.toLocaleString()}<br/>
                  <strong>Shipments:</strong> {response.data.shipmentDetails.length}<br/>
                  <strong>Non-Conformances:</strong> {response.data.qualityData.nonConformances}
                </div>
              </div>
              
              <div className="mb-4">
                <strong>Shipment Details:</strong>
                <div className="space-y-2 mt-2">
                  {response.data.shipmentDetails.map((shipment, i) => (
                    <div key={i} className="bg-gray-50 p-3 rounded border">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <div><strong>{shipment.shipDate}</strong></div>
                          <div>Qty: {shipment.quantity.toLocaleString()}</div>
                          <div>Doc: {shipment.shippingDoc}</div>
                        </div>
                        <div>
                          <div>Machines: {shipment.machines.join(", ")}</div>
                          <div>Operators: {shipment.operators.join(", ")}</div>
                          <div>Inspector: {shipment.qualityInspector}</div>
                        </div>
                        <div>
                          <div>PO: {shipment.customerPO}</div>
                          <div>Lots: {shipment.lotNumbers.join(", ")}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <strong>Quality Documentation:</strong> {response.data.qualityData.inspectionRecords}
                </div>
                <div className="bg-blue-50 p-3 rounded border border-blue-200">
                  <strong>Traceability Chain:</strong> {response.data.traceabilityChain}
                </div>
                <div className="bg-purple-50 p-3 rounded border border-purple-200">
                  <strong>Audit Trail:</strong> {response.data.auditTrail}
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
          <div className="text-sm font-bold">{machineId}</div>
          <div className="text-xs text-gray-600">⭐ 5.4</div>
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
            <span>⏱ {data.parts.last5min}</span>
          </div>
          <div className="flex justify-between">
            <span>🔄 {data.partNumber}</span>
            <span>⏱ {data.parts.lastHour}</span>
          </div>
          <div className="flex justify-between">
            <span>📦 {data.parts.last24hr.toLocaleString()}</span>
            <span>⏱ {data.parts.last24hr}</span>
          </div>
          <div className="flex justify-between">
            <span>❌ 0</span>
            <span>⏱ {data.parts.last24hr.toLocaleString()}</span>
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

        {activeTab === 'audit' && (
          <div className="p-6">
            <div className="bg-white border rounded-lg h-96 flex flex-col">
              <div className="border-b border-gray-200 p-4">
                <h3 className="text-lg font-semibold">Historical Production Audit Trail</h3>
                <p className="text-sm text-gray-600">Query historical machine data, quality records, and operational events for automotive compliance</p>
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
                    placeholder="Query audit records: 'Show me D16 records for BL0250 from March 2024'..."
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => inputMessage.trim() && handleSendMessage(inputMessage)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Query
                  </button>
                </div>
                
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleSendMessage("Show me D16's records on the BL0250 part from March 2024")}
                    className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-gray-700 transition-colors"
                  >
                    D16 BL0250 March 2024
                  </button>
                  <button
                    onClick={() => handleSendMessage("Pull quality history for part BK5744 from last 18 months")}
                    className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-gray-700 transition-colors"
                  >
                    BK5744 Quality History
                  </button>
                  <button
                    onClick={() => handleSendMessage("What were D22's exact settings during the quality issue in January 2024")}
                    className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-gray-700 transition-colors"
                  >
                    D22 Quality Issue Settings
                  </button>
                  <button
                    onClick={() => handleSendMessage("Show me all operator certifications for BL0420 parts")}
                    className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-gray-700 transition-colors"
                  >
                    BL0420 Operator Certs
                  </button>
                  <button
                    onClick={() => handleSendMessage("Trace all 386 parts shipped to Ford in February 2024")}
                    className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-gray-700 transition-colors"
                  >
                    Ford 386 Parts Feb 2024
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
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
                  <div className="text-sm">Temperature 130°F (15° above normal). Coolant system requires attention within 48 hours.</div>
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