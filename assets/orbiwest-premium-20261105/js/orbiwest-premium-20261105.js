
document.documentElement.classList.add('js');
(() => {
 const btn=document.querySelector('[data-nav-toggle]'), nav=document.querySelector('#primary-nav');
 if(btn&&nav)btn.addEventListener('click',()=>{const o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',String(o));});
 const y=document.querySelector('[data-year]'); if(y)y.textContent=new Date().getFullYear();
 const els=[...document.querySelectorAll('[data-reveal]')];
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver'in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.08});
  els.forEach(el=>io.observe(el));
 } else els.forEach(el=>el.classList.add('in'));
})();
