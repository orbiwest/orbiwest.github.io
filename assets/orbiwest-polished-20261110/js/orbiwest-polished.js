document.documentElement.classList.add('js');
(() => {
  const b=document.querySelector('[data-nav-toggle]');
  const n=document.querySelector('#nav');
  const label=b?.querySelector('.sr');
  const setOpen=(open)=>{
    if(!b||!n)return;
    n.classList.toggle('open',open);
    document.body.classList.toggle('nav-open',open);
    b.setAttribute('aria-expanded',String(open));
    b.setAttribute('aria-label',open?'Close menu':'Open menu');
    if(label)label.textContent=open?'Close menu':'Open menu';
  };
  if(b&&n){
    b.setAttribute('aria-label','Open menu');
    b.addEventListener('click',()=>setOpen(!n.classList.contains('open')));
    n.addEventListener('click',(e)=>{if(e.target.closest('a'))setOpen(false)});
    document.addEventListener('keydown',(e)=>{if(e.key==='Escape'&&n.classList.contains('open')){setOpen(false);b.focus()}});
    document.addEventListener('click',(e)=>{if(n.classList.contains('open')&&!n.contains(e.target)&&!b.contains(e.target))setOpen(false)});
    window.addEventListener('resize',()=>{if(window.innerWidth>1100)setOpen(false)},{passive:true});
  }
  const y=document.querySelector('[data-year]');
  if(y)y.textContent=new Date().getFullYear();
  const updateQuickbar=()=>document.body.classList.toggle('show-quickbar',window.scrollY>520);
  updateQuickbar();
  window.addEventListener('scroll',updateQuickbar,{passive:true});
})();

(() => {
  const footer = document.querySelector('.footer');
  const header = document.querySelector('.header');
  if (!footer || !header || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    if (window.innerWidth > 700) {
      document.body.classList.remove('footer-in-view');
      return;
    }
    const e = entries[0];
    document.body.classList.toggle('footer-in-view', e.isIntersecting && e.intersectionRatio > 0.18);
  }, { threshold: [0, .18, .35] });

  observer.observe(footer);
})();
