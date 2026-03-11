import React, { useState, useMemo } from 'react';
import {
    ClipboardList,
    Clock,
    Calendar,
    XCircle,
    CheckCircle2,
    Search,
    X,
    RadioTower,
    AlertTriangle,
    ArrowRight
} from 'lucide-react';
import './SubmissionsQueue.css';

const allSubmissions = [
    { id: 'AUD-992XR', site: 'ZAF-TWR-818', tech: 'Michael B.', region: 'Gauteng', type: 'Routine Inspection', submitted: '2026-03-10 14:22', status: 'submitted', risk: 'high', flags: 4, warnings: 2, reviewer: 'Pending' },
    { id: 'AUD-887KL', site: 'ZAF-TWR-204', tech: 'Sandra O.', region: 'Western Cape', type: 'Fuel Audit', submitted: '2026-03-10 09:15', status: 'planned', risk: 'medium', flags: 0, warnings: 1, reviewer: 'John M.' },
    { id: 'AUD-761PQ', site: 'ZAF-TWR-553', tech: 'David K.', region: 'KwaZulu-Natal', type: 'Asset Check', submitted: '2026-03-09 17:44', status: 'rejected', risk: 'low', flags: 0, warnings: 0, reviewer: 'Priya S.' },
    { id: 'AUD-630MN', site: 'ZAF-TWR-119', tech: 'James T.', region: 'Limpopo', type: 'Routine Inspection', submitted: '2026-03-09 11:02', status: 'approved', risk: 'low', flags: 0, warnings: 0, reviewer: 'Priya S.' },
    { id: 'AUD-574RF', site: 'ZAF-TWR-976', tech: 'Nadia V.', region: 'Mpumalanga', type: 'Emergency Visit', submitted: '2026-03-09 08:33', status: 'submitted', risk: 'high', flags: 6, warnings: 3, reviewer: 'Pending' },
    { id: 'AUD-512YB', site: 'ZAF-TWR-031', tech: 'Carlos M.', region: 'Northern Cape', type: 'Oil Change', submitted: '2026-03-08 16:55', status: 'planned', risk: 'medium', flags: 0, warnings: 2, reviewer: 'John M.' },
    { id: 'AUD-448GH', site: 'ZAF-TWR-487', tech: 'Faith N.', region: 'Free State', type: 'Grass Clearing', submitted: '2026-03-08 13:20', status: 'rejected', risk: 'medium', flags: 2, warnings: 1, reviewer: 'John M.' },
    { id: 'AUD-391DC', site: 'ZAF-TWR-771', tech: 'Michael B.', region: 'Eastern Cape', type: 'Battery Replace', submitted: '2026-03-08 10:05', status: 'approved', risk: 'low', flags: 0, warnings: 0, reviewer: 'Priya S.' },
    { id: 'AUD-345WX', site: 'ZAF-TWR-062', tech: 'Sandra O.', region: 'North West', type: 'Fuel Audit', submitted: '2026-03-07 15:41', status: 'submitted', risk: 'high', flags: 3, warnings: 2, reviewer: 'Pending' },
    { id: 'AUD-278TZ', site: 'ZAF-TWR-340', tech: 'David K.', region: 'Gauteng', type: 'Routine Inspection', submitted: '2026-03-07 09:00', status: 'approved', risk: 'low', flags: 0, warnings: 0, reviewer: 'Priya S.' },
    { id: 'AUD-201LK', site: 'ZAF-TWR-215', tech: 'James T.', region: 'Western Cape', type: 'Asset Check', submitted: '2026-03-06 18:30', status: 'planned', risk: 'medium', flags: 0, warnings: 1, reviewer: 'John M.' },
    { id: 'AUD-155EA', site: 'ZAF-TWR-699', tech: 'Nadia V.', region: 'KwaZulu-Natal', type: 'Oil Change', submitted: '2026-03-06 14:10', status: 'rejected', risk: 'high', flags: 5, warnings: 1, reviewer: 'Priya S.' },
];

