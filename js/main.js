/*
  main.js — funcionalidades da landing page Lucanza Lobato
  Organização: cada bloco cuida de UMA coisa (menu, formulário, rodapé).
  Tudo roda dentro de um "módulo" (função autoexecutável) para não criar variáveis globais.
*/
(() => {
  "use strict";

  /* ---------- Configurações (edite aqui) ---------- */

  // CONFIRMAR: número real com DDI + DDD, só dígitos. Ex.: 5527999999999
  const NUMERO_WHATSAPP = "5527900000000";

  /* ======================================================
     1. MENU MOBILE
     ====================================================== */

  const botaoMenu = document.querySelector(".header__botao-menu");
  const menu = document.querySelector("#menu-principal");

  // Verdadeiro quando a tela é larga (desktop). Nesse caso o menu é sempre visível.
  const ehDesktop = () => window.matchMedia("(min-width: 900px)").matches;

  function abrirMenu() {
    menu.classList.add("is-aberto");
    botaoMenu.setAttribute("aria-expanded", "true");

    // Foco no primeiro link: quem usa teclado ou leitor de tela entra direto no menu
    const primeiroLink = menu.querySelector("a");
    if (primeiroLink) primeiroLink.focus();
  }

  // devolverFoco: leva o foco de volta ao botão (útil ao fechar com Escape)
  function fecharMenu(devolverFoco = false) {
    menu.classList.remove("is-aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
    if (devolverFoco) botaoMenu.focus();
  }

  function menuEstaAberto() {
    return menu.classList.contains("is-aberto");
  }

  function iniciarMenu() {
    if (!botaoMenu || !menu) return;

    botaoMenu.addEventListener("click", () => {
      menuEstaAberto() ? fecharMenu() : abrirMenu();
    });

    // Fecha ao escolher qualquer link do menu
    menu.addEventListener("click", (evento) => {
      if (evento.target.closest("a")) fecharMenu();
    });

    // Fecha com a tecla Escape e devolve o foco ao botão
    document.addEventListener("keydown", (evento) => {
      if (evento.key === "Escape" && menuEstaAberto()) fecharMenu(true);
    });

    // Fecha ao clicar fora do cabeçalho
    document.addEventListener("click", (evento) => {
      if (menuEstaAberto() && !evento.target.closest(".header")) fecharMenu();
    });

    // Se a janela virar desktop com o menu aberto, limpa o estado
    window.addEventListener("resize", () => {
      if (ehDesktop() && menuEstaAberto()) fecharMenu();
    });
  }

  /* ======================================================
     2. FORMULÁRIO DE AGENDAMENTO
     ====================================================== */

  const formulario = document.querySelector("#formulario-agendamento");

  // Cada campo obrigatório com a mensagem de erro correspondente
  const camposObrigatorios = [
    { id: "nome", erroId: "erro-nome", mensagem: "Informe seu nome." },
    { id: "tipo", erroId: "erro-tipo", mensagem: "Escolha o tipo de atendimento." },
    { id: "bairro", erroId: "erro-bairro", mensagem: "Informe seu bairro ou região." },
  ];

  function mostrarErro(campo, mensagem) {
    const elemento = document.querySelector(`#${campo.id}`);
    document.querySelector(`#${campo.erroId}`).textContent = mensagem;
    elemento.setAttribute("aria-invalid", "true");
  }

  function limparErro(campo) {
    const elemento = document.querySelector(`#${campo.id}`);
    document.querySelector(`#${campo.erroId}`).textContent = "";
    elemento.removeAttribute("aria-invalid");
  }

  // Valida um campo. Retorna true se estiver preenchido.
  function validarCampo(campo) {
    const valor = document.querySelector(`#${campo.id}`).value.trim();
    if (valor === "") {
      mostrarErro(campo, campo.mensagem);
      return false;
    }
    limparErro(campo);
    return true;
  }

  // Valida todos e coloca o foco no primeiro campo com erro
  function validarFormulario() {
    let primeiroInvalido = null;

    camposObrigatorios.forEach((campo) => {
      const valido = validarCampo(campo);
      if (!valido && !primeiroInvalido) primeiroInvalido = campo;
    });

    if (primeiroInvalido) {
      document.querySelector(`#${primeiroInvalido.id}`).focus();
      return false;
    }
    return true;
  }

  function montarMensagem() {
    const nome = document.querySelector("#nome").value.trim();
    const tipo = document.querySelector("#tipo").value;
    const bairro = document.querySelector("#bairro").value.trim();
    const observacoes = document.querySelector("#observacoes").value.trim();

    const linhas = [
      "Olá, Lucanza! Gostaria de solicitar um agendamento.",
      "",
      `Nome: ${nome}`,
      `Atendimento: ${tipo}`,
      `Bairro/região: ${bairro}`,
    ];
    if (observacoes) linhas.push(`Observações: ${observacoes}`);
    linhas.push("", "Entendo que o agendamento só é confirmado após seu retorno.");

    return linhas.join("\n");
  }

  function montarLinkWhatsApp(mensagem) {
    // encodeURIComponent transforma espaços, acentos e quebras de linha em formato seguro para URL
    return `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
  }

  function mostrarStatus(texto) {
    const status = document.querySelector("#status-formulario");
    if (status) status.textContent = texto;
  }

  function enviarParaWhatsApp(evento) {
    evento.preventDefault(); // impede o envio padrão (a página não recarrega)

    if (!validarFormulario()) {
      mostrarStatus("");
      return;
    }

    const link = montarLinkWhatsApp(montarMensagem());
    const novaAba = window.open(link, "_blank", "noopener");

    // Se o navegador bloqueou a nova aba, window.open devolve null
    if (novaAba) {
      mostrarStatus("Abrimos o WhatsApp com sua mensagem. O agendamento só é confirmado pela profissional.");
    } else {
      mostrarStatus("Não foi possível abrir o WhatsApp automaticamente. Permita pop-ups ou tente novamente.");
    }
  }

  function iniciarFormulario() {
    if (!formulario) return;

    formulario.addEventListener("submit", enviarParaWhatsApp);

    // Ao corrigir o campo, o erro some na hora
    camposObrigatorios.forEach((campo) => {
      const elemento = document.querySelector(`#${campo.id}`);
      if (!elemento) return;
      const evento = elemento.tagName === "SELECT" ? "change" : "input";
      elemento.addEventListener(evento, () => {
        if (elemento.value.trim() !== "") limparErro(campo);
      });
    });
  }

  /* ======================================================
     3. BOTÕES DE WHATSAPP (CTA FINAL)
     Links marcados com data-whatsapp ganham o endereço do WhatsApp.
     Sem JavaScript, eles continuam levando ao formulário (href="#contato").
     ====================================================== */

  function iniciarBotoesWhatsApp() {
    const botoes = document.querySelectorAll("[data-whatsapp]");
    const mensagem = "Olá, Lucanza! Gostaria de saber mais sobre o atendimento domiciliar.";

    botoes.forEach((botao) => {
      botao.href = montarLinkWhatsApp(mensagem);
      botao.target = "_blank";
      botao.rel = "noopener noreferrer";
    });
  }

  /* ======================================================
     4. ANO NO RODAPÉ
     ====================================================== */

  function atualizarAno() {
    const ano = document.querySelector("#ano-atual");
    if (ano) ano.textContent = new Date().getFullYear();
  }

  /* ---------- Inicialização ---------- */
  iniciarMenu();
  iniciarFormulario();
  iniciarBotoesWhatsApp();
  atualizarAno();
})();
