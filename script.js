/* ============================================================
   script.js — Birthday Surprise Site (v2)
   ============================================================ */

/* ── PERSONALISE: Balloon words (one per balloon) ── */
const BALLOON_WORDS = [
  { word: "Happy",    emoji: "🎉", color: "#f4a7b9" },
  { word: "Birthday", emoji: "🎂", color: "#c9b8e8" },
  { word: "Dear Faculty Ki Bacchi!",  emoji: "\u2728",    color: "#e8c96e" }, // PERSONALISE: her name
  { word: "You're",   emoji: "💛", color: "#f9b8d0" },
  { word: "simply",       emoji: "🌸", color: "#b8d8e8" },
  { word: "Wonderful",    emoji: "🎈🌟", color: "#d4b8f0" },
];

/* ── PERSONALISE: Wish paragraphs (typewriter content, page-by-page) ──
   Each object = one paragraph. cls: null = normal, 'wish__highlight' = styled quote. */
const WISH_PARAGRAPHS = {
  1: [
    { html: `You are genuinely one of the most amazing people I\u2019ve come across. You have this way of understanding people, listening to them, and making them feel comfortable without even trying too hard. You notice things, you care, and somehow you always know when someone needs to be heard.`, cls: null },
    { html: `I really admire the way you are yourself. You don\u2019t need to pretend to be someone else to be liked, and I hope you never feel like you have to change yourself for anyone.`, cls: null },
    { html: `I don\u2019t really know when or how I started getting so comfortable talking to you. I just know that somewhere along the way, talking to you became something I genuinely look forward to.`, cls: null },
    { html: `I\u2019m really glad I met you, got to know you, and got the chance to have all those random conversations with you. So on your birthday, I just want to remind you of something:`, cls: null },
    { html: `You are already enough exactly as you are.<br/>Please stay the person you are.<br/>Never change yourself just to fit into someone else\u2019s idea of you.`, cls: "wish__highlight" },
  ],
  2: [
    { html: `I like how easy it is to talk to you.`, cls: null },
    { html: `With you, conversations somehow never feel forced. We can start with something completely random and somehow end up talking for hours without realizing how much time has passed.`, cls: null },
    { html: `I like how you listen. How you understand. How you share things. How you make people feel comfortable enough to be themselves around you.`, cls: null },
    { html: `And honestly, I like the little things too \u2014 the random things you say, the way you react to things, your expressions, your sense of humour, and all those tiny things that probably seem normal to you but make you, well\u2026 <em>you</em>.`, cls: null },
    { html: `There are people you meet and forget, and then there are people who slowly become a part of your everyday thoughts without you even realizing it.`, cls: null },
    { html: `You\u2019re one of those people.`, cls: "wish__highlight" },
  ],
  3: [
    { html: `It\u2019s actually funny how this started.`, cls: null },
    { html: `Hm tmko <em>Faculty ki Bacchi</em> bulate the kyunki hmko tumhara naam nahi pata tha. 😂 Aur jab bhi tmko dekhte the, tb tb hum wahi naam se tmko bulate the.`, cls: null },
    { html: `Aur sabse funny part ye hai ki hm kabhi tumhara naam jaanne ka kosis bhi nahi kiye, kyunki hmko wahi naam pasand tha.`, cls: null },
    { html: `Apparently, your roommate eventually told you about it.`, cls: null },
    { html: `And then one day, while we were coordinating Freshers, you came up to me and said:`, cls: null },
    { html: `<strong>\u201cHum tumko Faculty ki Bacchi dikhte hain?\u201d</strong>`, cls: "wish__dialogue" },
    { html: `And honestly, I don\u2019t think you realize how funny that moment was.`, cls: null },
    { html: `What\u2019s even funnier is that I still don\u2019t know why I chose that name in the first place. I could have simply asked your name. But no. <strong>Faculty ki Bacchi it was. Something about you just gave me that feeling.</strong>`, cls: null },
    { html: `And somehow, that stupid little nickname became one of the first things connecting us.`, cls: null },
    { html: `Funny how sometimes you don\u2019t realize you\u2019re at the beginning of a story while you\u2019re living it.`, cls: null },
    { html: `I don\u2019t think either of us planned for that.`, cls: null },
    { html: `It just happened.`, cls: null },
    { html: `And honestly, I\u2019m glad it did. 🌸`, cls: "wish__highlight" },
  ],
};

