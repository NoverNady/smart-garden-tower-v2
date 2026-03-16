/* ════════════════════════════════════════════════════════════════════════
   Smart Garden Tower — Dashboard Logic
   Vanilla JavaScript · Modular · Data-driven
   ════════════════════════════════════════════════════════════════════════ */

/* ── Auth Guard: redirect to login if not authenticated ── */
if (sessionStorage.getItem('sgt_auth') !== 'true') {
    window.location.replace('login.html');
}

// ─────────────────────────────────────────────────────────────────────
// 1. CENTRALIZED MOCK DATA
//    Replace this object with a real API fetch to power the dashboard.
// ─────────────────────────────────────────────────────────────────────
const mockDashboardData = {
    /* ── System Overview ── */
    system: {
        status:      "dashboard.header.online", // i18n key
        temperature: 26.4,      // °C
        humidity:    68,        // %
        health:      94,        // overall health %
    },

    /* ── Water Tank ── */
    waterTank: {
        level:      72,         // %
        pH:         6.2,
        ec:         1.8,        // mS/cm (EC / TDS proxy)
        waterTemp:  22.5,       // °C
    },

    /* ── Towers (enriched IoT data) ── */
    towers: [
        {
            id: 1, plant: "Basil", growthPercent: 78, daysRemaining: 8, health: "Good",
            thumbnailUrl: "thumbs/basil.png",
            waterFlowRate: "2.5 L/hr", lightHours: 15, targetLight: 16,
            plantedDate: "Feb 1, 2026", harvestDate: "Mar 24, 2026",
            aiDiagnosis: "",
        },
        {
            id: 2, plant: "Lettuce", growthPercent: 55, daysRemaining: 18, health: "Good",
            thumbnailUrl: "thumbs/lettuce.png",
            waterFlowRate: "1.8 L/hr", lightHours: 14, targetLight: 16,
            plantedDate: "Feb 10, 2026", harvestDate: "Apr 3, 2026",
            aiDiagnosis: "",
        },
        {
            id: 3, plant: "Cherry Tomato", growthPercent: 40, daysRemaining: 25, health: "Warning",
            thumbnailUrl: "thumbs/tomato.png",
            waterFlowRate: "3.2 L/hr", lightHours: 12, targetLight: 16,
            plantedDate: "Feb 18, 2026", harvestDate: "Apr 10, 2026",
            aiDiagnosis: "AI: 15% leaf yellowing detected — Possible Iron deficiency.",
        },
        {
            id: 4, plant: "Mint", growthPercent: 90, daysRemaining: 4, health: "Good",
            thumbnailUrl: "thumbs/mint.png",
            waterFlowRate: "2.0 L/hr", lightHours: 16, targetLight: 16,
            plantedDate: "Jan 20, 2026", harvestDate: "Mar 20, 2026",
            aiDiagnosis: "",
        },
        {
            id: 5, plant: "Spinach", growthPercent: 30, daysRemaining: 28, health: "Slow Growth",
            thumbnailUrl: "thumbs/spinach.png",
            waterFlowRate: "1.5 L/hr", lightHours: 10, targetLight: 14,
            plantedDate: "Mar 1, 2026", harvestDate: "Apr 12, 2026",
            aiDiagnosis: "AI: Root development 20% below expected rate.",
        },
        {
            id: 6, plant: "Cilantro", growthPercent: 62, daysRemaining: 14, health: "Good",
            thumbnailUrl: "thumbs/cilantro.png",
            waterFlowRate: "1.9 L/hr", lightHours: 14, targetLight: 15,
            plantedDate: "Feb 15, 2026", harvestDate: "Mar 30, 2026",
            aiDiagnosis: "",
        },
    ],

    /* ── AI Diagnostic Alerts (enriched) ── */
    aiAlerts: [
        {
            severity:       "critical",
            message:        "Yellowing leaves detected in Tower 3 — Possible Iron (Fe) deficiency. Recommend adjusting nutrient solution.",
            tower:          3,
            timestamp:      "2 min ago",
            aiConfidence:   94,
            thumbnailUrl:   "https://picsum.photos/seed/leaf-yellow/120/120",
            suggestedAction:"Add 2ml Iron",
        },
        {
            severity:       "warning",
            message:        "Slow root development in Tower 5 — Consider increasing dissolved oxygen in the reservoir.",
            tower:          5,
            timestamp:      "18 min ago",
            aiConfidence:   87,
            thumbnailUrl:   "https://picsum.photos/seed/roots-slow/120/120",
            suggestedAction:"Increase O2",
        },
        {
            severity:       "info",
            message:        "Tower 4 (Mint) approaching harvest window — Estimated 4 days remaining at current growth rate.",
            tower:          4,
            timestamp:      "1 hr ago",
            aiConfidence:   98,
            thumbnailUrl:   null,
            suggestedAction:"View Feed",
        },
        {
            severity:       "warning",
            message:        "pH drift detected — pH rose from 6.0 to 6.5 over the past 6 hours. Auto-dosing engaged.",
            tower:          null,
            timestamp:      "3 hr ago",
            aiConfidence:   91,
            thumbnailUrl:   null,
            suggestedAction:"Review Logs",
        },
        {
            severity:       "info",
            message:        "All cameras operational — No pest activity detected in the last 24 hours.",
            tower:          null,
            timestamp:      "6 hr ago",
            aiConfidence:   100,
            thumbnailUrl:   null,
            suggestedAction:"View Feed",
        },
    ],

    /* ── Chart Data (7-day history) ── */
    chartData: {
        labels:     ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        phValues:   [6.1,  6.0,  6.2,  6.3,  6.1,  6.2,  6.2],
        tempValues: [22.0, 22.4, 23.1, 22.8, 22.5, 23.0, 22.5],
    },

    /* ── Quick Controls ── */
    controls: {
        waterPump:  true,
        growLights: false,
    },
};


