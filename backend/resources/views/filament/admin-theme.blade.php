<style>
    /* =========================================================
       POCIMAS PREMIUM ADMIN THEME - LIGHT & DARK MODE SUPPORT
       ========================================================= */
       
    /* 1. Global Font */
    html, body, .fi-body, .fi-layout {
        font-family: 'Outfit', sans-serif !important;
    }

    /* ---------------------------------------------------------
       DARK MODE STYLES
       --------------------------------------------------------- */
    .dark body, .dark .fi-body, .dark .fi-layout { background-color: #050505 !important; }
    
    .dark .fi-topbar {
        background: rgba(5, 5, 5, 0.6) !important;
        backdrop-filter: blur(12px) !important;
        -webkit-backdrop-filter: blur(12px) !important;
        border-bottom: 1px solid rgba(212, 175, 55, 0.05) !important;
    }

    .dark .fi-sidebar {
        background-color: #050505 !important;
        border-right: 1px solid rgba(212, 175, 55, 0.05) !important;
    }
    .dark .fi-sidebar-header {
        border-bottom: 1px solid rgba(212, 175, 55, 0.05) !important;
        background: transparent !important;
    }

    .dark .fi-sidebar-item button:hover,
    .dark .fi-sidebar-item a:hover {
        background-color: rgba(212, 175, 55, 0.05) !important;
    }

    .dark .fi-sidebar-item-active > a,
    .dark .fi-sidebar-item-active > button {
        background: linear-gradient(90deg, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0.05) 100%) !important;
        color: #D4AF37 !important;
        box-shadow: inset 3px 0 0 0 #D4AF37 !important;
    }
    .dark .fi-sidebar-item-active .fi-sidebar-item-icon { color: #D4AF37 !important; }

    .dark .fi-wi-stats-overview-stat,
    .dark .fi-ta-ctn,
    .dark .fi-fo-component-ctn,
    .dark .fi-panel,
    .dark .fi-section {
        background-color: #0d0d0d !important;
        border: 1px solid rgba(212, 175, 55, 0.1) !important;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4) !important;
    }
    
    .dark .fi-wi-stats-overview-stat:hover {
        box-shadow: 0 10px 40px rgba(212, 175, 55, 0.08) !important;
        border-color: rgba(212, 175, 55, 0.25) !important;
    }

    .dark .fi-wi-stats-overview-stat:nth-child(1) {
        border-top: 3px solid #D4AF37 !important;
        background: linear-gradient(180deg, rgba(212, 175, 55, 0.03) 0%, rgba(13, 13, 13, 0) 100%), #0d0d0d !important;
    }
    .dark .fi-wi-stats-overview-stat:nth-child(2) {
        border-top: 3px solid #10b981 !important;
        background: linear-gradient(180deg, rgba(16, 185, 129, 0.03) 0%, rgba(13, 13, 13, 0) 100%), #0d0d0d !important;
    }
    .dark .fi-wi-stats-overview-stat:nth-child(3) {
        border-top: 3px solid #f59e0b !important;
        background: linear-gradient(180deg, rgba(245, 158, 11, 0.03) 0%, rgba(13, 13, 13, 0) 100%), #0d0d0d !important;
    }

    .dark .fi-wi-stats-overview-stat-value { color: #fff !important; }
    .dark h1, .dark h2, .dark h3, .dark h4, .dark h5, .dark h6, .dark .fi-header-heading { color: #fff !important; }
    .dark .fi-wi-stats-overview-stat-label { color: rgba(255, 255, 255, 0.7) !important; }

    .dark .dark\:divide-white\/10 > :not([hidden]) ~ :not([hidden]) {
        border-color: rgba(212, 175, 55, 0.1) !important;
    }

    /* ---------------------------------------------------------
       LIGHT MODE STYLES
       --------------------------------------------------------- */
    html:not(.dark) body, html:not(.dark) .fi-body, html:not(.dark) .fi-layout { background-color: #f8fafc !important; }
    
    html:not(.dark) .fi-topbar {
        background: rgba(255, 255, 255, 0.8) !important;
        backdrop-filter: blur(12px) !important;
        -webkit-backdrop-filter: blur(12px) !important;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
    }

    html:not(.dark) .fi-sidebar {
        background-color: #ffffff !important;
        border-right: 1px solid rgba(0, 0, 0, 0.05) !important;
    }

    html:not(.dark) .fi-sidebar-item button:hover,
    html:not(.dark) .fi-sidebar-item a:hover {
        background-color: rgba(212, 175, 55, 0.05) !important;
    }

    html:not(.dark) .fi-sidebar-item-active > a,
    html:not(.dark) .fi-sidebar-item-active > button {
        background: linear-gradient(90deg, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0.05) 100%) !important;
        color: #b8860b !important;
        box-shadow: inset 3px 0 0 0 #D4AF37 !important;
    }
    html:not(.dark) .fi-sidebar-item-active .fi-sidebar-item-icon { color: #b8860b !important; }

    html:not(.dark) .fi-wi-stats-overview-stat,
    html:not(.dark) .fi-ta-ctn,
    html:not(.dark) .fi-fo-component-ctn,
    html:not(.dark) .fi-panel,
    html:not(.dark) .fi-section {
        background-color: #ffffff !important;
        border: 1px solid rgba(0, 0, 0, 0.05) !important;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05) !important;
    }

    html:not(.dark) .fi-wi-stats-overview-stat:hover {
        box-shadow: 0 8px 30px rgba(212, 175, 55, 0.1) !important;
        border-color: rgba(212, 175, 55, 0.2) !important;
    }

    html:not(.dark) .fi-wi-stats-overview-stat:nth-child(1) { border-top: 3px solid #D4AF37 !important; }
    html:not(.dark) .fi-wi-stats-overview-stat:nth-child(2) { border-top: 3px solid #10b981 !important; }
    html:not(.dark) .fi-wi-stats-overview-stat:nth-child(3) { border-top: 3px solid #f59e0b !important; }

    html:not(.dark) .fi-wi-stats-overview-stat-value { color: #111827 !important; }
    html:not(.dark) h1, html:not(.dark) h2, html:not(.dark) h3, html:not(.dark) h4, html:not(.dark) h5, html:not(.dark) h6, html:not(.dark) .fi-header-heading { color: #111827 !important; }
    html:not(.dark) .fi-wi-stats-overview-stat-label { color: rgba(17, 24, 39, 0.7) !important; }

    /* ---------------------------------------------------------
       COMMON STYLES (Light & Dark)
       --------------------------------------------------------- */
    /* Sidebar Items Shape */
    .fi-sidebar-item button,
    .fi-sidebar-item a {
        border-radius: 12px !important;
        transition: all 0.3s ease !important;
        margin: 4px 12px !important;
        width: auto !important;
        padding: 0.65rem 1rem !important;
    }

    /* Cards Shape */
    .fi-wi-stats-overview-stat,
    .fi-ta-ctn,
    .fi-fo-component-ctn,
    .fi-panel,
    .fi-section {
        border-radius: 20px !important;
        overflow: hidden !important;
        transition: transform 0.2s ease, box-shadow 0.2s ease !important;
    }
    
    .fi-wi-stats-overview-stat:hover { transform: translateY(-2px) !important; }

    .fi-wi-stats-overview-stat-value {
        font-size: 2.25rem !important;
        font-weight: 700 !important;
        letter-spacing: -0.05em !important;
    }
    h1, h2, h3, h4, h5, h6, .fi-header-heading { letter-spacing: -0.02em !important; }
    .fi-wi-stats-overview-stat-label { font-size: 0.9rem !important; font-weight: 500 !important; }

    /* Remove default ring borders */
    .ring-1 { --tw-ring-shadow: 0 0 #0000 !important; }
    .dark\:ring-white\/10 { --tw-ring-color: transparent !important; }
    .dark\:ring-white\/5 { --tw-ring-color: transparent !important; }

    /* Buttons */
    .fi-btn-primary {
        background: linear-gradient(135deg, #835709 0%, #D4AF37 50%, #b8860b 100%) !important;
        color: #000 !important; 
        font-weight: 600 !important;
        border: none !important;
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.25) !important;
        border-radius: 8px !important;
    }
    .fi-btn-primary:hover { box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4) !important; }
</style>
