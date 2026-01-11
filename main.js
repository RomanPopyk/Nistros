// Path fixer functionality - must run first
const applyPathFixer = () => {
    const basePath = '/Nistros/'; 
    const isGitHubPages = window.location.hostname.endsWith('.github.io') || 
                         window.location.hostname.includes('github.io');

    if (!isGitHubPages) {
        console.log("Not on GitHub Pages, skipping path fixing.");
        return;
    }

    const elementsToFix = document.querySelectorAll('.js-path-fixer');
    
    elementsToFix.forEach(element => {
        let originalPath = '';
        let attributeName = '';

        if (element.hasAttribute('src')) {
            originalPath = element.getAttribute('src');
            attributeName = 'src';
        } else if (element.hasAttribute('href')) {
            originalPath = element.getAttribute('href');
            attributeName = 'href';
        }

        if (originalPath && attributeName && originalPath.startsWith('/') &&
            !originalPath.startsWith('http://') && !originalPath.startsWith('https://') &&
            !originalPath.startsWith('//') && !originalPath.startsWith(basePath)) {
            
            element.setAttribute(attributeName, basePath + originalPath.substring(1));
            console.log(`Path fixed for ${attributeName}: ${originalPath} -> ${element.getAttribute(attributeName)}`);
        }
    });
};

// Apply path fixer immediately
applyPathFixer();


import { IframeApplication } from './back-end/features/iframes-modular.js';
import { SwipeableTabs } from './back-end/features/swipe-overlay.js';
import { CollapsibleManager } from './back-end/features/collapsible-bars.js';


// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the main iframe application
    const iframeApp = new IframeApplication();
    
    // Initialize swipeable tabs
    const swipeableTabs = new SwipeableTabs();
    
    // Initialize collapsible manager
    const collapsibleManager = new CollapsibleManager();
    
    // Make instances globally available if needed
    window.iframeApp = iframeApp;
    window.swipeableTabs = swipeableTabs;
    window.collapsibleManager = collapsibleManager;
    
    console.log('All modules initialized successfully');
});

// Handle refresh for GitHub Pages
window.addEventListener('load', function() {
    if (!sessionStorage.getItem('hasRefreshed')) {
        sessionStorage.setItem('hasRefreshed', 'true');
        setTimeout(function() {
            location.reload();
        }, 2500);
    }
    console.log('Page fully loaded, all modules ready');
});

// Handle any initialization that needs to happen after page load
window.addEventListener('load', () => {
    console.log('Page fully loaded, all modules ready');
});