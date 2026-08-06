export function initForm(){

// Form handling
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Enviando...</span>';
    submitBtn.disabled = true;

    setTimeout(() => {
      formSuccess.classList.remove('hidden');
      form.reset();
      submitBtn.innerHTML = originalHTML;
      submitBtn.disabled = false;
      setTimeout(() => formSuccess.classList.add('hidden'), 6000);
    }, 900);
  });


}
  