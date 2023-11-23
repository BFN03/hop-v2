import { empty, el } from './elements.js';

// products
export function renderProduct(product) {
  const productDiv = el('div', {}, 
    el('img', { src: product.image, alt: product.title }),
    el('h3', {}, product.title),
    el('p', {}, product.category_title),
    el('h2', {}, `${product.price} kr.-`)
  );
  

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

// categories
export function renderCategory(category) {
  const categoryDiv = el('div', {}, 
  el('h1', {}, category.category_title));
  return categoryDiv;
}

export function renderCategoryPage(categories) {
  const categoryListDiv = document.getElementById('categoryList');
  empty(categoryListDiv);

  if (Array.isArray(categories)) {
    categories.forEach((category) => {
      const categoryDiv = renderCategory(category);
      categoryListDiv.appendChild(categoryDiv);
    });
  } else {
    console.error('Categories er ekki fylki:', categories);
  }
}

export async function fetchAndRenderCategories() {
  try {
    const response = await fetch(
      'https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/categories?limit=12',
    );
    const data = await response.json();

    if (Array.isArray(data.items)) {
      renderCategoryPage(data.items);
    } else {
      console.error('Ólöglegt eða tómt gagnasett tekið frá API:', data);
    }
  } catch (error) {
    console.error('Villa kom upp við að sækja gagnasett:', error);
  }
}
