(function () {
  const { f, ex, lab, A, V: U, mc, nu } = window.H; window.TOPICS = window.TOPICS || {};
  const L1 = lab('l1', 'Loop-the-loop: forces at the top and bottom', [['m', 'Mass (kg)', 1, 100, 60], ['r', 'Radius r (m)', 2, 40, 10], ['v', 'Speed v (m/s, assumed constant)', 1, 30, 15]], V => {
    const top = V.m * (V.v * V.v / V.r - 9.8), vmin = Math.sqrt(9.8 * V.r);
    return { out: [['Normal force at the top', top > 0 ? f(top, 0) + ' N (downward)' : '0 N: loses contact'], ['Normal force at the bottom', f(V.m * (9.8 + V.v * V.v / V.r), 0) + ' N (upward)'], ['Minimum speed at top √(gr)', f(vmin) + ' ' + U], ['Weight mg', f(V.m * 9.8, 0) + ' N']] };
  });
  window.TOPICS['1G'] = { title: 'Vertical circular motion', sections: [
    { id: 'idea', title: 'Top and bottom of the circle', init: [L1], html: `
      <p>In a vertical circle the weight always points down, but the centre direction changes. So we apply F<sub>net</sub> = mv²/r <b>toward the centre</b> at each point separately.</p>
      <div class="key"><b>Bottom</b> (centre is up): N − mg = mv²/r, so <b>N = mg + mv²/r</b><br><b>Top</b> (centre is down): N + mg = mv²/r, so <b>N = mv²/r − mg</b></div>
      <p>For a bucket on a string, replace N with the tension T.</p>
      <div class="l1 w"></div>
      <p>At the bottom you feel heavier than your weight. At the top you feel lighter.</p>` },
    { id: 'minimum', title: 'Minimum speed and examples', html: `
      <div class="key">The minimum speed at the top (where N or T just reaches zero) is <b>v = √(gr)</b>. Gravity alone then supplies all of the centripetal force.</div>
      <div class="warn"><b>Common mistake:</b> speed is not usually constant in a vertical circle, because gravity does work on the object. The equations above are valid at each point using the speed <i>at that point</i>.</div>` +
      ex('roller coaster loop', ['<b>Situation:</b> a 500 kg car passes the top of a loop of radius 8.0 m at 12 ' + U + '. Find the normal force from the track.', '<b>Centre is downward.</b> Both N and mg point down: N + mg = mv²/r.', '<b>Rearrange:</b> N = m(v²/r − g) = 500(144/8.0 − 9.8)', '<b>Answer:</b> N = 500(8.2) = <b>4100 N</b> downward.']) }
  ], questions: [
    mc('A person in a car travels at constant speed through a dip at the bottom of a circular path. How does the normal force compare with their weight?', ['Less than the weight', 'Equal to the weight', 'Greater than the weight', 'Zero'], 2, 'At the bottom the net force is upward: N − mg = mv²/r, so N > mg.'),
    nu('What is the minimum speed needed at the top of a vertical loop of radius 10 m?', 9.9, .1, U, 'At the minimum speed the normal force is zero, so mg = mv²/r.', 'v = √(gr) = √(9.8 × 10) = 9.9 ' + U + '.'),
    nu('A 2.0 kg bucket is swung in a vertical circle of radius 1.0 m. At the bottom its speed is 5.0 ' + U + '. What is the tension in the rope?', 69.6, .3, 'N', 'T − mg = mv²/r.', 'T = mg + mv²/r = 19.6 + (2.0)(25)/1.0 = 69.6 N.'),
    nu('The same bucket has a speed of 5.0 ' + U + ' at the top of the circle. What is the tension?', 30.4, .3, 'N', 'At the top, tension and weight both point toward the centre: T + mg = mv²/r.', 'T = mv²/r − mg = 50 − 19.6 = 30.4 N.'),
    mc('A roller coaster car travels over the top of a loop at exactly √(gr). What is the normal force from the track?', ['mg', '2mg', 'Zero', 'mv²/r + mg'], 2, 'At v = √(gr), mv²/r = mg, so gravity alone supplies the centripetal force and N = 0.'),
    nu('A 60 kg person travels at 20 ' + U + ' through the bottom of a dip of radius 40 m. What is the normal force on them?', 1188, 2, 'N', 'N − mg = mv²/r.', 'N = m(g + v²/r) = 60(9.8 + 400/40) = 1188 N.')
  ] };
})();
