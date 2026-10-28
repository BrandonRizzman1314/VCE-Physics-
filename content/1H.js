(function () {
  const { f, ex, lab, A, V: U, mc, nu } = window.H; window.TOPICS = window.TOPICS || {};
  const L1 = lab('l1', 'Projectile launcher (level ground, no air resistance)', [['v', 'Launch speed (m/s)', 5, 40, 20], ['t', 'Launch angle (°)', 5, 85, 40]], V => {
    const r = V.t * Math.PI / 180, vx = V.v * Math.cos(r), vy = V.v * Math.sin(r), T = 2 * vy / 9.8, R = vx * T, H = vy * vy / 19.6, s = Math.min(540 / R, 200 / H);
    const pts = Array.from({ length: 41 }, (_, k) => { const q = T * k / 40; return `${30 + s * vx * q},${240 - s * (vy * q - 4.9 * q * q)}`; }).join(' ');
    return { svg: `<line x1="20" y1="240" x2="590" y2="240" stroke="gray"/><polyline points="${pts}" fill="none" stroke="#2f5fd0" stroke-width="3"/>`,
      out: [['Horizontal velocity vₓ', f(vx) + ' ' + U], ['Initial vertical velocity v<sub>y</sub>', f(vy) + ' ' + U], ['Time of flight', f(T, 2) + ' s'], ['Maximum height', f(H) + ' m'], ['Range', f(R) + ' m']] };
  }, '0 0 600 260');
  window.TOPICS['1H'] = { title: 'Projectile motion', sections: [
    { id: 'idea', title: 'Two independent motions', init: [L1], html: `
      <p>With air resistance ignored, a projectile has <b>two independent motions</b>:</p>
      <div class="key"><b>Horizontal:</b> no force, so constant velocity. &nbsp; <b>s<sub>x</sub> = v<sub>x</sub> t</b><br><b>Vertical:</b> constant acceleration g downward. Use the equations from 1A with a = −9.8 (up positive).</div>
      <p>For a launch at speed v and angle θ above the horizontal: <b>v<sub>x</sub> = v cos θ</b> and <b>v<sub>y</sub> = v sin θ</b>. Time is the link between the two directions.</p>
      <div class="l1 w"></div>
      <p>Try 45° for the longest range, and notice that angles such as 30° and 60° give the same range.</p>` },
    { id: 'solve', title: 'Solving projectile problems', html: `
      <ol><li>Resolve the launch velocity into v<sub>x</sub> and v<sub>y</sub>.</li><li>Solve the <b>vertical</b> motion first to find the time (often the top of the flight has v<sub>y</sub> = 0, and level-ground flight time is 2v<sub>y</sub>/g).</li><li>Use that time in the <b>horizontal</b> equation to find the range.</li></ol>
      <div class="warn"><b>Common mistakes:</b> the acceleration at the top is still 9.8 downward (only v<sub>y</sub> is zero there). The horizontal velocity never changes.</div>` +
      ex('a kicked ball', ['<b>Situation:</b> a ball is kicked at 20 ' + U + ' at 30° above the horizontal from level ground. Find the range.', '<b>Components:</b> v<sub>x</sub> = 20 cos 30° = 17.3 ' + U + '; v<sub>y</sub> = 20 sin 30° = 10 ' + U + '.', '<b>Time of flight:</b> v = u + at gives −10 = 10 − 9.8t, so t = 20/9.8 = 2.04 s.', '<b>Range:</b> s<sub>x</sub> = v<sub>x</sub>t = (17.3)(2.04) = <b>35 m</b>.']) }
  ], questions: [
    mc('Ignoring air resistance, what happens to the horizontal component of a projectile’s velocity?', ['It increases', 'It decreases', 'It stays constant', 'It is zero at the top'], 2, 'No horizontal force acts, so the horizontal velocity is constant.'),
    mc('A ball is at the very top of its flight. What is its acceleration?', ['Zero', '9.8 ' + A + ' upward', '9.8 ' + A + ' downward', 'It depends on the launch angle'], 2, 'Gravity still acts, so the acceleration is 9.8 ' + A + ' downward throughout. Only the vertical velocity is zero at the top.'),
    nu('A ball rolls horizontally off a table-top cliff 20 m high. How long does it take to land? Use g = 9.8 ' + A + '.', 2.02, .05, 's', 'Vertically: u = 0, s = 20, a = 9.8 (down positive). Which equation has no v?', 's = ½at² gives t = √(2s/a) = √(40/9.8) = 2.02 s.'),
    nu('If the ball in the previous question left the edge at 12 ' + U + ', how far from the base does it land?', 24.2, .3, 'm', 'Horizontal velocity is constant.', 's<sub>x</sub> = v<sub>x</sub>t = (12)(2.02) = 24.2 m.'),
    nu('A projectile is launched at 15 ' + U + ' at 60° above the horizontal from level ground. What is its time of flight?', 2.65, .05, 's', 'Find v<sub>y</sub> first, then use v = u + at with a total change in v<sub>y</sub> of 2v<sub>y</sub>.', 'v<sub>y</sub> = 15 sin 60° = 13.0. t = 2v<sub>y</sub>/g = 26.0/9.8 = 2.65 s.'),
    nu('What is the maximum height reached by the projectile in the previous question?', 8.6, .1, 'm', 'At the top v<sub>y</sub> = 0. Use v² = u² + 2as vertically.', '0 = 13.0² + 2(−9.8)s gives s = 169/19.6 = 8.6 m.')
  ] };
})();
