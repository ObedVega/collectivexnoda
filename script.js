const products = [
  {id:1,name:'Inner Garden',artist:'Cell sample · In collaboration with Elena Ruiz',type:'original',price:'$1,800',image:'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=900&q=85',description:'A layered composition that transforms an image of tissue into an intimate landscape. An original artwork, hand-finished over an archival print.'},
  {id:2,name:'Threshold',artist:'Epithelial tissue · Edition of 30',type:'print',price:'From $95',image:'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=900&q=85',description:'A structure of soft boundaries that reminds us every border is in motion. Fine art print available to order in several sizes.'},
  {id:3,name:'What Remains',artist:'Cell sample · In collaboration with Mara Cole',type:'original',price:'$2,400',image:'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=900&q=85',description:'Pigment and form layered over a microscopic image of tissue. The framed original comes with its observation notes.'},
  {id:4,name:'Color Field 04',artist:'Histology sample · Edition of 50',type:'print',price:'From $80',image:'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=900&q=85',description:'An image of tissue becomes an expansive field of color. Archival print made to order with pigment inks.'},
  {id:5,name:'Body of Water',artist:'Cell sample · One-of-a-kind original',type:'original',price:'$1,650',image:'https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&w=900&q=85',description:'An abstraction of membranes, movement and light. An original from the founding collection, available to collectors and institutions.'},
  {id:6,name:'Another Scale',artist:'Histology sample · Edition of 30',type:'print',price:'From $110',image:'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=900&q=85',description:'A close observation that opens a new reading of form. Made-to-order fine art print in selected sizes.'}
];

const grid=document.querySelector('#product-grid');
const dialog=document.querySelector('#product-dialog');
const renderProducts=(filter='all')=>{
  const list=filter==='all'?products:products.filter(p=>p.type===filter);
  grid.innerHTML=list.map((p,i)=>`<article class="product-card" tabindex="0" role="button" aria-label="View details for ${p.name}" data-id="${p.id}" style="animation-delay:${i*45}ms"><div class="product-image"><img src="${p.image}" alt="Artwork: ${p.name}" loading="lazy"><span class="badge">${p.type==='original'?'Original artwork':'Made-to-order print'}</span><span class="quick-view" aria-hidden="true">↗</span></div><div class="product-info"><div><h3 class="product-name">${p.name}</h3><div class="product-meta">${p.artist}</div></div><span class="product-price">${p.price}</span></div></article>`).join('');
};
renderProducts();
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{document.querySelector('.filter.active')?.classList.remove('active');button.classList.add('active');renderProducts(button.dataset.filter)}));
const openProduct=id=>{const p=products.find(item=>item.id===Number(id));if(!p)return;dialog.querySelector('.dialog-content').innerHTML=`<img src="${p.image}" alt="Artwork: ${p.name}"><div class="dialog-copy"><p class="eyebrow"><span class="eyebrow-line"></span>${p.type==='original'?'Original artwork':'Archival edition'}</p><h3>${p.name}</h3><p class="dialog-meta">${p.artist}</p><p class="dialog-description">${p.description}</p><p class="dialog-price">${p.price}</p><a class="button button-dark" href="mailto:hello@livingmatter.art?subject=${encodeURIComponent('I am interested in: '+p.name)}">Ask about availability <span>↗</span></a></div>`;dialog.showModal()};
grid.addEventListener('click',event=>{const card=event.target.closest('.product-card');if(card)openProduct(card.dataset.id)});
grid.addEventListener('keydown',event=>{const card=event.target.closest('.product-card');if(card&&(event.key==='Enter'||event.key===' ')){event.preventDefault();openProduct(card.dataset.id)}});
dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
const menuButton=document.querySelector('.menu-toggle');
menuButton.addEventListener('click',()=>{const nav=document.querySelector('.main-nav');const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open))});
document.querySelectorAll('.main-nav a').forEach(link=>link.addEventListener('click',()=>{document.querySelector('.main-nav').classList.remove('open');menuButton.setAttribute('aria-expanded','false')}));
