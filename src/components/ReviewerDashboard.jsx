import React, { useState } from 'react';
import {
    CheckCircle2,
    XCircle,
    AlertTriangle,
    Check,
    X,
    Sparkles,
    ZoomIn,
    Database,
    Camera
} from 'lucide-react';
import './ReviewerDashboard.css';

const submissionData = {
    id: "AUD-992XR",
    site: "ZAF-TWR-818",
    tech: "Michael B.",
    timestamp: "2026-03-10  14:22:15",
    riskLevel: "High Risk",
    capabilities: [
        {
            id: "cap-1",
            title: "Grass Cutting Detection",
            status: "pass",
            result: "Work Completed",
            desc: "Vegetation height reduced from ~120 cm to <15 cm. Site perimeter fully cleared and confirmed.",
            aiNote: "After image shows cleared perimeter — AI confidence threshold met.",
            confidence: 98,
            beforeImg: "/grass_before.png",
            afterImg: "/grass_after.png"
        },
        {
            id: "cap-2",
            title: "Fuel Meter Validation",
            status: "fail",
            result: "Work Not at Required Level",
            desc: "Technician claimed 450L filled. AI OCR extracted only 140L from meter photo. Δ = 310L — required minimum is 400L.",
            aiNote: "Meter reading fell 69% short of the claimed fill amount. Possible under-delivery or false claim.",
            confidence: 92,
            beforeImg: "/fuel_meter_low.png",
            afterImg: "/fuel_meter_high.png"
        },
        {
            id: "cap-3",
            title: "Before vs After Image Compare",
            status: "fail",
            result: "Duplicate Image Submitted",
            desc: "pHash comparison detected the submitted 'After' image has 99.8% similarity to the 'Before' photo. No visual evidence of work.",
            aiNote: "Identical images indicate no physical activity occurred — image may have been reused to fraudulently close the task.",
            confidence: 99.9,
            beforeImg: "/grass_before.png",
            afterImg: "/grass_after.png"
        },
        {
            id: "cap-4",
            title: "Asset Replacement Verify",
            status: "pass",
            result: "Work Completed",
            desc: "New VRLA battery bank serial number confirmed against master asset register. Old unit logged for disposal.",
            aiNote: "Serial tag on new unit matched procurement record — replacement verified.",
            confidence: 95,
            beforeImg: "/battery_old.png",
            afterImg: "/battery_new.png"
        },
        {
            id: "cap-5",
            title: "GPS Location Validation",
            status: "warn",
            result: "Minor Deviation",
            desc: "Photo EXIF GPS: -26.2041, 28.0473. Tower registry: -26.2039, 28.0470. Δ = 0.04 km — within 50m soft threshold.",
            aiNote: "Coordinates are close enough to confirm on-site presence, but flagged for awareness.",
            confidence: 97
        },
    ]
};

const statusConfig = {
    fail: { label: 'Flagged', color: '#dc2626', bg: '#fef2f2', border: '#fecaca', icon: <XCircle size={14} strokeWidth={3} /> },
    warn: { label: 'Warning', color: '#d97706', bg: '#fffbeb', border: '#fde68a', icon: <AlertTriangle size={14} strokeWidth={3} /> },
    pass: { label: 'Passed', color: '#059669', bg: '#f0fdf4', border: '#a7f3d0', icon: <CheckCircle2 size={14} strokeWidth={3} /> },
};

// AI model labels
const modelTag = {
    'cap-2': 'OCR Extraction',
    'cap-3': 'SSIM + pHash',
    'cap-5': 'EXIF Analyzer',
};

