(function () {
  window.TOPICS = window.TOPICS || {};
  const $ = (r, s) => r.querySelector(s), f = (x, d = 1) => (+x).toFixed(d);

  /* Interactive 1: out-and-back walk (distance vs displacement; speed vs velocity) */
  function walk(withTime) {
    return root => {
      const w = $(root, '.walk');
      w.innerHTML = `<h4>Try it: walk right, then turn around</h4>
        <label>Walk right: <b class="r">30</b> m <input type="range" class="ir" min="0" max="50" value="30"></label>
        <label>Then walk back left: <b class="l">10</b> m <input type="range" class="il" min="0" max="50" value="10"></label>
        ${withTime ? '<label>Time taken: <b class="t">20</b> s <input type="range" class="it" min="1" max="60" value="20"></label>' : ''}
        <svg viewBox="0 0 600 70"><line x1="50" y1="40" x2="550" y2="40" stroke="gray"/><line class="disp" y1="22" y2="22" stroke="#2f5fd0" stroke-width="4"/>
        <circle cx="300" cy="40" r="6" fill="gray"/><circle class="turn" cy="40" r="5" fill="orange"/><circle class="end" cy="40" r="7" fill="#c23b3b"/>
        <text x="300" y="62" text-anchor="middle">start (0 m)</text><text x="52" y="15">← left (−)</text><text x="548" y="15" text-anchor="end">right (+) →</text></svg>
        <div class="out"></div>`;
      const upd = () => {
        const r = +$(w, '.ir').value, l = +$(w, '.il').value, t = withTime ? +$(w, '.it').value : 0, s = r - l, d = r + l;
        $(w, '.r').textContent = r; $(w, '.l').textContent = l; if (withTime) $(w, '.t').textContent = t;
        const X = m => 300 + 5 * m;
        $(w, '.turn').setAttribute('cx', X(r)); $(w, '.end').setAttribute('cx', X(s));
        $(w, '.disp').setAttribute('x1', 300); $(w, '.disp').setAttribute('x2', X(s));
        $(w, '.out').innerHTML = `<div>Distance (scalar)<b>${d} m</b></div><div>Displacement (vector)<b>${s} m ${s > 0 ? 'right' : s < 0 ? 'left' : ''}</b></div>` +
          (withTime ? `<div>Average speed<b>${f(d / t, 2)} m s<sup>−1</sup></b></div><div>Average velocity<b>${f(Math.abs(s) / t, 2)} m s<sup>−1</sup> ${s > 0 ? 'right' : s < 0 ? 'left' : ''}</b></div>` : '');
      };
      w.oninput = upd; upd();
    };
  }

  /* Interactive 2: motion lab with v–t graph */
  function lab(root) {
    const w = $(root, '.lab');
    w.innerHTML = `<h4>Motion lab: constant acceleration (right = +)</h4>
      <label>Initial velocity u: <b class="u">10</b> m s<sup>−1</sup> <input type="range" class="iu" min="-20" max="30" value="10"></label>
      <label>Acceleration a: <b class="a">2</b> m s<sup>−2</sup> <input type="range" class="ia" min="-5" max="5" step="0.5" value="2"></label>
      <label>Time t: <b class="t">5</b> s <input type="range" class="it" min="0" max="10" step="0.5" value="5"></label>
      <svg viewBox="0 0 600 220"><line x1="40" y1="110" x2="580" y2="110" stroke="gray"/><line x1="40" y1="10" x2="40" y2="210" stroke="gray"/>
      <polygon class="area" fill="#2f5fd0" fill-opacity=".25"/><polyline class="vt" fill="none" stroke="#2f5fd0" stroke-width="3"/>
      <text x="575" y="104" text-anchor="end">t (s)</text><text x="46" y="20">v (m s⁻¹)</text></svg>
      <div class="out"></div><p class="mute">The shaded area between the line and the time axis is the displacement s. The slope of the line is the acceleration.</p>`;
    const upd = () => {
      const u = +$(w, '.iu').value, a = +$(w, '.ia').value, t = +$(w, '.it').value, v = u + a * t, s = u * t + 0.5 * a * t * t;
      $(w, '.u').textContent = u; $(w, '.a').textContent = a; $(w, '.t').textContent = t;
      const X = x => 40 + 54 * x, Y = y => 110 - 1.9 * y;
      $(w, '.vt').setAttribute('points', `${X(0)},${Y(u)} ${X(t)},${Y(v)}`);
      $(w, '.area').setAttribute('points', `${X(0)},${Y(0)} ${X(0)},${Y(u)} ${X(t)},${Y(v)} ${X(t)},${Y(0)}`);
      $(w, '.out').innerHTML = `<div>Final velocity v<b>${f(v)} m s<sup>−1</sup></b></div><div>Displacement s<b>${f(s)} m</b></div><div>Motion<b>${a === 0 ? 'constant velocity' : u * a < 0 && Math.abs(v) < Math.abs(u) ? 'slowing down' : v * a < 0 ? 'slowing down' : 'speeding up'}</b></div>`;
    };
    w.oninput = upd; upd();
  }

  /* Interactive 3: which equation? */
  const EQ = [['s', 'v = u + at'], ['v', 's = ut + ½at²'], ['t', 'v² = u² + 2as'], ['a', 's = ½(u + v)t'], ['u', 's = vt − ½at²']];
  function pick(root) {
    const w = $(root, '.pick');
    const names = { u: 'u (initial velocity)', v: 'v (final velocity)', a: 'a (acceleration)', s: 's (displacement)', t: 't (time)' };
    w.innerHTML = '<h4>Which equation should I use?</h4><p>Write down what you know and what you want. Then click the one variable that is <b>neither</b> given <b>nor</b> asked for:</p><div class="btns"></div><div class="eqs"></div>';
    const draw = m => {
      $(w, '.btns').innerHTML = Object.keys(names).map(k => `<button class="${k === m ? 'on' : ''}" data-m="${k}">${names[k]}</button>`).join('');
      $(w, '.eqs').innerHTML = EQ.map(([k, e]) => `<div class="${k === m ? 'hit' : ''}"><span>${e}</span><span class="mute">no ${k}</span></div>`).join('');
    };
    w.onclick = e => { if (e.target.dataset.m) draw(e.target.dataset.m); };
    $(w, '.btns').className = 'btns pick'; draw(null);
  }

  window.TOPICS['1A'] = {
    title: 'Kinematics recap',
    sections: [
      { id: 'vectors', title: 'Vectors and scalars', init: [walk(false)], html: `
        <p>Physics quantities come in two types.</p>
        <div class="key"><b>Scalar:</b> has a size (magnitude) only, e.g. distance, speed, time, mass.<br><b>Vector:</b> has a size <i>and</i> a direction, e.g. displacement, velocity, acceleration, force.</div>
        <p>Vectors are drawn as arrows: the length shows the magnitude and the arrowhead shows the direction. In one dimension we usually pick a direction as positive (commonly right or up), so the opposite direction is negative.</p>
        <h3>Distance vs displacement</h3>
        <p><b>Distance</b> is the total length of the path travelled (scalar). <b>Displacement</b> is the straight-line change in position from start to finish, with direction (vector). Both are measured in metres (m).</p>
        <div class="walk w"></div>
        <div class="warn"><b>Check this:</b> set the two sliders equal. Distance is still large, but displacement is zero. Displacement only cares where you ended up relative to where you started.</div>` },
      { id: 'quantities', title: 'Quantities of motion', init: [walk(true)], html: `
        <h3>Speed and velocity</h3>
        <p>Speed is how fast distance is covered (scalar). Velocity is how fast <i>displacement</i> changes (vector). Both use m s<sup>−1</sup>.</p>
        <div class="key">average speed = distance ÷ time &nbsp; <b>v = d / t</b><br>average velocity = Δs ÷ Δt = (s₂ − s₁) ÷ (t₂ − t₁)</div>
        <p>The Greek letter Δ means "change in": always final minus initial. <b>Instantaneous</b> velocity is the velocity at one moment; <b>average</b> velocity is the constant velocity that would cover the same displacement in the same time.</p>
        <div class="walk w"></div>
        <p>Average speed equals the size of the average velocity only when the direction never changes. Change the sliders to see them separate.</p>
        <p><b>Unit conversion:</b> km h<sup>−1</sup> ÷ 3.6 = m s<sup>−1</sup>, and m s<sup>−1</sup> × 3.6 = km h<sup>−1</sup>.</p>
        <h3>Acceleration</h3>
        <p>Acceleration is the rate of change of velocity (vector), measured in m s<sup>−2</sup>.</p>
        <div class="key"><b>a = Δv / Δt = (v − u) / Δt</b></div>
        <p>Because velocity includes direction, an object moving in a circle at constant speed is still accelerating.</p>
        <div class="warn"><b>Common misconception:</b> "deceleration" and "negative acceleration" are not the same thing. Deceleration means acceleration <i>opposite</i> to the velocity, so the speed drops. A negative acceleration on an object already moving in the negative direction makes it speed up.</div>` },
      { id: 'equations', title: 'Constant acceleration equations', init: [lab, pick], html: `
        <p>When acceleration is constant, five variables are linked: <b>s</b> (displacement), <b>u</b> (initial velocity), <b>v</b> (final velocity), <b>a</b> (acceleration) and <b>t</b> (time). Know any three and you can find the others.</p>
        <div class="lab w"></div>
        <div class="pick w"></div>
        <h3>A reliable method</h3>
        <ol><li>Choose a positive direction and give every vector a sign.</li><li>List the three known values and the one unknown. Write "?" next to the unknown.</li><li>Find the variable that is missing from your list and select the equation that has no such variable.</li><li>Substitute, solve, and state the answer with units and direction.</li></ol>
        <div class="key"><b>Falling or thrown objects:</b> a = g = 9.8 m s<sup>−2</sup> downwards. If up is positive, then a = −9.8 m s<sup>−2</sup>.</div>` }
    ],
    questions: [
      { q: 'Which of these is a vector quantity?', o: ['Speed', 'Mass', 'Displacement', 'Time'], a: 2, s: 'Displacement has a magnitude and a direction. The others are scalars.' },
      { q: 'A runner completes 2 full laps of a 400 m track in 160 s. What is her average speed?', o: ['0 m s<sup>−1</sup>', '2.5 m s<sup>−1</sup>', '5.0 m s<sup>−1</sup>', '10 m s<sup>−1</sup>'], a: 2, s: 'Distance = 2 × 400 = 800 m. v = d/t = 800 / 160 = 5.0 m s<sup>−1</sup>. (Her average <i>velocity</i> is 0, since she finishes where she started.)' },
      { q: 'A car speeds up from 5.0 m s<sup>−1</sup> to 20 m s<sup>−1</sup> in 6.0 s. What is its acceleration?', o: ['0.40 m s<sup>−2</sup>', '2.5 m s<sup>−2</sup>', '3.3 m s<sup>−2</sup>', '4.2 m s<sup>−2</sup>'], a: 1, s: 'a = (v − u)/Δt = (20 − 5.0)/6.0 = 2.5 m s<sup>−2</sup>.' },
      { q: 'A train travels at 72 km h<sup>−1</sup>. What is this in m s<sup>−1</sup>?', o: ['20', '72', '259', '7.2'], a: 0, s: 'Divide by 3.6: 72 / 3.6 = 20 m s<sup>−1</sup>.' },
      { q: 'A cyclist travelling east at 12 m s<sup>−1</sup> brakes to 4.0 m s<sup>−1</sup> in 4.0 s. Taking east as positive, what is the acceleration?', o: ['+2.0 m s<sup>−2</sup>', '−2.0 m s<sup>−2</sup>', '−3.0 m s<sup>−2</sup>', '+4.0 m s<sup>−2</sup>'], a: 1, s: 'a = (4.0 − 12)/4.0 = −2.0 m s<sup>−2</sup>. It is negative because it points west, opposite to the motion, so the cyclist is decelerating.' },
      { q: 'A scooter starts from rest and accelerates uniformly at 3.0 m s<sup>−2</sup> for 4.0 s. How far does it travel?', o: ['12 m', '24 m', '36 m', '48 m'], a: 1, s: 'Known: u = 0, a = 3.0, t = 4.0, find s. No v needed, so use s = ut + ½at² = 0 + ½(3.0)(4.0)² = 24 m.' },
      { q: 'A car travelling at 20 m s<sup>−1</sup> brakes uniformly and stops in 40 m. What is its acceleration (direction of travel positive)?', o: ['−2.5 m s<sup>−2</sup>', '−4.0 m s<sup>−2</sup>', '−5.0 m s<sup>−2</sup>', '−10 m s<sup>−2</sup>'], a: 2, s: 'Known: u = 20, v = 0, s = 40, find a. No t, so use v² = u² + 2as: 0 = 400 + 2a(40), so a = −400/80 = −5.0 m s<sup>−2</sup>.' },
      { q: 'A ball is thrown straight up at 15 m s<sup>−1</sup>. Using g = 9.8 m s<sup>−2</sup>, how long does it take to reach its highest point?', o: ['0.65 s', '1.5 s', '3.1 s', '15 s'], a: 1, s: 'At the top, v = 0. Taking up as positive, a = −9.8. Use v = u + at: 0 = 15 − 9.8t, so t = 15/9.8 = 1.5 s.' }
    ]
  };
})();
