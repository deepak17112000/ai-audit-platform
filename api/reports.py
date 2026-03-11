from fastapi import APIRouter
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
import json
from .utils import apply_premium_style, COMMON_LAYOUT

router = APIRouter(prefix="/api/charts")

regions = ['Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Limpopo', 'Mpumalanga']
techs = ['Michael B.', 'Sandra O.', 'David K.', 'James T.', 'Nadia V.']
activities = ['Grass Cutting', 'DG Service', 'Battery Replace', 'Panel Clean']

@router.get("/ai-flagged-exceptions")
def chart_1():
    d = pd.DataFrame({'Activity': activities, 'Exceptions': [45, 82, 12, 30]})
    fig = px.pie(d, names='Activity', values='Exceptions', hole=0.5, color_discrete_sequence=COMMON_LAYOUT['colorway'])
    return json.loads(apply_premium_style(fig).to_json())

@router.get("/before-after-verification")
def chart_2():
    d = pd.DataFrame({'Region': regions, 'Verification Pass %': [88, 92, 75, 85, 96]})
    fig = px.bar(d, x='Region', y='Verification Pass %', color='Verification Pass %', color_continuous_scale='Greens')
    return json.loads(apply_premium_style(fig).to_json())

@router.get("/fuel-verification")
def chart_3():
    d = pd.DataFrame({'OCR Reading': np.random.uniform(100, 500, 50), 'Manual Entry': np.random.uniform(100, 500, 50)})
    fig = px.scatter(d, x='OCR Reading', y='Manual Entry', color_discrete_sequence=['#ef4444'])
    fig.add_shape(type='line', x0=100, y0=100, x1=500, y1=500, line=dict(color='#94a3b8', dash='dash'))
    return json.loads(apply_premium_style(fig).to_json())

@router.get("/asset-validation")
def chart_4():
    d = pd.DataFrame({'CV Finding': ['Match', 'Mismatch', 'No Asset'], 'Count': [350, 42, 18]})
    fig = px.bar(d, x='Count', y='CV Finding', orientation='h', color='CV Finding', color_discrete_sequence=['#10b981', '#ef4444', '#f59e0b'])
    return json.loads(apply_premium_style(fig).to_json())

@router.get("/tech-fraud-risk")
def chart_5():
    d = pd.DataFrame({'Tech': techs, 'Fraud Score': [85, 72, 45, 20, 15]})
    fig = px.bar(d, x='Tech', y='Fraud Score', color='Fraud Score', color_continuous_scale='Reds')
    return json.loads(apply_premium_style(fig).to_json())

@router.get("/vendor-audit")
def chart_6():
    d = pd.DataFrame({'Metric': ['Rejections', 'SLA Breach', 'Fraud Flags', 'Poor Evidence', 'Repeats'], 'Vendor A': [20, 30, 10, 50, 20], 'Vendor B': [40, 10, 30, 20, 40]})
    fig = go.Figure()
    fig.add_trace(go.Scatterpolar(r=d['Vendor A'], theta=d['Metric'], fill='toself', name='Vendor A', line_color='#3b82f6'))
    fig.add_trace(go.Scatterpolar(r=d['Vendor B'], theta=d['Metric'], fill='toself', name='Vendor B', line_color='#ef4444'))
    fig.update_layout(polar=dict(radialaxis=dict(visible=True, range=[0, 60])), showlegend=True)
    return json.loads(apply_premium_style(fig).to_json())

@router.get("/image-quality")
def chart_7():
    d = pd.DataFrame({'Activity': activities, 'Blurry': [15, 5, 20, 2], 'Low Light': [10, 15, 5, 8]})
    fig = px.bar(d, x='Activity', y=['Blurry', 'Low Light'], barmode='stack', color_discrete_sequence=['#f59e0b', '#8b5cf6'])
    return json.loads(apply_premium_style(fig).to_json())

@router.get("/geolocation")
def chart_8():
    d = pd.DataFrame({'Status': ['Inside Geofence', 'Outside Geofence'], 'Count': [450, 32]})
    fig = px.pie(d, names='Status', values='Count', color='Status', color_discrete_map={'Inside Geofence': '#10b981', 'Outside Geofence': '#ef4444'})
    return json.loads(apply_premium_style(fig).to_json())

@router.get("/sla-compliance")
def chart_9():
    d = pd.DataFrame({'Week': ['W1', 'W2', 'W3', 'W4'], 'Compliance %': [85, 88, 82, 91]})
    fig = px.line(d, x='Week', y='Compliance %', markers=True, line_shape='spline', color_discrete_sequence=['#3b82f6'])
    fig = apply_premium_style(fig)
    fig.update_yaxes(range=[0, 100])
    return json.loads(fig.to_json())

@router.get("/repeated-activity")
def chart_10():
    d = pd.DataFrame({'Site': ['DL-234', 'UP-882', 'ZAF-818', 'MP-112'], 'Repeats Count': [5, 2, 8, 1]})
    fig = px.bar(d, x='Site', y='Repeats Count', color='Repeats Count', color_continuous_scale='Oranges')
    return json.loads(apply_premium_style(fig).to_json())

@router.get("/site-risk")
def chart_11():
    d = pd.DataFrame({'Site': [f'Site-{i}' for i in range(15)], 'Tickets': np.random.randint(5, 50, 15), 'Risk Score': np.random.randint(10, 100, 15)})
    fig = px.scatter(d, x='Tickets', y='Risk Score', hover_name='Site', size='Risk Score', color='Risk Score', color_continuous_scale='Viridis')
    return json.loads(apply_premium_style(fig).to_json())

@router.get("/reviewer-priority")
def chart_12():
    d = pd.DataFrame({'Priority Level': ['Critical', 'High', 'Medium', 'Low'], 'Items': [12, 45, 120, 310]})
    fig = px.funnel(d, x='Items', y='Priority Level', color='Priority Level', color_discrete_sequence=['#ef4444', '#f59e0b', '#3b82f6', '#10b981'])
    return json.loads(apply_premium_style(fig).to_json())

@router.get("/ocr-validation")
def chart_13():
    d = pd.DataFrame({'Meter Type': ['DG Hour', 'Fuel', 'Voltage'], 'Match': [150, 120, 200], 'Mismatch': [10, 45, 5]})
    fig = px.bar(d, x='Meter Type', y=['Match', 'Mismatch'], barmode='group', color_discrete_sequence=['#10b981', '#ef4444'])
    return json.loads(apply_premium_style(fig).to_json())

@router.get("/cross-site-reuse")
def chart_14():
    d = pd.DataFrame({'Tech': techs, 'Duplications': [12, 5, 2, 0, 8]})
    fig = px.bar(d, x='Duplications', y='Tech', orientation='h', color='Duplications', color_continuous_scale='Inferno')
    return json.loads(apply_premium_style(fig).to_json())

@router.get("/evidence-completeness")
def chart_15():
    d = pd.DataFrame({'Activity': activities, 'Missing Proofs': [20, 15, 30, 5]})
    fig = px.pie(d, names='Activity', values='Missing Proofs', hole=0.6, color_discrete_sequence=COMMON_LAYOUT['colorway'])
    return json.loads(apply_premium_style(fig).to_json())
