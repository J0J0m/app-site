<script>
    // Armazena a lista de produtos no carrinho
    let cart = [];

    // Referências aos elementos HTML
    const cartCounterElement = document.getElementById('cart-counter');
    const cartListElement = document.getElementById('cart-list');
    const cartTotalElement = document.getElementById('cart-total');
    const cartPanelElement = document.getElementById('cart-panel');
    const cartIconElement = document.querySelector('.cart-icon');

    /**
     * Adiciona um produto ao carrinho.
     * @param {HTMLElement} buttonElement - O botão clicado.
     */
    function addToCart(buttonElement) {
        // 1. Coleta os dados do produto usando os atributos data-*
        const productName = buttonElement.getAttribute('data-name');
        const price = parseFloat(buttonElement.getAttribute('data-price'));

        // Se o preço não for válido (NaN), interrompe a função para evitar erros
        if (isNaN(price)) {
            console.error("Erro: Preço inválido no data-price para " + productName);
            return;
        }

        // 2. Adiciona (ou encontra e incrementa) o item
        let found = cart.find(item => item.name === productName);

        if (found) {
            found.quantity++;
        } else {
            const newItem = {
                name: productName,
                price: price,
                quantity: 1
            };
            cart.push(newItem);
        }

        // 3. Atualiza a interface
        updateCartDisplay();
        
        // 4. Feedback visual (animação)
        cartIconElement.classList.add('flash-cart');
        setTimeout(() => {
            cartIconElement.classList.remove('flash-cart');
        }, 500);
    }

    /**
     * Atualiza o contador de itens e a lista de produtos no painel.
     */
    function updateCartDisplay() {
        let totalItems = 0;
        let totalPrice = 0;
        
        // Limpa a lista existente
        cartListElement.innerHTML = ''; 

        if (cart.length === 0) {
            // Se o carrinho estiver vazio, mostra a mensagem
            const li = document.createElement('li');
            li.className = 'empty-message';
            li.textContent = 'Nenhum item no carrinho.';
            cartListElement.appendChild(li);
        } else {
            // Itera sobre o array do carrinho e cria os elementos <li>
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                
                totalItems += item.quantity;
                totalPrice += itemTotal;

                const li = document.createElement('li');
                li.innerHTML = `
                    <span class="item-name">${item.name}</span>
                    <span class="item-details">
                        ${item.quantity} x R$ ${item.price.toFixed(2).replace('.', ',')} 
                        = R$ ${itemTotal.toFixed(2).replace('.', ',')}
                    </span>
                `;
                cartListElement.appendChild(li);
            });
        }

        // Atualiza o contador de itens no cabeçalho
        cartCounterElement.textContent = totalItems;
        
        // Atualiza o total
        cartTotalElement.textContent = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;
    }

    /**
     * Abre e fecha o painel lateral do carrinho.
     */
    function toggleCart() {
        cartPanelElement.classList.toggle('open');
        // Garante que o display seja atualizado sempre que for aberto
        if (cartPanelElement.classList.contains('open')) {
             updateCartDisplay();
        }
    }
    
    // Inicializa a exibição do carrinho ao carregar a página
    updateCartDisplay(); 
</script>