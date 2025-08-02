document.addEventListener('DOMContentLoaded', function() {
            // DOM elements
            const display = document.querySelector('.display');
            const startBtn = document.querySelector('.start-btn');
            const pauseBtn = document.querySelector('.pause-btn');
            const lapBtn = document.querySelector('.lap-btn');
            const resetBtn = document.querySelector('.reset-btn');
            const lapsList = document.querySelector('.laps-list');
            
            // Stopwatch variables
            let startTime;
            let elapsedTime = 0;
            let timerInterval;
            let isRunning = false;
            let lapCounter = 1;
            
            // Format time to HH:MM:SS.ml
            function formatTime(ms) {
                const date = new Date(ms);
                const hours = date.getUTCHours().toString().padStart(2, '0');
                const minutes = date.getUTCMinutes().toString().padStart(2, '0');
                const seconds = date.getUTCSeconds().toString().padStart(2, '0');
                const milliseconds = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, '0');
                
                return `${hours}:${minutes}:${seconds}.${milliseconds}`;
            }
            
            // Update the display
            function updateDisplay() {
                display.textContent = formatTime(elapsedTime);
            }
            
            // Start the stopwatch
            function start() {
                if (!isRunning) {
                    isRunning = true;
                    startTime = Date.now() - elapsedTime;
                    timerInterval = setInterval(function() {
                        elapsedTime = Date.now() - startTime;
                        updateDisplay();
                    }, 10);
                }
            }
            
            // Pause the stopwatch
            function pause() {
                if (isRunning) {
                    isRunning = false;
                    clearInterval(timerInterval);
                }
            }
            
            // Reset the stopwatch
            function reset() {
                pause();
                elapsedTime = 0;
                updateDisplay();
                lapCounter = 1;
                lapsList.innerHTML = '<div class="laps-title">Lap Times</div>';
            }
            
            // Record a lap
            function recordLap() {
                if (isRunning) {
                    const lapItem = document.createElement('div');
                    lapItem.classList.add('lap-item');
                    lapItem.innerHTML = `
                        <span class="lap-number">Lap ${lapCounter}</span>
                        <span class="lap-time">${formatTime(elapsedTime)}</span>
                    `;
                    lapsList.appendChild(lapItem);
                    lapCounter++;
                    
                    // Scroll to the latest lap
                    lapsList.scrollTop = lapsList.scrollHeight;
                }
            }
            
            // Event listeners
            startBtn.addEventListener('click', start);
            pauseBtn.addEventListener('click', pause);
            resetBtn.addEventListener('click', reset);
            lapBtn.addEventListener('click', recordLap);
            
            // Initialize display
            updateDisplay();
        });