/* ======================================================
   Portfolio – Abdullah Zunorain
   script.js – all interactive behaviour
   ====================================================== */

'use strict';

/* ──────────────────────────────────────────────────────
   PARTICLE CANVAS
────────────────────────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  const COLORS = ['rgba(124,58,237,', 'rgba(34,211,238,', 'rgba(245,158,11,'];

  class Particle {
    constructor() { this.reset(true); }
    reset(initial) {
      this.x  = Math.random() * W;
      this.y  = initial ? Math.random() * H : H + 10;
      this.r  = Math.random() * 1.8 + 0.4;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = -(Math.random() * 0.5 + 0.15);
      this.alpha = Math.random() * 0.5 + 0.1;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.y < -10) this.reset(false);
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
  }

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function initParts() {
    particles = Array.from({ length: 90 }, () => new Particle());
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => { resize(); initParts(); });
  resize();
  initParts();
  loop();
})();


/* ──────────────────────────────────────────────────────
   TYPING EFFECT
────────────────────────────────────────────────────── */
(function initTyping() {
  const el = document.getElementById('typingTarget');
  if (!el) return;

  const phrases = [
    'ML & Deep Learning Engineer',
    'NLP & LLM Developer',
    'Agentic AI Builder',
    'Data Scientist',
    'Electrical Engineer',
    'Open Source Enthusiast',
  ];

  let pi = 0, ci = 0, deleting = false;

  function tick() {
    const phrase = phrases[pi];
    el.textContent = deleting ? phrase.slice(0, ci--) : phrase.slice(0, ci++);

    if (!deleting && ci > phrase.length) {
      deleting = true;
      setTimeout(tick, 1400);
      return;
    }
    if (deleting && ci < 0) {
      deleting = false;
      pi = (pi + 1) % phrases.length;
      ci = 0;
      setTimeout(tick, 350);
      return;
    }
    setTimeout(tick, deleting ? 48 : 80);
  }
  tick();
})();


/* ──────────────────────────────────────────────────────
   NAVBAR – scroll + active link
────────────────────────────────────────────────────── */
(function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const hamburger= document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const links    = navLinks ? navLinks.querySelectorAll('.nav-link') : [];

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    updateActive();
  });

  // Hamburger toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
    });
    // Close on link click
    links.forEach(l => l.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }));
  }

  function updateActive() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  }
  updateActive();
})();


