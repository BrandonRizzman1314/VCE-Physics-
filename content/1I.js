(function () {
  const { f, ex, lab, V: U, mc, nu } = window.H; window.TOPICS = window.TOPICS || {};
  const L1 = lab('l1', 'Collision: the objects stick together (right is positive)', [['a', 'Mass m₁ (kg)', 1, 10, 2], ['u', 'Velocity u₁ (m/s)', -10, 10, 6], ['b', 'Mass m₂ (kg)', 1, 10, 4], ['w', 'Velocity u₂ (m/s)', -10, 10, 0]], V => {
    const p = V.a * V.u + V.b * V.w, v = p / (V.a + V.b), k1 = .5 * V.a * V.u * V.u + .5 * V.b * V.w * V.w, k2 = .5 * (V.a + V.b) * v * v;
    return { out: [['Total momentum (before = after)', f(p) + ' kg m s⁻¹'], ['Final velocity', f(v, 2) + ' ' + U], ['Kinetic energy before', f(k1) + ' J'], ['Kinetic energy after', f(k2) + ' J'], ['Kinetic energy lost', f(k1 - k2) + ' J']] };
  });
  const L2 = lab('l2', 'Impulse: a ball hits a wall (towards the wall is positive)', [['m', 'Mass (kg)', .1, 2, .15, .05], ['i', 'Velocity before (m/s)', 1, 40, 20], ['o', 'Velocity after (m/s)', -30, 30, -15], ['t', 'Contact time (s)', .005, .1, .02, .005]], V => {
    const J = V.m * (V.o - V.i); return { out: [['Change in momentum Δp', f(J, 2) + ' N s'], ['Average force F = Δp/Δt', f(J / V.t, 0) + ' N']] };
  });
  window.TOPICS['1I'] = { title: 'Conservation of momentum and impulse in collisions', kk: ['Investigate and apply theoretically and practically the laws of energy and momentum conservation in isolated systems in one dimension.','Investigate and analyse theoretically and practically impulse in an isolated system for collisions between objects moving in a straight line: FΔt = mΔv.'], sections: [
    { id: 'momentum', title: 'Momentum and its conservation', init: [L1], html: `
      <div class="key"><b>Momentum: p = mv</b> (vector, unit kg m s<sup>−1</sup>).<br><b>Conservation:</b> in a closed system with no external net force, total momentum before = total momentum after.</div>
      <p>For a collision in one dimension: <b>m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂</b>. Give each velocity a sign.</p>
      <div class="l1 w"></div>
      <p>Momentum is conserved in <i>every</i> such collision, but kinetic energy is only conserved in an <b>elastic</b> collision. When objects stick together (perfectly inelastic) the most kinetic energy is lost.</p>` +
      ex('a sticky collision', ['<b>Situation:</b> a 2.0 kg trolley at 6.0 ' + U + ' hits a stationary 4.0 kg trolley and they stick together. Find their speed.', '<b>Momentum before:</b> (2.0)(6.0) + (4.0)(0) = 12 kg m s<sup>−1</sup>.', '<b>After:</b> (2.0 + 4.0)v = 12.', '<b>Answer:</b> v = <b>2.0 ' + U + '</b> in the original direction.']) },
    { id: 'impulse', title: 'Impulse and force', init: [L2], html: `
      <div class="key"><b>Impulse = FΔt = Δp = m(v − u)</b> (unit N s, the same as kg m s<sup>−1</sup>).<br>On a force–time graph, the <b>area</b> under the curve is the impulse.</div>
      <div class="l2 w"></div>
      <p>For a given change in momentum, a longer contact time means a smaller average force. This is why crumple zones, airbags and padded floors protect people.</p>
      <div class="warn"><b>Check the signs:</b> a ball that bounces back changes its velocity from +20 to −15 m s<sup>−1</sup>, a change of −35 m s<sup>−1</sup>, not 5.</div>` }
  ], questions: [
    mc('Which of these is a unit of impulse?', ['kg m s<sup>−2</sup>', 'N s', 'J', 'N m'], 1, 'Impulse = FΔt, so N s. This equals kg m s<sup>−1</sup>.'),
    nu('What is the momentum of a 1500 kg car travelling at 20 ' + U + '?', 30000, 100, 'kg m s<sup>−1</sup>', 'p = mv.', 'p = (1500)(20) = 3.0 × 10⁴ kg m s<sup>−1</sup>.'),
    nu('A 0.15 kg ball hits a wall at 20 ' + U + ' and rebounds at 15 ' + U + '. What is the size of the impulse on the ball?', 5.25, .1, 'N s', 'Take the initial direction as positive, so the final velocity is −15.', 'Δp = m(v − u) = 0.15(−15 − 20) = −5.25 N s. The size is 5.25 N s.'),
    nu('The ball in the previous question is in contact with the wall for 0.020 s. What is the average force on it?', 262.5, 3, 'N', 'F = Δp / Δt.', 'F = 5.25 / 0.020 = 263 N (away from the wall).'),
    nu('A 2.0 kg object at 6.0 ' + U + ' collides with a stationary 4.0 kg object and they stick together. What is their final speed?', 2, .05, U, 'Total momentum before equals total momentum after.', '(2.0)(6.0) = (6.0)v, so v = 2.0 ' + U + '.'),
    mc('Why do crumple zones reduce injuries in a crash?', ['They reduce the change in momentum', 'They increase the time of the collision, reducing the average force', 'They increase the kinetic energy', 'They reduce the car’s mass'], 1, 'The change in momentum is fixed, so FΔt is fixed. A longer collision time Δt means a smaller average force F.')
  ] };
})();
