/* MeyPlanner – all-in-one itinerary & visual trip planner
 * Plain JavaScript, no build step. Runs in browsers, Electron (Windows) and Capacitor (Android).
 */
(() => {
'use strict';

// ---------- Utilities ----------
const $ = (s, r = document) => r.querySelector(s);
const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const DAY_COLORS = ['#0F9D8C', '#2563EB', '#FF7A59', '#9333EA', '#E11D48', '#CA8A04', '#0891B2', '#16A34A', '#DB2777', '#4F46E5'];
const COVERS = ['linear-gradient(135deg,#0F9D8C,#2563EB)', 'linear-gradient(135deg,#FF7A59,#E11D48)', 'linear-gradient(135deg,#9333EA,#2563EB)', 'linear-gradient(135deg,#16A34A,#0891B2)', 'linear-gradient(135deg,#CA8A04,#FF7A59)', 'linear-gradient(135deg,#0891B2,#4F46E5)'];
const TYPES = { place: '📍', food: '🍜', hotel: '🏨', flight: '✈️', transport: '🚆', activity: '🎟️', note: '📝' };
const CAT_TYPE = { sights: 'place', food: 'food', nature: 'place', culture: 'place', shopping: 'activity', fun: 'activity' };
const EXP_CATS = ['Food', 'Lodging', 'Transport', 'Activities', 'Shopping', 'Other'];
const CURRENCIES = ['MYR', 'SGD', 'USD', 'EUR', 'GBP', 'JPY', 'KRW', 'THB', 'IDR', 'AUD', 'CNY', 'INR', 'PHP', 'VND'];
const todayISO = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const isoUTC = (iso) => { const [y, m, d] = iso.split('-').map(Number); return Date.UTC(y, m - 1, d); };
const addDays = (iso, n) => new Date(isoUTC(iso) + n * 86400000).toISOString().slice(0, 10);
const daysBetween = (a, b) => Math.round((isoUTC(b) - isoUTC(a)) / 86400000);
const fmtDate = (iso, opt = { weekday: 'short', day: 'numeric', month: 'short' }) => iso ? new Date(iso + 'T00:00:00').toLocaleDateString(undefined, opt) : '';
const fmtRange = (t) => t.start ? `${fmtDate(t.start, { day: 'numeric', month: 'short' })} – ${fmtDate(t.end, { day: 'numeric', month: 'short', year: 'numeric' })}` : 'No dates';
const money = (n, cur) => { try { return new Intl.NumberFormat(undefined, { style: 'currency', currency: cur || S.settings.currency, maximumFractionDigits: 2 }).format(n || 0); } catch { return (cur || '') + ' ' + (+n || 0).toFixed(2); } };
const hav = (a, b) => { const R = 6371, r = x => x * Math.PI / 180; const dLat = r(b[0] - a[0]), dLng = r(b[1] - a[1]); const h = Math.sin(dLat / 2) ** 2 + Math.cos(r(a[0])) * Math.cos(r(b[0])) * Math.sin(dLng / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(h)); };
const hasLL = (i) => typeof i.lat === 'number' && typeof i.lng === 'number' && !isNaN(i.lat);
const timeAdd = (t, hrs) => { const [h, m] = t.split(':').map(Number); const tot = Math.round(h * 60 + m + hrs * 60); return `${String(Math.floor(tot / 60) % 24).padStart(2, '0')}:${String(tot % 60).padStart(2, '0')}`; };

function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 2400); }

// ---------- State ----------
const KEY = 'meyplanner.v1';
const S = {
  trips: [],
  settings: { name: 'Me', currency: 'MYR', theme: 'light', syncUrl: '' },
  view: { screen: 'home', homeTab: 'trips', tripId: null, tab: 'plan', showMap: false, addTarget: null, collapsed: {} },
};
function load() {
  try { const d = JSON.parse(localStorage.getItem(KEY) || '{}'); if (d.trips) S.trips = d.trips.map(normalizeTrip); if (d.settings) Object.assign(S.settings, d.settings); } catch (e) { console.warn(e); }
}
function save(trip) {
  try { localStorage.setItem(KEY, JSON.stringify({ trips: S.trips, settings: S.settings })); } catch (e) { toast('Could not save – storage full?'); }
  if (trip && trip.shareCode) Sync.queuePush(trip);
}
function normalizeTrip(t) {
  t.days = (t.days || []).map(d => ({ ...d, items: d.items || [] }));
  t.ideas = t.ideas || []; t.reservations = t.reservations || []; t.expenses = (t.expenses || []).map(e => ({ ...e, split: e.split || [] }));
  t.members = t.members && t.members.length ? t.members : [S.settings.name || 'Me'];
  t.notes = t.notes || ''; t.cover = t.cover ?? Math.floor(Math.random() * COVERS.length);
  t.currency = t.currency || S.settings.currency; t.budget = +t.budget || 0;
  return t;
}
const trip = () => S.trips.find(t => t.id === S.view.tripId);
function newTrip({ name, dest, start, end, center }) {
  const t = normalizeTrip({ id: uid(), name: name || `Trip to ${dest || 'somewhere'}`, dest: dest || '', start, end, center: center || null, created: Date.now() });
  syncDays(t); S.trips.unshift(t); save(t); return t;
}
function syncDays(t) {
  if (!t.start || !t.end) { if (!t.days.length) t.days.push({ id: uid(), date: null, items: [], title: '' }); return; }
  if (t.end < t.start) t.end = t.start;
  const n = daysBetween(t.start, t.end) + 1;
  while (t.days.length < n) t.days.push({ id: uid(), date: null, items: [], title: '' });
  while (t.days.length > n) { const d = t.days.pop(); t.ideas.push(...d.items); }
  t.days.forEach((d, i) => d.date = addDays(t.start, i));
}
function findItem(t, id) {
  for (const d of t.days) { const i = d.items.findIndex(x => x.id === id); if (i > -1) return { list: d.items, idx: i, day: d }; }
  const i = t.ideas.findIndex(x => x.id === id); if (i > -1) return { list: t.ideas, idx: i, day: null };
  return null;
}
const listFor = (t, key) => key === 'ideas' ? t.ideas : (t.days.find(d => d.id === key) || {}).items;

// ---------- Live collaboration (Firebase Realtime Database REST + SSE) ----------
const Sync = {
  clientId: uid(), es: null, code: null, status: 'off', timer: null,
  base() { return (S.settings.syncUrl || '').trim().replace(/\/+$/, ''); },
  url(code) { return `${this.base()}/meyplanner/${encodeURIComponent(code)}.json`; },
  enabled() { return /^https:\/\//.test(this.base()); },
  queuePush(t) { if (!this.enabled()) return; clearTimeout(this.timer); this.timer = setTimeout(() => this.push(t), 500); },
  async push(t) {
    t.rev = Date.now(); t.by = this.clientId;
    try { await fetch(this.url(t.shareCode), { method: 'PUT', body: JSON.stringify(t) }); this.setStatus('live'); localStorage.setItem(KEY, JSON.stringify({ trips: S.trips, settings: S.settings })); }
    catch (e) { this.setStatus('error'); }
  },
  connect(t) {
    if (!t || !t.shareCode || !this.enabled()) return this.disconnect();
    if (this.code === t.shareCode && this.es) return;
    this.disconnect(); this.code = t.shareCode;
    try {
      this.es = new EventSource(this.url(t.shareCode));
      this.es.onopen = () => this.setStatus('live');
      this.es.onerror = () => this.setStatus('error');
      this.es.addEventListener('put', (e) => {
        const msg = JSON.parse(e.data); if (msg.path !== '/' || !msg.data) return;
        const remote = msg.data, local = S.trips.find(x => x.shareCode === this.code);
        if (!local || remote.by === this.clientId || (remote.rev || 0) <= (local.rev || 0)) return;
        const merged = normalizeTrip({ ...remote, id: local.id, shareCode: local.shareCode });
        S.trips[S.trips.indexOf(local)] = merged;
        localStorage.setItem(KEY, JSON.stringify({ trips: S.trips, settings: S.settings }));
        if (S.view.tripId === merged.id && !Drag.active && !$('.backdrop')) render();
        toast('Trip updated by a collaborator');
      });
      this.es.addEventListener('patch', () => this.refetch());
    } catch (e) { this.setStatus('error'); }
  },
  async refetch() {
    const local = S.trips.find(x => x.shareCode === this.code); if (!local) return;
    const r = await fetch(this.url(this.code)); const remote = await r.json();
    if (remote && (remote.rev || 0) > (local.rev || 0)) { S.trips[S.trips.indexOf(local)] = normalizeTrip({ ...remote, id: local.id, shareCode: local.shareCode }); save(); render(); }
  },
  disconnect() { if (this.es) this.es.close(); this.es = null; this.code = null; this.setStatus('off'); },
  setStatus(s) { this.status = s; document.querySelectorAll('.status-dot').forEach(el => el.classList.toggle('live', s === 'live')); },
  async join(code) {
    const r = await fetch(this.url(code)); const remote = await r.json();
    if (!remote) throw new Error('No trip found for that code');
    let t = S.trips.find(x => x.shareCode === code);
    if (t) { Object.assign(t, normalizeTrip({ ...remote, id: t.id, shareCode: code })); }
    else { t = normalizeTrip({ ...remote, id: uid(), shareCode: code }); S.trips.unshift(t); }
    if (!t.members.includes(S.settings.name)) t.members.push(S.settings.name);
    save(t); return t;
  }
};

// ---------- Map ----------
const MapView = {
  map: null, layer: null, picking: false, el: null,
  ready() { return typeof window.L !== 'undefined'; },
  mount(container) {
    if (!this.ready()) { container.innerHTML = `<div class="map-fallback"><div><div class="big">🗺️</div>Map needs an internet connection.<br><span class="small">Your itinerary still works offline.</span></div></div>`; return; }
    if (this.map && this.el && container.contains(this.el)) return;
    if (!this.el) {
      this.el = document.createElement('div'); this.el.id = 'map';
      this.map = L.map(this.el, { zoomControl: true, attributionControl: true }).setView([3.139, 101.6869], 11);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19, subdomains: 'abcd',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }).addTo(this.map);
      this.layer = L.layerGroup().addTo(this.map);
      this.map.on('click', (e) => { if (this.picking) { this.picking = false; render(); addPlaceAt(e.latlng.lat, e.latlng.lng); } });
    }
    container.prepend(this.el);
    setTimeout(() => this.map.invalidateSize(), 50);
  },
  draw(t, fit = true) {
    if (!this.map) return;
    this.layer.clearLayers(); const pts = [];
    const pin = (color, label) => L.divIcon({ className: '', html: `<div class="pin" style="background:${color}"><span>${label}</span></div>`, iconSize: [28, 28], iconAnchor: [14, 28], popupAnchor: [0, -26] });
    t.days.forEach((d, di) => {
      const c = DAY_COLORS[di % DAY_COLORS.length]; const line = [];
      d.items.filter(hasLL).forEach((it, n) => {
        const ll = [it.lat, it.lng]; line.push(ll); pts.push(ll);
        L.marker(ll, { icon: pin(c, n + 1) }).addTo(this.layer)
          .bindPopup(`<b>${esc(it.name)}</b><br><span style="color:${c}">Day ${di + 1}</span>${it.time ? ' · ' + esc(it.time) : ''}<br><a href="#" data-edit="${it.id}">Edit</a>`);
      });
      if (line.length > 1) L.polyline(line, { color: c, weight: 4, opacity: .8, dashArray: '1 8', lineCap: 'round' }).addTo(this.layer);
    });
    t.ideas.filter(hasLL).forEach(it => { pts.push([it.lat, it.lng]); L.marker([it.lat, it.lng], { icon: pin('#94A3B8', '★') }).addTo(this.layer).bindPopup(`<b>${esc(it.name)}</b><br>Places to visit<br><a href="#" data-edit="${it.id}">Edit</a>`); });
    if (fit) {
      if (pts.length > 1) this.map.fitBounds(pts, { padding: [50, 50], maxZoom: 15 });
      else if (pts.length === 1) this.map.setView(pts[0], 14);
      else if (t.center) this.map.setView(t.center, 12);
    }
  },
  focus(it) { if (this.map && hasLL(it)) { this.map.setView([it.lat, it.lng], 15); } }
};
function loadLeaflet() {
  const tryLoad = (base) => new Promise((ok, fail) => {
    const css = document.createElement('link'); css.rel = 'stylesheet'; css.href = base + 'leaflet.css'; document.head.appendChild(css);
    const s = document.createElement('script'); s.src = base + 'leaflet.js'; s.onload = ok; s.onerror = () => { css.remove(); s.remove(); fail(); }; document.head.appendChild(s);
  });
  return tryLoad('vendor/leaflet/').catch(() => tryLoad('https://unpkg.com/leaflet@1.9.4/dist/')).catch(() => null)
    .then(() => { if (S.view.screen === 'trip') render(); });
}

