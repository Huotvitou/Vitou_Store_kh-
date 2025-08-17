let editingId = null;

function logout(){
  localStorage.removeItem('isLoggedIn');
  location.href='login.html';
}

function clearForm(){
  editingId = null;
  document.getElementById('name').value='';
  document.getElementById('price').value='';
  document.getElementById('image').value='';
  document.getElementById('tag').value='';
  document.getElementById('saveBtn').textContent='បន្ថែម';
}

function renderAdminList(){
  const list = getProducts();
  const wrap = document.getElementById('adminList');
  if(!list.length){ wrap.innerHTML = '<div class="empty">មិនមានទិន្នន័យ</div>'; return; }
  wrap.innerHTML = list.map(p => `
    <div class="list-admin-item">
      <img src="${p.image || '../assets/placeholder.png'}" alt="${p.name}"/>
      <div style="flex:1">
        <div><strong>${p.name}</strong></div>
        <div>$${money(p.price)} • <span class="badge">${p.tag || 'Digital'}</span></div>
      </div>
      <div class="chips">
        <button class="btn btn-ghost" onclick="editProduct('${p.id}')">កែ</button>
        <button class="btn btn-warn" onclick="removeProduct('${p.id}')">លុប</button>
      </div>
    </div>
  `).join('');
}

function editProduct(id){
  const list = getProducts();
  const p = list.find(x=> String(x.id)===String(id));
  if(!p) return;
  editingId = p.id;
  document.getElementById('name').value = p.name || '';
  document.getElementById('price').value = p.price || '';
  document.getElementById('image').value = p.image || '';
  document.getElementById('tag').value   = p.tag || '';
  document.getElementById('saveBtn').textContent='រក្សាទុក';
  window.scrollTo({top:0, behavior:'smooth'});
}

function removeProduct(id){
  if(!confirm('លុបផលិតផលមែនទេ?')) return;
  let list = getProducts();
  list = list.filter(x=> String(x.id)!==String(id));
  saveProducts(list);
  renderAdminList();
}

document.getElementById('prodForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const price = parseFloat(document.getElementById('price').value || '0');
  const image = document.getElementById('image').value.trim();
  const tag   = document.getElementById('tag').value.trim();
  if(!name || isNaN(price)){ alert('បំពេញឈ្មោះ និងតម្លៃ'); return; }

  let list = getProducts();
  if(editingId){
    list = list.map(p => String(p.id)===String(editingId) ? {...p, name, price, image, tag} : p);
  }else{
    list.push({id: Date.now(), name, price, image, tag});
  }
  saveProducts(list);
  clearForm();
  renderAdminList();
});

document.getElementById('resetBtn').addEventListener('click', clearForm);

renderAdminList();
