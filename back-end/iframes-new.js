// Update links and text with search input dynamically
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-field");
  const searchButton = document.querySelector(".update-button");
  const dynamicIframes = document.querySelectorAll(".dynamic-iframe");
  const collapsibleLinks = document.querySelectorAll(".collapsible-icon-link");
  const originalTitle = document.title;

  // Consolidated site URL mapping
  const siteUrlMap = {
    "de-wiktionary": (term) => `https://de.wiktionary.org/wiki/${term}`,
    "en-wiktionary": (term) => `https://en.wiktionary.org/wiki/${term}`,
    "fr-wiktionary": (term) => `https://fr.wiktionary.org/wiki/${term}`,
    "sk-wiktionary": (term) => `https://sk.wiktionary.org/wiki/${term}`,
    etymonline: (term) => `https://www.etymonline.com/search?q=${term}`,
    "dict-de-ua": (term) =>
      `https://dict.com/%D0%BD%D1%96%D0%BC%D0%B5%D1%86%D1%8C%D0%BA%D0%BE-%D1%83%D0%BA%D1%80%D0%B0%D1%96%D0%BD%D1%81%D1%8C%D0%BA%D0%B8%D0%B8/${term}`,
    "dict-en-ua": (term) =>
      `https://dict.com/%D0%B0%D0%BD%D0%B3%D0%BB%D1%96%D0%B8%D1%81%D1%8C%D0%BA%D0%BE-%D1%83%D0%BA%D1%80%D0%B0%D1%96%D0%BD%D1%81%D1%8C%D0%BA%D0%B8%D0%B8/${term}`,
    "dict-fr-ua": (term) =>
      `https://dict.com/%D1%84%D1%80%D0%B0%D0%BD%D1%86%D1%83%D0%B7%D1%8C%D0%BA%D0%BE-%D1%83%D0%BA%D1%80%D0%B0%D1%96%D0%BD%D1%81%D1%8C%D0%BA%D0%B8%D0%B8/${term}`,
    "dict-sk-ua": (term) =>
      `https://dict.com/%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%86%D1%8C%D0%BA%D0%BE-%D1%83%D0%BA%D1%80%D0%B0%D1%96%D0%BD%D1%81%D1%8C%D0%BA%D0%B8%D0%B8/${term}`,
    "de-wikipedia": (term) => `https://de.wikipedia.org/wiki/${term}`,
    "en-wikipedia": (term) => `https://en.wikipedia.org/wiki/${term}`,
    "fr-wikipedia": (term) => `https://fr.wikipedia.org/wiki/${term}`,
    "sk-wikipedia": (term) => `https://sk.wikipedia.org/wiki/${term}`,
    "glosbe-fr-ua": (term) => `https://glosbe.com/fr/uk/${term}`,
    "glosbe-sk-ua": (term) => `https://glosbe.com/sk/uk/${term}`,
    "conjugation-fr": (term) =>
      `https://conjugation-fr.com/conjugate.php?verb=${term}`,
    "google-images-fr": (term) =>
      `https://www.google.com/search?udm=2&q=${term}%20site:.fr`,
    "google-images-sk": (term) =>
      `https://www.google.com/search?udm=2&q=${term}%20site:.sk`,
    e2u: (term) =>
      `https://e2u.org.ua/s?w=${term}&dicts=all&highlight=on&filter_lines=on`,
    "reverso-fr-ua": (term) =>
      `https://context.reverso.net/translation/french-ukrainian/${term}`,
    forvo: (term) => `https://forvo.com/search/${term}`,
    "cnrtl-etymology": (term) => `https://www.cnrtl.fr/etymologie/${term}`,
    littre: (term) => `https://www.littre.org/definition/${term}`,
    "lingea-sk-ua": (term) =>
      `https://slovniky.lingea.sk/ukrajinsko-slovensky/${term}`,
    "narecie-sk": (term) => `https://narecie.sk/${term}`,
    juls: (term) => `https://slovnik.juls.savba.sk/?w=${term}&s=exact`,
  };

  // Generate site-specific URLs
  const generateSiteUrl = (siteName, searchTerm) => {
    const processedSearchTerm = encodeURIComponent(
      searchTerm.trim().toLowerCase(),
    );
    const urlGenerator = siteUrlMap[siteName];

    if (urlGenerator) {
      return urlGenerator(processedSearchTerm);
    }

    console.warn(`Unknown target site: ${siteName}. Cannot generate URL.`);
    return "";
  };

  // Update all links and page title
  const updateLinks = () => {
    const searchTerm = searchInput.value.trim();
    if (!searchTerm) {
      alert("Please enter a search term.");
      return;
    }

    // Update all dynamic elements
    [...dynamicIframes, ...collapsibleLinks].forEach((element) => {
      const targetSite = element.dataset.targetSite;
      const newUrl = generateSiteUrl(targetSite, searchTerm);

      if (newUrl) {
        if (element.tagName === "IFRAME") {
          element.src = newUrl;
        } else {
          element.href = newUrl;
        }
      }
    });

    // Update page title with the search term
    document.title = `${searchTerm} - ${originalTitle}`;
  };

  // Event listeners for search
  searchButton?.addEventListener("click", updateLinks);
  searchInput?.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchInput.blur();
      updateLinks();
    }
  });
});

