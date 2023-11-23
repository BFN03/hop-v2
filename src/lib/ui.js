import { empty } from './elements.js'

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
  
    // Check if 'items' is an array before iterating over it
    if (Array.isArray(items)) {
      // Iterate through the items and append HTML elements for each product to the productListDiv
      items.forEach(product => {
        const productDiv = renderProduct(product);
        productListDiv.appendChild(productDiv);
      });
    } else {
      console.error('Items is not an array:', items);
    }
  }
  
  export async function fetchAndRenderProducts() {
    try {
      const response = await fetch('https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/products?limit=6');
      const data = await response.json();
  
      // Ensure that 'items' is an array before rendering
      if (Array.isArray(data.items)) {
        renderFrontpage(data.items);
      } else {
        console.error('Invalid or empty data received from the API:', data);
      }
    } catch (error) {
      console.error('Error fetching or displaying data:', error);
    }
  }
  
 
  

  