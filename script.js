/* ── UTILS ── */
function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function escQ(s) { return String(s).replace(/\\/g,'\\\\').replace(/'/g,"\\'"); }

/* ── GITHUB ── */
var GH_USER = 'Kaelinkes';
var GH_API  = 'https://api.github.com';
var PROXY   = 'https://corsproxy.io/?url=';
function ghFetch(path) {
  var url = GH_API + path;
  return fetch(url).then(function(r){ if(!r.ok) throw 0; return r; })
    .catch(function(){ return fetch(PROXY + encodeURIComponent(url)); });
}

/* ── THEME TOGGLE ── */
function toggleTheme(checkbox) {
  var isDark = checkbox.checked;
  document.body.classList.toggle('light', !isDark);
  localStorage.setItem('kk-theme-manual', isDark ? 'dark' : 'light');
}
(function(){
  var manual = localStorage.getItem('kk-theme-manual');
  var systemLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  var useLight = manual ? manual === 'light' : systemLight;
  if (useLight) {
    document.body.classList.add('light');
    var cb = document.getElementById('theme-checkbox');
    if (cb) cb.checked = false;
  } else {
    var cb = document.getElementById('theme-checkbox');
    if (cb) cb.checked = true;
  }
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function(e) {
    if (!localStorage.getItem('kk-theme-manual')) {
      document.body.classList.toggle('light', e.matches);
      var cb = document.getElementById('theme-checkbox');
      if (cb) cb.checked = !e.matches;
    }
  });
})();

/* ── PARTICLES ── */
function initParticles(canvasIds) {
  var NUM = 70;
  function isLight() { return document.body.classList.contains('light'); }
  function initCanvas(canvas) {
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var particles = [];
    function resize() { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }
    function rp() {
      return {
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        r: Math.random() * 2.2 + 0.6,
        dx: (Math.random() - 0.5) * 0.35, dy: -(Math.random() * 0.45 + 0.15),
        alpha: Math.random() * 0.55 + 0.25, dalpha: (Math.random() - 0.5) * 0.004
      };
    }
    for (var i = 0; i < NUM; i++) particles.push(rp());
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var color = isLight() ? '150,150,150' : '201,168,76';
      particles.forEach(function(p) {
        p.x += p.dx; p.y += p.dy; p.alpha += p.dalpha;
        if (p.alpha <= 0.08) p.dalpha = Math.abs(p.dalpha);
        if (p.alpha >= 0.75) p.dalpha = -Math.abs(p.dalpha);
        if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width; }
        if (p.x < -5) p.x = canvas.width + 5;
        if (p.x > canvas.width + 5) p.x = -5;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + color + ',' + p.alpha + ')'; ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    resize(); window.addEventListener('resize', resize); draw();
  }
  canvasIds.forEach(function(id) { initCanvas(document.getElementById(id)); });
}

/* ── LANG COLOURS ── */
var LC={Python:'#3572A5',JavaScript:'#f1e05a',HTML:'#e34c26',CSS:'#563d7c',Java:'#b07219','C++':'#f34b7d','C#':'#178600',TypeScript:'#2b7489',Shell:'#89e051',Ruby:'#701516',Go:'#00ADD8',Rust:'#dea584',Swift:'#ffac45',Kotlin:'#F18E33',PHP:'#4F5D95',Delphi:'#EE1F35'};
function lc(l){ return LC[l]||'#666'; }
function ldot(l){ return '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:'+lc(l)+';margin-right:5px;flex-shrink:0"></span>'; }
