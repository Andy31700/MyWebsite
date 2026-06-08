document.addEventListener('DOMContentLoaded', () => {

  // =============================
  // Toggle Dark / Light Mode
  // =============================
  
  setTimeout(() => {
    loader.classList.add('fade-out');
  }, 1600);

  // =============================
  // Toggle Dark / Light Mode
  // =============================
  const switchInput = document.getElementById('switch');
  const body = document.body;
  const loader = document.getElementById('loader');

  setTimeout(() => {
    loader.classList.add('fade-out');
  }, 1600);

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

  // Révéler les bulles et projets au scroll
  const animatedElements = document.querySelectorAll('.fade-in-up', '.fadin-in-left', 'fadin-in-right');

  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    animatedElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < triggerBottom) {
        el.classList.add('show');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // =============================
  // Loader Matrix
  // =============================

  // Créer des colonnes matrix
  function createMatrixColumns() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
    
    for (let i = 0; i < 20; i++) {
      const column = document.createElement('div');
      column.className = 'matrix-column';
      column.style.left = (i * 5) + '%';
      column.style.animationDelay = -(Math.random() * 3) + 's';
      column.style.animationDuration = (3 + Math.random()) + 's';
      
      let text = '';
      for (let j = 0; j < 30; j++) {
        text += chars[Math.floor(Math.random() * chars.length)] + '<br>';
      }
      column.innerHTML = text;
      
      loader.appendChild(column);
    }
  }

  createMatrixColumns();

  setTimeout(() => {
    loader.classList.add('fade-out');
  }, 2200);

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
  // Slider section projet
  // =============================
  const projectsTitle = document.getElementById("projects-title");
  const schoolProjects = document.getElementById("school-projects");
  const personalProjects = document.getElementById("personal-projects");

  let showingSchool = true;

  function toggleProjects(direction) {
    const current = showingSchool ? schoolProjects : personalProjects;
    const next = showingSchool ? personalProjects : schoolProjects;
    current.classList.remove("active");
    current.classList.add(direction === "next" ? "exit-left" : "exit-right");
    setTimeout(() => {
      current.classList.remove("exit-left", "exit-right");
    }, 600);
    next.classList.add("active");
    projectsTitle.textContent = showingSchool ? "PROJETS PERSONNELS" : "PROJETS SCOLAIRES";
    showingSchool = !showingSchool;
  }

  document.getElementById("next").addEventListener("click", () => toggleProjects("next"));
  document.getElementById("prev").addEventListener("click", () => toggleProjects("prev"));

  // =============================
  // Timeline animation au scroll (ligne fluide)
  // =============================
  const timelineLine = document.querySelector('.timeline-line');
  const timelineWrapper = document.querySelector('.timeline-wrapper');
  const timelineItems = document.querySelectorAll('.timeline-item');

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
    if (!timelineWrapper || !timelineLine) return;

    const wrapperTop = timelineWrapper.offsetTop;
    const wrapperHeight = timelineWrapper.offsetHeight;
    const firstItem = timelineItems[0];
    const lastItem = timelineItems[timelineItems.length - 1];
    
    const firstCenter = firstItem.offsetTop + firstItem.offsetHeight / 2;
    const lastCenter = lastItem.offsetTop + lastItem.offsetHeight / 2;
    const totalLineHeight = lastCenter - firstCenter;

    const scrollY = window.scrollY + window.innerHeight / 2;
    let progress = (scrollY - (wrapperTop + firstCenter)) / totalLineHeight;

    progress = Math.max(0, Math.min(1, progress));

    timelineLine.style.top = firstCenter + 'px';
    timelineLine.style.height = (totalLineHeight * progress) + 'px';
  };

  window.addEventListener('scroll', () => {
    revealTimelineItems();
    animateTimelineLine();
  });
  window.addEventListener('resize', animateTimelineLine);

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
    // Validation basique
    const email = form.querySelector('input[type="email"]').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Veuillez entrer une adresse email valide");
      return;
    }
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
  // Scroll to top button
  // =============================
  const scrollToTopBtn = document.getElementById('scrollToTop');

  if (scrollToTopBtn) {
    // Afficher/masquer le bouton selon le scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    });

    // Action au clic
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Debounce pour les événements scroll
    function debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    }

    window.addEventListener('scroll', debounce(() => {
      revealOnScroll();
      revealTimelineItems();
      animateTimelineLine();
    }, 10));

    form.addEventListener("submit", async function(event) {
      event.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Envoi...</span>';
      
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.reset();
        submitBtn.innerHTML = '<span>✓ Envoyé</span>';
        setTimeout(() => {
          submitBtn.innerHTML = '<img src="assets/send.png" alt="Envoyer" class="send-icon">';
          submitBtn.disabled = false;
        }, 3000);
      } else {
        alert("Une erreur est survenue. Réessayez.");
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<img src="assets/send.png" alt="Envoyer" class="send-icon">';
      }
    });
});
