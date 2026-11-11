// 上の帯・下の帯と、data.js の表から画面を作る処理（架空の制作見本）
const LOGO = `<svg class="logo-mark" viewBox="0 0 44 40" aria-hidden="true">
  <path d="M6 15 C14 9 22 9 30 15 S40 19 40 13" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M4 23 C14 17 24 17 32 23 S41 27 41 21" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M8 31 C16 25 24 25 30 31" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
</svg>`;
const NAME = "医療法人社団 そよかぜ会";

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function renderHeader() {
  const el = document.getElementById("site-header");
  if (!el) return;
  const home = document.body.classList.contains("home");
  el.innerHTML = `
  <header class="header" id="header">
    <a class="logo" href="index.html">${LOGO}<span>${NAME}</span></a>
    <nav class="gnav" id="gnav" aria-label="メインメニュー">
      <a href="page.html?p=greeting">そよかぜ会とは</a>
      <a href="page.html?p=homecare">診療をご希望の方へ</a>
      <a href="page.html?p=clinics">クリニックのご案内</a>
      <a href="page.html?p=hospital">医療・介護関係者の方へ</a>
      <a class="nav-entry" href="page.html?p=doctor">採用情報</a>
      <a class="nav-contact" href="page.html?p=contact-care">お問い合わせ</a>
    </nav>
    <button class="menu-btn" aria-label="メニューを開く" aria-expanded="false" aria-controls="gnav"><span></span><span></span><span></span></button>
  </header>`;
  const header = el.querySelector(".header");
  const btn = el.querySelector(".menu-btn");
  const setSolid = () => header.classList.toggle("solid", !home || window.scrollY > 40);
  setSolid();
  window.addEventListener("scroll", setSolid, { passive: true });
  btn.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    btn.setAttribute("aria-expanded", open);
    btn.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
  });
  el.querySelectorAll(".gnav a").forEach(a => a.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
    btn.setAttribute("aria-expanded", "false");
  }));
}

function renderFooter() {
  const el = document.getElementById("site-footer");
  if (!el) return;
  const pg = id => `page.html?p=${id}`;
  const col = g => `<div>
    <p class="f-head"><a href="${pg(GROUPS[g].pages[0])}">${esc(GROUPS[g].name)}</a></p>
    <ul class="f-sub">${GROUPS[g].pages.map(id => `<li><a href="${pg(id)}">- ${esc(PAGES[id].nav)}</a></li>`).join("")}</ul>
  </div>`;
  const clinicCol = `<div>
    <p class="f-head"><a href="${pg("clinics")}">クリニックのご案内</a></p>
    <ul class="f-sub">${CLINICS.map(c => `<li><a href="clinic.html?id=${c.id}">- ${esc(c.name.replace("そよかぜ在宅クリニック", ""))}</a></li>`).join("")}</ul>
  </div>`;
  el.innerHTML = `
  <footer class="footer">
    <div class="footer-links">
      <div>${col("about")}${col("info")}</div>
      ${col("patients")}
      ${clinicCol}
      <div>${col("partners")}${col("recruit")}${col("contact")}</div>
    </div>
    <p class="f-catch">いつもの家で、いつもの毎日を。</p>
    <a class="logo f-logo" href="index.html">${LOGO}<span>${NAME}</span></a>
    <p class="f-address">〒000-0000 架空県なかまち市そよかぜ町1-1（本部）</p>
    <p class="copyright">© SOYOKAZE HOME CARE（架空の制作見本）</p>
  </footer>`;
}

function fillPhotos(root = document) {
  root.querySelectorAll("[data-ph]").forEach(el => { el.innerHTML = ph(el.dataset.ph); });
}

function tagClass(t) { return t === "採用" || t === "開院" ? "tag red" : t === "お知らせ" ? "tag dark" : "tag blue"; }

function renderNews() {
  const ul = document.getElementById("news-list");
  if (!ul) return;
  ul.innerHTML = NEWS.map(n => `<li><time>${esc(n.date)}</time><span class="${tagClass(n.tag)}">${esc(n.tag)}</span><a href="page.html?p=news#${n.id}">${esc(n.title)}</a></li>`).join("");
}

