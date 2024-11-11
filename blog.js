import { fetchData } from './api.js';

export async function Blog(page = 1) {
  const app = document.getElementById('app');
  app.innerHTML = '<h1>Blog</h1><p>Cargando artículos...</p><progress class="circle large"></progress>';

  const postsPerPage = 10;
  let after = null;

  if (page > 1) {
    after = localStorage.getItem('endCursor');
  }

  // Obtener el slug de la categoría de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const categorySlug = urlParams.get('category');

  // Construir el filtro de categoría para la consulta GraphQL
  let categoryFilter = '';
  if (categorySlug) {
    categoryFilter = `, where: { categories: { slug: "${categorySlug}" } }`;
  }

  const query = `
    query getPosts($first: Int, $after: String) {
      posts(first: $first, after: $after ${categoryFilter}) {
        nodes {
          id
          title
          slug
          excerpt
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `;

  const variables = {
    first: postsPerPage,
    after: after,
  };

  try {
    const data = await fetchData(query, variables);

    if (data && data.posts.nodes.length > 0) {
      localStorage.setItem('endCursor', data.posts.pageInfo.endCursor);

      app.innerHTML = data.posts.nodes.map(post => `
        <div class="responsive large-padding">
          <h2><a href="post.html?slug=${post.slug}" data-link>${post.title}</a></h2>
          <p>${post.excerpt}</p>
        </div>
        <div class="medium-space"></div>
      `).join('');

      const paginationContainer = document.createElement('div');
      if (page > 1) {
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Anterior';
        prevButton.dataset.page = page - 1;
        prevButton.classList.add("button", "small-round", "secondary", "small");
        // Mantener la categoría al paginar
        prevButton.addEventListener('click', () => {
          Blog(parseInt(prevButton.dataset.page, 10));
        });
        paginationContainer.appendChild(prevButton);
 prevButton.addEventListener('click', () => {
        Blog(parseInt(prevButton.dataset.page, 10), categorySlug); // Pasar categorySlug aquí
      });

      }
      if (data.posts.pageInfo.hasNextPage) {
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Siguiente';
        nextButton.dataset.page = page + 1;
        nextButton.classList.add("button", "small-round", "secondary", "small");
        // Mantener la categoría al paginar
        nextButton.addEventListener('click', () => {
          Blog(parseInt(nextButton.dataset.page, 10));
        });
        paginationContainer.appendChild(nextButton);
      }
      app.appendChild(paginationContainer);

    } else {
      app.innerHTML = '<p>No hay artículos para mostrar</p>';
    }
  } catch (error) {
    console.error('Error en Blog:', error);
    app.innerHTML = '<p>Error al cargar los artículos</p>';
  }
}
