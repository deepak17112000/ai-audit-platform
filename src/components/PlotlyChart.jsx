import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

export default function PlotlyChart({ endpoint, title }) {
    const [chartData, setChartData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(endpoint)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch chart data');
                return res.json();
            })
            .then(json => {
                setChartData(json);
            })
            .catch(err => {
                console.error("Error fetching plot data:", err);
                setError(err.message);
            });
    }, [endpoint]);

    if (error) {
        return <div style={{ color: '#dc2626', fontSize: '12px', padding: '16px' }}>Error: {error}</div>;
    }

    if (!chartData) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9baac4', fontSize: '13px' }}>
                <div className="spinner" style={{ border: '2px solid #e8edf5', borderTopColor: '#2563eb', borderRadius: '50%', width: '16px', height: '16px', animation: 'spin 1s linear infinite', marginRight: '8px' }} />
                Loading {title}...
                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    return (
        <Plot
            data={chartData.data}
            layout={{
                ...chartData.layout,
                autosize: true,
                margin: { l: 24, r: 10, t: 10, b: 24 },
                font: { family: 'Inter, sans-serif' }
            }}
            config={{ responsive: true, displayModeBar: false }}
            useResizeHandler={true}
            style={{ width: '100%', height: '100%' }}
        />
    );
}
