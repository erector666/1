// Digital Watch Component

class DigitalWatch {
    constructor() {
        this.watchElement = null;
        this.intervalId = null;
        this.mode = 'clock'; // clock, stopwatch, timer, alarm
        this.isRunning = false;
        this.is24Hour = true;
        this.showSeconds = true;
        
        // Stopwatch variables
        this.stopwatchStartTime = 0;
        this.stopwatchElapsed = 0;
        
        // Timer variables
        this.timerDuration = 0;
        this.timerRemaining = 0;
        
        // Alarm variables
        this.alarms = [];
        this.alarmTime = null;
    }

    // Create watch element
    createWatchElement() {
        const watchContainer = document.createElement('div');
        watchContainer.className = 'digital-watch-container';
        watchContainer.innerHTML = `
            <div class="watch-header">
                <h3>Digital Watch</h3>
                <div class="watch-tabs">
                    <button class="watch-tab active" data-mode="clock">Clock</button>
                    <button class="watch-tab" data-mode="stopwatch">Stopwatch</button>
                    <button class="watch-tab" data-mode="timer">Timer</button>
                    <button class="watch-tab" data-mode="alarm">Alarm</button>
                </div>
            </div>
            
            <!-- Clock Mode -->
            <div class="watch-mode watch-mode-clock active">
                <div class="watch-display">
                    <span class="watch-time">00:00:00</span>
                    <span class="watch-ampm"></span>
                </div>
                <div class="watch-date"></div>
                <div class="watch-controls">
                    <button class="watch-btn" id="toggleFormat">24H</button>
                    <button class="watch-btn" id="toggleSeconds">Sec</button>
                </div>
            </div>
            
            <!-- Stopwatch Mode -->
            <div class="watch-mode watch-mode-stopwatch">
                <div class="stopwatch-display">
                    <span class="stopwatch-time">00:00:00.00</span>
                </div>
                <div class="stopwatch-controls">
                    <button class="watch-btn" id="stopwatchStart">Start</button>
                    <button class="watch-btn" id="stopwatchStop">Stop</button>
                    <button class="watch-btn" id="stopwatchReset">Reset</button>
                </div>
                <div class="stopwatch-laps">
                    <h4>Laps</h4>
                    <div class="lap-list"></div>
                </div>
            </div>
            
            <!-- Timer Mode -->
            <div class="watch-mode watch-mode-timer">
                <div class="timer-display">
                    <span class="timer-time">00:00:00</span>
                </div>
                <div class="timer-input">
                    <input type="number" id="timerMinutes" min="0" max="999" placeholder="MM" value="0">
                    <span>:</span>
                    <input type="number" id="timerSeconds" min="0" max="59" placeholder="SS" value="0">
                </div>
                <div class="timer-controls">
                    <button class="watch-btn" id="timerStart">Start</button>
                    <button class="watch-btn" id="timerStop">Stop</button>
                    <button class="watch-btn" id="timerReset">Reset</button>
                </div>
            </div>
            
            <!-- Alarm Mode -->
            <div class="watch-mode watch-mode-alarm">
                <div class="alarm-display">
                    <span class="alarm-time">No Alarm Set</span>
                </div>
                <div class="alarm-input">
                    <input type="time" id="alarmTimeInput" value="07:00">
                </div>
                <div class="alarm-controls">
                    <button class="watch-btn" id="alarmSet">Set Alarm</button>
                    <button class="watch-btn" id="alarmClear">Clear All</button>
                </div>
                <div class="alarm-list">
                    <h4>Active Alarms</h4>
                    <div class="alarm-items"></div>
                </div>
            </div>
        `;
        return watchContainer;
    }

    // Format time components
    formatTimeComponent(component, pad = 2) {
        return component.toString().padStart(pad, '0');
    }

    // Get current time string (for clock mode)
    getClockTimeString() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        let ampm = '';

        // Check for alarms
        this.checkAlarms(hours, minutes);

        if (!this.is24Hour) {
            ampm = hours >= 12 ? ' PM' : ' AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
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

    // Format stopwatch time
    formatStopwatchTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const milliseconds = Math.floor((ms % 1000) / 10);
        
        return `${this.formatTimeComponent(hours)}:${this.formatTimeComponent(minutes)}:${this.formatTimeComponent(seconds)}.${this.formatTimeComponent(milliseconds, 2)}`;
    }