const BALLOON_COLOURS = ["#f4a7b9","#c9b8e8","#e8c96e","#f9b8d0","#b8e8c8","#b8d8e8","#d4b8f0","#f0e0b8"];
const TYPER_SPEED = 80; // ms per character — lower = faster

/* ─────────────────────────────────────────────────────────
   AMBIENT PARTICLES
   ───────────────────────────────────────────────────────── */
(function spawnParticles() {
  const container = document.getElementById("particles-container");
  const SHAPES = ["\u2665","\u2736","\u00b7","\u00b0","\u273f","\u274b"];
  const COLS   = ["#f4a7b9","#c9b8e8","#e8c96e","#f9b8d0","#d4b8f0"];
  for (let i = 0; i < 30; i++) {
    const el = document.createElement("span");
    el.className = "particle";
    el.textContent = SHAPES[i % SHAPES.length];
    el.style.cssText = `left:${Math.random()*100}%;font-size:${8+Math.random()*14}px;color:${COLS[i%COLS.length]};animation-duration:${8+Math.random()*14}s;animation-delay:${-Math.random()*14}s;border-radius:0;background:none;`;
    container.appendChild(el);
  }
})();

/* ─────────────────────────────────────────────────────────
   LOCK SCREEN — STARFIELD
   ───────────────────────────────────────────────────────── */
(function spawnStars() {
  const wrap = document.getElementById("lock-stars");
  for (let i = 0; i < 120; i++) {
    const s = document.createElement("div");
    const size = 0.5 + Math.random() * 2.2;
    s.style.cssText = `position:absolute;left:${Math.random()*100}%;top:${Math.random()*100}%;width:${size}px;height:${size}px;background:white;border-radius:50%;opacity:${0.2+Math.random()*0.8};animation:cursor-blink ${1.5+Math.random()*3}s ${Math.random()*3}s ease-in-out infinite alternate;`;
    wrap.appendChild(s);
  }
})();

/* ─────────────────────────────────────────────────────────
   LOCK SCREEN — COUNTDOWN
   ───────────────────────────────────────────────────────── */
(function setupLock() {
  const now    = new Date();
  const unlock = new Date(now);
  unlock.setHours(5, 10, 0, 0);

  const hrsEl      = document.getElementById("lock-hrs");
  const minsEl     = document.getElementById("lock-mins");
  const secsEl     = document.getElementById("lock-secs");
  const noteEl     = document.getElementById("lock-note");
  const unlockedEl = document.getElementById("lock-unlocked");
  const iconEl     = document.getElementById("lock-icon");

  function pad(n) { return String(n).padStart(2,"0"); }

  function animTick(el, val) {
    el.textContent = pad(val);
    el.classList.remove("tick");
    void el.offsetWidth; // force reflow
    el.classList.add("tick");
  }

  let prevSecs = -1;
  function updateClock() {
    const rem = Math.max(0, unlock - new Date());
    const h   = Math.floor(rem / 3600000);
    const m   = Math.floor((rem % 3600000) / 60000);
    const s   = Math.floor((rem % 60000) / 1000);
    if (s !== prevSecs) {
      animTick(secsEl, s);
      animTick(minsEl, m);
      animTick(hrsEl, h);
      prevSecs = s;
    }
    if (rem <= 0) { clearInterval(timer); unlockSite(); }
  }

  function unlockSite() {
    iconEl.textContent = "🔓";
    iconEl.classList.add("unlock-anim");
    noteEl.classList.add("hidden");
    unlockedEl.classList.remove("hidden");
    setTimeout(() => goTo("landing"), 2200);
  }

  // Already past 11:50? Skip lock screen
  if (now >= unlock) {
    document.getElementById("lock").classList.remove("active");
    document.getElementById("landing").classList.add("active");
    return;
  }

  updateClock();
  const timer = setInterval(updateClock, 1000);
})();

