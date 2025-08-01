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

// Handle any initialization that needs to happen after page load
window.addEventListener('load', () => {
    console.log('Page fully loaded, all modules ready');
});