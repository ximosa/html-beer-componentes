// Función para cargar un archivo HTML y colocarlo dentro de un elemento
async function loadHTML(file, element) {
  try {
    const response = await fetch(file);
    const html = await response.text();
    element.innerHTML = html;

    // Agregar el año actual en el footer
    if (file === 'footer.html') {
      const yearElement = element.querySelector('#year');
      if (yearElement) yearElement.textContent = new Date().getFullYear();
    }
  } catch (error) {
    console.error(`Error cargando ${file}:`, error);
  }
}

// Cargar los componentes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // Cargar el contenido de cada componente
  const headerContainer = document.querySelector('custom-header');
  const footerContainer = document.querySelector('custom-footer');

  if (headerContainer) loadHTML('header.html', headerContainer);
  if (footerContainer) loadHTML('footer.html', footerContainer);
});