/* ─────────────────────────────────────────────────────────
   SECTION NAVIGATION
   ───────────────────────────────────────────────────────── */
const sections = {
  lock:    document.getElementById("lock"),
  landing: document.getElementById("landing"),
  balloons:document.getElementById("balloon-section"),
  "wish-1":document.getElementById("wish-1"),
  "wish-2":document.getElementById("wish-2"),
  "wish-3":document.getElementById("wish-3"),
  gallery: document.getElementById("gallery-section"),
  closing: document.getElementById("closing-section"),
  note:    document.getElementById("note-section"),
};

function goTo(id) {
  const cur = document.querySelector(".section.active");
  if (cur) {
    cur.classList.add("exit");
    cur.classList.remove("active");
    setTimeout(() => cur.classList.remove("exit"), 700);
  }
  const tgt = sections[id];
  if (!tgt) return;
  setTimeout(() => {
    tgt.classList.add("active");
    tgt.scrollTop = 0;
    if (id === "wish-1") initWish(1);
    if (id === "wish-2") initWish(2);
    if (id === "wish-3") initWish(3);
  }, 350);
}

/* ─────────────────────────────────────────────────────────
   NAVIGATION LISTENERS
   ───────────────────────────────────────────────────────── */
document.getElementById("open-surprise-btn").addEventListener("click", () => {
  goTo("balloons");
  initBalloons();
  // Autoplay music upon entering website
  const audio = document.getElementById("bg-music");
  if (audio.paused) {
    audio.play().catch(()=>{});
  }
});
document.getElementById("to-wish-btn").addEventListener("click", () => { goTo("wish-1"); triggerFullPageConfetti(); });
document.getElementById("wish1-next").addEventListener("click", () => goTo("wish-2"));
document.getElementById("wish2-back").addEventListener("click", () => goTo("wish-1"));
document.getElementById("wish2-next").addEventListener("click", () => goTo("wish-3"));
document.getElementById("wish3-back").addEventListener("click", () => goTo("wish-2"));
document.getElementById("wish3-next").addEventListener("click", () => goTo("gallery"));
document.getElementById("to-closing-btn").addEventListener("click", () => goTo("closing"));
document.getElementById("to-note-btn").addEventListener("click", () => goTo("note"));
document.getElementById("replay-btn").addEventListener("click", () => { resetAll(); goTo("landing"); });

/* ─────────────────────────────────────────────────────────
   TYPEWRITER ENGINE
   ───────────────────────────────────────────────────────── */
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function revealWordsInto(el, html, token) {
  const temp = document.createElement("div");
  temp.innerHTML = html;

  // Walk through every text node
  const walker = document.createTreeWalker(temp, NodeFilter.SHOW_TEXT);
  const nodes = [];

  let node;
  while ((node = walker.nextNode())) {
    nodes.push(node);
  }

  // Replace each word with a span
  for (const textNode of nodes) {
    const text = textNode.textContent;
    const fragment = document.createDocumentFragment();

    const parts = text.split(/(\s+)/);

    for (const part of parts) {
      if (/^\s+$/.test(part)) {
        fragment.appendChild(document.createTextNode(part));
      } else if (part) {
        const span = document.createElement("span");
        span.className = "word";
        span.textContent = part;
        fragment.appendChild(span);
      }
    }

    textNode.parentNode.replaceChild(fragment, textNode);
  }

  el.innerHTML = "";
  while (temp.firstChild) {
    el.appendChild(temp.firstChild);
  }

  const words = el.querySelectorAll(".word");

  for (const word of words) {
    if (token.cancelled) {
      words.forEach(w => w.classList.add("visible"));
      break;
    }

    word.classList.add("visible");
    await sleep(100);
  }
}

