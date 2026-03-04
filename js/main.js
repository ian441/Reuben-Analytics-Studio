/**
 * Data Analyst Consultant - Optimized JS
 * Handles: page load, nav active state, cursor (desktop only), hero canvas (desktop only),
 * scroll reveal with IntersectionObserver, FAQ, contact form
 */
(function() {
  'use strict';

  // ── UTILITIES ──
  const isMobile = () => window.innerWidth <= 900;
  const isHomePage = () => document.getElementById('heroCanvas') !== null;
  
  // ── PAGE FADE-IN ──
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });

  // ── ACTIVE NAV (based on data-page on body) ──
  const pageId = document.body.getAttribute('data-page');
  if (pageId) {
    document.querySelectorAll('.nav-links a[data-nav]').forEach(a => {
      if (a.getAttribute('data-nav') === pageId) a.classList.add('active');
    });
  }

  // ── REMOVE CURSOR ELEMENTS ON MOBILE ──
  if (isMobile()) {
    document.querySelector('.cursor')?.remove();
    document.querySelector('.cursor-ring')?.remove();
  }

  // ── CURSOR (DESKTOP ONLY) ──
  if (!isMobile()) {
    const cursor = document.getElementById('cursor');
    const cursorRing = document.getElementById('cursorRing');
    
    if (cursor && cursorRing) {
      // Use requestAnimationFrame for smoother cursor movement
      let mouseX = 0, mouseY = 0;
      let rafId = null;
      
      const updateCursor = () => {
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        cursorRing.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        rafId = null;
      };
      
      document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!rafId) {
          rafId = requestAnimationFrame(updateCursor);
        }
      });
      
      // Optimize hover effects with event delegation
      document.addEventListener('mouseenter', (e) => {
        const target = e.target.closest('a, button, .service-card, .portfolio-card, .faq-question');
        if (target) {
          cursor.style.width = '20px';
          cursor.style.height = '20px';
          cursorRing.style.width = '60px';
          cursorRing.style.height = '60px';
        }
      }, true);
      
      document.addEventListener('mouseleave', (e) => {
        const target = e.target.closest('a, button, .service-card, .portfolio-card, .faq-question');
        if (target) {
          cursor.style.width = '10px';
          cursor.style.height = '10px';
          cursorRing.style.width = '36px';
          cursorRing.style.height = '36px';
        }
      }, true);
    }
  }

  // ── HERO CANVAS (DESKTOP ONLY) ──
  const canvas = document.getElementById('heroCanvas');
  if (canvas && !isMobile()) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrame;
    let canvasWidth, canvasHeight;
    
    // Debounced resize
    let resizeTimeout;
    const resizeCanvas = () => {
      canvasWidth = canvas.offsetWidth;
      canvasHeight = canvas.offsetHeight;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    };
    
    resizeCanvas();
    
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    });

    function Particle() {
      this.reset = function() {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.vx = (Math.random() - 0.5) * 0.3; // Slightly slower movement
        this.vy = (Math.random() - 0.5) * 0.3;
        this.alpha = Math.random() * 0.4 + 0.1;
        this.size = Math.random() * 1.2 + 0.5;
        this.color = Math.random() > 0.6 ? '201,168,76' : '0,212,255';
      };
      this.reset();
      this.update = function() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvasWidth || this.y < 0 || this.y > canvasHeight) this.reset();
      };
      this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + this.color + ',' + this.alpha + ')';
        ctx.fill();
      };
    }

    // Reduce particle count for better performance
    for (let i = 0; i < 80; i++) particles.push(new Particle());

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) { // Reduced connection distance
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = 'rgba(201,168,76,' + (0.04 * (1 - dist / 80)) + ')';
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }
    }

    function animateCanvas() {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      
      // Batch operations for better performance
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      drawConnections();
      
      animationFrame = requestAnimationFrame(animateCanvas);
    }
    
    animateCanvas();
    
    // Clean up animation on page hide
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && animationFrame) {
        cancelAnimationFrame(animationFrame);
      } else if (!document.hidden) {
        animateCanvas();
      }
    });
  } else if (canvas && isMobile()) {
    // Remove canvas completely on mobile to save resources
    canvas.remove();
  }

  // ── NAV SCROLL WITH RAF ──
  const nav = document.getElementById('nav');
  if (nav) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          nav.classList.toggle('scrolled', window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ── HAMBURGER ──
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('mobile-open');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('mobile-open')) {
        navLinks.classList.remove('mobile-open');
      }
    });
  }

  // ── SMOOTH SCROLL FOR LINKS ──
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        if (navLinks) navLinks.classList.remove('mobile-open');
      }
    });
  });

  // ── OPTIMIZED SCROLL REVEAL WITH INTERSECTION OBSERVER ──
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    // Use a single observer with optimized thresholds
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Unobserve after revealing to save resources
          observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.1, 
      rootMargin: '50px' // Slightly larger margin for pre-loading
    });
    
    reveals.forEach(el => observer.observe(el));
  }

  // ── COUNTER ANIMATION ──
  const counters = document.querySelectorAll('.counter');
  if (counters.length) {
    const animateCounter = (el, target, duration = 1800) => {
      let start = null;
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(ease * target);
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.target, 10);
          if (!isNaN(target)) {
            animateCounter(entry.target, target);
          }
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(el => counterObserver.observe(el));
  }

  // ── FAQ ACCORDION ──
  const faqBtns = document.querySelectorAll('.faq-question');
  if (faqBtns.length) {
    faqBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const item = this.parentElement;
        const answer = item.querySelector('.faq-answer');
        const isOpen = item.classList.contains('open');
        
        // Close all others first
        document.querySelectorAll('.faq-item.open').forEach(openItem => {
          if (openItem !== item) {
            openItem.classList.remove('open');
            const openAnswer = openItem.querySelector('.faq-answer');
            if (openAnswer) openAnswer.style.maxHeight = '0';
          }
        });
        
        // Toggle current
        if (!isOpen && answer) {
          item.classList.add('open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        } else if (answer) {
          item.classList.remove('open');
          answer.style.maxHeight = '0';
        }
      });
    });
  }

  // ── CONTACT FORM ──
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const FORMSPREE_ENDPOINT = ''; // Add your Formspree endpoint here
    
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('fname')?.value.trim() || '';
      const email = document.getElementById('femail')?.value.trim() || '';
      const company = document.getElementById('fcompany')?.value.trim() || '';
      const msg = document.getElementById('fmessage')?.value.trim() || '';
      const status = document.getElementById('formStatus');
      const btn = document.getElementById('formSubmitBtn');
      
      if (!status || !btn) return;
      
      if (!name || !email || !msg) {
        status.textContent = 'Please fill in name, email, and message.';
        status.className = 'form-status error';
        return;
      }
      
      // Basic email validation
      if (!email.includes('@') || !email.includes('.')) {
        status.textContent = 'Please enter a valid email address.';
        status.className = 'form-status error';
        return;
      }

      if (FORMSPREE_ENDPOINT) {
        btn.disabled = true;
        status.textContent = 'Sending...';
        status.className = 'form-status';
        
        try {
          const formData = new FormData();
          formData.append('name', name);
          formData.append('email', email);
          formData.append('company', company);
          formData.append('message', msg);
          
          const response = await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
          });
          
          if (response.ok) {
            status.textContent = "Message sent. I'll get back to you within 24 hours.";
            status.className = 'form-status success';
            contactForm.reset();
          } else {
            throw new Error('Form submission failed');
          }
        } catch (error) {
          status.textContent = 'Something went wrong. Please email me directly.';
          status.className = 'form-status error';
        } finally {
          btn.disabled = false;
        }
      } else {
        // Fallback to mailto
        const body = `${msg}\n\n—\nFrom: ${name}\nEmail: ${email}${company ? '\nCompany: ' + company : ''}`;
        window.location.href = `mailto:reubenanalytics14@gmail.com?subject=Consultation Enquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(body)}`;
        status.textContent = 'Your email client will open. Send the draft to complete.';
        status.className = 'form-status success';
      }
    });
  }

  // ── LAZY LOAD BACKGROUND IMAGES (if any) ──
  if ('IntersectionObserver' in window) {
    const lazyBackgrounds = document.querySelectorAll('[data-bg]');
    if (lazyBackgrounds.length) {
      const bgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const bg = entry.target.dataset.bg;
            if (bg) {
              entry.target.style.backgroundImage = `url(${bg})`;
            }
            bgObserver.unobserve(entry.target);
          }
        });
      });
      lazyBackgrounds.forEach(el => bgObserver.observe(el));
    }
  }
})();