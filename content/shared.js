window.H = (function () {
  const f = (x, d = 1) => (+x).toFixed(d);
  const ex = (t, i) => `<div class="steps"><h4>Worked example: ${t}</h4><ol>${i.map(x => `<li>${x}</li>`).join('')}</ol><button class="ghost">Show next step</button></div>`;
  const arrow = (x1, y1, x2, y2, c, d) => {
    if (Math.hypot(x2 - x1, y2 - y1) < 3) return '';
    const a = Math.atan2(y2 - y1, x2 - x1), h = 11;
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="3"${d ? ' stroke-dasharray="6 4"' : ''}/><polygon fill="${c}" points="${x2},${y2} ${x2 - h * Math.cos(a - .4)},${y2 - h * Math.sin(a - .4)} ${x2 - h * Math.cos(a + .4)},${y2 - h * Math.sin(a + .4)}"/>`;
  };
  /* slider lab: sl = [[key,label,min,max,default,step]], fn(values) -> {out:[[label,value]], svg} */
  const lab = (cls, title, sl, fn, vb) => root => {
    const w = root.querySelector('.' + cls);
    w.innerHTML = `<h4>${title}</h4>` + sl.map(([k, l, mn, mx, v, st]) => `<label>${l}: <b class="v${k}">${v}</b> <input type="range" data-k="${k}" min="${mn}" max="${mx}" step="${st || 1}" value="${v}"></label>`).join('') + (vb ? `<svg viewBox="${vb}"></svg>` : '') + '<div class="out"></div>';
    const upd = () => {
      const V = {}; w.querySelectorAll('input').forEach(i => { V[i.dataset.k] = +i.value; w.querySelector('.v' + i.dataset.k).textContent = i.value; });
      const r = fn(V); if (vb) w.querySelector('svg').innerHTML = r.svg || '';
      w.querySelector('.out').innerHTML = r.out.map(([a, b]) => `<div>${a}<b>${b}</b></div>`).join('');
    };
    w.oninput = upd; upd();
  };
  return { f, ex, arrow, lab, A: 'm s<sup>−2</sup>', V: 'm s<sup>−1</sup>',
    mc: (q, o, a, s, h) => ({ q, o, a, s, h }), nu: (q, n, t, u, h, s) => ({ q, n, t, u, h, s }) };
})();
