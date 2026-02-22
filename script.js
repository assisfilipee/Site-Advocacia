const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    if(window.scrollY > 50){
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });





  (function(){
    const form = document.getElementById("contactForm");
    if(!form) return;

    form.addEventListener("submit", function(e){
      e.preventDefault();

      const data = new FormData(form);
      const nome = (data.get("nome") || "").toString().trim();
      const email = (data.get("email") || "").toString().trim();
      const telefone = (data.get("telefone") || "").toString().trim();
      const sede = (data.get("sede") || "").toString().trim();
      const especialidade = (data.get("especialidade") || "").toString().trim();
      const mensagem = (data.get("mensagem") || "").toString().trim();

      if(!nome || !email || !sede || !especialidade || !mensagem){
        alert("Por favor, preencha os campos obrigatórios.");
        return;
      }

      const to = "SEUEMAIL@DOMINIO.COM"; // <-- TROQUE AQUI
      const subject = encodeURIComponent("Contato via site — Assis Advogados");
      const body = encodeURIComponent(
`Nome: ${nome}
E-mail: ${email}
Telefone: ${telefone}
Sede: ${sede}
Especialidade: ${especialidade}

Mensagem:
${mensagem}`
      );

      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    });
  })();









  const toggle = document.querySelector(".nav__toggle");
const menu = document.querySelector(".menu");

toggle.addEventListener("click", () => {
  menu.classList.toggle("is-open");

  const expanded = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", !expanded);
});









/* =========================
   NAV PREMIUM (mobile)
   - abre/fecha drawer
   - overlay fecha
   - ESC fecha
   - fecha ao clicar em link
   - dropdown vira accordion (abre/fecha)
   - fecha outros dropdowns ao abrir um (premium)
========================= */
(() => {
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.querySelector(".menu");
  const overlay = document.querySelector(".nav__overlay");

  if (!toggle || !menu) return;

  const openNav = () => {
    document.body.classList.add("nav-open");
    toggle.setAttribute("aria-expanded", "true");
  };

  const closeNav = () => {
    document.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");

    // fecha dropdowns abertos
    menu.querySelectorAll(".dropdown.is-open").forEach(d => d.classList.remove("is-open"));
  };

  const isOpen = () => document.body.classList.contains("nav-open");

  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    isOpen() ? closeNav() : openNav();
  });

  if (overlay){
    overlay.addEventListener("click", closeNav);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) closeNav();
  });

  /* ==================================================
     Accordion: abre submenu no clique do link pai
     - No mobile/tablet (<= 991.98px), o link pai vira botão
     - Ao abrir um dropdown, fecha os outros (premium)
  ================================================== */
  menu.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;

    const dropdown = a.closest(".dropdown");
    const isParentLink = dropdown && dropdown.querySelector(":scope > a") === a;

    // mobile/tablet: link pai controla o submenu
    if (isParentLink && window.matchMedia("(max-width: 991.98px)").matches){
      e.preventDefault();

      // fecha outros dropdowns antes de abrir o atual (premium)
      menu.querySelectorAll(".dropdown.is-open").forEach(d => {
        if (d !== dropdown) d.classList.remove("is-open");
      });

      dropdown.classList.toggle("is-open");
      return;
    }

    // clique em link normal: fecha menu
    closeNav();
  });

  /* ==================================================
     Segurança: se redimensionar pra desktop com menu aberto,
     fecha tudo pra não “vazar” estados.
  ================================================== */
  window.addEventListener("resize", () => {
    if (!window.matchMedia("(max-width: 991.98px)").matches && isOpen()){
      closeNav();
    }
  });
})();