function renderInstant(paragraphs, area) {
  area.innerHTML = "";
  for (const { html, cls } of paragraphs) {
    const p = document.createElement("p");
    if (cls) p.className = cls;
    p.innerHTML = html;
    area.appendChild(p);
  }
}

const wishState  = { 1: "pending", 2: "pending", 3: "pending" };
const wishTokens = { 1: null, 2: null, 3: null };

async function initWish(num) {
  const paragraphs = WISH_PARAGRAPHS[num];
  const area    = document.getElementById(`wish${num}-area`);
  const nextId  = num === 3 ? "wish3-next" : `wish${num}-next`;
  const nextBtn = document.getElementById(nextId);
  const skipBtn = document.getElementById(`wish${num}-skip`);

  // Already done — show instantly
  if (wishState[num] === "done") {
    renderInstant(paragraphs, area);
    nextBtn.disabled = false;
    skipBtn.classList.add("hidden");
    return;
  }

  // Cancel any running typer for this slot
  if (wishTokens[num]) wishTokens[num].cancelled = true;
  const token = { cancelled: false };
  wishTokens[num] = token;

  wishState[num] = "running";
  nextBtn.disabled = true;
  area.innerHTML = "";
  skipBtn.classList.remove("hidden");

  // Skip handler — fill instantly and enable next
  skipBtn.onclick = () => {
    token.cancelled = true;
    renderInstant(paragraphs, area);
    skipBtn.classList.add("hidden");
    nextBtn.disabled = false;
    wishState[num] = "done";
  };

  for (const { html, cls } of paragraphs) {

  if (token.cancelled) break;

  const p = document.createElement("p");

  if (cls) p.className = cls;

  area.appendChild(p);

  await revealWordsInto(p, html, token);

  if (!token.cancelled) await sleep(60);

}

  if (!token.cancelled) {
    wishState[num] = "done";
    nextBtn.disabled = false;
    skipBtn.classList.add("hidden");
  }
}

/* ─────────────────────────────────────────────────────────
   BALLOON SECTION
   ───────────────────────────────────────────────────────── */
let balloonsInitialised = false;
let poppedCount = 0;

function initBalloons() {
  if (balloonsInitialised) return;
  balloonsInitialised = true;
  const container = document.getElementById("balloons-container");
  container.innerHTML = "";
  poppedCount = 0;
  const total = BALLOON_WORDS.length;

  BALLOON_WORDS.forEach((item, index) => {
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.setAttribute("role","button");
    balloon.setAttribute("tabindex","0");
    balloon.setAttribute("aria-label",`Pop balloon ${index+1}`);

    const leftPct = 5 + (index/(total-1))*88 + (Math.random()-0.5)*6;
    balloon.style.left    = `${Math.min(Math.max(leftPct,3),90)}%`;
    balloon.style.bottom  = `${30+Math.random()*30}px`;

    const colour = item.color || BALLOON_COLOURS[index % BALLOON_COLOURS.length];
    const knot   = shadeColour(colour,-20);
    balloon.innerHTML = `<div class="balloon__body" style="background:${colour};"></div><div class="balloon__knot" style="background:${knot};"></div><div class="balloon__string"></div>`;

    const pop = () => {
      if (balloon.classList.contains("popped")) return;
      popBalloon(balloon, item, balloon.getBoundingClientRect());
    };
    balloon.addEventListener("click", pop);
    balloon.addEventListener("keydown", e => { if (e.key==="Enter"||e.key===" "){ e.preventDefault(); pop(); } });
    container.appendChild(balloon);
  });
}

