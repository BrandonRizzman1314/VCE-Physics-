(function () {
  const { f, ex, arrow, lab, A, V: U, mc, nu } = window.H; window.TOPICS = window.TOPICS || {};
  const fr = (a, b) => `<span class="frac"><span>${a}</span><span>${b}</span></span>`;
  const card = (title, eq, where, note) => `<div class="fcard"><h4>${title}</h4><div class="eq">${eq}</div><p class="where"><b>Where:</b> ${where}</p>${note ? `<p class="where">${note}</p>` : ''}</div>`;

  /* Interactive 1: animated top-down view of uniform circular motion */
  function orbit(root) {
    const w = root.querySelector('.o1');
    w.innerHTML = `<h4>Top view: a ball on a string moving in a horizontal circle</h4>
      <label>Mass m: <b class="vm">2</b> kg <input type="range" data-k="m" min="1" max="10" value="2"></label>
      <label>Speed v: <b class="vv">8</b> m s<sup>−1</sup> <input type="range" data-k="v" min="1" max="20" value="8"></label>
      <label>Radius r: <b class="vr">8</b> m <input type="range" data-k="r" min="2" max="20" value="8"></label>
      <svg viewBox="0 0 600 300"></svg>
      <p><button class="ghost bp">Pause</button> <button class="ghost bc">Cut the string!</button> <button class="ghost br">Reset</button></p>
      <div class="out"></div><p class="mute">Arrow lengths grow with the quantity but are not to scale. The animation speed is for display only.</p>`;
    const S = { phi: 0, cut: false, paused: false, x: 0, y: 0, tx: 0, ty: 0 }, cx = 300, cy = 150;
    const vals = () => { const V = {}; w.querySelectorAll('input').forEach(i => V[i.dataset.k] = +i.value); return V; };
    const readout = () => {
      const V = vals(), a = V.v * V.v / V.r;
      ['m', 'v', 'r'].forEach(k => w.querySelector('.v' + k).textContent = V[k]);
      w.querySelector('.out').innerHTML = `<div>Centripetal acceleration v²/r<b>${f(a, 2)} ${A}</b></div><div>Net force mv²/r<b>${f(V.m * a, 1)} N</b></div><div>Period 2πr/v<b>${f(2 * Math.PI * V.r / V.v, 2)} s</b></div>`;
    };
    const draw = (V, om) => {
      const R = 40 + 5 * (V.r - 2), a = V.v * V.v / V.r, rad = 7 + V.m * .6;
      const bx = S.cut ? S.x : cx + R * Math.cos(S.phi), by = S.cut ? S.y : cy - R * Math.sin(S.phi);
      const ux = S.cut ? S.tx : -Math.sin(S.phi), uy = S.cut ? S.ty : -Math.cos(S.phi), Lv = 10 + 5 * V.v, Lc = 12 + 100 * a / (a + 10);
      let s = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="gray" stroke-dasharray="4 6"/><circle cx="${cx}" cy="${cy}" r="4" fill="gray"/><text x="${cx + 8}" y="${cy + 16}">centre</text>`;
      if (!S.cut) s += `<line x1="${cx}" y1="${cy}" x2="${bx}" y2="${by}" stroke="gray"/><text x="${(cx + bx) / 2 + 6}" y="${(cy + by) / 2 - 6}">r</text>`;
      s += `<circle cx="${bx}" cy="${by}" r="${rad}" fill="#8895a8" stroke="gray"/>` + arrow(bx, by, bx + ux * Lv, by + uy * Lv, '#2f5fd0') + `<text x="${bx + ux * Lv + 6}" y="${by + uy * Lv}" fill="#2f5fd0">velocity v</text>`;
      if (!S.cut) { const dx = (cx - bx) / R, dy = (cy - by) / R; s += arrow(bx, by, bx + dx * Lc, by + dy * Lc, '#c23b3b') + `<text x="${bx + dx * Lc * .5 + 6}" y="${by + dy * Lc * .5 + 14}" fill="#c23b3b">net force F</text>`; }
      else s += `<text x="300" y="285" text-anchor="middle">String cut: no net force, so the ball moves in a straight line along the tangent.</text>`;
      w.querySelector('svg').innerHTML = s;
    };
    let last = performance.now();
    const tick = now => {
      if (!w.isConnected) return;
      const dt = Math.min(.05, (now - last) / 1000); last = now;
      const V = vals(), om = Math.min(4, Math.max(.4, V.v / V.r)), R = 40 + 5 * (V.r - 2);
      if (!S.paused) { if (!S.cut) S.phi += om * dt; else if (S.x > -50 && S.x < 650 && S.y > -50 && S.y < 350) { S.x += S.tx * om * R * dt; S.y += S.ty * om * R * dt; } }
      draw(V, om); requestAnimationFrame(tick);
    };
    w.oninput = readout;
    w.onclick = e => {
      const c = e.target.className || '';
      if (c.includes('bp')) { S.paused = !S.paused; e.target.textContent = S.paused ? 'Play' : 'Pause'; }
      else if (c.includes('bc') && !S.cut) { const R = 40 + 5 * (vals().r - 2); S.tx = -Math.sin(S.phi); S.ty = -Math.cos(S.phi); S.x = cx + R * Math.cos(S.phi); S.y = cy - R * Math.sin(S.phi); S.cut = true; }
      else if (c.includes('br')) { S.cut = false; S.phi = 0; }
    };
    readout(); requestAnimationFrame(tick);
  }

  /* Interactive 2: period-based calculator */
  const L2 = lab('l2', 'Calculator using the period T', [['m', 'Mass m (kg)', .1, 5, .5, .1], ['r', 'Radius r (m)', .5, 10, 2, .5], ['T', 'Period T (s)', .5, 10, 2, .1]], V => {
    const v = 2 * Math.PI * V.r / V.T, a = 4 * Math.PI ** 2 * V.r / V.T ** 2;
    return { out: [['Speed v = 2πr/T', f(v, 2) + ' ' + U], ['Acceleration a = 4π²r/T²', f(a, 2) + ' ' + A], ['Net force F = ma', f(V.m * a, 2) + ' N']] };
  });

  window.TOPICS['1E'] = { title: 'Basic circular motion', sections: [
    { id: 'idea', title: 'Why circular motion needs a force', init: [orbit], html: `
      <p>In <b>uniform circular motion</b> an object moves in a circle at constant <i>speed</i>. But velocity is a vector, and its direction keeps changing. A changing velocity means the object is <b>accelerating</b>, even though its speed is steady. So there must be a net force.</p>
      <div class="o1 w"></div>
      <h3>What to look for</h3>
      <ol>
        <li><b>The velocity (blue) is always along the tangent</b>, at right angles to the radius. It keeps turning as the ball goes round.</li>
        <li><b>The net force (red) always points toward the centre.</b> It is at right angles to the velocity, so it changes the ball’s direction but never its speed.</li>
        <li><b>Press “Cut the string!”</b> With no net force, the ball flies off in a straight line along the tangent. It does <i>not</i> fly outward. That is Newton’s first law.</li>
        <li><b>Raise the speed, then shrink the radius</b> and watch the force grow. Tighter and faster turns need more force.</li>
      </ol>
      <div class="key">The force toward the centre is called the <b>centripetal force</b>, and the acceleration is the <b>centripetal acceleration</b>. “Centripetal” means “centre-seeking”.</div>` },
    { id: 'formulas', title: 'The formulas, step by step', init: [L2], html: `
      <p>Start with how fast the object travels, then find the acceleration, then use Newton’s second law to get the force.</p>
      <h3>Step 1: speed from the period</h3>` +
      card('Speed in a circle', `v = ${fr('2 π r', 'T')}`, '<b>v</b> = speed (m s<sup>−1</sup>). <b>r</b> = radius of the circle (m). <b>T</b> = period, the time for one full revolution (s). <b>2πr</b> = the circumference, the distance for one lap.', 'Speed is distance ÷ time. One lap is a distance 2πr in a time T. The frequency is f = 1 ÷ T (revolutions per second).') +
      `<h3>Step 2: centripetal acceleration</h3>` +
      card('Centripetal acceleration', `a = ${fr('v²', 'r')}`, '<b>a</b> = acceleration toward the centre (m s<sup>−2</sup>). <b>v</b> = speed (m s<sup>−1</sup>). <b>r</b> = radius (m).', 'The faster the object goes (v²) and the tighter the circle (small r), the larger the acceleration.') +
      `<h3>Step 3: Newton’s second law</h3>` +
      card('Net force toward the centre', `F<sub>net</sub> = m a = ${fr('m v²', 'r')}`, '<b>F<sub>net</sub></b> = net force toward the centre (N). <b>m</b> = mass (kg). The other symbols are as above.', 'This is <i>not</i> an extra force. It is the total of all the real forces pointing toward the centre.') +
      `<h3>Using the period instead of the speed</h3>
      <p>Substitute v = 2πr ÷ T into the formulas above:</p>` +
      card('Acceleration and force from the period', `a = ${fr('4 π² r', 'T²')} &nbsp; &nbsp; F<sub>net</sub> = ${fr('4 π² m r', 'T²')}`, '<b>T</b> = period (s). The other symbols are as above.', 'Use these when the question gives the time for one lap or the time for several laps (divide to find T first).') +
      `<h3>Which one do I use?</h3>
      <table class="legend plain"><tr><th>You know</th><th>You want</th><th>Use</th></tr>
      <tr><td>r and T</td><td>speed</td><td>v = 2πr ÷ T</td></tr>
      <tr><td>v and r</td><td>acceleration</td><td>a = v² ÷ r</td></tr>
      <tr><td>m, v and r</td><td>net force</td><td>F = mv² ÷ r</td></tr>
      <tr><td>m, r and T</td><td>net force</td><td>F = 4π²mr ÷ T²</td></tr></table>
      <p>Doubling the speed makes the force <b>four times</b> as large (v is squared). Doubling the radius halves it.</p>
      <div class="l2 w"></div>` },
    { id: 'forces', title: 'What provides the centripetal force?', html: `
      <p>There is no special centripetal force. In every problem, find the real force (or part of a force) that points toward the centre. That one is the centripetal force.</p>
      <table class="legend plain"><tr><th>Situation</th><th>What points toward the centre</th></tr>
      <tr><td>Ball on a string</td><td>Tension in the string</td></tr>
      <tr><td>Car on a flat, circular bend</td><td>Friction between the tyres and the road</td></tr>
      <tr><td>Moon or satellite in orbit</td><td>Gravitational force</td></tr>
      <tr><td>Person pinned in a spinning drum</td><td>Normal force from the wall</td></tr>
      <tr><td>Car on a banked bend</td><td>Horizontal component of the normal force (see 1F)</td></tr></table>
      <div class="warn"><b>Common mistakes</b><br>1. Drawing “centripetal force” as an extra arrow on a free-body diagram. It is already one of the forces you have drawn.<br>2. Believing a “centrifugal force” pushes objects outward. The feeling of being thrown outward is your body trying to keep going in a straight line.<br>3. Thinking the speed changes. In <i>uniform</i> circular motion only the direction changes.<br>4. Using v instead of v² in F = mv²/r.</div>` },
    { id: 'examples', title: 'Worked examples', html: `<p>Method: (1) find the speed, using 2πr ÷ T if you are given the time for a lap; (2) identify the force toward the centre; (3) set it equal to mv² ÷ r; (4) solve.</p>` +
      ex('car on a roundabout', ['<b>Situation:</b> a 900 kg car drives around a roundabout of radius 25 m at 10 ' + U + '. What friction force is needed?', '<b>Friction provides the net force toward the centre.</b>', '<b>Substitute:</b> F = mv² ÷ r = (900)(10)² ÷ 25 = 90 000 ÷ 25', '<b>Answer:</b> <b>3600 N</b> toward the centre.']) +
      ex('whirling a stopper', ['<b>Situation:</b> a 0.20 kg rubber stopper on a string is whirled in a horizontal circle of radius 0.80 m, completing 10 revolutions in 6.0 s. Find the speed, acceleration and tension (ignore gravity).', '<b>Period:</b> T = 6.0 ÷ 10 = 0.60 s.', '<b>Speed:</b> v = 2πr ÷ T = 2π(0.80) ÷ 0.60 = <b>8.4 ' + U + '</b>.', '<b>Acceleration:</b> a = v² ÷ r = (8.38)² ÷ 0.80 = <b>88 ' + A + '</b> toward the centre.', '<b>Tension:</b> the tension is the net force, T = ma = (0.20)(87.7) = <b>18 N</b>.']) },
  ], questions: [
    mc('A ball moves at constant speed in a horizontal circle. What is the direction of the net force on it?', ['Along the direction of motion', 'Away from the centre', 'Toward the centre', 'There is no net force'], 2, 'The acceleration, and so the net force, points toward the centre of the circle.'),
    mc('A ball on a string moves in a circle. The string suddenly breaks. How does the ball move?', ['Straight outward from the centre', 'In a straight line along the tangent', 'Continues in the circle', 'Toward the centre'], 1, 'With no net force, the ball keeps its velocity at that instant: a straight line along the tangent (Newton’s first law).'),
    mc('Which force provides the centripetal force for the Moon orbiting Earth?', ['Friction', 'Tension', 'Gravity', 'The normal force'], 2, 'The gravitational pull of Earth on the Moon points toward the centre of the orbit.'),
    nu('A 0.50 kg ball moves at 4.0 ' + U + ' in a circle of radius 2.0 m. What is the net force on it?', 4, .05, 'N', 'F = mv² ÷ r.', 'F = (0.50)(4.0)² ÷ 2.0 = 4.0 N.'),
    nu('A runner travels at 10 ' + U + ' around a circular track of radius 20 m. What is the period of one lap?', 12.6, .1, 's', 'The distance for one lap is the circumference, 2πr.', 'T = 2πr ÷ v = 2π(20) ÷ 10 = 12.6 s.'),
    nu('A 1000 kg car travels at 15 ' + U + ' on a flat circular curve of radius 50 m. What friction force is needed?', 4500, 5, 'N', 'Friction provides the net force toward the centre.', 'F = mv² ÷ r = (1000)(15)² ÷ 50 = 4500 N.'),
    nu('A 0.30 kg mass on a string moves in a horizontal circle of radius 0.50 m with a period of 0.80 s. What is the tension in the string?', 9.25, .1, 'N', 'You can use F = 4π²mr ÷ T², or find v first.', 'F = 4π²mr ÷ T² = 4π²(0.30)(0.50) ÷ (0.80)² = 9.3 N.'),
    mc('The speed of an object in circular motion doubles and the radius stays the same. The required net force becomes:', ['The same', 'Twice as large', 'Four times as large', 'Half as large'], 2, 'F = mv² ÷ r, so F is proportional to v². Doubling v multiplies F by 4.')
  ] };
})();
