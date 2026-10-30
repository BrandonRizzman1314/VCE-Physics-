(function () {
  const { f, ex, arrow, lab, A, V: U, mc, nu } = window.H; window.TOPICS = window.TOPICS || {};
  const fr = (a, b) => `<span class="frac"><span>${a}</span><span>${b}</span></span>`;
  const sq = x => `<span class="sq">√<span>${x}</span></span>`;
  const card = (title, eq, where, note) => `<div class="fcard"><h4>${title}</h4><div class="eq">${eq}</div><p class="where"><b>Where:</b> ${where}</p>${note ? `<p class="where">${note}</p>` : ''}</div>`;
  const g = 9.8, B = '#2f5fd0', R = '#c23b3b', G = '#1f8a4c';

  /* Interactive 1: forces at the top or bottom of a vertical circle */
  function loop(root) {
    const w = root.querySelector('.p1'); let pos = 'top';
    w.innerHTML = `<h4>Forces in a vertical circle (side view)</h4><div class="pick"><button data-p="top">Top of the circle</button><button data-p="bottom">Bottom of the circle</button></div>
      <label>Mass m: <b class="vm">60</b> kg <input type="range" data-k="m" min="1" max="100" value="60"></label>
      <label>Radius r: <b class="vr">10</b> m <input type="range" data-k="r" min="2" max="40" value="10"></label>
      <label>Speed v at this point: <b class="vv">12</b> m s<sup>−1</sup> <input type="range" data-k="v" min="1" max="30" value="12"></label>
      <svg viewBox="0 0 600 350"></svg><div class="out"></div>`;
    const draw = () => {
      const V = {}; w.querySelectorAll('input').forEach(i => { V[i.dataset.k] = +i.value; w.querySelector('.v' + i.dataset.k).textContent = i.value; });
      w.querySelectorAll('.pick button').forEach(b => b.classList.toggle('on', b.dataset.p === pos));
      const W = V.m * g, Fc = V.m * V.v * V.v / V.r, top = pos === 'top', raw = top ? Fc - W : W + Fc, N = Math.max(0, raw), lost = top && raw < 0;
      const K = 90 / Math.max(W, N, Fc), x = 300, y = top ? 50 : 250;
      let s = `<circle cx="300" cy="150" r="100" fill="none" stroke="gray" stroke-width="4"/><circle cx="300" cy="150" r="4" fill="gray"/><text x="310" y="170">centre</text><circle cx="${x}" cy="${y}" r="11" fill="#8895a8" stroke="gray"/>`;
      if (top) s += arrow(x + 16, y, x + 16, y + K * W, R) + `<text x="${x + 26}" y="${y + K * W}" fill="${R}">Weight mg</text>` + (N > 0 ? arrow(x - 16, y, x - 16, y + K * N, B) + `<text x="${x - 26}" y="${y + K * N}" text-anchor="end" fill="${B}">Normal N</text>` : '');
      else s += arrow(x + 16, y, x + 16, y + K * W, R) + `<text x="${x + 26}" y="${y + K * W}" fill="${R}">Weight mg</text>` + arrow(x - 16, y, x - 16, y - K * N, B) + `<text x="${x - 26}" y="${y - K * N}" text-anchor="end" fill="${B}">Normal N</text>`;
      s += arrow(480, 150, 480, top ? 150 + K * Fc : 150 - K * Fc, G) + `<text x="490" y="${top ? 150 + K * Fc : 150 - K * Fc}" fill="${G}">net force mv²/r</text><text x="490" y="132" fill="${G}">(toward the centre)</text>`;
      w.querySelector('svg').innerHTML = s;
      const vmin = Math.sqrt(g * V.r);
      w.querySelector('.out').innerHTML = `<div>Net force toward centre mv²/r<b>${f(Fc, 0)} N</b></div><div>Normal force N<b>${f(N, 0)} N</b></div><div>Weight mg<b>${f(W, 0)} N</b></div><div>N compared with weight<b>${f(N / W, 2)} × mg</b></div><div>Minimum speed at top √(gr)<b>${f(vmin)} ${U}</b></div>` +
        `<div>Status<b>${lost ? 'Too slow: loses contact' : top && Math.abs(raw) < .01 * W ? 'Minimum speed: N = 0' : 'In contact'}</b></div>`;
    };
    w.oninput = draw; w.onclick = e => { if (e.target.dataset.p) { pos = e.target.dataset.p; draw(); } }; draw();
  }

  window.TOPICS['1G'] = { title: 'Circular motion in a vertical plane', kk: ['Investigate and apply theoretically Newton’s second law to circular motion in a vertical plane (forces at the highest and lowest positions only).'], sections: [
    { id: 'idea', title: 'Forces in a vertical circle', init: [loop], html: `
      <p>In a horizontal circle, gravity does not point toward the centre, so it does not help. In a <b>vertical</b> circle the weight acts along the line to the centre at the top and the bottom, so it either helps or works against the other force. That is why the forces differ at different points.</p>
      <div class="key">At every point, the net force toward the centre equals <b>mv² ÷ r</b>. At the top and the bottom, only two forces act on the object: its <b>weight</b> and the <b>normal force</b> (or tension, if it hangs on a rope).</div>
      <div class="p1 w"></div>
      <h3>What to look for in the diagram</h3>
      <ol><li><b>Bottom:</b> the centre is above the object. N points up toward the centre and mg points down, so N must be <i>bigger</i> than mg. The object “feels heavier”.</li>
      <li><b>Top:</b> the centre is below the object. Both N and mg point down toward the centre. They <i>share</i> the job, so N is smaller than mv²/r. The object “feels lighter”.</li>
      <li><b>At the top, lower the speed</b> until the blue arrow vanishes. At that point gravity alone provides the whole centripetal force. Go slower and the status reads “loses contact”.</li>
      <li><b>The green arrow</b> is the net force. It always points to the centre and equals mv² ÷ r.</li></ol>
      <h3>Symbols in this topic</h3>
      <table class="legend"><tr><th>Symbol</th><th>Meaning</th><th>Unit</th></tr>
      <tr><td>N</td><td>Normal force (use T for tension in a rope)</td><td>N</td></tr>
      <tr><td>m</td><td>Mass of the object</td><td>kg</td></tr>
      <tr><td>v</td><td>Speed at that point on the circle</td><td>m s<sup>−1</sup></td></tr>
      <tr><td>r</td><td>Radius of the circle</td><td>m</td></tr>
      <tr><td>g</td><td>Gravitational field strength, 9.8</td><td>N kg<sup>−1</sup></td></tr></table>` },
    { id: 'formulas', title: 'The formulas, step by step', html: `
      <p>The method is always the same: <b>take “toward the centre” as the positive direction</b>, add up the forces in that direction, and set the total equal to mv² ÷ r.</p>
      <table class="legend plain"><tr><th>Point</th><th>Centre is…</th><th>Forces toward the centre</th><th>Equation</th></tr>
      <tr><td>Bottom</td><td>above</td><td>N (up) minus mg (down)</td><td>N − mg = mv² ÷ r</td></tr>
      <tr><td>Top</td><td>below</td><td>N (down) plus mg (down)</td><td>N + mg = mv² ÷ r</td></tr>
      <tr><td>Side (level with the centre)</td><td>horizontal</td><td>N only; mg is sideways-on and does not help</td><td>N = mv² ÷ r</td></tr></table>
      <h3>Bottom of the circle</h3>` +
      card('Normal force at the bottom', `N = m ( g + ${fr('v²', 'r')} )`, '<b>N</b> = normal force (N). <b>m</b> = mass (kg). <b>g</b> = 9.8 N kg<sup>−1</sup>. <b>v</b> = speed at the bottom (m s<sup>−1</sup>). <b>r</b> = radius (m).', 'From N − mg = mv²/r. The normal force is <b>bigger than the weight</b>: it must hold the object up <i>and</i> pull it toward the centre.') +
      `<h3>Top of the circle</h3>` +
      card('Normal force at the top', `N = m ( ${fr('v²', 'r')} − g )`, 'The symbols are the same as above, but <b>v</b> is the speed at the <i>top</i>.', 'From N + mg = mv²/r. The weight does part of the job, so N is smaller. If the bracket is negative, the object has already left the track.') +
      card('Minimum speed at the top', `v<sub>min</sub> = ${sq('g r')}`, '<b>v<sub>min</sub></b> = slowest speed at the top that keeps the object on its circular path (m s<sup>−1</sup>).', 'Set N = 0 at the top: mg = mv²/r. Gravity alone provides all the centripetal force. For a rope, set T = 0 instead.') +
      `<h3>Over the crest of a hill</h3>` +
      card('Top of a hill (circular arc)', `N = m ( g − ${fr('v²', 'r')} )`, '<b>r</b> = radius of curvature of the hill. The centre is <i>below</i> the car.', 'From mg − N = mv²/r. The car “feels lighter”, and leaves the road if v ≥ √(gr). Compare this with the top of a loop, where the track is above the object.') +
      `<h3>Which one do I use?</h3>
      <table class="legend plain"><tr><th>You are asked about…</th><th>Use</th></tr>
      <tr><td>Normal force or tension at the bottom of a circle or dip</td><td>N = m(g + v²/r)</td></tr>
      <tr><td>Normal force or tension at the top of a loop</td><td>N = m(v²/r − g)</td></tr>
      <tr><td>The slowest speed that keeps contact at the top</td><td>v = √(gr)</td></tr>
      <tr><td>Normal force on a car at the top of a hill</td><td>N = m(g − v²/r)</td></tr></table>
      <div class="warn"><b>Common mistake:</b> the speed in a vertical circle is usually <i>not</i> constant. The object speeds up going down and slows going up. So always use the speed <b>at that point</b>, and check that the question gives it.</div>` },
    { id: 'examples', title: 'Worked examples', html: `<p>Method: (1) sketch the object at the point asked about; (2) mark which way the centre is; (3) write all forces and give “toward the centre” the positive sign; (4) set the total equal to mv² ÷ r.</p>` +
      ex('top of a roller-coaster loop', ['<b>Situation:</b> a 500 kg car passes the top of a loop of radius 8.0 m at 12 ' + U + '. Find the normal force from the track.', '<b>The centre is below.</b> Both N and mg point down: N + mg = mv² ÷ r.', '<b>Rearrange:</b> N = m(v²/r − g) = 500(144/8.0 − 9.8)', '<b>Answer:</b> N = 500(8.2) = <b>4100 N</b> downward.']) +
      ex('driving through a dip', ['<b>Situation:</b> a 70 kg person rides through the bottom of a dip of radius 30 m at 15 ' + U + '. Find the normal force on them and how heavy they feel.', '<b>The centre is above.</b> N up, mg down: N − mg = mv² ÷ r.', '<b>Solve:</b> N = m(g + v²/r) = 70(9.8 + 225/30) = 70(17.3) = <b>1.2 × 10³ N</b> (1211 N).', '<b>Compare with weight:</b> mg = 686 N, so N ÷ mg = 1.77. They feel about <b>1.8 times</b> as heavy.']) +
      ex('a bucket of water', ['<b>Situation:</b> a bucket is swung in a vertical circle of radius 0.80 m. What is the slowest speed at the top for the water to stay in the bucket?', '<b>At the minimum speed the contact force is zero:</b> mg = mv² ÷ r.', '<b>Solve:</b> v = √(gr) = √(9.8 × 0.80) = √7.84 = <b>2.8 ' + U + '</b>.']) +
      `<div class="warn"><b>Common mistakes</b><br>1. Using the same formula for the top and the bottom. Check which way the centre is first.<br>2. Believing the normal force always equals mg.<br>3. Forgetting that weight is still acting at the top. It helps provide the centripetal force.<br>4. Using the speed at the wrong point of the circle.</div>` }
  ], questions: [
    mc('A person in a car travels at constant speed through a dip at the bottom of a circular path. How does the normal force compare with their weight?', ['Less than the weight', 'Equal to the weight', 'Greater than the weight', 'Zero'], 2, 'At the bottom the net force is upward: N − mg = mv²/r, so N > mg.'),
    mc('At the top of a vertical loop, in which direction does the normal force from the track act on the car?', ['Upward', 'Downward, toward the centre', 'Horizontally', 'It is always zero'], 1, 'The track is above the car, so it pushes the car down, toward the centre of the circle.'),
    nu('What is the minimum speed needed at the top of a vertical loop of radius 10 m?', 9.9, .1, U, 'At the minimum speed the normal force is zero, so mg = mv²/r.', 'v = √(gr) = √(9.8 × 10) = 9.9 ' + U + '.'),
    nu('A 2.0 kg bucket is swung in a vertical circle of radius 1.0 m. At the bottom its speed is 5.0 ' + U + '. What is the tension in the rope?', 69.6, .3, 'N', 'T − mg = mv²/r.', 'T = mg + mv²/r = 19.6 + (2.0)(25)/1.0 = 69.6 N.'),
    nu('The same bucket has a speed of 5.0 ' + U + ' at the top of the circle. What is the tension?', 30.4, .3, 'N', 'At the top, tension and weight both point toward the centre: T + mg = mv²/r.', 'T = mv²/r − mg = 50 − 19.6 = 30.4 N.'),
    mc('A roller coaster car travels over the top of a loop at exactly √(gr). What is the normal force from the track?', ['mg', '2mg', 'Zero', 'mv²/r + mg'], 2, 'At v = √(gr), mv²/r = mg, so gravity alone supplies the centripetal force and N = 0.'),
    nu('A 60 kg person travels at 20 ' + U + ' through the bottom of a dip of radius 40 m. What is the normal force on them?', 1188, 2, 'N', 'N − mg = mv²/r.', 'N = m(g + v²/r) = 60(9.8 + 400/40) = 1188 N.'),
    nu('A 1000 kg car drives at 10 ' + U + ' over the top of a hill with radius of curvature 40 m. What is the normal force from the road?', 7300, 10, 'N', 'The centre is below the car: mg − N = mv²/r.', 'N = m(g − v²/r) = 1000(9.8 − 100/40) = 7300 N.'),
    nu('At what speed would the car in the previous question just leave the road at the top of the hill?', 19.8, .1, U, 'The car leaves the road when the normal force reaches zero.', 'N = 0 gives mg = mv²/r, so v = √(gr) = √(9.8 × 40) = 19.8 ' + U + '.')
  ] };
})();
