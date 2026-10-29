(function () {
  const { f, ex, arrow, lab, A, mc, nu } = window.H; window.TOPICS = window.TOPICS || {};
  const fr = (a, b) => `<span class="frac"><span>${a}</span><span>${b}</span></span>`;
  const card = (title, eq, where, note) => `<div class="fcard"><h4>${title}</h4><div class="eq">${eq}</div><p class="where"><b>Where:</b> ${where}</p>${note ? `<p class="where">${note}</p>` : ''}</div>`;
  const g = 9.8, O = '#e08a1e', B = '#2f5fd0', R = '#c23b3b', G = '#1f8a4c';
  const box = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#8895a8" fill-opacity=".4" stroke="gray"/>`;

  /* Diagram 1: two trolleys pulled along a smooth floor */
  const D1 = lab('d1', 'Two trolleys on a smooth floor (side view)', [['F', 'Pulling force F on m₁ (N)', 1, 60, 30], ['a', 'Mass m₁ (kg), pulled directly', 1, 10, 6], ['b', 'Mass m₂ (kg), pulled by the rope', 1, 10, 4]], V => {
    const a = V.F / (V.a + V.b), T = V.b * a, w1 = 40 + 8 * V.a, w2 = 40 + 8 * V.b, x2 = 40, x1 = x2 + w2 + 70, c2 = x2 + w2 / 2, c1 = x1 + w1 / 2, k = 2.2;
    const svg = '<line x1="10" y1="180" x2="590" y2="180" stroke="gray"/>' + box(x2, 120, w2, 60) + box(x1, 120, w1, 60) + `<line x1="${x2 + w2}" y1="150" x2="${x1}" y2="150" stroke="gray" stroke-width="2"/>` +
      `<text x="${c2}" y="138" text-anchor="middle">m₂ = ${V.b} kg</text><text x="${c1}" y="138" text-anchor="middle">m₁ = ${V.a} kg</text>` +
      arrow(c1, 158, c1 + k * V.F, 158, B) + `<text x="${c1 + k * V.F + 6}" y="162" fill="${B}">F</text>` +
      arrow(c1, 158, c1 - k * T, 158, O) + `<text x="${c1 - k * T - 14}" y="162" fill="${O}">T</text>` +
      arrow(c2, 158, c2 + k * T, 158, O) + `<text x="${c2 + k * T + 6}" y="162" fill="${O}">T</text>` +
      arrow(40, 215, 40 + 8 + 8 * a, 215, G) + `<text x="${40 + 8 + 8 * a + 6}" y="219" fill="${G}">acceleration a (same for both)</text>`;
    return { svg, out: [['Acceleration a = F ÷ (m₁ + m₂)', f(a, 2) + ' ' + A], ['Tension T = m₂a', f(T, 2) + ' N'], ['Check on m₁: F − T = m₁a', `${f(V.F - T, 2)} N = ${f(V.a * a, 2)} N`]] };
  }, '0 0 600 240');

  /* Diagram 2: mass on a table + hanging mass over a pulley */
  const D2 = lab('d2', 'Mass on a smooth table joined to a hanging mass', [['a', 'Table mass m₁ (kg)', 1, 10, 3], ['b', 'Hanging mass m₂ (kg)', 1, 10, 2]], V => {
    const a = V.b * g / (V.a + V.b), T = V.a * a, W = V.b * g, K = 100 / Math.max(W, T), w1 = 40 + 6 * V.a, w2 = 40 + 6 * V.b, c1 = 330 - w1 / 2;
    const svg = '<line x1="40" y1="110" x2="400" y2="110" stroke="gray" stroke-width="4"/><circle cx="400" cy="104" r="14" fill="none" stroke="gray" stroke-width="3"/>' +
      '<path d="M330 90 L400 90 A14 14 0 0 1 414 104 L414 170" fill="none" stroke="gray" stroke-width="2"/>' + box(330 - w1, 70, w1, 40) + box(414 - w2 / 2, 170, w2, 40) +
      `<text x="${c1}" y="62" text-anchor="middle">m₁ = ${V.a} kg</text><text x="${414 + w2 / 2 + 8}" y="194">m₂ = ${V.b} kg</text>` +
      arrow(c1, 90, c1 + K * T, 90, O) + `<text x="${c1 + K * T + 4}" y="84" fill="${O}">T</text>` +
      arrow(414, 190, 414, 190 - K * T, O) + `<text x="424" y="${190 - K * T + 6}" fill="${O}">T</text>` +
      arrow(414, 190, 414, 190 + K * W, R) + `<text x="424" y="${190 + K * W}" fill="${R}">W = m₂g</text>` +
      arrow(60, 40, 72 + 6 * a, 40, G) + `<text x="${72 + 6 * a + 6}" y="44" fill="${G}">a</text>` + arrow(520, 150, 520, 162 + 6 * a, G) + `<text x="530" y="${162 + 6 * a}" fill="${G}">a</text>`;
    return { svg, out: [['Acceleration a = m₂g ÷ (m₁ + m₂)', f(a, 2) + ' ' + A], ['Tension T = m₁a', f(T, 2) + ' N'], ['Weight of hanging mass m₂g', f(W, 2) + ' N'], ['Tension compared with m₂g', T < W ? 'smaller, because m₂ accelerates down' : 'equal']] };
  }, '0 0 600 330');

  window.TOPICS['1D'] = { title: 'Connected bodies', sections: [
    { id: 'idea', title: 'Connected objects', init: [D1], html: `
      <p>When objects are joined by a rope, they move together as one connected system. We assume the rope is <b>light</b> (it has no mass) and <b>inextensible</b> (it does not stretch). Two consequences follow:</p>
      <div class="key"><b>1. Same acceleration:</b> the objects stay the same distance apart, so they have the same acceleration (in size).<br><b>2. Same tension:</b> the tension T has the same size everywhere along a light rope.</div>
      <div class="d1 w"></div>
      <h3>What to look for in the diagram</h3>
      <ol><li><b>Only F pulls the whole system.</b> The tension T pulls m₂ forward and pulls m₁ backward by the same amount, so inside the system the two tensions cancel.</li>
      <li><b>m₁ is pulled forward by F and back by T.</b> Its net force is F − T.</li>
      <li><b>m₂ feels only T.</b> So T is the net force on m₂.</li>
      <li><b>Make m₂ heavier</b> and watch the tension rise toward F. The rope has to pull a bigger load.</li></ol>
      <div class="key">The weight and normal force on each trolley cancel (no vertical acceleration), so only the horizontal forces matter.</div>
      <h3>Symbols in this chapter</h3>
      <table class="legend"><tr><th>Symbol</th><th>Meaning</th><th>Unit</th></tr>
      <tr><td>F</td><td>Applied force pulling the system</td><td>N</td></tr>
      <tr><td>m₁, m₂</td><td>Masses of the two objects</td><td>kg</td></tr>
      <tr><td>a</td><td>Acceleration (the same for both objects)</td><td>m s<sup>−2</sup></td></tr>
      <tr><td>T</td><td>Tension in the rope</td><td>N</td></tr>
      <tr><td>g</td><td>Gravitational field strength, 9.8</td><td>N kg<sup>−1</sup></td></tr></table>` },
    { id: 'pulley', title: 'Pulleys and hanging masses', init: [D2], html: `
      <p>A smooth pulley only changes the direction of the rope’s pull. For a mass on a smooth table joined to a hanging mass, the only outside force that drives the system along its path is the <b>weight of the hanging mass</b>.</p>
      <div class="d2 w"></div>
      <h3>What to look for in the diagram</h3>
      <ol><li><b>The table mass</b> is pulled sideways by T only. Its weight and the table’s normal force cancel.</li>
      <li><b>The hanging mass</b> has T pulling up and its weight pulling down. It accelerates <i>down</i>, so its weight is bigger than T.</li>
      <li><b>Both accelerations (green) are equal</b>: while m₂ goes down, m₁ moves toward the pulley.</li></ol>
      <div class="warn"><b>Common mistake:</b> assuming the tension equals the hanging weight (T = m₂g). That is only true if the hanging mass is not accelerating. When it accelerates downward, T is always smaller than m₂g.</div>` },
    { id: 'formulas', title: 'The formulas, step by step', html: `
      <p>Every connected-body problem uses the same two steps. First treat everything as one system to find the acceleration. Then pick <b>one object</b> and apply Newton’s second law to it to find the tension.</p>
      <h3>Step 1: the whole system</h3>` +
      card('Acceleration of the system', `a = ${fr('F<sub>net</sub>', 'm₁ + m₂')}`, '<b>a</b> = acceleration of the whole system (m s<sup>−2</sup>). <b>F<sub>net</sub></b> = total external force along the path (N). <b>m₁ + m₂</b> = total mass (kg).', 'Tensions are internal forces, so they cancel and do not appear here.') +
      `<h3>Step 2: one object at a time</h3>` +
      card('Tension in the rope', `T = m a`, '<b>T</b> = tension (N). <b>m</b> = the mass of the object on which T is the <i>only</i> horizontal (or path) force. <b>a</b> = the acceleration from Step 1.', 'For the pulled trolleys, T = m₂a. For the hanging-mass setup, T = m₁a for the table block.') +
      `<h3>Special case: mass on a table and a hanging mass</h3>` +
      card('Table mass and hanging mass', `a = ${fr('m₂ g', 'm₁ + m₂')} &nbsp; &nbsp; T = m₁ a`, '<b>m₁</b> = mass on the table (kg). <b>m₂</b> = hanging mass (kg). <b>g</b> = 9.8 N kg<sup>−1</sup>. The driving force is the weight of the hanging mass, m₂g.', 'Check: for the hanging mass, m₂g − T = m₂a. It should give the same T.') +
      `<h3>Special case: two masses hanging over a pulley</h3>` +
      card('Two hanging masses (m₂ is the heavier one)', `a = ${fr('(m₂ − m₁) g', 'm₁ + m₂')} &nbsp; &nbsp; T = ${fr('2 m₁ m₂ g', 'm₁ + m₂')}`, '<b>m₂</b> = heavier mass, which moves down (kg). <b>m₁</b> = lighter mass, which moves up (kg).', 'The driving force is the <i>difference</i> in the two weights, (m₂ − m₁)g. Both masses have to be accelerated, so the total mass m₁ + m₂ is in the denominator.') +
      `<h3>Which one do I use?</h3>
      <table class="legend plain"><tr><th>Situation</th><th>Acceleration</th><th>Tension</th></tr>
      <tr><td>Objects pulled by a force F along a smooth surface</td><td>a = F ÷ (m₁ + m₂)</td><td>T = (mass behind the rope) × a</td></tr>
      <tr><td>Table mass + hanging mass</td><td>a = m₂g ÷ (m₁ + m₂)</td><td>T = m₁a</td></tr>
      <tr><td>Two hanging masses</td><td>a = (m₂ − m₁)g ÷ (m₁ + m₂)</td><td>T = m₁(g + a) for the lighter one</td></tr></table>` },
    { id: 'examples', title: 'Worked examples and traps', html: `
      <p>Method: <b>(1)</b> choose a positive direction along the path; <b>(2)</b> find a using the whole system; <b>(3)</b> apply F<sub>net</sub> = ma to one object to find T; <b>(4)</b> check using the other object.</p>` +
      ex('two trolleys', ['<b>Situation:</b> a 30 N force pulls trolley A (6.0 kg), which is joined by a rope to trolley B (4.0 kg). The floor is smooth. Find the acceleration and the tension.', '<b>Whole system:</b> a = F ÷ (m₁ + m₂) = 30 ÷ (6.0 + 4.0) = <b>3.0 ' + A + '</b>.', '<b>Isolate B:</b> the only horizontal force on B is the tension.', '<b>Second law on B:</b> T = m<sub>B</sub>a = (4.0)(3.0) = <b>12 N</b>.', '<b>Check on A:</b> F − T = 30 − 12 = 18 N, and m<sub>A</sub>a = (6.0)(3.0) = 18 N ✓.']) +
      ex('table and hanging mass', ['<b>Situation:</b> a 3.0 kg block on a smooth table is joined over a pulley to a 2.0 kg hanging mass. Find a and T.', '<b>Whole system:</b> a = m₂g ÷ (m₁ + m₂) = (2.0)(9.8) ÷ 5.0 = <b>3.9 ' + A + '</b>.', '<b>Table mass:</b> T = m₁a = (3.0)(3.92) = <b>12 N</b>.', '<b>Check with the hanging mass:</b> m₂g − T = 19.6 − 11.8 = 7.8 N, and m₂a = (2.0)(3.92) = 7.8 N ✓.']) +
      ex('two hanging masses', ['<b>Situation:</b> masses of 3.0 kg and 5.0 kg hang from the two ends of a rope over a smooth pulley. Find the acceleration and the tension.', '<b>Acceleration:</b> a = (m₂ − m₁)g ÷ (m₁ + m₂) = (2.0)(9.8) ÷ 8.0 = <b>2.45 ' + A + '</b>. The 5.0 kg mass moves down.', '<b>Tension, using the lighter mass</b> (T up, weight down, accelerating up): T − m₁g = m₁a.', '<b>Solve:</b> T = m₁(g + a) = 3.0(9.8 + 2.45) = <b>37 N</b>.', '<b>Check with the heavier mass:</b> m₂(g − a) = 5.0(7.35) = 37 N ✓.']) +
      `<div class="warn"><b>Common mistakes</b><br>1. Using T = m₂g for an accelerating hanging mass.<br>2. Putting the tension in the whole-system equation. It is internal and cancels.<br>3. Using the wrong mass for T. The tension equals ma only for an object where T is the net force.<br>4. Forgetting that on a pulley the two sides share the same T, but the two accelerations point in different directions along the path.</div>` }
  ], questions: [
    mc('Two objects are joined by a light, inextensible rope. Which statement is true?', ['They have different accelerations', 'They have the same acceleration', 'The tension is zero', 'Only one object has weight'], 1, 'An inextensible rope keeps the objects the same distance apart, so their accelerations must have the same magnitude.'),
    nu('A 20 N force pulls a 3.0 kg trolley that is joined by a rope to a 2.0 kg trolley on a smooth floor. What is the acceleration?', 4, .05, A, 'Treat both as one system with total mass 5.0 kg.', 'a = F ÷ (m₁ + m₂) = 20 ÷ 5.0 = 4.0 ' + A + '.'),
    nu('For the same trolleys (3.0 kg pulled by 20 N, joined to 2.0 kg behind it), what is the tension in the rope?', 8, .1, 'N', 'Isolate the 2.0 kg trolley. Only the tension acts on it horizontally.', 'T = m₂a = (2.0)(4.0) = 8.0 N.'),
    nu('A 4.0 kg block on a smooth table is joined over a pulley to a 1.0 kg hanging mass. What is the acceleration? Use g = 9.8 ' + A + '.', 2, .05, A, 'a = m₂g ÷ (m₁ + m₂).', 'a = (1.0)(9.8) ÷ 5.0 = 1.96 ≈ 2.0 ' + A + '.'),
    nu('What is the tension in the rope in the previous question?', 7.8, .1, 'N', 'Apply F = ma to the table block: only the tension acts horizontally.', 'T = m₁a = (4.0)(1.96) = 7.8 N.'),
    mc('A mass hangs from a rope and accelerates downward. How does the tension compare with its weight?', ['Greater than the weight', 'Equal to the weight', 'Less than the weight', 'Zero'], 2, 'The net force is downward, so mg − T > 0, which means T < mg.'),
    nu('Masses of 2.0 kg and 6.0 kg hang from the ends of a rope over a smooth pulley. What is the size of their acceleration?', 4.9, .05, A, 'The driving force is the difference of the weights, (m₂ − m₁)g.', 'a = (m₂ − m₁)g ÷ (m₁ + m₂) = (4.0)(9.8) ÷ 8.0 = 4.9 ' + A + '.'),
    nu('What is the tension in the rope in the previous question?', 29.4, .3, 'N', 'Use the lighter mass, which accelerates upward: T − m₁g = m₁a.', 'T = m₁(g + a) = 2.0(9.8 + 4.9) = 29.4 N. (Check with the heavier mass: 6.0(9.8 − 4.9) = 29.4 N.)'),
    mc('A light rope passes over a smooth pulley with a mass on each end. Which statement about the tension is correct?', ['It is larger on the heavier side', 'It has the same size on both sides', 'It is zero on the lighter side', 'It equals the sum of the two weights'], 1, 'For a light rope over a smooth pulley, the tension has the same magnitude throughout the rope.')
  ] };
})();