// Layout switching
function switchLayout(layoutType) {
  const layouts = {
    "tab-layout": document.getElementById("tab-layout"),
    "grid-layout": document.getElementById("grid-layout"),
  };

  // Hide all layouts
  Object.values(layouts).forEach((layout) => {
    if (layout) {
      layout.style.display = "none";
      layout.classList.remove("active");
    }
  });

  // Remove active class from all layout options
  document.querySelectorAll(".iframe-layout-option").forEach((option) => {
    option.classList.remove("active");
  });

  // Show selected layout
  if (layoutType === "iframe-tabs" && layouts["tab-layout"]) {
    layouts["tab-layout"].style.display = "block";
    document
      .querySelector(".iframe-layout-option:nth-child(1)")
      ?.classList.add("active");
  } else if (layoutType === "grid" && layouts["grid-layout"]) {
    layouts["grid-layout"].classList.add("active");
    document
      .querySelector(".iframe-layout-option:nth-child(2)")
      ?.classList.add("active");
  }

  document.getElementById(layoutType)?.checked = true;
}

// Tab switching
function switchTab(tabClass, clickedButton) {
  // Remove active class from all tabs and buttons
  document.querySelectorAll(".tab-content, .tab-button").forEach((el) => {
    el.classList.remove("active");
  });

  // Activate selected tab
  const selectedTab = document.querySelector(`.${tabClass}.tab-content`);
  if (selectedTab) {
    selectedTab.classList.add("active");
    clickedButton?.classList.add("active");
  } else {
    console.warn(`Tab content with class '${tabClass}' not found.`);
  }
}
// Swipe feature
class SwipeableTabs {
  constructor() {
    this.currentIndex = 0;
    this.totalTabs = 6;
    this.isInteracting = false;
    this.startX = 0;
    this.threshold = 50; // Minimum swipe distance

    this.tabButtons = document.querySelectorAll(".tab-button");
    this.tabContents = document.querySelectorAll(".tab-content");
    this.progressDots = document.querySelectorAll(".progress-dot");
    this.swipeOverlay = document.getElementById("swipe-overlay");

    this.init();
  }

  init() {
    this.bindEvents();
    this.updateActiveStates();
  }

  bindEvents() {
    if (this.swipeOverlay) {
      this.swipeOverlay.addEventListener(
        "mousedown",
        this.handleStart.bind(this),
      );
      this.swipeOverlay.addEventListener(
        "touchstart",
        this.handleStart.bind(this),
        { passive: false },
      );
      this.swipeOverlay.addEventListener("contextmenu", (e) =>
        e.preventDefault(),
      );
    }

    ["mousemove", "touchmove"].forEach((event) => {
      document.addEventListener(event, this.handleMove.bind(this), {
        passive: false,
      });
    });

    ["mouseup", "touchend"].forEach((event) => {
      document.addEventListener(event, this.handleEnd.bind(this));
    });

    this.tabButtons.forEach((button, index) => {
      button.addEventListener("click", () => this.switchTab(index));
    });
  }

  handleStart(e) {
    this.isInteracting = true;
    this.startX = e.type === "mousedown" ? e.clientX : e.touches[0].clientX;
    if (e.type === "touchstart") e.preventDefault();
  }

  handleMove(e) {
    if (!this.isInteracting) return;

    const currentX = e.type === "mousemove" ? e.clientX : e.touches[0].clientX;
    const deltaX = currentX - this.startX;

    // Visual feedback during swipe
    if (Math.abs(deltaX) > 10 && this.swipeOverlay) {
      this.swipeOverlay.style.transform = `translateX(${deltaX * 0.1}px)`;
    }

    if (e.type === "touchmove") e.preventDefault();
  }

  handleEnd(e) {
    if (!this.isInteracting) return;

    this.isInteracting = false;
    if (this.swipeOverlay) this.swipeOverlay.style.transform = "";

    const endX = e.type === "mouseup" ? e.clientX : e.changedTouches[0].clientX;
    const deltaX = endX - this.startX;

    if (Math.abs(deltaX) > this.threshold) {
      if (deltaX > 0 && this.currentIndex > 0) {
        // Swipe right - go to previous tab
        this.switchTab(this.currentIndex - 1);
      } else if (deltaX < 0 && this.currentIndex < this.totalTabs - 1) {
        // Swipe left - go to next tab
        this.switchTab(this.currentIndex + 1);
      }
    }
  }

