(() => {
  "use strict";

  const config = window.CERSEA_CONFIG;

  if (!config) {
    console.error("CERSEA_CONFIG is missing.");
    return;
  }

  const translations = {
    en: {
      heroEyebrow: "The visual world of",
      heroLead: "A visual journal shaped by two worlds.",
      heroTopics: "Photography · Video · Quiet moments · Thoughts",
      exploreButton: "Explore my journal",
      messageButton: "Contact",
      followLabel: "Follow my journal",
      followTitle: "Choose where our stories continue.",
      followIntro: "Photos, videos, everyday moments and reflections — each platform shows a different part of my world.",
      messageLabel: "Contact",
      messageTitle: "Choose your preferred messenger.",
      messageIntro: "Use Telegram, Signal or WhatsApp for messages and general enquiries. All links on this page are official.",
      aboutLabel: "About Serena Cersea",
      aboutTitle: "A visual life between cultures, places and ideas.",
      aboutText: "This is my journal — a collection of photographs, videos, quiet moments and personal reflections.",
      projectsLabel: "Creative projects",
      projectsTitle: "More stories are taking shape.",
      projectsText: "Films, visual experiments, educational ideas and digital projects will gradually appear here.",
      contactLabel: "Business contact",
      contactTitle: "Collaborations and creative work.",
      contactText: "For collaborations and professional enquiries, contact me by email.",
      contactButton: "Write by email",
      privacy: "Privacy",
      imprint: "Impressum",
      comingSoon: "Link coming soon"
    },
    de: {
      heroEyebrow: "Die visuelle Welt von",
      heroLead: "Ein visuelles Journal, geprägt von zwei Welten.",
      heroTopics: "Fotografie · Video · Ruhige Momente · Gedanken",
      exploreButton: "Mein Journal entdecken",
      messageButton: "Kontakt",
      followLabel: "Meinem Journal folgen",
      followTitle: "Wähle, wo unsere Geschichten weitergehen.",
      followIntro: "Fotos, Videos, Alltagsmomente und Gedanken — jede Plattform zeigt eine andere Seite meiner Welt.",
      messageLabel: "Kontakt",
      messageTitle: "Wähle deinen bevorzugten Messenger.",
      messageIntro: "Nutze Telegram, Signal oder WhatsApp für Nachrichten und allgemeine Anfragen. Alle Links auf dieser Seite sind offiziell.",
      aboutLabel: "Über Serena Cersea",
      aboutTitle: "Ein visuelles Leben zwischen Kulturen, Orten und Ideen.",
      aboutText: "Dies ist mein Journal — eine Sammlung aus Fotografien, Videos, ruhigen Momenten und persönlichen Gedanken.",
      projectsLabel: "Kreative Projekte",
      projectsTitle: "Weitere Geschichten entstehen.",
      projectsText: "Filme, visuelle Experimente, Bildungsideen und digitale Projekte werden nach und nach hier erscheinen.",
      contactLabel: "Geschäftlicher Kontakt",
      contactTitle: "Kooperationen und kreative Arbeit.",
      contactText: "Für Kooperationen und professionelle Anfragen kontaktiere mich per E-Mail.",
      contactButton: "E-Mail schreiben",
      privacy: "Datenschutz",
      imprint: "Impressum",
      comingSoon: "Link folgt"
    },
    ru: {
      heroEyebrow: "Визуальный мир",
      heroLead: "Визуальный журнал, созданный двумя мирами.",
      heroTopics: "Фотография · Видео · Тихие моменты · Мысли",
      exploreButton: "Открыть мой журнал",
      messageButton: "Связаться",
      followLabel: "Следить за моим журналом",
      followTitle: "Выберите, где продолжатся наши истории.",
      followIntro: "Фотографии, видео, повседневные моменты и размышления — каждая платформа показывает другую часть моего мира.",
      messageLabel: "Связаться",
      messageTitle: "Выберите удобный мессенджер.",
      messageIntro: "Используйте Telegram, Signal или WhatsApp для сообщений и общих вопросов. Все ссылки на этой странице официальные.",
      aboutLabel: "О Serena Cersea",
      aboutTitle: "Визуальная жизнь между культурами, местами и идеями.",
      aboutText: "Это мой журнал — коллекция фотографий, видео, тихих моментов и личных размышлений.",
      projectsLabel: "Творческие проекты",
      projectsTitle: "Новые истории обретают форму.",
      projectsText: "Фильмы, визуальные эксперименты, образовательные идеи и цифровые проекты постепенно появятся здесь.",
      contactLabel: "Деловой контакт",
      contactTitle: "Сотрудничество и творческая работа.",
      contactText: "По вопросам сотрудничества и профессиональным предложениям напишите мне по электронной почте.",
      contactButton: "Написать по email",
      privacy: "Конфиденциальность",
      imprint: "Правовая информация",
      comingSoon: "Ссылка появится позже"
    }
  };

  const socialContainer = document.querySelector("#social-cards");
  const messageContainer = document.querySelector("#message-cards");
  const languageButtons = [...document.querySelectorAll("[data-language]")];
  const yearElement = document.querySelector("#current-year");
  const businessEmailLink = document.querySelector("#business-email-link");

  let activeLanguage = config.defaultLanguage || "en";

  function createLinkCard(item, type) {
    const hasUrl = typeof item.url === "string" && item.url.trim() !== "";
    const link = document.createElement("a");

    link.className = type === "message" ? "message-card" : "social-card";
    link.href = hasUrl ? item.url : "#";
    link.dataset.itemId = item.id;

    if (hasUrl) {
      link.target = "_blank";
      link.rel = type === "social" ? "me noopener noreferrer" : "noopener noreferrer";
      link.referrerPolicy = "no-referrer";
    } else {
      link.classList.add("is-disabled");
      link.setAttribute("aria-disabled", "true");
      link.addEventListener("click", (event) => event.preventDefault());
    }

    const content = document.createElement("div");
    const topLine = document.createElement("div");
    topLine.className = "card-topline";

    const name = document.createElement("span");
    name.className = "card-name";
    name.textContent = item.name;

    const arrow = document.createElement("span");
    arrow.className = "card-arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "→";

    const description = document.createElement("p");
    description.className = "card-description";
    description.textContent = item.descriptions[activeLanguage] || item.descriptions.en;

    topLine.append(name, arrow);
    content.append(topLine, description);
    link.append(content);

    if (!hasUrl && type !== "message") {
      const status = document.createElement("span");
      status.className = "card-status";
      status.textContent = translations[activeLanguage].comingSoon;
      link.append(status);
    }

    return link;
  }

  function renderCards() {
    socialContainer.replaceChildren(
      ...config.socialLinks.map((item) => createLinkCard(item, "social"))
    );

    messageContainer.replaceChildren(
      ...config.messageLinks.map((item) => createLinkCard(item, "message"))
    );
  }

  function applyLanguage(language) {
    if (!translations[language]) return;

    activeLanguage = language;
    document.documentElement.lang = language;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      const value = translations[language][key];

      if (value) {
        element.textContent = value;
      }
    });

    languageButtons.forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.language === language)
      );
    });

    renderCards();
  }

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyLanguage(button.dataset.language);
    });
  });

  yearElement.textContent = String(new Date().getFullYear());

  if (businessEmailLink && config.businessEmail) {
    const subject = encodeURIComponent("Business enquiry — Serena Cersea");
    businessEmailLink.href = `mailto:${config.businessEmail}?subject=${subject}`;
  }

  applyLanguage(activeLanguage);
})();
