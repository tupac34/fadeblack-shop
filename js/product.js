async function loadProduct() {
    const id = new URLSearchParams(window.location.search).get("id");
    const res = await fetch(`/.netlify/functions/printful-product?id=${id}`);
    const { result } = await res.json();
    const container = document.getElementById("product-details");
    container.innerHTML = `
      <img src="${result.thumbnail_url}" />
      <h2>${result.name}</h2>
      <p>${result.description}</p>
      <p>R ${result.variants[0].retail_price}</p>
      <button onclick="addToCart(${result.id})">Add to Cart</button>
    `;
  }
  if (document.getElementById("product-details")) loadProduct();