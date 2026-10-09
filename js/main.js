(function () {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const compact = window.matchMedia('(max-width: 900px)');
  const pointerDevice = window.matchMedia('(hover: hover) and (pointer: fine)');
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    if (id === '#') return;
    const target = document.getElementById(id.slice(1));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: motion.matches ? 'auto' : 'smooth', block: 'start' });
  });

  const canvas = document.getElementById('parakeet-bird');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  // Draw at twice the display resolution to keep the feather details crisp.
  ctx.scale(2, 2);
  let x, y, tx, ty, previous = 0, lastMove = -Infinity;
  let facing = 1, bank = 0, flight = 0, phase = 0;

  function perch() {
    const branch = document.querySelector('.parakeet-branch');
    if (!branch) return { x: 150, y: 70 };
    const b = branch.getBoundingClientRect();
    return { x: b.left + b.width * .68, y: b.top + b.height * .6 };
  }
  function ellipse(cx, cy, rx, ry, color, rotation = 0) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, rotation, 0, Math.PI * 2);
    ctx.fill();
  }
  function shape(path, color) {
    ctx.fillStyle = color;
    ctx.fill(new Path2D(path));
  }
  function wing(angle, far) {
    ctx.save();
    ctx.translate(55, 49);
    ctx.rotate(angle);
    shape('M 0 0 C -8 -15 -28 -26 -44 -23 C -41 -12 -25 5 -6 9 Z', far ? '#43834e' : '#85b95b');
    ctx.strokeStyle = far ? '#315b40' : '#365a3e';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(-8 - i * 5, -7 - i * 2);
      ctx.quadraticCurveTo(-14 - i * 5, -3 - i * 2, -11 - i * 5, 4 - i * 3);
      ctx.stroke();
    }
    ctx.restore();
  }
  function draw() {
    ctx.clearRect(0, 0, 120, 100);
    ctx.save();
    ctx.translate(60, 52);
    ctx.rotate(bank);
    ctx.scale(facing, 1);
    ctx.translate(-60, -52);
    const beat = Math.sin(phase);
    if (flight > .05) wing((-.9 + beat * 1.05) * flight, true);
    // Long, tapered blue-green tail feathers are a budgie's distinctive silhouette.
    ctx.save();
    ctx.translate(49, 60);
    ctx.rotate(beat * .07 * flight);
    shape('M 0 -3 Q -14 10 -32 32 Q -17 29 7 3 Z', '#277f78');
    shape('M 2 -2 Q -7 15 -22 34 Q -9 27 8 2 Z', '#4ba59a');
    ctx.restore();
    ellipse(59, 51, 17, 23, '#80bf45', -.35);
    ellipse(66, 52, 10, 18, '#a8d956', -.25);
    ellipse(74, 32, 15, 16, '#f6df65', -.2);
    shape('M 61 23 Q 61 37 67 42 Q 55 39 57 30 Z', '#a5cc52');
    // Fine nape stripes, violet cheek patch, and black throat spots.
    ctx.strokeStyle = '#607442';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(63 + i * 2, 20 + i * 3);
      ctx.quadraticCurveTo(59 + i * 2, 23 + i * 3, 61 + i * 2, 27 + i * 3);
      ctx.stroke();
    }
    ellipse(77, 40, 3, 4, '#6684c6', -.4);
    ellipse(73, 45, 1.5, 2, '#334a3d');
    ellipse(68, 44, 1.3, 1.8, '#334a3d');
    ellipse(82, 29, 3.2, 3.5, '#283d35');
    ellipse(83, 28, 1, 1.1, '#fffdf0');
    ellipse(87, 33, 3, 2, '#80a9cf');
    shape('M 87 34 Q 98 33 90 43 L 89 38 L 86 37 Z', '#d8a054');
    if (flight > .05) {
      wing((-.65 + beat * 1.25) * flight, false);
    } else {
      ellipse(52, 51, 9, 17, '#64964b', -.5);
      ctx.strokeStyle = '#304f39';
      ctx.lineWidth = 2;
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(46 + i * 2, 40 + i * 5);
        ctx.quadraticCurveTo(53 + i * 2, 43 + i * 5, 49 + i * 2, 47 + i * 5);
        ctx.stroke();
      }
    }
    ctx.strokeStyle = '#d6ae97';
    ctx.lineWidth = 1.8;
    ctx.lineCap = 'round';
    const tuck = flight * 7;
    [58, 66].forEach(foot => {
      ctx.beginPath();
      ctx.moveTo(foot, 69 - tuck);
      ctx.lineTo(foot - 1, 76 - tuck);
      ctx.lineTo(foot + 4, 76 - tuck);
      ctx.moveTo(foot - 1, 76 - tuck);
      ctx.lineTo(foot - 4, 77 - tuck);
      ctx.stroke();
    });
    ctx.restore();
  }

  window.addEventListener('pointermove', e => {
    if (motion.matches || compact.matches || !pointerDevice.matches || e.pointerType === 'touch') return;
    lastMove = performance.now();
    tx = Math.max(60, Math.min(innerWidth - 60, e.clientX - facing * 36));
    ty = Math.max(80, Math.min(innerHeight - 24, e.clientY - 22));
  }, { passive: true });
  document.addEventListener('pointerleave', () => { lastMove = -Infinity; });

  function frame(now) {
    const dt = Math.min((now - previous) / 1000 || 1 / 60, .05);
    previous = now;
    const idle = compact.matches || !pointerDevice.matches || now - lastMove > 2200 || motion.matches;
    if (idle) { const p = perch(); tx = p.x; ty = p.y; }
    const dx = tx - x, dy = ty - y;
    const distance = Math.hypot(dx, dy);
    const moving = !motion.matches && distance > 2;
    const blend = 1 - Math.exp(-dt * 5);
    const vx = dx * blend, vy = dy * blend;
    x += vx; y += vy;
    if (motion.matches) { x = tx; y = ty; }
    if (Math.abs(dx) > 8) facing = dx > 0 ? 1 : -1;
    const targetBank = moving ? Math.max(-.3, Math.min(.3, vy / (Math.abs(vx) + 6))) * facing : 0;
    bank += (targetBank - bank) * (1 - Math.exp(-dt * 8));
    flight += ((moving ? 1 : 0) - flight) * (1 - Math.exp(-dt * 10));
    if (motion.matches) { flight = 0; bank = 0; }
    phase += dt * (distance > 90 ? 22 : 16);
    const scale = compact.matches ? .72 : 1;
    const bob = moving ? Math.sin(phase) * 1.4 * flight : 0;
    canvas.style.transform = `translate3d(${x - 60 * scale}px, ${y - 76 * scale + bob}px, 0) scale(${scale})`;
    draw();
    requestAnimationFrame(frame);
  }
  const p = perch();
  x = tx = p.x; y = ty = p.y;
  requestAnimationFrame(frame);
})();
