COMMON_LAYOUT = dict(
    margin=dict(l=10, r=10, t=20, b=20),
    plot_bgcolor="rgba(0,0,0,0)",
    paper_bgcolor="rgba(0,0,0,0)",
    font=dict(color="#64748b", family="Inter, sans-serif", size=11),
    hoverlabel=dict(bgcolor="#0f172a", font=dict(family="Inter, sans-serif", size=12, color="#ffffff"), bordercolor="#0f172a"),
    colorway=["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6"]
)

def apply_premium_style(fig):
    fig.update_layout(**COMMON_LAYOUT)
    fig.update_layout(coloraxis_showscale=False)
    fig.update_xaxes(showgrid=True, gridcolor="#f1f5f9", zeroline=False, title_font=dict(size=11, color="#94a3b8"))
    fig.update_yaxes(showgrid=True, gridcolor="#f1f5f9", zeroline=False, title_font=dict(size=11, color="#94a3b8"))
    return fig
