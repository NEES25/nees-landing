/* NEES — main.js (vanilla, no modules) */

(function safe(fn, name){
  try{ fn(); }
  catch(e){ console.error('[NEES] init failed:', name || fn.name, e); }
})(function header(){
  var header = document.getElementById('header');
  if (!header) return;
  function onScroll(){
    if (window.scrollY > 8) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}, 'header');

(function safe(fn, name){
  try{ fn(); }
  catch(e){ console.error('[NEES] init failed:', name || fn.name, e); }
})(function mobileMenu(){
  var toggle = document.getElementById('menu-toggle');
  var nav = document.getElementById('main-nav');
  if (!toggle || !nav) return;

  function close(){
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
  }
  function open(){
    nav.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Cerrar menú');
  }

  toggle.addEventListener('click', function(){
    var isOpen = nav.classList.contains('is-open');
    if (isOpen) close(); else open();
  });

  nav.querySelectorAll('a').forEach(function(link){
    link.addEventListener('click', close);
  });

  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') close();
  });
}, 'mobileMenu');

(function safe(fn, name){
  try{ fn(); }
  catch(e){ console.error('[NEES] init failed:', name || fn.name, e); }
})(function accordion(){
  var items = document.querySelectorAll('.accordion-item');
  if (!items.length) return;

  items.forEach(function(item){
    var trigger = item.querySelector('.accordion-trigger');
    var panel = item.querySelector('.accordion-panel');
    if (!trigger || !panel) return;

    trigger.addEventListener('click', function(){
      var isOpen = trigger.getAttribute('aria-expanded') === 'true';

      items.forEach(function(other){
        var otherTrigger = other.querySelector('.accordion-trigger');
        var otherPanel = other.querySelector('.accordion-panel');
        if (otherTrigger && otherPanel){
          otherTrigger.setAttribute('aria-expanded', 'false');
          otherPanel.style.maxHeight = null;
        }
      });

      if (!isOpen){
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });
}, 'accordion');

(function safe(fn, name){
  try{ fn(); }
  catch(e){ console.error('[NEES] init failed:', name || fn.name, e); }
})(function reveal(){
  var els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  if (!('IntersectionObserver' in window)){
    els.forEach(function(el){ el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

  els.forEach(function(el){ observer.observe(el); });

  // Safety net: never leave content invisible
  setTimeout(function(){
    els.forEach(function(el){ el.classList.add('is-visible'); });
  }, 6000);
}, 'reveal');

(function safe(fn, name){
  try{ fn(); }
  catch(e){ console.error('[NEES] init failed:', name || fn.name, e); }
})(function footerYear(){
  var el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}, 'footerYear');
