"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import {
  Search,
  X,
  ChevronRight,
  AlertCircle,
  Stethoscope,
  BookOpen,
  Activity,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Eye,
  List,
} from "lucide-react";
import {
  STRUCTURES,
  SYSTEMES,
  getBySysteme,
  search as searchData,
  REGIONS_LABELS,
} from "../data/BodyMapData.js";
import "./BodyMap.css";

/* ─────────────────────────────────────
   Constantes SVG — Viewbox et calculs
────────────────────────────────────── */
const VW = 200;
const VH = 520;
const CENTER_X = 100; // Centre de symétrie

const toSVG = (xPct, yPct) => ({
  cx: (xPct / 100) * VW,
  cy: (yPct / 100) * VH,
});

/* ─────────────────────────────────────
   Coordonnées POSTÉRIEURES (dos)
   Définies précisément pour chaque structure
────────────────────────────────────── */
const BACK_COORDS = {
  // Tête & Cou
  crane: { x: 50, y: 4 },
  cervelet: { x: 50, y: 7 },
  "rachis-cervical": { x: 50, y: 11 },
  vestibule: { x: 40, y: 6 },
  "plexus-brachial": { x: 38, y: 12.5 },
  trapeze: { x: 38, y: 14 },
  sternocleidomastoidien: { x: 45, y: 10.5 },

  // Épaule & Bras
  clavicule: { x: 35, y: 12.5 },
  "epaule-articulation": { x: 28, y: 17 },
  coiffe: { x: 30, y: 16 },
  deltoid: { x: 30, y: 14 },
  scapula: { x: 36, y: 19 },
  humerus: { x: 26, y: 26 },
  biceps: { x: 27, y: 28 },
  triceps: { x: 27, y: 30 },
  coude: { x: 27, y: 32 },

  // Avant-bras & Main
  "radius-ulna": { x: 24, y: 38 },
  poignet: { x: 23, y: 45 },
  "main-carpe": { x: 21, y: 48 },

  // Thorax & Dos
  cotes: { x: 38, y: 22 },
  "rachis-dorsal": { x: 50, y: 25 },
  diaphragme: { x: 50, y: 29 },
  "moelle-epiniere": { x: 50, y: 28 },
  "disques-intervertebraux": { x: 50, y: 32 },
  "rachis-lombaire": { x: 50, y: 36 },
  reins: { x: 42, y: 35 },
  aorte: { x: 50, y: 27 },
  "canal-thoracique": { x: 48, y: 25 },
  "plancher-pelvien": { x: 50, y: 46 },

  // Bassin & Hanche
  "sacrum-ilium": { x: 50, y: 43 },
  "sacro-iliaque": { x: 42, y: 44 },
  fessiers: { x: 35, y: 40 },
  hanche: { x: 31, y: 45 },

  // Cuisse
  femur: { x: 35, y: 55 },
  "ischio-jambiers": { x: 36, y: 60 },
  "nerf-sciatique": { x: 38, y: 54 },

  // Genou
  genou: { x: 35, y: 66 },
  lca: { x: 36, y: 67 },
  menisques: { x: 37, y: 67.5 },

  // Jambe & Pied
  "tibia-fibula": { x: 35, y: 77 },
  "soleo-gastrocnemien": { x: 36, y: 79 },
  "tendon-achille": { x: 36, y: 86 },
  cheville: { x: 35, y: 87 },
  "ligaments-cheville": { x: 33, y: 88 },
  "pied-tarse": { x: 35, y: 92 },
  peroniers: { x: 30, y: 80 },

  // Veineux
  "reseau-veineux-mi": { x: 34, y: 76 },
};

/* ─────────────────────────────────────
   Clustering pour regrouper les points proches
────────────────────────────────────── */
const CLUSTER_THRESHOLD = 7;

function buildClusters(structures, zoom) {
  const threshold = CLUSTER_THRESHOLD / zoom;
  const pts = structures.map((s) => {
    const { cx, cy } = toSVG(s.x, s.y);
    return { ...s, cx, cy };
  });
  const assigned = new Array(pts.length).fill(false);
  const result = [];

  for (let i = 0; i < pts.length; i++) {
    if (assigned[i]) continue;
    const cluster = [pts[i]];
    assigned[i] = true;

    for (let j = i + 1; j < pts.length; j++) {
      if (assigned[j]) continue;
      const dx = pts[j].cx - pts[i].cx;
      const dy = pts[j].cy - pts[i].cy;
      if (Math.sqrt(dx * dx + dy * dy) < threshold) {
        cluster.push(pts[j]);
        assigned[j] = true;
      }
    }

    const cx = cluster.reduce((s, p) => s + p.cx, 0) / cluster.length;
    const cy = cluster.reduce((s, p) => s + p.cy, 0) / cluster.length;
    result.push({ items: cluster, cx, cy });
  }

  return result;
}

