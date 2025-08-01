// Site URL mapping configuration
const siteUrlMap = {
    'de-wiktionary': (term) => `https://de.wiktionary.org/wiki/${term}`,
    'en-wiktionary': (term) => `https://en.wiktionary.org/wiki/${term}`,
    'fr-wiktionary': (term) => `https://fr.wiktionary.org/wiki/${term}`,
    'sk-wiktionary': (term) => `https://sk.wiktionary.org/wiki/${term}`,
    'etymonline': (term) => `https://www.etymonline.com/search?q=${term}`,
    'dict-de-ua': (term) => `https://dict.com/%D0%BD%D1%96%D0%BC%D0%B5%D1%86%D1%8C%D0%BA%D0%BE-%D1%83%D0%BA%D1%80%D0%B0%D1%96%D0%BD%D1%81%D1%8C%D0%BA%D0%B8%D0%B8/${term}`,
    'dict-en-ua': (term) => `https://dict.com/%D0%B0%D0%BD%D0%B3%D0%BB%D1%96%D0%B8%D1%81%D1%8C%D0%BA%D0%BE-%D1%83%D0%BA%D1%80%D0%B0%D1%96%D0%BD%D1%81%D1%8C%D0%BA%D0%B8%D0%B8/${term}`,
    'dict-fr-ua': (term) => `https://dict.com/%D1%84%D1%80%D0%B0%D0%BD%D1%86%D1%83%D0%B7%D1%8C%D0%BA%D0%BE-%D1%83%D0%BA%D1%80%D0%B0%D1%96%D0%BD%D1%81%D1%8C%D0%BA%D0%B8%D0%B8/${term}`,
    'dict-sk-ua': (term) => `https://dict.com/%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%86%D1%8C%D0%BA%D0%BE-%D1%83%D0%BA%D1%80%D0%B0%D1%96%D0%BD%D1%81%D1%8C%D0%BA%D0%B8%D0%B8/${term}`,
    'de-wikipedia': (term) => `https://de.wikipedia.org/wiki/${term}`,
    'en-wikipedia': (term) => `https://en.wikipedia.org/wiki/${term}`,
    'fr-wikipedia': (term) => `https://fr.wikipedia.org/wiki/${term}`,
    'sk-wikipedia': (term) => `https://sk.wikipedia.org/wiki/${term}`,
    'glosbe-fr-ua': (term) => `https://glosbe.com/fr/uk/${term}`,
    'glosbe-sk-ua': (term) => `https://glosbe.com/sk/uk/${term}`,
    'conjugation-fr': (term) => `https://conjugation-fr.com/conjugate.php?verb=${term}`,
    'google-images-fr': (term) => `https://www.google.com/search?udm=2&q=${term}%20site:.fr`,
    'google-images-sk': (term) => `https://www.google.com/search?udm=2&q=${term}%20site:.sk`,
    'e2u': (term) => `https://e2u.org.ua/s?w=${term}&dicts=all&highlight=on&filter_lines=on`,
    'reverso-fr-ua': (term) => `https://context.reverso.net/translation/french-ukrainian/${term}`,
    'forvo': (term) => `https://forvo.com/search/${term}`,
    'cnrtl-etymology': (term) => `https://www.cnrtl.fr/etymologie/${term}`,
    'littre': (term) => `https://www.littre.org/definition/${term}`,
    'lingea-sk-ua': (term) => `https://slovniky.lingea.sk/ukrajinsko-slovensky/${term}`,
    'narecie-sk': (term) => `https://narecie.sk/${term}`,
    'juls': (term) => `https://slovnik.juls.savba.sk/?w=${term}&s=exact`
};

// Main Search Manager Class
class SearchManager {
    constructor() {
        this.searchInput = null;
        this.searchButton = null;
        this.dynamicIframes = [];
        this.collapsibleLinks = [];
        this.originalTitle = '';
        
        this.init();
    }
    
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        this.searchInput = document.querySelector('.search-field');
        this.searchButton = document.querySelector('.update-button');
        this.dynamicIframes = document.querySelectorAll('.dynamic-iframe');
        this.collapsibleLinks = document.querySelectorAll('.collapsible-icon-link');
        this.originalTitle = document.title;
        
        this.bindEvents();
    }
    
    bindEvents() {
        this.searchButton?.addEventListener('click', () => this.updateLinks());
        this.searchInput?.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                this.searchInput.blur();
                this.updateLinks();
            }
        });
    }
    
    generateSiteUrl(siteName, searchTerm) {
        const processedSearchTerm = encodeURIComponent(searchTerm.trim().toLowerCase());
        const urlGenerator = siteUrlMap[siteName];
        
        if (urlGenerator) {
            return urlGenerator(processedSearchTerm);
        }
        
        console.warn(`Unknown target site: ${siteName}. Cannot generate URL.`);
        return '';
    }
    
    updateLinks() {
        const searchTerm = this.searchInput?.value.trim();
        if (!searchTerm) {
            alert("Please enter a search term.");
            return; 
        }

        // Update all dynamic elements
        [...this.dynamicIframes, ...this.collapsibleLinks].forEach(element => {
            const targetSite = element.dataset.targetSite;
            const newUrl = this.generateSiteUrl(targetSite, searchTerm);
            
            if (newUrl) {
                if (element.tagName === 'IFRAME') {
                    element.src = newUrl;
                } else {
                    element.href = newUrl;
                }
            }
        });

        // Update page title with the search term
        document.title = `${searchTerm} - ${this.originalTitle}`;
    }
}