/* ──────────────────────────────────────────────────────
   SCROLL REVEAL
────────────────────────────────────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
})();


/* ──────────────────────────────────────────────────────
   PROJECTS DATA + RENDER
────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    icon: '🧠',
    title: 'Pea Plant Disease Detection',
    desc: 'Automated disease detection using VGG16, YOLOv8, custom CNN, Naïve Bayes & Random Forest. Comprehensive comparative study across DL and ML models.',
    tags: ['YOLOv8', 'VGG16', 'CNN', 'Deep Learning'],
    category: 'ml',
    stars: 2,
    url: 'https://github.com/abdullahzunorain/Pea_Plant_Disease_Detection_on_Various_ML_and_DL_Techniques',
  },
  {
    icon: '📈',
    title: 'UMKM Stock Forecasting App',
    desc: 'AI-powered daily stock forecasting web app for UMKM businesses. Predicts optimal stock levels to minimise daily losses.',
    tags: ['Forecasting', 'Streamlit', 'Python', 'ML'],
    category: 'ml',
    stars: 1,
    url: 'https://github.com/abdullahzunorain/umkm-forecasting-app',
  },
  {
    icon: '🧬',
    title: 'Brain Tumor Detection Desktop App',
    desc: 'Desktop application for brain tumor detection using Deep Learning. Provides a GUI for medical image analysis and classification.',
    tags: ['Deep Learning', 'TensorFlow', 'Medical AI', 'Python'],
    category: 'ml',
    stars: 1,
    url: 'https://github.com/abdullahzunorain/Desktop_App_for_Brain_Tumor_Detection_using_Deep_Learning',
  },
  {
    icon: '🌞',
    title: 'Solar Panel Defect Segmentation',
    desc: 'Semantic segmentation of defective spots on solar panels using DeepLabV3+. Enables automated quality control in renewable energy.',
    tags: ['DeepLabV3+', 'Segmentation', 'Computer Vision'],
    category: 'ml',
    stars: 0,
    url: 'https://github.com/abdullahzunorain/defective-spots-on-solar-panels-segmentation-using-Deeplabv3-',
  },
  {
    icon: '💬',
    title: 'Sentiment140 DistilBERT Fine-Tuning',
    desc: 'Fine-tuned DistilBERT on the Sentiment140 dataset for binary sentiment classification with high accuracy.',
    tags: ['DistilBERT', 'NLP', 'Fine-Tuning', 'Transformers'],
    category: 'nlp',
    stars: 0,
    url: 'https://github.com/abdullahzunorain/Sentiment140_DistilBERT_FineTuning',
  },
  {
    icon: '📰',
    title: 'BBC News Text Classification',
    desc: 'Case study on multi-class text classification of BBC news articles using classical NLP and ML techniques.',
    tags: ['Text Classification', 'NLP', 'Scikit-Learn'],
    category: 'nlp',
    stars: 1,
    url: 'https://github.com/abdullahzunorain/Case_Study_Text_Classification_of_BBC_News_Articles',
  },
  {
    icon: '🌐',
    title: 'Website NLP Preprocessing',
    desc: 'End-to-end NLP preprocessing pipeline applied to web-scraped content including tokenisation, stopword removal, stemming, and more.',
    tags: ['NLP', 'Preprocessing', 'BeautifulSoup', 'Python'],
    category: 'nlp',
    stars: 2,
    url: 'https://github.com/abdullahzunorain/Website_Preprocessing_using_NLP_Techniques',
  },
  {
    icon: '✈️',
    title: 'FlyingWhale Airline BI Analysis',
    desc: 'Business Intelligence analysis for an airline covering bookings, cancellations, loyalty data, and actionable insights.',
    tags: ['BI', 'Data Analysis', 'Excel', 'Visualisation'],
    category: 'data',
    stars: 2,
    url: 'https://github.com/abdullahzunorain/FlyingWhale_Airline_Business_Intelligence_Analysis',
  },
  {
    icon: '📊',
    title: 'Stock Data Analysis & Visualisation',
    desc: 'Financial data extraction and interactive dashboard for Tesla & GameStop using yfinance, BeautifulSoup, and Plotly.',
    tags: ['yfinance', 'Plotly', 'Python', 'Finance'],
    category: 'data',
    stars: 1,
    url: 'https://github.com/abdullahzunorain/Stock-Data-Analysis-and-Visualization-for-Investment-Firm',
  },
  {
    icon: '🗓️',
    title: 'AI Calendar Agent',
    desc: 'Agentic AI calendar assistant built with the OpenAI Agents SDK. Kaggle AI Agents competition capstone submission.',
    tags: ['AI Agents', 'OpenAI SDK', 'Agentic AI'],
    category: 'agent',
    stars: 0,
    url: 'https://github.com/abdullahzunorain/calender_agent',
  },
  {
    icon: '🏭',
    title: 'AgentFactory',
    desc: 'Platform to build digital FTEs (AI Agents) that work 24/7 — turning domain expertise in sales, legal, finance, and healthcare into autonomous agents.',
    tags: ['Agentic AI', 'LLMs', 'Autonomous Agents'],
    category: 'agent',
    stars: 0,
    url: 'https://github.com/abdullahzunorain/agentfactory',
  },
  {
    icon: '⚙️',
    title: 'Wire Prepping Machine – Proteus',
    desc: 'Embedded design of a wire-prepping machine controller using C++ and Proteus simulation. Industrial automation project.',
    tags: ['C++', 'Proteus', 'Embedded', 'Automation'],
    category: 'embedded',
    stars: 1,
    url: 'https://github.com/abdullahzunorain/wire_prepping_machine_design_using_proteus',
  },
  {
    icon: '🔐',
    title: 'Digital Door Lock – 8051 MCU',
    desc: 'Microcontroller-based digital door lock system with keypad input and EEPROM storage for secure PIN management.',
    tags: ['8051 MCU', 'C', 'Proteus', 'Embedded'],
    category: 'embedded',
    stars: 0,
    url: 'https://github.com/abdullahzunorain/Digital_Door_Lock_TASK_21',
  },
  {
    icon: '🩺',
    title: 'Diabetes Predictor Web App',
    desc: 'Machine learning web application for diabetes prediction built with Streamlit, offering an intuitive medical risk assessment tool.',
    tags: ['Streamlit', 'ML', 'Healthcare', 'Python'],
    category: 'ml',
    stars: 1,
    url: 'https://github.com/abdullahzunorain/Diabetes_Predictor_WebApp',
  },
  {
    icon: '🏀',
    title: 'Basketball Player Detector – YOLOv8',
    desc: 'Real-time basketball player detection using YOLOv8 on custom dataset. Demonstrates object detection in sports analytics.',
    tags: ['YOLOv8', 'Object Detection', 'Computer Vision'],
    category: 'ml',
    stars: 0,
    url: 'https://github.com/abdullahzunorain/BasketballPlayerDetector-YOLOv8',
  },
  {
    icon: '🌿',
    title: 'Tomato Leaf Disease Classification',
    desc: 'Deep learning model for multi-class classification of tomato leaf diseases, enabling early agricultural disease detection.',
    tags: ['Deep Learning', 'Agriculture AI', 'CNN'],
    category: 'ml',
    stars: 1,
    url: 'https://github.com/abdullahzunorain/Tomato-Leaf-Disease-Classification-Using-DL',
  },
];

(function renderProjects() {
  const grid = document.getElementById('projGrid');
  if (!grid) return;

  PROJECTS.forEach(p => {
    const card = document.createElement('div');
    card.className = 'proj-card reveal';
    card.dataset.category = p.category;
    card.innerHTML = `
      <div class="proj-top">
        <span class="proj-icon">${p.icon}</span>
        <div class="proj-links">
          <a href="${p.url}" target="_blank" rel="noopener" class="proj-link" title="View on GitHub">
            <i class="fab fa-github"></i>
          </a>
        </div>
      </div>
      <div class="proj-title">${p.title}</div>
      <div class="proj-desc">${p.desc}</div>
      <div class="proj-footer">
        <div class="proj-tags">${p.tags.map(t => `<span class="proj-tag">${t}</span>`).join('')}</div>
        ${p.stars > 0 ? `<span class="proj-stars"><i class="fas fa-star"></i> ${p.stars}</span>` : ''}
      </div>`;
    grid.appendChild(card);
  });

  // Trigger reveal for newly added cards
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  grid.querySelectorAll('.proj-card').forEach(c => obs.observe(c));
})();


/* ── Filter buttons ── */
(function initFilters() {
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.proj-card').forEach(card => {
        const match = f === 'all' || card.dataset.category === f;
        card.classList.toggle('hidden', !match);
      });
    });
  });
})();