// ─────────────────────────────────────────────────────────────────────
// 2. HELPER UTILITIES
// ─────────────────────────────────────────────────────────────────────

/**
 * Maps a health string to the corresponding BEM modifier class.
 */
function healthModifier(health) {
    const map = {
        "Good":        "good",
        "Slow Growth": "slow",
        "Warning":     "warning",
    };
    return map[health] || "good";
}

/**
 * Maps an alert severity to an icon class.
 */
function alertIcon(severity) {
    const map = {
        critical: "fa-solid fa-triangle-exclamation",
        warning:  "fa-solid fa-exclamation-circle",
        info:     "fa-solid fa-info-circle",
    };
    return map[severity] || "fa-solid fa-circle-info";
}

/**
 * Formats the current time as HH:MM:SS.
 */
function currentTime() {
    return new Date().toLocaleTimeString("en-GB", { hour12: false });
}


// ─────────────────────────────────────────────────────────────────────
// 3. RENDER FUNCTIONS  (one per dashboard section)
// ─────────────────────────────────────────────────────────────────────

/* ═══ 3-A  System Overview ═══ */
function renderOverview(data) {
    const cards = [
        {
            icon:  "fa-solid fa-power-off",
            color: "green",
            label: t("dashboard.overview.statusLabel"),
            value: t(data.status),
            sub:   t("dashboard.overview.statusSub"),
        },
        {
            icon:  "fa-solid fa-temperature-half",
            color: "orange",
            label: t("dashboard.overview.tempLabel"),
            value: `${data.temperature}°C`,
            sub:   t("dashboard.overview.tempSub"),
        },
        {
            icon:  "fa-solid fa-droplet",
            color: "blue",
            label: t("dashboard.overview.humidityLabel"),
            value: `${data.humidity}%`,
            sub:   t("dashboard.overview.humiditySub"),
        },
        {
            icon:  "fa-solid fa-heart-pulse",
            color: "teal",
            label: t("dashboard.overview.healthLabel"),
            value: `${data.health}%`,
            sub:   t("dashboard.overview.healthSub"),
        },
    ];

    document.getElementById("overviewGrid").innerHTML = cards.map(c => `
        <div class="stat-card">
            <div class="stat-card__icon stat-card__icon--${c.color}">
                <i class="${c.icon}"></i>
            </div>
            <div class="stat-card__body">
                <p class="stat-card__label">${c.label}</p>
                <p class="stat-card__value">${c.value}</p>
                <p class="stat-card__sub">${c.sub}</p>
            </div>
        </div>
    `).join("");
}


