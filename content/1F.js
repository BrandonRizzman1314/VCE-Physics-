(function () {
  const { f, ex, arrow, lab, mc, nu, V: U } = window.H; window.TOPICS = window.TOPICS || {};
  const fr = (a, b) => `<span class="frac"><span>${a}</span><span>${b}</span></span>`;
  const T = n => `<span class="fn">${n}</span>`;
  const card = (title, eq, where, note) => `<div class="fcard"><h4>${title}</h4><div class="eq">${eq}</div><p class="where"><b>Where:</b> ${where}</p>${note ? `<p class="where">${note}</p>` : ''}</div>`;
  const g = 9.8;

  /* Interactive 1: cross-section of a banked curve */
  const D = lab('d1', 'Banked curve, seen from behind (car mass 1000 kg, centre of the circle is to the left)', [['t', 'Banking angle θ (°)', 0, 40, 15], ['v', 'Speed v (m/s)', 5, 40, 20], ['r', 'Radius r (m)', 20, 200, 100]], V => {
    const m = 1000, th = V.t * Math.PI / 180, s = Math.sin(th), c = Math.cos(th), Fc = m * V.v * V.v / V.r, W = m * g, N = W * c + Fc * s, fr = W * s - Fc * c;
    const K = 110 / Math.max(W, N, Math.abs(fr)), x0 = 60 + 150 * c, y0 = 200 - 150 * s, cx = x0 - 11 * s, cy = y0 - 11 * c, hasF = Math.abs(fr) > 0.02 * W;
    const svg = `<polygon points="60,200 ${60 + 300 * c},${200 - 300 * s} ${60 + 300 * c},200" fill="#8895a8" fill-opacity=".25"/><line x1="60" y1="200" x2="${60 + 300 * c}" y2="${200 - 300 * s}" stroke="gray" stroke-width="4"/>` +
      `<line x1="14" y1="${cy}" x2="${cx}" y2="${cy}" stroke="gray" stroke-dasharray="3 5"/><text x="16" y="${cy - 8}">← towards the centre of the circle</text>` +
      `<g transform="translate(${x0},${y0}) rotate(${-V.t})"><rect x="-30" y="-22" width="60" height="22" rx="5" fill="#8895a8" fill-opacity=".6" stroke="gray"/></g>` +
      arrow(cx, cy, cx - K * N * s, cy, '#1f8a4c', 1) + arrow(cx, cy, cx, cy - K * N * c, '#1f8a4c', 1) +
      arrow(cx, cy, cx, cy + K * W, '#c23b3b') + arrow(cx, cy, cx - K * N * s, cy - K * N * c, '#2f5fd0') + (hasF ? arrow(cx, cy, cx + K * fr * c, cy - K * fr * s, '#e08a1e') : '') +
      `<text x="${cx + 8}" y="${cy + K * W + 4}" fill="#c23b3b">Weight mg</text><text x="${cx - K * N * s + 8}" y="${cy - K * N * c - 6}" fill="#2f5fd0">Normal N</text>` + (hasF ? `<text x="${cx + K * fr * c + 6}" y="${cy - K * fr * s - 6}" fill="#e08a1e">Friction</text>` : '') +
      `<text x="590" y="350" text-anchor="end">green dashed: components of N</text>`;
    const ideal = th > 0 ? Math.sqrt(V.r * g * Math.tan(th)) : 0;
    const status = V.t === 0 ? 'Flat road: friction must supply all of the force toward the centre' : !hasF ? 'Ideal speed: no friction needed' : fr < 0 ? 'Too fast: friction acts down the slope' : 'Too slow: friction acts up the slope';
    return { svg, out: [['Design speed for this θ and r', f(ideal) + ' ' + U], ['Net force toward centre mv²/r', f(Fc, 0) + ' N'], ['Normal force N', f(N, 0) + ' N'], ['Status', status]] };
  }, '0 0 600 360');

  /* Interactive 2: ideal angle calculator */
  const L1 = lab('l1', 'Angle calculator: tan θ = v² / (rg)', [['v', 'Design speed v (m/s)', 5, 40, 20], ['r', 'Radius r (m)', 20, 200, 100]], V => {
    const q = V.v * V.v / (V.r * g);
    return { out: [['v² ÷ (rg)', f(q, 3)], ['Banking angle θ = tan⁻¹(v²/rg)', f(Math.atan(q) * 180 / Math.PI) + '°'], ['Speed in km/h', f(V.v * 3.6, 0)]] };
  });

  window.TOPICS['1F'] = { title: 'Banked circular motion', sections: [
    { id: 'idea', title: 'How banking works', init: [D], html: `
      <p>On a flat road, <b>friction</b> alone turns a car around a bend. On wet or icy roads it may not be enough. Engineers <b>bank</b> the road, tilting it so the outside edge is higher. The road’s <b>normal force</b> is perpendicular to the surface, so it now tilts toward the centre of the bend and helps turn the car.</p>
      <div class="d1 w"></div>
      <h3>What to look for in the diagram</h3>
      <ol>
        <li><b>The circle is horizontal.</b> The centre of the circle is straight to the left of the car, level with it. It is not “up the slope”.</li>
        <li><b>The normal force (blue) leans toward the centre.</b> Its horizontal part (green) is the force that turns the car. Increase θ to see that part grow.</li>
        <li><b>Set θ = 15° and r = 100 m, then slide the speed.</b> At the design speed the status reads “no friction needed” and the orange arrow vanishes.</li>
        <li><b>Go faster than the design speed:</b> the car wants to slide outward and up the bank, so friction acts <i>down</i> the slope. <b>Slower:</b> it wants to slide inward, so friction acts <i>up</i> the slope.</li>
      </ol>
      <div class="key">The weight and the normal force are the <i>only</i> forces needed at the design speed. Their sum points horizontally toward the centre, and that sum is the net force mv²/r.</div>` },
    { id: 'formulas', title: 'The formulas, step by step', init: [L1], html: `
      <p>At the design speed there are two forces, weight and normal force. We split the normal force into a vertical and a horizontal part, then use Newton’s second law in each direction.</p>
      <h3>Step 1: balance the vertical forces</h3>` +
      card('Vertical direction (no vertical acceleration)', `N ${T('cos')} θ = m g`, '<b>N</b> = normal force from the road (N). <b>θ</b> = banking angle, the angle of the road above the horizontal. <b>m</b> = mass of the car (kg). <b>g</b> = 9.8 N kg<sup>−1</sup>.', 'The upward part of N, N cos θ, must exactly cancel the weight, because the car does not move up or down.') +
      `<h3>Step 2: the horizontal force provides the centripetal force</h3>` +
      card('Horizontal direction (toward the centre)', `N ${T('sin')} θ = ${fr('m v²', 'r')}`, '<b>v</b> = speed of the car (m s<sup>−1</sup>). <b>r</b> = radius of the circle the car follows (m). The other symbols are as above.', 'The sideways part of N, N sin θ, is the net force toward the centre, so it equals mv²/r.') +
      `<h3>Step 3: divide one equation by the other</h3>` +
      card('The banking angle', `${T('tan')} θ = ${fr('v²', 'r g')}`, '<b>θ</b> = ideal banking angle. <b>v</b> = design speed (m s<sup>−1</sup>). <b>r</b> = radius (m). <b>g</b> = 9.8 N kg<sup>−1</sup>.', 'Dividing, N and m cancel (and sin θ ÷ cos θ = tan θ). <b>The mass does not matter.</b> A truck and a motorbike have the same design speed on the same bend.') +
      `<div class="eq"> ${fr('N sin θ', 'N cos θ')} = ${fr('m v² ÷ r', 'm g')} &nbsp;⟹&nbsp; tan θ = ${fr('v²', 'r g')}</div>
      <h3>Rearranged versions</h3>` +
      card('Design speed for a given angle', `v = <span class="sq">√<span>r g ${T('tan')} θ</span></span>`, 'Use this when you know the bend’s radius and angle and want the speed with no friction needed.') +
      card('Normal force', `N = ${fr('m g', T('cos') + ' θ')}`, 'Use this when asked for the normal force at the design speed. It comes straight from the vertical equation. Notice that N is bigger than mg.') +
      `<h3>Which one do I use?</h3>
      <table class="legend"><tr><th>You know</th><th>You want</th><th>Use</th></tr>
      <tr><td>v and r</td><td>banking angle θ</td><td>tan θ = v² ÷ (rg), then θ = tan<sup>−1</sup>(…)</td></tr>
      <tr><td>θ and r</td><td>design speed v</td><td>v = √(rg tan θ)</td></tr>
      <tr><td>m and θ</td><td>normal force N</td><td>N = mg ÷ cos θ</td></tr></table>
      <div class="l1 w"></div>` },
    { id: 'examples', title: 'Worked examples and traps', html: `
      <p>Follow the same four steps every time: <b>draw</b> the weight and the normal force, <b>resolve</b> N into vertical and horizontal parts, <b>write</b> the vertical equation and the horizontal equation, then <b>solve</b>.</p>` +
      ex('finding the banking angle', ['<b>Situation:</b> a car travels at 25 ' + U + ' around a bend of radius 120 m. At what angle must the track be banked so no friction is needed?', '<b>Choose the formula:</b> we know v and r and want θ, so tan θ = v² ÷ (rg).', '<b>Substitute:</b> tan θ = 25² ÷ (120 × 9.8) = 625 ÷ 1176 = 0.531', '<b>Solve:</b> θ = tan<sup>−1</sup>(0.531) = <b>28°</b>.']) +
      ex('design speed and normal force', ['<b>Situation:</b> a bend of radius 150 m is banked at 12°. (a) What is the design speed? (b) What is the normal force on a 900 kg car travelling at that speed?', '<b>(a) Formula:</b> v = √(rg tan θ) = √(150 × 9.8 × tan 12°) = √312 = <b>17.7 ' + U + '</b> (about 64 km h<sup>−1</sup>).', '<b>(b) Vertical balance:</b> N cos θ = mg, so N = mg ÷ cos θ.', '<b>Substitute:</b> N = (900)(9.8) ÷ cos 12° = 8820 ÷ 0.978 = <b>9.0 × 10³ N</b>.']) +
      `<div class="warn"><b>Common mistakes</b><br>1. Pointing the centripetal force <i>up the slope</i>. The centre of the circle is horizontal, so the force toward it is horizontal.<br>2. Writing N = mg. On a bank, N is larger than mg (N = mg ÷ cos θ).<br>3. Adding “centripetal force” to the diagram as its own arrow. It is just the horizontal part of N.<br>4. Using the mass to find θ or v. It cancels.</div>` }
  ], questions: [
    mc('On a frictionless banked curve, which force provides the centripetal force?', ['The weight', 'The horizontal component of the normal force', 'The vertical component of the normal force', 'Air resistance'], 1, 'N sin θ points horizontally toward the centre of the circle, so it supplies the net force toward the centre.'),
    nu('A road is banked for vehicles travelling at 20 ' + U + ' around a curve of radius 100 m. What is the banking angle?', 22.2, .3, '°', 'Use tan θ = v² ÷ (rg).', 'tan θ = 400 ÷ (100 × 9.8) = 0.408, so θ = 22.2°.'),
    nu('A curve of radius 80 m is banked at 15°. At what speed can cars take it without friction?', 14.5, .15, U, 'Rearrange: v² = rg tan θ.', 'v² = (80)(9.8) tan 15° = 210, so v = 14.5 ' + U + '.'),
    mc('A car takes a banked curve faster than the design speed. Which way does the friction on it act?', ['Up the slope', 'Down the slope', 'Horizontally outward', 'There is no friction'], 1, 'The car tends to slide outward and up the slope, so friction acts down the slope to oppose that.'),
    mc('A car takes a banked curve slower than the design speed. Which way does friction act?', ['Down the slope', 'Up the slope', 'Vertically downward', 'There is no friction'], 1, 'The car tends to slide inward and down the slope, so friction acts up the slope.'),
    nu('A 800 kg car takes a 10° bank at its design speed with no friction. What is the normal force on it?', 7960, 15, 'N', 'The vertical forces balance: N cos θ = mg.', 'N = mg ÷ cos θ = (800)(9.8) ÷ cos 10° = 7960 N.'),
    nu('A 1200 kg car travels at the design speed on a 15° bank. What is the normal force on it?', 12175, 20, 'N', 'Use N = mg ÷ cos θ. Is it bigger or smaller than the weight?', 'N = (1200)(9.8) ÷ cos 15° = 11760 ÷ 0.966 = 1.22 × 10⁴ N.'),
    mc('The ideal banking angle (no friction) for a given speed and radius depends on:', ['The mass of the car', 'Neither the mass nor the speed', 'The speed and radius only', 'The normal force only'], 2, 'tan θ = v² ÷ (rg). The mass cancels, so only v and r matter.')
  ] };
})();
