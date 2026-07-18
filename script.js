/* Time*/
function updateClock() {
  const now = new Date();

  const timeEl = document.getElementById("live-time");
  const dateEl = document.getElementById("live-date");
  if (!timeEl || !dateEl) return; // halaman ini nggak punya elemen jam, skip

  const jam = String(now.getHours()).padStart(2, "0");
  const menit = String(now.getMinutes()).padStart(2, "0");
  timeEl.textContent = `${jam}:${menit}`;

  const namaHari = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const namaBulan = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  dateEl.textContent = `${namaHari[now.getDay()]}, ${now.getDate()} ${namaBulan[now.getMonth()]} ${now.getFullYear()}`;
}

updateClock();
setInterval(updateClock, 1000); 

/* Theme */
const themeToggleBtn = document.getElementById("theme-toggle");

// Saat halaman dibuka, cek preferensi tersimpan (biar konsisten pindah halaman)
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
  if (themeToggleBtn) themeToggleBtn.textContent = "☀️";
}

updateBrandIcons();

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", function () {
    document.body.classList.toggle("light");
    const isLight = document.body.classList.contains("light");

    // Simpan pilihan user supaya kepakai lagi walau pindah halaman/refresh
    localStorage.setItem("theme", isLight ? "light" : "dark");
    updateBrandIcons();

    themeToggleBtn.textContent = isLight ? "☀️" : "🌙";
  });
}

/* Formspree (contact) */
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault(); // stop form reload halaman kayak biasa

    const statusEl = document.getElementById("form-status");
    const submitBtn = document.getElementById("submit-btn");

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    statusEl.textContent = "";
    statusEl.className = "form-status";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        statusEl.textContent = "Message sent successfully! Thank you for reaching out.";
        statusEl.classList.add("success");
        contactForm.reset();
      } else {
        statusEl.textContent = "Failed to send message. Please try again or email directly.";
        statusEl.classList.add("error");
      }
    } catch (err) {
      statusEl.textContent = "Failed to send message. Please check your internet connection.";
      statusEl.classList.add("error");
    }

    submitBtn.disabled = false;
    submitBtn.textContent = "Submit";
  });
}

function updateBrandIcons() {
  const isLight = document.body.classList.contains("light");

  const pairs = [
    ["icon-linkedin-card", "linkblack.png", "linkwhite.png"],
    ["icon-github-card", "gitblack.png", "gitwhite.png"],
    ["icon-github-cardd", "gitblack.png", "gitwhite.png"],
    ["icon-linkedin-dock", "linkblack.png", "linkwhite.png"],
    ["icon-linkedin-dockk", "linkblack.png", "linkwhite.png"],
    ["icon-linkedin-dockkk", "linkblack.png", "linkwhite.png"],
    ["icon-github-dock", "gitblack.png", "gitwhite.png"],
    ["icon-github-dockk", "gitblack.png", "gitwhite.png"],
    ["icon-github-dockkk", "gitblack.png", "gitwhite.png"],
    ["icon-discord", "dc-black.png", "dc-white.png"],
    ["icon-instagram", "ig-black.png", "ig-white.png"],
  ];

  pairs.forEach(([id, blackFile, whiteFile]) => {
    const el = document.getElementById(id);
    if (el) {
      el.src = isLight
        ? `assets/icons/${blackFile}`
        : `assets/icons/${whiteFile}`;
    }
  });
}