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
          <div className="space-y-2">
            <h4 className="font-semibold text-blue-600">Machine D22 - Button Sequence Analysis</h4>
            {response.data.map((entry, idx) => (
              <div key={idx} className="bg-gray-50 p-3 rounded border-l-4 border-blue-400">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-mono text-sm text-gray-600">{entry.time}</span>
                      <span className="text-xs text-gray-500">{entry.operator} • {entry.station}</span>
                    </div>
                    <div className="font-medium text-gray-800 mt-1">{entry.sequence}</div>
                    <div className={`text-sm mt-1 ${entry.error === 'None' ? 'text-green-600' : 'text-red-600'}`}>
                      {entry.error === 'None' ? '✓ Normal Operation' : `⚠ ${entry.error}`}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'maintenance_schedule':
        return (
          <div className="space-y-3">
            <h4 className="font-semibold text-blue-600">🔧 Today's Maintenance Schedule</h4>
            {response.data.map((item, idx) => (
              <div key={idx} className={`p-4 rounded-lg border-l-4 ${
                item.priority === 'HIGH' ? 'border-red-500 bg-red-50' :
                item.priority === 'MEDIUM' ? 'border-yellow-500 bg-yellow-50' :
                'border-blue-500 bg-blue-50'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-semibold">{item.machine} - {item.priority} PRIORITY</h5>
                </div>
                <p className="text-gray-800 mb-2"><strong>Issue:</strong> {item.issue}</p>
                <p className="text-gray-700 mb-2"><strong>Analysis:</strong> {item.analysis}</p>
                <div className="mb-2">
                  <strong className="text-gray-800">Data Sources:</strong>
                  <ul className="ml-4 mt-1 text-sm text-gray-600">
                    {item.sources.map((source, sourceIdx) => (
                      <li key={sourceIdx} className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        {source}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-gray-800 mb-2"><strong>Recommendation:</strong> {item.recommendation}</p>
                <p className="text-green-600 font-medium"><strong>Cost Impact:</strong> {item.costImpact}</p>
              </div>
            ))}
          </div>
        );

      case 'audit_trail':
        return (
          <div className="space-y-3">
            <h4 className="font-semibold text-blue-600">📋 Audit Trail: {response.data.machine} - {response.data.partNumber}</h4>
            <div className="bg-gray-50 p-3 rounded">
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div><strong>Date Range:</strong> {response.data.dateRange}</div>
                <div><strong>Total Parts:</strong> {response.data.totalParts.toLocaleString()}</div>
                <div><strong>OEE:</strong> {response.data.qualityMetrics.overallOEE}%</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h5 className="font-medium">Key Events:</h5>
              {response.data.keyEvents.map((event, idx) => (
                <div key={idx} className="bg-white border p-3 rounded">
                  <div className="font-medium text-gray-800">{event.date} - {event.event}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    <div><strong>Reason:</strong> {event.reason}</div>
                    <div><strong>Resolution:</strong> {event.resolution}</div>
                    <div><strong>Impact:</strong> {event.impact}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-3 rounded">
              <h5 className="font-medium mb-2">Machine Settings:</h5>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div><strong>Spindle Speed:</strong> {response.data.machineSettings.spindleSpeed}</div>
                <div><strong>Feed Rate:</strong> {response.data.machineSettings.feedRate}</div>
                <div><strong>Coolant Pressure:</strong> {response.data.machineSettings.coolantPressure}</div>
                <div><strong>Tool Life:</strong> {response.data.machineSettings.toolLife}</div>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded">
              <strong>Customer Impact:</strong> {response.data.customerImpact}
            </div>
          </div>
        );

      case 'quality_history':
        return (
          <div className="space-y-3">
            <h4 className="font-semibold text-blue-600">📊 Quality History: {response.data.partNumber}</h4>
            <div className="bg-gray-50 p-3 rounded">
              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div><strong>Period:</strong> {response.data.dateRange}</div>
                <div><strong>Total Produced:</strong> {response.data.totalProduced.toLocaleString()}</div>
                <div><strong>Scrap Rate:</strong> {response.data.overallMetrics.scrapRate}%</div>
                <div><strong>First Pass Yield:</strong> {response.data.overallMetrics.firstPassYield}%</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h5 className="font-medium">Quality Trends:</h5>
              {response.data.qualityTrends.map((trend, idx) => (
                <div key={idx} className="bg-white border p-3 rounded">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-medium">{trend.period} - Scrap Rate: {trend.scrapRate}%</div>
                      <div className="text-sm text-gray-600 mt-1">
                        <div><strong>Issue:</strong> {trend.issue}</div>
                        <div><strong>Action:</strong> {trend.action}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {response.data.customerFeedback.map((feedback, idx) => (
              <div key={idx} className="bg-yellow-50 border border-yellow-200 p-3 rounded">
                <strong>Customer Feedback:</strong> {feedback.customer} ({feedback.date})
                <div className="text-sm mt-1">
                  <div><strong>Issue:</strong> {feedback.issue}</div>
                  <div><strong>Status:</strong> {feedback.status}</div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'settings_investigation':
        return (
          <div className="space-y-3">
            <h4 className="font-semibold text-blue-600">🔍 Settings Investigation: {response.data.machine}</h4>
            <div className="bg-red-50 border border-red-200 p-3 rounded">
              <div className="font-medium text-red-800">{response.data.incident}</div>
              <div className="text-sm text-red-700 mt-1">
                <div><strong>Part:</strong> {response.data.partNumber}</div>
                <div><strong>Issue:</strong> {response.data.issueDescription}</div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white border p-3 rounded">
                <h5 className="font-medium text-green-600 mb-2">Before Incident</h5>
                <div className="text-sm space-y-1">
                  <div><strong>Spindle:</strong> {response.data.machineSettings.beforeIncident.spindleSpeed}</div>
                  <div><strong>Feed:</strong> {response.data.machineSettings.beforeIncident.feedRate}</div>
                  <div><strong>Coolant:</strong> {response.data.machineSettings.beforeIncident.coolantPressure}</div>
                  <div><strong>Overrides:</strong> {response.data.machineSettings.beforeIncident.operatorOverride}</div>
                </div>
              </div>
              
              <div className="bg-white border p-3 rounded">
                <h5 className="font-medium text-red-600 mb-2">During Incident</h5>
                <div className="text-sm space-y-1">
                  <div><strong>Spindle:</strong> {response.data.machineSettings.duringIncident.spindleSpeed}</div>
                  <div><strong>Feed:</strong> {response.data.machineSettings.duringIncident.feedRate}</div>
                  <div><strong>Coolant:</strong> {response.data.machineSettings.duringIncident.coolantPressure}</div>
                  <div><strong>Alarms:</strong> {response.data.machineSettings.duringIncident.alarms}</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded">
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
          <div className="space-y-3">
            <h4 className="font-semibold text-blue-600">👥 Operator Certifications: {response.data.partNumber}</h4>
            <div className="bg-blue-50 p-3 rounded">
              <strong>Requirement:</strong> {response.data.certificationRequirement}
            </div>
            
            <div className="space-y-3">
              {response.data.certifiedOperators.map((operator, idx) => (
                <div key={idx} className="bg-white border p-3 rounded">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium">{operator.name}</h5>
                    <span className="text-sm text-green-600">Valid until {operator.expirationDate}</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div><strong>Certified:</strong> {operator.certificationDate}</div>
                      <div><strong>Training Hours:</strong> {operator.trainingHours}</div>
                      <div><strong>Test Score:</strong> {operator.testScore}%</div>
                      <div><strong>Supervisor:</strong> {operator.supervisor}</div>
                    </div>
                    <div>
                      <div><strong>Quality Record:</strong> {operator.qualityRecord}</div>
                      <div><strong>Machines:</strong> {operator.machinesQualified.join(', ')}</div>
                      {operator.notes && <div className="text-yellow-600"><strong>Notes:</strong> {operator.notes}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-3 rounded">
              <strong>Compliance Status:</strong> {response.data.complianceStatus}
            </div>
          </div>
        );

      case 'shipment_traceability':
        return (
          <div className="space-y-3">
            <h4 className="font-semibold text-blue-600">📦 Shipment Traceability</h4>
            <div className="bg-gray-50 p-3 rounded">
              <div className="grid md:grid-cols-3 gap-4">
                <div><strong>Customer:</strong> {response.data.customer}</div>
                <div><strong>Period:</strong> {response.data.shipmentPeriod}</div>
                <div><strong>Total Shipped:</strong> {response.data.totalShipped.toLocaleString()}</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h5 className="font-medium">Shipment Details:</h5>
              {response.data.shipmentDetails.map((shipment, idx) => (
                <div key={idx} className="bg-white border p-3 rounded">
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div><strong>Ship Date:</strong> {shipment.shipDate}</div>
                      <div><strong>Quantity:</strong> {shipment.quantity.toLocaleString()}</div>
                      <div><strong>Machines:</strong> {shipment.machines.join(', ')}</div>
                      <div><strong>Operators:</strong> {shipment.operators.join(', ')}</div>
                    </div>
                    <div>
                      <div><strong>Inspector:</strong> {shipment.qualityInspector}</div>
                      <div><strong>Shipping Doc:</strong> {shipment.shippingDoc}</div>
                      <div><strong>Lot Numbers:</strong> {shipment.lotNumbers.join(', ')}</div>
                      <div><strong>Customer PO:</strong> {shipment.customerPO}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-green-50 p-3 rounded">
              <h5 className="font-medium mb-2">Quality Verification:</h5>
              <div className="text-sm">
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
    const statusColor = data.status === 'running' ? 'text-green-600' : 
                       data.status === 'warning' ? 'text-yellow-600' : 'text-red-600';
    const statusBg = data.status === 'running' ? 'bg-green-100' : 
                    data.status === 'warning' ? 'bg-yellow-100' : 'bg-red-100';
    
    return (
      <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-lg">{machineId}</h3>
            <div className="text-sm text-gray-600">{data.partNumber}</div>
          </div>
          <div className="flex items-center space-x-2">
            <Wifi className={`w-4 h-4 ${data.wifi ? 'text-green-600' : 'text-red-600'}`} />
            <div className={`px-2 py-1 rounded text-xs font-medium ${statusBg} ${statusColor}`}>
              {data.status.toUpperCase()}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Efficiency</span>
            <span className={`font-semibold ${getEfficiencyColor(data.efficiency)}`}>
              {data.efficiency}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${getEfficiencyBgColor(data.efficiency)}`}
              style={{ width: `${Math.min(data.efficiency, 100)}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-600">Temperature</div>
              <div className="font-medium">{data.temp}°F</div>
            </div>
            <div>
              <div className="text-gray-600">Last 5min</div>
              <div className="font-medium">{data.parts.last5min} parts</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-600">Last Hour</div>
              <div className="font-medium">{data.parts.lastHour} parts</div>
            </div>
            <div>
              <div className="text-gray-600">Shift Total</div>
              <div className="font-medium">{data.parts.shiftStart} parts</div>
            </div>
          </div>

          <div className="pt-2 border-t">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Target Progress</span>
              <span className="text-sm font-medium">
                {data.target.current}/{data.target.total}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div 
                className="h-2 rounded-full bg-blue-500"
                style={{ width: `${(data.target.current / data.target.total) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Deutsche Precision Manufacturing Intelligence</h1>
              <p className="text-blue-100 mt-1">AI-Enhanced Hydromat Operations • Live Demo</p>
            </div>
            <div className="text-right">
              <div className="text-blue-100 text-sm">Current Time</div>
              <div className="text-lg font-mono">{currentTime.toLocaleTimeString()}</div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'dashboard' 
                  ? 'border-blue-500 text-blue-600 bg-blue-50' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('dashboard')}
            >
              <Activity className="w-4 h-4 inline mr-2" />
              Production Dashboard
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'audit' 
                  ? 'border-blue-500 text-blue-600 bg-blue-50' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('audit')}
            >
              <Clock className="w-4 h-4 inline mr-2" />
              Audit Trail
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'ai-chat' 
                  ? 'border-blue-500 text-blue-600 bg-blue-50' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('ai-chat')}
            >
              <Settings className="w-4 h-4 inline mr-2" />
              AI Assistant
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'metrics' 
                  ? 'border-blue-500 text-blue-600 bg-blue-50' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('metrics')}
            >
              <DollarSign className="w-4 h-4 inline mr-2" />
              Business Impact
            </button>
          </nav>
        </div>

        {activeTab === 'audit' && (
          <div className="p-6">
            <div className="bg-white border rounded-lg">
              <div className="border-b border-gray-200 p-4">
                <h3 className="text-lg font-semibold">Historical Production Audit Trail</h3>
                <p className="text-sm text-gray-600">Query historical machine data, quality records, and operational events for automotive compliance</p>
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
                        <div className="text-xs text-green-600">+2.8% vs target</div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded border border-blue-200">
                        <div className="text-sm text-blue-600 font-medium">Scrap Rate</div>
                        <div className="text-2xl font-bold text-blue-700">0.12%</div>
                        <div className="text-xs text-blue-600">-0.3% vs baseline</div>
                      </div>
                      <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                        <div className="text-sm text-yellow-600 font-medium">Cycle Time</div>
                        <div className="text-2xl font-bold text-yellow-700">47.3s</div>
                        <div className="text-xs text-yellow-600">-2.1s optimized</div>
                      </div>
                      <div className="bg-purple-50 p-3 rounded border border-purple-200">
                        <div className="text-sm text-purple-600 font-medium">Tool Changes</div>
                        <div className="text-2xl font-bold text-purple-700">12</div>
                        <div className="text-xs text-purple-600">Scheduled: 8, Emergency: 4</div>
                      </div>
                    </div>
                  </div>

                  {/* Historical Events Timeline */}
                  <div className="bg-white border rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">🕐 Key Events Timeline</h4>
                    <div className="space-y-3">
                      <div className="border-l-4 border-blue-400 bg-blue-50 p-3 rounded">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium text-blue-800">January 26, 2023 - 14:20</div>
                            <div className="text-sm text-blue-700">Tool T03 (tap) reached 95% life - Auto-scheduled replacement</div>
                            <div className="text-xs text-blue-600">Operator: Nathan M. | Quality inspector: Christine</div>
                          </div>
                          <div className="text-sm text-blue-600 font-medium">Preventive</div>
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
                          <div>Station 4 (Tap): 600 RPM, 0.040 IPR feed</div>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Quality Control</h5>
                        <div className="bg-gray-50 p-3 rounded text-sm space-y-1">
                          <div>Bore diameter: 0.3750" ±0.0002"</div>
                          <div>Surface finish: 32 Ra max</div>
                          <div>Thread class: 2B per ASME B1.1</div>
                          <div>CMM inspection: Every 50th part</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Operator Performance */}
                  <div className="bg-white border rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">👥 Operator Performance & Certifications</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-green-50 p-3 rounded border border-green-200">
                        <div className="font-medium text-green-800">Nathan M.</div>
                        <div className="text-sm text-green-700">Lead Operator - Shift 1</div>
                        <div className="text-xs text-green-600">Certified: BL0250, BK5744, 386 Part</div>
                        <div className="text-xs font-medium text-green-600 mt-1">96.8% Efficiency | Zero Quality Issues</div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded border border-blue-200">
                        <div className="font-medium text-blue-800">Sarah K.</div>
                        <div className="text-sm text-blue-700">Operator - Shift 2</div>
                        <div className="text-xs text-blue-600">Certified: BL0250, BL0420</div>
                        <div className="text-xs font-medium text-blue-600 mt-1">94.2% Efficiency | 1 Minor Deviation</div>
                      </div>
                      <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                        <div className="font-medium text-yellow-800">Mike T.</div>
                        <div className="text-sm text-yellow-700">Trainee - All Shifts</div>
                        <div className="text-xs text-yellow-600">Training: 386 Part (In Progress)</div>
                        <div className="text-xs font-medium text-yellow-600 mt-1">91.1% Efficiency | 2 Training Notes</div>
                      </div>
                    </div>
                  </div>

                  {/* Customer Compliance */}
                  <div className="bg-white border rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">🏭 Customer Compliance & Traceability</h4>
                    <div className="bg-gray-50 p-4 rounded">
                      <div className="grid md:grid-cols-2 gap-6 text-sm">
                        <div>
                          <h5 className="font-medium text-gray-700 mb-2">Ford Motor Company Requirements</h5>
                          <div className="space-y-1">
                            <div>✅ Q1 Certification: Current</div>
                            <div>✅ Statistical Process Control: Active</div>
                            <div>✅ Dimensional verification: 100%</div>
                            <div>✅ Material certificates: On file</div>
                            <div>✅ Lot traceability: Complete</div>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-700 mb-2">Documentation Archive</h5>
                          <div className="space-y-1">
                            <div>📄 18,640 parts shipped</div>
                            <div>📄 Zero customer complaints</div>
                            <div>📄 3 corrective action reports filed</div>
                            <div>📄 1 process improvement implemented</div>
                            <div>📄 7-year retention period active</div>
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

        {activeTab === 'dashboard' && (
          <div className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(machineData).map(([machineId, data]) => (
                <MachineCard key={machineId} machineId={machineId} data={data} />
              ))}
            </div>
            
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="bg-white border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Fleet OEE</h3>
                    <div className="text-3xl font-bold text-blue-600">80.6%</div>
                    <div className="text-sm text-green-600">+5.6% vs baseline</div>
                  </div>
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              
              <div className="bg-white border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Active Alerts</h3>
                    <div className="text-3xl font-bold text-yellow-600">3</div>
                    <div className="text-sm text-gray-600">Maintenance items</div>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-yellow-600" />
                </div>
              </div>
              
              <div className="bg-white border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Parts Today</h3>
                    <div className="text-3xl font-bold text-green-600">12,847</div>
                    <div className="text-sm text-gray-600">Target: 15,000</div>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ai-chat' && (
          <div className="h-96">
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    <Settings className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium mb-2">Deutsche Precision AI Assistant</h3>
                    <p>Ask me about machine performance, maintenance schedules, quality history, or audit trails.</p>
                  </div>
                )}
                
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
                <h3 className="text-lg font-semibold mb-4">Implementation Phases</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <div className="font-medium">Pilot Phase (Months 1-4)</div>
                      <div className="text-sm text-gray-600">5 machines • Basic AI chat • FOCAS integration</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <div className="font-medium">Fleet Deployment (Months 5-8)</div>
                      <div className="text-sm text-gray-600">All 25 machines • Advanced AI chat • Predictive maintenance</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <div className="font-medium">Autonomous Optimization (Months 9-12)</div>
                      <div className="text-sm text-gray-600">AI trainer system • Self-optimizing parameters • Expert knowledge capture</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Competitive Advantages</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div className="font-medium text-blue-600">Speed to Market</div>
                  <div className="text-sm text-gray-700">Faster problem resolution and optimization cycles</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div className="font-medium text-green-600">Quality Leadership</div>
                  <div className="text-sm text-gray-700">Predictive quality control and automotive compliance</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div className="font-medium text-purple-600">Market Position</div>
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