function popBalloon(balloon, item, rect) {
  const x = (rect.left + rect.width/2)  / window.innerWidth;
  const y = (rect.top  + rect.height/2) / window.innerHeight;
  confetti({ particleCount:45, spread:70, origin:{x,y}, colors:[item.color,"#ffffff","#e8c96e","#c9b8e8"], scalar:0.9, gravity:1.2, ticks:180 });
  balloon.classList.add("popped");
  setTimeout(() => {
    const msgEl = document.getElementById("balloon-message");
    const chip  = document.createElement("span");
    chip.className = "word-chip";
    chip.textContent = `${item.emoji} ${item.word}`;
    chip.style.background = hexToRgba(item.color, 0.22);
    msgEl.appendChild(chip);
    poppedCount++;
    if (poppedCount === BALLOON_WORDS.length) {
      setTimeout(() => { document.getElementById("to-wish-btn").classList.remove("hidden"); triggerSmallConfetti(); }, 400);
      const surprisePhoto = document.getElementById("balloon-surprise-photo");
      if (surprisePhoto) {
        surprisePhoto.classList.remove("hidden");
        // Force reflow then add show class for slow scale animation
        void surprisePhoto.offsetWidth;
        surprisePhoto.classList.add("show");
      }
    }
  }, 260);
}

/* ─────────────────────────────────────────────────────────
   CONFETTI
   ───────────────────────────────────────────────────────── */
function triggerSmallConfetti() {
  confetti({ particleCount:80, spread:100, origin:{x:0.5,y:0.5}, colors:["#f4a7b9","#c9b8e8","#e8c96e","#f9b8d0"] });
}
function triggerFullPageConfetti() {
  const end = Date.now()+2000;
  const cols = ["#f4a7b9","#c9b8e8","#e8c96e","#f9b8d0","#d4b8f0","#b8e8c8"];
  (function frame() {
    confetti({ particleCount:6, angle:60,  spread:55, origin:{x:0}, colors:cols });
    confetti({ particleCount:6, angle:120, spread:55, origin:{x:1}, colors:cols });
    if (Date.now()<end) requestAnimationFrame(frame);
  })();
}

/* ─────────────────────────────────────────────────────────
   CAKE / CANDLE
   ───────────────────────────────────────────────────────── */
let candleBlown = false;
(function setupCake() {
  const wrapper = document.getElementById("cake-wrapper");
  const flame   = document.getElementById("flame");
  const hint    = document.getElementById("cake-hint");
  const blown   = document.getElementById("cake-blown");

  const blow = () => {
    if (candleBlown) return;
    candleBlown = true;
    flame.classList.add("blown-out");
    hint.classList.add("hidden");
    const candle = document.querySelector(".cake__candle");
    for (let i=0;i<4;i++) {
      const puff = document.createElement("div");
      puff.className = "smoke-puff";
      puff.style.left = `${-3+Math.random()*16}px`;
      puff.style.animationDelay = `${i*0.18}s`;
      candle.appendChild(puff);
    }
    setTimeout(() => { 
      blown.classList.remove("hidden"); 
      triggerFullPageConfetti(); 
      // Reveal the Happy Birthday message after candle is blown
      const closingMsg = document.getElementById("closing-message");
      if (closingMsg) {
        closingMsg.classList.remove("hidden");
        closingMsg.classList.add("fade-up");
      }
    }, 500);
  };
  wrapper.addEventListener("click", blow);
  wrapper.addEventListener("keydown", e => { if (e.key==="Enter"||e.key===" "){ e.preventDefault(); blow(); } });
})();

/* ─────────────────────────────────────────────────────────
   NOTE BACK FORM
   ───────────────────────────────────────────────────────── */
