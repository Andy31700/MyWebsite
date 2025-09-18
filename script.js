document.addEventListener('DOMContentLoaded', () => {

  // =============================
  // Toggle Dark / Light Mode
  // =============================
  const switchInput = document.getElementById('switch');
  const body = document.body;

  if (switchInput) {
    // Appliquer le thème sauvegardé
    if (localStorage.getItem('theme') === 'dark') {
      body.classList.add('dark');
      switchInput.checked = true;
    }

    switchInput.addEventListener('change', () => {
      if (switchInput.checked) {
        body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    });
  }

  // =============================
  // CV Modal
  // =============================
  const cvBtn = document.getElementById('cvBtn');
  const cvModal = document.getElementById('cvModal');
  const closeModal = document.getElementById('closeModal');

  if (cvBtn && cvModal && closeModal) {
    cvBtn.addEventListener('click', () => cvModal.style.display = 'flex');
    closeModal.addEventListener('click', () => cvModal.style.display = 'none');
    window.addEventListener('click', e => {
      if (e.target === cvModal) cvModal.style.display = 'none';
    });
  }

  // =============================
  // Smooth Scroll pour les liens
  // =============================
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // =============================
  // Timeline animation au scroll
  // =============================
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineLine = document.querySelector('.timeline-line');
  const timelineWrapper = document.querySelector('.timeline-wrapper');

  const revealTimelineItems = () => {
    const triggerBottom = window.innerHeight * 0.85;
    timelineItems.forEach(item => {
      const top = item.getBoundingClientRect().top;
      if (top < triggerBottom) {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }
    });
  };

  const animateTimelineLine = () => {
    if (!timelineWrapper || !timelineLine || timelineItems.length === 0) return;

    let lastVisible = null;
    timelineItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) lastVisible = item;
    });

    if (lastVisible) {
      const first = timelineItems[0];
      const firstCenter = first.offsetTop + first.offsetHeight / 2;
      const lastCenter = lastVisible.offsetTop + lastVisible.offsetHeight / 2;
      timelineLine.style.top = firstCenter + 'px';
      timelineLine.style.height = (lastCenter - firstCenter) + 'px';
    }
  };

  window.addEventListener('scroll', () => {
    revealTimelineItems();
    animateTimelineLine();
  });
  window.addEventListener('resize', animateTimelineLine);

  // init
  revealTimelineItems();
  animateTimelineLine();

  // =============================
  // Fallback image profil
  // =============================
  const img = document.querySelector('#profilePic img');
  if (img) {
    fetch(img.src).catch(() => {
      img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><rect fill="#ff8a73" width="100%" height="100%"/><g fill="#fff" font-family="Arial, Helvetica, sans-serif" font-size="80" text-anchor="middle"><text x="50%" y="55%" dy=".35em">AD</text></g></svg>');
    });
  }

  // =============================
  // Formulaire de contact
  // =============================
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", async function(event) {
      event.preventDefault();
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.reset();
        alert("Message envoyé !");
      } else {
        alert("Une erreur est survenue. Réessayez.");
      }
    });
  }

  // =============================
  // Toggle Projets scolaires/personnels
  // =============================
  const projectsTitle = document.getElementById("projects-title");
  const personalProjects = document.getElementById("personal-projects");
  const schoolProjects = document.getElementById("school-projects");

  if (projectsTitle && personalProjects && schoolProjects) {
    let showingSchool = true;

    const toggleProjects = () => {
      if (showingSchool) {
        projectsTitle.textContent = "PROJETS PERSONNELS";
        schoolProjects.style.display = "none";
        personalProjects.style.display = "grid";
      } else {
        projectsTitle.textContent = "PROJETS SCOLAIRES";
        personalProjects.style.display = "none";
        schoolProjects.style.display = "grid";
      }
      showingSchool = !showingSchool;
    };

    document.querySelectorAll(".arrow-btn").forEach(btn => {
      btn.addEventListener("click", toggleProjects);
    });
  }

});
