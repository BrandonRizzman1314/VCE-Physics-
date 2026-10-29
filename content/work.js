(function () {
  const { f, ex, lab, mc, nu, V: U } = window.H; window.TOPICS = window.TOPICS || {};
  const fr = (a, b) => `<span class="frac"><span>${a}</span><span>${b}</span></span>`;
  const card = (t, eq, w, n) => `<div class="fcard"><h4>${t}</h4><div class="eq">${eq}</div><p class="where"><b>Where:</b> ${w}</p>${n ? `<p class="where">${n}</p>` : ''}</div>`;
  const L1 = lab('w1', 'Work as the area under a force–distance graph', [['a', 'Force at the start F₁ (N)', 0, 100, 20], ['b', 'Force at the end F₂ (N)', 0, 100, 60], ['x', 'Distance moved s (m)', 1, 10, 5, .5]], V => {
    const W = .5 * (V.a + V.b) * V.x, X = 40 + 52 * V.x;
    return { svg: '<line x1="40" y1="200" x2="580" y2="200" stroke="gray"/><line x1="40" y1="20" x2="40" y2="200" stroke="gray"/>' + `<polygon points="40,200 40,${200 - 1.8 * V.a} ${X},${200 - 1.8 * V.b} ${X},200" fill="#2f5fd0" fill-opacity=".3" stroke="#2f5fd0" stroke-width="3"/><text x="575" y="194" text-anchor="end">distance (m)</text><text x="46" y="16">force (N)</text>`,
      out: [['Work = area under the graph', f(W) + ' J'], ['Average force', f((V.a + V.b) / 2) + ' N'], ['Check: average force × distance', f((V.a + V.b) / 2 * V.x) + ' J']] };
  }, '0 0 600 215');
  window.TOPICS.work = { title: 'Work done by a force', kk: ['Investigate and apply theoretically and practically the concept of work done by a force using: work done = force × displacement; work done = area under force vs distance graph (one dimensional only).'], sections: [
    { id: 'idea', title: 'Work and energy transfer', init: [L1], html: `
      <p><b>Work</b> is the energy transferred to or from an object by a force acting over a displacement. A force that pushes an object along its direction of motion transfers energy to it. A force that opposes the motion transfers energy away.</p>
      <div class="key">The unit of work (and of energy) is the <b>joule</b>: 1 J = 1 N × 1 m.</div>
      <div class="w1 w"></div>
      <h3>What to look for in the diagram</h3>
      <ol><li><b>Set the two forces equal.</b> The graph is a rectangle, and the area is F × s.</li>
      <li><b>Set the starting force to 0.</b> The graph becomes a triangle, as for a stretching spring, and the work is ½ × base × height.</li>
      <li><b>The area is the work</b> for any one-dimensional force–distance graph, even if the force changes.</li></ol>` },
    { id: 'formulas', title: 'The formulas and the signs', html: `` +
      card('Work done by a constant force', `W = F s`, '<b>W</b> = work done (J). <b>F</b> = force acting <i>along</i> the direction of the displacement (N). <b>s</b> = displacement (m).', 'If the force is at an angle, only the component along the displacement does work.') +
      card('Work from a graph', `W = area under the F–s graph`, 'The area is found with simple shapes: rectangle = base × height, triangle = ½ × base × height, trapezium = ½(F₁ + F₂)s.', 'Area above the axis is positive work; area below is negative.') +
      card('Net work and kinetic energy', `W<sub>net</sub> = ΔE<sub>k</sub> = ½ m v² − ½ m u²`, '<b>W<sub>net</sub></b> = work done by the net force (J). <b>u</b> and <b>v</b> = initial and final speeds (m s<sup>−1</sup>).', 'The net work equals the change in kinetic energy.') +
      `<h3>Is the work positive, negative or zero?</h3>
      <table class="legend plain"><tr><th>Force compared with displacement</th><th>Work</th><th>Example</th></tr>
      <tr><td>Same direction</td><td>Positive: energy given to the object</td><td>Engine force on an accelerating car</td></tr>
      <tr><td>Opposite direction</td><td>Negative: energy taken from the object</td><td>Friction on a sliding box</td></tr>
      <tr><td>At right angles</td><td>Zero</td><td>Normal force, or the centripetal force in uniform circular motion</td></tr></table>` },
    { id: 'examples', title: 'Worked examples and traps', html: `` +
      ex('pushing a crate', ['<b>Situation:</b> a person pushes a crate with a constant 50 N force across 6.0 m. Friction is 20 N. Find the work done by the person and by friction.', '<b>The person:</b> W = Fs = (50)(6.0) = <b>+300 J</b>.', '<b>Friction opposes the motion:</b> W = −(20)(6.0) = <b>−120 J</b>.', '<b>Net work:</b> 300 − 120 = 180 J, which becomes the crate’s kinetic energy.']) +
      ex('a changing force', ['<b>Situation:</b> a force increases steadily from 0 to 40 N over 0.50 m. How much work is done?', '<b>The graph is a triangle.</b>', '<b>Area:</b> ½ × 0.50 × 40 = <b>10 J</b>.']) +
      ex('work and speed', ['<b>Situation:</b> a net force of 3000 N acts on a 1200 kg car, starting from rest, over 50 m. Find its final speed.', '<b>Net work:</b> W = Fs = (3000)(50) = 1.5 × 10<sup>5</sup> J.', '<b>This equals the gain in kinetic energy:</b> ½mv² = 1.5 × 10<sup>5</sup>.', '<b>Solve:</b> v = √(2 × 1.5 × 10<sup>5</sup> ÷ 1200) = <b>15.8 ' + U + '</b>.']) +
      `<div class="warn"><b>Common mistakes</b><br>1. Using the total distance travelled when the question needs the displacement in the direction of the force.<br>2. Ignoring signs. Friction does negative work.<br>3. Saying a force does work just because it is acting. If there is no displacement (or the force is perpendicular to it), the work is zero.</div>` }
  ], questions: [
    mc('Which of these is equivalent to one joule?', ['1 N m', '1 N s', '1 kg m s⁻¹', '1 W s⁻¹'], 0, 'Work = force × distance, so 1 J = 1 N × 1 m.'),
    nu('A 50 N force pushes a crate 6.0 m in the direction of the force. How much work does the force do?', 300, 1, 'J', 'W = Fs.', 'W = (50)(6.0) = 300 J.'),
    nu('A 20 N friction force acts on a box that slides 5.0 m. What is the work done by friction? (Give the sign.)', -100, 1, 'J', 'Friction acts opposite to the displacement.', 'W = −(20)(5.0) = −100 J. Friction removes energy from the box.'),
    nu('A force increases steadily from 0 N to 40 N over a distance of 0.50 m. How much work is done?', 10, .1, 'J', 'The area under the graph is a triangle.', 'W = ½ × 0.50 × 40 = 10 J.'),
    mc('A satellite moves in a circular orbit. How much work does gravity do on it in one orbit?', ['A large positive amount', 'A large negative amount', 'Zero', 'It depends on the mass'], 2, 'Gravity acts toward the centre, at right angles to the displacement at every point, so it does no work.'),
    nu('A net force of 3000 N acts on a 1200 kg car from rest over 50 m. What is its final speed?', 15.8, .1, U, 'The net work equals the gain in kinetic energy: Fs = ½mv².', 'v = √(2Fs ÷ m) = √(2 × 150 000 ÷ 1200) = 15.8 ' + U + '.')
  ] };
})();
