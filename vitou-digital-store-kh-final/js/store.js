const TELEGRAM_USERNAME = 'Vitouhuot';

function render(list){
  const grid = document.getElementById('grid');
  if(!list.length){ grid.innerHTML = `<div class="empty">មិនមានផលិតផលនៅឡើយទេ</div>`; return; }
  grid.innerHTML = list.map(p => `
    <article class="card">
      <img src="${p.image || 'assets/placeholder.png'}" alt="${p.name}">
      <div class="body">
        <span class="badge">${p.tag || 'Digital'}</span>
        <h3>${p.name}</h3>
        <div class="price">$${money(p.price)}</div>
        <button class="btn btn-primary" onclick="buy('${encodeURIComponent(p.name)}','${money(p.price)}')">ទិញតាម Telegram</button>
      </div>
    </article>
  `).join('');
}

function buy(name, price){
  const text = encodeURIComponent(`Hello, I want to buy: ${decodeURIComponent(name)} ($${price})`);
  window.open(`https://t.me/${TELEGRAM_USERNAME}?text=${text}`, '_blank');
}

function init(){
  const input = document.getElementById('search');
  const full = getProducts();
  render(full);
  input.addEventListener('input', e=>{
    const q = e.target.value.toLowerCase().trim();
    const filtered = getProducts().filter(p =>
      (p.name||'').toLowerCase().includes(q) ||
      (p.tag||'').toLowerCase().includes(q)
    );
    render(filtered);
  });
}
document.addEventListener('DOMContentLoaded', init);