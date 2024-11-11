import { fetchData } from './api.js';

export async function Pagina() {
  const app = document.getElementById('app');
  app.innerHTML = '<p>Cargando página...</p>';

  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');

  const query = `
  {
    pageBy(uri: "${slug}") {
      title
      content
    }
  }
`;

  try {
    const data = await fetchData(query);
    console.log("Data:", data); // Verifica la respuesta de la API

    if (data && data.pageBy) {
      app.innerHTML = `<h1>${data.pageBy.title}</h1><div>${data.pageBy.content}</div>`;
    } else {
      app.innerHTML = '<p>Error: No se encontró la página solicitada</p>';
    }
  } catch (error) {
    console.error('Error en Pagina:', error);
    app.innerHTML = '<p>Error al cargar la página</p>';
  }
}

document.addEventListener('DOMContentLoaded', Pagina);
