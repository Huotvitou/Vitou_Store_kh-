// Storage helpers
const LS_KEY = 'products_v1';
function getProducts(){
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; } catch { return []; }
}
function saveProducts(list){
  localStorage.setItem(LS_KEY, JSON.stringify(list));
}
function money(n){
  const num = Number(n||0);
  return num % 1 === 0 ? num.toString() : num.toFixed(2);
}
// Seed demo products only if none
(function seed(){
  const has = getProducts();
  if(!has.length){
    saveProducts([
      {id: Date.now(), name:'Steam Key - GTA V', price:25, image:'https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=1600&auto=format&fit=crop', tag:'Steam'},
      {id: Date.now()+1, name:'Xbox Game Pass - 1 Month', price:10, image:'https://images.unsplash.com/photo-1605901309584-818e25960a8b?q=80&w=1600&auto=format&fit=crop', tag:'Subscription'},
      {id: Date.now()+2, name:'Adobe Photoshop - 1 PC', price:15, image:'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop', tag:'Software'}
    ]);
  }
})();