const artworks=[
 {id:1,name:'Inner Garden',sample:'Cell sample / collaboration with Elena Ruiz',type:'original',price:'$1,800',colors:['#ff7793','#ffc16f','#7d36a7'],copy:'A layered composition inspired by a real tissue sample. The original is hand-finished by the artist and presented as a one-of-a-kind work.'},
 {id:2,name:'Threshold',sample:'Epithelial tissue / edition of 30',type:'print',price:'From $95',colors:['#6f83ff','#b6fd72','#ffcf57'],copy:'Soft boundaries, shifting structures. A fine art print made to order in selected sizes.'},
 {id:3,name:'What Remains',sample:'Cell sample / collaboration with Mara Cole',type:'original',price:'$2,400',colors:['#ff9562','#f857a6','#5446ae'],copy:'Pigment and form meet a microscopic image of tissue in this framed original, accompanied by its sample notes.'},
 {id:4,name:'Color Field 04',sample:'Histology sample / edition of 50',type:'print',price:'From $80',colors:['#4ed4ae','#e5f85d','#5f6fff'],copy:'An image of tissue becomes an expansive field of color. Archival print produced to order with pigment inks.'},
 {id:5,name:'Body of Water',sample:'Cell sample / one-of-a-kind original',type:'original',price:'$1,650',colors:['#536aff','#ff70a4','#ffcb76'],copy:'An abstraction of membranes, movement and light. An original from the first collection, available to collectors and institutions.'},
 {id:6,name:'Another Scale',sample:'Histology sample / edition of 30',type:'print',price:'From $110',colors:['#bb75ff','#74e9da','#e9f25b'],copy:'A close observation opens a new reading of form. Made-to-order fine art print in selected sizes.'}
];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
function cellSvg(item,index){
 const [a,b,c]=item.colors,uid=`g${item.id}${index}`;
 const blobs=[
  `<path d="M78 152C52 91 111 41 165 57c40-32 100 2 96 48 31 40 1 95-40 104-30 50-99 35-114 0-35-1-47-25-29-57Z" fill="url(#${uid})"/>`,
  `<path d="M162 40c35 10 73 34 83 71 12 41-17 98-58 111-45 14-108-5-125-49-16-41 13-99 53-119 13-7 30-19 47-14Z" fill="url(#${uid})"/>`,
  `<path d="M78 65c39-32 109-24 144 11 32 33 49 84 19 124-31 42-98 56-147 31-45-22-60-82-42-126 6-15 14-29 26-40Z" fill="url(#${uid})"/>`
 ][(index+item.id)%3];
 const dots=Array.from({length:20},(_,i)=>{const x=35+(i*67+item.id*39)%230,y=28+(i*43+item.id*61)%220,r=2+(i*7%7);return `<circle cx="${x}" cy="${y}" r="${r}" fill="${i%3===0?'#fff':c}" opacity=".${i%5+3}"/>`}).join('');
 return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Colorful abstract cell artwork for ${esc(item.name)}"><defs><linearGradient id="${uid}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${a}"/><stop offset=".52" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient><radialGradient id="bg${uid}"><stop stop-color="${b}"/><stop offset="1" stop-color="${a}"/></radialGradient><filter id="blur${uid}"><feGaussianBlur stdDeviation="12"/></filter></defs><rect width="300" height="300" fill="url(#bg${uid})"/><circle cx="235" cy="42" r="87" fill="${c}" opacity=".5" filter="url(#blur${uid})"/>${blobs}<path d="M90 148c20-45 47-54 79-37 32-9 62 16 48 48-4 36-46 56-73 39-35 10-69-13-54-50Z" fill="none" stroke="#fff" stroke-opacity=".8" stroke-width="2"/><path d="M102 147c18-26 44-28 61-17 22-8 41 9 33 29-9 24-35 30-51 17-22 8-49-6-43-29Z" fill="${c}" opacity=".63" stroke="#fff" stroke-width="2"/><circle cx="154" cy="151" r="15" fill="${a}" stroke="#fff" stroke-width="3"/>${dots}<path d="M10 250c65-20 125 22 280-6" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="1"/><text x="17" y="280" fill="#fff" font-family="monospace" font-size="8" letter-spacing="2">BIOLOGY / ART / ${String(item.id).padStart(2,'0')}</text></svg>`;
}
const grid=document.querySelector('#art-grid'),dialog=document.querySelector('#art-dialog');
function render(filter='all'){
 const list=filter==='all'?artworks:artworks.filter(x=>x.type===filter);
 grid.innerHTML=list.map((x,i)=>`<article class="art-card" role="button" tabindex="0" data-id="${x.id}" aria-label="View ${esc(x.name)}" style="animation-delay:${i*45}ms"><div class="art-visual">${cellSvg(x,i)}<span class="art-badge">${x.type==='original'?'One-of-a-kind original':'Made-to-order print'}</span></div><div class="art-info"><div><h3>${esc(x.name)}</h3><div class="art-meta">${esc(x.sample)}</div></div><span class="art-price">${esc(x.price)}</span></div></article>`).join('');
}
render();
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{document.querySelector('.filter.active')?.classList.remove('active');button.classList.add('active');render(button.dataset.filter)}));
function show(id){const x=artworks.find(a=>a.id===Number(id));if(!x)return;dialog.querySelector('.dialog-inner').innerHTML=`${cellSvg(x,10)}<div class="dialog-copy"><p class="eyebrow"><span class="pulse"></span> ${x.type==='original'?'ORIGINAL ARTWORK':'PRINT EDITION'}</p><h3>${esc(x.name)}</h3><p class="dialog-meta">${esc(x.sample)}</p><p class="description">${esc(x.copy)}</p><p class="dialog-price">${esc(x.price)}</p><a class="pill-button" href="mailto:hello@fieldnotes.art?subject=${encodeURIComponent('Artwork inquiry: '+x.name)}">Ask about this piece <span>↗</span></a></div>`;dialog.showModal()}
grid.addEventListener('click',e=>{const card=e.target.closest('.art-card');if(card)show(card.dataset.id)});
grid.addEventListener('keydown',e=>{const card=e.target.closest('.art-card');if(card&&(e.key==='Enter'||e.key===' ')){e.preventDefault();show(card.dataset.id)}});
dialog.querySelector('.dialog-x').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
const menu=document.querySelector('.menu');menu.addEventListener('click',()=>{const open=document.querySelector('.nav').classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{document.querySelector('.nav').classList.remove('open');menu.setAttribute('aria-expanded','false')}));
