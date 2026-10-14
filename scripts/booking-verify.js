// Exercise the production booking handler in a small DOM harness when browser launch is restricted.
const vm=require('vm'),fs=require('fs'),assert=require('assert');
function element(){return {value:'',hidden:true,attrs:{},events:{},validity:{valid:true},setAttribute(k,v){this.attrs[k]=v;},removeAttribute(k){delete this[k];},addEventListener(k,v){this.events[k]=v;},querySelectorAll(){return [];},focus(){this.focused=true;}};}
const ids=Object.fromEntries(['navToggle','mobileMenu','year','businessEmail','imageViewer','closeViewer','bookingForm','formFeedback','sendEnquiry'].map(n=>['#'+n,element()]));
const fields=Object.fromEntries(['name','phone','email','eventType','date','location','equipment','guests','message'].map(n=>[n,element()]));ids['#bookingForm'].elements=fields;
for(const n of Object.keys(fields))ids['#error-'+n]=element();
const document={querySelector:s=>ids[s],querySelectorAll:()=>[],addEventListener:()=>{}};
vm.runInNewContext(fs.readFileSync('public/js/main.js','utf8'),{document,window:{SPIRIT_CONFIG:{email:''},matchMedia:()=>({addEventListener(){}})},Intl,Date});
const submit=()=>ids['#bookingForm'].events.submit({preventDefault(){}});
submit();assert.equal(fields.name.attrs['aria-invalid'],'true');assert(ids['#sendEnquiry'].hidden);
for(const [k,v]of Object.entries({name:'Jimmy Test',phone:'+256 756 111 222',eventType:'Wedding or introduction',date:'2027-12-20',location:'Kampala & Kira',equipment:'Sound systems, tents & chairs',guests:'150',message:'Setup please 🎤'}))fields[k].value=v;
submit();assert(!ids['#sendEnquiry'].hidden);let url=new URL(ids['#sendEnquiry'].href);assert.equal(url.pathname,'/256756408204');const text=url.searchParams.get('text');for(const part of ['Full name: Jimmy Test','Event location: Kampala & Kira','Equipment required: Sound systems, tents & chairs','Estimated guests: 150','Setup please 🎤'])assert(text.includes(part));assert(!text.includes('Email:'));
fields.email.value='person@example.com';submit();assert(new URL(ids['#sendEnquiry'].href).searchParams.get('text').includes('Email: person@example.com'));
ids['#bookingForm'].events.input();assert(ids['#sendEnquiry'].hidden);assert(!ids['#sendEnquiry'].href);
fields.date.value='2020-01-01';submit();assert.equal(fields.date.attrs['aria-invalid'],'true');assert(ids['#sendEnquiry'].hidden);
fields.date.value='2027-12-20';fields.phone.value='invalid';submit();assert.equal(fields.phone.attrs['aria-invalid'],'true');
fields.phone.value='+256756111222';fields.email.validity.valid=false;submit();assert.equal(fields.email.attrs['aria-invalid'],'true');
fields.email.validity.valid=true;fields.guests.validity.valid=false;submit();assert.equal(fields.guests.attrs['aria-invalid'],'true');
ids['#navToggle'].events.click();assert.equal(ids['#navToggle'].attrs['aria-expanded'],'true');
console.log('PASS: actual booking handler, required fields, encoded WhatsApp details, optional email, stale-message clearing, past date, phone/email/guest errors and mobile toggle. DOM harness only; browser layout verification still required.');