    // Format timer time
    formatTimerTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        return `${this.formatTimeComponent(hours)}:${this.formatTimeComponent(minutes)}:${this.formatTimeComponent(secs)}`;
    }

    // Update clock display
    updateClockDisplay() {
        if (!this.watchElement) return;

        const { timeString, ampm } = this.getClockTimeString();
        const timeDisplay = this.watchElement.querySelector('.watch-time');
        const ampmDisplay = this.watchElement.querySelector('.watch-ampm');
        const dateDisplay = this.watchElement.querySelector('.watch-date');

        if (timeDisplay) timeDisplay.textContent = timeString;
        if (ampmDisplay) ampmDisplay.textContent = ampm;
        if (dateDisplay) dateDisplay.textContent = this.getDateString();
    }

    // Update stopwatch display
    updateStopwatchDisplay() {
        if (!this.watchElement) return;

        const currentTime = this.isRunning ? Date.now() - this.stopwatchStartTime : this.stopwatchElapsed;
        const display = this.watchElement.querySelector('.stopwatch-time');
        if (display) {
            display.textContent = this.formatStopwatchTime(currentTime);
        }
    }

    // Update timer display
    updateTimerDisplay() {
        if (!this.watchElement) return;

        const display = this.watchElement.querySelector('.timer-time');
        if (display) {
            display.textContent = this.formatTimerTime(this.timerRemaining);
        }
    }

    // Check alarms
    checkAlarms(hours, minutes) {
        this.alarms.forEach(alarm => {
            if (alarm.hour === hours && alarm.minute === minutes && !alarm.triggered) {
                this.triggerAlarm(alarm);
            }
        });
    }

    // Trigger alarm
    triggerAlarm(alarm) {
        alarm.triggered = true;
        // Play sound or show notification
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Alarm!', {
                body: `Alarm set for ${this.formatTimeComponent(alarm.hour)}:${this.formatTimeComponent(alarm.minute)}`,
                icon: '⏰'
            });
        }
        // Visual alert
        const display = this.watchElement.querySelector('.alarm-time');
        if (display) {
            display.textContent = 'ALARM!';
            display.style.color = '#ff4444';
            setTimeout(() => {
                display.style.color = '';
            }, 5000);
        }
    }

    // Main update function
    update() {
        if (this.mode === 'clock') {
            this.updateClockDisplay();
        } else if (this.mode === 'stopwatch' && this.isRunning) {
            this.updateStopwatchDisplay();
        } else if (this.mode === 'timer' && this.isRunning) {
            this.updateTimerDisplay();
            if (this.timerRemaining > 0) {
                this.timerRemaining--;
            } else if (this.isRunning) {
                this.stopTimer();
                this.triggerAlarm({ hour: 0, minute: 0, triggered: false });
            }
        }
    }

    // Start the watch
    start() {
        this.update();
        this.intervalId = setInterval(() => this.update(), 100);
    }

    // Stop the watch
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    // Toggle 24-hour format
    toggleFormat() {
        this.is24Hour = !this.is24Hour;
        const btn = this.watchElement.querySelector('#toggleFormat');
        if (btn) {
            btn.textContent = this.is24Hour ? '24H' : '12H';
            btn.classList.toggle('active', this.is24Hour);
        }
        this.updateClockDisplay();
    }

    // Toggle seconds display
    toggleSeconds() {
        this.showSeconds = !this.showSeconds;
        const btn = this.watchElement.querySelector('#toggleSeconds');
        if (btn) {
            btn.classList.toggle('active', this.showSeconds);
        }
        this.updateClockDisplay();
    }

    // Switch mode
    switchMode(mode) {
        this.mode = mode;
        
        // Update tab buttons
        const tabs = this.watchElement.querySelectorAll('.watch-tab');
        tabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.mode === mode);
        });
        
        // Update mode displays
        const modes = this.watchElement.querySelectorAll('.watch-mode');
        modes.forEach(m => {
            m.classList.toggle('active', m.classList.contains(`watch-mode-${mode}`));
        });
    }

    // Stopwatch controls
    startStopwatch() {
        if (!this.isRunning) {
            this.stopwatchStartTime = Date.now() - this.stopwatchElapsed;
            this.isRunning = true;
        }
    }

    stopStopwatch() {
        if (this.isRunning) {
            this.stopwatchElapsed = Date.now() - this.stopwatchStartTime;
            this.isRunning = false;
        }
    }

    resetStopwatch() {
        this.stopwatchElapsed = 0;
        this.stopwatchStartTime = 0;
        this.isRunning = false;
        const laps = this.watchElement.querySelector('.lap-list');
        if (laps) laps.innerHTML = '';
    }

    // Timer controls
    startTimer() {
        if (this.timerRemaining === 0) {
            const minutes = parseInt(this.watchElement.querySelector('#timerMinutes').value) || 0;
            const seconds = parseInt(this.watchElement.querySelector('#timerSeconds').value) || 0;
            this.timerRemaining = minutes * 60 + seconds;
        }
        if (this.timerRemaining > 0) {
            this.isRunning = true;
        }
    }

    stopTimer() {
        this.isRunning = false;
    }

    resetTimer() {
        this.timerRemaining = 0;
        this.isRunning = false;
        const display = this.watchElement.querySelector('.timer-time');
        if (display) display.textContent = '00:00:00';
    }

    // Alarm controls
    setAlarm() {
        const timeInput = this.watchElement.querySelector('#alarmTimeInput');
        if (timeInput && timeInput.value) {
            const [hours, minutes] = timeInput.value.split(':').map(Number);
            const alarm = {
                id: Date.now(),
                hour: hours,
                minute: minutes,
                triggered: false
            };
            this.alarms.push(alarm);
            this.renderAlarms();
            
            // Request notification permission
            if ('Notification' in window && Notification.permission === 'default') {
                Notification.requestPermission();
            }
        }
    }

    clearAlarms() {
        this.alarms = [];
        this.renderAlarms();
    }

    renderAlarms() {
        const container = this.watchElement.querySelector('.alarm-items');
        if (!container) return;
        
        if (this.alarms.length === 0) {
            container.innerHTML = '<p style="color: #B0B3B8;">No alarms set</p>';
            const display = this.watchElement.querySelector('.alarm-time');
            if (display) display.textContent = 'No Alarm Set';
            return;
        }
        
        container.innerHTML = this.alarms.map(alarm => `
            <div class="alarm-item">
                <span>${this.formatTimeComponent(alarm.hour)}:${this.formatTimeComponent(alarm.minute)}</span>
                <button class="alarm-delete" data-id="${alarm.id}">✕</button>
            </div>
        `).join('');
        
        // Add delete handlers
        container.querySelectorAll('.alarm-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                this.alarms = this.alarms.filter(a => a.id !== id);
                this.renderAlarms();
            });
        });
 
        // Update main display
        const display = this.watchElement.querySelector('.alarm-time');
        if (display && this.alarms.length > 0) {
            const nextAlarm = this.alarms[0];
            display.textContent = `Next: ${this.formatTimeComponent(nextAlarm.hour)}:${this.formatTimeComponent(nextAlarm.minute)}`;
        }
    }

    // Initialize and append to container
    init(containerSelector) {
        const container = document.querySelector(containerSelector);
        if (!container) {
            console.error(`Container "${containerSelector}" not found`);
            return;
        }

        this.watchElement = this.createWatchElement();
        container.appendChild(this.watchElement);

        // Add event listeners for mode tabs
        const tabs = this.watchElement.querySelectorAll('.watch-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => this.switchMode(tab.dataset.mode));
        });

        // Clock controls
        const formatBtn = this.watchElement.querySelector('#toggleFormat');
        const secondsBtn = this.watchElement.querySelector('#toggleSeconds');
        if (formatBtn) formatBtn.addEventListener('click', () => this.toggleFormat());
        if (secondsBtn) secondsBtn.addEventListener('click', () => this.toggleSeconds());

        // Stopwatch controls
        const swStart = this.watchElement.querySelector('#stopwatchStart');
        const swStop = this.watchElement.querySelector('#stopwatchStop');
        const swReset = this.watchElement.querySelector('#stopwatchReset');
        if (swStart) swStart.addEventListener('click', () => this.startStopwatch());
        if (swStop) swStop.addEventListener('click', () => this.stopStopwatch());
        if (swReset) swReset.addEventListener('click', () => this.resetStopwatch());

        // Timer controls
        const timerStart = this.watchElement.querySelector('#timerStart');
        const timerStop = this.watchElement.querySelector('#timerStop');
        const timerReset = this.watchElement.querySelector('#timerReset');
        if (timerStart) timerStart.addEventListener('click', () => this.startTimer());
        if (timerStop) timerStop.addEventListener('click', () => this.stopTimer());
        if (timerReset) timerReset.addEventListener('click', () => this.resetTimer());

        // Alarm controls
        const alarmSet = this.watchElement.querySelector('#alarmSet');
        const alarmClear = this.watchElement.querySelector('#alarmClear');
        if (alarmSet) alarmSet.addEventListener('click', () => this.setAlarm());
        if (alarmClear) alarmClear.addEventListener('click', () => this.clearAlarms());

        // Start the watch
        this.start();

        return this;
    }

    // Clean up
    destroy() {
        this.stop();
        if (this.watchElement && this.watchElement.parentNode) {
            this.watchElement.parentNode.removeChild(this.watchElement);
        }
        this.watchElement = null;
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const watchContainer = document.querySelector('#watch-section');
        if (watchContainer) {
            const watch = new DigitalWatch();
            watch.init('#watch-section');
        }
    });
} else {
    // DOM already loaded
    const watchContainer = document.querySelector('#watch-section');
    if (watchContainer) {
        const watch = new DigitalWatch();
        watch.init('#watch-section');
    }
}
