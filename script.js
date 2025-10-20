// Variável que armazena a contagem atual do carrinho
let cartCount = 0;

/**
 * Função responsável por adicionar um item ao "carrinho" (apenas o contador).
 */
function addToCart() {
    // 1. Aumenta a contagem de itens
    cartCount = cartCount + 1;
    
    // 2. Encontra o elemento de texto (span) do contador pelo seu ID
    const counterElement = document.getElementById('cart-counter');
    
    // 3. Verifica se o elemento existe e atualiza o número
    if (counterElement) {
        counterElement.textContent = cartCount;
    }
    
    // Opcional: Feedback simples para o usuário
    alert('Figure Key Action adicionada ao carrinho! Total: ' + cartCount);
}