(function () {
  const { f, ex, arrow, lab, A, V: U, mc, nu } = window.H; window.TOPICS = window.TOPICS || {};
  const L1 = lab('l1', 'Uniform circular motion', [['m', 'Mass (kg)', 1, 20, 2], ['v', 'Speed v (m/s)', 1, 30, 10], ['r', 'Radius r (m)', 1, 50, 10]], V => {
    const a = V.v * V.v / V.r;
    return { svg: '<circle cx="300" cy="130" r="100" fill="none" stroke="gray"/><circle cx="400" cy="130" r="7" fill="#8895a8"/><circle cx="300" cy="130" r="3" fill="gray"/>' + arrow(400, 130, 400, 130 - 4 * V.v, '#2f5fd0') + arrow(400, 130, 400 - Math.min(95, 5 * a), 130, '#c23b3b') + '<text x="410" y="70">velocity (tangent)</text><text x="300" y="150" text-anchor="middle" fill="#c23b3b">F toward centre</text>',
      out: [['Centripetal acceleration v²/r', f(a, 2) + ' ' + A], ['Net force mv²/r', f(V.m * a, 1) + ' N'], ['Period T = 2πr/v', f(2 * Math.PI * V.r / V.v, 2) + ' s']] };
  }, '0 0 600 260');
  window.TOPICS['1E'] = { title: 'Basic circular motion', sections: [
    { id: 'idea', title: 'Why circular motion needs a force', init: [L1], html: `
      <p>In <b>uniform circular motion</b> the speed is constant but the direction keeps changing, so the velocity changes and the object <b>accelerates</b>. The acceleration points toward the centre of the circle (<b>centripetal acceleration</b>).</p>
      <div class="key"><b>a = v² / r</b> &nbsp; &nbsp; <b>F<sub>net</sub> = mv² / r</b> &nbsp; &nbsp; <b>T = 2πr / v</b> (period: time for one revolution)</div>
      <div class="l1 w"></div>
      <div class="warn"><b>Common mistake:</b> “centripetal force” is not a new kind of force. It is the <i>net</i> force toward the centre, provided by tension, friction, gravity or a normal force. Never add it to a free-body diagram as an extra arrow. If the force disappears (e.g. a string breaks), the object travels in a straight line along the tangent.</div>` },
    { id: 'apply', title: 'Applying the equations', html: `
      <p>Identify what provides the net force toward the centre, then set it equal to mv²/r.</p>
      <div class="key"><b>Car on a flat curve:</b> friction from the road.<br><b>Ball on a string:</b> tension.<br><b>Satellite:</b> gravity.</div>
      <p>Doubling the speed makes the required force <b>four times</b> as large. Doubling the radius halves it.</p>` +
      ex('car on a roundabout', ['<b>Situation:</b> a 900 kg car drives around a roundabout of radius 25 m at 10 m s<sup>−1</sup>. What friction force is needed?', '<b>Friction provides the net force toward the centre.</b>', '<b>Substitute:</b> F = mv²/r = (900)(10)² / 25', '<b>Answer:</b> <b>3600 N</b> toward the centre.']) }
  ], questions: [
    mc('A ball moves at constant speed in a horizontal circle. What is the direction of the net force on it?', ['Along the direction of motion', 'Away from the centre', 'Toward the centre', 'There is no net force'], 2, 'The acceleration, and so the net force, points toward the centre of the circle.'),
    mc('A ball on a string moves in a circle. The string suddenly breaks. How does the ball move?', ['Straight outward from the centre', 'In a straight line along the tangent', 'Continues in the circle', 'Toward the centre'], 1, 'With no net force, the ball keeps its velocity at that instant: a straight line along the tangent (Newton’s first law).'),
    nu('A 0.50 kg ball moves at 4.0 ' + U + ' in a circle of radius 2.0 m. What is the net force on it?', 4, .05, 'N', 'F = mv²/r.', 'F = (0.50)(4.0)² / 2.0 = 4.0 N.'),
    nu('A runner travels at 10 ' + U + ' around a circular track of radius 20 m. What is the period of one lap?', 12.6, .1, 's', 'The distance for one lap is the circumference, 2πr.', 'T = 2πr / v = 2π(20) / 10 = 12.6 s.'),
    nu('A 1000 kg car travels at 15 ' + U + ' on a flat circular curve of radius 50 m. What friction force is needed?', 4500, 5, 'N', 'Friction provides the net force toward the centre.', 'F = mv²/r = (1000)(15)² / 50 = 4500 N.'),
    mc('The speed of an object in circular motion doubles and the radius stays the same. The required net force becomes:', ['The same', 'Twice as large', 'Four times as large', 'Half as large'], 2, 'F = mv²/r, so F is proportional to v². Doubling v multiplies F by 4.')
  ] };
})();