/* ═══ 3-B  Water Tank Analytics ═══ */
function renderWaterTank(data) {
    const metrics = [
        { icon: "fa-solid fa-flask",         color: "var(--clr-primary)",  value: data.pH,                   label: t("dashboard.water.ph") },
        { icon: "fa-solid fa-bolt",          color: "var(--clr-warning)",  value: `${data.ec} mS`,           label: t("dashboard.water.ec") },
        { icon: "fa-solid fa-thermometer-half", color: "var(--clr-info)", value: `${data.waterTemp}°C`,      label: t("dashboard.water.temp") },
    ];

    const circleHTML = `
        <div class="water-circle-card">
            <div class="circle-progress" style="--pct:${data.level}">
                <span class="circle-progress__label">${data.level}<span>%</span></span>
            </div>
            <p class="water-circle-card__title">${t("dashboard.water.level")}</p>
        </div>
    `;

    const metricsHTML = metrics.map(m => `
        <div class="water-metric-card">
            <div class="water-metric-card__icon" style="color:${m.color}">
                <i class="${m.icon}"></i>
            </div>
            <p class="water-metric-card__value">${m.value}</p>
            <p class="water-metric-card__label">${m.label}</p>
        </div>
    `).join("");

    document.getElementById("waterGrid").innerHTML = circleHTML + metricsHTML;
}


/* ═══ 3-C  Tower Management Grid (Advanced IoT Cards) ═══ */
function renderTowers(towers) {
    document.getElementById("towerGrid").innerHTML = towers.map(t => {
        const mod = healthModifier(t.health);

        // Build optional AI diagnosis alert box
        const aiBox = t.aiDiagnosis
            ? `<div class="tower-card__ai-alert">
                   <i class="fa-solid fa-robot"></i>
                   <span>${t.aiDiagnosis}</span>
               </div>`
            : "";

        return `
        <div class="tower-card tower-card--${mod}">
            <!-- ── Header: Thumbnail + Info ── -->
            <div class="tower-card__header">
                <img class="tower-card__thumb" src="${t.thumbnailUrl}" alt="${t.plant} snapshot" loading="lazy">
                <div class="tower-card__info">
                    <p class="tower-card__id">Tower ${t.id}</p>
                    <p class="tower-card__plant">${t.plant}</p>
                </div>
                <!-- Convert English health state to translated state -->
                <span class="tower-card__badge tower-card__badge--${mod}">
                    ${t.health === 'Good' ? t('dashboard.towers.healthGood') : 
                      t.health === 'Warning' ? t('dashboard.towers.healthWarning') : 
                      t('dashboard.towers.healthSlow')}
                </span>
            </div>

            <!-- ── Metrics Grid ── -->
            <div class="tower-card__metrics">
                <div class="tower-card__metric">
                    <i class="fa-solid fa-faucet-drip"></i>
                    <div>
                        <span class="tower-card__metric-val">${t.waterFlowRate}</span>
                        <span class="tower-card__metric-lbl">${t("dashboard.towers.waterFlow")}</span>
                    </div>
                </div>
                <div class="tower-card__metric">
                    <i class="fa-solid fa-sun"></i>
                    <div>
                        <span class="tower-card__metric-val">${t.lightHours}h / ${t.targetLight}h</span>
                        <span class="tower-card__metric-lbl">${t("dashboard.towers.lightExposure")}</span>
                    </div>
                </div>
            </div>

            <!-- ── Growth Progress ── -->
            <div class="tower-card__progress">
                <div class="tower-card__progress-label">
                    <span>${t("dashboard.towers.growthCycle")}</span>
                    <span>${t.growthPercent}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-bar__fill" style="width:${t.growthPercent}%"></div>
                </div>
            </div>

            <!-- ── Timeline & Dates ── -->
            <div class="tower-card__timeline">
                <div class="tower-card__date">
                    <i class="fa-solid fa-seedling"></i>
                    <span>${t("dashboard.towers.planted")}: <strong>${t.plantedDate}</strong></span>
                </div>
                <div class="tower-card__date">
                    <i class="fa-regular fa-calendar-check"></i>
                    <span>${t("dashboard.towers.harvest")}: <strong>${t.harvestDate}</strong></span>
                </div>
                <span class="tower-card__days-badge">
                    <i class="fa-solid fa-hourglass-half"></i> ${t.daysRemaining} ${t("dashboard.towers.daysLeft")}
                </span>
            </div>

            <!-- ── AI Diagnosis (conditional) ── -->
            ${aiBox}

            <!-- ── Action Footer ── -->
            <button class="tower-card__action" data-tower="${t.id}">
                <i class="fa-solid fa-video"></i> ${t("dashboard.towers.viewDetails")}
            </button>
        </div>`;
    }).join("");
}


