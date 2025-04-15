/**
 * ====================================================
 * BLOCO PRINCIPAL DE INICIALIZAÇÃO (IIFE - Immediately Invoked Function Expression)
 * ====================================================
 * 
 * Este bloco autoexecutável configura o EmailJS assim que o script é carregado.
 * É uma boa prática para evitar poluição do escopo global.
 * 
 * PONTO PARA APRESENTAÇÃO:
 * - Mostre como isso previne conflitos com outros scripts
 * - Explique que o EmailJS permite enviar e-mails sem backend
 */
(function() {
  // Inicializa o EmailJS com a chave pública do usuário
  emailjs.init("SEU_USER_ID_AQUI"); // Substitua pelo seu User ID do EmailJS
})();

/**
* ====================================================
* SCROLL SUAVE PARA NAVEGAÇÃO INTERNA
* ====================================================
* 
* Adiciona comportamento de scroll animado para todos
* os links internos (que começam com #)
* 
* PONTO PARA APRESENTAÇÃO:
* - Demonstre clicando nos links do menu
* - Compare com/sem o smooth scroll
* - Mencione que melhora a experiência do usuário
*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
      // Previne o comportamento padrão de pular para a âncora
      e.preventDefault();
      
      // Encontra o elemento alvo do link
      const target = document.querySelector(this.getAttribute("href"));
      
      // Se o alvo existir, faz scroll suave até ele
      if (target) {
          target.scrollIntoView({ 
              behavior: "smooth" // Animação suave
          });
      }
  });
});

/**
* ====================================================
* CABEÇALHO DINÂMICO E DESTAQUE DE SEÇÃO ATIVA
* ====================================================
* 
* 1. Muda o estilo do cabeçalho quando o usuário rola a página
* 2. Destaca automaticamente no menu a seção visível
* 
* PONTO PARA APRESENTAÇÃO:
* - Role a página para mostrar as mudanças
* - Explique como isso ajuda na navegação
* - Mostre o cálculo de posição das seções
*/
window.addEventListener("scroll", function() {
  // 1. EFEITO NO CABEÇALHO
  const header = document.getElementById("main-header");
  // Adiciona/remove classe 'scrolled' baseado na posição do scroll
  header.classList.toggle("scrolled", window.scrollY > 50);
  
  // 2. DESTAQUE DA SEÇÃO ATIVA
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");
  let currentSection = "";
  
  // Verifica qual seção está visível
  sections.forEach(section => {
      const sectionTop = section.offsetTop;
      // Considera 200px antes da seção para troca ativa
      if (window.pageYOffset >= sectionTop - 200) {
          currentSection = section.getAttribute("id");
      }
  });
  
  // Atualiza os links do menu
  navLinks.forEach(link => {
      link.classList.remove("active");
      // Destaca o link correspondente à seção atual
      if (link.getAttribute("href") === "#" + currentSection) {
          link.classList.add("active");
      }
  });
});

/**
* ====================================================
* CONTROLE DO MODAL DE AGENDAMENTO
* ====================================================
* 
* Gerencia a abertura e fechamento do popup de agendamento
* 
* PONTO PARA APRESENTAÇÃO:
* - Mostre as três formas de fechar o modal
* - Explique a importância do event.preventDefault()
*/
const modal = document.getElementById("agendamento-modal");
const openModalBtn = document.getElementById("open-modal-btn");

// 1. ABERTURA DO MODAL
openModalBtn.addEventListener("click", () => {
  console.log("Botão Agendar Consulta clicado"); // Log para debug
  modal.style.display = "flex"; // Mostra o modal
});

// 2. FECHAMENTO PELO BOTÃO (X)
const closeModalBtn = document.querySelector(".close-modal");
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none"; // Esconde o modal
});

// 3. FECHAMENTO CLICANDO FORA DO MODAL
window.addEventListener("click", e => {
  if (e.target === modal) {
      modal.style.display = "none";
  }
});

/**
* ====================================================
* PROCESSAMENTO DO FORMULÁRIO DE AGENDAMENTO
* ====================================================
* 
* Valida e envia os dados do formulário usando EmailJS
* 
* PONTO PARA APRESENTAÇÃO:
* - Mostre a validação dos campos obrigatórios
* - Explique a estrutura do templateParams
* - Demonstre o feedback ao usuário
*/
const form = document.getElementById("agendamento-form");
form.addEventListener("submit", e => {
  // Previne o envio tradicional do formulário
  e.preventDefault();
  
  // COLETA DOS DADOS
  const nome = document.getElementById("nome").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const email = document.getElementById("email").value.trim();
  const data = document.getElementById("data").value;
  const horario = document.getElementById("horario").value;
  const servico = document.getElementById("servico").value;
  const mensagem = document.getElementById("mensagem").value.trim();
  
  // VALIDAÇÃO DOS CAMPOS OBRIGATÓRIOS
  if (!nome || !telefone || !email || !data || !horario || !servico) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return; // Interrompe o processamento se faltar dados
  }
  
  // PREPARA OS DADOS PARA ENVIO
  const templateParams = {
      nome,
      telefone,
      email,
      data,
      horario,
      servico,
      mensagem
  };
  
  // ENVIA VIA EMAILJS
  emailjs.send("SEU_SERVICE_ID_AQUI", "SEU_TEMPLATE_ID_AQUI", templateParams)
      .then(
          () => {
              // SUCESSO
              alert("Solicitação enviada com sucesso! Entraremos em contato em breve.");
              modal.style.display = "none"; // Fecha o modal
              form.reset(); // Limpa o formulário
          },
          error => {
              // ERRO
              console.error("Erro ao enviar solicitação:", error);
              alert("Ocorreu um erro ao enviar a solicitação. Tente novamente mais tarde.");
          }
      );
});