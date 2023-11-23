import { fetchAndRenderProducts } from './lib/ui.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Fetch and render products when the DOM is loaded
  await fetchAndRenderProducts();
});

