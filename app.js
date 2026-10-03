(() => {
  "use strict";

  const config = window.SERSEA_CONFIG;

  if (!config) {
    console.error("SERSEA_CONFIG is missing.");
    return;
  }

  const translations = {
    de: {
      skipLink: "Direkt zu meinen Links",
      heroEyebrow: "Cosplay & Digital Creator",
      heroLead: "Cosplay, Fotos, Videos & ein bisschen Chaos ♡",
      heroTopics: "Neue Looks · kurze Videos · kreative Momente",
      exploreButton: "Folge mir",
      messageButton: "Schreib mir",
      officialLinks: "Alle Links auf dieser Seite sind offiziell.",
      followLabel: "Finde mich online",
      followTitle: "Meine drei wichtigsten Plattformen.",
      followIntro: "Fotos, Reels, kurze Videos und Updates — wähle einfach deine Lieblingsplattform.",
      messageLabel: "Direkter Kontakt",
      messageTitle: "Du möchtest mir schreiben?",
      messageIntro: "Telegram ist der schnellste Weg. WhatsApp und Signal funktionieren natürlich auch.",
      proofLabel: "Community",
      proofTitle: "Schon ziemlich viele von uns. ♡",
      proofIntro: "Ungefähre Reichweite über meine Communities und echte Website-Aufrufe.",
      proofTotal: "Follows insgesamt",
      proofTelegram: "Telegram-Community",
      proofLanguages: "Sprachen",
      visitorLabel: "Website-Aufrufe",
      aboutLabel: "Über Sersea Rou",
      aboutTitle: "Cosplay, Kamera und immer wieder ein neuer Look.",
      aboutText: "Ich liebe es, mit Looks, Rollen, Licht und kleinen Geschichten zu spielen — mal süß, mal dramatisch, aber immer ich.",
      tagCosplay: "Cosplay",
      tagPhotos: "Fotos",
      tagVideos: "Videos",
      tagStories: "Stories",
      diaryLabel: "Visual Diary",
      diaryTitle: "Ein paar Momente aus meiner Welt.",
      diaryIntro: "Cosplay, Looks und kleine Szenen — ohne festen Rahmen, einfach als Teil meiner Welt.",
      contactLabel: "Business",
      contactTitle: "Kooperation oder kreatives Projekt?",
      contactText: "Für Kooperationen und professionelle Anfragen erreichst du mich per E-Mail.",
      contactButton: "E-Mail schreiben",
      privacy: "Datenschutz",
      imprint: "Impressum"
    },

    en: {
      skipLink: "Skip to my links",
      heroEyebrow: "Cosplay & Digital Creator",
      heroLead: "Cosplay, photos, videos & a little chaos ♡",
      heroTopics: "New looks · short videos · creative moments",
      exploreButton: "Follow me",
      messageButton: "Message me",
      officialLinks: "Every link on this page is official.",
      followLabel: "Find me online",
      followTitle: "My three main platforms.",
      followIntro: "Photos, reels, short videos and updates — pick your favorite platform.",
      messageLabel: "Direct contact",
      messageTitle: "Want to say hi?",
      messageIntro: "Telegram is the quickest way. WhatsApp and Signal work too.",
      proofLabel: "Community",
      proofTitle: "There are quite a few of us already. ♡",
      proofIntro: "Approximate reach across my communities and real website visits.",
      proofTotal: "combined follows",
      proofTelegram: "Telegram community",
      proofLanguages: "languages",
      visitorLabel: "website visits",
      aboutLabel: "About Sersea Rou",
      aboutTitle: "Cosplay, camera and always a new look.",
      aboutText: "I love playing with looks, characters, light and little stories — sometimes cute, sometimes dramatic, but always me.",
      tagCosplay: "Cosplay",
      tagPhotos: "Photos",
      tagVideos: "Videos",
      tagStories: "Stories",
      diaryLabel: "Visual Diary",
      diaryTitle: "A few moments from my world.",
      diaryIntro: "Cosplay, looks and little scenes — without a rigid frame, simply part of my world.",
      contactLabel: "Business",
      contactTitle: "Collaboration or creative project?",
      contactText: "For collaborations and professional enquiries, reach me by email.",
      contactButton: "Write by email",
      privacy: "Privacy",
      imprint: "Impressum"
    },

    ru: {
      skipLink: "Перейти к моим ссылкам",
      heroEyebrow: "Cosplay & Digital Creator",
      heroLead: "Косплей, фото, видео и немного хаоса ♡",
      heroTopics: "Новые образы · короткие видео · творческие моменты",
      exploreButton: "Подписаться",
      messageButton: "Написать мне",
      officialLinks: "Все ссылки на этой странице официальные.",
      followLabel: "Найди меня онлайн",
      followTitle: "Три мои главные платформы.",
      followIntro: "Фото, рилсы, короткие видео и обновления — выбирай любимую платформу.",
      messageLabel: "Связаться напрямую",
      messageTitle: "Хочешь написать мне?",
      messageIntro: "Telegram — самый быстрый вариант. WhatsApp и Signal тоже работают.",
      proofLabel: "Сообщество",
      proofTitle: "Нас уже довольно много. ♡",
      proofIntro: "Примерный общий охват моих сообществ и реальные посещения сайта.",
      proofTotal: "подписок на платформах",
      proofTelegram: "сообщество Telegram",
      proofLanguages: "языка",
      visitorLabel: "посещений сайта",
      aboutLabel: "О Sersea Rou",
      aboutTitle: "Косплей, камера и всегда новый образ.",
      aboutText: "Мне нравится играть с образами, персонажами, светом и маленькими историями — иногда милыми, иногда драматичными, но всегда моими.",
      tagCosplay: "Косплей",
      tagPhotos: "Фото",
      tagVideos: "Видео",
      tagStories: "Истории",
      diaryLabel: "Visual Diary",
      diaryTitle: "Несколько моментов из моего мира.",
      diaryIntro: "Косплей, образы и маленькие сцены — без жёстких рамок, просто часть моего мира.",
      contactLabel: "Business",
      contactTitle: "Сотрудничество или творческий проект?",
      contactText: "По вопросам сотрудничества и профессиональным предложениям напиши мне на email.",
      contactButton: "Написать по email",
      privacy: "Конфиденциальность",
      imprint: "Правовая информация"
    }
  };

  const socialContainer = document.querySelector("#social-cards");
  const messageContainer = document.querySelector("#message-cards");
  const languageButtons = [...document.querySelectorAll("[data-language]")];
  const yearElement = document.querySelector("#current-year");
  const businessEmailLink = document.querySelector("#business-email-link");
  const visitorCountElement = document.querySelector("#visitor-count");

  let activeLanguage = config.defaultLanguage || "de";
  let visitorCountValue = 0;

  function createBadge(item) {
    const badge = document.createElement("span");
    badge.className = "card-badge";
    badge.setAttribute("aria-hidden", "true");

    if (item.icon) {
      const icon = document.createElement("img");
      icon.className = "card-badge__icon";
      icon.src = item.icon;
      icon.alt = "";
      icon.loading = "eager";
      icon.decoding = "async";
      badge.append(icon);
    } else {
      badge.textContent = item.badge || item.name.slice(0, 2).toUpperCase();
    }

    return badge;
  }

  function createLinkCard(item, type) {
    const link = document.createElement("a");
    const isMessage = type === "message";

    link.className = isMessage ? "message-card" : "social-card";
    link.href = item.url;
    link.target = "_blank";
    link.rel = isMessage ? "noopener noreferrer" : "me noopener noreferrer";
    link.referrerPolicy = "no-referrer";
    link.dataset.itemId = item.id;
    link.setAttribute("aria-label", `${item.name}: ${item.descriptions[activeLanguage] || item.descriptions.de}`);

    if (item.featured) {
      link.classList.add("is-featured");
    }

    const head = document.createElement("div");
    head.className = "card-head";

    const identity = document.createElement("div");
    identity.className = "card-identity";

    const name = document.createElement("span");
    name.className = "card-name";
    name.textContent = item.name;

    identity.append(createBadge(item), name);

    const arrow = document.createElement("span");
    arrow.className = "card-arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";

    head.append(identity, arrow);

    const description = document.createElement("p");
    description.className = "card-description";
    description.textContent = item.descriptions[activeLanguage] || item.descriptions.de;

    link.append(head, description);

    if (item.audience) {
      const audience = document.createElement("span");
      audience.className = "card-audience";
      audience.textContent = item.audience[activeLanguage] || item.audience.de;
      link.append(audience);
    }

    if (item.featured) {
      const preferred = document.createElement("span");
      preferred.className = "card-preferred";
      preferred.textContent = activeLanguage === "de"
        ? "Empfohlen"
        : activeLanguage === "ru"
          ? "Рекомендуется"
          : "Recommended";
      link.append(preferred);
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

  function updateVisitorCount() {
    if (!visitorCountElement) return;

    visitorCountElement.textContent = new Intl.NumberFormat(activeLanguage).format(
      visitorCountValue
    );
  }

  async function loadVisitorCount() {
    if (!visitorCountElement) return;

    try {
      const response = await fetch(
        "https://serenacersea.goatcounter.com/counter/%2Fhome.json",
        { cache: "no-store" }
      );

      if (!response.ok) {
        throw new Error(`Counter request failed: ${response.status}`);
      }

      const data = await response.json();
      const parsedValue = Number(String(data.count || "0").replace(/[^0-9]/g, ""));

      visitorCountValue = Number.isFinite(parsedValue) ? parsedValue : 0;
    } catch (error) {
      visitorCountValue = 0;
      console.warn("Visitor counter is not available yet.", error);
    }

    updateVisitorCount();
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
    updateVisitorCount();
  }

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyLanguage(button.dataset.language);
    });
  });

  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }

  if (businessEmailLink && config.businessEmail) {
    const subject = encodeURIComponent("Business enquiry — Sersea Rou");
    businessEmailLink.href = `mailto:${config.businessEmail}?subject=${subject}`;
  }

  applyLanguage(activeLanguage);
  loadVisitorCount();
})();
