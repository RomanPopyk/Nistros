// Swipe feature
export class SwipeableTabs {
    constructor() {
        this.currentIndex = 0;
        this.totalTabs = 6;
        this.isInteracting = false;
        this.startX = 0;
        this.threshold = 50; // Minimum swipe distance
        
        this.tabButtons = document.querySelectorAll('.tab-button');
        this.tabContents = document.querySelectorAll('.tab-content');
        this.progressDots = document.querySelectorAll('.progress-dot');
        this.swipeOverlay = document.getElementById('swipe-overlay');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateActiveStates();
    }
    
    bindEvents() {
        if (this.swipeOverlay) {
            this.swipeOverlay.addEventListener('mousedown', this.handleStart.bind(this));
            this.swipeOverlay.addEventListener('touchstart', this.handleStart.bind(this), { passive: false });
            this.swipeOverlay.addEventListener('contextmenu', (e) => e.preventDefault());
        }
        
        ['mousemove', 'touchmove'].forEach(event => {
            document.addEventListener(event, this.handleMove.bind(this), { passive: false });
        });
        
        ['mouseup', 'touchend'].forEach(event => {
            document.addEventListener(event, this.handleEnd.bind(this));
        });
        
        this.tabButtons.forEach((button, index) => {
            button.addEventListener('click', () => this.switchTab(index));
        });
    }
    
    handleStart(e) {
        this.isInteracting = true;
        this.startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        if (e.type === 'touchstart') e.preventDefault();
    }
    
    handleMove(e) {
        if (!this.isInteracting) return;
        
        const currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        const deltaX = currentX - this.startX;
        
        // Visual feedback during swipe
        if (Math.abs(deltaX) > 10 && this.swipeOverlay) {
            this.swipeOverlay.style.transform = `translateX(${deltaX * 0.1}px)`;
        }
        
        if (e.type === 'touchmove') e.preventDefault();
    }
    
    handleEnd(e) {
        if (!this.isInteracting) return;
        
        this.isInteracting = false;
        if (this.swipeOverlay) this.swipeOverlay.style.transform = '';
        
        const endX = e.type === 'mouseup' ? e.clientX : e.changedTouches[0].clientX;
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
        if (index < 0 || index >= this.totalTabs || index === this.currentIndex) return;
        
        this.currentIndex = index;
        this.updateActiveStates();
    }
    
    updateActiveStates() {
        this.tabButtons.forEach((button, index) => {
            button.classList.toggle('active', index === this.currentIndex);
        });
        
         // Slide to the active tab
        const tabWrapper = document.getElementById('tab-wrapper');
        if (tabWrapper) {
            const translateX = -(this.currentIndex * (100 / this.totalTabs));
            tabWrapper.style.transform = `translateX(${translateX}%)`;
        }
        
        // Update progress dots
        this.progressDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }
}