function renderAbout() {
  const ul = document.getElementById("about-cards");
  if (!ul) return;
  ul.innerHTML = ABOUT_CARDS.map(c => `<li><a href="${c.href || "#about"}">
    <div class="thumb">${ph(c.photo)}</div><span class="label">${esc(c.label)}</span></a></li>`).join("");
}

function renderDirectors() {
  const ul = document.getElementById("directors");
  if (!ul) return;
  ul.innerHTML = DIRECTORS.map(d => `<li>
    <span class="d-photo">${ph(d.photo)}</span>
    <div><p class="d-clinic">${esc(d.clinic)}</p><p class="d-name"><small>${esc(d.role)}</small>${esc(d.name)}</p></div>
  </li>`).join("");
}

function renderCareGuide() {
  const ul = document.getElementById("care-grid");
  if (!ul) return;
  ul.innerHTML = CARE_GUIDE.map(c => `<li><a href="page.html?p=${c.p}">
    <span class="c-no">${esc(c.no)}</span><h3>${esc(c.title)}</h3><p>${esc(c.desc)}</p><span class="c-more">くわしく</span>
  </a></li>`).join("");
}

function renderNumbers() {
  const ul = document.getElementById("numbers-list");
  if (!ul) return;
  ul.innerHTML = NUMBERS.map(n => `<li><p class="n-label">${esc(n.label)}</p><p class="n-value">${esc(n.value)}<small>${esc(n.unit)}</small></p></li>`).join("");
}

function officeItem(o, href) {
  return `<li>
    <div class="thumb">${ph(o.photo)}</div>
    <div><h4>${href ? `<a href="${href}">${esc(o.name)}</a>` : esc(o.name)}</h4>
      <p>〒${esc(o.zip)} ${esc(o.address)}</p>
      <span class="url">${href ? `<a href="${href}">` : ""}https://${esc(o.sub + ".soyokaze.example")}/${href ? "</a>" : ""}</span></div>
  </li>`;
}

function renderClinics() {
  const box = document.getElementById("area-list");
  if (!box) return;
  box.innerHTML = AREAS.map(a => `<div class="area">
    <h3 class="sub-title"><span class="jp">${esc(a.name)}</span><span class="en">${esc(a.en)}</span></h3>
    <ul class="office-list">${CLINICS.filter(c => c.area === a.id).map(c => officeItem(c, `clinic.html?id=${c.id}`)).join("")}</ul>
  </div>`).join("");
}

function renderPartners() {
  const ul = document.getElementById("partner-list");
  if (!ul) return;
  ul.innerHTML = PARTNERS.map(x => `<li><a href="page.html?p=${x.p}">
    <div class="thumb">${ph(x.photo)}</div>
    <div class="p-body"><h3>${esc(x.title)}</h3><p>${esc(x.desc)}</p></div>
  </a></li>`).join("");
}

function renderReports() {
  const ul = document.getElementById("report-list");
  if (!ul) return;
  ul.innerHTML = REPORTS.map(r => `<li>
    <div class="thumb">${ph(r.photo)}</div>
    <div class="meta"><time>${esc(r.date)}</time><span class="${tagClass(r.tag)}">${esc(r.tag)}</span></div>
    <a href="page.html?p=report#${r.id}">${esc(r.title)}</a>
  </li>`).join("");
}

function renderRecruit() {
  const ul = document.getElementById("recruit-two");
  if (!ul) return;
  ul.innerHTML = RECRUIT.map(r => `<li><a href="page.html?p=${r.p}">
    <div class="thumb">${ph(r.photo)}</div>
    <div class="r-body"><h3>${esc(r.title)}<span>の募集</span></h3><p>${esc(r.desc)}</p></div>
  </a></li>`).join("");
}

function renderStrip() {
  const el = document.getElementById("photo-strip");
  if (!el) return;
  el.innerHTML = STRIP.map(s => `<div>${ph(s.photo)}</div>`).join("");
}

