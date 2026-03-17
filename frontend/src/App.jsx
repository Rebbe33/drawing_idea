import { useState } from 'react';

const CATS = [
  { id: "tatouage", label: "Tatouage", icon: "🪡" },
  { id: "croquis", label: "Croquis rapide", icon: "✏️" },
  { id: "perspective", label: "Perspective", icon: "📐" },
  { id: "portrait", label: "Portrait", icon: "🧑‍🎨" },
  { id: "nature", label: "Nature morte", icon: "🍎" },
  { id: "manga", label: "Manga", icon: "⚡" },
  { id: "aquarelle", label: "Aquarelle", icon: "💧" },
  { id: "bd", label: "BD", icon: "💬" },
  { id: "architecture", label: "Architecture", icon: "🏛️" },
  { id: "anatomie", label: "Anatomie", icon: "🦴" },
  { id: "illustration", label: "Illustration", icon: "📖" },
  { id: "abstrait", label: "Abstrait", icon: "🌀" },
  { id: "lettering", label: "Lettering", icon: "🔤" },
  { id: "storyboard", label: "Storyboard", icon: "🎬" },
  { id: "zentangle", label: "Zentangle", icon: "🌸" },
  { id: "fusain", label: "Fusain", icon: "🖤" },
];

const API_URL = 'https://drawing-ideas-generator.vercel.app';

