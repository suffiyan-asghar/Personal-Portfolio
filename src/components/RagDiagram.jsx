// The Football RAG pipeline, drawn in code. A yellow pulse runs along each
// connector in turn, stage by stage. Reduced motion hides the pulses.
// Two layouts: a row on wide screens, a column on narrow ones.

const NODE_H = 44;

const WIDE = {
  w: 1000,
  h: 220,
  nodes: [
    { id: 'query', label: 'Query', cx: 60, cy: 110, w: 100 },
    { id: 'dense', label: 'Dense retrieval', cx: 240, cy: 60, w: 150 },
    { id: 'bm25', label: 'BM25 retrieval', cx: 240, cy: 160, w: 150 },
    { id: 'rerank', label: 'Cross-encoder re-rank', cx: 450, cy: 110, w: 190 },
    { id: 'mmr', label: 'MMR', cx: 640, cy: 110, w: 100 },
    { id: 'llm', label: 'Llama 3.1', cx: 790, cy: 110, w: 120 },
    { id: 'answer', label: 'Answer', cx: 935, cy: 110, w: 100, accent: true },
  ],
  edges: [
    [110, 110, 165, 60, 0],
    [110, 110, 165, 160, 0],
    [315, 60, 355, 110, 1],
    [315, 160, 355, 110, 1],
    [545, 110, 590, 110, 2],
    [690, 110, 730, 110, 3],
    [850, 110, 885, 110, 4],
  ],
};

const TALL = {
  w: 360,
  h: 570,
  nodes: [
    { id: 'query', label: 'Query', cx: 180, cy: 40, w: 140 },
    { id: 'dense', label: 'Dense retrieval', cx: 95, cy: 140, w: 150 },
    { id: 'bm25', label: 'BM25 retrieval', cx: 265, cy: 140, w: 150 },
    { id: 'rerank', label: 'Cross-encoder re-rank', cx: 180, cy: 240, w: 220 },
    { id: 'mmr', label: 'MMR', cx: 180, cy: 335, w: 140 },
    { id: 'llm', label: 'Llama 3.1', cx: 180, cy: 430, w: 140 },
    { id: 'answer', label: 'Answer', cx: 180, cy: 525, w: 140, accent: true },
  ],
  edges: [
    [180, 62, 95, 118, 0],
    [180, 62, 265, 118, 0],
    [95, 162, 180, 218, 1],
    [265, 162, 180, 218, 1],
    [180, 262, 180, 313, 2],
    [180, 357, 180, 408, 3],
    [180, 452, 180, 503, 4],
  ],
};

const STAGE_GAP = 0.8; // seconds between stages; the full cycle is 5 stages × 0.8s

function Pipeline({ layout, className, markerId }) {
  return (
    <svg className={`rag-svg ${className}`} viewBox={`0 0 ${layout.w} ${layout.h}`} aria-hidden="true">
      <defs>
        <marker id={markerId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 10 5 0 10z" fill="rgba(255,255,255,0.45)" />
        </marker>
      </defs>
      {layout.edges.map(([x1, y1, x2, y2], i) => (
        <line key={`e${i}`} className="rag-edge" x1={x1} y1={y1} x2={x2} y2={y2} markerEnd={`url(#${markerId})`} />
      ))}
      {layout.nodes.map((n) => (
        <g key={n.id} className={`rag-node ${n.accent ? 'is-accent' : ''}`}>
          <rect x={n.cx - n.w / 2} y={n.cy - NODE_H / 2} width={n.w} height={NODE_H} rx="12" />
          <text x={n.cx} y={n.cy} dy="0.35em" textAnchor="middle">
            {n.label}
          </text>
        </g>
      ))}
      {layout.edges.map(([x1, y1, x2, y2, stage], i) => (
        <g
          key={`p${i}`}
          className="rag-pulse"
          style={{ '--dx': `${x2 - x1}px`, '--dy': `${y2 - y1}px`, animationDelay: `${stage * STAGE_GAP}s` }}
        >
          <circle cx={x1} cy={y1} r="9" className="rag-pulse-halo" />
          <circle cx={x1} cy={y1} r="4" className="rag-pulse-core" />
        </g>
      ))}
    </svg>
  );
}

export default function RagDiagram() {
  return (
    <figure className="rag">
      <figcaption className="rag-caption">How a question moves through the pipeline</figcaption>
      <p className="visually-hidden">
        The query goes to dense retrieval and BM25 retrieval in parallel. Their results are re-ranked by a cross-encoder,
        diversified with MMR, and passed to Llama 3.1, which writes the answer.
      </p>
      <Pipeline layout={WIDE} className="rag-wide" markerId="rag-arrow-wide" />
      <Pipeline layout={TALL} className="rag-tall" markerId="rag-arrow-tall" />
    </figure>
  );
}