/* ═══════════════════════════════════════════════════════════════════════════
   SILHOUETTE ANTÉRIEURE — Symétrie parfaite gauche/droite
   Toutes les formes sont définies à gauche (x < 100) puis miroir SVG
═══════════════════════════════════════════════════════════════════════════ */
function SilhouetteAnterior() {
  return (
    <g className="bm-silhouette">
      <defs>
        {/* ══ DEMI-CORPS GAUCHE ══ */}
        <g id="ant-half">
          {/* TÊTE */}
          <path d="M100 3 Q85 3 80 12 Q77 20 78 28 Q80 36 85 42 L100 44 L100 3 Z" />
          <ellipse
            cx="90"
            cy="20"
            rx="5"
            ry="4"
            className="bm-silhouette-inner"
          />
          <path
            d="M78 18 Q75 20 75 25 Q75 28 78 30"
            fill="none"
            stroke="var(--bm-sil2)"
            strokeWidth="0.6"
          />

          {/* COU */}
          <path d="M90 44 Q88 50 88 56 L100 58 L100 44 Z" />

          {/* CLAVICULE */}
          <path
            d="M92 58 Q85 58 75 64 Q70 67 68 70"
            fill="none"
            stroke="var(--bm-border2)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* TRONC */}
          <path d="M68 70 Q64 76 62 88 L60 120 Q60 140 65 160 Q70 175 80 182 L100 187 L100 58 L92 58 Q88 60 68 70 Z" />

          {/* CÔTES */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const y = 74 + i * 11;
            const spread = 14 + i * 3;
            return (
              <path
                key={`rib-${i}`}
                d={`M100 ${y} Q${100 - spread * 0.5} ${y + 2} ${100 - spread} ${y + i * 2 + 4}`}
                fill="none"
                stroke="var(--bm-sil2)"
                strokeWidth="0.8"
              />
            );
          })}

          {/* ÉPAULE */}
          <path
            d="M62 70 Q55 73 52 80 Q50 88 54 94 Q58 97 64 95"
            className="bm-silhouette-inner"
          />
          <ellipse
            cx="58"
            cy="72"
            rx="6"
            ry="4"
            className="bm-silhouette-inner"
          />

          {/* BRAS */}
          <path d="M54 95 Q50 105 48 125 Q46 145 50 158 L58 160 Q62 145 62 125 Q63 105 60 95 Z" />
          <path
            d="M52 100 Q50 115 51 130"
            fill="none"
            stroke="var(--bm-sil2)"
            strokeWidth="0.6"
          />

          {/* COUDE */}
          <ellipse
            cx="54"
            cy="166"
            rx="6"
            ry="5"
            className="bm-silhouette-inner"
          />

          {/* AVANT-BRAS */}
          <path d="M46 172 Q43 190 42 210 Q41 225 45 232 L55 232 Q57 220 56 200 Q56 185 54 172 Z" />

          {/* POIGNET */}
          <path
            d="M42 230 Q41 236 42 242 L56 242 Q57 236 56 230 Z"
            className="bm-silhouette-inner"
          />

          {/* MAIN */}
          <path d="M40 240 Q38 250 39 258 Q40 264 46 266 Q52 268 56 264 Q58 258 57 248 L55 242 Z" />
          {[0, 1, 2, 3].map((i) => (
            <path
              key={`finger-${i}`}
              d={`M${43 + i * 4} ${250 + i} Q${44 + i * 4} ${260} ${45 + i * 4} ${264 - i}`}
              fill="none"
              stroke="var(--bm-sil2)"
              strokeWidth="0.4"
            />
          ))}

          {/* BASSIN */}
          <path d="M72 182 Q64 186 58 195 Q55 208 60 222 Q66 234 100 240 L100 187 Q90 186 80 182 Z" />
          <path
            d="M65 188 Q62 194 62 204 Q64 212 72 216"
            fill="none"
            stroke="var(--bm-border2)"
            strokeWidth="1"
          />
          <ellipse
            cx="70"
            cy="192"
            rx="3"
            ry="2.5"
            className="bm-silhouette-inner"
          />

          {/* CUISSE */}
          <path d="M62 228 Q59 250 58 280 Q57 305 61 325 L77 328 Q81 305 82 280 Q82 255 80 238 Z" />
          <path
            d="M66 240 Q64 270 65 300"
            fill="none"
            stroke="var(--bm-sil2)"
            strokeWidth="0.6"
          />
          <ellipse
            cx="62"
            cy="232"
            rx="4"
            ry="3"
            className="bm-silhouette-inner"
          />

          {/* GENOU */}
          <path
            d="M59 325 Q57 335 59 345 Q62 352 71 354 Q80 352 82 345 Q84 335 82 325 Z"
            className="bm-silhouette-inner"
          />
          <ellipse
            cx="70"
            cy="338"
            rx="7"
            ry="6"
            className="bm-silhouette-inner"
          />
          <path
            d="M67 343 Q70 346 73 343"
            fill="none"
            stroke="var(--bm-sil2)"
            strokeWidth="0.5"
          />

          {/* JAMBE */}
          <path d="M59 354 Q56 380 56 410 Q56 430 62 444 L78 444 Q82 430 82 410 Q82 380 80 354 Z" />
          <line
            x1="69"
            y1="360"
            x2="69"
            y2="440"
            stroke="var(--bm-border2)"
            strokeWidth="0.8"
          />
          <path
            d="M63 365 Q61 390 62 420"
            fill="none"
            stroke="var(--bm-sil2)"
            strokeWidth="0.5"
          />

          {/* CHEVILLE */}
          <path
            d="M58 442 Q56 450 58 456 L80 456 Q82 450 80 442 Z"
            className="bm-silhouette-inner"
          />
          <ellipse
            cx="60"
            cy="450"
            rx="3.5"
            ry="3"
            className="bm-silhouette-inner"
          />
          <ellipse
            cx="78"
            cy="450"
            rx="3.5"
            ry="3"
            className="bm-silhouette-inner"
          />

          {/* PIED */}
          <path d="M56 454 Q53 465 53 475 Q54 482 60 484 Q70 486 78 484 Q82 480 82 474 L80 454 Z" />
          {[0, 1, 2, 3].map((i) => (
            <path
              key={`toe-${i}`}
              d={`M${58 + i * 5} ${464} Q${60 + i * 5} ${474} ${64 + i * 4} ${480}`}
              fill="none"
              stroke="var(--bm-sil2)"
              strokeWidth="0.4"
            />
          ))}
        </g>
      </defs>

      {/* Demi gauche */}
      <use href="#ant-half" />

      {/* Demi droit (miroir parfait) */}
      <use href="#ant-half" transform={`scale(-1, 1) translate(-${VW}, 0)`} />

      {/* ══ ÉLÉMENTS CENTRAUX (colonne vertébrale) ══ */}
      <line
        x1="100"
        y1="58"
        x2="100"
        y2="186"
        stroke="var(--bm-border2)"
        strokeWidth="1"
      />
      {[66, 76, 86, 96, 106, 116, 126, 136, 146, 156, 166, 176, 184].map(
        (y, i) => (
          <ellipse
            key={`vert-${i}`}
            cx="100"
            cy={y}
            rx={i < 8 ? 3 : 3.5}
            ry="2.2"
            fill="none"
            stroke="var(--bm-sil2)"
            strokeWidth="0.5"
            opacity="0.6"
          />
        ),
      )}

      {/* Nombril */}
      <ellipse
        cx="100"
        cy="170"
        rx="2.5"
        ry="2"
        className="bm-silhouette-inner"
        opacity="0.6"
      />

      {/* Sternum */}
      <path
        d="M97 62 L95 72 Q100 74 105 72 L103 62 Z"
        className="bm-silhouette-inner"
      />

      {/* Pubis */}
      <path
        d="M90 236 Q95 240 100 240 Q105 240 110 236"
        fill="none"
        stroke="var(--bm-border2)"
        strokeWidth="0.8"
      />
    </g>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SILHOUETTE POSTÉRIEURE — Symétrie parfaite gauche/droite
   Vue de dos avec détails anatomiques (scapulas, colonne, fessiers)
