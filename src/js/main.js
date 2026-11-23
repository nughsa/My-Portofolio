import '../css/variables.css';
import '../css/global.css';
import '../css/components.css';
import '../css/responsive.css';
import '../css/animations.css';
import { profile } from '../data/profile.js';
import { projects } from '../data/projects.js';
import { experienceGroups } from '../data/experiences.js';
import { certificates } from '../data/certificates.js';
import { toolGroups } from '../data/tools.js';
import { initializeNavigation } from './navigation.js';
import { initializeProjects } from './projects.js';
import { initializeCertificates } from './certificates.js';
import { initializeAnimations } from './animations.js';
import { initializeAboutGallery } from './about-gallery.js';

function renderSocialLinks() {
  const containers = document.querySelectorAll('[data-social-links]');
  const availableLinks = profile.socials.filter((social) => social.href);

  containers.forEach((container) => {
    if (!availableLinks.length) {
      container.hidden = true;
      return;
    }

    container.innerHTML = availableLinks
      .map(
        ({ label, href, mark, image }) =>
          `<a class="social-link" href="${href}" target="_blank" rel="noopener noreferrer" aria-label="${label} (buka tab baru)"><span aria-hidden="true">${image ? `<img src="${image}" alt="" />` : mark}</span><span>${label}</span></a>`,
      )
      .join('');
  });
}

function configureCvLinks() {
  const cvLinks = document.querySelectorAll('[data-cv-link], .nav-cv');

  cvLinks.forEach((link) => {
    if (profile.cvPath) {
      link.href = profile.cvPath;
      link.setAttribute('download', 'cv-ghaza.pdf');
      link.removeAttribute('aria-disabled');
      return;
    }

    link.href = '#kontak';
    link.setAttribute('aria-disabled', 'true');
    link.title = 'CV tidak tersedia.';
    link.addEventListener('click', (event) => event.preventDefault());
  });
}

function configureProfile() {
  const photo = document.querySelector('[data-profile-photo]');
  photo.src = profile.photo.src;
  photo.alt = profile.photo.alt;
  photo.style.objectPosition = profile.photo.objectPosition;

  document.querySelector('[data-profile-summary]').textContent = profile.summary;
  document.querySelector('meta[property="og:image"]').content = profile.photo.src;
}

function renderExperiences() {
  const host = document.querySelector('[data-experiences]');
  host.innerHTML = experienceGroups
    .filter((group) => group.entries.length)
    .map(
      (group) => `
        <section class="experience-group" aria-labelledby="experience-${group.id}">
          <h3 class="experience-group-title" id="experience-${group.id}">${group.category}</h3>
          <div class="experience-timeline">${group.entries
            .map(
              (item) => `
                <article class="experience-item reveal">
                  <div class="experience-period">
                    <span class="experience-marker" aria-hidden="true"></span>
                    <span>${item.period}</span>
                    ${item.duration ? `<span class="experience-duration">${item.duration}</span>` : ''}
                  </div>
                  <div class="experience-content">
                    <div class="experience-card-heading">
                      <div>
                        <h4>${item.role}</h4>
                        <p class="experience-org">${item.organization}</p>
                      </div>
                      ${item.program ? `<span class="experience-program">${item.program}</span>` : ''}
                    </div>
                    ${item.project ? `<div class="experience-project"><span>Project</span><strong>${item.project}</strong></div>` : ''}
                    <section class="experience-detail-section">
                      <h5>${item.detailLabel || 'Tanggung jawab utama'}</h5>
                      <ul>${item.responsibilities.map((responsibility) => `<li>${responsibility}</li>`).join('')}</ul>
                    </section>
                    ${
                      item.contributions?.length
                        ? `<section class="experience-detail-section experience-contributions">
                            <h5>Kontribusi</h5>
                            <ul>${item.contributions.map((contribution) => `<li>${contribution}</li>`).join('')}</ul>
                          </section>`
                        : ''
                    }
                  </div>
                </article>`,
            )
            .join('')}</div>
        </section>`,
    )
    .join('');
}

