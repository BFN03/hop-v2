import { empty } from './elements.js'

// products
export function renderProduct(product) {
    const productDiv = document.createElement('div');
    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h2>${product.title}</h2>
      <p>${product.category_title}</p>
      <p>Price: $${product.price}</p>
    `;
    return productDiv;
  }
 
  
  export function renderFrontpage(items) {
    const productListDiv = document.getElementById('productList');
    empty(productListDiv);
  
    if (Array.isArray(items)) {
      items.forEach(product => {
        const productDiv = renderProduct(product);
        productListDiv.appendChild(productDiv);
      });
    } else {
      console.error('Items er ekki fylki:', items);
    }
  }
  
  export async function fetchAndRenderProducts() {
    try {
      const response = await fetch('https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/products?limit=6');
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
    const categoryDiv = document.createElement('div');
    categoryDiv.innerHTML = `
      <h1>${category.category_title}</h1>
    `;
    return categoryDiv;
  }
  
  export function renderCategoryPage(categories) {
    const categoryListDiv = document.getElementById('categoryList');
    empty(categoryListDiv);
  
    if (Array.isArray(categories)) {
      categories.forEach(category => {
        const categoryDiv = renderCategory(category);
        categoryListDiv.appendChild(categoryDiv);
      });
    } else {
      console.error('Categories er ekki fylki:', categories);
    }
  }
  
  export async function fetchAndRenderCategories() {
    try {
      const response = await fetch('https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/categories?limit=12');
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


  