/* ──────────────────────────────────────────────────────
   CONTACT FORM
────────────────────────────────────────────────────── */
(function initForm() {
  const form    = document.getElementById('contactForm');
  const note    = document.getElementById('formNote');
  const submitBtn = document.getElementById('submitBtn');
  if (!form) return;

  function showErr(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
  }
  function clearErrs() {
    ['nameErr','emailErr','subjectErr','msgErr'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '';
    });
    if (note) note.textContent = '';
  }
  function validateEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  form.addEventListener('submit', e => {
    e.preventDefault();
    clearErrs();

    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();
    let valid = true;

    if (!name)            { showErr('nameErr', 'Please enter your name.');  valid = false; }
    if (!validateEmail(email)) { showErr('emailErr', 'Please enter a valid email.'); valid = false; }
    if (!subject)         { showErr('subjectErr', 'Please enter a subject.'); valid = false; }
    if (!message)         { showErr('msgErr', 'Please enter a message.'); valid = false; }
    if (!valid) return;

    // Open mailto
    const mailto = `mailto:abdullahzunorain@gmail.com`
      + `?subject=${encodeURIComponent(subject)}`
      + `&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailto;

    submitBtn.textContent = '✓ Opening your email client…';
    submitBtn.disabled = true;
    if (note) note.textContent = 'Your email client should open shortly. Thank you!';

    setTimeout(() => {
      form.reset();
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      submitBtn.disabled = false;
      if (note) note.textContent = '';
    }, 4000);
  });
})();


/* ──────────────────────────────────────────────────────
   BACK TO TOP
────────────────────────────────────────────────────── */
(function initBackTop() {
  const btn = document.getElementById('backTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();


/* ──────────────────────────────────────────────────────
   GITHUB STATS (live fetch, updates hero stats if available)
────────────────────────────────────────────────────── */
(function fetchGitHubStats() {
  fetch('https://api.github.com/users/abdullahzunorain')
    .then(r => r.json())
    .then(data => {
      const repoEl = document.querySelector('.stat-n');
      if (repoEl && data.public_repos) repoEl.textContent = data.public_repos;
    })
    .catch(() => { /* silently fail – static values already shown */ });
})();
