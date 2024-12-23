$(document).ready(function(){
     // Fetching JSON data from the file and passing it to the generatePopulationChart function
    $.getJSON("../json/canadian_cities_population_2024.json", generatePopulationChart); // get the JSON data from canadian_cities_population_2024.json file and call the function generatePopulationChart
});
function generatePopulationChart(myJson){

    // Declaring empty arrays to store chart labels (city names) and data (population)
    var myLabels = new Array();
    var myData = new Array();

     // Looping through the JSON data to extract city names and populations
    for(i in myJson.cities ){ 
        x = myJson.cities[i];
        myLabels.push(x.name);  // Adding city name to labels array
        myData.push(x.population); // Adding city population to data array
    }

    // Getting the context of the canvas element where the chart will be rendered
    var ctx = document.getElementById('myChart').getContext('2d');

    // Creating the bar chart with the data and labels
    var chart = new Chart(ctx, {
        type: 'bar', // creating a bar chart
        data: {
            labels: myLabels,  // Assigning the city names as labels for the chart
            datasets: [
                {
                    label: "Population", // Label for the dataset
                    fill: true, // Set the chart to be filled
                    backgroundColor: 'rgb(75, 192, 192)', // Color for the bars
                    borderColor: 'rgb(75, 192, 192)', // Border color for the bars
                    data: myData, // Population data for each city
                }
            ]
        }
    });
}
