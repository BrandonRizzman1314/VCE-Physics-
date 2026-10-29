(function () {
  const { f, ex, arrow, lab, A, V: U, mc, nu } = window.H; window.TOPICS = window.TOPICS || {};
  const fr = (a, b) => `<span class="frac"><span>${a}</span><span>${b}</span></span>`;
  const sq = x => `<span class="sq">√<span>${x}</span></span>`;
  const card = (t, eq, w, n) => `<div class="fcard"><h4>${t}</h4><div class="eq">${eq}</div><p class="where"><b>Where:</b> ${w}</p>${n ? `<p class="where">${n}</p>` : ''}</div>`;
  const G = 6.67e-11, M = 5.97e24, RE = 6.37e6;
  const L1 = lab('s1', 'A satellite in a circular orbit around Earth', [['x', 'Orbital radius r, in Earth radii (from Earth’s centre)', 1.05, 7, 1.1, .01]], V => {
    const r = V.x * RE, v = Math.sqrt(G * M / r), T = 2 * Math.PI * r / v, a = G * M / (r * r), R = 30 + 20 * (V.x - 1), px = 300 + R * Math.cos(.7), py = 160 - R * Math.sin(.7);
    const svg = `<circle cx="300" cy="160" r="30" fill="#2f5fd0" fill-opacity=".5" stroke="gray"/><text x="300" y="164" text-anchor="middle">Earth</text><circle cx="300" cy="160" r="${R}" fill="none" stroke="gray" stroke-dasharray="4 6"/><circle cx="${px}" cy="${py}" r="7" fill="#8895a8" stroke="gray"/>` +
      arrow(px, py, px - Math.sin(.7) * 70, py - Math.cos(.7) * 70, '#2f5fd0') + `<text x="${px - Math.sin(.7) * 70 - 4}" y="${py - Math.cos(.7) * 70 - 8}" fill="#2f5fd0">v</text>` +
      arrow(px, py, px + (300 - px) * (15 + 80 / V.x ** 2) / R, py + (160 - py) * (15 + 80 / V.x ** 2) / R, '#c23b3b') + `<text x="${px - 70}" y="${py + 34}" fill="#c23b3b">gravity F (toward Earth)</text>`;
    return { svg, out: [['Orbital radius r', f(r / 1000, 0) + ' km'], ['Altitude above surface', f((r - RE) / 1000, 0) + ' km'], ['Speed v = √(GM/r)', f(v / 1000, 2) + ' km s⁻¹'], ['Period T = 2πr/v', T < 7200 ? f(T / 60, 1) + ' min' : f(T / 3600, 1) + ' h'], ['Acceleration a = GM/r²', f(a, 2) + ' ' + A], ['Note', Math.abs(T - 86164) < 1800 ? 'T is about 24 h: geostationary orbit' : 'Try r = 6.6 for a 24 h orbit']] };
  }, '0 0 600 320');
  window.TOPICS.sat = { title: 'Satellite motion as uniform circular motion', kk: ['Model natural and artificial satellite motion as uniform circular motion.', 'Model satellite motion (artificial, Moon, planet) as uniform circular orbital motion: a = v²/r = 4π²r/T².', 'Apply the concepts of force due to gravity and normal force, including in relation to satellites in orbit where the orbits are assumed to be uniform and circular.'], sections: [
    { id: 'idea', title: 'Gravity as the centripetal force', init: [L1], html: `
      <p>A satellite (artificial, or natural like the Moon) in a circular orbit is an example of uniform circular motion. The <b>only</b> force on it is the gravitational attraction of the body it orbits, and that force points to the centre of the orbit. So <b>gravity is the centripetal force</b>.</p>
      <div class="s1 w"></div>
      <h3>What to look for in the diagram</h3>
      <ol><li><b>Gravity (red) points to the centre; velocity (blue) is along the tangent.</b> Gravity changes the direction of the velocity but not the speed.</li>
      <li><b>Raise the orbit.</b> The speed falls, the period grows, and the acceleration drops. Higher satellites are slower.</li>
      <li><b>Set r to about 6.6 Earth radii.</b> The period becomes about 24 h, so the satellite stays above one point on Earth (geostationary).</li>
      <li><b>The satellite’s mass is not an input.</b> It cancels, so every object at the same radius orbits with the same speed.</li></ol>
      <div class="warn"><b>Why are astronauts “weightless”?</b> Gravity still acts on them (almost as strongly as on the ground). They and the spacecraft are both in free fall, accelerating toward Earth at the same rate, so the floor does not push on them. The normal force is zero, and the normal force is what we feel as weight.</div>` },
    { id: 'formulas', title: 'The formulas, step by step', html: `
      <p>Set the gravitational force equal to the net force needed for circular motion, F<sub>net</sub> = mv² ÷ r.</p>` +
      card('Gravitational force', `F = ${fr('G M m', 'r²')}`, '<b>G</b> = universal gravitational constant, 6.67 × 10<sup>−11</sup> N m² kg<sup>−2</sup>. <b>M</b> = mass of the body being orbited (kg). <b>m</b> = mass of the satellite (kg). <b>r</b> = distance between the centres (m), <i>not</i> the height above the surface.', 'Check your exam data sheet for G, Earth’s mass (5.97 × 10<sup>24</sup> kg) and Earth’s radius (6.37 × 10<sup>6</sup> m).') +
      card('Gravitational field strength (acceleration due to gravity)', `g = ${fr('G M', 'r²')}`, '<b>g</b> = field strength at distance r (N kg<sup>−1</sup>, the same as m s<sup>−2</sup>). The satellite’s mass has cancelled.', 'This equals the satellite’s centripetal acceleration: a = g at the orbit.') +
      card('Orbital speed', `v = ${sq('G M ÷ r')}`, '<b>v</b> = orbital speed (m s<sup>−1</sup>).', 'From G M m ÷ r² = m v² ÷ r. A larger r gives a smaller v.') +
      card('Centripetal acceleration and the period', `a = ${fr('v²', 'r')} = ${fr('4 π² r', 'T²')}`, '<b>T</b> = orbital period, the time for one orbit (s). <b>2πr</b> = the circumference of the orbit.', 'T = 2πr ÷ v. Use whichever form fits the data you are given.') +
      card('Period and radius together', `${fr('r³', 'T²')} = ${fr('G M', '4 π²')}`, 'The right-hand side is the same for every satellite of the same body.', 'So T² is proportional to r³. If r doubles, T grows by a factor of 2√2 ≈ 2.8.') +
      `<h3>Which one do I use?</h3>
      <table class="legend plain"><tr><th>You know</th><th>You want</th><th>Use</th></tr>
      <tr><td>Orbital radius r and the planet’s mass</td><td>speed</td><td>v = √(GM ÷ r)</td></tr>
      <tr><td>Radius r and period T</td><td>acceleration</td><td>a = 4π²r ÷ T²</td></tr>
      <tr><td>Radius r and speed v</td><td>period</td><td>T = 2πr ÷ v</td></tr>
      <tr><td>Distance from the centre</td><td>field strength g</td><td>g = GM ÷ r²</td></tr></table>` },
    { id: 'examples', title: 'Worked examples and traps', html: `<p>Method: (1) find r from the <b>centre</b> of the planet; (2) set gravity equal to mv² ÷ r; (3) solve for v, then use T = 2πr ÷ v if you need a period.</p>` +
      ex('a low Earth orbit', ['<b>Situation:</b> a satellite orbits 400 km above Earth’s surface. Find its speed and period.', '<b>Radius from the centre:</b> r = 6.37 × 10<sup>6</sup> + 4.0 × 10<sup>5</sup> = 6.77 × 10<sup>6</sup> m.', '<b>Speed:</b> v = √(GM ÷ r) = √(6.67 × 10<sup>−11</sup> × 5.97 × 10<sup>24</sup> ÷ 6.77 × 10<sup>6</sup>) = <b>7.67 × 10<sup>3</sup> ' + U + '</b>.', '<b>Period:</b> T = 2πr ÷ v = 2π(6.77 × 10<sup>6</sup>) ÷ 7670 = 5550 s = <b>92 min</b>.']) +
      ex('the Moon', ['<b>Situation:</b> the Moon orbits Earth at a radius of 3.84 × 10<sup>8</sup> m with a period of 27.3 days. Find its centripetal acceleration.', '<b>Convert the period:</b> T = 27.3 × 24 × 3600 = 2.36 × 10<sup>6</sup> s.', '<b>Use</b> a = 4π²r ÷ T².', '<b>Substitute:</b> a = 4π²(3.84 × 10<sup>8</sup>) ÷ (2.36 × 10<sup>6</sup>)² = <b>2.7 × 10<sup>−3</sup> ' + A + '</b>. This is about 9.8 ÷ 60², because the Moon is about 60 Earth radii away.']) +
      `<div class="warn"><b>Common mistakes</b><br>1. Using the altitude instead of the distance from the centre of the planet.<br>2. Thinking astronauts are weightless because there is no gravity. There is; they are in free fall.<br>3. Putting the satellite’s mass in the speed or period formula. It cancels.<br>4. Forgetting to convert km to m or days or hours to seconds.</div>` }
  ], questions: [
    mc('What provides the centripetal force for a satellite in a circular orbit around Earth?', ['The normal force', 'The gravitational force of Earth', 'Friction with the atmosphere', 'The engine thrust'], 1, 'The only force acting on the satellite is Earth’s gravity, and it points to the centre of the orbit.'),
    mc('A satellite moves to a higher circular orbit. What happens to its orbital speed?', ['It increases', 'It decreases', 'It stays the same', 'It depends on the satellite’s mass'], 1, 'v = √(GM ÷ r), so a larger r gives a smaller v. The mass cancels.'),
    mc('Astronauts in the International Space Station float because:', ['There is no gravity there', 'They and the station are in free fall, so there is no normal force', 'Gravity is balanced by the Sun’s gravity', 'The station is spinning'], 1, 'Gravity is still about 90% of its surface value. Everything is in free fall together, so the normal force, which we feel as weight, is zero.'),
    nu('A satellite orbits at r = 6.77 × 10⁶ m from Earth’s centre. What is its speed? (G = 6.67 × 10⁻¹¹, M = 5.97 × 10²⁴ kg)', 7670, 30, U, 'Use v = √(GM ÷ r).', 'v = √(6.67 × 10⁻¹¹ × 5.97 × 10²⁴ ÷ 6.77 × 10⁶) = 7.67 × 10³ ' + U + '.'),
    nu('What is the gravitational field strength at a distance of 2 Earth radii (1.27 × 10⁷ m) from Earth’s centre?', 2.45, .05, 'N kg⁻¹', 'Use g = GM ÷ r².', 'g = 3.98 × 10¹⁴ ÷ (1.27 × 10⁷)² = 2.45 N kg⁻¹, one quarter of the surface value.'),
    nu('A geostationary satellite orbits at r = 4.22 × 10⁷ m. What is its speed, in m s⁻¹?', 3070, 15, U, 'Use v = √(GM ÷ r).', 'v = √(3.98 × 10¹⁴ ÷ 4.22 × 10⁷) = 3.07 × 10³ ' + U + '.'),
    nu('How long, in hours, does the geostationary satellite in the previous question take for one orbit? (T = 2πr ÷ v)', 24, .3, 'h', 'Use the speed from the previous question and the circumference 2πr.', 'T = 2π(4.22 × 10⁷) ÷ 3070 = 8.6 × 10⁴ s = 24 h.'),
    nu('The Moon orbits Earth at r = 3.84 × 10⁸ m with a period of 2.36 × 10⁶ s. What is its centripetal acceleration, in units of 10⁻³ m s⁻²?', 2.72, .05, '× 10⁻³ m s⁻²', 'Use a = 4π²r ÷ T².', 'a = 4π²(3.84 × 10⁸) ÷ (2.36 × 10⁶)² = 2.72 × 10⁻³ m s⁻².')
  ] };
})();
