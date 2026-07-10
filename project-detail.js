function initProjectDetail() {
  const slug = document.body.dataset.project;
  const project = PROJECTS[slug];
  if (!project) return;

  const lang = getStoredLang();

  // Logo
  const logoEl = document.getElementById('projectLogo');
  const logoFallback = document.getElementById('projectLogoFallback');
  if (logoEl) {
    logoEl.src = project.logo;
    logoEl.alt = translations[lang][`project.${slug}.name`] || slug;
    logoEl.addEventListener('error', () => {
      logoEl.hidden = true;
      if (logoFallback) {
        logoFallback.hidden = false;
        logoFallback.textContent = (translations[lang][`project.${slug}.name`] || slug).slice(0, 2).toUpperCase();
      }
    });
  }

  // Features list
  const featuresList = document.getElementById('projectFeatures');
  if (featuresList) {
    featuresList.innerHTML = '';
    project.featureKeys.forEach((key) => {
      const text = translations[lang][`project.${slug}.${key}`];
      if (!text) return;
      const li = document.createElement('li');
      li.className = 'project-feature-item';
      li.innerHTML = `<span class="project-feature-icon" aria-hidden="true">✓</span><span>${text}</span>`;
      featuresList.appendChild(li);
    });
  }

  // Tech tags
  const techWrap = document.getElementById('projectTech');
  if (techWrap) {
    techWrap.innerHTML = '';
    project.tech.forEach((tech) => {
      const span = document.createElement('span');
      span.className = 'project-tech-tag';
      span.textContent = tech;
      techWrap.appendChild(span);
    });
  }

  // Gallery
  const gallery = document.getElementById('projectGallery');
  const gallerySection = document.getElementById('projectGallerySection');
  if (gallery && project.screenshots.length) {
    project.screenshots.forEach((src) => {
      const figure = document.createElement('figure');
      figure.className = 'project-gallery-item';
      const img = document.createElement('img');
      img.src = src;
      img.alt = `${translations[lang][`project.${slug}.name`]} screenshot`;
      img.loading = 'lazy';
      figure.appendChild(img);
      gallery.appendChild(figure);
    });
    if (gallerySection) gallerySection.hidden = false;
  } else if (gallerySection) {
    gallerySection.hidden = true;
  }

  // Page meta
  const name = translations[lang][`project.${slug}.name`];
  const tagline = translations[lang][`project.${slug}.tagline`];
  if (name) {
    document.title = `${name} — Zetac`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && tagline) meta.content = tagline;
  }
}

function handleLogoCardImages() {
  document.querySelectorAll('.project-preview-card__img').forEach((img) => {
    const card = img.closest('.project-preview-card');
    const fallback = card?.querySelector('.project-preview-card__fallback');
    const showFallback = () => {
      img.hidden = true;
      if (fallback) fallback.hidden = false;
    };
    if (img.complete && img.naturalWidth === 0) showFallback();
    else img.addEventListener('error', showFallback);
  });
}
