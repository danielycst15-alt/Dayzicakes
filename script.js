const PADRAO = {
  config: { whatsapp: '5500000000000', instagram: 'dayzicakes' },
  produtos: [
    { id:'ninho', nome:'Ninho com Brigadeiro', imagem:'assets/ninho.jpg', descricao:'Massa fofinha, recheio cremoso de leite em pó e brigadeiro, cobertura de chocolate e decoração com morangos frescos.', precos:{'1kg':85,'1.5kg':120,'2kg':155,'2.5kg':190} },
    { id:'maracuja', nome:'Maracujá com Brigadeiro', imagem:'assets/maracuja.jpg', descricao:'Massa fofinha com recheio de maracujá e brigadeiro, trazendo o equilíbrio perfeito entre o doce e o azedinho.', precos:{'1kg':85,'1.5kg':120,'2kg':155,'2.5kg':190} },
    { id:'personalizado', nome:'Personalizado', imagem:'assets/personalizado.jpg', descricao:'Bolo personalizado para deixar sua comemoração ainda mais especial.', precos:{'1kg':85,'1.5kg':120,'2kg':155,'2.5kg':190} }
  ]
};
function carregarDados(){
  const salvo=localStorage.getItem('dayziCakesDados');
  if(!salvo){localStorage.setItem('dayziCakesDados',JSON.stringify(PADRAO)); return structuredClone(PADRAO)}
  try{return JSON.parse(salvo)}catch{return structuredClone(PADRAO)}
}
const dados=carregarDados();
function formatarPreco(v){return Number(v).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}
function whatsapp(mensagem){const n=(dados.config.whatsapp||'').replace(/\D/g,'');return `https://wa.me/${n}?text=${encodeURIComponent(mensagem)}`}
function configurarContato(){
  document.querySelectorAll('[data-whatsapp]').forEach(el=>{el.href=whatsapp('Olá! Vi o site da Dayzi Cakes e gostaria de fazer um pedido.');el.target='_blank'});
  document.querySelectorAll('[data-instagram]').forEach(el=>{el.href=`https://instagram.com/${dados.config.instagram.replace('@','')}`;el.target='_blank'});
}
function mostrarProdutos(){
  const grid=document.getElementById('productsGrid'); if(!grid)return;
  grid.innerHTML=dados.produtos.map(p=>`<article class="product-card"><a href="produto.html?id=${encodeURIComponent(p.id)}"><img class="product-image" src="${p.imagem}" alt="${p.nome}"></a><div class="product-info"><h3>${p.nome}</h3><p>A partir de <strong>${formatarPreco(p.precos['1kg'])}</strong></p><a href="produto.html?id=${encodeURIComponent(p.id)}" class="product-button">Ver detalhes</a></div></article>`).join('');
}
configurarContato();mostrarProdutos();
