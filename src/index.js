import { fetchAndRenderProducts, fetchAndRenderCategories } from './lib/ui.js';

document.addEventListener('DOMContentLoaded', async () => {

  await fetchAndRenderProducts();
  await fetchAndRenderCategories();
});