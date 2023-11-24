
import { fetchAndRenderProducts, fetchAndRenderCategories, 
  fetchAndRenderCategoryPage} from './lib/ui.js';


document.addEventListener('DOMContentLoaded', async () => {
  await fetchAndRenderProducts();
  await fetchAndRenderCategories();

  await fetchAndRenderCategoryPage();
});