═══════════════════════════════════════════════════════════════════════════ */
function SilhouettePosterior() {
  return (
    <g className="bm-silhouette">
      <defs>
        {/* ══ DEMI-CORPS GAUCHE (DOS) ══ */}
        <g id="post-half">
          {/* TÊTE (vue arrière) */}
          <path d="M100 3 Q85 3 80 12 Q77 20 78 28 Q80 36 85 42 L100 44 L100 3 Z" />
          <path
            d="M85 30 Q92 34 100 35"
            fill="none"
            stroke="var(--bm-sil2)"
            strokeWidth="0.6"
          />
          <ellipse
            cx="100"
            cy="38"
            rx="4"
            ry="2"
            className="bm-silhouette-inner"
            opacity="0.5"
          />
          <path
            d="M78 18 Q75 20 75 25 Q75 28 78 30"
            fill="none"
            stroke="var(--bm-sil2)"
            strokeWidth="0.6"
          />

          {/* COU */}
          <path d="M90 44 Q88 50 88 56 L100 58 L100 44 Z" />
          <ellipse
            cx="100"
            cy="56"
            rx="3"
            ry="2"
            className="bm-silhouette-inner"
          />

          {/* TRAPÈZE */}
          <path
            d="M92 58 Q85 58 75 64 Q70 67 68 70"
            fill="none"
            stroke="var(--bm-border2)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* TRONC (dos) */}
          <path d="M68 70 Q64 76 62 88 L60 120 Q60 140 65 160 Q70 175 80 182 L100 187 L100 58 L92 58 Q88 60 68 70 Z" />

          {/* SCAPULA (omoplate) */}
          <path
            d="M66 78 Q64 85 64 98 Q65 110 72 118 Q80 124 88 118 Q92 110 90 95 Q88 82 80 76 Q72 74 66 78 Z"
            className="bm-silhouette-inner"
          />
          <path
            d="M66 80 Q75 82 86 88"
            fill="none"
            stroke="var(--bm-border2)"
            strokeWidth="1"
          />
          <path
            d="M88 90 Q88 105 86 116"
            fill="none"
            stroke="var(--bm-border2)"
            strokeWidth="0.7"
          />
          <ellipse
            cx="82"
            cy="118"
            rx="3"
            ry="2.5"
            className="bm-silhouette-inner"
          />

          {/* CÔTES POSTÉRIEURES */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const y = 82 + i * 11;
            const spread = 12 + i * 2.5;
            return (
              <path
                key={`rib-back-${i}`}
                d={`M97 ${y} Q${97 - spread * 0.5} ${y + 1} ${97 - spread} ${y - i + 5}`}
                fill="none"
                stroke="var(--bm-sil2)"
                strokeWidth="0.7"
              />
            );
          })}

          {/* ÉPAULE */}
          <path
            d="M62 70 Q55 73 52 80 Q50 88 54 94 Q58 97 64 95"
            className="bm-silhouette-inner"
          />
          <ellipse
            cx="58"
            cy="72"
            rx="6"
            ry="4"
            className="bm-silhouette-inner"
          />

          {/* BRAS (triceps) */}
          <path d="M54 95 Q50 105 48 125 Q46 145 50 158 L58 160 Q62 145 62 125 Q63 105 60 95 Z" />
          <path
            d="M50 100 Q49 115 50 135 Q52 150 55 158"
            fill="none"
            stroke="var(--bm-sil2)"
            strokeWidth="0.6"
          />
          <path
            d="M56 98 Q56 115 56 135 Q55 150 54 158"
            fill="none"
            stroke="var(--bm-sil2)"
            strokeWidth="0.5"
          />

          {/* COUDE */}
          <ellipse
            cx="54"
            cy="166"
            rx="6"
            ry="5"
            className="bm-silhouette-inner"
          />
          <ellipse
            cx="54"
            cy="165"
            rx="4"
            ry="3.5"
            className="bm-silhouette-inner"
          />

          {/* AVANT-BRAS */}
          <path d="M46 172 Q43 190 42 210 Q41 225 45 232 L55 232 Q57 220 56 200 Q56 185 54 172 Z" />
          <path
            d="M48 178 Q47 200 48 220"
            fill="none"
            stroke="var(--bm-sil2)"
            strokeWidth="0.5"
            strokeDasharray="2 2"
          />

          {/* POIGNET */}
          <path
            d="M42 230 Q41 236 42 242 L56 242 Q57 236 56 230 Z"
            className="bm-silhouette-inner"
          />

          {/* MAIN */}
          <path d="M40 240 Q38 250 39 258 Q40 264 46 266 Q52 268 56 264 Q58 258 57 248 L55 242 Z" />
          {[0, 1, 2, 3].map((i) => (
            <path
              key={`finger-back-${i}`}
              d={`M${42 + i * 4} ${248} L${43 + i * 4} ${264}`}
              fill="none"
              stroke="var(--bm-sil2)"
              strokeWidth="0.4"
            />
          ))}

          {/* BASSIN / FESSIERS */}
          <path d="M72 182 Q64 186 58 195 Q55 208 60 222 Q66 234 100 240 L100 187 Q90 186 80 182 Z" />
          <path
            d="M65 188 Q62 194 62 204 Q64 212 72 216"
            fill="none"
            stroke="var(--bm-border2)"
            strokeWidth="1"
          />
          <ellipse
            cx="88"
            cy="192"
            rx="3"
            ry="2.5"
            className="bm-silhouette-inner"
          />

          {/* Sillon inter-fessier suggéré */}
          <path
            d="M63 202 Q70 225 90 238"
            fill="none"
            stroke="var(--bm-sil2)"
            strokeWidth="0.6"
            strokeDasharray="3 2"
          />

          {/* CUISSE (ischio-jambiers) */}
          <path d="M62 228 Q59 250 58 280 Q57 305 61 325 L77 328 Q81 305 82 280 Q82 255 80 238 Z" />
          <path
            d="M66 238 Q64 270 65 300 Q67 315 70 325"
            fill="none"
            stroke="var(--bm-sil2)"
            strokeWidth="0.6"
          />
          <ellipse
            cx="62"
            cy="232"
            rx="4"
            ry="3"
            className="bm-silhouette-inner"
          />

          {/* GENOU (creux poplité) */}
          <path
            d="M59 325 Q57 335 59 345 Q62 352 71 354 Q80 352 82 345 Q84 335 82 325 Z"
            className="bm-silhouette-inner"
          />
          <path
            d="M62 330 Q62 338 65 344 Q68 350 70 352"
            fill="none"
            stroke="var(--bm-sil2)"
            strokeWidth="0.5"
          />
          <ellipse
            cx="64"
            cy="332"
            rx="3.5"
            ry="3"
            className="bm-silhouette-inner"
          />

          {/* JAMBE (mollet) */}
          <path d="M59 354 Q56 380 56 410 Q56 430 62 444 L78 444 Q82 430 82 410 Q82 380 80 354 Z" />
          <path
            d="M63 360 Q61 385 62 415 Q64 435 68 444"
            fill="none"
            stroke="var(--bm-sil2)"
            strokeWidth="0.7"
          />
          <path
            d="M74 358 Q75 385 74 415 Q72 435 70 444"
            fill="none"
            stroke="var(--bm-sil2)"
            strokeWidth="0.6"
          />
          <path
            d="M68 362 L68 440"
            fill="none"
            stroke="var(--bm-border2)"
            strokeWidth="0.5"
            strokeDasharray="2 2"
          />

          {/* Tendon d'Achille */}
          <path
            d="M66 432 Q68 440 68 450"
            fill="none"
            stroke="var(--bm-border2)"
            strokeWidth="1"
          />

          {/* CHEVILLE */}
          <path
            d="M58 442 Q56 450 58 456 L80 456 Q82 450 80 442 Z"
            className="bm-silhouette-inner"
          />
          <ellipse
            cx="60"
            cy="450"
            rx="4"
            ry="3.5"
            className="bm-silhouette-inner"
          />
          <ellipse
            cx="78"
            cy="450"
            rx="4"
            ry="3.5"
            className="bm-silhouette-inner"
          />

          {/* PIED (talon) */}
          <path d="M56 454 Q52 465 52 475 Q53 482 58 484 Q68 487 78 484 Q84 480 84 474 L80 454 Z" />
          <ellipse
            cx="68"
            cy="476"
            rx="9"
            ry="7"
            className="bm-silhouette-inner"
          />
        </g>
      </defs>

      {/* Demi gauche */}
      <use href="#post-half" />

      {/* Demi droit (miroir parfait) */}
      <use href="#post-half" transform={`scale(-1, 1) translate(-${VW}, 0)`} />

      {/* ══ COLONNE VERTÉBRALE (centrale) ══ */}
      <path d="M96 60 L94 186" stroke="var(--bm-sil2)" strokeWidth="0.5" />
      <path d="M104 60 L106 186" stroke="var(--bm-sil2)" strokeWidth="0.5" />

      {[62, 72, 82, 92, 102, 112, 122, 132, 142, 152, 162, 172, 182].map(
        (y, i) => (
          <ellipse
            key={`vert-back-${i}`}
            cx="100"
            cy={y}
            rx={i > 7 ? 4 : 3}
            ry="2.5"
            className="bm-silhouette-inner"
            opacity="0.7"
          />
        ),
      )}

      {/* Sacrum */}
      <path
        d="M88 188 Q92 195 100 198 Q108 195 112 188"
        fill="none"
        stroke="var(--bm-border2)"
        strokeWidth="0.7"
      />
      <path
        d="M90 198 Q95 204 100 206 Q105 204 110 198"
        fill="none"
        stroke="var(--bm-border2)"
        strokeWidth="0.6"
      />
      <path
        d="M92 206 Q96 210 100 211 Q104 210 108 206"
        fill="none"
        stroke="var(--bm-border2)"
        strokeWidth="0.5"
      />
    </g>
  );
}

