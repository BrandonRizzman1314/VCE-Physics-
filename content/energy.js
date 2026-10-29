(function () {
  const { f, ex, lab, mc, nu, V: U } = window.H; window.TOPICS = window.TOPICS || {};
  const fr = (a, b) => `<span class="frac"><span>${a}</span><span>${b}</span></span>`;
  const card = (t, eq, w, n) => `<div class="fcard"><h4>${t}</h4><div class="eq">${eq}</div><p class="where"><b>Where:</b> ${w}</p>${n ? `<p class="where">${n}</p>` : ''}</div>`;
  const g = 9.8;

  const SP = lab('e1', 'An ideal spring obeying Hooke’s law', [['k', 'Spring constant k (N m⁻¹)', 10, 200, 80], ['x', 'Extension x (m)', .05, .5, .3, .01]], V => {
    const F = V.k * V.x, E = .5 * V.k * V.x * V.x, X = 40 + 1000 * V.x;
    return { svg: `<line x1="40" y1="200" x2="580" y2="200" stroke="gray"/><line x1="40" y1="20" x2="40" y2="200" stroke="gray"/><polygon points="40,200 ${X},${200 - 1.8 * F} ${X},200" fill="#2f5fd0" fill-opacity=".3" stroke="#2f5fd0" stroke-width="3"/><text x="575" y="194" text-anchor="end">extension x (m)</text><text x="46" y="16">force F (N)</text>`,
      out: [['Force F = kx', f(F) + ' N'], ['Stored energy = area = ½ × x × F', f(E, 2) + ' J'], ['Formula E = ½kx²', f(E, 2) + ' J']] };
  }, '0 0 600 215');

  const BAR = lab('e2', 'A ball rolling down a ramp, losing some energy as it goes', [['m', 'Mass (kg)', 1, 10, 2], ['H', 'Starting height H (m)', 5, 50, 20], ['s', 'How far down the ramp (%)', 0, 100, 50, 5], ['d', 'Energy dissipated by the bottom (% of start)', 0, 50, 20, 5]], V => {
    const E0 = V.m * g * V.H, s = V.s / 100, Ep = E0 * (1 - s), Ed = E0 * V.d / 100 * s, Ek = E0 - Ep - Ed, sc = 150 / E0, bar = (x, v, c, l, val) => `<rect x="${x}" y="${200 - sc * v}" width="100" height="${sc * v}" fill="${c}" fill-opacity=".7"/><text x="${x + 50}" y="218" text-anchor="middle">${l}</text><text x="${x + 50}" y="${194 - sc * v}" text-anchor="middle">${val}</text>`;
    return { svg: '<line x1="40" y1="200" x2="580" y2="200" stroke="gray"/>' + bar(70, Ep, '#2f5fd0', 'Gravitational PE', f(Ep, 0) + ' J') + bar(250, Ek, '#e08a1e', 'Kinetic energy', f(Ek, 0) + ' J') + bar(430, Ed, '#8895a8', 'Dissipated', f(Ed, 0) + ' J'),
      out: [['Total energy at the start', f(E0, 0) + ' J'], ['Total now (always equal)', f(Ep + Ek + Ed, 0) + ' J'], ['Speed now √(2E<sub>k</sub>/m)', f(Math.sqrt(2 * Ek / V.m)) + ' ' + U]] };
  }, '0 0 600 230');

  function collide(root) {
    const w = root.querySelector('.e3'); let el = true;
    w.innerHTML = `<h4>Collision in one dimension (right is positive)</h4><div class="pick"><button data-t="1">Elastic</button><button data-t="0">Perfectly inelastic (stick together)</button></div>
      <label>Mass m₁: <b class="va">2</b> kg <input type="range" data-k="a" min="1" max="10" value="2"></label><label>Velocity u₁: <b class="vu">6</b> m s<sup>−1</sup> <input type="range" data-k="u" min="-10" max="10" value="6"></label>
      <label>Mass m₂: <b class="vb">4</b> kg <input type="range" data-k="b" min="1" max="10" value="4"></label><label>Velocity u₂: <b class="vw">0</b> m s<sup>−1</sup> <input type="range" data-k="w" min="-10" max="10" value="0"></label><div class="out"></div>`;
    const draw = () => {
      const V = {}; w.querySelectorAll('input').forEach(i => { V[i.dataset.k] = +i.value; w.querySelector('.v' + i.dataset.k).textContent = i.value; });
      w.querySelectorAll('.pick button').forEach(b => b.classList.toggle('on', (b.dataset.t === '1') === el));
      const M = V.a + V.b, v1 = el ? ((V.a - V.b) * V.u + 2 * V.b * V.w) / M : (V.a * V.u + V.b * V.w) / M, v2 = el ? ((V.b - V.a) * V.w + 2 * V.a * V.u) / M : v1;
      const p0 = V.a * V.u + V.b * V.w, p1 = V.a * v1 + V.b * v2, k0 = .5 * V.a * V.u ** 2 + .5 * V.b * V.w ** 2, k1 = .5 * V.a * v1 ** 2 + .5 * V.b * v2 ** 2;
      w.querySelector('.out').innerHTML = `<div>Final velocity of m₁<b>${f(v1, 2)} ${U}</b></div><div>Final velocity of m₂<b>${f(v2, 2)} ${U}</b></div><div>Momentum before → after<b>${f(p0)} → ${f(p1)}</b></div><div>Kinetic energy before → after<b>${f(k0)} J → ${f(k1)} J</b></div><div>Kinetic energy lost<b>${f(k0 - k1)} J</b></div>`;
    };
    w.oninput = draw; w.onclick = e => { if (e.target.dataset.t) { el = e.target.dataset.t === '1'; draw(); } }; draw();
  }

  window.TOPICS.energy = { title: 'Energy transformations', kk: ['Analyse transformations of energy between kinetic energy, elastic potential energy, gravitational potential energy and energy dissipated to the environment (considered as a combination of heat, sound and deformation of material).', 'Kinetic energy at low speeds: E<sub>k</sub> = ½mv²; elastic and inelastic collisions with reference to conservation of kinetic energy.', 'Elastic potential energy: area under force–distance graph including ideal springs obeying Hooke’s law: E<sub>s</sub> = ½kx².', 'Gravitational potential energy: E<sub>g</sub> = mgΔh (or from the area under a force–distance or field–distance graph).'], sections: [
    { id: 'forms', title: 'Kinetic, elastic and gravitational energy', init: [SP], html: `
      <p>Energy is stored in several forms. Doing work on an object transfers energy to it, and the <b>area under a force–distance graph</b> gives the energy transferred.</p>` +
      card('Kinetic energy (low speeds)', `E<sub>k</sub> = ½ m v²`, '<b>E<sub>k</sub></b> = kinetic energy (J). <b>m</b> = mass (kg). <b>v</b> = speed (m s<sup>−1</sup>).', 'Energy of motion. Doubling the speed makes E<sub>k</sub> four times larger.') +
      card('Gravitational potential energy (near Earth)', `E<sub>g</sub> = m g Δh`, '<b>E<sub>g</sub></b> = change in gravitational potential energy (J). <b>g</b> = 9.8 N kg<sup>−1</sup>. <b>Δh</b> = change in height (m).', 'Only the change in height matters, so you can choose any zero level.') +
      card('Elastic potential energy of an ideal spring', `E<sub>s</sub> = ½ k x² &nbsp; with &nbsp; F = k x`, '<b>E<sub>s</sub></b> = stored energy (J). <b>k</b> = spring constant (N m<sup>−1</sup>). <b>x</b> = extension or compression from the natural length (m). <b>F</b> = spring force (N), Hooke’s law.', 'The stored energy is the area of the triangle under the F–x graph: ½ × x × kx.') +
      '<div class="e1 w"></div><p>Notice the triangle area is the same as ½kx². Because the force grows with x, the area is not a rectangle.</p>' },
    { id: 'conservation', title: 'Conservation and dissipation', init: [BAR], html: `
      <div class="key">Energy is never created or destroyed; it only changes form. In a closed system: <b>total energy at the start = total energy at the end</b>.</div>
      <div class="e2 w"></div>
      <h3>What to look for in the diagram</h3>
      <ol><li><b>Set the dissipated slider to 0.</b> Gravitational PE falls exactly as KE rises. This is the ideal case.</li>
      <li><b>Raise the dissipated energy.</b> Some energy goes to the environment as heat, sound and deformation of material. KE ends up smaller, so the ball is slower.</li>
      <li><b>The total never changes.</b> Dissipated energy is not “lost”; it is just no longer available as motion.</li></ol>` +
      card('Energy accounting', `E<sub>start</sub> = E<sub>k</sub> + E<sub>g</sub> + E<sub>s</sub> + E<sub>dissipated</sub>`, 'Include only the forms of energy that are present in the problem.', 'Without dissipation, a ball dropped from height h reaches speed v = √(2gh), found from mgh = ½mv².') },
    { id: 'collisions', title: 'Elastic and inelastic collisions', init: [collide], html: `
      <p>In an <b>isolated system</b> (no net external force), <b>momentum is always conserved</b> in a collision. What differs is what happens to the kinetic energy.</p>
      <div class="key"><b>Elastic:</b> kinetic energy is conserved. The objects bounce apart.<br><b>Inelastic:</b> some kinetic energy is transformed into heat, sound and deformation. In a <b>perfectly inelastic</b> collision the objects stick together, and the most kinetic energy is lost.</div>
      <div class="e3 w"></div>
      <h3>What to look for in the diagram</h3>
      <ol><li><b>Momentum before equals momentum after</b> in both cases.</li>
      <li><b>In the elastic case, the kinetic energy is unchanged.</b> With equal masses, the objects swap velocities.</li>
      <li><b>In the inelastic case, the kinetic energy drops.</b> The lost energy is the “energy dissipated to the environment”.</li></ol>
      <div class="warn"><b>Common mistake:</b> thinking momentum is lost in an inelastic collision. It is not. Only kinetic energy is not conserved.</div>` },
    { id: 'examples', title: 'Worked examples', html: `` +
      ex('a dropped ball with dissipation', ['<b>Situation:</b> a ball is dropped from 20 m. 25% of its initial energy is dissipated by the time it hits the ground. Find the speed at the bottom.', '<b>Energy available as motion:</b> 75% of mgh, so ½mv² = 0.75 mgh.', '<b>The mass cancels:</b> v = √(2 × 0.75 × g h) = √(2 × 0.75 × 9.8 × 20).', '<b>Answer:</b> <b>17 ' + U + '</b> (compared with 19.8 ' + U + ' with no dissipation).']) +
      ex('a spring launching a mass', ['<b>Situation:</b> a spring (k = 200 N m<sup>−1</sup>) is compressed 0.10 m and launches a 0.50 kg mass on a smooth surface. Find its speed.', '<b>Stored energy:</b> E<sub>s</sub> = ½kx² = ½(200)(0.10)² = 1.0 J.', '<b>All of it becomes kinetic energy:</b> ½mv² = 1.0.', '<b>Solve:</b> v = √(2 × 1.0 ÷ 0.50) = <b>2.0 ' + U + '</b>.']) +
      ex('classifying a collision', ['<b>Situation:</b> a 2.0 kg trolley at 4.0 ' + U + ' hits an identical stationary trolley and they stick together. Is the collision elastic?', '<b>Momentum:</b> (2.0)(4.0) = (4.0)v, so v = 2.0 ' + U + '.', '<b>Kinetic energy before:</b> ½(2.0)(4.0)² = 16 J. <b>After:</b> ½(4.0)(2.0)² = 8.0 J.', '<b>Half the kinetic energy is lost,</b> so the collision is <b>inelastic</b>. Momentum was still conserved.']) }
  ], questions: [
    mc('Which is the correct formula for the elastic potential energy stored in an ideal spring?', ['kx', '½kx', '½kx²', 'kx²'], 2, 'E<sub>s</sub> = ½kx², the area under the F–x graph.'),
    nu('What is the kinetic energy of a 1200 kg car travelling at 20 ' + U + '?', 240000, 500, 'J', 'E<sub>k</sub> = ½mv².', 'E<sub>k</sub> = ½(1200)(20)² = 2.4 × 10⁵ J.'),
    nu('How much gravitational potential energy does a 2.0 kg object gain when raised 15 m?', 294, 1, 'J', 'E<sub>g</sub> = mgΔh.', 'E<sub>g</sub> = (2.0)(9.8)(15) = 294 J.'),
    nu('How much energy is stored in a spring with k = 150 N m⁻¹ that is stretched by 0.20 m?', 3, .05, 'J', 'E<sub>s</sub> = ½kx².', 'E<sub>s</sub> = ½(150)(0.20)² = 3.0 J.'),
    nu('A ball is dropped from 10 m and 20% of its energy is dissipated by the time it lands. What is its speed on landing?', 12.5, .1, U, 'Only 80% of mgh becomes kinetic energy.', '½mv² = 0.80 mgh, so v = √(2 × 0.80 × 9.8 × 10) = 12.5 ' + U + '.'),
    mc('Two trolleys collide and stick together. Which statement is true?', ['Momentum and kinetic energy are both conserved', 'Momentum is conserved but kinetic energy is not', 'Kinetic energy is conserved but momentum is not', 'Neither is conserved'], 1, 'Momentum is always conserved in an isolated system. Sticking together is a perfectly inelastic collision, so kinetic energy is not conserved.'),
    nu('A 1.0 kg trolley at 6.0 ' + U + ' collides elastically with an identical stationary trolley. What is the final speed of the second trolley?', 6, .05, U, 'For equal masses in an elastic collision, the objects swap velocities.', 'The first trolley stops and the second moves off at 6.0 ' + U + ', conserving both momentum and kinetic energy.'),
    mc('Where does the “lost” kinetic energy go in an inelastic collision?', ['It is destroyed', 'It becomes heat, sound and deformation of the objects', 'It becomes momentum', 'It becomes gravitational potential energy'], 1, 'Energy is conserved overall. The kinetic energy is transformed to heat, sound and deformation, which are forms of energy dissipated to the environment.')
  ] };
})();
