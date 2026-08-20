<style>
    /* =================================================================
       PÓCIMAS — PREMIUM ADMIN THEME v2.0
       Dark-first, gold-accented, glassmorphism design
       ================================================================= */

    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

    /* ── 1. Base ── */
    *, *::before, *::after { box-sizing: border-box; }

    html, body, .fi-body, .fi-layout {
        font-family: 'Outfit', sans-serif !important;
        -webkit-font-smoothing: antialiased !important;
        text-rendering: optimizeLegibility !important;
    }

    /* ── 2. CSS Variables ── */
    :root {
        --gold:        #D4AF37;
        --gold-dim:    rgba(212, 175, 55, 0.15);
        --gold-glow:   rgba(212, 175, 55, 0.25);
        --gold-border: rgba(212, 175, 55, 0.2);
        --green:       #10b981;
        --red:         #f43f5e;
        --amber:       #f59e0b;
        --blue:        #3b82f6;
        --indigo:      #6366f1;
    }

    /* ================================================================
       DARK MODE
       ================================================================ */

    /* — Background — */
    .dark body,
    .dark .fi-body,
    .dark .fi-layout { background: #08070d !important; }

    /* — Topbar — */
    .dark .fi-topbar {
        background: rgba(8, 7, 13, 0.75) !important;
        backdrop-filter: blur(16px) saturate(180%) !important;
        -webkit-backdrop-filter: blur(16px) saturate(180%) !important;
        border-bottom: 1px solid rgba(212, 175, 55, 0.08) !important;
        box-shadow: 0 1px 0 rgba(212, 175, 55, 0.05) !important;
    }

    /* — Sidebar — */
    .dark .fi-sidebar {
        background: linear-gradient(180deg, #0d0b15 0%, #080710 100%) !important;
        border-right: 1px solid rgba(212, 175, 55, 0.07) !important;
    }

    .dark .fi-sidebar-header {
        border-bottom: 1px solid rgba(212, 175, 55, 0.08) !important;
        background: transparent !important;
        padding-bottom: 1rem !important;
        padding-top: 1.25rem !important;
    }

    /* Sidebar nav groups */
    .dark .fi-sidebar-group-label {
        color: rgba(212, 175, 55, 0.45) !important;
        font-size: 0.65rem !important;
        font-weight: 700 !important;
        letter-spacing: 0.12em !important;
        text-transform: uppercase !important;
        padding: 0.5rem 1.25rem !important;
        margin-top: 0.5rem !important;
    }

    /* Sidebar items */
    .dark .fi-sidebar-item a,
    .dark .fi-sidebar-item button {
        border-radius: 10px !important;
        margin: 2px 10px !important;
        padding: 0.6rem 1rem !important;
        width: auto !important;
        color: rgba(255,255,255,0.55) !important;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
        position: relative !important;
    }

    .dark .fi-sidebar-item a:hover,
    .dark .fi-sidebar-item button:hover {
        background: rgba(212, 175, 55, 0.07) !important;
        color: rgba(255,255,255,0.9) !important;
    }

    /* Active sidebar item */
    .dark .fi-sidebar-item-active > a,
    .dark .fi-sidebar-item-active > button {
        background: linear-gradient(90deg, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0.04) 100%) !important;
        color: #D4AF37 !important;
        box-shadow: inset 3px 0 0 0 #D4AF37 !important;
        font-weight: 600 !important;
    }

    .dark .fi-sidebar-item-active .fi-sidebar-item-icon {
        color: #D4AF37 !important;
    }

    /* — Stat Cards — */
    .dark .fi-wi-stats-overview-stat {
        background: linear-gradient(135deg, #111018 0%, #0e0d16 100%) !important;
        border: 1px solid rgba(212,175,55,0.1) !important;
        border-radius: 18px !important;
        box-shadow: 0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03) !important;
        overflow: hidden !important;
        transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease !important;
        position: relative !important;
    }

    .dark .fi-wi-stats-overview-stat::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 3px;
        border-radius: 18px 18px 0 0;
    }

    .dark .fi-wi-stats-overview-stat:nth-child(1)::before { background: var(--gold); }
    .dark .fi-wi-stats-overview-stat:nth-child(2)::before { background: var(--green); }
    .dark .fi-wi-stats-overview-stat:nth-child(3)::before { background: var(--amber); }
    .dark .fi-wi-stats-overview-stat:nth-child(4)::before { background: var(--blue); }

    .dark .fi-wi-stats-overview-stat:hover {
        transform: translateY(-3px) !important;
        border-color: rgba(212,175,55,0.25) !important;
        box-shadow: 0 12px 40px rgba(0,0,0,0.5), 0 0 30px rgba(212,175,55,0.06) !important;
    }

    .dark .fi-wi-stats-overview-stat-value {
        color: #ffffff !important;
        font-size: 2.5rem !important;
        font-weight: 800 !important;
        letter-spacing: -0.05em !important;
        line-height: 1 !important;
    }

    .dark .fi-wi-stats-overview-stat-label {
        color: rgba(255,255,255,0.5) !important;
        font-size: 0.8rem !important;
        font-weight: 600 !important;
        letter-spacing: 0.04em !important;
        text-transform: uppercase !important;
    }

    .dark .fi-wi-stats-overview-stat-description {
        color: rgba(255,255,255,0.45) !important;
        font-size: 0.78rem !important;
    }

    /* — Chart Widgets — */
    .dark .fi-wi-chart {
        background: linear-gradient(135deg, #111018 0%, #0e0d16 100%) !important;
        border: 1px solid rgba(212,175,55,0.1) !important;
        border-radius: 18px !important;
        box-shadow: 0 4px 24px rgba(0,0,0,0.4) !important;
        overflow: hidden !important;
    }

    .dark .fi-wi-chart-header {
        border-bottom: 1px solid rgba(212,175,55,0.07) !important;
        padding: 1.25rem 1.5rem !important;
    }

    /* — Tables — */
    .dark .fi-ta-ctn {
        background: linear-gradient(135deg, #111018 0%, #0e0d16 100%) !important;
        border: 1px solid rgba(212,175,55,0.1) !important;
        border-radius: 18px !important;
        box-shadow: 0 4px 24px rgba(0,0,0,0.4) !important;
        overflow: hidden !important;
    }

    .dark .fi-ta-header {
        background: rgba(212,175,55,0.03) !important;
        border-bottom: 1px solid rgba(212,175,55,0.08) !important;
    }

    .dark .fi-ta-header-cell-label {
        color: rgba(212,175,55,0.7) !important;
        font-size: 0.7rem !important;
        font-weight: 700 !important;
        letter-spacing: 0.08em !important;
        text-transform: uppercase !important;
    }

    .dark .fi-ta-row:nth-child(even) td {
        background: rgba(255,255,255,0.015) !important;
    }

    .dark .fi-ta-row:hover td {
        background: rgba(212,175,55,0.04) !important;
    }

    .dark .fi-ta-cell-content { color: rgba(255,255,255,0.85) !important; }

    /* — Forms/Panels/Sections — */
    .dark .fi-fo-component-ctn,
    .dark .fi-panel,
    .dark .fi-section {
        background: linear-gradient(135deg, #111018 0%, #0e0d16 100%) !important;
        border: 1px solid rgba(212,175,55,0.1) !important;
        border-radius: 18px !important;
        box-shadow: 0 4px 24px rgba(0,0,0,0.4) !important;
        overflow: hidden !important;
    }

    .dark .fi-section-header {
        border-bottom: 1px solid rgba(212,175,55,0.07) !important;
    }

    .dark .fi-section-header-heading {
        color: #fff !important;
        font-weight: 700 !important;
        font-size: 0.95rem !important;
        letter-spacing: -0.01em !important;
    }

    /* — Inputs — */
    .dark .fi-input {
        background: rgba(255,255,255,0.04) !important;
        border: 1px solid rgba(255,255,255,0.1) !important;
        border-radius: 10px !important;
        color: #fff !important;
        transition: border-color 0.2s, box-shadow 0.2s !important;
    }

    .dark .fi-input:focus {
        border-color: var(--gold) !important;
        box-shadow: 0 0 0 3px rgba(212,175,55,0.15) !important;
        outline: none !important;
    }

    .dark .fi-select {
        background: rgba(255,255,255,0.04) !important;
        border: 1px solid rgba(255,255,255,0.1) !important;
        border-radius: 10px !important;
        color: #fff !important;
    }

    /* — Badges / Status Indicators — */
    .dark .fi-badge[class*="success"] { background: rgba(16,185,129,0.15) !important; color: #34d399 !important; border: 1px solid rgba(16,185,129,0.3) !important; }
    .dark .fi-badge[class*="warning"] { background: rgba(245,158,11,0.15) !important; color: #fbbf24 !important; border: 1px solid rgba(245,158,11,0.3) !important; }
    .dark .fi-badge[class*="danger"]  { background: rgba(244,63,94,0.15) !important;  color: #fb7185 !important; border: 1px solid rgba(244,63,94,0.3) !important; }
    .dark .fi-badge[class*="primary"] { background: rgba(212,175,55,0.15) !important; color: #D4AF37 !important; border: 1px solid rgba(212,175,55,0.3) !important; }
    .dark .fi-badge[class*="info"]    { background: rgba(59,130,246,0.15) !important; color: #60a5fa !important; border: 1px solid rgba(59,130,246,0.3) !important; }

    /* — Buttons — */
    .dark .fi-btn-primary,
    html:not(.dark) .fi-btn-primary {
        background: linear-gradient(135deg, #a07a0a 0%, #D4AF37 50%, #b8960c 100%) !important;
        color: #0a0800 !important;
        font-weight: 700 !important;
        border: none !important;
        border-radius: 10px !important;
        box-shadow: 0 4px 15px rgba(212,175,55,0.3) !important;
        letter-spacing: 0.01em !important;
        transition: all 0.2s ease !important;
    }

    .dark .fi-btn-primary:hover,
    html:not(.dark) .fi-btn-primary:hover {
        box-shadow: 0 6px 25px rgba(212,175,55,0.45) !important;
        transform: translateY(-1px) !important;
    }

    .dark .fi-btn-secondary {
        background: rgba(255,255,255,0.06) !important;
        border: 1px solid rgba(255,255,255,0.12) !important;
        color: rgba(255,255,255,0.8) !important;
        border-radius: 10px !important;
    }

    .dark .fi-btn-secondary:hover {
        background: rgba(255,255,255,0.1) !important;
        border-color: rgba(212,175,55,0.3) !important;
    }

    /* — Pagination — */
    .dark .fi-pagination {
        border-top: 1px solid rgba(212,175,55,0.07) !important;
    }

    .dark .fi-pagination-item-button {
        border-radius: 8px !important;
        font-weight: 600 !important;
    }

    .dark .fi-pagination-item-button[aria-current="page"] {
        background: var(--gold-dim) !important;
        color: var(--gold) !important;
        border-color: var(--gold-border) !important;
    }

    /* — Page Header — */
    .dark .fi-header {
        padding-bottom: 1.5rem !important;
        border-bottom: 1px solid rgba(212,175,55,0.07) !important;
        margin-bottom: 1.5rem !important;
    }

    .dark .fi-header-heading {
        color: #fff !important;
        font-weight: 800 !important;
        font-size: 1.75rem !important;
        letter-spacing: -0.03em !important;
    }

    /* — Modal — */
    .dark .fi-modal-content {
        background: #111018 !important;
        border: 1px solid rgba(212,175,55,0.12) !important;
        border-radius: 20px !important;
        box-shadow: 0 25px 80px rgba(0,0,0,0.8) !important;
    }

    .dark .fi-modal-header {
        border-bottom: 1px solid rgba(212,175,55,0.08) !important;
    }

    /* — Dividers — */
    .dark .divide-gray-200 > :not([hidden]) ~ :not([hidden]),
    .dark .dark\:divide-white\/10 > :not([hidden]) ~ :not([hidden]) {
        border-color: rgba(212,175,55,0.08) !important;
    }

    /* — Ring borders (remove default) — */
    .dark .ring-1,
    .dark .dark\:ring-white\/10,
    .dark .dark\:ring-white\/5 {
        --tw-ring-shadow: 0 0 #0000 !important;
        --tw-ring-color: transparent !important;
    }

    /* — Typography — */
    .dark h1, .dark h2, .dark h3, .dark h4, .dark h5, .dark h6 {
        color: #fff !important;
        letter-spacing: -0.02em !important;
    }

    .dark p { color: rgba(255,255,255,0.65) !important; }

    /* — Scrollbar — */
    .dark ::-webkit-scrollbar { width: 6px; height: 6px; }
    .dark ::-webkit-scrollbar-track { background: #08070d; }
    .dark ::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.2); border-radius: 3px; }
    .dark ::-webkit-scrollbar-thumb:hover { background: rgba(212,175,55,0.4); }

    /* — Notification — */
    .dark .fi-no-notification {
        background: #111018 !important;
        border: 1px solid rgba(212,175,55,0.15) !important;
        border-radius: 14px !important;
        box-shadow: 0 16px 50px rgba(0,0,0,0.7) !important;
    }

    /* ================================================================
       LIGHT MODE
       ================================================================ */

    html:not(.dark) body,
    html:not(.dark) .fi-body,
    html:not(.dark) .fi-layout {
        background: #f4f3f8 !important;
    }

    html:not(.dark) .fi-topbar {
        background: rgba(255,255,255,0.85) !important;
        backdrop-filter: blur(16px) !important;
        border-bottom: 1px solid rgba(0,0,0,0.06) !important;
        box-shadow: 0 1px 0 rgba(0,0,0,0.04) !important;
    }

    html:not(.dark) .fi-sidebar {
        background: #ffffff !important;
        border-right: 1px solid rgba(0,0,0,0.06) !important;
    }

    html:not(.dark) .fi-sidebar-item a,
    html:not(.dark) .fi-sidebar-item button {
        border-radius: 10px !important;
        margin: 2px 10px !important;
        padding: 0.6rem 1rem !important;
        width: auto !important;
        color: rgba(0,0,0,0.55) !important;
        transition: all 0.2s ease !important;
    }

    html:not(.dark) .fi-sidebar-item a:hover,
    html:not(.dark) .fi-sidebar-item button:hover {
        background: rgba(212,175,55,0.07) !important;
        color: rgba(0,0,0,0.85) !important;
    }

    html:not(.dark) .fi-sidebar-item-active > a,
    html:not(.dark) .fi-sidebar-item-active > button {
        background: linear-gradient(90deg, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.03) 100%) !important;
        color: #9a7a0a !important;
        box-shadow: inset 3px 0 0 0 #D4AF37 !important;
        font-weight: 600 !important;
    }

    html:not(.dark) .fi-sidebar-item-active .fi-sidebar-item-icon { color: #9a7a0a !important; }

    html:not(.dark) .fi-wi-stats-overview-stat,
    html:not(.dark) .fi-ta-ctn,
    html:not(.dark) .fi-fo-component-ctn,
    html:not(.dark) .fi-panel,
    html:not(.dark) .fi-section,
    html:not(.dark) .fi-wi-chart {
        background: #ffffff !important;
        border: 1px solid rgba(0,0,0,0.06) !important;
        border-radius: 18px !important;
        box-shadow: 0 2px 16px rgba(0,0,0,0.05) !important;
        overflow: hidden !important;
    }

    html:not(.dark) .fi-wi-stats-overview-stat {
        position: relative !important;
        transition: transform 0.25s ease, box-shadow 0.25s ease !important;
    }

    html:not(.dark) .fi-wi-stats-overview-stat::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 3px;
        border-radius: 18px 18px 0 0;
    }

    html:not(.dark) .fi-wi-stats-overview-stat:nth-child(1)::before { background: var(--gold); }
    html:not(.dark) .fi-wi-stats-overview-stat:nth-child(2)::before { background: var(--green); }
    html:not(.dark) .fi-wi-stats-overview-stat:nth-child(3)::before { background: var(--amber); }
    html:not(.dark) .fi-wi-stats-overview-stat:nth-child(4)::before { background: var(--blue); }

    html:not(.dark) .fi-wi-stats-overview-stat:hover {
        transform: translateY(-3px) !important;
        box-shadow: 0 8px 30px rgba(212,175,55,0.12) !important;
    }

    html:not(.dark) .fi-wi-stats-overview-stat-value {
        color: #111827 !important;
        font-size: 2.5rem !important;
        font-weight: 800 !important;
        letter-spacing: -0.05em !important;
    }

    html:not(.dark) .fi-wi-stats-overview-stat-label {
        color: rgba(0,0,0,0.45) !important;
        font-size: 0.8rem !important;
        font-weight: 600 !important;
        letter-spacing: 0.04em !important;
        text-transform: uppercase !important;
    }

    html:not(.dark) .fi-ta-header-cell-label {
        color: rgba(0,0,0,0.45) !important;
        font-size: 0.7rem !important;
        font-weight: 700 !important;
        letter-spacing: 0.08em !important;
        text-transform: uppercase !important;
    }

    html:not(.dark) .fi-ta-row:nth-child(even) td {
        background: rgba(0,0,0,0.015) !important;
    }

    html:not(.dark) .fi-ta-row:hover td {
        background: rgba(212,175,55,0.04) !important;
    }

    html:not(.dark) .fi-header-heading {
        color: #111827 !important;
        font-weight: 800 !important;
        font-size: 1.75rem !important;
        letter-spacing: -0.03em !important;
    }

    html:not(.dark) .fi-input:focus {
        border-color: var(--gold) !important;
        box-shadow: 0 0 0 3px rgba(212,175,55,0.12) !important;
    }

    /* — Widget layout spacing — */
    .fi-wi-stats-overview {
        gap: 1rem !important;
    }

    .fi-dashboard-widgets {
        gap: 1.25rem !important;
    }
</style>
