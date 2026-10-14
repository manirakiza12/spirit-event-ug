'use strict';
const toggle=document.querySelector('#navToggle'),menu=document.querySelector('#mobileMenu');
function closeMenu(){menu.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation menu');}
toggle.addEventListener('click',()=>{menu.hidden=!menu.hidden;toggle.setAttribute('aria-expanded',String(!menu.hidden));toggle.setAttribute('aria-label',menu.hidden?'Open navigation menu':'Close navigation menu');});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
window.matchMedia('(min-width:1100px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
document.querySelector('#year').textContent=new Date().getFullYear();
const email=window.SPIRIT_CONFIG?.email?.trim();
if(email&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){const a=document.createElement('a');a.href='mailto:'+email;a.textContent=email;document.querySelector('#businessEmail').replaceWith(a);}
const viewer=document.querySelector('#imageViewer');
document.querySelectorAll('[data-image]').forEach(b=>b.addEventListener('click',()=>{document.querySelector('#viewerImage').src=b.dataset.image;document.querySelector('#viewerImage').alt=b.dataset.caption;document.querySelector('#viewerCaption').textContent=b.dataset.caption;viewer.showModal();}));
document.querySelector('#closeViewer').addEventListener('click',()=>viewer.close());viewer.addEventListener('click',e=>{if(e.target===viewer)viewer.close();});
const form=document.querySelector('#bookingForm'),feedback=document.querySelector('#formFeedback'),send=document.querySelector('#sendEnquiry');
const today=()=>{const parts=new Intl.DateTimeFormat('en',{timeZone:'Africa/Kampala',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());const part=n=>parts.find(p=>p.type===n).value;return part('year')+'-'+part('month')+'-'+part('day');};
form.elements.date.min=today();
function invalidatePrepared(){send.hidden=true;send.removeAttribute('href');feedback.textContent='';}
document.querySelectorAll('[data-equipment]').forEach(a=>a.addEventListener('click',()=>{form.elements.equipment.value=a.dataset.equipment;invalidatePrepared();}));
form.addEventListener('input',invalidatePrepared);form.addEventListener('change',invalidatePrepared);
form.addEventListener('submit',e=>{
 e.preventDefault();invalidatePrepared();const f=form.elements,value=n=>f[n].value.trim();
 const errors={name:value('name').length<2?'Please enter your full name.':'',phone:!/^\+?[\d\s()\-]{9,25}$/.test(value('phone'))||value('phone').replace(/\D/g,'').length<9||value('phone').replace(/\D/g,'').length>15?'Please enter a valid phone number.':'',email:value('email')&&!f.email.validity.valid?'Please enter a valid email address.':'',eventType:!value('eventType')?'Please select an event type.':'',date:!value('date')||!f.date.validity.valid||value('date')<today()?'Choose an event date from today onwards.':'',location:!value('location')?'Please enter the event location.':'',equipment:!value('equipment')?'Please tell us the equipment you need.':'',guests:!f.guests.validity.valid?'Please enter a whole guest count from 1 to 1,000,000.':''};
 let first;Object.entries(errors).forEach(([name,error])=>{f[name].setAttribute('aria-invalid',String(!!error));f[name].setAttribute('aria-describedby','error-'+name);document.querySelector('#error-'+name).textContent=error;if(error&&!first)first=f[name];});
 if(first){feedback.textContent='Please check the highlighted fields.';first.focus();return;}
 const labels={name:'Full name',phone:'Phone',email:'Email',eventType:'Event type',date:'Event date',location:'Event location',equipment:'Equipment required',guests:'Estimated guests',message:'Additional message'},lines=['Hello Spirit Events Uganda! I would like a quote for my event.',''];
 Object.entries(labels).forEach(([name,label])=>{if(value(name))lines.push(label+': '+value(name));});lines.push('','Please confirm equipment availability and pricing.');
 send.href='https://wa.me/256756408204?text='+encodeURIComponent(lines.join('\n'));send.hidden=false;feedback.textContent='Your message is ready. Open WhatsApp below, then press Send in WhatsApp. Nothing has been sent or stored by this website.';send.focus();
});
document.querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{img.classList.add('image-unavailable');img.alt='Image unavailable — '+img.alt;}));
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)document.querySelectorAll('.desktop-links a').forEach(a=>a.classList.toggle('active',a.hash==='#'+e.target.id));}),{rootMargin:'-15% 0px -65% 0px'});document.querySelectorAll('main section[id]').forEach(s=>observer.observe(s));}