/* ─────────────────────────────────────
   Épingle individuelle
────────────────────────────────────── */
function SinglePoint({ structure, couleur, isActive, onClick, zoom }) {
  const { cx, cy } = toSVG(structure.x, structure.y);
  const rX = Math.max(4, 6.5 / zoom);
  const rY = Math.max(3, 5 / zoom);
  const tip = Math.max(3, 5 / zoom);
  const bx = cx;
  const by = cy - rY - tip;

  return (
    <g
      className={`bm-point${isActive ? " bm-point--active" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick(structure);
      }}
      role="button"
      tabIndex={0}
      aria-label={structure.nom}
      onKeyDown={(e) => e.key === "Enter" && onClick(structure)}
      style={{ cursor: "pointer" }}
    >
      {isActive && (
        <ellipse
          cx={bx}
          cy={by}
          rx={rX + 5 / zoom}
          ry={rY + 5 / zoom}
          fill={couleur}
          opacity="0.18"
          className="bm-point__halo"
        />
      )}
      <ellipse
        cx={cx}
        cy={cy + 0.5 / zoom}
        rx={rX * 0.5}
        ry={0.9 / zoom}
        fill="rgba(0,0,0,0.18)"
      />
      <path
        d={`M ${bx - rX * 0.4} ${by + rY * 0.6} L ${cx} ${cy} L ${bx + rX * 0.4} ${by + rY * 0.6} Z`}
        fill={couleur}
      />
      <ellipse
        cx={bx}
        cy={by}
        rx={rX}
        ry={rY}
        fill={isActive ? couleur : "#fff"}
        stroke={couleur}
        strokeWidth={1 / zoom}
      />
      <ellipse
        cx={bx - rX * 0.3}
        cy={by - rY * 0.3}
        rx={rX * 0.3}
        ry={rY * 0.28}
        fill={isActive ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.65)"}
        style={{ pointerEvents: "none" }}
      />
      {isActive && (
        <ellipse
          cx={bx}
          cy={by}
          rx={rX * 0.32}
          ry={rY * 0.32}
          fill="rgba(255,255,255,0.6)"
          style={{ pointerEvents: "none" }}
        />
      )}
    </g>
  );
}

/* ─────────────────────────────────────
   Épingle cluster
────────────────────────────────────── */
function ClusterPin({ cluster, selectedId, onOpenPopup, zoom }) {
  const { cx, cy, items } = cluster;
  const count = items.length;
  const hasActive = items.some((s) => s.id === selectedId);
  const sysCount = {};
  items.forEach((s) => {
    sysCount[s.systeme] = (sysCount[s.systeme] || 0) + 1;
  });
  const dominantSys = Object.entries(sysCount).sort(
    (a, b) => b[1] - a[1],
  )[0][0];
  const couleur = SYSTEMES[dominantSys]?.couleur || "#555";
  const rX = Math.max(5, 8 / zoom);
  const rY = Math.max(3.5, 6 / zoom);
  const tip = Math.max(3, 5 / zoom);
  const fs = Math.max(3.5, 5.5 / zoom);
  const bx = cx;
  const by = cy - rY - tip;
  const uniqueSys = [...new Set(items.map((s) => s.systeme))];
  const couleur2 =
    uniqueSys.length > 1 ? SYSTEMES[uniqueSys[1]]?.couleur : null;

  return (
    <g
      className={`bm-cluster${hasActive ? " bm-cluster--active" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        onOpenPopup(cluster);
      }}
      role="button"
      tabIndex={0}
      aria-label={`${count} structures — cliquer pour choisir`}
      onKeyDown={(e) => e.key === "Enter" && onOpenPopup(cluster)}
      style={{ cursor: "pointer" }}
    >
      {hasActive && (
        <ellipse
          cx={bx}
          cy={by}
          rx={rX + 6 / zoom}
          ry={rY + 6 / zoom}
          fill={couleur}
          opacity="0.15"
          className="bm-point__halo"
        />
      )}
      <ellipse
        cx={cx}
        cy={cy + 0.6 / zoom}
        rx={rX * 0.55}
        ry={1.1 / zoom}
        fill="rgba(0,0,0,0.2)"
      />
      <path
        d={`M ${bx - rX * 0.42} ${by + rY * 0.62} L ${cx} ${cy} L ${bx + rX * 0.42} ${by + rY * 0.62} Z`}
        fill={couleur}
      />
      <ellipse
        cx={bx}
        cy={by}
        rx={rX}
        ry={rY}
        fill={couleur}
        stroke={hasActive ? "#fff" : "rgba(255,255,255,0.5)"}
        strokeWidth={hasActive ? 1.2 / zoom : 0.6 / zoom}
      />
      {couleur2 && (
        <path
          d={`M ${bx} ${by - rY} A ${rX} ${rY} 0 0 1 ${bx} ${by + rY} Z`}
          fill={couleur2}
          opacity="0.7"
          style={{ pointerEvents: "none" }}
        />
      )}
      <ellipse
        cx={bx - rX * 0.3}
        cy={by - rY * 0.32}
        rx={rX * 0.3}
        ry={rY * 0.28}
        fill="rgba(255,255,255,0.3)"
        style={{ pointerEvents: "none" }}
      />
      <text
        x={bx}
        y={by + fs * 0.38}
        textAnchor="middle"
        fontSize={fs}
        fontWeight="700"
        fill="#fff"
        fontFamily="system-ui, sans-serif"
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        {count}
      </text>
    </g>
  );
}

