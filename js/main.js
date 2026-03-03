/**
 * Data Analyst Consultant - Shared JS
 * Handles: page load, nav active state, cursor, hero canvas, scroll reveal, FAQ, contact form
 */
(function() {
  'use strict';

  // ── PAGE FADE-IN ──
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });

  // ── ACTIVE NAV (based on data-page on body) ──
  const pageId = document.body.getAttribute('data-page');
  if (pageId) {
    document.querySelectorAll('.nav-links a[data-nav]').forEach(function(a) {
      if (a.getAttribute('data-nav') === pageId) a.classList.add('active');
    });
  }

  // ── REMOVE CURSOR ON MOBILE ──
  if (window.innerWidth <= 900) {
    document.querySelector('.cursor')?.remove();
    document.querySelector('.cursor-ring')?.remove();
  }

  // ── CURSOR ──
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  if (cursor && cursorRing && window.innerWidth > 900) {
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
      cursorRing.style.left = mouseX + 'px';
      cursorRing.style.top = mouseY + 'px';
    });
    document.querySelectorAll('a, button, .service-card, .portfolio-card, .faq-question').forEach(function(el) {
      el.addEventListener('mouseenter', function() {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursorRing.style.width = '60px';
        cursorRing.style.height = '60px';
      });
      el.addEventListener('mouseleave', function() {
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        cursorRing.style.width = '36px';
        cursorRing.style.height = '36px';
      });
    });
  }

  // ── HERO CANVAS (home page only) ──
  const canvas = document.getElementById('heroCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function Particle() {
      this.reset = function() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.alpha = Math.random() * 0.5 + 0.1;
        this.size = Math.random() * 1.5 + 0.5;
        this.color = Math.random() > 0.6 ? '201,168,76' : '0,212,255';
      };
      this.reset();
      this.update = function() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
      };
      this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + this.color + ',' + this.alpha + ')';
        ctx.fill();
      };
    }

    for (var i = 0; i < 120; i++) particles.push(new Particle());

    function drawConnections() {
      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var dx = particles[i].x - particles[j].x;
          var dy = particles[i].y - particles[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = 'rgba(201,168,76,' + (0.06 * (1 - dist / 100)) + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animateCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(function(p) { p.update(); p.draw(); });
      drawConnections();
      requestAnimationFrame(animateCanvas);
    }
    animateCanvas();
  }

  // ── NAV SCROLL ──
  var nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function() {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  // ── HAMBURGER ──
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('mobile-open');
    });
  }

  // ── SMOOTH SCROLL FOR LINKS (same page only) ──
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var href = link.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        if (navLinks) navLinks.classList.remove('mobile-open');
      }
    });
  });

  // ── SCROLL REVEAL ──
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.1, rootMargin: '20px' });
    reveals.forEach(function(el) { observer.observe(el); });
    
    // manually trigger for elements already visible
    reveals.forEach(function(el) { 
      if(el.getBoundingClientRect().top < window.innerHeight) el.classList.add('visible'); 
    });
  }

  // ── COUNTER ANIMATION ──
  var counters = document.querySelectorAll('.counter');
  if (counters.length) {
    function animateCounter(el, target, duration) {
      duration = duration || 1800;
      var start = 0;
      function step(timestamp) {
        if (!start) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        var ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(ease * target);
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    var counterObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          animateCounter(e.target, parseInt(e.target.dataset.target, 10));
          counterObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function(el) { counterObserver.observe(el); });
  }

  // ── FAQ ACCORDION ──
  var faqBtns = document.querySelectorAll('.faq-question');
  if (faqBtns.length) {
    faqBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var item = btn.parentElement;
        var answer = item.querySelector('.faq-answer');
        var isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(function(i) {
          i.classList.remove('open');
          var a = i.querySelector('.faq-answer');
          if (a) a.style.maxHeight = '0';
        });
        if (!isOpen && answer) {
          item.classList.add('open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  }

  // ── CONTACT FORM ──
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    var FORMSPREE_ENDPOINT = '';
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var name = document.getElementById('fname').value.trim();
      var email = document.getElementById('femail').value.trim();
      var company = document.getElementById('fcompany').value.trim();
      var msg = document.getElementById('fmessage').value.trim();
      var status = document.getElementById('formStatus');
      var btn = document.getElementById('formSubmitBtn');

      if (!name || !email || !msg) {
        status.textContent = 'Please fill in name, email, and message.';
        status.className = 'form-status error';
        return;
      }

      if (FORMSPREE_ENDPOINT) {
        btn.disabled = true;
        status.textContent = 'Sending...';
        status.className = 'form-status';
        fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        })
        .then(function(res) {
          if (res.ok) {
            status.textContent = "Message sent. I'll get back to you within 24 hours.";
            status.className = 'form-status success';
            contactForm.reset();
          } else {
            status.textContent = 'Something went wrong. Please email me directly.';
            status.className = 'form-status error';
          }
        })
        .catch(function() {
          status.textContent = 'Network error. Please try emailing me directly.';
          status.className = 'form-status error';
        })
        .then(function() { btn.disabled = false; });
      } else {
        var body = msg + '\n\n—\nFrom: ' + name + '\nEmail: ' + email + (company ? '\nCompany: ' + company : '');
        window.location.href = 'mailto:reubenanalytics14@gmail.com?subject=Consultation Enquiry from ' + encodeURIComponent(name) + '&body=' + encodeURIComponent(body);
        status.textContent = 'Your email client will open. Send the draft to complete.';
        status.className = 'form-status success';
      }
    });
  }
})();