function App() {
  const [filters, setFilters] = useState([]);
  const [level, setLevel] = useState("Tous");
  const [theme, setTheme] = useState("");
  const [count, setCount] = useState(5);
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState([]);
  const [done, setDone] = useState(false);
  const [size, setSize] = useState("");

  const toggle = (id) => setFilters(p => p.includes(id) ? p.filter(f => f !== id) : [...p, id]);
  const toggleSave = (idea) => setSaved(p => p.find(s => s.titre === idea.titre) ? p.filter(s => s.titre !== idea.titre) : [...p, idea]);
  const isSaved = (idea) => saved.some(s => s.titre === idea.titre);

  const generate = async () => {
    setError("");
    setLoading(true);
    setDone(false);

    const types = filters.length ? filters.map(id => CATS.find(c => c.id === id)?.label).join(", ") : "dessin libre";
    const th = theme || "libre";

    try {
      const res = await fetch(`${API_URL}/api/generate-ideas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ types, level, theme: th, count }),
      });

      if (!res.ok) {
        throw new Error(`Erreur serveur: ${res.status}`);
      }

      const data = await res.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Erreur inconnue');
      }

      setIdeas(data.ideas);
      setDone(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#f5f0e8", backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 27px,#d4c9a8 27px,#d4c9a8 28px)", minHeight: "100vh", color: "#1a1209", paddingBottom: 60 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Mono&display=swap');
        .fb{background:transparent;border:1.5px solid #d4c9a8;color:#1a1209;font-family:'DM Mono',monospace;font-size:0.7rem;padding:7px 12px;cursor:pointer;border-radius:2px;transition:0.15s;display:flex;align-items:center;gap:5px}
        .fb:hover,.fb.on{background:#1a1209;color:#f5f0e8;border-color:#1a1209}
        .s{font-family:'DM Mono',monospace;font-size:0.7rem;border:1.5px solid #d4c9a8;border-radius:2px;padding:7px 26px 7px 9px;color:#1a1209;cursor:pointer;appearance:none;background:#f5f0e8 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%231a1209'/%3E%3C/svg%3E") no-repeat right 8px center}
        .s:focus{outline:none;border-color:#1a1209}
        .gb{background:#1a1209;color:#f5f0e8;border:none;font-family:'Playfair Display',serif;font-size:1.05rem;font-style:italic;padding:14px 44px;cursor:pointer;border-radius:2px;box-shadow:4px 4px 0 #d4c9a8;transition:0.15s}
        .gb:hover:not(:disabled){transform:translate(-2px,-2px);box-shadow:6px 6px 0 #d4c9a8}
        .gb:active:not(:disabled){transform:translate(2px,2px);box-shadow:2px 2px 0 #d4c9a8}
        .gb:disabled{opacity:0.5;cursor:not-allowed}
        .cd{background:#fffdf7;border:1px solid #d4c9a8;border-radius:2px;padding:18px 18px 42px;box-shadow:2px 2px 0 #d4c9a8;position:relative;transition:0.15s;animation:f 0.4s ease both}
        .cd:hover{transform:translate(-2px,-2px);box-shadow:4px 4px 0 #d4c9a8}
        @keyframes f{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .sp{display:inline-block;width:13px;height:13px;border:2px solid rgba(245,240,232,0.3);border-top-color:#f5f0e8;border-radius:50%;animation:r 0.7s linear infinite;vertical-align:middle;margin-right:8px}
        @keyframes r{to{transform:rotate(360deg)}}
        .pl{background:#e8dfc8;border:1px solid #d4c9a8;border-radius:2px;font-size:0.67rem;padding:5px 10px;display:flex;align-items:center;gap:7px;font-family:'DM Mono',monospace;animation:f 0.3s ease}
      `}</style>

      <div style={{ textAlign: "center", padding: "42px 20px 22px", borderBottom: "2px solid #d4c9a8", marginBottom: 26 }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.9rem,5vw,3rem)", fontWeight: 700, lineHeight: 1.1 }}>
            Générateur d'idées <em style={{ color: "#c0392b" }}>de dessin</em>
          </h1>
          <span style={{ position: "absolute", top: -4, right: -30, fontSize: "1.7rem", opacity: 0.18, transform: "rotate(25deg)" }}>✏️</span>
        </div>
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8b6914", marginTop: 9 }}>
          Trouve ton prochain sujet à croquer
        </p>
        <div style={{ width: 56, height: 2, background: "#c0392b", margin: "13px auto 0" }} />
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 20px" }}>
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#8b6914", marginBottom: 10 }}>
          Type de dessin
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 22 }}>
          {CATS.map(c => (
            <button key={c.id} className={`fb${filters.includes(c.id) ? " on" : ""}`} onClick={() => toggle(c.id)}>
              <span>{c.icon}</span><span>{c.label}</span>
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 18, marginBottom: 26 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.61rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#8b6914" }}>Niveau</label>
            <select className="s" value={level} onChange={e => setLevel(e.target.value)}>
              {["Tous", "Débutant", "Débutant avancé", "Intermédiaire", "Avancé", "Expert"].map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.61rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#8b6914" }}>Thème</label>
            <select className="s" value={theme} onChange={e => setTheme(e.target.value)}>
              <option value="">Tous</option>
              <option value="nature">Nature</option>
              <option value="urbain">Urbain</option>
              <option value="portrait">Portrait</option>
              <option value="animal">Animal</option>
              <option value="fantasy">Fantasy</option>
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.61rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#8b6914" }}>Nombre</label>
            <select className="s" value={count} onChange={e => setCount(+e.target.value)}>
              {[3, 5, 8].map(n => <option key={n} value={n}>{n} idées</option>)}
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
  <label style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.61rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#8b6914" }}>Format</label>
  <select className="s" value={size} onChange={e => setSize(e.target.value)}>
    <option value="">Tous formats</option>
    <option value="petit (A6, carnet)">Petit (A6, carnet)</option>
    <option value="moyen (A5, A4)">Moyen (A5, A4)</option>
    <option value="grand (A3, A2)">Grand (A3, A2)</option>
    <option value="très grand (toile, mural)">Très grand (toile, mural)</option>
    <option value="format carré">Format carré</option>
    <option value="format panoramique">Format panoramique</option>
    <option value="format portrait">Format portrait</option>
  </select>
</div>
        </div>

        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <button className="gb" onClick={generate} disabled={loading}>
            {loading && <span className="sp" />}
            {loading ? "Génération…" : "Inspirer-moi ✨"}
          </button>
        </div>

        {error && (
          <div style={{ background: "#fff5f5", border: "1px solid #f5c6c6", color: "#c0392b", fontFamily: "'DM Mono',monospace", fontSize: "0.72rem", padding: "11px 15px", borderRadius: 2, marginBottom: 18 }}>
            ❌ {error}
          </div>
        )}

        {!done && !loading && (
          <div style={{ textAlign: "center", padding: "46px 20px" }}>
            <div style={{ fontSize: "3rem", marginBottom: 12 }}>🎨</div>
            <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "#8b6914", opacity: 0.5 }}>
              Choisis un type et génère tes idées !
            </p>
          </div>
        )}

        {done && ideas.length > 0 && (
          <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 11, borderBottom: "1px solid #d4c9a8", marginBottom: 16 }}>
            <span style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "#8b6914", fontSize: "0.93rem" }}>
              {ideas.length} idées
            </span>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem", letterSpacing: "0.1em", color: "#8b6914", textTransform: "uppercase" }}>
              ♡ sauvegarder
            </span>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 14, marginBottom: 38 }}>
          {ideas.map((idea, i) => {
            const cat = CATS.find(c => c.label.toLowerCase() === idea.type?.toLowerCase());
            const s = isSaved(idea);
            return (
              <div key={i} className="cd" style={{ animationDelay: `${i * 0.07}s` }}>
                <span style={{ position: "absolute", top: 11, right: 13, fontSize: "1.1rem", opacity: 0.13 }}>
                  {cat?.icon || "🎨"}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 8 }}>
                  <span style={{ display: "inline-block", width: 14, height: 1, background: "#c0392b" }} />
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.59rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#c0392b" }}>
                    {idea.type}
                  </span>
                </div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontWeight: 700, lineHeight: 1.3, marginBottom: 8 }}>
                  {idea.titre}
                </div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.69rem", lineHeight: 1.65, color: "#4a3e2e", marginBottom: 11 }}>
                  {idea.description}
                </div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.63rem", color: "#8b6914", borderTop: "1px dashed #d4c9a8", paddingTop: 8, lineHeight: 1.6, fontStyle: "italic" }}>
                  <strong style={{ fontStyle: "normal" }}>Conseil → </strong>{idea.conseil}
                </div>
                <button
                  onClick={() => toggleSave(idea)}
                  style={{ position: "absolute", bottom: 11, right: 11, background: "none", border: "none", cursor: "pointer", fontSize: "1.1rem", padding: 0, color: s ? "#c0392b" : "#1a1209", opacity: s ? 1 : 0.22, transition: "0.15s" }}
                  onMouseOver={e => e.currentTarget.style.transform = "scale(1.3)"}
                  onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
                >
                  {s ? "♥" : "♡"}
                </button>
              </div>
            );
          })}
        </div>

        {saved.length > 0 && (
          <div style={{ borderTop: "1px solid #d4c9a8", paddingTop: 22 }}>
            <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "0.97rem", color: "#8b6914", marginBottom: 11 }}>
              ✦ Sauvegardées
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {saved.map((idea, i) => (
                <div key={i} className="pl">
                  <span>🎨 {idea.titre}</span>
                  <button onClick={() => setSaved(p => p.filter((_, j) => j !== i))} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.73rem", opacity: 0.4, padding: 0 }}>
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