/* ═══ 3-D  AI Diagnostic Center ═══ */

/** Currently active filter — mutated by filter chip clicks. */
let _activeAlertFilter = "all";

/**
 * Render the filter chip bar at the top of the diagnostic center.
 * Chips: All | Critical | Warnings | Info
 */
function renderAlertFilters() {
    const filters = [
        { key: "all",      label: t("dashboard.alertsCenter.filters.all"),       icon: "fa-solid fa-layer-group" },
        { key: "critical", label: t("dashboard.alertsCenter.filters.critical"),  icon: "fa-solid fa-triangle-exclamation" },
        { key: "warning",  label: t("dashboard.alertsCenter.filters.warning"),  icon: "fa-solid fa-exclamation-circle" },
        { key: "info",     label: t("dashboard.alertsCenter.filters.info"),       icon: "fa-solid fa-info-circle" },
    ];

    const container = document.getElementById("diagFilters");
    container.innerHTML = filters.map(f => `
        <button class="diag-chip${f.key === _activeAlertFilter ? ' diag-chip--active' : ''}" data-filter="${f.key}">
            <i class="${f.icon}"></i> ${f.label}
        </button>
    `).join("");

    // Attach click listeners
    container.querySelectorAll(".diag-chip").forEach(btn => {
        btn.addEventListener("click", () => {
            _activeAlertFilter = btn.dataset.filter;
            renderAlertFilters();
            renderAlertTickets(mockDashboardData.aiAlerts);
        });
    });
}

/**
 * Render diagnostic ticket cards, filtered by _activeAlertFilter.
 */
function renderAlertTickets(alerts) {
    const filtered = _activeAlertFilter === "all"
        ? alerts
        : alerts.filter(a => a.severity === _activeAlertFilter);

    if (filtered.length === 0) {
        document.getElementById("alertsPanel").innerHTML = `
            <div class="diag-empty">
                <i class="fa-solid fa-circle-check"></i>
                <p>${t("dashboard.alertsCenter.empty")}</p>
            </div>`;
        return;
    }

    document.getElementById("alertsPanel").innerHTML = filtered.map(a => {
        // Thumbnail column (camera snapshot or severity icon)
        const thumbHTML = a.thumbnailUrl
            ? `<img class="diag-ticket__thumb" src="${a.thumbnailUrl}" alt="AI snapshot" loading="lazy">`
            : "";

        // Confidence colour
        const confCls = a.aiConfidence >= 90 ? "high" : a.aiConfidence >= 70 ? "mid" : "low";

        // Action button style: primary for critical, outline for others
        const btnCls = a.severity === "critical" ? "diag-ticket__btn--primary" : "diag-ticket__btn--outline";

        return `
        <div class="diag-ticket diag-ticket--${a.severity}">
            <div class="diag-ticket__left">
                <div class="diag-ticket__icon diag-ticket__icon--${a.severity}">
                    <i class="${alertIcon(a.severity)}"></i>
                </div>
                ${thumbHTML}
            </div>
            <div class="diag-ticket__body">
                <p class="diag-ticket__msg">${a.message}</p>
                <div class="diag-ticket__meta">
                    ${a.tower ? `<span class="diag-ticket__tag"><i class="fa-solid fa-tower-broadcast"></i> Tower ${a.tower}</span>` : ""}
                    <span class="diag-ticket__tag"><i class="fa-regular fa-clock"></i> ${a.timestamp}</span>
                    <span class="diag-ticket__conf diag-ticket__conf--${confCls}"><i class="fa-solid fa-microchip"></i> ${t("dashboard.alertsCenter.confidence")}: ${a.aiConfidence}%</span>
                </div>
            </div>
            <div class="diag-ticket__actions">
                <button class="diag-ticket__btn ${btnCls}">
                    <!-- For simplicity, translating hardcoded suggested actions by matching key -->
                    <i class="fa-solid fa-bolt"></i> ${a.suggestedAction === "Add 2ml Iron" ? t("dashboard.alertsCenter.actions.addIron") :
                                                      a.suggestedAction === "Increase O2" ? t("dashboard.alertsCenter.actions.increaseO2") :
                                                      a.suggestedAction === "View Feed" ? t("dashboard.alertsCenter.actions.viewFeed") : 
                                                      t("dashboard.alertsCenter.actions.reviewLogs")}
                </button>
                <button class="diag-ticket__btn diag-ticket__btn--ghost">
                    <i class="fa-solid fa-xmark"></i> ${t("dashboard.alertsCenter.dismiss")}
                </button>
            </div>
        </div>`;
    }).join("");
}

