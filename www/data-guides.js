// Auto-generated "MeyPlanner Picks" guides – runs after all destination files are loaded.
(() => {
const D = window.MP_DESTINATIONS;
const hav = (a, b) => { const r = x => x * Math.PI / 180, dLa = r(b[0] - a[0]), dLn = r(b[1] - a[1]); const h = Math.sin(dLa / 2) ** 2 + Math.cos(r(a[0])) * Math.cos(r(b[0])) * Math.sin(dLn / 2) ** 2; return 12742 * Math.asin(Math.sqrt(h)); };
const covered = new Set(window.MP_GUIDES.map(g => g.dest));
Object.entries(D).forEach(([name, d], i) => {
  if (covered.has(name)) return;
  const left = d.places.slice(), order = [left.shift()];
  while (left.length) { const l = order[order.length - 1]; let bi = 0, bd = 1e9; left.forEach((p, j) => { const k = hav([l[2], l[3]], [p[2], p[3]]); if (k < bd) { bd = k; bi = j; } }); order.push(left.splice(bi, 1)[0]); }
  const nDays = Math.max(2, Math.min(4, Math.round(order.length / 3)));
  const per = Math.ceil(order.length / nDays), days = [];
  for (let k = 0; k < nDays; k++) { const c = order.slice(k * per, (k + 1) * per).map(p => p[0]); if (c.length) days.push(c); }
  const cats = [...new Set(d.places.map(p => p[1]))].slice(0, 2).map(c => c[0].toUpperCase() + c.slice(1));
  window.MP_GUIDES.push({ id: 'auto-' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), title: `${days.length} days in ${name}: the highlights`, dest: name,
    author: 'MeyPlanner Picks', likes: 300 + ((name.length * 97 + i * 53) % 900), tags: [d.region || 'World', ...(d.tags || []), ...cats].slice(0, 3), days });
});
})();
