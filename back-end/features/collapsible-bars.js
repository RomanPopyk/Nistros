// Collapsible functionality class
export class CollapsibleManager {
    constructor() {
        this.bars = {
            more: {
                buttonContainer: document.querySelector('.more-resources-button-container'),
                link: document.querySelector('.more-resources-link'),
                bar: document.querySelector('.collapsible-more-bar')
            },
            settings: {
                buttonContainer: document.querySelector('.settings-button-container'),
                link: document.querySelector('.settings-link'),
                bar: document.querySelector('.collapsible-settings-bar')
            }
        };
        
        this.init();
    }
    
    init() {
        Object.entries(this.bars).forEach(([key, elements]) => {
            if (elements.link && elements.bar && elements.buttonContainer) {
                elements.link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleBarToggle(key);
                });
            } else {
                console.error(`Missing elements for ${key} collapsible menu.`);
            }
        });
        
        document.addEventListener('click', (event) => this.handleOutsideClick(event));
    }
    
    handleBarToggle(activeKey) {
        const activeBars = this.bars[activeKey];
        const otherKey = activeKey === 'more' ? 'settings' : 'more';
        const otherBars = this.bars[otherKey];
        
        const otherBarWasOpen = otherBars.bar?.classList.contains('show');
        const activeBarIsOpen = activeBars.bar?.classList.contains('show');
        
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
        
        if (instant) bar.classList.add('no-transition');
        
        bar.classList.toggle('show', show);
        buttonContainer.classList.toggle('is-active', show);
        
        if (instant) {
            setTimeout(() => bar.classList.remove('no-transition'), 50);
        }
    }
    
    handleOutsideClick(event) {
        Object.values(this.bars).forEach(({ link, bar, buttonContainer }) => {
            const isClickInsideTrigger = link?.contains(event.target);
            const isClickInsideBar = bar?.contains(event.target);
            
            if (bar?.classList.contains('show') && !isClickInsideTrigger && !isClickInsideBar) {
                this.toggleBar({ bar, buttonContainer }, false);
            }
        });
    }
}
