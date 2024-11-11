import { fetchData } from './api.js';

async function getPages() {
  const query = `
    query getPages {
      pages {
        nodes {
          id
          title
          slug
        }
      }
    }
  `;

  try {
    const data = await fetchData(query);
    return data.pages.nodes;
  } catch (error) {
    console.error('Error al obtener las páginas:', error);
    return [];
  }
}

async function displayPages() {
  const paginasList = document.getElementById('paginas-list');
  const pages = await getPages();

  if (pages.length > 0) {
    paginasList.innerHTML = pages.map(page => `
      <div class="responsive large-padding">
        <h2><a href="pagina.html?slug=${page.slug}" data-link>${page.title}</a></h2>
      </div>
      <div class="medium-space"></div>
    `).join('');
  } else {
    paginasList.innerHTML = '<p>No hay páginas para mostrar.</p>';
  }
}

document.addEventListener('DOMContentLoaded', displayPages);
