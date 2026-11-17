import React from "react";
import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

function StatusPill({ online }) {
  return (
    <span className={`status-pill ${online ? "online" : "offline"}`}>
      <span className="status-dot" />
      {online ? "API CONNECTED" : "API DISCONNECTED"}
    </span>
  );
}

export default function App() {
  const [apiStatus, setApiStatus] = useState("checking");
  const [health, setHealth] = useState(null);

  useEffect(() => {
    let active = true;
    async function checkApi() {
      try {
        const response = await fetch(`${API_BASE}/api/v1/health`);
        if (!response.ok) throw new Error("API request failed");
        const data = await response.json();
        if (active) {
          setHealth(data);
          setApiStatus("online");
        }
      } catch {
        if (active) {
          setHealth(null);
          setApiStatus("offline");
        }
      }
    }
    checkApi();
    const interval = setInterval(checkApi, 10000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  const connected = apiStatus === "online";

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="LUNA-SAFE home">
          <span className="brand-mark">L</span>
          <span><strong>LUNA-SAFE</strong><small>MISSION ANALYSIS SYSTEM</small></span>
        </a>
        <div className="topbar-right">
          <span className="environment">RESEARCH PROTOTYPE · v0.1.0</span>
          <StatusPill online={connected} />
        </div>
      </header>

      <section className="hero">
        <div className="eyebrow"><span /> LUNAR TERRAIN INTELLIGENCE</div>
        <h1>See the terrain.<br /><span>Understand the risk.</span></h1>
        <p className="hero-copy">
          An AI-assisted research platform for identifying lunar boulders,
          estimating their apparent ground dimensions, and screening terrain
          for lander and rover hazards.
        </p>
      </section>

      <section className="status-grid" aria-label="System status">
        <article className="status-card">
          <span className="card-label">API SERVICE</span>
          <strong className={connected ? "good" : "muted"}>
            {apiStatus === "checking" ? "CHECKING" : connected ? "ONLINE" : "OFFLINE"}
          </strong>
          <small>{connected ? "Backend health check passed" : "Start the backend service"}</small>
        </article>
        <article className="status-card">
          <span className="card-label">BOULDER DETECTOR</span>
          <strong className="muted">NOT CONNECTED</strong>
          <small>Model integration is the next stage</small>
        </article>
        <article className="status-card">
          <span className="card-label">HAZARD ENGINE</span>
          <strong className="muted">NOT CONNECTED</strong>
          <small>Rules and spatial analysis are planned</small>
        </article>
      </section>

      <section className="workspace">
        <div className="section-heading">
          <div><span className="section-kicker">WORKSPACE</span><h2>Terrain analysis</h2></div>
          <span className="stage-tag">FOUNDATION STAGE</span>
        </div>
        <div className="empty-workspace">
          <div className="moon-icon" aria-hidden="true">◐</div>
          <h3>Analysis workspace is being assembled</h3>
          <p>
            Image ingestion, boulder detection, physical scale estimation,
            and hazard mapping will be connected in upcoming stages.
          </p>
          <a className="docs-link" href={`${API_BASE}/docs`} target="_blank" rel="noreferrer">
            Open API documentation <span>↗</span>
          </a>
        </div>
      </section>

      <footer className="footer">
        <span>LUNA-SAFE · OPEN RESEARCH PROTOTYPE</span>
        <span>{health?.service ? `SERVICE: ${health.service}` : "WAITING FOR BACKEND"}</span>
      </footer>
    </main>
  );
}