const STATUS_CONFIG = {
    submitted: { label: 'Submitted', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
    planned: { label: 'Planned', color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe' },
    rejected: { label: 'Rejected', color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
    approved: { label: 'Approved', color: '#059669', bg: '#f0fdf4', border: '#a7f3d0' },
};

const RISK_CONFIG = {
    high: { label: 'High', color: '#dc2626', bg: '#fef2f2' },
    medium: { label: 'Medium', color: '#d97706', bg: '#fffbeb' },
    low: { label: 'Low', color: '#059669', bg: '#f0fdf4' },
};

const FILTER_TABS = [
    { key: 'all', label: 'All', count: null },
    { key: 'submitted', label: 'Submitted' },
    { key: 'planned', label: 'Planned' },
    { key: 'rejected', label: 'Rejected' },
    { key: 'approved', label: 'Approved' },
];

const SORT_OPTIONS = [
    { key: 'submitted_desc', label: 'Newest First' },
    { key: 'submitted_asc', label: 'Oldest First' },
    { key: 'risk', label: 'Risk Level' },
    { key: 'flags', label: 'Most Flags' },
];

export default function SubmissionsQueue({ onOpenAudit }) {
    const [activeTab, setActiveTab] = useState('all');
    const [search, setSearch] = useState('');
    const [sortKey, setSortKey] = useState('submitted_desc');
    const [selectedRow, setSelectedRow] = useState(null);

    const counts = useMemo(() => {
        const c = { all: allSubmissions.length };
        allSubmissions.forEach(s => { c[s.status] = (c[s.status] || 0) + 1; });
        return c;
    }, []);

    const filtered = useMemo(() => {
        let list = allSubmissions;
        if (activeTab !== 'all') list = list.filter(s => s.status === activeTab);
        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter(s =>
                s.id.toLowerCase().includes(q) ||
                s.site.toLowerCase().includes(q) ||
                s.tech.toLowerCase().includes(q) ||
                s.region.toLowerCase().includes(q) ||
                s.type.toLowerCase().includes(q)
            );
        }
        switch (sortKey) {
            case 'submitted_asc': return [...list].sort((a, b) => a.submitted.localeCompare(b.submitted));
            case 'risk': return [...list].sort((a, b) => ['high', 'medium', 'low'].indexOf(a.risk) - ['high', 'medium', 'low'].indexOf(b.risk));
            case 'flags': return [...list].sort((a, b) => (b.flags + b.warnings) - (a.flags + a.warnings));
            default: return [...list].sort((a, b) => b.submitted.localeCompare(a.submitted));
        }
    }, [activeTab, search, sortKey]);





    const handleRowClick = (sub) => {
        setSelectedRow(sub.id);
        // Only submitted rows open the detail audit; others show a tooltip effect
        if (sub.status === 'submitted') {
            onOpenAudit(sub);
        }
    };

    return (
        <div className="sq-wrapper">

            {/* ── Hero Stats ── */}
            <div className="sq-stats-row">
                {[
                    { label: 'Total Submissions', value: allSubmissions.length, icon: <ClipboardList size={20} strokeWidth={2.5} />, accent: '#2563eb' },
                    { label: 'Pending Review', value: counts.submitted || 0, icon: <Clock size={20} strokeWidth={2.5} />, accent: '#d97706' },
                    { label: 'Planned', value: counts.planned || 0, icon: <Calendar size={20} strokeWidth={2.5} />, accent: '#7c3aed' },
                    { label: 'Rejected', value: counts.rejected || 0, icon: <XCircle size={20} strokeWidth={2.5} />, accent: '#dc2626' },
                    { label: 'Approved', value: counts.approved || 0, icon: <CheckCircle2 size={20} strokeWidth={2.5} />, accent: '#059669' },
                ].map(stat => (
                    <div className="sq-stat-card" key={stat.label} style={{ '--accent': stat.accent }}>
                        <div className="sqsc-icon">{stat.icon}</div>
                        <div className="sqsc-body">
                            <div className="sqsc-value">{stat.value}</div>
                            <div className="sqsc-label">{stat.label}</div>
                        </div>
                        <div className="sqsc-bar" />
                    </div>
                ))}
            </div>

            {/* ── Main Layout ── */}
            <div className="sq-main-content">


            {/* ── Table Card ── */}
            <div className="sq-table-card">

                {/* Controls */}
                <div className="sq-controls">
                    <div className="sq-tabs">
                        {FILTER_TABS.map(tab => (
                            <button
                                key={tab.key}
                                className={`sq-tab ${activeTab === tab.key ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.key)}
                                style={activeTab === tab.key && STATUS_CONFIG[tab.key]
                                    ? { '--tab-color': STATUS_CONFIG[tab.key].color, '--tab-bg': STATUS_CONFIG[tab.key].bg }
                                    : {}}
                            >
                                {tab.label}
                                <span className="sq-tab-count">{counts[tab.key] ?? counts.all}</span>
                            </button>
                        ))}
                    </div>
                    <div className="sq-toolbar">
                        <div className="sq-search">
                            <span className="sq-search-icon"><Search size={14} strokeWidth={2.5} /></span>
                            <input
                                type="text"
                                placeholder="Search by ID, site, tech, region…"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                            {search && <button className="sq-search-clear" onClick={() => setSearch('')}><X size={14} strokeWidth={3} /></button>}
                        </div>
                        <select
                            className="sq-sort"
                            value={sortKey}
                            onChange={e => setSortKey(e.target.value)}
                        >
                            {SORT_OPTIONS.map(o => (
                                <option key={o.key} value={o.key}>{o.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="sq-table-wrap">
                    <table className="sq-table">
                        <thead>
                            <tr>
                                <th>Audit ID</th>
                                <th>Tower Site</th>
                                <th>Technician</th>
                                <th>Region</th>
                                <th>Activity Type</th>
                                <th>Submitted</th>
                                <th>Risk</th>
                                <th>Flags</th>
                                <th>Status</th>
                                <th>Reviewer</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={11} className="sq-empty-row">
                                        <Search size={32} color="#cbd5e1" strokeWidth={1.5} />
                                        <p>No submissions match your filters.</p>
                                    </td>
                                </tr>
                            ) : filtered.map(sub => {
                                const sc = STATUS_CONFIG[sub.status];
                                const rc = RISK_CONFIG[sub.risk];
                                const isSelected = selectedRow === sub.id;
                                const isClickable = sub.status === 'submitted';
                                return (
                                    <tr
                                        key={sub.id}
                                        className={`sq-row ${isSelected ? 'selected' : ''} ${isClickable ? 'clickable' : ''}`}
                                        onClick={() => handleRowClick(sub)}
                                        title={isClickable ? 'Click to open AI Audit Review' : ''}
                                    >
                                        <td>
                                            <span className="sq-id">{sub.id}</span>
                                        </td>
                                        <td>
                                            <div className="sq-site">
                                                <span className="sq-site-icon"><RadioTower size={14} style={{ display: 'inline' }} /></span>
                                                {sub.site}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="sq-tech">
                                                <img
                                                    src={`https://i.pravatar.cc/32?u=${sub.tech}`}
                                                    alt={sub.tech}
                                                    className="sq-avatar"
                                                />
                                                {sub.tech}
                                            </div>
                                        </td>
                                        <td className="sq-region">{sub.region}</td>
                                        <td className="sq-type">{sub.type}</td>
                                        <td className="sq-time">{sub.submitted}</td>
                                        <td>
                                            <span className="sq-badge" style={{ color: rc.color, background: rc.bg }}>
                                                {rc.label}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="sq-flags">
                                                {sub.flags > 0 && <span className="sq-flag-chip fail"><XCircle size={12} style={{ marginRight: 4, verticalAlign: '-2px' }} /> {sub.flags}</span>}
                                                {sub.warnings > 0 && <span className="sq-flag-chip warn"><AlertTriangle size={12} style={{ marginRight: 4, verticalAlign: '-2px' }} /> {sub.warnings}</span>}
                                                {sub.flags === 0 && sub.warnings === 0 && <span className="sq-flag-chip pass"><CheckCircle2 size={12} style={{ marginRight: 4, verticalAlign: '-2px' }} /> Clean</span>}
                                            </div>
                                        </td>
                                        <td>
                                            <span className="sq-status-pill" style={{ color: sc.color, background: sc.bg, border: `1px solid ${sc.border}` }}>
                                                {sc.label}
                                            </span>
                                        </td>
                                        <td className="sq-reviewer">{sub.reviewer}</td>
                                        <td>
                                            {isClickable && (
                                                <button className="sq-open-btn" onClick={() => handleRowClick(sub)}>
                                                    Review <ArrowRight size={14} style={{ marginLeft: 4, verticalAlign: '-3px' }} />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="sq-footer">
                    <span>{filtered.length} of {allSubmissions.length} submissions</span>
                    {activeTab !== 'all' && (
                        <button className="sq-clear-filter" onClick={() => { setActiveTab('all'); setSearch(''); }}>
                            Clear filters
                        </button>
                    )}
                </div>
            </div>
            </div>
        </div>
    );
}
