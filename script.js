document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-list');
    const filterSelect = document.getElementById('product-filter');
  
    const createProductCard = (product) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h2>${product.title}</h2>
        <p>$${product.price}</p>
      `;
      return card;
    };
  
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(products => {

        products.forEach(product => {
          const productCard = createProductCard(product);
          productContainer.appendChild(productCard);
  

          const option = document.createElement('option');
          option.value = product.id;
          option.textContent = product.title;
          filterSelect.appendChild(option);
        });
  
        filterSelect.addEventListener('change', (e) => {
          const selectedProductId = e.target.value;
          productContainer.innerHTML = ''; 
  
          if (selectedProductId === 'all') {
            products.forEach(product => {
              const productCard = createProductCard(product);
              productContainer.appendChild(productCard);
            });
          } else {
            const selectedProduct = products.find(product => product.id === parseInt(selectedProductId));
            const productCard = createProductCard(selectedProduct);
            productContainer.appendChild(productCard);
          }
        });
      })
      .catch(error => console.error('Error al cargar los productos:', error));
  });
  