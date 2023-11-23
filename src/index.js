import { fetchAndRenderProducts } from './lib/ui.js';

document.addEventListener('DOMContentLoaded', async () => {

  await fetchAndRenderProducts();
});
