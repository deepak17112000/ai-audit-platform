import { 
    AlertTriangle, Camera, Zap, ShieldAlert, Crosshair, 
    FileSearch, ImageMinus, LocateFixed, Clock, History, 
    FileWarning, ListChecks, Eye, Copy, CheckSquare
} from 'lucide-react';

export const reportConfig = {
    flagged_exceptions: {
        id: 'flagged_exceptions', title: 'AI-Flagged Activity Exception Report', shortTitle: 'Activity Exceptions',
        description: 'Reviewer opens only activities where AI detected suspicious patterns.', icon: AlertTriangle,
        columns: [
            { key: 'site', label: 'Site', width: '15%' }, { key: 'activity', label: 'Activity', width: '25%' },
            { key: 'technician', label: 'Technician', width: '20%' }, { key: 'finding', label: 'AI Finding', width: '25%' },
            { key: 'riskScore', label: 'Risk Score', width: '15%', isBadge: true }
        ]
    },
    before_after: {
        id: 'before_after', title: 'Before-After Work Verification Report', shortTitle: 'Work Verification',
        description: 'Confirm work actually happened via image difference and object detection.', icon: Camera,
        columns: [
            { key: 'site', label: 'Site', width: '15%' }, { key: 'activity', label: 'Activity', width: '25%' },
            { key: 'finding', label: 'AI Findings', width: '30%' }, { key: 'confidence', label: 'Completion Confidence', width: '15%' },
            { key: 'status', label: 'Status', width: '15%', isBadge: true }
        ]
    },
    fuel_refill: {
        id: 'fuel_refill', title: 'Fuel Refill Verification Report', shortTitle: 'Fuel Verification',
        description: 'Prevent fuel fraud at tower sites comparing OCR extraction and DG run hours.', icon: Zap,
        columns: [
            { key: 'site', label: 'Site', width: '15%' }, { key: 'ocrValue', label: 'OCR Extraction', width: '20%' },
            { key: 'enteredValue', label: 'Entered Value', width: '20%' }, { key: 'flag', label: 'AI Flag', width: '30%' },
            { key: 'status', label: 'Status', width: '15%', isBadge: true }
        ]
    },
    asset_replacement: {
        id: 'asset_replacement', title: 'Asset Replacement Validation Report', shortTitle: 'Asset Validation',
        description: 'Verify equipment replacement claims using computer vision and serial number OCR.', icon: ShieldAlert,
        columns: [
            { key: 'site', label: 'Site', width: '15%' }, { key: 'asset', label: 'Asset Type', width: '20%' },
            { key: 'serial', label: 'Extracted Serial NO.', width: '25%' }, { key: 'finding', label: 'CV Finding', width: '25%' },
            { key: 'status', label: 'Status', width: '15%', isBadge: true }
        ]
    },
    technician_fraud: {
        id: 'technician_fraud', title: 'Technician Fraud Risk Report', shortTitle: 'Fraud Risk (Techs)',
        description: 'Identify technicians repeatedly submitting suspicious work across sites.', icon: Crosshair,
        columns: [
            { key: 'technician', label: 'Technician', width: '20%' }, { key: 'activities', label: 'Total Activities', width: '15%' },
            { key: 'rejected', label: 'Rejected Count', width: '15%' }, { key: 'signals', label: 'Primary AI Signals', width: '35%' },
            { key: 'risk', label: 'Fraud Risk Score', width: '15%', isBadge: true }
        ]
    },
    vendor_audit: {
        id: 'vendor_audit', title: 'Vendor Performance Audit Report', shortTitle: 'Vendor Audit',
        description: 'Evaluate contractor quality based on rejection rates and repeat fraud patterns.', icon: FileSearch,
        columns: [
            { key: 'vendor', label: 'Vendor Name', width: '25%' }, { key: 'rejectRate', label: 'Total Rejection %', width: '15%' },
            { key: 'patterns', label: 'Repeat Patterns', width: '30%' }, { key: 'evidence', label: 'Evidence Quality', width: '15%' },
            { key: 'status', label: 'Audit Status', width: '15%', isBadge: true }
        ]
    },
    image_quality: {
        id: 'image_quality', title: 'Image Evidence Quality Report', shortTitle: 'Evidence Quality',
        description: 'Ensure uploaded photos are actually usable for remote ai-based auditing.', icon: ImageMinus,
        columns: [
            { key: 'site', label: 'Site', width: '15%' }, { key: 'activity', label: 'Activity', width: '20%' },
            { key: 'imageType', label: 'Image Category', width: '20%' }, { key: 'issue', label: 'Detected Issue', width: '30%' },
            { key: 'status', label: 'Requires Re-shoot', width: '15%', isBadge: true }
        ]
    },
    geolocation: {
        id: 'geolocation', title: 'Geolocation Validation Report', shortTitle: 'Geolocation Rules',
        description: 'Confirm technician physically visited site by analyzing GPS rules and geofences.', icon: LocateFixed,
        columns: [
            { key: 'site', label: 'Site', width: '15%' }, { key: 'technician', label: 'Technician', width: '20%' },
            { key: 'distance', label: 'Distance from Geofence', width: '20%' }, { key: 'timeline', label: 'Timeline Check', width: '30%' },
            { key: 'status', label: 'Validation', width: '15%', isBadge: true }
        ]
    },
    sla_compliance: {
        id: 'sla_compliance', title: 'Activity SLA Compliance Report', shortTitle: 'SLA Compliance',
        description: 'Ensure maintenance tasks happen within defined SLA via delay pattern analysis.', icon: Clock,
        columns: [
            { key: 'activity', label: 'Activity', width: '20%' }, { key: 'region', label: 'Region', width: '15%' },
            { key: 'delay', label: 'Delay Duration', width: '20%' }, { key: 'pattern', label: 'Delay Pattern', width: '30%' },
            { key: 'status', label: 'SLA Status', width: '15%', isBadge: true }
        ]
    },
    repeated_activity: {
        id: 'repeated_activity', title: 'Repeated Activity Pattern Report', shortTitle: 'Repeating Patterns',
        description: 'Detect unnecessary or fake repeated work (e.g. Grass cutting 3 times in 5 days).', icon: History,
        columns: [
            { key: 'site', label: 'Site', width: '15%' }, { key: 'activity', label: 'Activity', width: '20%' },
            { key: 'interval', label: 'Submission Interval', width: '20%' }, { key: 'change', label: 'Visual Change Detected', width: '30%' },
            { key: 'status', label: 'Flag Status', width: '15%', isBadge: true }
        ]
    },
    site_risk: {
        id: 'site_risk', title: 'Site Maintenance Risk Report', shortTitle: 'Site Risk Index',
        description: 'Identify poorly maintained tower sites from aggregated high-risk signals.', icon: FileWarning,
        columns: [
            { key: 'site', label: 'Site', width: '15%' }, { key: 'tickets', label: 'Maintenance Tickets', width: '20%' },
            { key: 'rejections', label: 'Rejected Activities', width: '20%' }, { key: 'fuel', label: 'Fuel Anomalies', width: '30%' },
            { key: 'risk', label: 'Overall Risk Level', width: '15%', isBadge: true }
        ]
    },
    priority_queue: {
        id: 'priority_queue', title: 'Reviewer Priority Queue Report', shortTitle: 'Priority Queue',
        description: 'Automatically sort activities for reviewers by aggregated AI risk priority.', icon: ListChecks,
        columns: [
            { key: 'activity', label: 'Activity ID', width: '15%' }, { key: 'factors', label: 'Top Risk Factors', width: '35%' },
            { key: 'vendor', label: 'Vendor Risk', width: '20%' }, { key: 'sla', label: 'SLA Breach Risk', width: '15%' },
            { key: 'priority', label: 'Priority Level', width: '15%', isBadge: true }
        ]
    },
    ocr_validation: {
        id: 'ocr_validation', title: 'OCR Data Extraction Validation Report', shortTitle: 'OCR Validation',
        description: 'Validate numeric data submitted by technician against OCR extracted values.', icon: Eye,
        columns: [
            { key: 'meterType', label: 'Meter Type', width: '20%' }, { key: 'ocrValue', label: 'OCR Detected', width: '20%' },
            { key: 'techValue', label: 'Technician Entered', width: '20%' }, { key: 'confidence', label: 'OCR Confidence', width: '25%' },
            { key: 'status', label: 'Validation Flag', width: '15%', isBadge: true }
        ]
    },
    cross_site_reuse: {
        id: 'cross_site_reuse', title: 'Cross-Site Image Reuse Detection Report', shortTitle: 'Image Duplication',
        description: 'Detect technicians uploading same photo across multiple sites using image hashing.', icon: Copy,
        columns: [
            { key: 'technician', label: 'Technician', width: '15%' }, { key: 'sites', label: 'Reused Across Sites', width: '25%' },
            { key: 'hash', label: 'Image Hash Similarity', width: '20%' }, { key: 'time', label: 'Timestamp Sync', width: '25%' },
            { key: 'status', label: 'Duplication Risk', width: '15%', isBadge: true }
        ]
    },
    evidence_completeness: {
        id: 'evidence_completeness', title: 'Activity Evidence Completeness Report', shortTitle: 'Evidence Complete',
        description: 'Ensure required mandatory proofs and angles were captured.', icon: CheckSquare,
        columns: [
            { key: 'site', label: 'Site', width: '15%' }, { key: 'activity', label: 'Activity', width: '25%' },
            { key: 'missing', label: 'Missing Mandatory Item', width: '30%' }, { key: 'angle', label: 'Angle Validated', width: '15%' },
            { key: 'status', label: 'Status', width: '15%', isBadge: true }
        ]
    }
};

