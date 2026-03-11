import React, { useState } from 'react';
import { 
    AlertTriangle, Camera, CheckSquare, Crosshair, 
    FileWarning, MapPin, Gauge, ShieldAlert, 
    ImageMinus, Clock, History, FileSearch, 
    Zap, LocateFixed, Eye 
} from 'lucide-react';
import PremiumDataGrid from './PremiumDataGrid';
import { reportConfig, generateMockDataForReport } from '../data/aiReportsMockData';
import './AIReportsHub.css';

export default function AIReportsHub() {
    const [activeReportId, setActiveReportId] = useState('flagged_exceptions');

    const activeConfig = reportConfig[activeReportId];
    const mockData = generateMockDataForReport(activeReportId);

    return (
        <div className="airh-container">
            <div className="airh-sidebar">
                <div className="airh-sidebar-header">
                    <h3>AI Diagnostic Reports</h3>
                    <p>15 Deep-scan Analytics</p>
                </div>
                <div className="airh-nav-list">
                    {Object.values(reportConfig).map((report) => (
                        <button 
                            key={report.id}
                            className={`airh-nav-item ${activeReportId === report.id ? 'active' : ''}`}
                            onClick={() => setActiveReportId(report.id)}
                        >
                            <report.icon size={16} className="airh-nav-icon" />
                            <span>{report.shortTitle || report.title}</span>
                        </button>
                    ))}
                </div>
            </div>
            <div className="airh-main">
                <PremiumDataGrid 
                    title={activeConfig.title}
                    description={activeConfig.description}
                    icon={activeConfig.icon}
                    columns={activeConfig.columns}
                    data={mockData}
                />
            </div>
        </div>
    );
}
