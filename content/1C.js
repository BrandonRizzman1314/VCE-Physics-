(function () {
  const { f, ex, arrow, lab, A, mc, nu } = window.H; window.TOPICS = window.TOPICS || {};
  const L1 = lab('l1', 'Weight components on a slope', [['m', 'Mass (kg)', 1, 20, 5], ['t', 'Slope angle (°)', 0, 60, 30]], V => {
    const r = V.t * Math.PI / 180, W = V.m * 9.8, s = Math.sin(r), c = Math.cos(r), px = 80 + 150 * c, py = 270 - 150 * s, k = .45;
    return { svg: `<line x1="20" y1="270" x2="580" y2="270" stroke="gray"/><line x1="80" y1="270" x2="${80 + 300 * c}" y2="${270 - 300 * s}" stroke="gray" stroke-width="4"/>` + arrow(px, py, px, py + k * W, '#c23b3b') + arrow(px, py, px - k * W * s * c, py + k * W * s * s, '#e08a1e', 1) + arrow(px, py, px + k * W * c * s, py + k * W * c * c, '#2f5fd0', 1) + `<text x="${px + 8}" y="${py + k * W + 14}">W</text>`,
      out: [['Weight W = mg', f(W) + ' N'], ['Down the slope: mg sin θ', f(W * s) + ' N'], ['Into the slope: mg cos θ', f(W * c) + ' N'], ['Normal force N', f(W * c) + ' N']] };
  }, '0 0 600 300');
  const L2 = lab('l2', 'Sliding down a slope with friction', [['m', 'Mass (kg)', 1, 20, 5], ['t', 'Slope angle (°)', 0, 60, 30], ['F', 'Friction (N)', 0, 60, 10]], V => {
    const n = V.m * 9.8 * Math.sin(V.t * Math.PI / 180) - V.F;
    return { out: [['Net force down slope', f(n) + ' N'], ['Acceleration down slope', f(n / V.m, 2) + ' ' + A], ['Result', n > 0 ? 'speeds up' : n < 0 ? 'slows down' : 'constant velocity']] };
  });
  window.TOPICS['1C'] = { title: 'Inclined planes', sections: [
    { id: 'components', title: 'Forces on a slope', init: [L1], html: `
      <p>On a slope it is easiest to choose axes <b>parallel</b> and <b>perpendicular</b> to the surface, then resolve the weight (which still points straight down) into those directions.</p>
      <div class="key"><b>Parallel to slope:</b> mg sin θ (pulls the object down the slope)<br><b>Perpendicular to slope:</b> mg cos θ (pushes into the surface)<br>The object does not accelerate into or out of the surface, so <b>N = mg cos θ</b>.</div>
      <div class="l1 w"></div>
      <div class="warn"><b>Common mistake:</b> on a slope the normal force is <i>not</i> equal to mg. It is smaller by the factor cos θ. The angle θ is the angle of the slope, which is also the angle between the weight and the perpendicular to the surface.</div>` },
    { id: 'motion', title: 'Acceleration on a slope', init: [L2], html: `
      <div class="key">Down the slope: <b>F<sub>net</sub> = mg sin θ − friction</b>, and <b>a = F<sub>net</sub> / m</b>.<br>With no friction, a = g sin θ, and the mass cancels.</div>
      <div class="l2 w"></div><p>A negative net force down the slope means the net force points up the slope. A sliding object then slows down.</p>` +
      ex('block on a ramp', ['<b>Situation:</b> a 4.0 kg block slides down a 35° ramp with a 10 N friction force. Find its acceleration.', '<b>Down-slope component:</b> mg sin θ = (4.0)(9.8) sin 35° = 22.5 N.', '<b>Net force:</b> 22.5 − 10 = 12.5 N down the slope.', '<b>Acceleration:</b> a = 12.5 / 4.0 = <b>3.1 ' + A + '</b> down the slope.']) }
  ], questions: [
    mc('Which expression gives the component of weight acting parallel to a slope of angle θ?', ['mg cos θ', 'mg sin θ', 'mg tan θ', 'mg'], 1, 'The component along the slope is mg sin θ. The component into the slope is mg cos θ.'),
    mc('As the angle of a slope increases from 0° to 60°, what happens to the normal force on a block on it?', ['It increases', 'It stays the same', 'It decreases', 'It becomes zero'], 2, 'N = mg cos θ, and cos θ gets smaller as θ increases.'),
    nu('A 10 kg block slides down a frictionless 30° slope. What is its acceleration?', 4.9, .05, A, 'With no friction, a = g sin θ.', 'a = g sin 30° = 9.8 × 0.5 = 4.9 ' + A + '.'),
    nu('What is the normal force on a 5.0 kg block resting on a 20° slope?', 46, .4, 'N', 'N = mg cos θ.', 'N = (5.0)(9.8) cos 20° = 46 N.'),
    nu('A 2.0 kg block slides down a 25° slope at constant velocity. What is the friction force on it?', 8.3, .15, 'N', 'Constant velocity means the net force along the slope is zero.', 'F<sub>net</sub> = 0, so friction = mg sin θ = (2.0)(9.8) sin 25° = 8.3 N.'),
    mc('A block slides down a slope at constant velocity. Which statement is correct?', ['Friction is greater than mg sin θ', 'Friction equals mg sin θ', 'Friction is zero', 'Friction equals mg cos θ'], 1, 'Constant velocity means zero net force along the slope, so the friction force balances the down-slope component, mg sin θ.')
  ] };
})();
