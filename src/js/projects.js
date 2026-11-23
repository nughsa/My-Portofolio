function renderProjectCards(projects, host) {
  host.innerHTML = projects
    .map(
      (project, index) => `
        <article class="project-card reveal" data-project-card="${project.id}">
          <div class="project-cover">
            <span class="project-index">0${index + 1}</span>
            <span class="project-kind">${project.kind}</span>
            <span class="project-cover-mark" aria-hidden="true">↗</span>
          </div>
          <div class="project-card-content">
            <div class="project-categories">${project.categories.map((category) => `<span>${category}</span>`).join('')}</div>
            <h3>${project.title}</h3>
            <p>${project.summary}</p>
            <div class="project-tools">${project.tools.map((tool) => `<span>${tool}</span>`).join('')}</div>
            <button class="text-link project-open" type="button" data-open-project="${project.id}" aria-expanded="false">
              Lihat Detail <span aria-hidden="true">↗</span>
            </button>
          </div>
        </article>`,
    )
    .join('');
}

function renderDetail(project) {
  const list = (items) => `<ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
  const projectLinks = project.links
    .map(
      ({ label, href }) =>
        `<a class="button button-outline" href="${href}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`,
    )
    .join('');
  const projectThumbnail = project.thumbnail
    ? `<div class="case-project-thumbnail"><img src="${project.thumbnail}" alt="${project.thumbnailAlt || `Thumbnail ${project.title}`}" loading="lazy" width="960" height="540" /></div>`
    : '';

  return `
    <article class="case-study" id="case-study-${project.id}" aria-labelledby="case-title-${project.id}">
      <div class="case-study-top">
        <div>
          <p class="eyebrow eyebrow-project-detail">
            <span class="eyebrow-detail-mark" aria-hidden="true">↗</span>
            ${project.kind}
          </p>
          <h3 id="case-title-${project.id}">${project.title}</h3>
        </div>
        <button class="case-close" type="button" data-close-project aria-label="Tutup detail proyek">Tutup detail ×</button>
      </div>
      <div class="case-study-layout">
        <div class="case-study-main">
          <section><h4>01. Project Overview</h4><p>${project.overview}</p></section>
          <section><h4>02. Background</h4><p>${project.background}</p></section>
          <section><h4>03. Business Problem</h4><p>${project.problem}</p></section>
          <section><h4>04. Project Objectives</h4>${list(project.objectives)}</section>
          <section><h4>05. Dataset Information</h4><p>${project.dataset}</p></section>
          ${project.preparation.length ? `<section><h4>06. Data Preparation &amp; Cleaning</h4>${list(project.preparation)}</section>` : ''}
          <section><h4>07. Tools &amp; Technologies</h4><div class="project-tools">${project.tools.map((tool) => `<span>${tool}</span>`).join('')}</div></section>
          <section><h4>08. Analysis Process</h4><p>${project.process}</p></section>
          <section><h4>09. Key Insights</h4>${list(project.insights)}</section>
          ${project.recommendations.length ? `<section><h4>10. Business Recommendations</h4>${list(project.recommendations)}</section>` : ''}
        </div>
        <aside class="case-study-aside">
          ${
            project.gallery.length
              ? `<h4>Dokumentasi Proyek</h4>${project.gallery
                  .map(
              (image) => `
                <button class="case-gallery-image image-trigger" type="button" data-image-src="${image.src}" data-image-alt="${image.alt}" data-image-caption="${image.caption}">
                  <span class="case-gallery-preview"><img src="${image.src}" alt="${image.alt}" loading="lazy" width="960" height="540" /></span>
                  <span class="case-gallery-label">Perbesar gambar ↗</span>
                </button>`,
                  )
                  .join('')}<p class="gallery-caption">${project.gallery[0]?.caption || ''}</p>`
              : ''
          }
          <h4>Tautan Proyek</h4>
          ${projectThumbnail}
          <div class="case-links">
            ${projectLinks}
          </div>
        </aside>
      </div>
      <button class="button button-outline case-back" type="button" data-close-project>Kembali ke daftar proyek</button>
    </article>`;
}

export function initializeProjects(projects) {
  const grid = document.querySelector('[data-project-grid]');
  const detailHost = document.querySelector('[data-project-detail]');
  let activeProject = null;

  renderProjectCards(projects, grid);

  grid.addEventListener('click', (event) => {
    const button = event.target.closest('[data-open-project]');
    if (!button) return;

    const project = projects.find((item) => item.id === button.dataset.openProject);
    const isAlreadyOpen = activeProject === project.id;
    detailHost.innerHTML = '';
    grid.querySelectorAll('[data-open-project]').forEach((openButton) => {
      openButton.setAttribute('aria-expanded', 'false');
      openButton.innerHTML = 'Lihat Detail <span aria-hidden="true">↗</span>';
    });

    if (isAlreadyOpen) {
      activeProject = null;
      return;
    }

    activeProject = project.id;
    detailHost.innerHTML = renderDetail(project);
    button.setAttribute('aria-expanded', 'true');
    button.innerHTML = 'Tutup Detail <span aria-hidden="true">↗</span>';
    detailHost.querySelector('.case-study').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  detailHost.addEventListener('click', (event) => {
    if (!event.target.closest('[data-close-project]')) return;
    detailHost.innerHTML = '';
    activeProject = null;
    grid.querySelectorAll('[data-open-project]').forEach((button) => {
      button.setAttribute('aria-expanded', 'false');
      button.innerHTML = 'Lihat Detail <span aria-hidden="true">↗</span>';
    });
  });
}
