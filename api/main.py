from fastapi import FastAPI
from .reports import router as reports_router
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
import json
from .utils import apply_premium_style, COMMON_LAYOUT

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(reports_router)

# Mock dataset for advanced analytics
# Represents thousands of historical audits for robust visualizations
np.random.seed(42)
num_records = 500
regions = ['Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Limpopo', 'Mpumalanga', 'Northern Cape', 'Free State', 'Eastern Cape', 'North West']
techs = ['Michael B.', 'Sandra O.', 'David K.', 'James T.', 'Nadia V.', 'Carlos M.', 'Faith N.', 'Priya S.', 'John M.']
types = ['Routine Inspection', 'Fuel Audit', 'Asset Check', 'Emergency Visit', 'Oil Change', 'Grass Clearing', 'Battery Replace']
statuses = ['approved', 'rejected', 'submitted', 'planned']
risks = ['low', 'medium', 'high']

df = pd.DataFrame({
    'date': pd.date_range(start='2026-01-01', periods=num_records, freq='4h'),
    'region': np.random.choice(regions, num_records),
    'technician': np.random.choice(techs, num_records),
    'activity_type': np.random.choice(types, num_records),
    'status': np.random.choice(statuses, num_records, p=[0.6, 0.15, 0.15, 0.1]),
    'risk_level': np.random.choice(risks, num_records, p=[0.5, 0.3, 0.2]),
    'flags': np.random.poisson(1.5, num_records),
    'warnings': np.random.poisson(2.5, num_records),
    'time_spent_mins': np.random.normal(45, 15, num_records)
})
df['time_spent_mins'] = df['time_spent_mins'].clip(lower=10).astype(int)

# Map string risks to numeric for heatmaps
risk_map = {'low': 1, 'medium': 2, 'high': 3}
df['risk_score'] = df['risk_level'].map(risk_map)

@app.get("/api/charts/regional-risk")
def get_regional_risk():
    """Persona: Regional Manager. Heatmap of Risk scores by Region and Activity Type."""
    pivot = df.pivot_table(index='region', columns='activity_type', values='risk_score', aggfunc='mean').fillna(1)
    
    fig = px.imshow(
        pivot,
        labels=dict(x="Activity Type", y="Region", color="Avg Risk"),
        x=pivot.columns,
        y=pivot.index,
        color_continuous_scale=[[0, "#f0fdf4"], [0.5, "#fef3c7"], [1, "#fef2f2"]],
        aspect="auto",
        text_auto=".1f"
    )
    
    fig = apply_premium_style(fig)
    fig.update_xaxes(tickangle=35, showgrid=False)
    fig.update_yaxes(showgrid=False)
    
    return json.loads(fig.to_json())

@app.get("/api/charts/compliance-trend")
def get_compliance_trend():
    """Persona: Executive/Business. Trend of submission volumes by status."""
    df['date_only'] = df['date'].dt.date
    trend = df.groupby(['date_only', 'status']).size().reset_index(name='count')
    
    color_map = {'approved': '#10b981', 'rejected': '#ef4444', 'submitted': '#3b82f6', 'planned': '#8b5cf6'}
    
    fig = px.area(
        trend, x='date_only', y='count', color='status',
        color_discrete_map=color_map, line_shape='spline'
    )
    
    fig = apply_premium_style(fig)
    fig.update_layout(
        xaxis_title="", yaxis_title="Audits Count",
        legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1, title="")
    )
    fig.update_xaxes(showgrid=False, tickformat="%b %d")
    return json.loads(fig.to_json())

@app.get("/api/charts/tech-efficiency")
def get_tech_efficiency():
    """Persona: Ops Lead. Scatter plot of Time Spent vs Issues."""
    df['total_issues'] = df['flags'] + df['warnings']
    tech_stats = df.groupby('technician').agg({'time_spent_mins': 'mean', 'total_issues': 'mean', 'risk_score': 'mean'}).reset_index()
    
    fig = px.scatter(
        tech_stats, x='time_spent_mins', y='total_issues', size='risk_score',
        color='technician', hover_name='technician', size_max=25
    )
    
    fig.update_traces(marker=dict(line=dict(width=1, color='white')))
    fig = apply_premium_style(fig)
    fig.update_layout(xaxis_title="Avg Time (mins)", yaxis_title="Avg Issues", showlegend=False)
    return json.loads(fig.to_json())

@app.get("/api/charts/reviewer-aging")
def get_reviewer_aging():
    """Persona: Reviewer. Histogram of hours since submission for 'submitted' items."""
    df_sub = df[df['status'] == 'submitted'].copy()
    now = pd.Timestamp('2026-03-11')
    df_sub['hours_waiting'] = (now - df_sub['date']).dt.total_seconds() / 3600
    df_sub['hours_waiting'] = df_sub['hours_waiting'].clip(lower=0, upper=72)
    
    fig = px.histogram(
        df_sub, x='hours_waiting', nbins=15,
        color_discrete_sequence=['#f59e0b'],
        labels={'hours_waiting': 'Hours in Queue'}
    )
    
    fig = apply_premium_style(fig)
    fig.update_layout(xaxis_title="Hours Waiting for Review", yaxis_title="Count of Submissions", showlegend=False)
    fig.update_traces(marker=dict(line=dict(color='white', width=1)))
    return json.loads(fig.to_json())

@app.get("/api/charts/rejection-rates")
def get_rejection_rates():
    """Persona: Reviewer. Rejection rate by distinct regions."""
    rates = df.groupby('region').apply(lambda x: (x['status'] == 'rejected').mean() * 100).reset_index(name='reject_rate')
    rates = rates.sort_values('reject_rate', ascending=False)
    
    fig = px.bar(
        rates, x='reject_rate', y='region', orientation='h',
        color='reject_rate', color_continuous_scale=['#f0fdf4', '#fecaca', '#ef4444'],
        labels={'reject_rate': 'Rejection Rate (%)', 'region': ''}
    )
    
    fig = apply_premium_style(fig)
    fig.update_layout(xaxis_title="Rejection Rate (%)", yaxis_title="")
    return json.loads(fig.to_json())
