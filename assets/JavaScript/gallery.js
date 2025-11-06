// Get all gallery images instead of just one
const galleryImages = document.querySelectorAll(".gallery-item img");
const modalCont = document.getElementById('modal-container');
const modalImg = document.getElementById('modalImage');
const closeBtn = document.getElementById('closeBtn');

if (modalCont && modalImg && closeBtn) {
    // Add click handlers to all gallery images
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            modalCont.classList.add('modal-open'); // Changed class name to modal-open
            modalImg.src = img.src;
            modalImg.alt = img.alt;
        });
    });

    // Close modal when clicking X button
    closeBtn.onclick = () => {
        modalCont.classList.remove('modal-open');
        modalImg.src = '';
    };

    // Close modal when clicking outside the image
    modalCont.addEventListener('click', (e) => {
        if (e.target === modalCont) {
            modalCont.classList.remove('modal-open');
            modalImg.src = '';
        }
    });
}
