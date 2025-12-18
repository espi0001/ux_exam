import { BASE_URL } from "./info.js";

async function loadProducts() {
  const productList = document.querySelector("#productList")
  if (!productList) return;
  productList.textContent = "Loading products...";

  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
      throw new Error("Falied to fetch products");
    }
    const products = await response.json();

    productList.textContent = "";

    products.forEach((product) => {
      const singleProduct = document.querySelector("#singleProduct").content.cloneNode(true);

      const imgElement = singleProduct.querySelector("img");
      imgElement.src = product.image;
      imgElement.alt = `${product.title} product image`;
      imgElement.loading = "lazy";

      singleProduct.querySelector("h3").innerText = product.title;
      singleProduct.querySelector("h4").innerText = product.category;
      singleProduct.querySelector("p").innerText = `${product.price} €`;
      singleProduct.querySelector("a").href = `product_singleview.htm?id=${product.id}`;

      productList.appendChild(singleProduct);
    });
  } catch (error) {
    console.error("Unable to load products", error);
    productList.innerHTML = `<p class="error">Could not load products right now. Please try again later.</p>`;
  }
}

loadProducts();