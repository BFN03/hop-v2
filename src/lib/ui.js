import { empty, el } from './elements.js';

export function renderProduct(product) {
  const productDiv = el('div', {}, 
    el('img', { src: product.image, alt: product.title }),
    el('h2', {}, product.title),
    el('p', {}, product.category_title),
    el('p', {}, `${product.price} kr.-`)
  );

  return productDiv;
}

export function renderFrontpage(items) {
  
  const productListDiv = document.getElementById('productList');
  empty(productListDiv);

  if (Array.isArray(items)) {
    items.forEach((product) => {
      const productDiv = renderProduct(product);
      productListDiv.appendChild(productDiv);
    });
  } else {
    console.error('Items er ekki fylki:', items);
  }
}

export async function fetchAndRenderProducts() {
  try {
    const response = await fetch(
      'https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/products?limit=6',
    );
    const data = await response.json();

    if (Array.isArray(data.items)) {
      renderFrontpage(data.items);
    } else {
      console.error('Ólöglegt eða tómt gagnasett tekið frá API:', data);
    }
  } catch (error) {
    console.error('Villa kom upp við að sækja gagnasett:', error);
  }
}