  switchTab(index) {
    if (index < 0 || index >= this.totalTabs || index === this.currentIndex)
      return;

    this.currentIndex = index;
    this.updateActiveStates();
  }

  updateActiveStates() {
    this.tabButtons.forEach((button, index) => {
      button.classList.toggle("active", index === this.currentIndex);
    });

    // Slide to the active tab
    const tabWrapper = document.getElementById("tab-wrapper");
    if (tabWrapper) {
      const translateX = -(this.currentIndex * (100 / this.totalTabs));
      tabWrapper.style.transform = `translateX(${translateX}%)`;
    }

    // Update progress dots
    this.progressDots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentIndex);
    });
  }
}

// Collapsible functionality class
class CollapsibleManager {
  constructor() {
    this.bars = {
      more: {
        buttonContainer: document.querySelector(
          ".more-resources-button-container",
        ),
        link: document.querySelector(".more-resources-link"),
        bar: document.querySelector(".collapsible-more-bar"),
      },
      settings: {
        buttonContainer: document.querySelector(".settings-button-container"),
        link: document.querySelector(".settings-link"),
        bar: document.querySelector(".collapsible-settings-bar"),
      },
    };

    this.init();
  }

  init() {
    Object.entries(this.bars).forEach(([key, elements]) => {
      if (elements.link && elements.bar && elements.buttonContainer) {
        elements.link.addEventListener("click", (e) => {
          e.preventDefault();
          this.handleBarToggle(key);
        });
      } else {
        console.error(`Missing elements for ${key} collapsible menu.`);
      }
    });

    document.addEventListener("click", (event) =>
      this.handleOutsideClick(event),
    );
  }

  handleBarToggle(activeKey) {
    const activeBars = this.bars[activeKey];
    const otherKey = activeKey === "more" ? "settings" : "more";
    const otherBars = this.bars[otherKey];

    const otherBarWasOpen = otherBars.bar?.classList.contains("show");
    const activeBarIsOpen = activeBars.bar?.classList.contains("show");

    // Close other bar instantly if open
    if (otherBarWasOpen) {
      this.toggleBar(otherBars, false, true);
    }

    // Toggle active bar (instantly if other was open)
    const instant = !activeBarIsOpen && otherBarWasOpen;
    this.toggleBar(activeBars, !activeBarIsOpen, instant);
  }

  toggleBar(barElements, show, instant = false) {
    const { bar, buttonContainer } = barElements;
    if (!bar || !buttonContainer) return;

    if (instant) bar.classList.add("no-transition");

    bar.classList.toggle("show", show);
    buttonContainer.classList.toggle("is-active", show);

    if (instant) {
      setTimeout(() => bar.classList.remove("no-transition"), 50);
    }
  }

  handleOutsideClick(event) {
    Object.values(this.bars).forEach(({ link, bar, buttonContainer }) => {
      const isClickInsideTrigger = link?.contains(event.target);
      const isClickInsideBar = bar?.contains(event.target);

      if (
        bar?.classList.contains("show") &&
        !isClickInsideTrigger &&
        !isClickInsideBar
      ) {
        this.toggleBar({ bar, buttonContainer }, false);
      }
    });
  }
}

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new SwipeableTabs();
  new CollapsibleManager();

  // Clear search functionality
  const inputToClear = document.getElementById("search-input");
  const clearBtn = document.getElementById("clear-button");

  if (inputToClear && clearBtn) {
    const updateClearButton = () => {
      clearBtn.style.display = inputToClear.value ? "block" : "none";
    };

    ["input", "change", "autocomplete", "focus"].forEach((event) => {
      inputToClear.addEventListener(event, updateClearButton);
    });

    clearBtn.addEventListener("click", () => {
      inputToClear.value = "";
      clearBtn.style.display = "none";
      inputToClear.focus();
    });

    updateClearButton();
  }

  // Update French title text based on window width
  const titleElement = document.getElementById("french-title");
  if (titleElement) {
    const updateTitleText = () => {
      titleElement.textContent =
        window.innerWidth <= 400 ? "French" : "Search French words";
    };

    updateTitleText();
    window.addEventListener("resize", updateTitleText);
  }

  // Mobile tap optimization
  document.body.addEventListener("touchstart", () => {}, false);
});

// Show tab content after page loads
window.addEventListener("load", () => {
  document.querySelectorAll(".tab-content").forEach((element) => {
    element.style.display = "block";
  });
});

// Export for global access
window.switchTab = switchTab;
