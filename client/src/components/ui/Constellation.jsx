// 5-pointed star constellation
// Outer R=85, inner r=32 — center (160, 115)
function starPoints(cx, cy, R, r, points = 5) {
    const pts = [];
    for (let i = 0; i < points * 2; i++) {
        const angle = (Math.PI / points) * i - Math.PI / 2;
        const rad = i % 2 === 0 ? R : r;
        pts.push({ x: cx + rad * Math.cos(angle), y: cy + rad * Math.sin(angle) });
    }
    return pts;
}

export default function Constellation() {
    // 10 alternating points: 0,2,4,6,8 = outer tips; 1,3,5,7,9 = inner vertices
    const pts = starPoints(160, 108, 85, 33);

    // Draw edges in order around the star outline
    const edges = pts.map((_, i) => [i, (i + 1) % pts.length]);

    const outerIdx = [0, 2, 4, 6, 8];
    const innerIdx = [1, 3, 5, 7, 9];

    return (
        <div className="constellation-wrap w-full select-none">
            <svg width="320" height="230" viewBox="0 0 320 230" aria-label="Star constellation">
                {/* Star outline edges */}
                {edges.map(([a, b], i) => (
                    <line
                        key={i}
                        x1={pts[a].x} y1={pts[a].y}
                        x2={pts[b].x} y2={pts[b].y}
                        stroke="rgba(139,144,160,0.30)"
                        strokeWidth="1"
                    />
                ))}

                {/* Inner vertex dots (smaller) */}
                {innerIdx.map((i) => (
                    <g key={i}>
                        <circle cx={pts[i].x} cy={pts[i].y} r={6} fill="rgba(249,115,22,0.07)" />
                        <circle cx={pts[i].x} cy={pts[i].y} r={2.2} fill="rgba(249,115,22,0.55)" />
                        <circle cx={pts[i].x} cy={pts[i].y} r={1} fill="white" />
                    </g>
                ))}

                {/* Outer tip dots (larger, brighter) */}
                {outerIdx.map((i) => (
                    <g key={i}>
                        <circle cx={pts[i].x} cy={pts[i].y} r={12} fill="rgba(249,115,22,0.08)" />
                        <circle cx={pts[i].x} cy={pts[i].y} r={5} fill="rgba(249,115,22,0.22)" />
                        <circle cx={pts[i].x} cy={pts[i].y} r={3} fill="rgba(249,115,22,0.85)" />
                        <circle cx={pts[i].x} cy={pts[i].y} r={1.2} fill="white" />
                    </g>
                ))}
            </svg>

            <div className="text-center space-y-1.5">
                <p className="font-display font-bold text-sm text-[var(--silver)] tracking-[0.28em] uppercase">
                    No Missions Logged
                </p>
                <p className="text-[10px] text-[var(--silver-dim)] tracking-[0.2em] font-mono uppercase">
                    ◈ Awaiting mission brief
                </p>
            </div>
        </div>
    );
}
