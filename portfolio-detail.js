// Renders one portfolio project detail page from PORTFOLIO data + portfolio-i18n text.
// Named `initProjectDetail` on purpose — script.js already knows to call this function
// (and re-call it on language switch) for any page whose <body> has a `data-project`
// attribute. See script.js's setLanguage() and the bottom of the file.
function initProjectDetail() {
  const slug = document.body.dataset.project;
  const project = PORTFOLIO[slug];
  if (!project) return;

  const lang = getStoredLang();
  const t = (key) => (key && translations[lang][key]) || '';
  const name = t(`portfolio.${slug}.name`) || slug;

  // Logo / monogram fallback
  const logoEl = document.getElementById('projectLogo');
  const logoFallback = document.getElementById('projectLogoFallback');
  const showFallback = () => {
    if (logoEl) logoEl.hidden = true;
    if (logoFallback) {
      logoFallback.hidden = false;
      logoFallback.textContent = name.slice(0, 2).toUpperCase();
    }
  };
  if (logoEl) {
    if (project.logo) {
      logoEl.src = project.logo;
      logoEl.alt = name;
      logoEl.hidden = false;
      if (logoFallback) logoFallback.hidden = true;
      logoEl.onerror = showFallback;
    } else {
      showFallback();
    }
  }

  // Client line (only present when the product name differs from the client name)
  const clientRow = document.getElementById('projectClientRow');
  const clientValue = document.getElementById('projectClientValue');
  if (clientRow && clientValue) {
    const client = t(`portfolio.${slug}.client`);
    clientRow.hidden = !client;
    if (client) clientValue.textContent = client;
  }

  // Business value / results highlight block
  const highlightLabel = document.getElementById('projectHighlightLabel');
  if (highlightLabel) highlightLabel.textContent = t(project.highlightLabelKey);

  // Feature / service bullet list
  const featuresLabel = document.getElementById('projectFeaturesLabel');
  if (featuresLabel) featuresLabel.textContent = t(project.featuresLabelKey);

  const featuresList = document.getElementById('projectFeatures');
  if (featuresList) {
    featuresList.innerHTML = '';
    (project.featureKeys || []).forEach((key) => {
      const text = t(`portfolio.${slug}.${key}`);
      if (!text) return;
      const li = document.createElement('li');
      li.className = 'project-feature-item';
      const icon = document.createElement('span');
      icon.className = 'project-feature-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = '✓';
      const label = document.createElement('span');
      label.textContent = text;
      li.append(icon, label);
      featuresList.appendChild(li);
    });
  }

  // Primary tag list (technologies or platforms)
  const tagLabel = document.getElementById('projectTagsLabel');
  const tagWrap = document.getElementById('projectTags');
  if (tagWrap) {
    if (tagLabel) tagLabel.textContent = t(project.tagListKey);
    tagWrap.innerHTML = '';
    (project.tags || []).forEach((tag) => {
      const span = document.createElement('span');
      span.className = 'project-tech-tag';
      span.textContent = tag;
      tagWrap.appendChild(span);
    });
  }

  // Secondary tag list (technologies, shown only when present — e.g. apps)
  const techSection = document.getElementById('projectTechSection');
  const techLabel = document.getElementById('projectTechLabel');
  const techWrap = document.getElementById('projectTech');
  if (techSection) {
    const hasTech = Boolean(project.tech && project.tech.length);
    techSection.hidden = !hasTech;
    if (hasTech) {
      if (techLabel) techLabel.textContent = t(project.techListKey);
      techWrap.innerHTML = '';
      project.tech.forEach((tech) => {
        const span = document.createElement('span');
        span.className = 'project-tech-tag';
        span.textContent = tech;
        techWrap.appendChild(span);
      });
    }
  }

  // Gallery
  const gallery = document.getElementById('projectGallery');
  const gallerySection = document.getElementById('projectGallerySection');
  if (gallery) {
    gallery.innerHTML = '';
    (project.screenshots || []).forEach((src) => {
      const figure = document.createElement('figure');
      figure.className = 'project-gallery-item';
      const img = document.createElement('img');
      img.src = src;
      img.alt = name;
      img.loading = 'lazy';
      figure.appendChild(img);
      gallery.appendChild(figure);
    });
    if (gallerySection) gallerySection.hidden = !(project.screenshots && project.screenshots.length);
  }

  // Optional external links (live site, App Store / Google Play, social profiles)
  const linksWrap = document.getElementById('projectLinks');
  if (linksWrap) {
    linksWrap.innerHTML = '';
    (project.links || []).forEach((link) => {
      const a = document.createElement('a');
      a.href = link.url || '#';
      a.className = 'btn btn-outline btn-sm';
      a.textContent = t(link.labelKey);
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      linksWrap.appendChild(a);
    });
    linksWrap.hidden = !(project.links && project.links.length);
  }

  // Page meta
  const tagline = t(`portfolio.${slug}.tagline`);
  document.title = `${name} — Zetac`;
  const meta = document.querySelector('meta[name="description"]');
  if (meta && tagline) meta.content = tagline;
}