// Layout Manager Class
class LayoutManager {
    constructor() {
        this.layouts = {};
        this.init();
    }
    
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        this.layouts = {
            'tab-layout': document.getElementById('tab-layout'),
            'grid-layout': document.getElementById('grid-layout')
        };
    }
    
    switchLayout(layoutType) {
        // Hide all layouts
        Object.values(this.layouts).forEach(layout => {
            if (layout) {
                layout.style.display = 'none';
                layout.classList.remove('active');
            }
        });
        
        // Remove active class from all layout options
        document.querySelectorAll('.iframe-layout-option').forEach(option => {
            option.classList.remove('active');
        });
        
        // Show selected layout
        if (layoutType === 'iframe-tabs' && this.layouts['tab-layout']) {
            this.layouts['tab-layout'].style.display = 'block';
            document.querySelector('.iframe-layout-option:nth-child(1)')?.classList.add('active');
        } else if (layoutType === 'grid' && this.layouts['grid-layout']) {
            this.layouts['grid-layout'].classList.add('active');
            document.querySelector('.iframe-layout-option:nth-child(2)')?.classList.add('active');
        }
        
        document.getElementById(layoutType)?.checked = true;
    }
}

// Tab Manager Class
class TabManager {
    switchTab(tabClass, clickedButton) {
        // Remove active class from all tabs and buttons
        document.querySelectorAll('.tab-content, .tab-button').forEach(el => {
            el.classList.remove('active');
        });
        
        // Activate selected tab
        const selectedTab = document.querySelector(`.${tabClass}.tab-content`);
        if (selectedTab) {
            selectedTab.classList.add('active');
            clickedButton?.classList.add('active');
        } else {
            console.warn(`Tab content with class '${tabClass}' not found.`);
        }
    }
}

// UI Enhancement Manager Class
class UIEnhancementManager {
    constructor() {
        this.init();
    }
    
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
        
        window.addEventListener('load', () => this.showTabContent());
    }
    
    setup() {
        this.setupClearButton();
        this.setupTitleResizing();
        this.setupMobileTapOptimization();
    }
    
    setupClearButton() {
        const inputToClear = document.getElementById('search-input');
        const clearBtn = document.getElementById('clear-button');
        
        if (inputToClear && clearBtn) {
            const updateClearButton = () => {
                clearBtn.style.display = inputToClear.value ? 'block' : 'none';
            };
            
            ['input', 'change', 'autocomplete', 'focus'].forEach(event => {
                inputToClear.addEventListener(event, updateClearButton);
            });
            
            clearBtn.addEventListener('click', () => {
                inputToClear.value = '';
                clearBtn.style.display = 'none';
                inputToClear.focus();
            });
            
            updateClearButton();
        }
    }
    
    setupTitleResizing() {
        const titleElement = document.getElementById('french-title');
        if (titleElement) {
            const updateTitleText = () => {
                titleElement.textContent = window.innerWidth <= 380 ? 'French' : 'Search French words';
            };
            
            updateTitleText();
            window.addEventListener('resize', updateTitleText);
        }
    }
    
    setupMobileTapOptimization() {
        document.body.addEventListener('touchstart', () => {}, false);
    }
    
    showTabContent() {
        document.querySelectorAll('.tab-content').forEach(element => {
            element.style.display = 'block';
        });
    }
}

// Main Application Class
class IframeApplication {
    constructor() {
        this.searchManager = new SearchManager();
        this.layoutManager = new LayoutManager();
        this.tabManager = new TabManager();
        this.uiEnhancementManager = new UIEnhancementManager();
        
        // Make switchTab globally accessible for backward compatibility
        window.switchTab = (tabClass, clickedButton) => {
            this.tabManager.switchTab(tabClass, clickedButton);
        };
        
        // Make switchLayout globally accessible
        window.switchLayout = (layoutType) => {
            this.layoutManager.switchLayout(layoutType);
        };
    }
    
    // Public API methods
    updateSearch() {
        this.searchManager.updateLinks();
    }
    
    switchLayout(layoutType) {
        this.layoutManager.switchLayout(layoutType);
    }
    
    switchTab(tabClass, clickedButton) {
        this.tabManager.switchTab(tabClass, clickedButton);
    }
}

// Export for use in other modules
export {
    SearchManager,
    LayoutManager,
    TabManager,
    UIEnhancementManager,
    IframeApplication,
    siteUrlMap
};

// For backward compatibility and direct script usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SearchManager,
        LayoutManager,
        TabManager,
        UIEnhancementManager,
        IframeApplication,
        siteUrlMap
    };
}

// Auto-initialize when used as a direct script
if (typeof window !== 'undefined' && !window.iframeApp) {
    window.iframeApp = new IframeApplication();
}