document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('simple-appointment-form');
  if (!form) return;

  const dateEl = document.getElementById('date');
  const statusEl = document.getElementById('form-status');

  // Prevent selecting past dates
  if (dateEl) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateEl.min = `${yyyy}-${mm}-${dd}`;
  }

  function showStatus(msg, ok) {
    if (!statusEl) return;
    statusEl.classList.remove('visually-hidden');
    statusEl.textContent = msg;
    statusEl.style.color = ok ? '#0a3622' : '#7a1a1a';
    statusEl.style.background = ok ? '#d1e7dd' : '#f8d7da';
    statusEl.style.padding = '10px';
    statusEl.style.borderRadius = '8px';
    statusEl.style.marginTop = '8px';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      showStatus('Please fill all required fields correctly.', false);
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());

    showStatus(`Appointment confirmed with ${data.doctor || 'the selected doctor'} on ${data.date} at ${data.time}.`, true);
    form.reset();
    if (dateEl) dateEl.dispatchEvent(new Event('change'));
  });
});
