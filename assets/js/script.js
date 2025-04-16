document.addEventListener("DOMContentLoaded", function () {
  // Inicializar EmailJS
  emailjs.init("SEU_USER_ID_AQUI"); 
  
  // Smooth scroll para links de navegação
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
  
  // CONTROLE DO MENU HAMBÚRGUER
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.cabeçalho-link');
  const header = document.getElementById('main-header');
  
  // Abrir/Fechar menu
  menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
      this.setAttribute('aria-expanded', this.classList.contains('active'));
      
      // bloq/liberar rolagem
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });
  
  // Fechar menu ao clicar nos links (mobile)
  document.querySelectorAll('.cabeçalho-link a').forEach(link => {
      link.addEventListener('click', () => {
          if (window.innerWidth <= 768) {
              menuToggle.classList.remove('active');
              navLinks.classList.remove('active');
              menuToggle.setAttribute('aria-expanded', 'false');
              document.body.style.overflow = '';
          }
      });
  });
  
  // Fechar menu ao clicar fora (mobile)
  document.addEventListener('click', function(e) {
      if (window.innerWidth <= 768 && 
          !navLinks.contains(e.target) && 
          e.target !== menuToggle && 
          !menuToggle.contains(e.target)) {
          menuToggle.classList.remove('active');
          navLinks.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
      }
  });
  
  // Fechar menu ao redimensionar para desktop
  window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
          menuToggle.classList.remove('active');
          navLinks.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
      }
  });

  // Controle do cabeçalho durante scroll
  window.addEventListener("scroll", function () {
    const header = document.getElementById("main-header");
    header.classList.toggle("scrolled", window.scrollY > 50);

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");
    let current = "";

    const headerHeight = header.offsetHeight;
    sections.forEach((section) => {
      if (window.pageYOffset >= section.offsetTop - headerHeight) {
        current = section.getAttribute("id");
      }
    });
    
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });

  // Controle do Modal de Agendamento
  const modal = document.getElementById("agendamento-modal");
  const openModalBtn = document.getElementById("open-modal-btn");
  if (openModalBtn) {
    openModalBtn.addEventListener("click", () => {
      console.log("Botão Agendar Consulta clicado!");
      modal.style.display = "flex";
    });
  }

  const closeModalBtn = document.querySelector(".close-modal");
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === modal) 
      modal.style.display = "none";
  });

  // Processamento do formulário via EmailJS
  const form = document.getElementById("agendamento-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nome = document.getElementById("nome").value.trim();
      const telefone = document.getElementById("telefone").value.trim();
      const email = document.getElementById("email").value.trim();
      const data = document.getElementById("data").value;
      const horario = document.getElementById("horario").value;
      const servico = document.getElementById("servico").value;
      const mensagem = document.getElementById("mensagem").value.trim();

      if (!nome || !telefone || !email || !data || !horario || !servico) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
      }

      const templateParams = {
        nome,
        telefone,
        email,
        data,
        horario,
        servico,
        mensagem,
      };

      emailjs
        .send("", "", templateParams)
        .then(
          () => {
            alert("Solicitação enviada com sucesso! Entraremos em contato em breve.");
            modal.style.display = "none";
            form.reset();
          },
          (error) => {
            console.error("Erro ao enviar solicitação:", error);
            alert("Ocorreu um erro ao enviar a solicitação. Tente novamente mais tarde.");
          }
        );
    });
  }
});