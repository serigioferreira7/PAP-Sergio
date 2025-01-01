
window.onload = function() {
    
    if (document.getElementById("product-list")) {
      fetch('/api/products')
        .then(response => response.json())
        .then(data => {
          const productList = document.getElementById("product-list");
          data.forEach(product => {
            const li = document.createElement("li");
            li.textContent = `${product.nome} - €${product.preco}`;
            productList.appendChild(li);
          });
        });
    }
  
    
    if (document.getElementById("product-id")) {
      fetch('/api/products')
        .then(response => response.json())
        .then(data => {
          const productSelect = document.getElementById("product-id");
          data.forEach(product => {
            const option = document.createElement("option");
            option.value = product.id;
            option.textContent = `${product.nome} - €${product.preco}`;
            productSelect.appendChild(option);
          });
        });
    }
  
    // Submeter a encomenda
    if (document.getElementById("order-form")) {
      const form = document.getElementById("order-form");
      form.addEventListener("submit", function(event) {
        event.preventDefault();
        const productId = document.getElementById("product-id").value;
        const quantity = document.getElementById("quantity").value;
  
        fetch('/api/order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId, quantity })
        })
        .then(response => response.json())
        .then(data => alert("Encomenda realizada com sucesso!"))
        .catch(error => console.error('Erro:', error));
      });
    }
  };
  