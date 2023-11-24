import { empty, el } from './lib/elements.js';

function navigateToProductPage(productId) {
    window.location.href = `product.html?id=${productId}`;
  }

export function renderProduct(product) {
  const productDiv = 
    el(
      'div',
      {},
      el('img', { src: product.image, alt: product.title }),
      el('h3', {}, product.title),
      el('p', {}, product.category_title),
      el('h2', {}, `${product.price} kr.-`),
    );

  // Add click event listener to the productDiv to navigate to the product page
  productDiv.addEventListener('click', () => {
    navigateToProductPage(product.id);
  });

  return productDiv;
}

export function renderFrontpage(items) {
  const containerDiv = document.getElementById('productList');
  empty(containerDiv);

  const mainContainer = el('div', { class: 'main-container' });

  const heading = el('h1', {}, 'Nýjar vörur');
  mainContainer.appendChild(heading);

  if (Array.isArray(items)) {
    const productRow = el('div', { class: 'product-row' });

    items.forEach((product) => {
      const productDiv = renderProduct(product);
      productRow.appendChild(productDiv);
    });

    mainContainer.appendChild(productRow);
  } else {
    console.error('Items er ekki fylki:', items);
  }

  containerDiv.appendChild(mainContainer);
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
