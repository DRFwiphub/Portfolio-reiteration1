import { galleryArray } from "./imagearray.js";
import { modal, modalCaption, modalClose, modalImg, modalNext, modalPrev } from "./domElements.js"; 

export function initProjectGallery({ galleryArray, containerSelector = '.gallery-grid' } = {}) {
  if (!Array.isArray(galleryArray) || galleryArray.length === 0) {
    console.warn('initProjectGallery: galleryArray is empty or not provided.');
    return;
  }

  // Find the intended container
  const container = document.querySelector(containerSelector) || document.querySelector('.gallery-grid');
  if (!container) {
    console.warn('initProjectGallery: gallery container not found.');
    return;
  }



  // Track which project and image is open
  let currentProject = 0;
  let currentImage = 0;

  // Helper: show image by project and image index
  function showImage(projectIdx, imageIdx) {
    const project = galleryArray[projectIdx];
    if (!project) return;
    const images = project.images;
    imageIdx = Math.max(0, Math.min(imageIdx, images.length - 1));
    const data = images[imageIdx];
    modalImg.src = data.src;
    modalImg.alt = data.alt || '';
    modalCaption.textContent = project.name + (data.alt ? ' - ' + data.alt : '');
    currentProject = projectIdx;
    currentImage = imageIdx;

    modalPrev.classList.toggle('hidden', imageIdx === 0);
    modalNext.classList.toggle('hidden', imageIdx === images.length - 1);
  }

  function openModal() {
    if (!modal) return;
    document.body.classList.add('modal-open');
    modal.classList.add('open');
    // put focus on close button
  }

  function openModalAt(projectIdx, imageIdx = 0) {
    showImage(projectIdx, imageIdx);
    openModal();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
  }

  // Build one .gallery-item per project (show first image as thumbnail)
  container.innerHTML = '';
  galleryArray.forEach((project, i) => {
    const img = document.createElement('img');
    img.className = 'gallery-item';
    img.src = project.images[0].src;
    img.alt = project.name + ' - Thumbnail';
    img.setAttribute('data-project', i);
    img.tabIndex = 0;
    container.appendChild(img);
  });

  // Attach click/keyboard listeners to all .gallery-item elements
  container.querySelectorAll('.gallery-item').forEach(el => {
    el.addEventListener('click', (e) => {
      const projectIdx = Number(el.getAttribute('data-project')) || 0;
      openModalAt(projectIdx, 0);
    });
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const projectIdx = Number(el.getAttribute('data-project')) || 0;
        openModalAt(projectIdx, 0);
      }
    });
  });

  // Modal controls
  modalPrev.addEventListener('click', () => {
    if (currentImage > 0) showImage(currentProject, currentImage - 1);
  });
  modalNext.addEventListener('click', () => {
    const project = galleryArray[currentProject];
    if (currentImage < project.images.length - 1) showImage(currentProject, currentImage + 1);
  });
  modalClose.addEventListener('click', closeModal);

  // click outside content to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // keyboard navigation when modal is open
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') { closeModal(); return; }
    if (e.key === 'ArrowLeft' && currentIndex > 0) { showImage(currentIndex - 1); return; }
    if (e.key === 'ArrowRight' && currentIndex < galleryArray.length - 1) { showImage(currentIndex + 1); return; }
  });

  // Preload images for smoother navigation (optional: can be omitted)
  galleryArray.forEach(project => {
    project.images.forEach(img => {
      const pre = new Image();
      pre.src = img.src;
    });
  });
}















