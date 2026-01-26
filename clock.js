// Digital Clock Component

class DigitalClock {
    constructor() {
        this.clockElement = null;
        this.intervalId = null;
        this.is24Hour = true;
        this.showSeconds = true;
    }

    // Create clock element
    createClockElement() {
        const clockContainer = document.createElement('div');
        clockContainer.className = 'digital-clock-container';
        clockContainer.innerHTML = `
            <div class="clock-header">
                <h3>Digital Clock</h3>
                <div class="clock-controls">
                    <button class="clock-btn" id="toggleFormat">24H</button>
                    <button class="clock-btn" id="toggleSeconds">Sec</button>
                </div>
            </div>
            <div class="clock-display">
                <span class="clock-time">00:00:00</span>
                <span class="clock-ampm"></span>
            </div>
            <div class="clock-date"></div>
        `;
        return clockContainer;
    }

    // Format time components
    formatTimeComponent(component) {
        return component < 10 ? `0${component}` : component;
    }

    // Get current time string
    getTimeString() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        let ampm = '';

        if (!this.is24Hour) {
            ampm = hours >= 12 ? ' PM' : ' AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // Convert 0 to 12
        }

        const timeString = `${this.formatTimeComponent(hours)}:${this.formatTimeComponent(minutes)}${this.showSeconds ? `:${this.formatTimeComponent(seconds)}` : ''}`;
        
        return { timeString, ampm };
    }

    // Get formatted date
    getDateString() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return now.toLocaleDateString('en-US', options);
    }

    // Update clock display
    updateClock() {
        if (!this.clockElement) return;

        const { timeString, ampm } = this.getTimeString();
        const timeDisplay = this.clockElement.querySelector('.clock-time');
        const ampmDisplay = this.clockElement.querySelector('.clock-ampm');
        const dateDisplay = this.clockElement.querySelector('.clock-date');

        if (timeDisplay) timeDisplay.textContent = timeString;
        if (ampmDisplay) ampmDisplay.textContent = ampm;
        if (dateDisplay) dateDisplay.textContent = this.getDateString();
    }

    // Start the clock
    start() {
        this.updateClock();
        this.intervalId = setInterval(() => this.updateClock(), 1000);
    }

    // Stop the clock
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    // Toggle 24-hour format
    toggleFormat() {
        this.is24Hour = !this.is24Hour;
        const btn = this.clockElement.querySelector('#toggleFormat');
        if (btn) {
            btn.textContent = this.is24Hour ? '24H' : '12H';
            btn.classList.toggle('active', this.is24Hour);
        }
        this.updateClock();
    }

    // Toggle seconds display
    toggleSeconds() {
        this.showSeconds = !this.showSeconds;
        const btn = this.clockElement.querySelector('#toggleSeconds');
        if (btn) {
            btn.classList.toggle('active', this.showSeconds);
        }
        this.updateClock();
    }

    // Initialize and append to container
    init(containerSelector) {
        const container = document.querySelector(containerSelector);
        if (!container) {
            console.error(`Container "${containerSelector}" not found`);
            return;
        }

        this.clockElement = this.createClockElement();
        container.appendChild(this.clockElement);

        // Add event listeners
        const formatBtn = this.clockElement.querySelector('#toggleFormat');
        const secondsBtn = this.clockElement.querySelector('#toggleSeconds');

        if (formatBtn) {
            formatBtn.addEventListener('click', () => this.toggleFormat());
        }

        if (secondsBtn) {
            secondsBtn.addEventListener('click', () => this.toggleSeconds());
        }

        // Start the clock
        this.start();

        return this;
    }

    // Clean up
    destroy() {
        this.stop();
        if (this.clockElement && this.clockElement.parentNode) {
            this.clockElement.parentNode.removeChild(this.clockElement);
        }
        this.clockElement = null;
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Auto-initialize if clock container exists
        const clockContainer = document.querySelector('#clock-section');
        if (clockContainer) {
            const clock = new DigitalClock();
            clock.init('#clock-section');
        }
    });
} else {
    // DOM already loaded
    const clockContainer = document.querySelector('#clock-section');
    if (clockContainer) {
        const clock = new DigitalClock();
        clock.init('#clock-section');
    }
}

// Export for manual initialization
window.DigitalClock = DigitalClock;