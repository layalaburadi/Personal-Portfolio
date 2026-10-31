'use strict';
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
function closeMenu(){nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open navigation');menuButton.textContent='☰';}
menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');menuButton.textContent=open?'✕':'☰';});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape' && nav.classList.contains('open')){closeMenu();menuButton.focus();}});
document.addEventListener('click',event=>{if(!event.target.closest('.nav-wrap'))closeMenu();});
const themeButton=document.querySelector('.theme-toggle');
function setTheme(theme){document.documentElement.dataset.theme=theme;themeButton.textContent=theme==='dark'?'☀':'☾';themeButton.setAttribute('aria-label',`Switch to ${theme==='dark'?'light':'dark'} mode`);document.querySelector('meta[name="theme-color"]').content=theme==='dark'?'#080b16':'#f7f8fd';}
let savedTheme;try{savedTheme=localStorage.getItem('portfolio-theme');}catch{}
setTheme(savedTheme==='light'?'light':'dark');
themeButton.addEventListener('click',()=>{const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';setTheme(theme);try{localStorage.setItem('portfolio-theme',theme);}catch{}});
document.querySelector('#year').textContent=new Date().getFullYear();
const motion=matchMedia('(prefers-reduced-motion: reduce)');
const role=document.querySelector('#typed-role');
// Preserve the original academic title without rotating to other descriptions.
role.textContent = 'Computer Science Student';
document.querySelector('.cursor').hidden = true;
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));document.querySelectorAll('[data-category]').forEach(card=>card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter);}));
const sections=[...document.querySelectorAll('main>section[id]')];
const navLinks=[...nav.querySelectorAll('a')];
const backTop=document.querySelector('.back-top');
let scrolling=false;
function updateNavigation(){const marker=window.scrollY+150;let current=sections[0].id;for(const section of sections){if(section.offsetTop<=marker)current=section.id;}navLinks.forEach(link=>{if(link.hash==='#'+current){if(!link.hasAttribute('aria-current'))link.setAttribute('aria-current','location');}else if(link.hasAttribute('aria-current'))link.removeAttribute('aria-current');});backTop.hidden=window.scrollY<500;scrolling=false;}
window.addEventListener('scroll',()=>{if(!scrolling){scrolling=true;requestAnimationFrame(updateNavigation);}},{passive:true});window.addEventListener('resize',updateNavigation);updateNavigation();
// Reveal individual elements once. A per-row delay keeps large galleries responsive.
const revealTargets = [...document.querySelectorAll('.section .eyebrow, .section h2, .section-copy, .about-copy, .skill-card, .project-feature, .timeline article, .cert, .language-row, .contact-buttons')];
let revealObserver;
function configureReveals() {
  revealObserver?.disconnect();
  revealTargets.forEach(element => element.classList.remove('reveal-pending'));
  if (motion.matches || !('IntersectionObserver' in window)) return;
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('reveal-pending');
      entry.target.classList.add('reveal-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
  revealTargets.forEach(element => {
    if (element.classList.contains('reveal-visible')) return;
    const siblings = [...element.parentElement.children];
    const index = siblings.filter(sibling => sibling.matches('.skill-card, .cert, .timeline article')).indexOf(element);
    element.style.setProperty('--reveal-delay', Math.max(0, index % 3) * 65 + 'ms');
    element.classList.add('reveal-pending');
    revealObserver.observe(element);
  });
}
configureReveals();
motion.addEventListener('change', configureReveals);
// Filtering must immediately expose newly selected technologies, even after a scroll reveal.
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.skill-card:not([hidden])').forEach(card => {
    revealObserver?.unobserve(card);
    card.classList.remove('reveal-pending');
    card.classList.add('reveal-visible');
  });
}));
const dialog=document.querySelector('#certificate-dialog');
const previewImage=dialog.querySelector('img');
let previewTrigger;
function openCertificate(link){if(typeof dialog.showModal!=='function')return;previewTrigger=link;previewImage.src=link.getAttribute('href');previewImage.alt=link.closest('.cert').querySelector('img').alt;document.querySelector('#preview-title').textContent=link.closest('.cert').querySelector('h3').textContent;dialog.querySelector('.original-image').href=link.href;dialog.showModal();document.body.classList.add('modal-open');}
document.querySelectorAll('.view-image').forEach(link=>link.addEventListener('click',event=>{if(typeof dialog.showModal==='function'){event.preventDefault();openCertificate(link);}}));
dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');previewTrigger?.focus();});

// A single transform-driven indicator glides between the active navigation links.
const indicator = document.createElement('span');
indicator.className = 'nav-indicator';
indicator.setAttribute('aria-hidden', 'true');
nav.append(indicator);
function updateIndicator() {
  const active = nav.querySelector('[aria-current]');
  if (!active || nav.getBoundingClientRect().width === 0) {
    indicator.style.opacity = '0';
    return;
  }
  const linkRect = active.getBoundingClientRect();
  const navRect = nav.getBoundingClientRect();
  indicator.style.opacity = '1';
  indicator.style.transform = `translateX(${linkRect.left - navRect.left}px) scaleX(${linkRect.width / 24})`;
}
new MutationObserver(updateIndicator).observe(nav, {
  subtree: true, attributes: true, attributeFilter: ['aria-current']
});
window.addEventListener('resize', updateIndicator, { passive: true });
document.fonts?.ready.then(updateIndicator);
updateIndicator();
const siteHeader = document.querySelector('.site-header');
if ('IntersectionObserver' in window) {
  const headerObserver = new IntersectionObserver(entries => {
    siteHeader.classList.toggle('is-scrolled', !entries[0].isIntersecting);
  }, { rootMargin: '-80px 0px 0px 0px' });
  headerObserver.observe(document.querySelector('.hero'));
}

// Fine-pointer-only tilt is limited to two degrees and coalesced to one frame.
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
document.querySelectorAll('.project-feature').forEach(card => {
  let frame = 0;
  let pointerX = 0;
  let pointerY = 0;
  function resetTilt() {
    cancelAnimationFrame(frame);
    frame = 0;
    card.style.removeProperty('--tilt-x');
    card.style.removeProperty('--tilt-y');
  }
  card.addEventListener('pointermove', event => {
    if (motion.matches || !finePointer.matches || event.pointerType === 'touch') return;
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const rect = card.getBoundingClientRect();
      const x = Math.max(-.5, Math.min(.5, (pointerX - rect.left) / rect.width - .5));
      const y = Math.max(-.5, Math.min(.5, (pointerY - rect.top) / rect.height - .5));
      card.style.setProperty('--tilt-x', `${-y * 4}deg`);
      card.style.setProperty('--tilt-y', `${x * 4}deg`);
    });
  }, { passive: true });
  card.addEventListener('pointerleave', resetTilt);
  card.addEventListener('pointercancel', resetTilt);
  motion.addEventListener('change', resetTilt);
  finePointer.addEventListener('change', resetTilt);
});

// Fade the full-size certificate in only after its image is ready.
function certificateReady() {
  dialog.classList.remove('image-loading');
  dialog.classList.add('image-ready');
}
previewImage.addEventListener('load', certificateReady);
previewImage.addEventListener('error', certificateReady);
new MutationObserver(() => {
  if (!dialog.open) return;
  dialog.classList.remove('image-ready');
  dialog.classList.add('image-loading');
  if (previewImage.complete) certificateReady();
}).observe(dialog, { attributes: true, attributeFilter: ['open'] });