// Generates 15 rows of mock data dynamically based on the report structure.
export function generateMockDataForReport(reportId) {
    const config = reportConfig[reportId];
    if (!config) return [];
    
    // We deterministically generate rows based on the report keys
    return Array.from({ length: 15 }).map((_, i) => {
        const row = { id: i };
        config.columns.forEach(col => {
            row[col.key] = generateRandomValue(col.key, col.isBadge, i);
        });
        return row;
    });
}

function generateRandomValue(key, isBadge, index) {
    const sites = ['DL-234', 'UP-882', 'ZAF-818', 'MP-112', 'KA-991'];
    const techs = ['Rahul', 'Amit', 'Michael B.', 'Sandra O.', 'David K.'];
    const activities = ['Grass Cutting', 'DG Service', 'Battery Replace', 'Panel Clean'];
    const vendors = ['Alpha Maintenance', 'TowerServe Pro', 'EcoSites Ltd', 'InfraCorp'];
    const statuses = ['High', 'Medium', 'Low', 'Approved', 'Rejected', 'Fail', 'Pass', 'Overdue', 'On Time', 'Pending'];
    const issues = ['Blurry photo', 'Equipment not visible', 'Low light', 'Same image reused', 'No vegetation change'];
    
    // Deterministic random
    const r = (index * 7 + key.length) % 5;

    if (isBadge) {
        if (key === 'riskScore' || key === 'risk' || key === 'priority') return ['High', 'High', 'Medium', 'Low', 'Medium'][r];
        if (key === 'status') return ['Fail', 'Fail', 'Pass', 'Pass', 'Pending'][r];
        return statuses[r];
    }

    if (key === 'site' || key === 'sites') return sites[r];
    if (key === 'technician') return techs[r];
    if (key === 'activity' || key === 'asset' || key === 'meterType') return activities[r];
    if (key === 'finding' || key === 'issue' || key === 'flag' || key === 'missing') return issues[r];
    if (key === 'vendor') return vendors[r];
    if (key === 'confidence' || key === 'rejectRate' || key === 'hash') return `${75 + r * 5}%`;
    if (key === 'ocrValue' || key === 'enteredValue' || key === 'serial' || key === 'techValue') return `${1000 + r * 153}`;
    if (key === 'distance') return `${r * 15} meters`;
    if (key === 'delay' || key === 'time' || key === 'interval') return `${r + 1} days`;
    
    return `Analysis ${r}`;
}