/**
 * Combined entry point — renders both filter chips and tickets.
 */
function renderAlerts(alerts) {
    renderAlertFilters();
    renderAlertTickets(alerts);
}


/* ═══ 3-E  Chart.js — 7-Day Trends ═══ */
function renderChart(chartData) {
    const ctx = document.getElementById("trendsChart").getContext("2d");

    new Chart(ctx, {
        type: "line",
        data: {
            labels: chartData.labels,
            datasets: [
                {
                    label: t("dashboard.analytics.phLabel"),
                    data: chartData.phValues,
                    borderColor: "#2ecc71",
                    backgroundColor: "rgba(46,204,113,.10)",
                    borderWidth: 2.5,
                    pointRadius: 4,
                    pointBackgroundColor: "#2ecc71",
                    tension: 0.35,
                    fill: true,
                    yAxisID: "yPH",
                },
                {
                    label: t("dashboard.analytics.tempLabel"),
                    data: chartData.tempValues,
                    borderColor: "#3498db",
                    backgroundColor: "rgba(52,152,219,.08)",
                    borderWidth: 2.5,
                    pointRadius: 4,
                    pointBackgroundColor: "#3498db",
                    tension: 0.35,
                    fill: true,
                    yAxisID: "yTemp",
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: "index", intersect: false },
            plugins: {
                legend: {
                    position: "bottom", // adjust for rtl overlap
                    labels: {
                        font: { family: "Inter", size: 12, weight: 500 },
                        usePointStyle: true,
                        pointStyle: "circle",
                        padding: 20,
                    },
                },
                tooltip: {
                    backgroundColor: "#1a2332",
                    titleFont: { family: "Inter", size: 13, weight: 600 },
                    bodyFont: { family: "Inter", size: 12 },
                    padding: 12,
                    cornerRadius: 8,
                },
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { font: { family: "Inter", size: 12 }, color: "#7f8c8d" },
                },
                yPH: {
                    type: "linear",
                    position: "left",
                    title: {
                        display: true,
                        text: "pH",
                        font: { family: "Inter", size: 12, weight: 600 },
                        color: "#2ecc71",
                    },
                    min: 5.0,
                    max: 7.5,
                    ticks: { font: { family: "Inter", size: 11 }, color: "#7f8c8d" },
                    grid: { color: "rgba(0,0,0,.04)" },
                },
                yTemp: {
                    type: "linear",
                    position: "right",
                    title: {
                        display: true,
                        text: "Temp (°C)",
                        font: { family: "Inter", size: 12, weight: 600 },
                        color: "#3498db",
                    },
                    min: 18,
                    max: 28,
                    ticks: { font: { family: "Inter", size: 11 }, color: "#7f8c8d" },
                    grid: { drawOnChartArea: false },
                },
            },
        },
    });
}


