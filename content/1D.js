(function () {
  const { f, ex, lab, A, mc, nu } = window.H; window.TOPICS = window.TOPICS || {};
  const L1 = lab('l1', 'Two masses pulled along a smooth floor', [['F', 'Pulling force on m₁ (N)', 1, 60, 20], ['a', 'Mass m₁ (kg)', 1, 10, 3], ['b', 'Mass m₂ (kg, pulled by the rope)', 1, 10, 2]], V => {
    const a = V.F / (V.a + V.b); return { out: [['Acceleration (both)', f(a, 2) + ' ' + A], ['Tension T = m₂a', f(V.b * a, 2) + ' N']] };
  });
  const L2 = lab('l2', 'Mass on a table connected to a hanging mass', [['a', 'Table mass m₁ (kg)', 1, 10, 3], ['b', 'Hanging mass m₂ (kg)', 1, 10, 2]], V => {
    const a = V.b * 9.8 / (V.a + V.b), T = V.a * a;
    return { out: [['Acceleration (both)', f(a, 2) + ' ' + A], ['Tension T = m₁a', f(T, 2) + ' N'], ['Weight of m₂', f(V.b * 9.8, 2) + ' N'], ['T compared with m₂g', T < V.b * 9.8 ? 'smaller' : 'equal']] };
  });
  window.TOPICS['1D'] = { title: 'Connected bodies', sections: [
    { id: 'system', title: 'Connected objects', init: [L1], html: `
      <p>Objects joined by a rope move together. We assume the rope is <b>light</b> (massless) and <b>inextensible</b> (does not stretch), so both objects have the <b>same acceleration</b> and the tension is the same along the rope.</p>
      <div class="key"><b>Strategy:</b> (1) treat all the objects as one system to find a = F<sub>net</sub> / (m₁ + m₂); (2) then isolate one object and apply F<sub>net</sub> = ma to it to find the tension.</div>
      <div class="l1 w"></div>
      <p>Only the pulling force acts on the system as a whole. The tension is <i>internal</i>, so it does not appear in step 1.</p>` +
      ex('two trolleys', ['<b>Situation:</b> a 30 N force pulls trolley A (6.0 kg), which is joined by a rope to trolley B (4.0 kg). The floor is smooth. Find the acceleration and the tension.', '<b>Whole system:</b> a = 30 / (6.0 + 4.0) = <b>3.0 ' + A + '</b>.', '<b>Isolate B:</b> the only horizontal force on B is the tension.', '<b>Second law on B:</b> T = m<sub>B</sub>a = (4.0)(3.0) = <b>12 N</b>.']) },
    { id: 'pulley', title: 'Pulleys and hanging masses', init: [L2], html: `
      <p>A smooth pulley only changes the direction of the rope’s pull. For a mass on a smooth table joined to a hanging mass, the hanging mass’s weight is the only force that drives the whole system.</p>
      <div class="key"><b>a = m₂g / (m₁ + m₂)</b> &nbsp; and &nbsp; <b>T = m₁a</b> (table mass).<br>For the hanging mass: m₂g − T = m₂a.</div>
      <div class="l2 w"></div>
      <div class="warn"><b>Common mistake:</b> the tension is <i>not</i> equal to the hanging weight, because the hanging mass is accelerating downward. T is always a bit smaller than m₂g.</div>` +
      ex('table and hanging mass', ['<b>Situation:</b> a 3.0 kg block on a smooth table is joined over a pulley to a 2.0 kg hanging mass. Find a and T.', '<b>Whole system:</b> a = m₂g / (m₁ + m₂) = (2.0)(9.8) / 5.0 = <b>3.9 ' + A + '</b>.', '<b>Table mass:</b> T = m₁a = (3.0)(3.92) = <b>12 N</b>.', '<b>Check with the hanging mass:</b> m₂g − T = 19.6 − 11.8 = 7.8 N, and m₂a = 7.8 N ✓.']) }
  ], questions: [
    mc('Two objects are joined by a light, inextensible rope. Which statement is true?', ['They have different accelerations', 'They have the same acceleration', 'The tension is zero', 'Only one object has weight'], 1, 'An inextensible rope keeps the objects the same distance apart, so their accelerations must have the same magnitude.'),
    nu('A 20 N force pulls a 3.0 kg trolley that is joined by a rope to a 2.0 kg trolley on a smooth floor. What is the acceleration?', 4, .05, A, 'Treat both as one system with total mass 5.0 kg.', 'a = F / (m₁ + m₂) = 20 / 5.0 = 4.0 ' + A + '.'),
    nu('For the same trolleys (3.0 kg pulled by 20 N, joined to 2.0 kg behind it), what is the tension in the rope?', 8, .1, 'N', 'Isolate the 2.0 kg trolley. Only the tension acts on it horizontally.', 'T = m₂a = (2.0)(4.0) = 8.0 N.'),
    nu('A 4.0 kg block on a smooth table is joined over a pulley to a 1.0 kg hanging mass. What is the acceleration? Use g = 9.8 ' + A + '.', 2, .05, A, 'a = m₂g / (m₁ + m₂).', 'a = (1.0)(9.8) / 5.0 = 1.96 ≈ 2.0 ' + A + '.'),
    nu('What is the tension in the rope in the previous question?', 7.8, .1, 'N', 'Apply F = ma to the table block: only the tension acts horizontally.', 'T = m₁a = (4.0)(1.96) = 7.8 N.'),
    mc('A mass hangs from a rope and accelerates downward. How does the tension compare with its weight?', ['Greater than the weight', 'Equal to the weight', 'Less than the weight', 'Zero'], 2, 'The net force is downward, so mg − T > 0, which means T < mg.')
  ] };
})();
