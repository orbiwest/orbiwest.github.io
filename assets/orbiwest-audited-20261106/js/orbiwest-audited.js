
document.documentElement.classList.add('js');
(() => {
 const b=document.querySelector('[data-nav-toggle]'), n=document.querySelector('#nav');
 if(b&&n)b.addEventListener('click',()=>{const o=n.classList.toggle('open');b.setAttribute('aria-expanded',String(o));});
 const y=document.querySelector('[data-year]'); if(y)y.textContent=new Date().getFullYear();
})();
