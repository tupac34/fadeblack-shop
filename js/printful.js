async function fetchProducts() {
    const res = await fetch("/.netlify/functions/printful-products");
    const data = await res.json();
    const grid = document.getElementById("product-grid");
    grid.innerHTML = "";
    data.result.forEach(product => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <img src="${product.thumbnail_url}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>R ${product.variants[0].retail_price}</p>
        <a href="product.html?id=${product.id}">View</a>
      `;
      grid.appendChild(div);
    });
  }
  if (document.getElementById("product-grid")) fetchProducts();
  