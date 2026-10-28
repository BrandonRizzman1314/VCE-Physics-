(function () {
  const { f, ex, lab, mc, nu, V: U } = window.H; window.TOPICS = window.TOPICS || {};
  const L1 = lab('l1', 'Ideal banking angle (no friction needed)', [['v', 'Design speed (m/s)', 5, 40, 20], ['r', 'Radius of curve (m)', 20, 200, 100]], V => {
    const t = Math.atan(V.v * V.v / (V.r * 9.8)) * 180 / Math.PI;
    return { out: [['tan θ = v²/rg', f(V.v * V.v / (V.r * 9.8), 3)], ['Banking angle θ', f(t) + '°'], ['Speed in km/h', f(V.v * 3.6, 0)]] };
  });
  window.TOPICS['1F'] = { title: 'Banked circular motion', sections: [
    { id: 'idea', title: 'How banking works', init: [L1], html: `
      <p>On a banked curve the road is tilted toward the centre. The normal force is perpendicular to the road, so it has a horizontal component toward the centre. At the right speed this component alone supplies the centripetal force, with <b>no friction needed</b>.</p>
      <div class="key"><b>Vertical:</b> N cos θ = mg &nbsp; &nbsp; <b>Horizontal (toward centre):</b> N sin θ = mv²/r<br>Dividing: <b>tan θ = v² / (rg)</b></div>
      <div class="l1 w"></div>
      <p>Notice that the mass cancels, so the ideal angle depends only on speed and radius.</p>` },
    { id: 'solve', title: 'Solving banked-curve problems', html: `
      <ol><li>Draw the weight (down) and the normal force (perpendicular to the road).</li><li>Resolve N into a vertical part N cos θ and a horizontal part N sin θ.</li><li>The vertical forces balance; the horizontal part gives mv²/r.</li></ol>
      <div class="warn"><b>Remember:</b> the circle is <i>horizontal</i>, so the centre is horizontally inward, not up the slope. Faster than the design speed, a vehicle tends to slide outward (up the bank), so friction acts down the slope. Slower, and it tends to slide inward, so friction acts up the slope.</div>` +
      ex('a racetrack bend', ['<b>Situation:</b> a 1200 kg car travels at 25 ' + U + ' around a bend of radius 120 m. What angle must the track be banked at so no friction is needed?', '<b>Use</b> tan θ = v² / (rg).', '<b>Substitute:</b> tan θ = 625 / (120 × 9.8) = 0.531', '<b>Answer:</b> θ = tan<sup>−1</sup>(0.531) = <b>28°</b>.']) }
  ], questions: [
    mc('On a frictionless banked curve, which force provides the centripetal force?', ['The weight', 'The horizontal component of the normal force', 'The vertical component of the normal force', 'Air resistance'], 1, 'N sin θ points horizontally toward the centre, so it supplies the net force toward the centre.'),
    nu('A road is banked for vehicles travelling at 20 ' + U + ' around a curve of radius 100 m. What is the banking angle?', 22.2, .3, '°', 'Use tan θ = v²/(rg).', 'tan θ = 400 / (100 × 9.8) = 0.408, so θ = 22.2°.'),
    nu('A curve of radius 80 m is banked at 15°. At what speed can cars take it without friction?', 14.5, .15, U, 'Rearrange: v² = rg tan θ.', 'v² = (80)(9.8) tan 15° = 210, so v = 14.5 ' + U + '.'),
    mc('A car takes a banked curve faster than the design speed. Which way does the friction on it act?', ['Up the slope', 'Down the slope', 'Horizontally outward', 'There is no friction'], 1, 'The car tends to slide outward and up the slope, so friction acts down the slope to oppose that.'),
    nu('A 800 kg car takes a 10° bank at its ideal speed with no friction. What is the normal force on it?', 7960, 15, 'N', 'The vertical forces balance: N cos θ = mg.', 'N = mg / cos θ = (800)(9.8) / cos 10° = 7960 N.'),
    mc('The ideal banking angle (no friction) for a given speed and radius depends on:', ['The mass of the car', 'Neither the mass nor the speed', 'The speed and radius only', 'The normal force only'], 2, 'tan θ = v²/(rg). The mass cancels, so only v and r matter.')
  ] };
})();
