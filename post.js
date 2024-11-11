import { fetchData } from './api.js';

export async function Post() {
  const app = document.getElementById('app');
  app.innerHTML = '<p>Cargando artículo...</p> <progress class="circle large"></progress>';

  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');

  const query = `
    {
      postBy(slug: "${slug}") {
        title
        content
      }
    }
  `;

  try {
    const data = await fetchData(query);

    if (data && data.postBy) {
      app.innerHTML = `<div class="responsive large-padding"><h1>${data.postBy.title}</h1><div>${data.postBy.content}
<div class="medium-space"></div>
<a class="button small-round secondary small" href="./blog" >Volver al Blog</a>
</div>`;
    } else {
      app.innerHTML = '<p>Error: No se encontró el post solicitado</p>';
    }
  } catch (error) {
    console.error('Error en Post:', error);
    app.innerHTML = '<p>Error al cargar el artículo</p>';
  }
}