export default function ReviewerDashboard() {
    const [activeCap, setActiveCap] = useState(submissionData.capabilities[0]);
    const [sliderPos, setSliderPos] = useState(50);
    const [mismatchOnly, setMismatchOnly] = useState(false);
    const [approvedAll, setApprovedAll] = useState(false);
    const [approvedIds, setApprovedIds] = useState(new Set());

    const visibleCaps = mismatchOnly
        ? submissionData.capabilities.filter(c => c.status !== 'pass')
        : submissionData.capabilities;

    const flagCount = submissionData.capabilities.filter(c => c.status === 'fail').length;
    const warnCount = submissionData.capabilities.filter(c => c.status === 'warn').length;

    const handleApproveAll = () => {
        setApprovedAll(true);
        setApprovedIds(new Set(submissionData.capabilities.map(c => c.id)));
    };

    const toggleApprove = (id, e) => {
        e.stopPropagation();
        setApprovedIds(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    return (
        <div className="rd-wrapper">

            {/* ── Triage Banner ── */}
            <div className={`rd-banner ${approvedAll ? 'approved' : 'flagged'}`}>
                <div className="rd-meta">
                    <div className="rd-meta-chip">
                        <span className="rm-l">Submission</span>
                        <strong>{submissionData.id}</strong>
                    </div>
                    <div className="rd-meta-chip">
                        <span className="rm-l">Tower Site</span>
                        <strong>{submissionData.site}</strong>
                    </div>
                    <div className="rd-meta-chip">
                        <span className="rm-l">Technician</span>
                        <strong>{submissionData.tech}</strong>
                    </div>
                    <div className="rd-meta-chip">
                        <span className="rm-l">Submitted</span>
                        <strong>{submissionData.timestamp}</strong>
                    </div>
                    <div className="rd-pills">
                        <span className="rd-pill fail">{flagCount} Critical</span>
                        <span className="rd-pill warn">{warnCount} Warnings</span>
                        {approvedAll && <span className="rd-pill pass"><Check size={12} strokeWidth={3} style={{ marginRight: 4, verticalAlign: '-2px' }} /> All Approved</span>}
                    </div>
                </div>
                <div className="rd-banner-actions">
                    <button className="btn-outline-danger">
                        <X size={14} strokeWidth={2.5} style={{ marginRight: 6, verticalAlign: '-2px' }} />
                        Reject Submission
                    </button>
                    <button
                        className={`btn-approve-all ${approvedAll ? 'done' : ''}`}
                        onClick={handleApproveAll}
                        disabled={approvedAll}
                    >
                        <Check size={14} strokeWidth={3} style={{ marginRight: 6, verticalAlign: '-2px' }} />
                        {approvedAll ? 'All Approved' : 'Approve All Checks'}
                    </button>
                </div>
            </div>

            {/* ── Main Grid ── */}
            <div className="rd-grid">

                {/* LEFT: AI Audit Matrix */}
                <div className="rd-list-panel">
                    <div className="rd-list-header">
                        <div className="rdlh-left">
                            <h2>AI Audit Matrix</h2>
                            <span className="rd-count-pill">{visibleCaps.length} routines</span>
                        </div>
                        <label className="mismatch-toggle">
                            <span className="mt-label">Mismatches Only</span>
                            <div className={`mt-switch ${mismatchOnly ? 'on' : ''}`} onClick={() => setMismatchOnly(v => !v)}>
                                <div className="mt-thumb" />
                            </div>
                        </label>
                    </div>

                    <div className="rd-cap-list">
                        {visibleCaps.map(cap => {
                            const cfg = statusConfig[cap.status];
                            const isApproved = approvedIds.has(cap.id);
                            return (
                                <div
                                    key={cap.id}
                                    className={`rd-cap-card ${cap.status} ${activeCap.id === cap.id ? 'active' : ''} ${isApproved ? 'overridden' : ''}`}
                                    onClick={() => setActiveCap(cap)}
                                >
                                    <div className="rd-card-inner">
                                        <div className="rd-cap-top">
                                            <span className="rd-status-ico" style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
                                                {cfg.icon}
                                            </span>
                                            <div className="rd-cap-title-group">
                                                <h3>{cap.title}</h3>
                                                {cap.result && <span className={`rd-result-badge ${cap.status}`}>{cap.result}</span>}
                                            </div>
                                            <button
                                                className={`rd-mini-approve ${isApproved ? 'done' : ''}`}
                                                title={isApproved ? 'Undo Override' : 'Override & Approve'}
                                                onClick={e => toggleApprove(cap.id, e)}
                                            >
                                                <Check size={14} strokeWidth={3.5} />
                                            </button>
                                        </div>
                                        <p className="rd-cap-desc">{cap.desc}</p>
                                        {cap.aiNote && (
                                            <div className="rd-cap-ainote">
                                                <Sparkles size={14} className="ainote-icon" strokeWidth={2.5} color="#eab308" />
                                                <p>{cap.aiNote}</p>
                                            </div>
                                        )}

                                        {/* Animated AI Confidence Bar */}
                                        <div className="rd-confidence-bar">
                                            <div className="rcb-label">AI Confidence — {cap.confidence}%</div>
                                            <div className="rcb-track">
                                                <div className="rcb-fill" style={{ '--bar-width': `${cap.confidence}%` }} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rd-cap-tags">
                                        {modelTag[cap.id] && <span className="rd-tag">{modelTag[cap.id]}</span>}
                                        {isApproved && <span className="rd-tag override">Reviewer Override</span>}
                                    </div>
                                </div>
                            );
                        })}

                        {visibleCaps.length === 0 && (
                            <div className="rd-empty">
                                <CheckCircle2 size={48} color="#94a3b8" strokeWidth={1} />
                                <p>No mismatches detected in this submission.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT: Visualizer */}
                <div className="rd-visualizer-panel">
                    <div className="rd-vis-header">
                        <div className="rdvh-title">
                            <span className={`rdvh-status-dot ${activeCap.status}`} style={{ background: statusConfig[activeCap.status].color }} />
                            <h2>{activeCap.title}</h2>
                            <span className="rdvh-badge" style={{ background: statusConfig[activeCap.status].bg, color: statusConfig[activeCap.status].color, border: `1px solid ${statusConfig[activeCap.status].border}` }}>
                                {statusConfig[activeCap.status].label}
                            </span>
                        </div>
                        <div className="rdvh-tools">
                            <button>
                                <ZoomIn size={14} style={{ marginRight: 6, verticalAlign: '-3px' }} /> Zoom
                            </button>
                            <button>
                                <Database size={14} style={{ marginRight: 6, verticalAlign: '-3px' }} /> EXIF Data
                            </button>
                        </div>
                    </div>

                    <div className="rd-stage">

                        {/* Image Slider — Grass, SSIM, Battery, Oil, Reuse */}
                        {['cap-1', 'cap-2', 'cap-4', 'cap-5', 'cap-6'].includes(activeCap.id) && (
                            <div className="rd-compare">
                                <div className="rd-compare-labels">
                                    <span className="rcl before">
                                        <Camera size={12} style={{ marginRight: 4, verticalAlign: '-2px' }} /> Before
                                    </span>
                                    <span className="rcl after">
                                        <Camera size={12} style={{ marginRight: 4, verticalAlign: '-2px' }} /> After
                                    </span>
                                </div>
                                <div className="rd-slider-wrap">
                                    <div className="rd-img-bg" style={{ backgroundImage: `url(${activeCap.afterImg})` }} />
                                    <div className="rd-img-fg" style={{ backgroundImage: `url(${activeCap.beforeImg})`, width: `${sliderPos}%` }}>
                                        {activeCap.id === 'cap-1' && <div className="rd-bbox grass-b"><span className="rdb-lbl warn">Tall Grass Detected</span></div>}
                                        {activeCap.id === 'cap-5' && <div className="rd-bbox oil-b"><span className="rdb-lbl fail">Dark Oil — Unchanged</span></div>}
                                    </div>
                                    {(activeCap.id === 'cap-2') && <div className="rd-duplicate-badge">⚠ SSIM 99.8% — Identical Images</div>}
                                    {(activeCap.id === 'cap-6') && <div className="rd-duplicate-badge">🔁 pHash Match — 2025-11-04 Archive</div>}
                                    <input type="range" min="0" max="100" value={sliderPos} onChange={e => setSliderPos(e.target.value)} className="rd-slider-input" />
                                    <div className="rd-slider-divider" style={{ left: `${sliderPos}%` }}>
                                        <div className="rsd-handle">◂▸</div>
                                    </div>
                                </div>
                                <p className="rd-stage-hint">Drag the divider to compare Before vs After evidence photos</p>
                            </div>
                        )}

                        {/* Fuel Meter — dual panel */}
                        {activeCap.id === 'cap-3' && (
                            <div className="rd-fuel-view">
                                <div className="rd-fuel-panels">
                                    <div className="rd-fuel-pane">
                                        <div className="rdfp-label warn">⚠ Meter Photo — AI Read</div>
                                        <div className="rdfp-img-wrap">
                                            <img src="/fuel_meter_low.png" alt="Actual fuel gauge reading" />
                                            <div className="rdfp-ocr-box">
                                                <div className="rdfp-ocr-rect" />
                                                <span className="rdfp-ocr-tag">OCR: 140 L</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rd-fuel-vs"><span>vs</span></div>
                                    <div className="rd-fuel-pane">
                                        <div className="rdfp-label ghost">📋 Technician Claimed: 450L</div>
                                        <div className="rdfp-img-wrap dimmed">
                                            <img src="/fuel_meter_high.png" alt="Claimed level" />
                                            <div className="rdfp-claimed-overlay">Claimed Level</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="rd-mismatch-box">
                                    <div className="rdmb-row"><span>Technician Claimed</span><strong>450 Liters</strong></div>
                                    <div className="rdmb-row"><span>AI OCR Reading</span><strong className="err">140 Liters</strong></div>
                                    <div className="rdmb-delta">⚠ 310L Discrepancy — Possible Fuel Theft / False Claim</div>
                                </div>
                            </div>
                        )}

                        {/* GPS */}
                        {activeCap.id === 'cap-7' && (
                            <div className="rd-meta-view">
                                <div className="rd-meta-cards">
                                    <div className="rdmc-card">
                                        <h4>Photo EXIF Data</h4>
                                        <div className="rdmc-mono">-26.2041, 28.0473</div>
                                        <div className="rdmc-row"><span>Timestamp</span><span>14:22:15 SAST</span></div>
                                        <div className="rdmc-row"><span>Device</span><span>Samsung Galaxy A54</span></div>
                                        <div className="rdmc-row"><span>Make</span><span>SAMSUNG</span></div>
                                    </div>
                                    <div className="rdmc-card pass">
                                        <h4>Tower Registry</h4>
                                        <div className="rdmc-mono pass">-26.2039, 28.0470</div>
                                        <div className="rdmc-row"><span>Site ID</span><span>ZAF-TWR-818</span></div>
                                        <div className="rdmc-row"><span>Province</span><span>Gauteng</span></div>
                                        <div className="rdmc-row"><span>Variance</span><span className="pass-text">0.04 km ✓</span></div>
                                    </div>
                                </div>
                                <div className="rd-map-sim">
                                    <div className="rms-radius" />
                                    <div className="rms-tower">📡</div>
                                    <div className="rms-tech">📍</div>
                                    <span className="rms-label">✓ Within acceptable proximity (0.04km)</span>
                                </div>
                            </div>
                        )}

                        {/* Timestamp */}
                        {activeCap.id === 'cap-8' && (
                            <div className="rd-meta-view">
                                <div className="rd-meta-cards single">
                                    <div className="rdmc-card warn">
                                        <h4>Activity Timeline Anomaly</h4>
                                        <div className="rdmc-timeline">
                                            <div className="rdmc-tl-row fail"><span className="tl-time">14:22:15</span><span className="tl-act">Genset Refueling — Logged</span></div>
                                            <div className="rdmc-tl-row fail"><span className="tl-time">14:23:48</span><span className="tl-act">Battery Bank Replacement — Logged</span></div>
                                            <div className="rdmc-tl-row fail"><span className="tl-time">14:24:59</span><span className="tl-act">Grass Cutting & Clear — Logged</span></div>
                                        </div>
                                        <div className="rdmc-alert">⚠ 3 major activities completed in 2 min 44 sec — Physically impossible</div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
