import React from 'react';
import { 
    PieChart as PieChartIcon, BarChart3, Clock, XCircle, AlertTriangle, 
    Camera, Zap, ShieldAlert, Crosshair, FileSearch, ImageMinus, 
    LocateFixed, History, FileWarning, ListChecks, Eye, Copy, CheckSquare
} from 'lucide-react';
import PlotlyChart from './PlotlyChart';
import './SubmissionsQueue.css';

export default function Dashboard() {
    return (
        <div className="sq-wrapper" style={{ padding: '0', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '24px', overflowY: 'auto' }}>
                <h2 style={{ fontSize: '20px', color: '#0f172a', marginBottom: '8px' }}>Visual Analytics Hub</h2>
                <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>Deep-scan AI metrics & operational overviews.</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '20px' }}>
                    {/* ORIGINAL 5 CHARTS */}
                    <div className="sq-dash-widget">
                        <div className="sq-dw-title"><PieChartIcon size={16} /> Regional Risk Heatmap</div>
                        <div className="sq-dw-content" style={{ height: '350px' }}><PlotlyChart endpoint="/api/charts/regional-risk" title="Risk Heatmap" /></div>
                    </div>
                    <div className="sq-dash-widget">
                        <div className="sq-dw-title"><BarChart3 size={16} /> Compliance Trend</div>
                        <div className="sq-dw-content" style={{ height: '350px' }}><PlotlyChart endpoint="/api/charts/compliance-trend" title="Compliance Trend" /></div>
                    </div>
                    <div className="sq-dash-widget" style={{ gridColumn: '1 / -1' }}>
                        <div className="sq-dw-title"><BarChart3 size={16} /> Technician Efficiency</div>
                        <div className="sq-dw-content" style={{ height: '400px' }}><PlotlyChart endpoint="/api/charts/tech-efficiency" title="Technician Efficiency" /></div>
                    </div>
                    <div className="sq-dash-widget">
                        <div className="sq-dw-title"><Clock size={16} color="#d97706" /> Reviewer Backlog Aging</div>
                        <div className="sq-dw-content" style={{ height: '300px' }}><PlotlyChart endpoint="/api/charts/reviewer-aging" title="Backlog Aging" /></div>
                    </div>
                    <div className="sq-dash-widget">
                        <div className="sq-dw-title"><XCircle size={16} color="#dc2626" /> Regional Rejection Rates</div>
                        <div className="sq-dw-content" style={{ height: '300px' }}><PlotlyChart endpoint="/api/charts/rejection-rates" title="Rejection Rates" /></div>
                    </div>

                    {/* NEW 15 AI VISUAL REPORTS */}
                    <div className="sq-dash-widget">
                        <div className="sq-dw-title"><AlertTriangle size={16} /> AI-Flagged Activity Exceptions</div>
                        <div className="sq-dw-content" style={{ height: '300px' }}><PlotlyChart endpoint="/api/charts/ai-flagged-exceptions" title="AI Flags" /></div>
                    </div>
                    <div className="sq-dash-widget">
                        <div className="sq-dw-title"><Camera size={16} /> Before-After Work Verification</div>
                        <div className="sq-dw-content" style={{ height: '300px' }}><PlotlyChart endpoint="/api/charts/before-after-verification" title="Work Verification" /></div>
                    </div>
                    <div className="sq-dash-widget">
                        <div className="sq-dw-title"><Zap size={16} /> Fuel Refill Verification</div>
                        <div className="sq-dw-content" style={{ height: '300px' }}><PlotlyChart endpoint="/api/charts/fuel-verification" title="Fuel OCR vs Manual" /></div>
                    </div>
                    <div className="sq-dash-widget">
                        <div className="sq-dw-title"><ShieldAlert size={16} /> Asset Replacement Validation</div>
                        <div className="sq-dw-content" style={{ height: '300px' }}><PlotlyChart endpoint="/api/charts/asset-validation" title="Asset Validation" /></div>
                    </div>
                    <div className="sq-dash-widget">
                        <div className="sq-dw-title"><Crosshair size={16} /> Technician Fraud Risk</div>
                        <div className="sq-dw-content" style={{ height: '300px' }}><PlotlyChart endpoint="/api/charts/tech-fraud-risk" title="Tech Fraud Risk" /></div>
                    </div>
                    <div className="sq-dash-widget">
                        <div className="sq-dw-title"><FileSearch size={16} /> Vendor Performance Audit</div>
                        <div className="sq-dw-content" style={{ height: '350px' }}><PlotlyChart endpoint="/api/charts/vendor-audit" title="Vendor Audit Radar" /></div>
                    </div>
                    <div className="sq-dash-widget">
                        <div className="sq-dw-title"><ImageMinus size={16} /> Image Evidence Quality</div>
                        <div className="sq-dw-content" style={{ height: '300px' }}><PlotlyChart endpoint="/api/charts/image-quality" title="Image Quality Issues" /></div>
                    </div>
                    <div className="sq-dash-widget">
                        <div className="sq-dw-title"><LocateFixed size={16} /> Geolocation Validation</div>
                        <div className="sq-dw-content" style={{ height: '300px' }}><PlotlyChart endpoint="/api/charts/geolocation" title="Geolocation Validations" /></div>
                    </div>
                    <div className="sq-dash-widget" style={{ gridColumn: '1 / -1' }}>
                        <div className="sq-dw-title"><Clock size={16} /> Activity SLA Compliance Trend</div>
                        <div className="sq-dw-content" style={{ height: '350px' }}><PlotlyChart endpoint="/api/charts/sla-compliance" title="SLA Trend" /></div>
                    </div>
                    <div className="sq-dash-widget">
                        <div className="sq-dw-title"><History size={16} /> Repeated Activity Pattern</div>
                        <div className="sq-dw-content" style={{ height: '300px' }}><PlotlyChart endpoint="/api/charts/repeated-activity" title="Repeated Activity" /></div>
                    </div>
                    <div className="sq-dash-widget">
                        <div className="sq-dw-title"><FileWarning size={16} /> Site Maintenance Risk</div>
                        <div className="sq-dw-content" style={{ height: '300px' }}><PlotlyChart endpoint="/api/charts/site-risk" title="Site Risk" /></div>
                    </div>
                    <div className="sq-dash-widget">
                        <div className="sq-dw-title"><ListChecks size={16} /> Reviewer Priority Queue Funnel</div>
                        <div className="sq-dw-content" style={{ height: '300px' }}><PlotlyChart endpoint="/api/charts/reviewer-priority" title="Priority Queue" /></div>
                    </div>
                    <div className="sq-dash-widget">
                        <div className="sq-dw-title"><Eye size={16} /> OCR Data Extraction Validation</div>
                        <div className="sq-dw-content" style={{ height: '300px' }}><PlotlyChart endpoint="/api/charts/ocr-validation" title="OCR Validation" /></div>
                    </div>
                    <div className="sq-dash-widget">
                        <div className="sq-dw-title"><Copy size={16} /> Cross-Site Image Reuse Detection</div>
                        <div className="sq-dw-content" style={{ height: '300px' }}><PlotlyChart endpoint="/api/charts/cross-site-reuse" title="Cross-Site Reuse" /></div>
                    </div>
                    <div className="sq-dash-widget">
                        <div className="sq-dw-title"><CheckSquare size={16} /> Activity Evidence Completeness</div>
                        <div className="sq-dw-content" style={{ height: '300px' }}><PlotlyChart endpoint="/api/charts/evidence-completeness" title="Evidence Completeness" /></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
