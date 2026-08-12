<x-filament-panels::page.simple>
    <style>
        /* Reset body and html to avoid any default gaps */
        html, body { 
            background: #000 !important; 
            font-family: 'Outfit', sans-serif !important; 
            margin: 0 !important;
            padding: 0 !important;
        }

        .fi-simple-layout,
        .fi-simple-main-ctn,
        .fi-simple-main { background: #000 !important; margin: 0 !important; padding: 0 !important; }

        /* Aggressively hide any Filament topbar, header or footer */
        .fi-topbar,
        .fi-simple-layout-header,
        .fi-simple-header,
        .fi-simple-layout > footer,
        footer.fi-footer,
        nav { display: none !important; height: 0 !important; overflow: hidden !important; }

        .fi-simple-main {
            max-width: 100% !important;
            padding: 0 !important;
        }

        .fi-simple-page { padding: 0 !important; margin: 0 !important; }

        /* Inputs */
        .fi-input, .fi-input-wrp input {
            background: #111 !important;
            border-color: rgba(212,175,55,0.25) !important;
            color: #fff !important;
            padding-top: 0.45rem !important;
            padding-bottom: 0.45rem !important;
            font-size: 0.82rem !important;
            min-height: 0 !important;
            height: auto !important;
        }
        .fi-input:focus, .fi-input-wrp input:focus {
            border-color: rgba(212,175,55,0.7) !important;
            box-shadow: 0 0 0 3px rgba(212,175,55,0.08) !important;
            outline: none !important;
        }
        .fi-input::placeholder { color: rgba(255,255,255,0.2) !important; }

        /* Labels & links */
        .fi-fo-field-wrp label { color: rgba(255,255,255,0.6) !important; font-size:0.78rem !important; }
        .fi-link, a.fi-link { color: rgba(212,175,55,0.7) !important; font-size: 0.75rem !important; }
        .fi-link:hover { color: #D4AF37 !important; }
        input[type="checkbox"] { accent-color: #D4AF37 !important; width: 13px !important; height: 13px !important; }

        /* Submit button */
        .fi-btn-primary, button[type="submit"] {
            background: linear-gradient(135deg, #835709 0%, #D4AF37 50%, #b8860b 100%) !important;
            color: #000 !important; font-weight: 700 !important;
            font-size: 0.78rem !important; letter-spacing: 0.1em !important;
            text-transform: uppercase !important; border: none !important;
            border-radius: 7px !important;
            padding: 0.6rem 1.5rem !important;
            box-shadow: 0 4px 20px rgba(212,175,55,0.3) !important;
            transition: all 0.25s ease !important;
        }
        .fi-btn-primary:hover, button[type="submit"]:hover {
            transform: translateY(-1px) !important;
            box-shadow: 0 8px 30px rgba(212,175,55,0.45) !important;
        }

        @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
        }

        /* Responsive */
        @media (max-width: 768px) {
            .pocimas-image-side { display: none !important; }
            .pocimas-form-side  { max-width: 100% !important; flex: 1 !important; }
        }
    </style>

    {{-- Single root: full-screen split wrapper --}}
    <div style="display:flex;min-height:100vh;width:100%;background:#000;overflow:hidden;">

        {{-- LEFT: form panel --}}
        <div class="pocimas-form-side"
             style="flex:0 0 50%;max-width:50%;min-height:100vh;background:#000;display:flex;flex-direction:column;justify-content:center;padding:3rem 4rem;border-right:1px solid rgba(212,175,55,0.12);animation:fadeInUp 0.6s ease both;">

            {{-- Brand --}}
            <div style="display:flex;align-items:center;justify-content:flex-start;margin-bottom:2rem;">
                <img src="/logo.png" alt="Pócimas Logo" style="max-height: 120px; width: auto; object-fit: contain;">
            </div>

            {{-- Divider --}}
            <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.75rem;">
                <div style="flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(212,175,55,0.25),transparent);"></div>
                <span style="color:rgba(212,175,55,0.35);font-size:0.5rem;">✦</span>
                <div style="flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(212,175,55,0.25),transparent);"></div>
            </div>

            {{-- Heading --}}
            <div style="margin-bottom:1.75rem;">
                <h2 style="font-size:1.5rem;font-weight:600;color:#fff;margin:0 0 0.35rem;letter-spacing:-0.02em;">Bienvenue</h2>
                <p style="font-size:0.78rem;color:rgba(255,255,255,0.35);margin:0;line-height:1.5;">Connectez-vous à votre espace de gestion</p>
            </div>

            {{-- Filament form (rendered by Livewire component) --}}
            {{ $this->content }}


        </div>

        {{-- RIGHT: image panel --}}
        <div class="pocimas-image-side"
             style="flex:1;position:relative;min-height:100vh;background-image:url('/admin-login-bg.png');background-size:cover;background-position:center;overflow:hidden;">

            <div style="position:absolute;inset:0;background:linear-gradient(to right,rgba(0,0,0,0.55) 0%,rgba(0,0,0,0.1) 50%,rgba(0,0,0,0.45) 100%);z-index:1;"></div>

            {{-- Centered badge --}}
            <div style="position:absolute;inset:0;z-index:2;display:flex;align-items:center;justify-content:center;">
                <div style="text-align:center;">
                    <div style="font-size:0.6rem;color:rgba(212,175,55,0.6);letter-spacing:0.4em;text-transform:uppercase;margin-bottom:1rem;">Fine Dining Experience</div>
                    <div style="width:30px;height:1px;background:rgba(212,175,55,0.5);margin:0 auto;"></div>
                </div>
            </div>

            {{-- Bottom quote --}}
            <div style="position:absolute;bottom:3rem;left:3rem;right:3rem;z-index:2;">
                <p style="font-size:0.9rem;color:rgba(255,255,255,0.8);font-style:italic;line-height:1.7;margin:0 0 0.65rem;font-weight:300;text-shadow:0 2px 10px rgba(0,0,0,0.6);max-width:380px;">
                    "L'art culinaire est une forme de génie qui requiert à la fois technique et passion."
                </p>
                <div style="width:35px;height:1px;background:rgba(212,175,55,0.65);margin-bottom:0.5rem;"></div>
                <span style="font-size:0.65rem;color:rgba(212,175,55,0.7);letter-spacing:0.15em;text-transform:uppercase;">— Pócimas, Fine Dining</span>
            </div>
        </div>

    </div>
</x-filament-panels::page.simple>