(function setupNote() {
  const form     = document.getElementById("note-form");
  const textarea = document.getElementById("note-text");
  const charEl   = document.getElementById("note-chars");
  const successEl= document.getElementById("note-success");
  const introEl  = document.getElementById("note-intro");
  const displayEl= document.getElementById("note-display");
  const copyBtn  = document.getElementById("note-copy");
  const againBtn = document.getElementById("note-write-again");

  textarea.addEventListener("input", () => { charEl.textContent = textarea.value.length; });

  form.addEventListener("submit", e => {
    e.preventDefault();
    const text = textarea.value.trim();
    if (!text) { textarea.focus(); return; }
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;
    textarea.disabled = true;

    // Send to Google Form silently
    const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSdawjOJ9J5okKCL6ZmOWv8SyTG8vmyghUsXfzXYA4c4Vw8jiw/formResponse";
    const params = new URLSearchParams();
    params.append("entry.136813496", text);

    fetch(googleFormURL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params.toString()
    }).then(() => {
      // Also save to localStorage as backup
      try {
        const saved = JSON.parse(localStorage.getItem("bdaySurprise_notes") || "[]");
        saved.push({ text, ts: new Date().toISOString() });
        localStorage.setItem("bdaySurprise_notes", JSON.stringify(saved));
      } catch (_) {}
      
      displayEl.textContent = text;
      introEl.classList.add("hidden");
      successEl.classList.remove("hidden");
      triggerSmallConfetti();
      
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
      textarea.disabled = false;
    }).catch((err) => {
      console.error(err);
      // Fallback in case of absolute network failure
      displayEl.textContent = text;
      introEl.classList.add("hidden");
      successEl.classList.remove("hidden");
      triggerSmallConfetti();
      
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
      textarea.disabled = false;
    });
  });

  copyBtn.addEventListener("click", () => {
    const text = displayEl.textContent;
    (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject())
      .catch(() => {
        const ta = document.createElement("textarea");
        ta.value = text; ta.style.position="fixed"; ta.style.opacity="0";
        document.body.appendChild(ta); ta.select();
        document.execCommand("copy"); document.body.removeChild(ta);
      })
      .finally(() => {
        copyBtn.textContent = "Copied! \u2713";
        setTimeout(() => { copyBtn.textContent = "Copy to clipboard 📋"; }, 2200);
      });
  });

  againBtn.addEventListener("click", () => {
    textarea.value = ""; charEl.textContent = "0";
    successEl.classList.add("hidden");
    introEl.classList.remove("hidden");
    textarea.focus();
  });
})();

/* ─────────────────────────────────────────────────────────
   PHOTO GALLERY LIGHTBOX
   ───────────────────────────────────────────────────────── */
(function setupGallery() {
  const lightbox = document.getElementById("lightbox");
  const overlay  = document.getElementById("lightbox-overlay");
  const lbImg    = document.getElementById("lightbox-img");
  const lbCap    = document.getElementById("lightbox-caption");
  const lbClose  = document.getElementById("lightbox-close");
  const lbPrev   = document.getElementById("lightbox-prev");
  const lbNext   = document.getElementById("lightbox-next");
  let items = [], cur = 0;

  function open(i) {
    items = Array.from(document.querySelectorAll(".gallery__item"));
    cur = i; show();
    lightbox.classList.remove("hidden");
    overlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    lbClose.focus();
  }
  function close() {
    lightbox.classList.add("hidden"); overlay.classList.add("hidden");
    document.body.style.overflow = "";
    const lbVid = document.getElementById("lightbox-video");
    if (lbVid) lbVid.pause();
  }
  function show() {
    const item = items[cur];
    const media = item.querySelector("img, video");
    const cap  = item.querySelector("figcaption");
    const lbVid = document.getElementById("lightbox-video");
    
    if (media && media.tagName === "VIDEO") {
      lbImg.classList.add("hidden");
      if (lbVid) {
        lbVid.classList.remove("hidden");
        lbVid.src = media.src;
      }
    } else if (media) {
      if (lbVid) lbVid.classList.add("hidden");
      lbImg.classList.remove("hidden");
      lbImg.src = media.src;
      lbImg.alt = media.alt || "";
    }
    lbCap.textContent = cap ? cap.textContent : "";
  }

  document.querySelectorAll(".gallery__item").forEach((item, i) => {
    item.setAttribute("tabindex","0"); item.setAttribute("role","button");
    item.addEventListener("click", () => open(i));
    item.addEventListener("keydown", e => { if (e.key==="Enter"||e.key===" "){ e.preventDefault(); open(i); } });
  });

  lbClose.addEventListener("click", close);
  overlay.addEventListener("click", close);
  lbPrev.addEventListener("click", () => { cur=(cur-1+items.length)%items.length; show(); });
  lbNext.addEventListener("click", () => { cur=(cur+1)%items.length; show(); });
  document.addEventListener("keydown", e => {
    if (lightbox.classList.contains("hidden")) return;
    if (e.key==="Escape") close();
    if (e.key==="ArrowLeft") lbPrev.click();
    if (e.key==="ArrowRight") lbNext.click();
  });
})();