/* ═══ 3-F  Quick Controls ═══ */
function renderControls(controls) {
    const items = [
        {
            key:   "waterPump",
            icon:  "fa-solid fa-faucet-drip",
            cls:   "pump",
            label: t("dashboard.controls.waterPump"),
            on:    controls.waterPump,
        },
        {
            key:   "growLights",
            icon:  "fa-solid fa-lightbulb",
            cls:   "light",
            label: t("dashboard.controls.growLights"),
            on:    controls.growLights,
        },
    ];

    document.getElementById("controlsGrid").innerHTML = items.map(c => `
        <div class="control-card">
            <div class="control-card__info">
                <div class="control-card__icon control-card__icon--${c.cls}">
                    <i class="${c.icon}"></i>
                </div>
                <div>
                    <p class="control-card__label">${c.label}</p>
                    <p class="control-card__status" id="status-${c.key}">${c.on ? t("dashboard.controls.running") : t("dashboard.controls.off")}</p>
                </div>
            </div>
            <label class="toggle">
                <input type="checkbox" ${c.on ? "checked" : ""} data-control="${c.key}">
                <span class="toggle__track"></span>
                <span class="toggle__thumb"></span>
            </label>
        </div>
    `).join("");

    // Attach toggle listeners
    const inputs = document.getElementById("controlsGrid").querySelectorAll(".toggle input");
    inputs.forEach(input => {
        // remove old listeners
        const newlyCloned = input.cloneNode(true);
        input.parentNode.replaceChild(newlyCloned, input);
        
        newlyCloned.addEventListener("change", (e) => {
            const key   = e.target.dataset.control;
            const isOn  = e.target.checked;
            // Update the centralized data
            mockDashboardData.controls[key] = isOn;
            const statusEl = document.getElementById(`status-${key}`);
            if (statusEl) statusEl.textContent = isOn ? t("dashboard.controls.running") : t("dashboard.controls.off");
        });
    });
}


// ─────────────────────────────────────────────────────────────────────
// 4. SIDEBAR NAVIGATION  (smooth-scroll & active state)
// ─────────────────────────────────────────────────────────────────────
function initNavigation() {
    const links   = document.querySelectorAll(".sidebar__link");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    links.forEach(link => {
        link.addEventListener("click", () => {
            // Update active class
            links.forEach(l => l.classList.remove("sidebar__link--active"));
            link.classList.add("sidebar__link--active");

            // Close sidebar on mobile after tap
            sidebar.classList.remove("sidebar--open");
            overlay.classList.remove("overlay--visible");
        });
    });
}


// ─────────────────────────────────────────────────────────────────────
// 5. MOBILE MENU TOGGLE
// ─────────────────────────────────────────────────────────────────────
function initMobileMenu() {
    const btn     = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");

    btn.addEventListener("click", () => {
        sidebar.classList.toggle("sidebar--open");
        overlay.classList.toggle("sidebar-overlay--visible");
    });

    overlay.addEventListener("click", () => {
        sidebar.classList.remove("sidebar--open");
        overlay.classList.remove("sidebar-overlay--visible");
    });
}


// ─────────────────────────────────────────────────────────────────────
// 6. LIVE CLOCK
// ─────────────────────────────────────────────────────────────────────
function initClock() {
    const headerClock = document.getElementById("headerClock");
    const topbarClock = document.getElementById("topbarClock");

    function tick() {
        const t = currentTime();
        if (headerClock) headerClock.textContent = t;
        if (topbarClock) topbarClock.textContent = t;
    }

    tick();
    setInterval(tick, 1000);
}


// ─────────────────────────────────────────────────────────────────────
// 7. BOOTSTRAP — ENTRY POINT
// ─────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    const d = mockDashboardData;

    // Render every section from the centralized data object
    renderOverview(d.system);
    renderWaterTank(d.waterTank);
    renderTowers(d.towers);
    renderAlerts(d.aiAlerts);
    renderChart(d.chartData);
    renderControls(d.controls);

    // UI behaviours
    initNavigation();
    initMobileMenu();
    initClock();
    initLogout();

    window.addEventListener('languageChanged', () => {
        // We already have applyTranslations called naturally via the HTML button,
        // but it doesn't hook into Chart.js or dynamically generated code directly 
        // because those strings are injected via JS after window load. 
        // Thus, we re-render entirely.
        
        // Remove existing chart instance if any to prevent canvas in use errors
        const oldChartObj = Chart.getChart(document.getElementById("trendsChart"));
        if(oldChartObj) oldChartObj.destroy();
        
        const d = mockDashboardData;
        renderOverview(d.system);
        renderWaterTank(d.waterTank);
        renderTowers(d.towers);
        renderAlerts(d.aiAlerts);
        renderChart(d.chartData);
        renderControls(d.controls);
    });
});

// ─────────────────────────────────────────────────────────────────────
// 8. LOGOUT
// ─────────────────────────────────────────────────────────────────────
function initLogout() {
    const btn = document.getElementById("logoutBtn");
    if (btn) {
        btn.addEventListener("click", () => {
            sessionStorage.removeItem("sgt_auth");
            window.location.replace("login.html");
        });
    }
}
