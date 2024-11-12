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
      <div class="s12 m6 l6 large-padding center-align">
        <a class="button responsive border small-round medium-elevate" href="pagina.html?slug=${page.slug}" data-link>${page.title}</a>
        </div>
    
    `).join('');
  } else {
    paginasList.innerHTML = '<p>No hay páginas para mostrar.</p>';
  }
}

document.addEventListener('DOMContentLoaded', displayPages);
