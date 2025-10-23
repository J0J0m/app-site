<script>
    // CÓDIGO JAVASCRIPT ORIGINAL DE APENAS CONTAR

    let cartCount = 0;
    
    function addToCart() {
        cartCount++;
        
        // 1. Atualiza o contador (ID: cart-counter)
        const counterElement = document.getElementById('cart-counter');
        if (counterElement) {
            counterElement.textContent = cartCount;
        }

        // 2. Feedback visual (animação rápida no ícone do carrinho)
        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon) {
            cartIcon.classList.add('flash-cart'); 
            setTimeout(() => {
                cartIcon.classList.remove('flash-cart');
            }, 500); // Remove a classe após 0.5s
        }
    }
</script>