/* ===== 下の階層のページ共通 ===== */
const ICON = {
  clinic: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 40V18L24 8l16 10v22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><path d="M24 20v12M18 26h12" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
  map: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 42s13-12 13-23a13 13 0 0 0-26 0c0 11 13 23 13 23z" fill="none" stroke="currentColor" stroke-width="2.4"/><circle cx="24" cy="19" r="5" fill="none" stroke="currentColor" stroke-width="2.4"/></svg>',
  mail: '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="7" y="12" width="34" height="24" rx="2" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M8 14l16 12 16-12" fill="none" stroke="currentColor" stroke-width="2.4"/></svg>',
  doctor: '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="16" r="8" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M9 41c2-9 8-13 15-13s13 4 15 13" fill="none" stroke="currentColor" stroke-width="2.4"/></svg>',
  flow: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 12h28M10 24h28M10 36h18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>'
};

function pageHead(photo, title) {
  return `<section class="page-head">
    <div class="page-photo">${ph(photo)}</div>
    <div class="hero-copy small"><p>${esc(title)}</p></div>
  </section>`;
}

function blockHead(b) {
  return b.h ? `<h3 class="sub-title"><span class="jp">${esc(b.h)}</span>${b.en ? `<span class="en">${esc(b.en)}</span>` : ""}</h3>` : "";
}

function directorById(id) { return DIRECTORS.find(d => d.id === id); }

function doctorCard(d) {
  return `<div class="doctor">
    <div class="doc-photo">${ph(d.photo)}</div>
    <div class="doc-body">
      <p class="doc-role">${esc(d.clinic)}　${esc(d.role)}</p>
      <p class="doc-name">${esc(d.name)}</p>
      <dl class="doc-prof">
        <dt>入職</dt><dd>${esc(d.since)}年</dd>
        <dt>専門</dt><dd>${esc(d.spec)}</dd>
        <dt>経歴</dt><dd>${esc(d.career)}</dd>
      </dl>
      <p class="doc-msg">${esc(d.msg)}</p>
    </div>
  </div>`;
}

function clinicMap(activeId) {
  const land = "M150 22 C210 10 300 30 318 80 C336 128 300 160 312 205 C324 250 330 300 300 340 C285 360 300 392 280 430 C262 462 214 470 196 446 C176 420 196 392 178 360 C160 330 110 318 96 280 C82 240 104 210 86 176 C66 138 70 92 96 60 C110 40 128 28 150 22 Z";
  const pins = CLINICS.map(c => `<a href="clinic.html?id=${c.id}" class="map-pin${c.id === activeId ? " is-active" : ""}" aria-label="${esc(c.name)}">
      <path d="M${c.x} ${c.y} c-12 -16 -16 -22 -16 -30 a16 16 0 0 1 32 0 c0 8 -4 14 -16 30z"/>
      <text x="${c.x}" y="${c.y - 24}">${c.no}</text></a>`).join("");
  return `<svg class="area-svg" viewBox="40 0 320 480" role="img" aria-label="診療エリアの地図（架空）">
    <defs><clipPath id="land"><path d="${land}"/></clipPath></defs>
    <path d="${land}" fill="#e6efed"/>
    <g clip-path="url(#land)">
      <rect x="0" y="0" width="400" height="210" fill="#d3e6e3"/>
      <rect x="0" y="210" width="400" height="135" fill="#e6efed"/>
      <rect x="0" y="345" width="400" height="140" fill="#dbe9e6"/>
      <path d="M0 210 H400 M0 345 H400" stroke="#fff" stroke-width="3" stroke-dasharray="6 6"/>
    </g>
    <path d="${land}" fill="none" stroke="#9fc2bd" stroke-width="2"/>
    <text class="map-area" x="96" y="56">北エリア</text>
    <text class="map-area" x="168" y="232">中央エリア</text>
    <text class="map-area" x="132" y="380">南エリア</text>
    ${pins}
  </svg>`;
}

function clinicRow(c) {
  return `<li id="c-${c.id}">
    <span class="pin-no"><span>${c.no}</span></span>
    <div class="cr-main">
      <div class="cr-top"><h4 class="cr-name">${esc(c.name)}</h4><a class="more-pill" href="clinic.html?id=${c.id}">詳しくはこちら</a></div>
      <p class="cr-area"><span class="cr-label">訪問エリア</span>${esc(c.range)}</p>
      <p class="cr-addr">〒${esc(c.zip)} ${esc(c.address)}</p>
      <p class="cr-tel"><span class="badge24">24時間対応</span><span>代表 ${esc(c.tel)}</span><span>FAX ${esc(c.fax)}</span></p>
    </div>
  </li>`;
}