/* ─────────────────────────────────────
   Composant principal
────────────────────────────────────── */
const ZOOM_MIN = 1;
const ZOOM_MAX = 4;
const ZOOM_STEP = 0.4;

export default function BodyMap() {
  const [selectedId, setSelectedId] = useState(null);
  const [activeSysteme, setActiveSysteme] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [view, setView] = useState("face");
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0, px: 0, py: 0 });
  const [openCluster, setOpenCluster] = useState(null);
  const [mobileSheet, setMobileSheet] = useState(null);
  const [mobileSearch, setMobileSearch] = useState("");

  /* ── Visibilité par vue ── */
  const [structureVues, setStructureVues] = useState(() => {
    const init = {};
    STRUCTURES.forEach((s) => {
      init[s.id] = s.vues ? [...s.vues] : ["face"];
    });
    return init;
  });

  const toggleVue = useCallback((id, vue) => {
    setStructureVues((prev) => {
      const current = prev[id] || [];
      const next = current.includes(vue)
        ? current.filter((v) => v !== vue)
        : [...current, vue];
      return { ...prev, [id]: next.length ? next : current };
    });
  }, []);

  const searchRef = useRef(null);
  const svgWrapRef = useRef(null);

  const selected = STRUCTURES.find((s) => s.id === selectedId);
  const selectedSys = selected ? SYSTEMES[selected.systeme] : null;

  /* Structures visibles */
  const visibleStructures = useMemo(() => {
    let base;
    if (searchQuery.trim().length > 1) base = searchResults;
    else if (activeSysteme)
      base = STRUCTURES.filter((s) => s.systeme === activeSysteme);
    else base = STRUCTURES;

    // Filtre par vue courante
    base = base.filter((s) => structureVues[s.id]?.includes(view));

    let positioned;
    if (view === "dos") {
      positioned = base
        .filter((s) => BACK_COORDS[s.id])
        .map((s) => ({ ...s, ...BACK_COORDS[s.id] }));
    } else {
      positioned = base;
    }

    // Miroir symétrique
    const withMirrors = [];
    positioned.forEach((s) => {
      withMirrors.push(s);
      const doMirror = s.symetrie !== false;
      if (!s._mirror && doMirror && Math.abs(s.x - 50) > 1.5) {
        withMirrors.push({ ...s, _mirror: true, x: 100 - s.x });
      }
    });

    return withMirrors;
  }, [activeSysteme, searchQuery, searchResults, view, structureVues]);

  const clusters = useMemo(
    () => buildClusters(visibleStructures, zoom),
    [visibleStructures, zoom],
  );

  useEffect(() => {
    if (searchQuery.trim().length > 1)
      setSearchResults(searchData(searchQuery));
    else setSearchResults([]);
  }, [searchQuery]);

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    setZoom((z) =>
      Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, +(z + delta).toFixed(2))),
    );
    setOpenCluster(null);
  }, []);

  useEffect(() => {
    const el = svgWrapRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  const startPan = useCallback(
    (e) => {
      if (zoom <= 1) return;
      setIsPanning(true);
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      setPanStart({ x: clientX, y: clientY, px: panX, py: panY });
    },
    [zoom, panX, panY],
  );

  const doPan = useCallback(
    (e) => {
      if (!isPanning) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      setPanX(panStart.px + (clientX - panStart.x));
      setPanY(panStart.py + (clientY - panStart.y));
    },
    [isPanning, panStart],
  );

  const endPan = useCallback(() => setIsPanning(false), []);

  const resetZoom = () => {
    setZoom(1);
    setPanX(0);
    setPanY(0);
    setOpenCluster(null);
  };

  const zoomIn = () => {
    setZoom((z) => Math.min(ZOOM_MAX, +(z + ZOOM_STEP).toFixed(2)));
    setOpenCluster(null);
  };

  const zoomOut = () => {
    setZoom((z) => {
      const nz = Math.max(ZOOM_MIN, +(z - ZOOM_STEP).toFixed(2));
      if (nz === ZOOM_MIN) {
        setPanX(0);
        setPanY(0);
      }
      return nz;
    });
    setOpenCluster(null);
  };

  const handlePointClick = useCallback((structure) => {
    setSelectedId((prev) => (prev === structure.id ? null : structure.id));
    setOpenCluster(null);
    if (window.innerWidth <= 860) setMobileSheet("detail");
  }, []);

  const handleClusterOpen = useCallback(
    (cluster) => {
      if (cluster.items.length === 1) {
        handlePointClick(cluster.items[0]);
        return;
      }
      setOpenCluster((prev) =>
        prev?.cx === cluster.cx && prev?.cy === cluster.cy ? null : cluster,
      );
    },
    [handlePointClick],
  );

  const handleSelectFromList = useCallback(
    (structure) => {
      setSelectedId(structure.id);
      setSearchQuery("");
      setMobileSearch("");
      setOpenCluster(null);
      const vues = structureVues[structure.id] || [];
      if (!vues.includes(view) && vues.length > 0) setView(vues[0]);
      if (window.innerWidth <= 860) setMobileSheet("detail");
    },
    [view, structureVues],
  );

  const handleSystemeClick = useCallback((id) => {
    setActiveSysteme((prev) => (prev === id ? null : id));
    setSelectedId(null);
    setSearchQuery("");
    setOpenCluster(null);
  }, []);

  const counts = useMemo(() => {
    const c = {};
    STRUCTURES.forEach((s) => {
      c[s.systeme] = (c[s.systeme] || 0) + 1;
    });
    return c;
  }, []);

  const sameSysteme = selected
    ? getBySysteme(selected.systeme).filter((s) => s.id !== selected.id)
    : [];

  const listeGauche = useMemo(() => {
    if (searchQuery.trim().length > 1) return searchResults;
    if (activeSysteme)
      return STRUCTURES.filter((s) => s.systeme === activeSysteme);
    return STRUCTURES;
  }, [activeSysteme, searchQuery, searchResults]);

  const mobileSearchResults = useMemo(() => {
    if (mobileSearch.trim().length > 1) return searchData(mobileSearch);
    if (activeSysteme)
      return STRUCTURES.filter((s) => s.systeme === activeSysteme);
    return STRUCTURES;
  }, [mobileSearch, activeSysteme]);

  const closeMobileSheet = () => setMobileSheet(null);

  /* ── Panneau détail ── */
  const DetailContent = ({ onClose }) => {
    const vues = structureVues[selected.id] || [];
    const hasBothCoords = BACK_COORDS[selected.id];

    return (
      <>
        <div
          className="bm__panel-head"
          style={{ "--pc": selectedSys?.couleur }}
        >
          <div className="bm__panel-head-top">
            <span className="bm__panel-badge">
              <span className="bm__panel-badge-dot" />
              {selectedSys?.label}
            </span>
            <button
              className="bm__panel-close"
              onClick={onClose}
              aria-label="Fermer"
            >
              <X size={15} />
            </button>
          </div>
          <h2 className="bm__panel-name">{selected.nom}</h2>
          {selected.nomLatin && (
            <p className="bm__panel-latin">{selected.nomLatin}</p>
          )}
          <div className="bm__panel-meta">
            <span className="bm__panel-region">
              {REGIONS_LABELS[selected.region] || selected.region}
            </span>
          </div>

          {/* Toggle face/dos */}
          <div className="bm__vue-toggle">
            <span className="bm__vue-toggle-label">Visible sur</span>
            {["face", "dos"].map((v) => {
              const on = vues.includes(v);
              const disabled = on && vues.length === 1;
              const needsCoords = v === "dos" && !hasBothCoords;
              return (
                <button
                  key={v}
                  className={`bm__vue-chip${on ? " bm__vue-chip--on" : ""}${needsCoords && !on ? " bm__vue-chip--no-coords" : ""}`}
                  onClick={() => !disabled && toggleVue(selected.id, v)}
                  title={
                    needsCoords && !on
                      ? "Pas de coordonnées définies pour la vue dos"
                      : undefined
                  }
                  aria-pressed={on}
                  disabled={disabled}
                  style={{ cursor: disabled ? "not-allowed" : "pointer" }}
                >
                  {v === "face" ? "Face" : "Dos"}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bm__panel-body">
          <section className="bm__card">
            <div className="bm__card-hd">
              <BookOpen size={13} /> Description
            </div>
            <p className="bm__card-txt">{selected.description}</p>
          </section>
          <section className="bm__card">
            <div className="bm__card-hd">
              <Activity size={13} /> Rôle physiologique
            </div>
            <p className="bm__card-txt">{selected.role}</p>
          </section>
          <section className="bm__card bm__card--patho">
            <div className="bm__card-hd">
              <AlertCircle size={13} /> Pathologies fréquentes
            </div>
            <ul className="bm__patho-list">
              {selected.pathologies.map((p, i) => (
                <li key={i} className="bm__patho-tag">
                  {p}
                </li>
              ))}
            </ul>
          </section>
          <section className="bm__card bm__card--kine">
            <div className="bm__card-hd">
              <Stethoscope size={13} /> Prise en charge kiné
            </div>
            <p className="bm__card-txt">{selected.kine}</p>
          </section>
          {sameSysteme.length > 0 && (
            <div className="bm__panel-nav">
              <div className="bm__panel-nav-hd">
                Autres — {selectedSys?.label}
              </div>
              <div className="bm__panel-nav-grid">
                {sameSysteme.slice(0, 6).map((s) => (
                  <button
                    key={s.id}
                    className="bm__panel-nav-item"
                    onClick={() => {
                      setSelectedId(s.id);
                      setOpenCluster(null);
                    }}
                  >
                    <span
                      className="bm__panel-nav-dot"
                      style={{ background: selectedSys?.couleur }}
                    />
                    <span className="bm__panel-nav-name">{s.nom}</span>
                    <ChevronRight size={11} className="bm__panel-nav-arr" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="bm" onClick={() => openCluster && setOpenCluster(null)}>
      {/* ══ COLONNE GAUCHE ══ */}
      <aside className="bm__left">
        <div className="bm__search">
          <Search size={15} className="bm__search-ico" />
          <input
            ref={searchRef}
            type="search"
            className="bm__search-input"
            placeholder="Rechercher os, muscle, nerf…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Rechercher une structure anatomique"
          />
          {searchQuery && (
            <button
              className="bm__search-clear"
              onClick={() => {
                setSearchQuery("");
                searchRef.current?.focus();
              }}
            >
              <X size={12} />
            </button>
          )}
        </div>

        <nav className="bm__systems" aria-label="Filtres par système">
          <div className="bm__sys-header">
            <span className="bm__sys-header-label">Systèmes</span>
            {activeSysteme && (
              <button
                className="bm__sys-reset"
                onClick={() => {
                  setActiveSysteme(null);
                  setSelectedId(null);
                }}
              >
                Tout afficher
              </button>
            )}
          </div>
          {Object.values(SYSTEMES).map((sys) => {
            const isActive = activeSysteme === sys.id;
            return (
              <button
                key={sys.id}
                className={`bm__sys-btn${isActive ? " bm__sys-btn--on" : ""}`}
                onClick={() => handleSystemeClick(sys.id)}
                aria-pressed={isActive}
                style={{ "--sc": sys.couleur }}
              >
                <span className="bm__sys-btn-dot" />
                <span className="bm__sys-btn-label">{sys.label}</span>
                <span className="bm__sys-btn-count">{counts[sys.id]}</span>
              </button>
            );
          })}
        </nav>

        <div className="bm__list" role="list">
          {searchQuery.trim().length > 1 && searchResults.length === 0 ? (
            <div className="bm__list-empty">
              Aucun résultat pour « {searchQuery} »
            </div>
          ) : (
            listeGauche.map((s) => {
              const sys = SYSTEMES[s.systeme];
              const isActive = selectedId === s.id;
              const vues = structureVues[s.id] || [];
              return (
                <button
                  key={s.id}
                  className={`bm__list-item${isActive ? " bm__list-item--on" : ""}`}
                  onClick={() => handleSelectFromList(s)}
                  style={{ "--sc": sys?.couleur }}
                  role="listitem"
                >
                  <span className="bm__list-dot" />
                  <span className="bm__list-name">{s.nom}</span>
                  <span
                    className="bm__list-vues"
                    aria-label={`Visible sur ${vues.join(" et ")}`}
                  >
                    {vues.includes("face") && (
                      <span
                        className="bm__vue-pip bm__vue-pip--face"
                        title="Face"
                      >
                        F
                      </span>
                    )}
                    {vues.includes("dos") && (
                      <span
                        className="bm__vue-pip bm__vue-pip--dos"
                        title="Dos"
                      >
                        D
                      </span>
                    )}
                  </span>
                  {!activeSysteme && (
                    <span className="bm__list-sys">
                      {sys?.label?.split(" ")[0]}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </aside>

      {/* ══ CENTRE — SVG ══ */}
      <main className="bm__center">
        <div className="bm__controls">
          <div
            className="bm__view-toggle"
            role="group"
            aria-label="Vue du corps"
          >
            <button
              className={`bm__view-btn${view === "face" ? " bm__view-btn--on" : ""}`}
              onClick={() => {
                setView("face");
                setOpenCluster(null);
              }}
            >
              <Eye size={13} /> Face
            </button>
            <button
              className={`bm__view-btn${view === "dos" ? " bm__view-btn--on" : ""}`}
              onClick={() => {
                setView("dos");
                setOpenCluster(null);
              }}
            >
              <Eye size={13} style={{ transform: "scaleX(-1)" }} /> Dos
            </button>
          </div>

          <div className="bm__controls-info">
            {activeSysteme ? (
              <span
                className="bm__controls-sys"
                style={{ color: SYSTEMES[activeSysteme]?.couleur }}
              >
                <span
                  className="bm__controls-dot"
                  style={{ background: SYSTEMES[activeSysteme]?.couleur }}
                />
                Système {SYSTEMES[activeSysteme]?.label}
              </span>
            ) : (
              <span className="bm__controls-count">
                {visibleStructures.filter((s) => !s._mirror).length} structures
              </span>
            )}
            {selected && (
              <button
                className="bm__controls-desel"
                onClick={() => setSelectedId(null)}
              >
                <X size={11} /> Désélectionner
              </button>
            )}
          </div>

          <div className="bm__zoom-group" role="group" aria-label="Zoom">
            <button
              className="bm__zoom-btn"
              onClick={zoomOut}
              disabled={zoom <= ZOOM_MIN}
              aria-label="Dézoomer"
            >
              <ZoomOut size={15} />
            </button>
            <span className="bm__zoom-label">{Math.round(zoom * 100)}%</span>
            <button
              className="bm__zoom-btn"
              onClick={zoomIn}
              disabled={zoom >= ZOOM_MAX}
              aria-label="Zoomer"
            >
              <ZoomIn size={15} />
            </button>
            {zoom > 1 && (
              <button
                className="bm__zoom-btn bm__zoom-btn--reset"
                onClick={resetZoom}
                aria-label="Réinitialiser"
              >
                <RotateCcw size={13} />
              </button>
            )}
          </div>
        </div>

        <div className="bm__cluster-hint" aria-live="polite">
          {clusters.filter((c) => c.items.length > 1).length > 0 && zoom < 2 ? (
            <span>
              <strong>
                {clusters.filter((c) => c.items.length > 1).length}
              </strong>{" "}
              zones regroupées — zoomez ou cliquez sur le badge pour
              sélectionner
            </span>
          ) : null}
        </div>

        <div
          className={`bm__canvas${isPanning ? " bm__canvas--panning" : ""}`}
          ref={svgWrapRef}
          onMouseDown={startPan}
          onMouseMove={doPan}
          onMouseUp={endPan}
          onMouseLeave={endPan}
          onTouchStart={startPan}
          onTouchMove={doPan}
          onTouchEnd={endPan}
        >
          <div
            className="bm__canvas-inner"
            style={{
              transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
              transformOrigin: "center center",
            }}
          >
            <svg
              className="bm__svg"
              viewBox={`0 0 ${VW} ${VH}`}
              role="img"
              aria-label={`Silhouette anatomique — vue ${view}`}
              onClick={(e) => e.stopPropagation()}
            >
              {view === "face" ? (
                <SilhouetteAnterior />
              ) : (
                <SilhouettePosterior />
              )}

              {clusters.map((cluster, i) => {
                if (cluster.items.length === 1) {
                  const s = cluster.items[0];
                  const key = s._mirror ? `${s.id}_mirror_${i}` : s.id;
                  return (
                    <SinglePoint
                      key={key}
                      structure={s}
                      couleur={SYSTEMES[s.systeme]?.couleur || "#888"}
                      isActive={selectedId === s.id}
                      onClick={handlePointClick}
                      zoom={zoom}
                    />
                  );
                }
                return (
                  <ClusterPin
                    key={`cluster-${i}`}
                    cluster={cluster}
                    selectedId={selectedId}
                    onOpenPopup={handleClusterOpen}
                    zoom={zoom}
                  />
                );
              })}
            </svg>
          </div>
        </div>

        {/* Popup cluster */}
        {openCluster && (
          <div
            className="bm__cluster-modal-overlay"
            onClick={() => setOpenCluster(null)}
            aria-hidden="true"
          />
        )}
        {openCluster && (
          <div
            className="bm__cluster-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${openCluster.items.length} structures dans cette zone`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bm__cluster-modal-head">
              <div className="bm__cluster-modal-title">
                <span className="bm__cluster-modal-count">
                  {openCluster.items.length}
                </span>
                structures dans cette zone
              </div>
              <button
                className="bm__cluster-modal-close"
                onClick={() => setOpenCluster(null)}
                aria-label="Fermer"
              >
                <X size={14} />
              </button>
            </div>
            <p className="bm__cluster-modal-hint">
              Sélectionnez la structure qui vous intéresse, ou zoomez pour les
              séparer.
            </p>
            <div className="bm__cluster-modal-grid">
              {openCluster.items
                .filter(
                  (s, idx, arr) => arr.findIndex((t) => t.id === s.id) === idx,
                )
                .map((s) => {
                  const sys = SYSTEMES[s.systeme];
                  const isOn = selectedId === s.id;
                  return (
                    <button
                      key={s.id}
                      className={`bm__cluster-modal-item${isOn ? " bm__cluster-modal-item--on" : ""}`}
                      onClick={() => {
                        handlePointClick(s);
                        setOpenCluster(null);
                      }}
                      style={{ "--mc": sys?.couleur }}
                    >
                      <span className="bm__cluster-modal-dot" />
                      <span className="bm__cluster-modal-info">
                        <span className="bm__cluster-modal-name">{s.nom}</span>
                        <span className="bm__cluster-modal-sys">
                          {sys?.label}
                        </span>
                      </span>
                      <ChevronRight
                        size={13}
                        className="bm__cluster-modal-arr"
                      />
                    </button>
                  );
                })}
            </div>
          </div>
        )}

        {zoom > 1 && (
          <div className="bm__zoom-hint" aria-live="polite">
            Maintenez et glissez pour déplacer · Scroll pour zoomer
          </div>
        )}

        <div className="bm__legend" aria-hidden="true">
          {Object.values(SYSTEMES)
            .filter((s) => !activeSysteme || s.id === activeSysteme)
            .map((sys) => (
              <button
                key={sys.id}
                className={`bm__leg-item${activeSysteme === sys.id ? " bm__leg-item--on" : ""}`}
                onClick={() => handleSystemeClick(sys.id)}
                style={{ "--sc": sys.couleur }}
              >
                <span className="bm__leg-dot" />
                <span className="bm__leg-label">{sys.label}</span>
              </button>
            ))}
        </div>
      </main>

      {/* ══ PANNEAU DROIT ══ */}
      <aside
        className={`bm__panel${selected ? " bm__panel--open" : ""}`}
        aria-live="polite"
        aria-label="Détail anatomique"
      >
        {selected ? (
          <DetailContent onClose={() => setSelectedId(null)} />
        ) : (
          <div className="bm__empty">
            <div className="bm__empty-illo" aria-hidden="true">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <circle
                  cx="30"
                  cy="30"
                  r="27"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.15"
                />
                <circle
                  cx="30"
                  cy="22"
                  r="8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  opacity="0.3"
                />
                <path
                  d="M15 48c0-8.284 6.716-15 15-15s15 6.716 15 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.3"
                />
              </svg>
            </div>
            <p className="bm__empty-title">Sélectionnez une structure</p>
            <p className="bm__empty-sub">
              Cliquez sur un point de la silhouette, ou utilisez la liste à
              gauche pour explorer les {STRUCTURES.length} structures
              disponibles.
            </p>
            <div className="bm__empty-stats">
              {Object.values(SYSTEMES).map((sys) => (
                <button
                  key={sys.id}
                  className="bm__empty-stat"
                  onClick={() => handleSystemeClick(sys.id)}
                  style={{ "--sc": sys.couleur }}
                >
                  <span className="bm__empty-stat-dot" />
                  <span className="bm__empty-stat-label">{sys.label}</span>
                  <span className="bm__empty-stat-count">{counts[sys.id]}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* ══ MOBILE — Tab bar ══ */}
      <nav className="bm__mobile-nav" aria-label="Navigation mobile">
        <button
          className={`bm__mobile-nav-btn${view === "face" ? " bm__mobile-nav-btn--on" : ""}`}
          onClick={() => {
            setView("face");
            setOpenCluster(null);
          }}
          aria-label="Vue de face"
        >
          <span className="bm__mobile-nav-icon">
            <Eye size={20} />
          </span>
          <span className="bm__mobile-nav-label">Face</span>
        </button>
        <button
          className={`bm__mobile-nav-btn${view === "dos" ? " bm__mobile-nav-btn--on" : ""}`}
          onClick={() => {
            setView("dos");
            setOpenCluster(null);
          }}
          aria-label="Vue de dos"
        >
          <span className="bm__mobile-nav-icon">
            <Eye size={20} style={{ transform: "scaleX(-1)" }} />
          </span>
          <span className="bm__mobile-nav-label">Dos</span>
        </button>
        <button
          className={`bm__mobile-nav-btn${mobileSheet === "detail" && selected ? " bm__mobile-nav-btn--on" : ""}`}
          onClick={() =>
            selected ? setMobileSheet("detail") : setMobileSheet("nav")
          }
          aria-label={
            selected ? `Détail : ${selected.nom}` : "Sélectionner une structure"
          }
        >
          <span className="bm__mobile-nav-icon">
            <Stethoscope size={20} />
          </span>
          {selected && (
            <span className="bm__mobile-nav-badge" aria-hidden="true" />
          )}
          <span className="bm__mobile-nav-label">
            {selected ? "Détail" : "Liste"}
          </span>
        </button>
        <button
          className={`bm__mobile-nav-btn${mobileSheet === "nav" ? " bm__mobile-nav-btn--on" : ""}`}
          onClick={() => setMobileSheet("nav")}
          aria-label="Ouvrir la liste"
        >
          <span className="bm__mobile-nav-icon">
            <List size={20} />
          </span>
          <span className="bm__mobile-nav-label">Structures</span>
        </button>
      </nav>

      {/* ══ MOBILE — Sheets ══ */}
      {mobileSheet && (
        <>
          <div
            className="bm__mobile-sheet-overlay"
            onClick={closeMobileSheet}
          />
          <div className="bm__mobile-sheet">
            <div
              className="bm__mobile-sheet-handle"
              onClick={closeMobileSheet}
            />
            <div className="bm__mobile-sheet-content">
              {mobileSheet === "detail" && selected ? (
                <DetailContent onClose={closeMobileSheet} />
              ) : (
                <>
                  <div className="bm__search" style={{ margin: "0 12px 8px" }}>
                    <Search size={15} className="bm__search-ico" />
                    <input
                      type="search"
                      className="bm__search-input"
                      placeholder="Rechercher..."
                      value={mobileSearch}
                      onChange={(e) => setMobileSearch(e.target.value)}
                    />
                    {mobileSearch && (
                      <button
                        className="bm__search-clear"
                        onClick={() => setMobileSearch("")}
                      >
                        <X size={12} />
                      </button>
                    )}
                  </div>
                  <div className="bm__list" style={{ maxHeight: "50vh" }}>
                    {mobileSearchResults.map((s) => {
                      const sys = SYSTEMES[s.systeme];
                      return (
                        <button
                          key={s.id}
                          className={`bm__list-item${selectedId === s.id ? " bm__list-item--on" : ""}`}
                          onClick={() => {
                            handleSelectFromList(s);
                            setMobileSheet("detail");
                          }}
                          style={{ "--sc": sys?.couleur }}
                        >
                          <span className="bm__list-dot" />
                          <span className="bm__list-name">{s.nom}</span>
                          <span className="bm__list-sys">{sys?.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
