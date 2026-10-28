(function () {
  const T = window.TOPICS || {};
  const ALL = [['1A','Kinematics recap'],['1B','Forces recap'],['1C','Inclined planes'],['1D','Connected bodies'],['1E','Basic circular motion'],['1F','Banked circular motion'],['1G','Vertical circular motion'],['1H','Projectile motion'],['1I','Momentum and impulse']];
  const nav = document.getElementById('nav'), main = document.getElementById('main');
  let S = {}; try { S = JSON.parse(localStorage.getItem('vcep') || '{}'); } catch (e) {}
  S.seen = S.seen || {}; S.ans = S.ans || {};
  const save = () => { try { localStorage.setItem('vcep', JSON.stringify(S)); } catch (e) {} };

  function route() {
    const [id, sec] = (location.hash.slice(1) || 'home').split('/');
    T[id] ? topic(id, sec) : home();
    window.scrollTo(0, 0);
  }

  function home() {
    document.title = 'VCE Physics 3&4'; nav.innerHTML = '';
    main.innerHTML = '<h1>VCE Physics Units 3 &amp; 4</h1><p class="mute">Unit 3 · Area of Study 1 · Chapter 1: Force and motion</p><div class="cards">' +
      ALL.map(([id, n]) => T[id]
        ? `<a class="live" href="#${id}"><b>${id}</b> ${n}<br><small>${pct(id)}% complete</small></a>`
        : `<a class="soon"><b>${id}</b> ${n}<br><small>Coming soon</small></a>`).join('') + '</div>';
  }

  const items = id => [...T[id].sections, { id: 'quiz', title: 'Progress questions' }];
  function pct(id) {
    const it = items(id); return Math.round(100 * it.filter(i => S.seen[id + '/' + i.id]).length / it.length);
  }

  function topic(id, sec) {
    const t = T[id], it = items(id);
    let i = it.findIndex(x => x.id === sec); if (i < 0) i = 0;
    const cur = it[i]; S.seen[id + '/' + cur.id] = cur.id === 'quiz' ? S.seen[id + '/quiz'] : 1; save();
    document.title = `${id} ${t.title} · VCE Physics`;
    main.innerHTML = `<h2>${cur.title}</h2><div id="body"></div><div class="pager">` +
      (i > 0 ? `<a href="#${id}/${it[i - 1].id}">← ${it[i - 1].title}</a>` : '<a class="off">.</a>') +
      (i < it.length - 1 ? `<a href="#${id}/${it[i + 1].id}">${it[i + 1].title} →</a>` : '<a href="#home">Finish ✓</a>') + '</div>';
    const body = document.getElementById('body');
    if (cur.id === 'quiz') quiz(id, t, body);
    else { body.innerHTML = cur.html; (cur.init || []).forEach(f => f(body)); steps(body); }
    nav.innerHTML = `<a class="back" href="#home">← All topics</a><h3>${id} ${t.title}</h3><div class="bar"><i style="width:${pct(id)}%"></i></div>` +
      it.map((x, n) => `<a href="#${id}/${x.id}" class="${n === i ? 'on' : ''}"><span class="tick">${S.seen[id + '/' + x.id] ? '✓' : ''}</span>${x.title}</a>`).join('');
  }

  function steps(root) {
    root.querySelectorAll('.steps').forEach(el => {
      const li = [...el.querySelectorAll('li')], btn = el.querySelector('button'); let n = 1;
      li.forEach((x, i) => x.classList.toggle('hid', i >= n));
      btn.onclick = () => { li[n++].classList.remove('hid'); if (n >= li.length) btn.remove(); };
    });
  }

  function quiz(id, t, box) {
    const ok = (q, a) => q.n !== undefined ? Math.abs(a - q.n) <= q.t : a === q.a;
    const draw = () => {
      let n = 0, c = 0;
      box.innerHTML = '<p class="mute">Answer each question to see the worked solution. Wrong answers can be retried at the end. Progress is saved on this device.</p>' +
        t.questions.map((q, i) => {
          const k = id + i, a = S.ans[k], d = a != null; if (d) { n++; if (ok(q, a)) c++; }
          const num = q.n !== undefined;
          const body = num
            ? (d ? `<p>Your answer: <b>${a}</b> ${q.u || ''}</p>` : `<p><input class="num" type="number" step="any" id="n${i}" placeholder="Answer"> ${q.u || ''} <button class="ghost" data-chk="${k}" data-i="${i}">Check</button></p>`)
            : q.o.map((o, j) => `<button class="opt ${!d ? '' : j === q.a ? 'ok' : j === a ? 'bad' : ''}" data-k="${k}" data-j="${j}" ${d ? 'disabled' : ''}>${'ABCD'[j]}. ${o}</button>`).join('');
          return `<div class="q"><b>Question ${i + 1}</b> <span class="tag">${num ? 'Numerical' : 'Multiple choice'}</span><br>${q.q}${body}` +
            (q.h && !d ? `<details><summary>Need a hint?</summary><p class="hint">${q.h}</p></details>` : '') +
            (d ? `<div class="sol ${ok(q, a) ? 'g' : 'r'}"><b>${ok(q, a) ? 'Correct.' : 'Not quite.'}</b> ${q.s}</div>` : '') + '</div>';
        }).join('') + `<p><b>Score: ${c}/${t.questions.length}</b> (${n} answered)</p>` +
        (n > c ? '<button class="ghost" id="retry">Retry the ones I got wrong</button> ' : '') + '<button class="ghost" id="reset">Reset all</button>';
      if (n === t.questions.length) S.seen[id + '/quiz'] = 1; else delete S.seen[id + '/quiz'];
      save();
    };
    box.onclick = e => {
      const el = e.target, wipe = f => t.questions.forEach((q, i) => { if (f(q, S.ans[id + i])) delete S.ans[id + i]; });
      if (el.classList.contains('opt')) S.ans[el.dataset.k] = +el.dataset.j;
      else if (el.dataset.chk) { const v = parseFloat(document.getElementById('n' + el.dataset.i).value); if (isNaN(v)) return; S.ans[el.dataset.chk] = v; }
      else if (el.id === 'retry') wipe((q, a) => a != null && !ok(q, a));
      else if (el.id === 'reset') wipe(() => true);
      else return;
      save(); topic(id, 'quiz');
    };
    draw();
  }
  window.addEventListener('hashchange', route); route();
})();
