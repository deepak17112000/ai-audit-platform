import React, { useState } from 'react';
import { AlertCircle, FileText, CheckCircle2, AlertTriangle, XCircle, Search, ChevronRight } from 'lucide-react';
import './PremiumDataGrid.css';

export default function PremiumDataGrid({ title, description, icon: Icon, columns, data }) {
    const [search, setSearch] = useState('');

    const filteredData = data.filter(row => {
        if (!search) return true;
        return columns.some(col => {
            const val = row[col.key];
            return String(val).toLowerCase().includes(search.toLowerCase());
        });
    });

    const renderBadge = (value, type) => {
        const valStr = String(value).toLowerCase();
        
        let colorClass = 'pdg-badge-neutral';
        if (['high', 'rejected', 'fail', 'blurry', 'overdue', 'mismatch'].some(k => valStr.includes(k))) {
            colorClass = 'pdg-badge-danger';
        } else if (['medium', 'warn', 'delayed'].some(k => valStr.includes(k))) {
            colorClass = 'pdg-badge-warning';
        } else if (['low', 'approved', 'pass', 'clean', 'on time'].some(k => valStr.includes(k))) {
            colorClass = 'pdg-badge-success';
        } else if (['pending', 'submitted'].some(k => valStr.includes(k))) {
            colorClass = 'pdg-badge-info';
        }

        return <span className={`pdg-badge ${colorClass}`}>{value}</span>;
    };

    return (
        <div className="pdg-container">
            <div className="pdg-header">
                <div className="pdg-title-area">
                    <div className="pdg-icon-wrapper">
                        {Icon && <Icon size={20} strokeWidth={2} />}
                    </div>
                    <div>
                        <h2>{title}</h2>
                        <p>{description}</p>
                    </div>
                </div>
                <div className="pdg-actions">
                    <div className="pdg-search">
                        <Search size={14} />
                        <input 
                            type="text" 
                            placeholder="Search report..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)} 
                        />
                    </div>
                </div>
            </div>

            <div className="pdg-table-wrapper">
                <table className="pdg-table">
                    <thead>
                        <tr>
                            {columns.map(col => (
                                <th key={col.key} style={{ width: col.width }}>{col.label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="pdg-empty">
                                    <AlertCircle size={32} />
                                    <p>No records found matching your criteria.</p>
                                </td>
                            </tr>
                        ) : filteredData.map((row, i) => (
                            <tr key={row.id || i}>
                                {columns.map(col => (
                                    <td key={col.key}>
                                        {col.isBadge ? renderBadge(row[col.key], col.key) : row[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="pdg-footer">
                <span>Showing {filteredData.length} records</span>
                <button className="pdg-export-btn">
                    Export CSV <ChevronRight size={14} />
                </button>
            </div>
        </div>
    );
}
