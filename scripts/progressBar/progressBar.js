let progress = 0;
let interval;
let isRunning = false;
let wasStopped = false; // Track if progress was stopped

$(document).ready(function() {
    // Fetch progress bar data from the JSON file
    $.getJSON('../json/progress_bar.json', function(data) {
        const progressBarData = data.progress_bar;

         // Set button texts from the JSON data
        $('#startBtn').text(progressBarData[0].label);
        $('#stopBtn').text(progressBarData[1].label).hide();
        $('#resetBtn').text(progressBarData[2].label).hide();

         // Event listeners for buttons
        $('#startBtn').on('click', function() {
            startProgress(progressBarData); // Start the progress bar
        });

        $('#stopBtn').on('click', function() {
            if (isRunning) {
                stopProgress(progressBarData); // Stop progress, change to Resume
            } else {
                resumeProgress(progressBarData); // Resume progress if stopped
            }
        });

        $('#resetBtn').on('click', function() {
            resetProgress(progressBarData); // Reset progress bar
        });
    });

     // Start the progress bar and begin the interval for updating
    function startProgress(progressBarData) {
        if (isRunning) return; // Prevent starting if already running
        isRunning = true;
        wasStopped = false;

        const progressBar = $('#progress-bar');
        const progressText = $('#progress-text');
        const startBtn = $('#startBtn');
        const stopBtn = $('#stopBtn');
        const resetBtn = $('#resetBtn');
        const statusMessage = $('#status-message');

        startBtn.hide(); // Hide start button when running
        stopBtn.text('Stop Progress').show(); // Show stop button
        resetBtn.show(); // Show reset button

        interval = setInterval(function() {
            progress += 1; // Increment progress
            progressBar.css('width', progress + '%');  // Update the bar width
            progressText.text(progress + '%'); // Update the text

            // When progress reaches 100%, stop the interval
            if (progress >= 100) {
                clearInterval(interval);
                statusMessage.text(progressBarData[0].status_message);  // Display status message
                statusMessage.show(); // Show status message
                stopBtn.hide();  // Hide stop button
                isRunning = false; // Mark as not running
            }
        }, 100);
    }

      // Stop the progress, change stop button to resume
    function stopProgress() {
        clearInterval(interval); // Clear the interval
        isRunning = false;
        wasStopped = true;

        $('#stopBtn').text('Resume Progress');  // Change button text to Resume
    }

     // Resume the progress if it was stopped
    function resumeProgress(progressBarData) {
        if (isRunning || !wasStopped) return; // Prevent resuming if already running or never stopped
        isRunning = true;

        $('#stopBtn').text('Stop Progress'); // Change button text back to Stop

        interval = setInterval(function() {
            progress += 1; // Increment progress
            $('#progress-bar').css('width', progress + '%'); // Update the progress bar
            $('#progress-text').text(progress + '%'); // Update the text

            if (progress >= 100) {
                clearInterval(interval); // Stop when progress reaches 100%
                $('#status-message').text(progressBarData[0].status_message).show();
                $('#stopBtn').hide();
                isRunning = false; // Mark as not running
            }
        }, 100);
    }

     // Reset the progress bar and buttons
    function resetProgress(progressBarData) {
        clearInterval(interval); // Clear any running intervals
        progress = progressBarData[0].initial_progress; // Reset progress value
        const progressBar = $('#progress-bar');
        const progressText = $('#progress-text');
        const startBtn = $('#startBtn');
        const stopBtn = $('#stopBtn');
        const resetBtn = $('#resetBtn');
        const statusMessage = $('#status-message');

        progressBar.css('width', '0%'); // Reset bar width
        progressText.text('0%'); // Reset text
        statusMessage.hide(); // Hide status message

        startBtn.show(); // Show start button
        stopBtn.hide(); // Hide stop button
        resetBtn.hide(); // Hide reset button

        isRunning = false;
        wasStopped = false;
    }
});