function renderCertificates() {
  const host = document.querySelector('[data-certificates]');
  host.innerHTML = certificates
    .map(
      (certificate) => `
        <article class="certificate-card reveal">
          <div class="certificate-media">
            ${
              certificate.image
                ? `<button class="certificate-image${certificate.imageFit === 'contain' ? ' certificate-image-contain' : ''} image-trigger" type="button" data-image-src="${certificate.image}" data-image-alt="${certificate.alt}" data-image-caption="${certificate.title}" aria-label="Perbesar ${certificate.title}">
                    <img src="${certificate.image}" alt="${certificate.alt}" loading="lazy" width="960" height="600" />
                    <span class="image-zoom" aria-hidden="true">↗</span>
                  </button>`
                : `<div class="certificate-image-placeholder" role="img" aria-label="Pratinjau sertifikat ${certificate.title} belum tersedia">
                    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
                      <path d="M14 7.5h14l8 8V40.5H14v-33Z" />
                      <path d="M28 7.5v9h8M19 24h12M19 29h12M19 34h8" />
                    </svg>
                    <span>Pratinjau sertifikat belum tersedia</span>
                  </div>`
            }
            <span class="certificate-year">${certificate.year}</span>
          </div>
          <div class="certificate-copy">
            <h3>${certificate.title}</h3>
            <p>${certificate.issuer}</p>
            ${
              certificate.date
                ? `<p class="certificate-date">${certificate.date}</p>`
                : ''
            }
            ${certificate.detail ? `<p class="certificate-detail">${certificate.detail}</p>` : ''}
            ${
              certificate.certificateNumber
                ? `<p class="certificate-number">No. sertifikat: <span>${certificate.certificateNumber}</span></p>`
                : ''
            }
            ${
              certificate.documentUrl
                ? `<a class="text-link certificate-link" href="${certificate.documentUrl}" target="_blank" rel="noopener noreferrer">Lihat Sertifikat <span aria-hidden="true">↗</span></a>`
                : certificate.image
                  ? `<button class="text-link image-trigger certificate-link" type="button" data-image-src="${certificate.image}" data-image-alt="${certificate.alt}" data-image-caption="${certificate.title}">Lihat Sertifikat <span aria-hidden="true">↗</span></button>`
                  : ''
            }
          </div>
        </article>`,
    )
    .join('');

  initializeCertificates();
}

const toolkitIcons = {
  analysis:
    '<path d="M4 19V5"/><path d="M4 19h16"/><path d="M8 15v-4"/><path d="M12 15V7"/><path d="M16 15V9"/><path d="m7 8 4-3 4 2 4-3"/>',
  database:
    '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
  spreadsheet:
    '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 4v16M15 10v10"/>',
  visualization:
    '<path d="M4 19V5"/><path d="M4 19h16"/><path d="m7 15 4-4 3 2 5-7"/><circle cx="7" cy="15" r="1"/><circle cx="11" cy="11" r="1"/><circle cx="14" cy="13" r="1"/><circle cx="19" cy="6" r="1"/>',
};

function renderToolkitIcon(iconName) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${toolkitIcons[iconName]}</svg>`;
}

function renderToolCard(group, index) {
  return `
    <article class="tool-card reveal">
      <div class="tool-card-heading">
        <span class="tool-icon tool-icon-${group.icon}">${renderToolkitIcon(group.icon)}</span>
        <span class="tool-number" aria-label="Kategori ${String(index + 1).padStart(2, '0')}">${String(index + 1).padStart(2, '0')}</span>
      </div>
      <h3>${group.category}</h3>
      <p class="tool-description">${group.description}</p>
      <ul class="tool-chips" aria-label="Tools ${group.category}">${group.items.map((item) => `<li>${item}</li>`).join('')}</ul>
    </article>`;
}

function renderTools() {
  const host = document.querySelector('[data-tools]');
  host.innerHTML = toolGroups.map(renderToolCard).join('');
}

function renderContactLinks() {
  const host = document.querySelector('[data-contact-links]');
  const links = [
    ...profile.socials.filter((social) => social.href).map((social) => ({
      label: social.label,
      value: social.href.replace(/^https?:\/\//, ''),
      href: social.href,
    })),
    ...(profile.email
      ? [{ label: 'Email', value: profile.email, href: `mailto:${profile.email}` }]
      : []),
    ...(profile.phone
      ? [{ label: 'Telepon', value: profile.phone, href: `tel:${profile.phone.replaceAll(' ', '')}` }]
      : []),
  ];

  const emailButton = document.querySelector('[data-email-link]');
  if (profile.email) {
    emailButton.href = `mailto:${profile.email}`;
    emailButton.textContent = 'Kirim Email';
    emailButton.removeAttribute('aria-disabled');
  } else {
    emailButton.href = '#kontak';
    emailButton.title = 'Alamat email tidak tersedia.';
    emailButton.addEventListener('click', (event) => event.preventDefault());
  }

  host.innerHTML = links
    .map(
      ({ label, value, href }) => `
            <a class="contact-link" href="${href}" ${href.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}>
              <span>${label}</span><strong>${value}</strong><span class="contact-arrow" aria-hidden="true">↗</span>
            </a>`,
    )
    .join('');
}

function initializeImageDialog() {
  const dialog = document.querySelector('.image-dialog');
  const image = dialog.querySelector('img');
  const caption = dialog.querySelector('.dialog-caption');
  const closeButton = dialog.querySelector('.dialog-close');

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('.image-trigger');
    if (!trigger) return;

    image.src = trigger.dataset.imageSrc;
    image.alt = trigger.dataset.imageAlt || '';
    caption.textContent = trigger.dataset.imageCaption || image.alt;
    dialog.showModal();
  });

  closeButton.addEventListener('click', () => dialog.close());
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && dialog.open) dialog.close();
  });
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    image.removeAttribute('src');
    image.alt = '';
  });
}

document.querySelector('[data-current-year]').textContent = new Date().getFullYear();
renderSocialLinks();
configureCvLinks();
configureProfile();
renderExperiences();
renderCertificates();
renderTools();
renderContactLinks();
initializeNavigation();
initializeProjects(projects);
initializeImageDialog();
initializeAboutGallery();
initializeAnimations();
