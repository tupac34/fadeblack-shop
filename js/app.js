// js/app.js

document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/get-products')
      .then((res) => res.json())
      .then((products) => {
        const container = document.getElementById('productContainer');
        if (products.length === 0) {
          container.innerHTML = '<p>No products found.</p>';
          return;
        }
  
        products.forEach((product) => {
          const thumb = product.thumbnail_url || 'images/product1.jpg';
          const html = `
            <div class="product-card">
              <img src="${thumb}" alt="${product.name}" />
              <h3>${product.name}</h3>
              <p>${product.sync_product.external && product.sync_product.external.retail_price ? 'R' + product.sync_product.external.retail_price : ''}</p>
            </div>
          `;
          container.innerHTML += html;
        });
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
      });
  });
  
  emailjs.init('YOUR_EMAILJS_USER_ID');
  
  function sendMail(e) {
    e.preventDefault();
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target)
      .then(() => alert('Message sent!'))
      .catch(() => alert('Failed to send message.'));
  }
  
  function scrollToShop() {
    document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
  }
  