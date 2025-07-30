document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('consultation-form');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const birthdate = form.birthdate.value;

    if (!name || !email || !birthdate) {
      alert('❗ Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('https://astroscience-2.onrender.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, birthdate })
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ Booking successful: ' + data.message);
        form.reset();
      } else {
        alert('❌ Error: ' + (data.error || 'Something went wrong.'));
      }

    } catch (err) {
      console.error('Fetch error:', err);
      alert('❌ Failed to connect to server.');
    }
  });
})