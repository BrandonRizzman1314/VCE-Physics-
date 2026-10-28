(function () {
  window.TOPICS = window.TOPICS || {};
  const $ = (r, s) => r.querySelector(s), f = (x, d = 1) => (+x).toFixed(d);
  const ex = (t, i) => `<div class="steps"><h4>Worked example: ${t}</h4><ol>${i.map(x => `<li>${x}</li>`).join('')}</ol><button class="ghost">Show next step</button></div>`;
  const arrow = (x1, y1, x2, y2, c, d) => {
    if (Math.hypot(x2 - x1, y2 - y1) < 3) return '';
    const a = Math.atan2(y2 - y1, x2 - x1), h = 11;
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="3"${d ? ' stroke-dasharray="6 4"' : ''}/><polygon fill="${c}" points="${x2},${y2} ${x2 - h * Math.cos(a - .4)},${y2 - h * Math.sin(a - .4)} ${x2 - h * Math.cos(a + .4)},${y2 - h * Math.sin(a + .4)}"/>`;
  };

  /* Interactive 1: resolve a force into components */
  function resolver(root) {
    const w = $(root, '.res');
    w.innerHTML = `<h4>Resolve a force into components</h4>
      <label>Force F: <b class="F">50</b> N <input type="range" class="iF" min="10" max="100" value="50"></label>
      <label>Angle θ above the horizontal: <b class="th">30</b>° <input type="range" class="ith" min="0" max="90" value="30"></label>
      <svg viewBox="0 0 600 290"></svg><div class="out"></div>`;
    const upd = () => {
      const F = +$(w, '.iF').value, th = +$(w, '.ith').value, r = th * Math.PI / 180, ox = 60, oy = 270, x = ox + 2.6 * F * Math.cos(r), y = oy - 2.6 * F * Math.sin(r);
      $(w, '.F').textContent = F; $(w, '.th').textContent = th;
      $(w, 'svg').innerHTML = `<line x1="${ox}" y1="${oy}" x2="580" y2="${oy}" stroke="gray" stroke-dasharray="2 4"/>` + arrow(ox, oy, x, oy, '#e08a1e', 1) + arrow(x, oy, x, y, '#1f8a4c', 1) + arrow(ox, oy, x, y, '#2f5fd0') +
        `<text x="${(ox + x) / 2}" y="${oy + 16}" text-anchor="middle">Fx</text><text x="${x + 8}" y="${(oy + y) / 2}">Fy</text><text x="${ox + 34}" y="${oy - 8}">θ</text>`;
      $(w, '.out').innerHTML = `<div>Fx = F cos θ<b>${f(F * Math.cos(r))} N</b></div><div>Fy = F sin θ<b>${f(F * Math.sin(r))} N</b></div>`;
    };
    w.oninput = upd; upd();
  }

  /* Interactive 2: net force lab */
  function netlab(root) {
    const w = $(root, '.net');
    w.innerHTML = `<h4>Net force lab (right is positive)</h4>
      <label>Applied force (right): <b class="a">60</b> N <input type="range" class="ia" min="0" max="100" value="60"></label>
      <label>Friction (left): <b class="b">20</b> N <input type="range" class="ib" min="0" max="100" value="20"></label>
      <label>Mass m: <b class="m">5</b> kg <input type="range" class="im" min="1" max="20" value="5"></label>
      <svg viewBox="0 0 600 150"><rect x="270" y="70" width="60" height="60" rx="6" fill="#8895a8" fill-opacity=".5" stroke="gray"/><g class="ar"></g></svg>
      <div class="out"></div><p class="mute st"></p>`;
    const upd = () => {
      const A = +$(w, '.ia').value, B = +$(w, '.ib').value, m = +$(w, '.im').value, n = A - B, a = n / m;
      $(w, '.a').textContent = A; $(w, '.b').textContent = B; $(w, '.m').textContent = m;
      $(w, '.ar').innerHTML = arrow(330, 100, 330 + 2.5 * A, 100, '#2f5fd0') + arrow(270, 100, 270 - 2.5 * B, 100, '#c23b3b') + '<text x="590" y="60" text-anchor="end">applied (blue)</text><text x="10" y="60">friction (red)</text>';
      const dir = x => x > 0 ? 'right' : x < 0 ? 'left' : '';
      $(w, '.out').innerHTML = `<div>Net force<b>${Math.abs(n)} N ${dir(n)}</b></div><div>Acceleration a = F<sub>net</sub>/m<b>${f(Math.abs(a), 2)} m s<sup>−2</sup> ${dir(a)}</b></div>`;
      $(w, '.st').textContent = n === 0 ? 'Net force is zero: the box stays at rest or keeps moving at constant velocity (Newton’s first law).' : 'Net force is not zero: the box accelerates in the direction of the net force (Newton’s second law). Try a bigger mass and watch a shrink.';
    };
    w.oninput = upd; upd();
  }

  /* Interactive 3: free-body diagram scenarios */
  const SC = [
    ['Book at rest on a table', [['Normal N', 'u', 2], ['Weight W = mg', 'd', 2]], 'Net force is zero (N = W), so the book stays at rest.'],
    ['Box pushed at constant velocity', [['Normal N', 'u', 2], ['Weight W', 'd', 2], ['Push', 'r', 2], ['Friction', 'l', 2]], 'Forces balance both vertically and horizontally, so the velocity is constant.'],
    ['Box speeding up', [['Normal N', 'u', 2], ['Weight W', 'd', 2], ['Push', 'r', 3], ['Friction', 'l', 1.5]], 'Vertical forces balance. Horizontally the push is bigger than friction, so the net force (and acceleration) points right.'],
    ['Mass hanging from a rope', [['Tension T', 'u', 2], ['Weight W = mg', 'd', 2]], 'At rest (or constant velocity) T = mg. The rope only pulls; it can never push.']
  ];
  function fbd(root) {
    const w = $(root, '.fbd');
    w.innerHTML = '<h4>Free-body diagrams: choose a situation</h4><div class="btns pick"></div><svg viewBox="0 0 600 300"></svg><p class="key st"></p>';
    const draw = k => {
      $(w, '.btns').innerHTML = SC.map((s, i) => `<button class="${i === k ? 'on' : ''}" data-k="${i}">${s[0]}</button>`).join('');
      const col = { u: '#1f8a4c', d: '#c23b3b', r: '#2f5fd0', l: '#e08a1e' };
      $(w, 'svg').innerHTML = '<rect x="260" y="120" width="80" height="60" rx="6" fill="#8895a8" fill-opacity=".5" stroke="gray"/>' + SC[k][1].map(([n, d, u]) => {
        const L = (d === 'u' || d === 'd' ? 45 : 60) * u;
        const [x1, y1, x2, y2, tx, ty, an] = d === 'u' ? [300, 120, 300, 120 - L, 310, 120 - L + 4, 'start'] : d === 'd' ? [300, 180, 300, 180 + L, 310, 180 + L, 'start'] : d === 'r' ? [340, 150, 340 + L, 150, 340 + L, 138, 'end'] : [260, 150, 260 - L, 150, 260 - L, 138, 'start'];
        return arrow(x1, y1, x2, y2, col[d]) + `<text x="${tx}" y="${ty}" text-anchor="${an}">${n}</text>`;
      }).join('');
      $(w, '.st').textContent = SC[k][2];
    };
    w.onclick = e => { if (e.target.dataset.k) draw(+e.target.dataset.k); };
    draw(0);
  }

  window.TOPICS['1B'] = {
    title: 'Forces recap',
    sections: [
      { id: 'vectors', title: 'Force vectors', init: [resolver], html: `
        <p>A <b>force</b> is a push or a pull. It is a vector, so it has a magnitude and a direction. The SI unit is the newton (N), where 1 N = 1 kg m s<sup>−2</sup>.</p>
        <h3>Adding forces in one dimension</h3>
        <p>Choose a positive direction, give each force a sign, then add. Example: 20 N right and 35 N left, with right positive, gives (+20) + (−35) = −15 N, which is <b>15 N to the left</b>.</p>
        <h3>Forces at an angle</h3>
        <p>To handle a force at an angle, <b>resolve</b> it into two perpendicular components.</p>
        <div class="key"><b>F<sub>x</sub> = F cos θ</b> &nbsp; and &nbsp; <b>F<sub>y</sub> = F sin θ</b> &nbsp; (θ measured from the horizontal)</div>
        <div class="res w"></div>
        <p>Notice that as θ grows, F<sub>x</sub> shrinks and F<sub>y</sub> grows. At 0° the whole force is horizontal; at 90° it is all vertical.</p>
        <div class="key"><b>To add 2D forces:</b> (1) resolve each into x and y components; (2) add all x components and all y components separately; (3) combine the totals with Pythagoras, F = √(Fx² + Fy²), and find the angle with tan θ = Fy / Fx.</div>
        <p>You can also add vectors graphically by placing them <b>tip to tail</b>. The resultant runs from the tail of the first to the tip of the last.</p>` +
        ex('adding perpendicular forces', ['<b>Situation:</b> two people push a crate. One pushes 30 N east, the other 40 N north. Find the total force.', '<b>The components are already perpendicular:</b> Fx = 30 N, Fy = 40 N.', '<b>Magnitude:</b> F = √(30² + 40²) = √2500 = <b>50 N</b>.', '<b>Direction:</b> θ = tan<sup>−1</sup>(40/30) = 53°, so the total force is <b>50 N at 53° north of east</b>.']) },
      { id: 'newton', title: 'Net force and Newton’s laws', init: [netlab], html: `
        <p>The <b>net force</b> (F<sub>net</sub>) is the vector sum of all the forces acting on an object. Newton’s three laws describe what the net force does.</p>
        <div class="key"><b>First law:</b> if F<sub>net</sub> = 0, an object at rest stays at rest and a moving object keeps a constant velocity.<br><b>Second law:</b> F<sub>net</sub> = ma, so a = F<sub>net</sub> / m. The acceleration points the same way as the net force.<br><b>Third law:</b> if A exerts a force on B, then B exerts an equal and opposite force on A.</div>
        <div class="net w"></div>
        <div class="warn"><b>Common mistake with the third law:</b> the two forces in a pair act on <i>different</i> objects, so they never cancel each other out. A book on a table is pulled down by gravity from the Earth; the other half of that pair is the book’s gravitational pull on the Earth, not the table’s normal force.</div>
        <div class="warn"><b>Common mistake with the first law:</b> an object moving at constant velocity does not need a net force. Zero net force means zero <i>acceleration</i>, not zero motion.</div>` +
        ex('accelerating car', ['<b>Situation:</b> a 1200 kg car has a forward engine force of 3000 N. Resistive forces total 900 N. Find the acceleration.', '<b>Net force</b> (forward positive): 3000 − 900 = <b>2100 N</b> forward.', '<b>Newton’s second law:</b> a = F<sub>net</sub>/m = 2100 / 1200.', '<b>Answer:</b> <b>a = 1.75 m s<sup>−2</sup> forward</b>.']) },
      { id: 'common', title: 'Common forces', init: [fbd], html: `
        <div class="key"><b>Weight (W = mg):</b> the gravitational force on an object, pointing down. Near Earth’s surface g = 9.8 N kg<sup>−1</sup>.<br><b>Normal force (N):</b> the contact force from a surface, acting <i>perpendicular</i> to that surface.<br><b>Tension (T):</b> a pulling force transmitted through a rope or string.<br><b>Friction (f):</b> a contact force along the surface that opposes relative motion (or attempted motion).</div>
        <div class="warn"><b>Mass vs weight:</b> mass (kg) is the amount of matter and does not change. Weight (N) is a force and depends on g. A 60 kg person has the same mass on the Moon but a much smaller weight.</div>
        <p>A <b>free-body diagram</b> shows only the forces acting <i>on</i> one object, drawn as arrows from that object, with longer arrows for larger forces. Work through the situations below and compare the lengths of the arrows.</p>
        <div class="fbd w"></div>
        <p>The normal force is <i>not</i> always equal to the weight. It depends on what else is happening, as the next example shows.</p>` +
        ex('normal force in a lift', ['<b>Situation:</b> a 60 kg person stands in a lift accelerating upward at 1.5 m s<sup>−2</sup>. Find the normal force from the floor. Take up as positive.', '<b>Forces on the person:</b> N upward, W = mg = (60)(9.8) = 588 N downward.', '<b>Second law:</b> F<sub>net</sub> = N − mg = ma.', '<b>Solve:</b> N = m(g + a) = 60(9.8 + 1.5) = <b>678 N upward</b>. The floor pushes harder than the person’s weight, which is why they feel heavier.']) }
    ],
    questions: [
      { q: 'Which of these is equivalent to one newton?', o: ['kg m s<sup>−1</sup>', 'kg m s<sup>−2</sup>', 'kg m<sup>2</sup> s<sup>−2</sup>', 'kg s<sup>−2</sup>'], a: 1, s: 'From F = ma, the unit is kg × m s<sup>−2</sup>.' },
      { q: 'A block is acted on by 12 N to the right and 5 N to the left. What is the net force?', o: ['17 N right', '7 N right', '7 N left', '0 N'], a: 1, s: 'Right positive: (+12) + (−5) = +7 N, which is 7 N to the right.' },
      { q: 'A car travels at a constant 20 m s<sup>−1</sup> along a straight road. The engine provides a forward force of 800 N. What is the total resistive force on the car?', o: ['0 N', '800 N backwards', '800 N forwards', 'More than 800 N backwards'], a: 1, h: 'Constant velocity means what about the net force?', s: 'Constant velocity means zero acceleration, so the net force is zero (Newton’s first law). The resistive force must be 800 N backwards to cancel the engine force.' },
      { q: 'A book rests on a table. Which force is the Newton’s third law pair of the Earth’s gravitational pull on the book?', o: ['The normal force of the table on the book', 'The gravitational pull of the book on the Earth', 'The normal force of the book on the table', 'The book’s weight'], a: 1, s: 'A third-law pair acts on different objects and is the same type of force. The Earth pulls the book, so the pair is the book pulling the Earth. The normal force is a different type of force.' },
      { q: 'A person stands in a lift that is accelerating upward. How does the normal force from the floor compare to the person’s weight?', o: ['Smaller than the weight', 'Equal to the weight', 'Greater than the weight', 'Zero'], a: 2, s: 'The net force must point upward, so N − mg > 0 and N is greater than mg.' },
      { q: 'A 5.0 kg object has a net force of 20 N acting on it. What is its acceleration?', n: 4, t: 0.05, u: 'm s<sup>−2</sup>', h: 'Use F<sub>net</sub> = ma.', s: 'a = F<sub>net</sub>/m = 20 / 5.0 = 4.0 m s<sup>−2</sup>.' },
      { q: 'What is the weight of a 60 kg person? Use g = 9.8 N kg<sup>−1</sup>.', n: 588, t: 2, u: 'N', h: 'Weight is a force: W = mg.', s: 'W = mg = (60)(9.8) = 588 N (about 5.9 × 10² N).' },
      { q: 'A force of 50 N acts at 30° above the horizontal. What is the size of its horizontal component?', n: 43.3, t: 0.3, u: 'N', h: 'θ is measured from the horizontal, so use cosine.', s: 'F<sub>x</sub> = F cos θ = 50 cos 30° = 43.3 N.' },
      { q: 'Exam-style: a 4.0 kg object has two forces acting on it: 30 N east and 40 N north. What is the magnitude of its acceleration?', n: 12.5, t: 0.5, u: 'm s<sup>−2</sup>', h: 'Find the net force with Pythagoras first, then use F<sub>net</sub> = ma.', s: 'F<sub>net</sub> = √(30² + 40²) = 50 N. a = 50 / 4.0 = 12.5 ≈ 13 m s<sup>−2</sup>, directed 53° north of east.' }
    ]
  };
})();
