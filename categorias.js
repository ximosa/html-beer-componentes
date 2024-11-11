import { fetchData } from './api.js';

async function getCategoriesAndPosts() {
  const query = `
    query getCategoriesAndPosts {
      categories {
        nodes {
          id
          name
          slug
          posts {
            nodes {
              id
              title
              slug
              excerpt
            }
          }
        }
      }
    }
  `;

  try {
    const data = await fetchData(query);
    return data.categories.nodes;
  } catch (error) {
    console.error('Error al obtener las categorías y posts:', error);
    return [];
  }
}

async function displayCategoriesAndPosts() {
  const categoriesList = document.getElementById('categories-list');
  const categories = await getCategoriesAndPosts();

   if (categories.length > 0) {
    categoriesList.innerHTML = `
      <div class="grid"> 
        ${categories.map(category => `
          <div class="s12 m6 l6"> <div class="responsive large-padding">
            <h2 class="inverse-surface center-align">${category.name}</h2>
<div class="medium-space"></div>
            ${category.posts.nodes.map(post => `
              <div>
                <h5><a href="post.html?slug=${post.slug}" data-link>${post.title}</a></h5>
                <p>${post.excerpt}</p>
              </div>
            `).join('')}
          </div> </div>
        `).join('')}
      </div>
    `; 
  } else {
    categoriesList.innerHTML = '<p>No hay categorías para mostrar.</p>';
  }
}

document.addEventListener('DOMContentLoaded', displayCategoriesAndPosts);
