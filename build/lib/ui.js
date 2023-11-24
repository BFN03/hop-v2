import { empty, el } from './elements.js';

function navigateToProductPage(productId) {
  window.location.href = `product.html?id=${productId}`;
}

function navigateToCategoryPage(categoryId) {
  window.location.href = `category.html?id=${categoryId}`;
}

export function renderProduct(product) {
  const productDiv = el(
    'a',
    { href: `product.html?id=${product.id}` },
    el(
      'div',
      {},
      el('img', { src: product.image, alt: product.title }),
      el('h3', {}, product.title),
      el('p', {}, product.category_title),
      el('h2', {}, `${product.price} kr.-`),
    ),
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
      productDiv.addEventListener('click', () => {
        navigateToProductPage(product.id);
      });

      productRow.appendChild(productDiv);
    });

    mainContainer.appendChild(productRow);
  } else {
    console.error('Items er ekki fylki:', items);
  }
  const laButton = el('button', {}, 'Skoða alla flokka');
  laButton.addEventListener('click', () => {
    navigateToCategoryPage();
  });

  mainContainer.appendChild(laButton);

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
  const categoryLink = el(
    'a',
    { href: `category.html?id=${category.id}` }, 
    el('h1', { class: 'flokkar' }, category.title),
  );

  const mainContainer = el('div', { class: 'main-container' });

  const heading = el('h1', {}, 'Skoðaðu vöruflokkana okkar');
  mainContainer.appendChild(heading);

  const categoryDiv = el('div', { class: 'category-item'}, categoryLink);

  return categoryDiv;
}

export function renderCategorypage(items) {
  const categoryListDiv = document.getElementById('category-list');
  const categoryTitle = document.getElementById('category-title');

  categoryTitle.textContent = 'Skoðaðu vöruflokkana okkar';

  empty(categoryListDiv);

  if (Array.isArray(items)) {
    items.forEach((category) => {
      const categoryDiv = renderCategory(category);
      categoryListDiv.appendChild(categoryDiv);
    });
  } else {
    console.error('Items er ekki fylki:', items);
  }
}

export async function fetchAndRenderCategories() {
  try {
    const response = await fetch(
      'https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/categories?limit=100',
    );
    const data = await response.json();

    if (Array.isArray(data.items)) {
      renderCategorypage(data.items);
    } else {
      console.error('Ólöglegt eða tómt gagnasett tekið frá API:', data);
    }
  } catch (error) {
    console.error('Villa kom upp við að sækja gagnasett:', error);
  }
}

// síða fyrir hvern flokk

export function renderCategoriesPage(items) {
  const containerDiv = document.getElementById('CategoryPage');
  empty(containerDiv);
const mainContainer = el('div', { class: 'main-container' });

  const heading = el('h1', {}, 'Health');
  mainContainer.appendChild(heading);

  if (Array.isArray(items)) {
    const productRow = el('div', { class: 'product-row' });

    items.forEach((product) => {
      const productDiv = renderProduct(product);
      productDiv.addEventListener('click', () => {
        navigateToCategoryPage(product.id);
      });

      productRow.appendChild(productDiv);
    });

    mainContainer.appendChild(productRow);
  } else {
    console.error('Items er ekki fylki:', items);
  }

  containerDiv.appendChild(mainContainer);
}

export async function fetchAndRenderCategoryPage() {
  try {
    const response = await fetch(
      'https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/products?category=12',
    );
    const data = await response.json();

    if (Array.isArray(data.items)) {
      renderCategoriesPage(data.items);
    } else {
      console.error('Ólöglegt eða tómt gagnasett tekið frá API:', data);
    }
  } catch (error) {
    console.error('Villa kom upp við að sækja gagnasett:', error);
  }
}
