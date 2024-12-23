// Replace the value of the 'appID' variable at line number 23 with your OpenWeatherMap API key.

// Function to load weather data for a given location
function loadWeather(location) {

    var errorElement = document.querySelector(".line-chart-errors"); // Element to display error messages
    var showMoreInfoElement = document.querySelector(".line-chart-more-info"); // Element to display more weather information

    // Clear previous errors and reset the chart container
    $('#myChart').parent().show();  // Show the canvas chart container
    errorElement.innerHTML = "";    // Clear any previous error messages
    showMoreInfoElement.innerHTML = ""; // Clear previous data in the "More Info" section

    showMoreInfoElement.style.display = 'none'; // Hide the "More Info" section initially

    // Check if location is empty
    if (location.trim() === "") {
        $('#myChart').parent().hide();  // Hide the canvas chart container
        errorElement.innerHTML = "Please enter a valid city name."; // Display error message
        return;
    }
     
    var appID = '<OpenWeatherMap API Key>'; // OpenWeatherMap API Key
    var apiEndPoint = 'https://api.openweathermap.org/data/2.5/forecast?q='+location+'&appid='+appID; // API endpoint with query parameter for city
    
    // Fetch data from OpenWeatherMap API
    $.getJSON(apiEndPoint, function(jsonResponse) {
         // If the city is invalid (error in response)
        if (jsonResponse.cod !== "200") {
            $('#myChart').parent().hide();  // Hide the canvas chart container
            showMoreInfoElement.style.display = 'none'; // Hide the "More Info" section
        errorElement.innerHTML = "Please enter a valid city name."; // Display error message
            return;
        }
        displayWeatherForecast(jsonResponse);
    }).fail(function() {
        // If the API request fails, hide the chart and show a failure message
        $('#myChart').parent().hide();  // Hide the canvas chart container
        errorElement.innerHTML = "Failed to fetch data. Please try again later."; // Display failure message
    });
}

// Callback function to display weather forecast
function displayWeatherForecast(jsonResponse){
 // Arrays to store labels (date/time) and data (temperature)
var labelArray = new Array();
var dataArray = new Array();

 // Loop through the JSON response to populate label and data arrays
for(i in jsonResponse.list){ 
    labelArray.push(jsonResponse.list[i].dt_txt); // Add the date/time
    dataArray.push(jsonResponse.list[i].main.temp); // Add the temperature
}

 // Get the canvas context for the line chart
var ctx = document.getElementById('myChart').getContext('2d');// CanvasRenderingContext2D

 // Create the line chart using Chart.js
var chart = new Chart(ctx, {
    type: 'line', // creating a line chart

    data: {
        labels: labelArray, // Use date/time for labels
        datasets: [
            {
                label: "Forecast", // Label for the dataset
                fill: false, // Do not fill the area under the line
                backgroundColor: 'rgb(153, 102, 255)', 
                borderColor: 'rgb(153, 102, 255)',
                data: dataArray, // The temperature data
            }
        ]
    }
});

showMoreInfo(jsonResponse); // Show additional weather information

}

// Function to get the city name and call the weather loading function
function getCityWeather() {
    var city = document.getElementById('cityInput').value;  // Get the city input from the user
    loadWeather(city); // // Call the loadWeather function with the city name
}

// Function to display additional weather information like sunrise, sunset, etc.
function showMoreInfo(jsonResponse) {

    var showMoreInfoElement = document.querySelector(".line-chart-more-info");
    showMoreInfoElement.style.border = '1px solid #0069c44e';  // Add border
    showMoreInfoElement.style.padding = '0px 20px';  // Add padding

    showMoreInfoElement.style.display = 'block'; // Display the "More Info" section

    // Extracting multiple elements from the JSON response
    var cityName = jsonResponse.city.name;
    var country = jsonResponse.city.country;
    var population = jsonResponse.city.population;
    var latitude = jsonResponse.city.coord.lat;
    var longitude = jsonResponse.city.coord.lon;
    var sunrise = jsonResponse.city.sunrise;
    var sunset = jsonResponse.city.sunset;
    var sunriseDate = new Date(sunrise * 1000);
    var sunsetDate = new Date(sunset * 1000);


    // Construct the HTML content
    showMoreInfoElement.innerHTML = `
        <h3 class="weather-more-info-card-title">Weather Information for ${cityName}, ${country}</h3>
        <p><strong>Population:</strong> ${population}</p>
        <p><strong>Latitude:</strong> ${latitude}</p>
        <p><strong>Longitude:</strong> ${longitude}</p>
        <p><strong>Sunrise:</strong> ${sunriseDate}</p>
        <p><strong>Sunset:</strong> ${sunsetDate}</p>
    `;


}
