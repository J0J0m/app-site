<script>
    let cart = []; // A variável do carrinho pode ficar fora
    
    // Variáveis que vão armazenar os elementos HTML
    let cartCounterElement, cartListElement, cartTotalElement, cartPanelElement, cartIconElement;

    // Esta função garante que o código só rode depois que o HTML estiver carregado
    window.onload = function() {
        // Referências aos elementos HTML (agora dentro do evento onload)
        cartCounterElement = document.getElementById('cart-counter');
        cartListElement = document.getElementById('cart-list');
        cartTotalElement = document.getElementById('cart-total');
        cartPanelElement = document.getElementById('cart-panel');
        cartIconElement = document.querySelector('.cart-icon');
        
        // Inicializa a exibição do carrinho
        updateCartDisplay();
    };

    /**
     * Adiciona um produto ao carrinho.
     * @param {HTMLElement} buttonElement - O botão clicado.
     */
    function addToCart(buttonElement) {
        // 1. Coleta os dados do produto usando os atributos data-*
        const productName = buttonElement.getAttribute('data-name');
        const price = parseFloat(buttonElement.getAttribute('data-price'));

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
        if (cartIconElement) { // Verifica se o elemento foi encontrado antes de tentar animar
            cartIconElement.classList.add('flash-cart');
            setTimeout(() => {
                cartIconElement.classList.remove('flash-cart');
            }, 500);
        }
    }

    /**
     * Atualiza o contador de itens e a lista de produtos no painel.
     */
    function updateCartDisplay() {
        let totalItems = 0;
        let totalPrice = 0;
        
        if (!cartListElement) return; // Sai da função se o elemento não foi encontrado
        
        cartListElement.innerHTML = ''; 

        if (cart.length === 0) {
            const li = document.createElement('li');
            li.className = 'empty-message';
            li.textContent = 'Nenhum item no carrinho.';
            cartListElement.appendChild(li);
        } else {
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

        if (cartCounterElement) cartCounterElement.textContent = totalItems;
        if (cartTotalElement) cartTotalElement.textContent = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;
    }

    /**
     * Abre e fecha o painel lateral do carrinho.
     */
    function toggleCart() {
        if (!cartPanelElement) return; // Sai da função se o elemento não foi encontrado
        
        cartPanelElement.classList.toggle('open');
        
        if (cartPanelElement.classList.contains('open')) {
             updateCartDisplay();
        }
    }
</script>