const BLOCKS = {
  text: b => `${blockHead(b)}<div class="prose">${b.body.map(p => `<p>${esc(p)}</p>`).join("")}</div>`,
  media: b => `<div class="message">
      <div class="message-photo"><div class="thumb">${ph(b.photo)}</div></div>
      <div class="message-body">${blockHead(b)}
        <p class="message-catch">${b.catch}</p>
        ${b.body.map(p => `<p>${esc(p)}</p>`).join("")}
        <p class="message-name"><span>${esc(b.name)}</span>${esc(b.person)}</p>
      </div></div>`,
  points: b => `${blockHead(b)}<ol class="points">${b.items.map(i => `<li><h4>${esc(i.t)}</h4><p>${esc(i.d)}</p></li>`).join("")}</ol>`,
  steps: b => `${blockHead(b)}<ol class="steps" style="--n:${b.items.length}">${b.items.map((i, n) => `<li><span class="st-no">STEP ${n + 1}</span><h4>${esc(i.t)}</h4><p>${esc(i.d)}</p></li>`).join("")}</ol>`,
  timeline: b => `${blockHead(b)}<ol class="timeline">${b.items.map(i => `<li><span class="tl-year">${esc(i.y)}</span><p>${esc(i.t)}</p></li>`).join("")}</ol>`,
  faq: b => `<div class="faq">${b.items.map((i, n) => `<details${n === 0 ? " open" : ""}><summary>${esc(i.q)}</summary><p class="a">${esc(i.a)}</p></details>`).join("")}</div>`,
  table: b => `${blockHead(b)}<table class="info">${b.rows.map(r => `<tr><th>${esc(r[0])}</th><td>${esc(r[1])}</td></tr>`).join("")}</table>`,
  access: b => `${blockHead(b)}<div class="access"><div class="access-map" aria-label="地図の見本">
      <svg viewBox="0 0 400 240" aria-hidden="true"><rect width="400" height="240" fill="#eef3f1"/>
        <path d="M0 150 H400 M120 0 V240 M280 0 V240" stroke="#fff" stroke-width="14"/>
        <path d="M0 60 C100 80 220 40 400 70" stroke="#c9d8d4" stroke-width="10" fill="none"/>
        <rect x="40" y="125" width="70" height="20" fill="#0b5e66"/><text x="75" y="139" fill="#fff" font-size="11" text-anchor="middle">そよかぜ駅</text>
        <path d="M205 112 c-10 -13 -13 -18 -13 -24 a13 13 0 0 1 26 0 c0 6 -3 11 -13 24z" fill="#c7482f"/>
        <text x="205" y="130" font-size="12" text-anchor="middle" fill="#333">本部</text></svg></div>
      <ul class="access-list">${b.body.map(t => `<li>${esc(t)}</li>`).join("")}</ul></div>`,
  feature: b => `${blockHead(b)}<ol class="feature-rows">${b.items.map((i, n) => `<li>
      <div class="thumb">${ph(i.photo)}</div>
      <div><p class="fr-no">POINT ${String(n + 1).padStart(2, "0")}</p><h4>${esc(i.t)}</h4><p>${esc(i.d)}</p></div></li>`).join("")}</ol>`,
  compare: b => `${blockHead(b)}<ul class="compare">${b.items.map(i => `<li class="${i.em ? "em" : ""}"><h4>${esc(i.t)}</h4><p>${esc(i.d)}</p></li>`).join("")}</ul>`,
  checks: b => `${blockHead(b)}<ul class="checks">${b.items.map(t => `<li>${esc(t)}</li>`).join("")}</ul>`,
  tiles: b => `${blockHead(b)}<ul class="tiles">${b.items.map(i => `<li><h4>${esc(i.t)}</h4><p>${esc(i.d)}</p></li>`).join("")}</ul>`,
  cost: b => `${blockHead(b)}<div class="table-scroll"><table class="cost">
      <thead><tr>${b.head.map(h => `<th>${esc(h)}</th>`).join("")}</tr></thead>
      <tbody>${b.rows.map(r => `<tr><th>${esc(r[0])}</th>${r.slice(1).map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
      <p class="note">${esc(b.note)}</p>`,
  numbers: b => `${blockHead(b)}<ul class="numbers numbers-light">${NUMBERS.map(n => `<li><p class="n-label">${esc(n.label)}</p><p class="n-value">${esc(n.value)}<small>${esc(n.unit)}</small></p></li>`).join("")}</ul><p class="note">※ 架空の数字です</p>`,
  numbers2: b => `${blockHead(b)}<ul class="stats">${b.items.map(i => `<li><p class="n-label">${esc(i.l)}</p><p class="n-value">${esc(i.v)}<small>${esc(i.u)}</small></p></li>`).join("")}</ul>`,
  directors: b => `${blockHead(b)}<ul class="directors">${DIRECTORS.map(d => `<li>
      <span class="d-photo">${ph(d.photo)}</span>
      <div><p class="d-clinic">${esc(d.clinic)}</p><p class="d-name"><small>${esc(d.role)}</small>${esc(d.name)}</p></div></li>`).join("")}</ul>`,
  jobs: b => `${blockHead(b)}<div class="positions">${b.items.map(i => `<div class="position"><h4>${esc(i.t)}</h4>
      <table class="info">${i.rows.map(r => `<tr><th>${esc(r[0])}</th><td>${esc(r[1])}</td></tr>`).join("")}</table></div>`).join("")}</div>`,
  voices: b => `${blockHead(b)}<ul class="voices">${b.items.map(i => `<li><div class="thumb">${ph(i.photo)}</div>
      <blockquote>${esc(i.q)}</blockquote><p class="v-role">${esc(i.role)}</p></li>`).join("")}</ul>
      <p class="note">※ 架空の声です。写真はイメージです。</p>`,
  newsList: () => `<ul class="article-list">${NEWS.map(n => `<li id="${n.id}">
      <div class="meta"><time>${esc(n.date)}</time><span class="${tagClass(n.tag)}">${esc(n.tag)}</span></div>
      <h4>${esc(n.title)}</h4><p>${esc(n.body)}</p></li>`).join("")}</ul>`,
  reportList: () => `<ul class="article-list with-photo">${REPORTS.map(r => `<li id="${r.id}">
      <div class="thumb">${ph(r.photo)}</div>
      <div><div class="meta"><time>${esc(r.date)}</time><span class="${tagClass(r.tag)}">${esc(r.tag)}</span></div>
      <h4>${esc(r.title)}</h4><p>${esc(r.body)}</p></div></li>`).join("")}</ul>`,
  jump: () => `<ul class="jump-links">
      <li><a href="#blk-1">${ICON.map}<span>診療エリア</span></a></li>
      <li><a href="#blk-2">${ICON.clinic}<span>クリニック一覧</span></a></li>
      <li><a href="page.html?p=contact-care">${ICON.mail}<span>お問い合わせ</span></a></li></ul>`,
  clinicMap: b => `${blockHead(b)}<div class="area-map-box">
      <div class="area-map">${clinicMap()}</div>
      <div class="prose"><p>そよかぜ会は、架空県の北・中央・南の3つのエリアで在宅医療を行っています。地図の番号を押すと、各クリニックのページへ移ります。</p>
      <p>伺える地域はクリニックごとに決まっています。お住まいの地域が分からないときは、お気軽にお電話ください。いちばん近い拠点をご案内します。</p>
      <ul class="area-legend">${AREAS.map(a => `<li><strong>${esc(a.name)}</strong>${CLINICS.filter(c => c.area === a.id).map(c => c.no).join("・")}</li>`).join("")}</ul></div></div>`,
  clinicRows: b => `${blockHead(b)}${AREAS.map(a => `<p class="area-label">${esc(a.name)}<span>${esc(a.en)}</span></p>
      <ol class="clinic-rows">${CLINICS.filter(c => c.area === a.id).map(clinicRow).join("")}</ol>`).join("")}`,
  depts: b => `${blockHead(b)}<ul class="depts">
      ${[{ d: "d6", t: "歯科診療部", photo: "media4.jpg", x: "歯科医師と歯科衛生士がお宅へ伺い、むし歯や入れ歯の治療、飲み込む力の訓練を行います。" },
         { d: "d7", t: "精神科", photo: "hero2.jpg", x: "精神科の医師が訪問し、認知症にともなう不安や気持ちの落ち込みに向き合います。" },
         { d: null, t: "在宅栄養チーム", photo: "strip2.jpg", x: "管理栄養士が訪問し、食事の形や量の工夫を、ご家族と一緒に考えます。" }].map(x => {
        const d = x.d && directorById(x.d);
        return `<li><div class="thumb">${ph(x.photo)}</div><div class="dp-body"><h4>${esc(x.t)}</h4><p>${esc(x.x)}</p>
          ${d ? `<div class="dp-head"><span class="d-photo">${ph(d.photo)}</span><p><small>${esc(d.role)}</small>${esc(d.name)}</p></div>` : ""}</div></li>`;
      }).join("")}</ul>`,
  form: b => `<form class="form" novalidate>
      <p class="form-note">これは見本のフォームです。<strong>送信しても、どこにも送られません。</strong></p>
      ${b.fields.map((f, n) => {
        const id = `f${n}`;
        const label = `${esc(f.l)}${f.req ? '<span class="req">必須</span>' : ""}`;
        let input;
        if (f.type === "radio") input = `<div class="f-choices">${f.opts.map(o => `<label><input type="radio" name="${id}" value="${esc(o)}"> ${esc(o)}</label>`).join("")}</div>`;
        else if (f.type === "select") input = `<select id="${id}"><option value="">選んでください</option>${f.opts.map(o => `<option>${esc(o)}</option>`).join("")}</select>`;
        else if (f.type === "textarea") input = `<textarea id="${id}" rows="6" placeholder="${esc(f.ph || "")}"></textarea>`;
        else input = `<input id="${id}" type="${f.type}" placeholder="${esc(f.ph || "")}">`;
        return `<div class="f-row"><${f.type === "radio" ? "p" : `label for="${id}"`} class="f-label">${label}</${f.type === "radio" ? "p" : "label"}><div>${input}</div></div>`;
      }).join("")}
      <div class="f-submit"><button type="submit" class="round-btn red wide">入力内容を確認する</button></div>
      <p class="f-done" role="status">見本のため、送信はしていません。入力した内容はどこにも送られていません。</p>
    </form>`
};

function ctaBox(group) {
  const c = CTA[group];
  if (!c) return "";
  return `<section class="sec"><div class="wrapper"><div class="care-call">
    <p class="care-call-head">${esc(c.head)}</p>
    <p class="care-call-tel">${esc(c.tel)}<small>（架空の番号です）</small></p>
    <p class="care-call-note">${esc(c.note)}</p>
    <p class="cta-btn"><a class="round-btn red wide" href="${c.href}">${esc(c.btn)}</a></p>
  </div></div></section>`;
}

function localNav(groupId, currentId) {
  const g = GROUPS[groupId];
  if (g.pages.length < 2) return "";
  return `<nav class="local-nav" aria-label="${esc(g.name)}のページ">${g.pages.map(id =>
    `<a href="page.html?p=${id}"${id === currentId ? ' class="is-current" aria-current="page"' : ""}>${esc(PAGES[id].nav)}</a>`).join("")}</nav>`;
}

function renderPage() {
  const root = document.getElementById("page-root");
  if (!root) return;
  const id = new URLSearchParams(location.search).get("p");
  const pg = PAGES[id] ? PAGES[id] : PAGES.greeting;
  const pid = PAGES[id] ? id : "greeting";
  const g = GROUPS[pg.group];
  document.title = `${pg.title}｜医療法人社団そよかぜ会（架空の制作見本）`;
  const crumbs = [`<a href="index.html">トップ</a>`];
  if (g.pages[0] !== pid) crumbs.push(`<a href="page.html?p=${g.pages[0]}">${esc(g.name)}</a>`);
  crumbs.push(esc(pg.title));
  root.innerHTML = `${pageHead(pg.photo, pg.title)}
  <section class="sec page-intro">
    <div class="wrapper">
      <p class="crumb">${crumbs.join(" ＞ ")}</p>
      <div class="sec-head">
        <h2 class="std-title"><span class="jp">${esc(g.name)}</span><span class="en">${esc(g.en)}</span></h2>
        <p class="lead">${pg.lead}</p>
      </div>
      ${localNav(pg.group, pid)}
    </div>
  </section>
  ${pg.blocks.map((b, n) => `<section class="sec blk blk-${b.t}${n % 2 === 0 ? " bg-gray" : ""}" id="blk-${n}"><div class="wrapper">${BLOCKS[b.t](b)}</div></section>`).join("")}
  ${ctaBox(pg.group)}`;
  root.querySelectorAll("form.form").forEach(f => f.addEventListener("submit", e => {
    e.preventDefault();
    f.querySelector(".f-done").classList.add("show");
  }));
  if (location.hash) { const t = document.getElementById(location.hash.slice(1)); if (t) setTimeout(() => t.scrollIntoView(), 50); }
}

function renderClinicDetail() {
  const root = document.getElementById("clinic-detail");
  if (!root) return;
  const id = new URLSearchParams(location.search).get("id");
  const c = CLINICS.find(x => x.id === id) || CLINICS[0];
  const area = AREAS.find(a => a.id === c.area);
  const d = c.director && directorById(c.director);
  const kango = c.id === "kango";
  document.title = `${c.name}｜医療法人社団そよかぜ会（架空の制作見本）`;
  const others = CLINICS.filter(x => x.id !== c.id && x.area === c.area);
  const pts = kango ? [
    { t: "24時間、看護師に電話がつながる", d: "夜間も当番の看護師が電話を受け、必要なときは伺います。" },
    { t: "医師と同じ記録を見ながら動く", d: "クリニックの医師と電子カルテを共有し、指示をすぐに受けられます。" },
    { t: "リハビリの専門職も在籍", d: "理学療法士が、家での動きやすさを一緒に考えます。" },
    { t: "ご家族への介護の手ほどき", d: "体の向きの変え方や、食事の介助のこつをお伝えします。" },
    { t: "最期の時間にも寄り添う", d: "痛みや不安をやわらげ、ご家族とともに過ごす時間を支えます。" }
  ] : [
    { t: "家で安全に療養するための計画", d: "病気と暮らしの両方を見て、無理のない療養の計画を一緒に立てます。" },
    { t: "地域の病院・介護の方と連携", d: "ケアマネジャーや病院と同じ情報を見ながら、チームで支えます。" },
    { t: "24時間365日の対応", d: "夜間・休日も電話がつながり、必要なときは伺います。" },
    { t: "いろいろな医療に対応", d: "点滴や酸素、痛みの治療、歯科や栄養の相談まで、法人の中でつなぎます。" },
    { t: "ご本人の考え方を大切に", d: "どこでどう過ごしたいか。ご本人とご家族の思いから方針を決めます。" }
  ];
  root.innerHTML = `${pageHead(c.photo, c.name)}
  <section class="sec page-intro">
    <div class="wrapper">
      <p class="crumb"><a href="index.html">トップ</a> ＞ <a href="page.html?p=clinics">クリニックのご案内</a> ＞ ${esc(c.name)}</p>
      <div class="sec-head">
        <h2 class="std-title"><span class="jp">${c.name.replace(/^(そよかぜ)(.*)$/, (m, x, y) => `<span class="nb">${esc(x)}</span> <span class="nb">${esc(y.trim())}</span>`)}</span><span class="en">${esc(area.en)}</span></h2>
        <p class="lead">${esc(area.name)}の<br><span class="red">${esc(c.range)}</span>に<br>${kango ? "看護師が" : "医師と看護師がチームで"}伺います。</p>
      </div>
      <ul class="jump-links">
        <li><a href="page.html?p=homecare">${ICON.flow}<span>診療をご希望の方へ</span></a></li>
        ${d ? `<li><a href="#doctor">${ICON.doctor}<span>医師紹介</span></a></li>` : ""}
        <li><a href="#area">${ICON.map}<span>訪問エリア</span></a></li>
        <li><a href="page.html?p=contact-care">${ICON.mail}<span>お問い合わせ</span></a></li>
      </ul>
      <div class="clinic-card">
        <div><p class="cc-label">所在地</p><p>〒${esc(c.zip)}<br>${esc(c.address)}</p></div>
        <div><p class="cc-label">お電話</p><p class="cc-tel">${esc(c.tel)}</p><p class="cc-sub">FAX ${esc(c.fax)}（架空の番号です）</p></div>
        <div><p class="cc-label">受付時間</p><p>${esc(c.hours)}</p><span class="badge24">24時間対応</span></div>
      </div>
    </div>
  </section>
  <section class="sec bg-gray">
    <div class="wrapper"><div class="message">
      <div class="message-photo"><div class="thumb">${ph(kango ? "hero3.jpg" : "contact2.jpg")}</div></div>
      <div class="message-body">
        <h3 class="sub-title"><span class="jp">${kango ? "わたしたちの思い" : "クリニックの思い"}</span><span class="en">OUR WISH</span></h3>
        <p class="message-catch">このまちで、ひとりでも多くの方の<br>「いつもの毎日」を支えたい。</p>
        <p>${esc(area.name)}の${esc(c.range)}を担当しています。住みなれた家で過ごしたいという思いに、医師・看護師・診療アシスタント・事務がチームで応えます。はじめての方も、まずはお気軽にご相談ください。</p>
      </div></div></div>
  </section>
  <section class="sec">
    <div class="wrapper">
      <h3 class="sub-title"><span class="jp">ご自宅で安心して${kango ? "看護" : "診察"}が受けられます</span><span class="en">FEATURES</span></h3>
      <ol class="points five">${pts.map(i => `<li><h4>${esc(i.t)}</h4><p>${esc(i.d)}</p></li>`).join("")}</ol>
    </div>
  </section>
  <section class="sec bg-gray">
    <div class="wrapper">
      ${BLOCKS.steps({ h: "診療開始までの流れ", en: "FLOW", items: PAGES.flow.blocks[0].items })}
      <p class="center more-gap"><a class="pill-btn" href="page.html?p=flow">くわしい流れを見る</a></p>
    </div>
  </section>
  ${d ? `<section class="sec" id="doctor"><div class="wrapper">
      <h3 class="sub-title"><span class="jp">医師紹介</span><span class="en">DOCTOR</span></h3>
      ${doctorCard(d)}
    </div></section>` : ""}
  <section class="sec bg-gray" id="area">
    <div class="wrapper">
      <h3 class="sub-title"><span class="jp">訪問エリア</span><span class="en">AREA</span></h3>
      <div class="area-map-box">
        <div class="area-map">${clinicMap(c.id)}</div>
        <div><table class="info">
          <tr><th>伺える地域</th><td>${esc(c.range)}</td></tr>
          <tr><th>できること</th><td>${c.services.map(esc).join("・")}</td></tr>
          <tr><th>伺う場所</th><td>ご自宅・高齢者住宅・施設</td></tr>
        </table>
        <p class="note">※ 地域の境目にお住まいの方も、お気軽にご相談ください。</p></div>
      </div>
    </div>
  </section>
  ${ctaBox("clinics")}
  ${others.length ? `<section class="sec bg-gray">
    <div class="wrapper">
      <div class="area" style="margin-top:0">
        <h3 class="sub-title"><span class="jp">${esc(area.name)}のほかの拠点</span><span class="en">${esc(area.en)}</span></h3>
        <ul class="office-list">${others.map(o => officeItem(o, `clinic.html?id=${o.id}`)).join("")}</ul>
      </div>
    </div>
  </section>` : ""}`;
}

// 大写真を4秒見せて2秒かけて次へ（開いた直後の言葉が消えてから始める）
function setupHeroSlides() {
  const box = document.getElementById("hero-slides");
  if (!box) return;
  const slides = [...box.querySelectorAll(".slide")];
  if (slides.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let i = 0;
  const next = () => {
    slides.forEach(s => s.classList.remove("is-prev"));
    slides[i].classList.remove("is-active");
    slides[i].classList.add("is-prev");
    i = (i + 1) % slides.length;
    slides[i].classList.add("is-active");
  };
  setTimeout(() => setInterval(next, 6000), 3900 + 4000 - 6000);
}

function setupSampleLinks() {
  document.querySelectorAll("[data-sample-link]").forEach(a => a.addEventListener("click", e => {
    e.preventDefault();
    a.classList.add("noted");
    a.setAttribute("title", "見本のため、ここから先のページはありません");
  }));
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  renderNews();
  renderAbout();
  renderDirectors();
  renderCareGuide();
  renderNumbers();
  renderClinics();
  renderPartners();
  renderReports();
  renderRecruit();
  renderStrip();
  renderClinicDetail();
  renderPage();
  fillPhotos();
  setupSampleLinks();
  setupHeroSlides();
});
