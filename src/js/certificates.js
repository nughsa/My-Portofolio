export function initializeCertificates() {
  document.querySelectorAll('.certificate-card').forEach((card) => {
    const imageButton = card.querySelector('.certificate-image');
    if (!imageButton) return;

    imageButton.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        imageButton.click();
      }
    });
  });
}
