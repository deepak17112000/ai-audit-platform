import React, { useState } from 'react';
import { ArrowLeft, FileBarChart } from 'lucide-react';
import './App.css';
import ReviewerDashboard from './components/ReviewerDashboard';
import SubmissionsQueue from './components/SubmissionsQueue';
import Dashboard from './components/Dashboard';

/* Inline SVG icons matching the IZ brand image reference */
const icons = {
  dashboard: <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></svg>,
  user: <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>,
  siteActivity: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M2 12h1M21 12h1M12 2v1M12 21v1" /><path d="M5.6 5.6l.7.7M17.7 17.7l.7.7M5.6 18.4l.7-.7M17.7 6.3l.7-.7" /><circle cx="12" cy="12" r="7" /></svg>,
  asset: <svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>,
  movement: <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>,
  settings: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>,
};

// Views: 'queue' | 'audit'
function App() {
  const [view, setView] = useState('queue');
  const [activeSubmission, setActiveSubmission] = useState(null);

  const handleOpenAudit = (submission) => {
    setActiveSubmission(submission);
    setView('audit');
  };

  const handleBackToQueue = () => {
    setView('queue');
  };

  const isQueueView = view === 'queue';

  return (
    <div className="app-container">
      {/* IZ Brand Sidebar */}
      <aside className="vanguard-sidebar">
        {/* IZ Logo — matches reference: navy text + green triangle */}
        <div className="brand-orb">
          <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="3" y="36" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="28" fill="#1a2e5a">IZ</text>
            <polygon points="40,4 52,4 52,18" fill="#2bc480" />
          </svg>
        </div>

        <nav className="nav-cluster">
          <button 
            className={`nav-btn ${view === 'dashboard' ? 'active' : ''}`} 
            title="Dashboard"
            onClick={() => setView('dashboard')}
          >
            {icons.dashboard}
            Dashboard
          </button>
          <button className="nav-btn" title="User Details">
            {icons.user}
            User Details
          </button>
          <button
            className={`nav-btn ${isQueueView ? 'active' : ''}`}
            title="Submissions Queue"
            onClick={() => setView('queue')}
          >
            {icons.siteActivity}
            Submissions
          </button>
          <button
            className={`nav-btn ${!isQueueView ? 'active' : ''}`}
            title="Site Activity – AI Audit"
            onClick={() => activeSubmission && setView('audit')}
            disabled={!activeSubmission}
            style={{ opacity: activeSubmission ? 1 : 0.45 }}
          >
            {icons.asset}
            Site Activity
          </button>
          <button className="nav-btn" title="Asset Movement">
            {icons.movement}
            Asset Movement
          </button>
          <button className="nav-btn" title="Settings">
            {icons.settings}
            Settings/ Configuration
          </button>
        </nav>

        <div className="nav-spacer" />

        <div className="nav-avatar">
          <img src="https://i.pravatar.cc/150?img=68" alt="Reviewer" />
        </div>
      </aside>

      <div className="vanguard-workspace">
        {/* IZ App Header */}
        <header className="vanguard-header">
          <div className="header-context">
            {!isQueueView && (
              <button className="back-btn" onClick={handleBackToQueue} title="Back to queue">
                <ArrowLeft size={16} strokeWidth={2.5} style={{ marginRight: 6 }} /> Back
              </button>
            )}
            <h1>
              {view === 'dashboard' ? (
                <>Analytics Dashboard</>
              ) : isQueueView ? (
                <>Submissions Queue <span className="header-badge pulse">AI Engine Active</span></>
              ) : (
                <>
                  Site Activity — AI Audit
                  <span className="header-badge pulse">AI Engine Active</span>
                  {activeSubmission && (
                    <span className="header-sub-badge">{activeSubmission.id} · {activeSubmission.site}</span>
                  )}
                </>
              )}
            </h1>
          </div>
          <div className="header-status">
            <div className="system-health">
              <span className="health-dot" />
              8,000 Sites Monitored
            </div>
            <div className="action-cluster">
              <button className="btn-ghost">Escalate to Manager</button>
              <button className="btn-primary">
                <FileBarChart size={14} strokeWidth={2.5} style={{ marginRight: 6, verticalAlign: '-2px' }} /> Generate Audit Report
              </button>
            </div>
          </div>
        </header>

        {/* View Router */}
        {view === 'dashboard' ? (
          <Dashboard />
        ) : view === 'queue' ? (
          <SubmissionsQueue onOpenAudit={handleOpenAudit} />
        ) : (
          <ReviewerDashboard />
        )}
      </div>
    </div>
  );
}

export default App;