/* ─────────────────────────────────────────────────────────
   MUSIC TOGGLE
   ───────────────────────────────────────────────────────── */
(function setupMusic() {
  const btn   = document.getElementById("music-toggle");
  const audio = document.getElementById("bg-music");
  audio.volume = 0.4;
  
  btn.addEventListener("click", () => {
    if (!audio.paused) { 
      audio.pause(); 
    } else { 
      audio.play().catch(()=>{}); 
    }
  });

  audio.addEventListener("play", () => {
    btn.textContent = "🔊"; // Speaker icon
    btn.classList.add("playing");
  });
  
  audio.addEventListener("pause", () => {
    btn.textContent = "🎵"; // Music note icon
    btn.classList.remove("playing");
  });
})();

/* ─────────────────────────────────────────────────────────
   RESET / REPLAY
   ───────────────────────────────────────────────────────── */
function resetAll() {
  // Balloons
  balloonsInitialised = false; poppedCount = 0;
  document.getElementById("balloon-message").innerHTML = "";
  document.getElementById("to-wish-btn").classList.add("hidden");
  const surprisePhoto = document.getElementById("balloon-surprise-photo");
  if (surprisePhoto) {
    surprisePhoto.classList.remove("show");
    surprisePhoto.classList.add("hidden");
  }

  // Wish sections
  [1,2,3].forEach(n => {
    wishState[n] = "pending";
    if (wishTokens[n]) wishTokens[n].cancelled = true;
    wishTokens[n] = null;
    const area = document.getElementById(`wish${n}-area`);
    if (area) area.innerHTML = "";
    const next = document.getElementById(n===3?"wish3-next":`wish${n}-next`);
    if (next) next.disabled = true;
    const skip = document.getElementById(`wish${n}-skip`);
    if (skip) skip.classList.add("hidden");
  });

  // Cake
  document.getElementById("flame").classList.remove("blown-out");
  document.getElementById("cake-hint").classList.remove("hidden");
  document.getElementById("cake-blown").classList.add("hidden");
  document.querySelectorAll(".smoke-puff").forEach(e => e.remove());
  candleBlown = false;
  
  const closingMsg = document.getElementById("closing-message");
  if (closingMsg) {
    closingMsg.classList.add("hidden");
    closingMsg.classList.remove("fade-up");
  }

  // Note form
  const noteIntro = document.getElementById("note-intro");
  const noteSucc  = document.getElementById("note-success");
  const noteTxt   = document.getElementById("note-text");
  const noteChars = document.getElementById("note-chars");
  if (noteIntro) noteIntro.classList.remove("hidden");
  if (noteSucc)  noteSucc.classList.add("hidden");
  if (noteTxt)   noteTxt.value = "";
  if (noteChars) noteChars.textContent = "0";
}

/* ─────────────────────────────────────────────────────────
   UTILITY
   ───────────────────────────────────────────────────────── */
function shadeColour(hex, amount) {
  const num = parseInt(hex.replace("#",""),16);
  const r = Math.min(255,Math.max(0,(num>>16)+amount));
  const g = Math.min(255,Math.max(0,((num>>8)&0x00ff)+amount));
  const b = Math.min(255,Math.max(0,(num&0x0000ff)+amount));
  return `#${((r<<16)|(g<<8)|b).toString(16).padStart(6,"0")}`;
}
function hexToRgba(hex, alpha) {
  const n = parseInt(hex.replace("#",""),16);
  return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${alpha})`;
}