// ---------- Geocoding (OpenStreetMap Nominatim) ----------
async function geocode(q, near) {
  const params = new URLSearchParams({ q, format: 'json', limit: '8', addressdetails: '0' });
  if (near) { const [la, ln] = near; params.set('viewbox', `${ln - 1},${la + 1},${ln + 1},${la - 1}`); }
  const r = await fetch('https://nominatim.openstreetmap.org/search?' + params, { headers: { 'Accept-Language': navigator.language || 'en' } });
  if (!r.ok) throw new Error('Search failed'); return r.json();
}

// ---------- Worldwide destinations (built-in library + live OpenStreetMap lookup) ----------
const PLACES_KEY = 'meyplanner.places.v1';
try { Object.assign(MP_DESTINATIONS, JSON.parse(localStorage.getItem(PLACES_KEY) || '{}')); } catch {}
const destNames = () => Object.keys(MP_DESTINATIONS).sort((a, b) => a.localeCompare(b));
function libFor(name) {
  if (!name) return null; const n = name.trim().toLowerCase();
  const k = Object.keys(MP_DESTINATIONS).find(x => x.toLowerCase() === n) || Object.keys(MP_DESTINATIONS).find(x => x.toLowerCase().split(/ & | \(|, /)[0] === n.split(',')[0]);
  return k ? Object.assign(MP_DESTINATIONS[k], { _name: k }) : null;
}
const REGIONS = ['Malaysia', 'Asia', 'Middle East', 'Europe', 'Americas', 'Oceania', 'Africa', 'Online'];
function osmCat(t) {
  if (t.amenity === 'marketplace' || t.amenity === 'food_court') return 'food';
  if (t.tourism === 'theme_park' || t.tourism === 'zoo' || t.tourism === 'aquarium') return 'fun';
  if (t.tourism === 'museum' || t.tourism === 'gallery' || t.historic || t.amenity === 'place_of_worship') return 'culture';
  if (t.leisure || t.natural || t.tourism === 'viewpoint') return 'nature';
  if (t.shop) return 'shopping';
  return 'sights';
}
const CAT_HOURS = { culture: 1.5, nature: 1.5, sights: 1, food: 1, fun: 3, shopping: 1.5 };
async function fetchDestination(query) {
  const geo = await geocode(query); if (!geo.length) throw new Error(`Couldn't find “${query}”`);
  const g = geo[0], lat = +g.lat, lng = +g.lon, bb = (g.boundingbox || []).map(Number);
  const diag = bb.length === 4 ? hav([bb[0], bb[2]], [bb[1], bb[3]]) : 10;
  const R = Math.round(Math.max(3, Math.min(20, diag / 2)) * 1000);
  const A = `(around:${R},${lat},${lng})`;
  const q = `[out:json][timeout:25];(
    nwr${A}["tourism"~"^(attraction|museum|viewpoint|theme_park|zoo|gallery|aquarium)$"]["name"];
    nwr${A}["historic"~"^(castle|monument|palace|fort|ruins|archaeological_site|memorial|city_gate)$"]["name"]["wikidata"];
    nwr${A}["amenity"="marketplace"]["name"];
    nwr${A}["amenity"="place_of_worship"]["name"]["wikipedia"];
    nwr${A}["leisure"~"^(park|garden|nature_reserve)$"]["name"]["wikidata"];
    nwr${A}["natural"~"^(beach|peak|waterfall)$"]["name"]["wikidata"];
  );out center tags 400;`;
  const r = await fetch('https://overpass-api.de/api/interpreter', { method: 'POST', body: 'data=' + encodeURIComponent(q), headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
  if (!r.ok) throw new Error('Place service is busy – try again in a minute');
  const data = await r.json(); const seen = new Set();
  const scored = data.elements.map(e => {
    const t = e.tags || {}, name = t['name:en'] || t.name, la = e.lat ?? e.center?.lat, ln = e.lon ?? e.center?.lon;
    const langs = Object.keys(t).filter(k => k.startsWith('name:')).length;
    const score = (t.wikipedia ? 6 : 0) + (t.wikidata ? 3 : 0) + Math.min(langs, 30) / 3 + (t.tourism === 'attraction' ? 1 : 0) + (t.heritage ? 2 : 0) + (t.tourism === 'museum' ? 1 : 0);
    return { name, la, ln, score, cat: osmCat(t) };
  }).filter(p => p.name && p.la != null && !/^\d+$/.test(p.name)).sort((a, b) => b.score - a.score)
    .filter(p => { const k = p.name.toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; }).slice(0, 30);
  if (scored.length < 3) throw new Error(`Not enough well-known places found near “${query}”. Try a bigger city nearby.`);
  const name = g.name || query.split(',')[0].trim(); const country = (g.display_name || '').split(',').pop().trim();
  const entry = { region: 'Online', country, currency: S.settings.currency, center: [lat, lng], online: true,
    places: scored.map(p => [p.name, p.cat, +p.la.toFixed(5), +p.ln.toFixed(5), CAT_HOURS[p.cat] || 1.5]) };
  MP_DESTINATIONS[name] = entry;
  try { const c = JSON.parse(localStorage.getItem(PLACES_KEY) || '{}'); c[name] = entry; localStorage.setItem(PLACES_KEY, JSON.stringify(c)); } catch {}
  return Object.assign(entry, { _name: name });
}

// ---------- Destination picker (custom, scrollable – native <datalist> can't scroll in Electron) ----------
function destPickerHTML(id, value, placeholder) {
  return `<div class="dp"><input class="input" id="${id}" value="${esc(value || '')}" placeholder="${esc(placeholder)}" autocomplete="off" spellcheck="false"><div class="dp-list" hidden></div></div>`;
}
function destMatches(q) {
  q = q.trim().toLowerCase();
  const names = destNames();
  if (!q) return names;
  const hay = n => { const d = MP_DESTINATIONS[n]; return [n, d.country || '', (d.tags || []).join(' ')].join(' ').toLowerCase(); };
  return names.filter(n => hay(n).includes(q))
    .sort((a, b) => (b.toLowerCase().startsWith(q) - a.toLowerCase().startsWith(q)) || ((MP_DESTINATIONS[b].country || '').toLowerCase().startsWith(q) - (MP_DESTINATIONS[a].country || '').toLowerCase().startsWith(q)) || a.localeCompare(b));
}
function attachDestPicker(root, id, onChange, allowOnline) {
  const inp = root.querySelector('#' + id), list = inp.nextElementSibling; let active = -1;
  const row = n => { const d = MP_DESTINATIONS[n]; return `<div class="dp-item" data-v="${esc(n)}"><span>${esc(n)}</span><span class="muted small">${esc(d.country || '')}</span></div>`; };
  const draw = () => {
    const raw = inp.value.trim(), names = destMatches(raw); let html = '';
    if (!raw) {
      html = `<div class="dp-count">${names.length} destinations · type to search city, country or theme</div>`;
      [...REGIONS, undefined].forEach(r => {
        const g = names.filter(n => (MP_DESTINATIONS[n].region || undefined) === r); if (!g.length) return;
        html += `<div class="dp-head">${r === 'Online' ? 'Saved from live search' : (r || 'Other')}</div>` + g.map(row).join('');
      });
    } else {
      html = names.map(row).join('');
      if (!libFor(raw)) html += `<div class="dp-item dp-online" data-v="${esc(raw)}"><span>🌍 Use “${esc(raw)}”</span><span class="muted small">${allowOnline ? 'find top places online' : 'custom destination'}</span></div>`;
    }
    list.innerHTML = html; list.hidden = false; active = -1;
  };
  const pick = (v) => { inp.value = v; list.hidden = true; onChange && onChange(); };
  inp.addEventListener('focus', draw);
  inp.addEventListener('click', () => { if (list.hidden) draw(); });
  inp.addEventListener('input', () => { draw(); onChange && onChange(); });
  inp.addEventListener('blur', () => setTimeout(() => { list.hidden = true; }, 180));
  list.addEventListener('mousedown', (e) => e.preventDefault());
  list.addEventListener('click', (e) => { const it = e.target.closest('.dp-item'); if (it) { pick(it.dataset.v); inp.blur(); } });
  inp.addEventListener('keydown', (e) => {
    const items = [...list.querySelectorAll('.dp-item')];
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault(); if (list.hidden) draw();
      active = Math.max(0, Math.min(items.length - 1, active + (e.key === 'ArrowDown' ? 1 : -1)));
      items.forEach((x, i) => x.classList.toggle('on', i === active)); items[active]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter' && !list.hidden && items[active]) { e.preventDefault(); pick(items[active].dataset.v); }
    else if (e.key === 'Escape' && !list.hidden) { e.stopPropagation(); list.hidden = true; }
  });
}

// ---------- Rendering ----------
function render() {
  document.documentElement.dataset.theme = S.settings.theme;
  const app = $('#app');
  const keepScroll = $('.side-body')?.scrollTop, keepPage = $('.page')?.scrollTop;
  if (S.view.screen === 'trip' && trip()) {
    // Detach the map element so it survives re-render.
    if (MapView.el && MapView.el.parentNode) MapView.el.parentNode.removeChild(MapView.el);
    app.innerHTML = topbar() + tripScreen(trip());
    MapView.mount($('.mapwrap'));
    MapView.draw(trip(), !render._sameTrip);
    render._sameTrip = true;
    Sync.connect(trip());
    if (keepScroll) $('.side-body').scrollTop = keepScroll;
  } else {
    S.view.screen = 'home'; render._sameTrip = false; Sync.disconnect();
    if (MapView.el && MapView.el.parentNode) MapView.el.parentNode.removeChild(MapView.el);
    app.innerHTML = topbar() + `<div class="page"><div class="wrap">${S.view.homeTab === 'explore' ? exploreView() : S.view.homeTab === 'settings' ? settingsView() : homeView()}</div></div>` + bottomNav();
    if (keepPage) $('.page').scrollTop = keepPage;
  }
}

function topbar() {
  const onTrip = S.view.screen === 'trip';
  const tab = S.view.homeTab;
  return `<div class="topbar">
    <div class="brand" data-act="home"><img src="icons/icon-64.png" alt="MP"><span>Mey<b>Planner</b></span></div>
    <div class="nav">${[['trips', 'My trips'], ['explore', 'Explore'], ['settings', 'Settings']].map(([k, l]) => `<button data-act="hometab" data-k="${k}" class="${!onTrip && tab === k ? 'on' : ''}">${l}</button>`).join('')}</div>
    <div class="spacer"></div>
    ${onTrip ? `<span class="status-dot ${Sync.status === 'live' ? 'live' : ''}" title="Live sync status"></span>
      <button class="btn sm" data-act="share-tab">👥 Share</button>` : `<button class="btn primary sm" data-act="new-trip">＋ New trip</button>`}
  </div>`;
}
function bottomNav() {
  return `<div class="bottom-nav">${[['trips', '🧳', 'Trips'], ['explore', '🧭', 'Explore'], ['draft', '⚡', 'Quick draft'], ['settings', '⚙️', 'Settings']].map(([k, i, l]) =>
    `<button data-act="${k === 'draft' ? 'quick-draft' : 'hometab'}" data-k="${k}" class="${S.view.homeTab === k ? 'on' : ''}"><b>${i}</b>${l}</button>`).join('')}</div>`;
}

function tripCard(t) {
  const stops = t.days.reduce((a, d) => a + d.items.length, 0);
  return `<div class="card" data-act="open-trip" data-id="${t.id}">
    <div class="cover" style="background:${COVERS[t.cover % COVERS.length]}">${esc(t.dest || t.name)}</div>
    <div class="body"><div style="font-weight:700">${esc(t.name)}</div>
      <div class="meta"><span>📅 ${fmtRange(t)}</span><span>📍 ${stops} stops</span><span>👥 ${t.members.length}</span>${t.shareCode ? '<span class="chip">Live</span>' : ''}</div></div></div>`;
}
function homeView() {
  const upcoming = S.trips.filter(t => !t.end || t.end >= todayISO()), past = S.trips.filter(t => t.end && t.end < todayISO());
  return `<div class="hero"><div><h1>Hi ${esc(S.settings.name)}, where to next?</h1><p>Plan day by day on a map, import bookings, split costs and plan together.</p></div>
      <div class="actions"><button class="btn accent" data-act="quick-draft">⚡ Quick draft itinerary</button><button class="btn" data-act="new-trip">＋ Start from scratch</button><button class="btn" data-act="join-trip">🔗 Join with code</button></div></div>
    <div class="section-title"><h2>Upcoming trips</h2><button class="btn sm ghost" data-act="import-file">⬆ Import trip file</button></div>
    ${upcoming.length ? `<div class="grid">${upcoming.map(tripCard).join('')}</div>` : `<div class="empty">No trips yet. Try <b>Quick draft</b> to get a full itinerary in seconds, or browse <a href="#" data-act="hometab" data-k="explore">Explore</a> for inspiration.</div>`}
    ${past.length ? `<div class="section-title"><h2>Past trips</h2></div><div class="grid">${past.map(tripCard).join('')}</div>` : ''}
    <div class="section-title"><h2>Inspiration from other travelers</h2><button class="btn sm ghost" data-act="hometab" data-k="explore">See all →</button></div>
    <div class="grid">${MP_GUIDES.slice(0, 4).map(guideCard).join('')}</div>`;
}
function guideCard(g, i) {
  const stops = g.days.flat().length;
  return `<div class="card" data-act="open-guide" data-id="${g.id}">
    <div class="cover" style="background:${COVERS[(MP_GUIDES.indexOf(g)) % COVERS.length]}">${esc(g.dest)}</div>
    <div class="body"><div style="font-weight:700">${esc(g.title)}</div>
    <div class="meta"><span>by ${esc(g.author)}</span><span>${g.days.length} days · ${stops} stops</span><span>♥ ${g.likes.toLocaleString()}</span></div>
    <div class="row wrap" style="margin-top:8px;gap:6px">${g.tags.map(x => `<span class="chip">${esc(x)}</span>`).join('')}</div></div></div>`;
}
function exploreView() {
  const q = (S.view.exploreQ || '').toLowerCase();
  const reg = S.view.exploreRegion || 'All';
  const list = MP_GUIDES.filter(g => {
    const d = MP_DESTINATIONS[g.dest] || {}; if (reg !== 'All' && d.region !== reg) return false;
    if (S.view.exploreCountry && d.country !== S.view.exploreCountry) return false;
    return !q || [g.title, g.dest, g.tags.join(' '), d.country || '', (d.tags || []).join(' '), g.days.flat().join(' ')].join(' ').toLowerCase().includes(q);
  }).sort((a, b) => (b.author !== 'MeyPlanner Picks') - (a.author !== 'MeyPlanner Picks') || b.likes - a.likes);
  const regions = ['All', ...REGIONS.filter(r => Object.values(MP_DESTINATIONS).some(d => d.region === r))];
  return `<div class="section-title" style="margin-top:0"><h2>Explore ${Object.keys(MP_DESTINATIONS).length} destinations worldwide</h2></div>
    <input class="input" placeholder="Search city, country or theme – e.g. Japan, Umrah, beach, food…" value="${esc(S.view.exploreQ || '')}" data-input="exploreQ" style="max-width:460px;margin-bottom:12px">
    <div class="row wrap" style="gap:6px;margin-bottom:${reg === 'All' ? 16 : 8}px">${regions.map(r => `<span class="chip click ${reg === r ? '' : 'off'}" data-act="region" data-k="${r}">${r}</span>`).join('')}</div>
    ${reg === 'All' ? '' : (() => { const cs = {}; Object.values(MP_DESTINATIONS).filter(d => d.region === reg).forEach(d => cs[d.country] = (cs[d.country] || 0) + 1);
      return `<div class="row wrap" style="gap:6px;margin-bottom:16px"><span class="muted small">Country:</span>${Object.entries(cs).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([c, n]) => `<span class="chip click ${S.view.exploreCountry === c ? '' : 'off'}" data-act="country" data-k="${esc(c)}">${esc(c)} <b>${n}</b></span>`).join('')}</div>`; })()}
    <div class="grid">${list.map(guideCard).join('') || `<div class="empty">No guides match.${q ? ` <br><br><button class="btn accent" data-act="draft-online" data-k="${esc(S.view.exploreQ)}">⚡ Build a ${esc(S.view.exploreQ)} itinerary from live map data</button>` : ''}</div>`}</div>
    <div class="box" style="margin-top:20px"><b>Going somewhere not listed?</b> <span class="muted">Quick draft works for any city in the world – MeyPlanner pulls its best-known attractions from OpenStreetMap.</span>
      <div style="margin-top:10px"><button class="btn accent sm" data-act="quick-draft">⚡ Quick draft any destination</button></div></div>
    <p class="muted small" style="margin-top:12px">Guides are bundled samples. Copy any guide into your trips, then edit it freely.</p>`;
}
function settingsView() {
  const st = S.settings;
  return `<div class="section-title" style="margin-top:0"><h2>Settings</h2></div>
  <div class="box"><h3>Profile</h3><div class="row wrap">
    <div class="field"><label>Your name (used in group trips & expenses)</label><input class="input" data-set="name" value="${esc(st.name)}"></div>
    <div class="field"><label>Default currency</label><select class="input" data-set="currency">${CURRENCIES.map(c => `<option ${c === st.currency ? 'selected' : ''}>${c}</option>`).join('')}</select></div>
    <div class="field"><label>Theme</label><select class="input" data-set="theme"><option value="light" ${st.theme === 'light' ? 'selected' : ''}>Light</option><option value="dark" ${st.theme === 'dark' ? 'selected' : ''}>Dark</option></select></div>
  </div></div>
  <div class="box"><h3>Real-time collaboration server</h3>
    <p class="muted small">MeyPlanner syncs shared trips live through a Firebase Realtime Database you own (free tier is plenty). Paste its URL below – see README for the 2-minute setup.</p>
    <div class="field"><label>Database URL</label><input class="input" data-set="syncUrl" placeholder="https://your-project-default-rtdb.asia-southeast1.firebasedatabase.app" value="${esc(st.syncUrl)}"></div>
    <div class="small">${Sync.enabled() ? '✅ Live collaboration enabled' : '⚪ Not configured – you can still share trips as files.'}</div>
  </div>
  <div class="box"><h3>Backup</h3><div class="row wrap">
    <button class="btn" data-act="backup">⬇ Export all data</button><button class="btn" data-act="restore">⬆ Restore backup</button>
    <button class="btn danger" data-act="wipe">Delete all data</button></div></div>
  <div class="box"><h3>About MeyPlanner</h3>
    <div class="row" style="gap:14px;align-items:center">
      <img src="icons/icon-128.png" alt="MP" style="width:64px;height:64px;border-radius:16px">
      <div><div style="font-weight:800;font-size:16px">MeyPlanner</div><div class="muted small">Version 1.0.0</div>
        <div class="small" style="margin-top:4px">Owner & developer: <b>Kamil</b></div>
        <div class="muted small">© ${new Date().getFullYear()} Kamil. All rights reserved.</div></div></div>
    <p class="muted small" style="margin-bottom:0">All-in-one itinerary & visual trip planner.<br>Maps © OpenStreetMap contributors, CARTO · Search by Nominatim · Attractions via Overpass API</p></div>`;
}

// ----- Trip screen -----
function tripScreen(t) {
  const tab = S.view.tab;
  const totalStops = t.days.reduce((a, d) => a + d.items.length, 0);
  const tabs = [['plan', '🗓 Itinerary'], ['places', `⭐ Places (${t.ideas.length})`], ['bookings', `🎫 Bookings (${t.reservations.length})`], ['budget', '💰 Budget'], ['share', '👥 Group']];
  const body = { plan: planTab, places: placesTab, bookings: bookingsTab, budget: budgetTab, share: shareTab }[tab](t);
  return `<div class="trip ${S.view.showMap ? 'show-map' : ''}">
    <div class="side">
      <div class="trip-head">
        <div class="row"><button class="icon-btn" data-act="home" title="Back">←</button>
          <h1>${esc(t.name)}</h1><button class="icon-btn" data-act="edit-trip" title="Edit trip">✏️</button></div>
        <div class="sub">📅 ${fmtRange(t)} · ${t.days.length} days · ${totalStops} stops ${t.dest ? '· 📍 ' + esc(t.dest) : ''}</div>
      </div>
      <div class="tabs">${tabs.map(([k, l]) => `<button data-act="tab" data-k="${k}" class="${tab === k ? 'on' : ''}">${l}</button>`).join('')}</div>
      <div class="side-body">${body}</div>
    </div>
    <div class="mapwrap">
      <div class="map-tools">
        <div class="searchbox"><input id="map-search" placeholder="Search a place to add…" value="${esc(S.view.lastQuery || '')}"><button class="btn ghost sm" data-act="search">🔍</button></div>
        <button class="btn sm" data-act="pick-on-map">${MapView.picking ? '✖ Cancel' : '📌 Drop pin'}</button>
        ${MapView.picking ? '<div class="map-hint">Tap the map to add a place</div>' : ''}
      </div>
    </div>
    <button class="btn primary fab" data-act="toggle-map" style="bottom:calc(20px + env(safe-area-inset-bottom))">${S.view.showMap ? '📋 List' : '🗺️ Map'}</button>
  </div>`;
}
function itemRow(it, n, color) {
  const info = [it.time && `🕒 ${esc(it.time)}${it.dur ? ' · ' + it.dur + 'h' : ''}`, it.cost && `💵 ${money(it.cost, trip().currency)}`, it.conf && `#${esc(it.conf)}`, it.notes && `📝 ${esc(it.notes.slice(0, 60))}${it.notes.length > 60 ? '…' : ''}`].filter(Boolean);
  return `<div class="item" data-id="${it.id}">
    <span class="drag" title="Drag to reorder">⋮⋮</span>
    ${color ? `<span class="num" style="background:${color}">${hasLL(it) ? n : TYPES[it.type] || '•'}</span>` : `<span style="font-size:18px">${TYPES[it.type] || '📍'}</span>`}
    <div class="main" data-act="focus-item" data-id="${it.id}"><div class="title">${color ? (TYPES[it.type] || '') + ' ' : ''}${esc(it.name)}</div>${info.length ? `<div class="info">${info.map(x => `<span>${x}</span>`).join('')}</div>` : ''}</div>
    <button class="icon-btn" data-act="edit-item" data-id="${it.id}" title="Edit">✏️</button>
  </div>`;
}
function planTab(t) {
  return `<div class="row wrap" style="margin-bottom:10px">
      <button class="btn sm" data-act="text-export">📤 Export text</button><button class="btn sm" data-act="print">🖨 Print / PDF</button>
      <button class="btn sm" data-act="add-day-note">📝 Trip notes</button></div>
    ${t.days.map((d, di) => {
      const c = DAY_COLORS[di % DAY_COLORS.length], col = S.view.collapsed[d.id];
      const pts = d.items.filter(hasLL); let km = 0; for (let i = 1; i < pts.length; i++) km += hav([pts[i - 1].lat, pts[i - 1].lng], [pts[i].lat, pts[i].lng]);
      const cost = d.items.reduce((a, x) => a + (+x.cost || 0), 0);
      let n = 0, prev = null;
      const rows = d.items.map(it => {
        let leg = '';
        if (hasLL(it)) { n++; if (prev) { const k = hav([prev.lat, prev.lng], [it.lat, it.lng]); leg = `<div class="leg">${k < 1.2 ? '🚶' : '🚗'} ${k.toFixed(1)} km · ~${Math.max(1, Math.round(k < 1.2 ? k * 12 : k * 2.5 + 5))} min</div>`; } prev = it; }
        return leg + itemRow(it, n, c);
      }).join('');
      return `<div class="day" data-day="${d.id}">
        <div class="day-head" data-act="collapse" data-id="${d.id}"><span class="day-dot" style="background:${c}"></span>
          <div><h3>Day ${di + 1}${d.title ? ' · ' + esc(d.title) : ''}</h3><div class="sub">${d.date ? fmtDate(d.date) : ''} · ${d.items.length} stops${km ? ` · ${km.toFixed(1)} km` : ''}${cost ? ' · ' + money(cost, t.currency) : ''}</div></div>
          <div class="day-tools">
            <button class="icon-btn" data-act="optimize" data-id="${d.id}" title="Optimize route">🔀</button>
            <button class="icon-btn" data-act="rename-day" data-id="${d.id}" title="Rename day">🏷️</button>
            <button class="icon-btn" data-act="collapse" data-id="${d.id}">${col ? '▸' : '▾'}</button></div></div>
        ${col ? '' : `<div class="droplist" data-list="${d.id}">${rows}</div>
        <div class="add-row"><button class="btn sm" data-act="add-item" data-id="${d.id}">＋ Add stop</button>
          <button class="btn sm ghost" data-act="search-for" data-id="${d.id}">🔍 Search map</button>
          <button class="btn sm ghost" data-act="pin-for" data-id="${d.id}">📌 Pin</button></div>`}
      </div>`;
    }).join('')}
    <div class="day"><div class="day-head"><span class="day-dot" style="background:#94A3B8"></span><div><h3>⭐ Places to visit</h3><div class="sub">Drag ideas into a day</div></div></div>
      <div class="droplist" data-list="ideas">${t.ideas.map(it => itemRow(it, 0, null)).join('')}</div>
      <div class="add-row"><button class="btn sm" data-act="add-item" data-id="ideas">＋ Add idea</button><button class="btn sm ghost" data-act="search-for" data-id="ideas">🔍 Search map</button></div></div>
    <p class="muted small">Tip: drag the ⋮⋮ handle to reorder stops or move them between days.</p>`;
}
function placesTab(t) {
  const lib = libFor(t.dest);
  const existing = new Set([...t.ideas, ...t.days.flatMap(d => d.items)].map(i => i.name));
  return `<div class="box"><h3>⭐ Your saved places</h3>
      <div class="droplist" data-list="ideas">${t.ideas.map(it => itemRow(it, 0, null)).join('') || '<div class="muted small">Nothing saved yet. Search the map or pick from suggestions below.</div>'}</div>
      <div class="row wrap" style="margin-top:8px"><button class="btn sm" data-act="add-item" data-id="ideas">＋ Add manually</button><button class="btn sm" data-act="search-for" data-id="ideas">🔍 Search map</button></div></div>
    ${lib ? `<div class="box"><h3>Popular in ${esc(lib._name)}${lib.online ? ' <span class="badge">live data</span>' : ''}</h3>${lib.places.map(p => `<div class="list-item"><span>${TYPES[CAT_TYPE[p[1]]]}</span><div><div style="font-weight:600">${esc(p[0])}</div><div class="muted small">${p[1]} · ~${p[4]}h</div></div>
      <div class="right">${existing.has(p[0]) ? '<span class="chip">Added</span>' : `<button class="btn sm" data-act="add-suggestion" data-name="${esc(p[0])}">＋ Save</button>`}</div></div>`).join('')}</div>`
      : `<div class="box"><h3>Popular places${t.dest ? ' in ' + esc(t.dest) : ''}</h3>${t.dest
          ? `<p class="muted small">Pull the best-known attractions for ${esc(t.dest)} from live map data.</p><button class="btn accent sm" data-act="fetch-places">✨ Find popular places</button>`
          : '<p class="muted small">Set a destination for this trip (✏️ next to the trip name) to see suggestions.</p>'}</div>`}`;
}
function bookingsTab(t) {
  const icon = { flight: '✈️', hotel: '🏨', car: '🚗', train: '🚆', restaurant: '🍽️', activity: '🎟️', other: '📄' };
  return `<div class="row wrap" style="margin-bottom:12px"><button class="btn primary sm" data-act="import-email">📧 Import from email</button><button class="btn sm" data-act="add-res">＋ Add manually</button></div>
    ${t.reservations.length ? t.reservations.slice().sort((a, b) => (a.date || '').localeCompare(b.date || '')).map(r => `<div class="box"><div class="row">
      <span style="font-size:22px">${icon[r.kind] || '📄'}</span>
      <div style="flex:1;min-width:0"><div style="font-weight:700">${esc(r.title)}</div>
        <div class="muted small">${r.date ? fmtDate(r.date) : 'No date'}${r.time ? ' · ' + esc(r.time) : ''}${r.endDate ? ' → ' + fmtDate(r.endDate) : ''}</div>
        ${r.conf ? `<div class="small">Confirmation: <b>${esc(r.conf)}</b></div>` : ''}${r.details ? `<div class="small muted">${esc(r.details)}</div>` : ''}</div>
      <div><span class="badge">${esc(r.kind)}</span><br><button class="icon-btn" data-act="edit-res" data-id="${r.id}">✏️</button></div></div></div>`).join('')
      : `<div class="empty">📧 Forward-free import: open your booking confirmation email, copy the text (or save it as .eml) and paste it into <b>Import from email</b>. MeyPlanner detects flights, hotels, trains, car rentals and restaurant bookings and adds them to the right day.</div>`}`;
}
function budgetTab(t) {
  const total = t.expenses.reduce((a, e) => a + (+e.amount || 0), 0);
  const planned = t.days.flatMap(d => d.items).reduce((a, i) => a + (+i.cost || 0), 0);
  const byCat = EXP_CATS.map(c => [c, t.expenses.filter(e => e.cat === c).reduce((a, e) => a + (+e.amount || 0), 0)]).filter(x => x[1]);
  const bal = balances(t), settle = settleUp(bal);
  return `<div class="box"><div class="row"><div><div class="muted small">Spent</div><div class="big">${money(total, t.currency)}</div></div>
      <div class="right"><div class="muted small">Budget</div><div style="font-weight:700;cursor:pointer" data-act="set-budget">${t.budget ? money(t.budget, t.currency) : 'Set budget ✏️'}</div></div></div>
      ${t.budget ? `<div class="bar" style="margin-top:10px"><i style="width:${Math.min(100, total / t.budget * 100)}%;${total > t.budget ? 'background:var(--danger)' : ''}"></i></div>` : ''}
      ${planned ? `<div class="muted small" style="margin-top:8px">Planned costs in itinerary: ${money(planned, t.currency)}</div>` : ''}
      ${byCat.length ? `<div style="margin-top:12px">${byCat.map(([c, v]) => `<div class="row small" style="margin:4px 0"><span style="width:80px">${c}</span><div class="bar" style="flex:1"><i style="width:${v / total * 100}%"></i></div><span style="width:90px;text-align:right">${money(v, t.currency)}</span></div>`).join('')}</div>` : ''}
    </div>
    <div class="box"><div class="row"><h3 style="margin:0">Expenses</h3><button class="btn primary sm right" data-act="add-exp">＋ Add expense</button></div>
      ${t.expenses.slice().reverse().map(e => `<div class="list-item" data-act="edit-exp" data-id="${e.id}" style="cursor:pointer">
        <div style="flex:1"><div style="font-weight:600">${esc(e.desc)}</div><div class="muted small">${esc(e.paidBy)} paid · split ${e.split.length} ways · ${e.cat}${e.date ? ' · ' + fmtDate(e.date) : ''}</div></div>
        <div style="font-weight:700">${money(e.amount, t.currency)}</div></div>`).join('') || '<div class="muted small" style="margin-top:8px">No expenses yet.</div>'}</div>
    <div class="box"><h3>Balances</h3>${t.members.map(m => `<div class="list-item"><span>${esc(m)}</span><span class="right ${bal[m] > 0.005 ? 'pos' : bal[m] < -0.005 ? 'neg' : 'muted'}">${bal[m] > 0.005 ? 'gets back ' : bal[m] < -0.005 ? 'owes ' : ''}${money(Math.abs(bal[m] || 0), t.currency)}</span></div>`).join('')}
      <h3 style="margin-top:14px">Settle up</h3>${settle.length ? settle.map(s => `<div class="list-item"><span>💸 <b>${esc(s.from)}</b> pays <b>${esc(s.to)}</b></span><span class="right" style="font-weight:700">${money(s.amt, t.currency)}</span></div>`).join('') : '<div class="muted small">Everyone is square 🎉</div>'}</div>`;
}
function shareTab(t) {
  return `<div class="box"><h3>👥 Travelers</h3>
      ${t.members.map(m => `<div class="list-item"><span>🧑 ${esc(m)}</span>${t.members.length > 1 ? `<button class="icon-btn right" data-act="rm-member" data-name="${esc(m)}">✖</button>` : ''}</div>`).join('')}
      <div class="row" style="margin-top:8px"><input class="input" id="new-member" placeholder="Add traveler name"><button class="btn sm" data-act="add-member">Add</button></div></div>
    <div class="box"><h3><span class="status-dot ${Sync.status === 'live' ? 'live' : ''}"></span> Real-time collaboration</h3>
      ${!Sync.enabled() ? `<p class="muted small">Set up a free sync database in <a href="#" data-act="hometab" data-k="settings">Settings</a> to edit this trip live with friends. Every change (stops, drag-and-drop, expenses) appears instantly on everyone's device.</p>`
        : t.shareCode ? `<p>Share this code with friends – they tap <b>Join with code</b> on the home screen:</p>
          <div class="row"><div class="big" style="letter-spacing:4px;font-family:monospace">${esc(t.shareCode)}</div><button class="btn sm right" data-act="copy-code">Copy</button></div>
          <p class="muted small">Status: ${Sync.status === 'live' ? 'Connected – changes sync live' : Sync.status === 'error' ? 'Connection problem – retrying' : 'Connecting…'}</p>
          <button class="btn sm danger" data-act="stop-share">Stop sharing on this device</button>`
        : `<p class="muted small">Start a live session and invite friends with a short code.</p><button class="btn primary" data-act="start-share">⚡ Start live collaboration</button>`}
    </div>
    <div class="box"><h3>Share a copy</h3><div class="row wrap">
      <button class="btn sm" data-act="export-trip">⬇ Trip file (.json)</button><button class="btn sm" data-act="text-export">📤 Itinerary as text</button><button class="btn sm" data-act="print">🖨 Print / PDF</button></div></div>
    <div class="box"><h3>Danger zone</h3><button class="btn sm" data-act="dup-trip">⧉ Duplicate trip</button> <button class="btn sm danger" data-act="del-trip">🗑 Delete trip</button></div>`;
}

// ---------- Expenses math ----------
function balances(t) {
  const b = {}; t.members.forEach(m => b[m] = 0);
  t.expenses.forEach(e => {
    const amt = +e.amount || 0, sp = e.split.length ? e.split : t.members;
    b[e.paidBy] = (b[e.paidBy] || 0) + amt; sp.forEach(m => b[m] = (b[m] || 0) - amt / sp.length);
  });
  return b;
}
function settleUp(b) {
  const cred = [], debt = [];
  Object.entries(b).forEach(([m, v]) => { if (v > 0.005) cred.push([m, v]); else if (v < -0.005) debt.push([m, -v]); });
  cred.sort((a, c) => c[1] - a[1]); debt.sort((a, c) => c[1] - a[1]);
  const out = []; let i = 0, j = 0;
  while (i < debt.length && j < cred.length) {
    const amt = Math.min(debt[i][1], cred[j][1]); out.push({ from: debt[i][0], to: cred[j][0], amt });
    debt[i][1] -= amt; cred[j][1] -= amt; if (debt[i][1] < 0.005) i++; if (cred[j][1] < 0.005) j++;
  }
  return out;
}

// ---------- Quick draft & guides ----------
function nearestOrder(items) {
  if (items.length < 3) return items.slice();
  const left = items.slice(), out = [left.shift()];
  while (left.length) { const last = out[out.length - 1]; let bi = 0, bd = Infinity; left.forEach((p, i) => { const d = hav([last.lat, last.lng], [p.lat, p.lng]); if (d < bd) { bd = d; bi = i; } }); out.push(left.splice(bi, 1)[0]); }
  return out;
}
const placeItem = (p, time) => ({ id: uid(), name: p[0], type: CAT_TYPE[p[1]] || 'place', lat: p[2], lng: p[3], dur: p[4], time: time || '', notes: '', cost: 0 });
function scheduleDay(items) { let t = '09:00'; items.forEach(it => { it.time = t; t = timeAdd(t, (it.dur || 1.5) + 0.5); }); }
function draftItinerary({ dest, start, days, pace, interests, name }) {
  const lib = libFor(dest); dest = lib._name;
  const end = addDays(start, days - 1);
  const t = newTrip({ name: name || `${days} days in ${dest}`, dest, start, end, center: lib.center });
  let pool = lib.places.filter(p => !interests.length || interests.includes(p[1]));
  if (pool.length < days * 2) pool = lib.places.slice();
  const ordered = nearestOrder(pool.map(p => ({ p, lat: p[2], lng: p[3] })));
  const take = Math.min(ordered.length, days * pace);
  const per = Math.ceil(take / days);
  for (let d = 0; d < days; d++) {
    const chunk = ordered.slice(d * per, Math.min(take, (d + 1) * per)).map(o => placeItem(o.p));
    scheduleDay(chunk); t.days[d].items = chunk;
  }
  t.ideas = ordered.slice(take).map(o => placeItem(o.p));
  save(t); return t;
}
function copyGuide(g, start) {
  const lib = libFor(g.dest);
  const t = newTrip({ name: g.title, dest: g.dest, start, end: addDays(start, g.days.length - 1), center: lib.center });
  g.days.forEach((names, i) => {
    const items = names.map(n => lib.places.find(p => p[0] === n)).filter(Boolean).map(p => placeItem(p));
    scheduleDay(items); t.days[i].items = items;
  });
  save(t); return t;
}

// ---------- Email reservation parser ----------
const MONTHS = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, sept: 8, oct: 9, nov: 10, dec: 11 };
function parseDates(text) {
  const out = []; const push = (y, m, d, idx) => { if (y < 100) y += 2000; const dt = new Date(Date.UTC(y, m, d)); if (!isNaN(dt) && m >= 0 && m < 12 && d > 0 && d < 32) out.push({ iso: dt.toISOString().slice(0, 10), idx }); };
  let m; const mon = '(jan|feb|mar|apr|may|jun|jul|aug|sept?|oct|nov|dec)[a-z]*\\.?';
  const r1 = new RegExp(`\\b(\\d{1,2})(?:st|nd|rd|th)?\\s+${mon},?\\s+(\\d{4})`, 'gi');
  const r2 = new RegExp(`\\b${mon}\\s+(\\d{1,2})(?:st|nd|rd|th)?,?\\s+(\\d{4})`, 'gi');
  const r3 = /\b(\d{4})-(\d{2})-(\d{2})\b/g, r4 = /\b(\d{1,2})[\/.](\d{1,2})[\/.](\d{4})\b/g;
  while ((m = r1.exec(text))) push(+m[3], MONTHS[m[2].toLowerCase().slice(0, 3)], +m[1], m.index);
  while ((m = r2.exec(text))) push(+m[3], MONTHS[m[1].toLowerCase().slice(0, 3)], +m[2], m.index);
  while ((m = r3.exec(text))) push(+m[1], +m[2] - 1, +m[3], m.index);
  while ((m = r4.exec(text))) push(+m[3], +m[2] - 1, +m[1], m.index); // day/month/year (MY/UK style)
  return out.sort((a, b) => a.idx - b.idx);
}
function parseTime(text) {
  const m = text.match(/\b([01]?\d|2[0-3]):([0-5]\d)\s*(am|pm|AM|PM)?\b/);
  if (!m) return '';
  let h = +m[1]; if (m[3]) { const pm = m[3].toLowerCase() === 'pm'; if (pm && h < 12) h += 12; if (!pm && h === 12) h = 0; }
  return `${String(h).padStart(2, '0')}:${m[2]}`;
}
function cleanEmail(raw) {
  let s = raw;
  if (/^(from|subject|received|mime-version|delivered-to):/im.test(s.slice(0, 2000))) {
    const subj = (s.match(/^subject:\s*(.*)$/im) || [])[1] || '';
    const i = s.search(/\r?\n\r?\n/); s = subj + '\n' + (i > -1 ? s.slice(i) : s);
    s = s.replace(/=\r?\n/g, '').replace(/=([0-9A-F]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
  }
  s = s.replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<br\s*\/?>|<\/(p|div|tr|li|h\d)>/gi, '\n').replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&rsquo;/g, "'").replace(/[ \t]+/g, ' ');
  return s.split('\n').map(x => x.trim()).filter(Boolean).join('\n');
}
function parseReservation(raw) {
  const text = cleanEmail(raw), low = text.toLowerCase();
  const dates = parseDates(text);
  let conf = '';
  for (const m of text.matchAll(/(?:confirmation|booking|reservation|reference|record locator|pnr|itinerary)\b[^\n:#]{0,25}?(?:[:#]|\b(?:code|number|no\.?|ref)\b)\s*([A-Za-z0-9-]{5,15})\b/gi)) {
    if (/\d/.test(m[1]) || m[1] === m[1].toUpperCase()) { conf = m[1]; break; }
  }
  const r = { id: uid(), kind: 'other', title: '', date: dates[0]?.iso || '', endDate: '', time: parseTime(text), conf: conf.toUpperCase(), details: '' };
  const flight = text.match(/\b(?:flight\s*(?:no\.?|number)?\s*[:#]?\s*)?\b((?:[A-Z]{2}|[A-Z]\d|\d[A-Z]))\s?(\d{2,4})\b/);
  const route = text.match(/\b([A-Z]{3})\s*(?:→|->|–|-|to)\s*([A-Z]{3})\b/);
  if (/\b(flight|boarding|airline|depart(?:ure|s)?|e-?ticket|airasia|malaysia airlines|batik|firefly|scoot|singapore airlines)\b/i.test(text) && (flight || route)) {
    r.kind = 'flight';
    r.title = `Flight ${flight ? flight[1] + flight[2] : ''}${route ? ` ${route[1]} → ${route[2]}` : ''}`.trim();
    r.details = route ? `${route[1]} to ${route[2]}` : '';
  } else if (/\b(check-?in|check-?out|hotel|resort|booking\.com|agoda|airbnb|hostel|room|nights?)\b/i.test(low) && /check-?in|hotel|stay|resort|airbnb/i.test(low)) {
    r.kind = 'hotel';
    const name = (text.match(/^(?:hotel|property|accommodation)\s*(?:name)?\s*[:\-]\s*(.+)$/im) || text.match(/^(.*\b(?:hotel|resort|inn|suites|hostel|residence|villa|apartment)s?\b.*)$/im) || [])[1];
    r.title = (name || 'Hotel stay').slice(0, 80);
    const ci = text.match(/check-?in[^\n]*/i), co = text.match(/check-?out[^\n]*/i);
    const ciD = ci && parseDates(ci[0])[0], coD = co && parseDates(co[0])[0];
    if (ciD) r.date = ciD.iso; if (coD) r.endDate = coD.iso; else if (dates[1]) r.endDate = dates[1].iso;
    if (ci) r.time = parseTime(ci[0]) || '15:00';
  } else if (/\b(train|rail|ktm|ets|shinkansen|eurostar|amtrak|coach|bus ticket)\b/i.test(low)) {
    r.kind = 'train'; r.title = (text.match(/^.*\b(train|rail|ets|ktm|bus)\b.*$/im) || ['Train ticket'])[0].slice(0, 80);
  } else if (/\b(car rental|rent-?a-?car|pick-?up location|hertz|avis|europcar|sixt|budget rent)\b/i.test(low)) {
    r.kind = 'car'; r.title = 'Car rental'; if (dates[1]) r.endDate = dates[1].iso;
    const loc = text.match(/pick-?up(?: location)?\s*[:\-]\s*(.+)/i); if (loc) r.details = 'Pick-up: ' + loc[1].slice(0, 80);
  } else if (/\b(table for|restaurant|dining|reservation for \d|party of \d|opentable|chope)\b/i.test(low)) {
    r.kind = 'restaurant'; r.title = ((text.match(/(?:\bat|restaurant)\s*[:\-]?\s*([A-Z][^\n,]{2,50})/) || [, 'Restaurant booking'])[1]).split(/\s+(?:is|for|on|at|has)\s+/)[0].replace(/^restaurant\s*[:\-]\s*/i, '');
  } else if (/\b(ticket|admission|tour|activity|klook|viator|getyourguide)\b/i.test(low)) {
    r.kind = 'activity'; r.title = (text.split('\n')[0] || 'Activity booking').slice(0, 80);
  }
  if (!r.title) r.title = (text.split('\n')[0] || 'Reservation').slice(0, 80);
  const addr = text.match(/^(?:address|location)\s*[:\-]\s*(.+)$/im); if (addr) r.details = (r.details ? r.details + ' · ' : '') + addr[1].slice(0, 120);
  return r;
}
function resToItem(r) {
  const type = { flight: 'flight', hotel: 'hotel', train: 'transport', car: 'transport', restaurant: 'food', activity: 'activity' }[r.kind] || 'note';
  return { id: uid(), name: r.title, type, time: r.time || '', conf: r.conf, notes: r.details || '', cost: 0, resId: r.id };
}
function attachResToDay(t, r) {
  const day = t.days.find(d => d.date === r.date); if (!day) return false;
  const item = resToItem(r); day.items.push(item);
  day.items.sort((a, b) => (a.time || '99').localeCompare(b.time || '99'));
  if (r.kind === 'hotel' && r.endDate) { const out = t.days.find(d => d.date === r.endDate); if (out) out.items.unshift({ ...resToItem(r), id: uid(), name: 'Check-out: ' + r.title, time: '11:00' }); }
  return true;
}

// ---------- Modals ----------
function modal(title, content, buttons, onMount) {
  const root = $('#modal-root');
  root.innerHTML = `<div class="backdrop"><div class="modal" role="dialog"><header><h2>${title}</h2><button class="icon-btn" data-close style="margin-left:auto">✖</button></header>
    <div class="content">${content}</div><footer>${buttons.map((b, i) => `<button class="btn ${b.cls || ''}" data-mb="${i}">${b.label}</button>`).join('')}</footer></div></div>`;
  const close = () => root.innerHTML = '';
  root.querySelector('[data-close]').onclick = close;
  root.querySelector('.backdrop').addEventListener('mousedown', e => { if (e.target.classList.contains('backdrop')) close(); });
  buttons.forEach((b, i) => root.querySelector(`[data-mb="${i}"]`).onclick = () => { if (b.onClick && b.onClick(root) === false) return; close(); });
  if (onMount) onMount(root);
  const f = root.querySelector('input,textarea,select'); if (f && window.innerWidth > 900) f.focus();
  return close;
}
const val = (root, sel) => root.querySelector(sel)?.value?.trim() ?? '';

function tripForm(t = {}) {
  return `<div class="field"><label>Trip name</label><input class="input" id="f-name" value="${esc(t.name || '')}" placeholder="e.g. Penang makan trip"></div>
    <div class="field"><label>Destination</label>${destPickerHTML('f-dest', t.dest, 'Search city or country…')}</div>
    <div class="row wrap"><div class="field"><label>Start date</label><input type="date" class="input" id="f-start" value="${t.start || addDays(todayISO(), 30)}"></div>
    <div class="field"><label>End date</label><input type="date" class="input" id="f-end" value="${t.end || addDays(todayISO(), 33)}"></div></div>
    <div class="field"><label>Currency</label><select class="input" id="f-cur">${CURRENCIES.map(c => `<option ${c === (t.currency || S.settings.currency) ? 'selected' : ''}>${c}</option>`).join('')}</select></div>`;
}
function openNewTrip() {
  modal('New trip', tripForm(), [{ label: 'Cancel' }, { label: 'Create trip', cls: 'primary', onClick: (r) => {
    let dest = val(r, '#f-dest'); const lib = libFor(dest); if (lib) dest = lib._name;
    const t = newTrip({ name: val(r, '#f-name') || (dest ? `Trip to ${dest}` : 'New trip'), dest, start: val(r, '#f-start'), end: val(r, '#f-end'), center: lib?.center });
    t.currency = val(r, '#f-cur'); if (lib) t.currency = val(r, '#f-cur');
    save(t); openTrip(t.id);
    if (!lib && dest) geocode(dest).then(res => { if (res[0]) { t.center = [+res[0].lat, +res[0].lon]; save(t); MapView.draw(t); } }).catch(() => {});
  } }], (r) => attachDestPicker(r, 'f-dest'));
}
function openEditTrip(t) {
  modal('Edit trip', tripForm(t), [{ label: 'Cancel' }, { label: 'Save', cls: 'primary', onClick: (r) => {
    t.name = val(r, '#f-name') || t.name; t.dest = val(r, '#f-dest'); t.start = val(r, '#f-start'); t.end = val(r, '#f-end'); t.currency = val(r, '#f-cur');
    const lb = libFor(t.dest); if (lb) { t.dest = lb._name; t.center = lb.center; }
    syncDays(t); save(t); render();
  } }], (r) => attachDestPicker(r, 'f-dest'));
}
function openQuickDraft(preset) {
  const cats = ['sights', 'food', 'nature', 'culture', 'shopping', 'fun'];
  modal('⚡ Quick draft itinerary', `<p class="muted small" style="margin-top:0">Type any city or region in the world. ${Object.keys(MP_DESTINATIONS).length} popular destinations are built in; anywhere else, MeyPlanner pulls the best-known attractions from live map data. You get a day-by-day plan grouped by area, with times and routes.</p>
    <div class="field"><label>Destination</label>${destPickerHTML('q-dest', preset, 'e.g. Tokyo, Sapporo, Maldives, Munich, Scotland…')}
      <div class="small muted" id="q-hint" style="margin-top:4px"></div></div>
    <div class="row wrap"><div class="field"><label>Start date</label><input type="date" class="input" id="q-start" value="${addDays(todayISO(), 30)}"></div>
    <div class="field"><label>Days</label><input type="number" min="1" max="14" class="input" id="q-days" value="3"></div>
    <div class="field"><label>Pace</label><select class="input" id="q-pace"><option value="3">Relaxed</option><option value="4" selected>Balanced</option><option value="5">Packed</option></select></div></div>
    <div class="field"><label>Interests (optional)</label><div class="row wrap" style="gap:6px" id="q-int">${cats.map(c => `<span class="chip click off" data-c="${c}">${c}</span>`).join('')}</div></div>`,
  [{ label: 'Cancel' }, { label: 'Generate itinerary', cls: 'accent', onClick: (r) => {
    const q = val(r, '#q-dest'); if (!q) { toast('Enter a destination'); return false; }
    const interests = [...r.querySelectorAll('#q-int .chip:not(.off)')].map(x => x.dataset.c);
    const days = Math.max(1, Math.min(14, +val(r, '#q-days') || 3));
    const opts = { start: val(r, '#q-start') || todayISO(), days, pace: +val(r, '#q-pace'), interests };
    const go = () => { const t = draftItinerary({ ...opts, dest: q }); $('#modal-root').innerHTML = ''; openTrip(t.id); toast('Draft ready – drag stops around to make it yours'); };
    if (libFor(q)) { go(); return false; }
    const btn = r.querySelector('.btn.accent'), hint = r.querySelector('#q-hint');
    btn.disabled = true; btn.textContent = 'Finding top places…'; hint.textContent = `Searching live map data for ${q}…`;
    fetchDestination(q).then(lib => { opts.dest = lib._name; const t = draftItinerary({ ...opts, dest: lib._name }); $('#modal-root').innerHTML = ''; openTrip(t.id); toast(`Draft ready with ${lib.places.length} places found in ${lib._name}`); })
      .catch(err => { btn.disabled = false; btn.textContent = 'Generate itinerary'; hint.innerHTML = `<span style="color:var(--danger)">${esc(err.message === 'Failed to fetch' ? 'No internet connection – pick a built-in destination or try again online.' : err.message)}</span>`; });
    return false;
  } }], (r) => {
    r.querySelector('#q-int').onclick = (e) => { const c = e.target.closest('.chip'); if (c) c.classList.toggle('off'); };
    const inp = r.querySelector('#q-dest'), hint = r.querySelector('#q-hint');
    const upd = () => { const l = libFor(inp.value); hint.textContent = !inp.value.trim() ? '' : l ? `✓ ${l._name}${l.country ? ', ' + l.country : ''} – ${l.places.length} curated places${l.online ? ' (saved from live data)' : ''}` : '🌍 Not in the built-in list – top attractions will be fetched online'; };
    attachDestPicker(r, 'q-dest', upd, true); upd();
  });
}
function openGuide(g) {
  const lib = libFor(g.dest);
  modal(esc(g.title), `<div class="muted small">by ${esc(g.author)} · ♥ ${g.likes.toLocaleString()} · ${g.dest}</div>
    ${g.days.map((names, i) => `<div style="margin-top:12px"><b style="color:${DAY_COLORS[i]}">Day ${i + 1}</b>${names.map((n, j) => { const p = lib.places.find(x => x[0] === n); return `<div class="list-item"><span class="num" style="background:${DAY_COLORS[i]};width:22px;height:22px;border-radius:50%;color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800">${j + 1}</span><span>${esc(n)}</span><span class="muted small right">${p ? p[1] : ''}</span></div>`; }).join('')}</div>`).join('')}
    <div class="field" style="margin-top:14px"><label>Start date for your copy</label><input type="date" class="input" id="g-start" value="${addDays(todayISO(), 30)}"></div>`,
  [{ label: 'Close' }, { label: '⧉ Copy to my trips', cls: 'primary', onClick: (r) => { const t = copyGuide(g, val(r, '#g-start') || todayISO()); openTrip(t.id); toast('Guide copied to your trips'); } }]);
}
function openItemEditor(t, id, targetList) {
  const found = id ? findItem(t, id) : null; const it = found ? found.list[found.idx] : { type: 'place' };
  const dayOpts = t.days.map((d, i) => `<option value="${d.id}">Day ${i + 1}${d.date ? ' – ' + fmtDate(d.date) : ''}</option>`).join('') + `<option value="ideas">⭐ Places to visit</option>`;
  const cur = found ? (found.day ? found.day.id : 'ideas') : targetList;
  modal(found ? 'Edit stop' : 'Add stop', `<div class="field"><label>Name</label><input class="input" id="i-name" value="${esc(it.name || '')}" placeholder="Place, activity or note"></div>
    <div class="row wrap"><div class="field"><label>Type</label><select class="input" id="i-type">${Object.entries(TYPES).map(([k, ic]) => `<option value="${k}" ${it.type === k ? 'selected' : ''}>${ic} ${k}</option>`).join('')}</select></div>
    <div class="field"><label>Day</label><select class="input" id="i-day">${dayOpts}</select></div></div>
    <div class="row wrap"><div class="field"><label>Time</label><input type="time" class="input" id="i-time" value="${esc(it.time || '')}"></div>
    <div class="field"><label>Duration (h)</label><input type="number" step="0.5" min="0" class="input" id="i-dur" value="${it.dur ?? ''}"></div>
    <div class="field"><label>Cost (${t.currency})</label><input type="number" step="0.01" min="0" class="input" id="i-cost" value="${it.cost || ''}"></div></div>
    <div class="field"><label>Notes / links</label><textarea class="input" id="i-notes">${esc(it.notes || '')}</textarea></div>
    <div class="small muted">${hasLL(it) ? `📍 ${it.lat.toFixed(5)}, ${it.lng.toFixed(5)} · <a href="https://www.google.com/maps/dir/?api=1&destination=${it.lat},${it.lng}" target="_blank" rel="noopener">Directions ↗</a>` : 'No map location – add one via map search or Drop pin.'}</div>`,
  [...(found ? [{ label: '🗑 Delete', cls: 'danger', onClick: () => { found.list.splice(found.idx, 1); save(t); render(); } }] : []), { label: 'Cancel' },
   { label: found ? 'Save' : 'Add', cls: 'primary', onClick: (r) => {
    const name = val(r, '#i-name'); if (!name) { toast('Please enter a name'); return false; }
    Object.assign(it, { name, type: val(r, '#i-type'), time: val(r, '#i-time'), dur: val(r, '#i-dur') ? +val(r, '#i-dur') : undefined, cost: +val(r, '#i-cost') || 0, notes: val(r, '#i-notes') });
    const dest = val(r, '#i-day');
    if (found) found.list.splice(found.idx, 1); else it.id = uid();
    const L2 = listFor(t, dest); L2.push(it);
    if (dest !== 'ideas' && it.time) L2.sort((a, b) => (a.time || '99').localeCompare(b.time || '99'));
    save(t); render();
  } }], (r) => r.querySelector('#i-day').value = cur || 'ideas');
}
function addPlaceAt(lat, lng, name) {
  const t = trip(); const target = S.view.addTarget || (t.days[0]?.id ?? 'ideas');
  const doAdd = (nm) => { const it = { id: uid(), name: nm, type: 'place', lat, lng, time: '', notes: '', cost: 0 }; listFor(t, target).push(it); save(t); render(); MapView.draw(t, false); toast(`Added “${nm}”`); };
  if (name) return doAdd(name);
  modal('Name this place', `<div class="field"><label>Name</label><input class="input" id="p-name" placeholder="e.g. Hidden café"></div>
    <div class="field"><label>Add to</label><select class="input" id="p-target">${t.days.map((d, i) => `<option value="${d.id}">Day ${i + 1}</option>`).join('')}<option value="ideas">⭐ Places to visit</option></select></div>`,
  [{ label: 'Cancel' }, { label: 'Add', cls: 'primary', onClick: (r) => { S.view.addTarget = val(r, '#p-target'); doAdd(val(r, '#p-name') || 'Dropped pin'); } }],
  (r) => r.querySelector('#p-target').value = target);
}
async function searchPlaces(q) {
  const t = trip(); if (!q) { toast('Type a place to search'); return; }
  S.view.lastQuery = q;
  const near = t.center || (t.days.flatMap(d => d.items).find(hasLL) && [t.days.flatMap(d => d.items).find(hasLL).lat, t.days.flatMap(d => d.items).find(hasLL).lng]);
  modal(`Results for “${esc(q)}”`, '<div class="muted">Searching…</div>', [{ label: 'Close' }]);
  try {
    const res = await geocode(q, near);
    const target = S.view.addTarget || t.days[0]?.id || 'ideas';
    const opts = t.days.map((d, i) => `<option value="${d.id}">Day ${i + 1}</option>`).join('') + '<option value="ideas">⭐ Places to visit</option>';
    modal(`Results for “${esc(q)}”`, res.length ? `<div class="field"><label>Add to</label><select class="input" id="s-target">${opts}</select></div>` + res.map((p, i) => `<div class="list-item"><div style="flex:1;min-width:0"><div style="font-weight:600">${esc(p.name || p.display_name.split(',')[0])}</div><div class="muted small">${esc(p.display_name)}</div></div><button class="btn sm" data-pick="${i}">＋ Add</button></div>`).join('') : '<div class="muted">No places found. Try a different name.</div>',
      [{ label: 'Close' }], (r) => {
        const sel = r.querySelector('#s-target'); if (sel) sel.value = target;
        r.querySelectorAll('[data-pick]').forEach(b => b.onclick = () => {
          const p = res[+b.dataset.pick]; S.view.addTarget = sel.value; $('#modal-root').innerHTML = '';
          addPlaceAt(+p.lat, +p.lon, p.name || p.display_name.split(',')[0]);
          if (MapView.map) MapView.map.setView([+p.lat, +p.lon], 15);
        });
      });
  } catch (e) { modal('Search unavailable', '<p>Place search needs an internet connection.</p>', [{ label: 'OK' }]); }
}
function openImportEmail(t) {
  modal('📧 Import booking from email', `<p class="muted small" style="margin-top:0">Paste the text of a confirmation email (flight, hotel, train, car, restaurant, tour) or load a saved <b>.eml</b> / .txt / .html file. Parsing happens on your device – nothing is uploaded.</p>
    <textarea class="input" id="e-text" style="min-height:180px" placeholder="Paste confirmation email here…"></textarea>
    <div class="row" style="margin-top:8px"><label class="btn sm">📎 Load .eml file<input type="file" id="e-file" accept=".eml,.txt,.html,.htm,message/rfc822" hidden multiple></label><span class="muted small" id="e-fname"></span></div>
    <label class="row small" style="margin-top:10px"><input type="checkbox" id="e-add" checked> Also add to the matching day of the itinerary</label>`,
  [{ label: 'Cancel' }, { label: 'Detect booking', cls: 'primary', onClick: (r) => {
    const texts = r._texts && r._texts.length ? r._texts : [val(r, '#e-text')];
    if (!texts[0]) { toast('Paste an email first'); return false; }
    const parsed = texts.map(parseReservation); reviewReservations(t, parsed, r.querySelector('#e-add').checked); return true;
  } }], (r) => {
    r.querySelector('#e-file').onchange = async (e) => {
      r._texts = await Promise.all([...e.target.files].map(f => f.text()));
      r.querySelector('#e-fname').textContent = [...e.target.files].map(f => f.name).join(', ');
      r.querySelector('#e-text').value = r._texts.length === 1 ? cleanEmail(r._texts[0]).slice(0, 3000) : `${r._texts.length} emails loaded`;
    };
  });
}
function resForm(r) {
  return `<div class="row wrap"><div class="field"><label>Type</label><select class="input" data-f="kind">${['flight', 'hotel', 'train', 'car', 'restaurant', 'activity', 'other'].map(k => `<option ${r.kind === k ? 'selected' : ''}>${k}</option>`).join('')}</select></div>
      <div class="field" style="flex:2"><label>Title</label><input class="input" data-f="title" value="${esc(r.title)}"></div></div>
    <div class="row wrap"><div class="field"><label>Date</label><input type="date" class="input" data-f="date" value="${esc(r.date)}"></div>
      <div class="field"><label>Time</label><input type="time" class="input" data-f="time" value="${esc(r.time)}"></div>
      <div class="field"><label>End / check-out</label><input type="date" class="input" data-f="endDate" value="${esc(r.endDate)}"></div></div>
    <div class="row wrap"><div class="field"><label>Confirmation #</label><input class="input" data-f="conf" value="${esc(r.conf)}"></div>
      <div class="field" style="flex:2"><label>Details</label><input class="input" data-f="details" value="${esc(r.details)}"></div></div>`;
}
const readRes = (box, r) => box.querySelectorAll('[data-f]').forEach(el => r[el.dataset.f] = el.value.trim());
function reviewReservations(t, list, addToPlan) {
  setTimeout(() => modal('Review detected bookings', list.map((r, i) => `<div class="box" data-r="${i}">${resForm(r)}</div>`).join(''),
    [{ label: 'Cancel' }, { label: 'Save bookings', cls: 'primary', onClick: (root) => {
      let placed = 0;
      list.forEach((r, i) => { readRes(root.querySelector(`[data-r="${i}"]`), r); t.reservations.push(r); if (addToPlan && attachResToDay(t, r)) placed++; });
      save(t); S.view.tab = 'bookings'; render();
      toast(`${list.length} booking(s) saved${addToPlan ? `, ${placed} added to itinerary` : ''}`);
    } }]), 0);
}
function openResEditor(t, id) {
  const ex = t.reservations.find(r => r.id === id); const r = ex ? { ...ex } : { id: uid(), kind: 'flight', title: '', date: t.start || '', time: '', endDate: '', conf: '', details: '' };
  modal(ex ? 'Edit booking' : 'Add booking', `<div id="rf">${resForm(r)}</div>${ex ? '' : '<label class="row small"><input type="checkbox" id="r-add" checked> Add to itinerary</label>'}`,
    [...(ex ? [{ label: '🗑 Delete', cls: 'danger', onClick: () => { t.reservations = t.reservations.filter(x => x.id !== id); t.days.forEach(d => d.items = d.items.filter(i => i.resId !== id)); save(t); render(); } }] : []),
     { label: 'Cancel' }, { label: 'Save', cls: 'primary', onClick: (root) => {
      readRes(root.querySelector('#rf'), r);
      if (ex) { Object.assign(ex, r); t.days.forEach(d => d.items.forEach(i => { if (i.resId === id && !i.name.startsWith('Check-out')) Object.assign(i, { name: r.title, time: r.time, conf: r.conf }); })); }
      else { t.reservations.push(r); if (root.querySelector('#r-add')?.checked && !attachResToDay(t, r)) toast('Saved – date is outside the trip, so not added to a day'); }
      save(t); render();
    } }]);
}
function openExpense(t, id) {
  const ex = t.expenses.find(e => e.id === id);
  const e = ex ? { ...ex } : { id: uid(), desc: '', amount: '', paidBy: t.members.includes(S.settings.name) ? S.settings.name : t.members[0], split: t.members.slice(), cat: 'Food', date: todayISO() };
  modal(ex ? 'Edit expense' : 'Add expense', `<div class="field"><label>Description</label><input class="input" id="x-desc" value="${esc(e.desc)}" placeholder="e.g. Dinner at Gurney Drive"></div>
    <div class="row wrap"><div class="field"><label>Amount (${t.currency})</label><input type="number" step="0.01" min="0" class="input" id="x-amt" value="${e.amount}"></div>
    <div class="field"><label>Category</label><select class="input" id="x-cat">${EXP_CATS.map(c => `<option ${c === e.cat ? 'selected' : ''}>${c}</option>`).join('')}</select></div>
    <div class="field"><label>Date</label><input type="date" class="input" id="x-date" value="${e.date || ''}"></div></div>
    <div class="field"><label>Paid by</label><select class="input" id="x-paid">${t.members.map(m => `<option ${m === e.paidBy ? 'selected' : ''}>${esc(m)}</option>`).join('')}</select></div>
    <div class="field"><label>Split equally between</label><div class="row wrap" style="gap:6px" id="x-split">${t.members.map(m => `<span class="chip click ${e.split.includes(m) ? '' : 'off'}" data-m="${esc(m)}">${esc(m)}</span>`).join('')}</div></div>`,
  [...(ex ? [{ label: '🗑 Delete', cls: 'danger', onClick: () => { t.expenses = t.expenses.filter(x => x.id !== id); save(t); render(); } }] : []),
   { label: 'Cancel' }, { label: 'Save', cls: 'primary', onClick: (r) => {
    const amt = parseFloat(val(r, '#x-amt')); if (!val(r, '#x-desc') || !(amt > 0)) { toast('Enter a description and amount'); return false; }
    const split = [...r.querySelectorAll('#x-split .chip:not(.off)')].map(c => c.dataset.m); if (!split.length) { toast('Pick at least one person'); return false; }
    Object.assign(e, { desc: val(r, '#x-desc'), amount: amt, cat: val(r, '#x-cat'), date: val(r, '#x-date'), paidBy: val(r, '#x-paid'), split });
    if (ex) Object.assign(ex, e); else t.expenses.push(e); save(t); render();
  } }], (r) => r.querySelector('#x-split').onclick = (ev) => { const c = ev.target.closest('.chip'); if (c) c.classList.toggle('off'); });
}

// ---------- Export helpers ----------
function download(name, text, type = 'application/json') {
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type })); a.download = name; document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}
function tripText(t) {
  let s = `🧳 ${t.name}\n📅 ${fmtRange(t)}${t.dest ? '\n📍 ' + t.dest : ''}\n`;
  t.days.forEach((d, i) => { s += `\nDay ${i + 1}${d.date ? ' – ' + fmtDate(d.date) : ''}${d.title ? ' · ' + d.title : ''}\n`; d.items.forEach(it => s += `  ${it.time ? it.time + '  ' : '• '}${TYPES[it.type] || ''} ${it.name}${it.conf ? ' (#' + it.conf + ')' : ''}\n`); if (!d.items.length) s += '  (free day)\n'; });
  if (t.notes) s += `\n📝 Notes:\n${t.notes}\n`;
  return s + '\nPlanned with MeyPlanner';
}
function pickFile(accept) { return new Promise(res => { const i = document.createElement('input'); i.type = 'file'; i.accept = accept; i.onchange = () => res(i.files[0]); i.click(); }); }
async function copyText(s) { try { await navigator.clipboard.writeText(s); toast('Copied to clipboard'); } catch { modal('Copy', `<textarea class="input" style="min-height:260px">${esc(s)}</textarea>`, [{ label: 'Close' }]); } }

function openTrip(id) { S.view.screen = 'trip'; S.view.tripId = id; S.view.tab = 'plan'; S.view.showMap = false; S.view.addTarget = null; render._sameTrip = false; render(); }

// ---------- Drag & drop (pointer-based: works with mouse and touch) ----------
const Drag = {
  active: null,
  init() {
    document.addEventListener('pointerdown', (e) => {
      const h = e.target.closest('.drag'); if (!h || e.button > 0) return;
      const el = h.closest('.item'); if (!el) return; e.preventDefault();
      const rect = el.getBoundingClientRect();
      const ghost = el.cloneNode(true); ghost.classList.add('ghost');
      Object.assign(ghost.style, { width: rect.width + 'px', left: rect.left + 'px', top: rect.top + 'px' });
      const ph = document.createElement('div'); ph.className = 'placeholder'; ph.style.height = rect.height + 'px';
      el.after(ph); el.style.display = 'none'; document.body.appendChild(ghost); document.body.classList.add('dragging');
      this.active = { el, ghost, ph, dx: e.clientX - rect.left, dy: e.clientY - rect.top, id: el.dataset.id, y: e.clientY };
      const scroller = $('.side-body');
      const move = (ev) => {
        const a = this.active; if (!a) return; a.y = ev.clientY;
        ghost.style.left = ev.clientX - a.dx + 'px'; ghost.style.top = ev.clientY - a.dy + 'px';
        const under = document.elementFromPoint(ev.clientX, ev.clientY); const list = under && under.closest('.droplist'); if (!list) return;
        const items = [...list.querySelectorAll(':scope > .item')].filter(x => x !== el);
        let before = null; for (const it of items) { const r = it.getBoundingClientRect(); if (ev.clientY < r.top + r.height / 2) { before = it; break; } }
        // keep leg-distance labels attached: insert before the leg row preceding the item if present
        if (before) { const prev = before.previousElementSibling; list.insertBefore(ph, prev && prev.classList.contains('leg') ? prev : before); } else list.appendChild(ph);
      };
      const tick = () => { const a = this.active; if (!a || !scroller) return; const r = scroller.getBoundingClientRect(); if (a.y < r.top + 50) scroller.scrollTop -= 12; else if (a.y > r.bottom - 50) scroller.scrollTop += 12; a.raf = requestAnimationFrame(tick); };
      tick();
      const up = () => {
        window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up);
        const a = this.active; cancelAnimationFrame(a.raf); this.active = null; document.body.classList.remove('dragging');
        const list = ph.parentNode; const t = trip();
        if (list && list.dataset.list && t) {
          let idx = 0; for (const n of list.children) { if (n === ph) break; if (n.classList.contains('item') && n !== el) idx++; }
          const f = findItem(t, a.id);
          if (f) { const [it] = f.list.splice(f.idx, 1); const dest = listFor(t, list.dataset.list); dest.splice(Math.min(idx, dest.length), 0, it); save(t); }
        }
        ghost.remove(); render();
      };
      window.addEventListener('pointermove', move); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
    });
  }
};

// ---------- Event handling ----------
document.addEventListener('click', async (e) => {
  const ed = e.target.closest('[data-edit]'); if (ed) { e.preventDefault(); openItemEditor(trip(), ed.dataset.edit); return; }
  const el = e.target.closest('[data-act]'); if (!el) return;
  const act = el.dataset.act, id = el.dataset.id, t = trip();
  if (el.tagName === 'A') e.preventDefault();
  switch (act) {
    case 'home': S.view.screen = 'home'; S.view.homeTab = 'trips'; MapView.picking = false; render(); break;
    case 'hometab': S.view.screen = 'home'; S.view.homeTab = el.dataset.k; render(); break;
    case 'new-trip': openNewTrip(); break;
    case 'quick-draft': openQuickDraft(); break;
    case 'draft-online': openQuickDraft(el.dataset.k); break;
    case 'region': S.view.exploreRegion = el.dataset.k; S.view.exploreCountry = null; render(); break;
    case 'country': S.view.exploreCountry = S.view.exploreCountry === el.dataset.k ? null : el.dataset.k; render(); break;
    case 'fetch-places': {
      el.disabled = true; el.textContent = 'Searching live map data…';
      fetchDestination(t.dest).then(lib => { if (!t.center) t.center = lib.center; t.dest = lib._name; save(t); render(); toast(`Found ${lib.places.length} popular places`); })
        .catch(err => { toast(err.message === 'Failed to fetch' ? 'Needs an internet connection' : err.message); render(); });
      break; }
    case 'open-trip': openTrip(id); break;
    case 'open-guide': openGuide(MP_GUIDES.find(g => g.id === id)); break;
    case 'join-trip':
      if (!Sync.enabled()) { modal('Join a shared trip', '<p>To join live trips, first add the collaboration server URL in Settings (your friend can share it with you).</p>', [{ label: 'Close' }, { label: 'Open Settings', cls: 'primary', onClick: () => { S.view.homeTab = 'settings'; render(); } }]); break; }
      modal('Join a shared trip', '<div class="field"><label>Trip code</label><input class="input" id="j-code" placeholder="e.g. K7Q2XM" style="text-transform:uppercase;letter-spacing:3px"></div>', [{ label: 'Cancel' }, { label: 'Join', cls: 'primary', onClick: (r) => {
        const code = val(r, '#j-code').toUpperCase(); Sync.join(code).then(t2 => { openTrip(t2.id); toast('Joined trip!'); }).catch(err => toast(err.message || 'Could not join'));
      } }]); break;
    case 'import-file': { const f = await pickFile('.json,application/json'); if (!f) break; try { const d = JSON.parse(await f.text()); const t2 = normalizeTrip({ ...(d.trip || d), id: uid(), shareCode: undefined }); S.trips.unshift(t2); save(); openTrip(t2.id); toast('Trip imported'); } catch { toast('Not a valid MeyPlanner trip file'); } break; }
    case 'tab': S.view.tab = el.dataset.k; render(); break;
    case 'share-tab': S.view.tab = 'share'; render(); break;
    case 'toggle-map': S.view.showMap = !S.view.showMap; render(); setTimeout(() => MapView.map && MapView.map.invalidateSize(), 60); break;
    case 'edit-trip': openEditTrip(t); break;
    case 'collapse': if (e.target.closest('.day-tools') && !el.matches('.icon-btn')) break; S.view.collapsed[id] = !S.view.collapsed[id]; render(); break;
    case 'add-item': openItemEditor(t, null, id); break;
    case 'edit-item': openItemEditor(t, id); break;
    case 'focus-item': { const f = findItem(t, id); if (!f) break; const it = f.list[f.idx]; if (hasLL(it)) { if (window.innerWidth <= 900) { S.view.showMap = true; render(); } MapView.focus(it); } else openItemEditor(t, id); break; }
    case 'search-for': S.view.addTarget = id; if (window.innerWidth <= 900) { S.view.showMap = true; render(); } setTimeout(() => $('#map-search')?.focus(), 80); toast('Search for a place on the map'); break;
    case 'pin-for': S.view.addTarget = id; MapView.picking = true; if (window.innerWidth <= 900) S.view.showMap = true; render(); break;
    case 'pick-on-map': MapView.picking = !MapView.picking; render(); break;
    case 'search': searchPlaces($('#map-search').value.trim()); break;
    case 'optimize': {
      const d = t.days.find(x => x.id === id); const geo = d.items.filter(hasLL), other = d.items.filter(i => !hasLL(i));
      if (geo.length < 3) { toast('Need at least 3 mapped stops to optimize'); break; }
      d.items = [...nearestOrder(geo), ...other]; if (d.items.some(i => i.time)) scheduleDay(d.items.filter(hasLL));
      save(t); render(); MapView.draw(t); toast('Route optimized for shortest travel'); break; }
    case 'rename-day': { const d = t.days.find(x => x.id === id); modal('Day title', `<input class="input" id="d-title" value="${esc(d.title || '')}" placeholder="e.g. Heritage walk">`, [{ label: 'Cancel' }, { label: 'Save', cls: 'primary', onClick: (r) => { d.title = val(r, '#d-title'); save(t); render(); } }]); break; }
    case 'add-day-note': modal('📝 Trip notes', `<textarea class="input" id="n-text" style="min-height:220px" placeholder="Packing list, visa reminders, emergency contacts…">${esc(t.notes)}</textarea>`, [{ label: 'Cancel' }, { label: 'Save', cls: 'primary', onClick: (r) => { t.notes = r.querySelector('#n-text').value; save(t); } }]); break;
    case 'add-suggestion': { const p = libFor(t.dest).places.find(x => x[0] === el.dataset.name); t.ideas.push(placeItem(p)); save(t); render(); break; }
    case 'import-email': openImportEmail(t); break;
    case 'add-res': openResEditor(t); break;
    case 'edit-res': openResEditor(t, id); break;
    case 'add-exp': openExpense(t); break;
    case 'edit-exp': openExpense(t, id); break;
    case 'set-budget': modal('Trip budget', `<input type="number" min="0" class="input" id="b-amt" value="${t.budget || ''}" placeholder="Total budget in ${t.currency}">`, [{ label: 'Cancel' }, { label: 'Save', cls: 'primary', onClick: (r) => { t.budget = +val(r, '#b-amt') || 0; save(t); render(); } }]); break;
    case 'add-member': { const n = $('#new-member').value.trim(); if (n && !t.members.includes(n)) { t.members.push(n); t.expenses.forEach(x => { if (x.split.length === t.members.length - 1) x.split.push(n); }); save(t); render(); } break; }
    case 'rm-member': { const n = el.dataset.name; if (t.expenses.some(x => x.paidBy === n)) { toast(`${n} has paid expenses – reassign them first`); break; } t.members = t.members.filter(m => m !== n); t.expenses.forEach(x => x.split = x.split.filter(m => m !== n)); save(t); render(); break; }
    case 'start-share': { t.shareCode = Array.from({ length: 6 }, () => 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 32)]).join(''); await Sync.push(t); save(); render(); toast('Live session started'); break; }
    case 'stop-share': Sync.disconnect(); delete t.shareCode; save(); render(); break;
    case 'copy-code': copyText(t.shareCode); break;
    case 'export-trip': download(`${t.name.replace(/[^\w\- ]+/g, '').trim() || 'trip'}.meyplanner.json`, JSON.stringify({ app: 'MeyPlanner', version: 1, trip: { ...t, shareCode: undefined } }, null, 2)); break;
    case 'text-export': copyText(tripText(t)); break;
    case 'print': window.print(); break;
    case 'dup-trip': { const c = normalizeTrip(JSON.parse(JSON.stringify(t))); c.id = uid(); c.name += ' (copy)'; delete c.shareCode; S.trips.unshift(c); save(); openTrip(c.id); break; }
    case 'del-trip': modal('Delete trip?', `<p>“${esc(t.name)}” will be removed from this device.</p>`, [{ label: 'Cancel' }, { label: 'Delete', cls: 'danger', onClick: () => { S.trips = S.trips.filter(x => x !== t); save(); S.view.screen = 'home'; render(); } }]); break;
    case 'backup': download(`meyplanner-backup-${todayISO()}.json`, JSON.stringify({ app: 'MeyPlanner', backup: true, trips: S.trips, settings: S.settings }, null, 2)); break;
    case 'restore': { const f = await pickFile('.json'); if (!f) break; try { const d = JSON.parse(await f.text()); if (!d.trips) throw 0; S.trips = d.trips.map(normalizeTrip); if (d.settings) Object.assign(S.settings, d.settings); save(); render(); toast('Backup restored'); } catch { toast('Not a valid backup file'); } break; }
    case 'wipe': modal('Delete all data?', '<p>This removes every trip on this device. Export a backup first if unsure.</p>', [{ label: 'Cancel' }, { label: 'Delete everything', cls: 'danger', onClick: () => { S.trips = []; save(); render(); } }]); break;
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.target.id === 'map-search') searchPlaces(e.target.value.trim());
  if (e.key === 'Enter' && e.target.id === 'new-member') $('[data-act="add-member"]').click();
  if (e.key === 'Escape') $('#modal-root').innerHTML = '';
});
document.addEventListener('input', (e) => {
  if (e.target.dataset.input === 'exploreQ') { S.view.exploreQ = e.target.value; const pos = e.target.selectionStart; render(); const i = $('[data-input="exploreQ"]'); i.focus(); i.setSelectionRange(pos, pos); }
});
document.addEventListener('change', (e) => {
  const k = e.target.dataset.set; if (!k) return;
  S.settings[k] = e.target.value.trim(); save(); if (k === 'theme' || k === 'syncUrl') render(); else toast('Saved');
});
window.addEventListener('resize', () => MapView.map && MapView.map.invalidateSize());
// Android hardware back button (Capacitor)
document.addEventListener('backbutton', () => {
  if ($('.backdrop')) $('#modal-root').innerHTML = '';
  else if (S.view.screen === 'trip' && S.view.showMap && window.innerWidth <= 900) { S.view.showMap = false; render(); }
  else if (S.view.screen === 'trip') { S.view.screen = 'home'; render(); }
  else if (S.view.homeTab !== 'trips') { S.view.homeTab = 'trips'; render(); }
  else window.Capacitor?.Plugins?.App?.exitApp?.();
});

// ---------- Boot ----------
load();
// Expose a few internals for testing / debugging
window.MeyPlanner = { S, parseReservation, balances, settleUp, draftItinerary, render };
Drag.init(); render(); loadLeaflet();
if (window.Capacitor?.Plugins?.App) window.Capacitor.Plugins.App.addListener('backButton', () => document.dispatchEvent(new Event('backbutton')));
})();
