// Function to generate the pie chart by fetching data from expenses.json
function generatePieChart(){
	$.getJSON("../json/expenses.json", generatePie); // Fetch JSON data and pass it to generatePie function
}

// Function to process the JSON data and create a pie chart
function generatePie(myJson){
	let myLabels = ['Amount','Tax','Benefits']; // Define labels for the pie chart segments
	let amount = 0; 
	let tax = 0;
	let benefits = 0;

	// Loop through the expenses and accumulate values for amount, tax, and benefits
	for(expense of myJson.expenses){
		amount += expense.Amount; 
		tax += expense.Tax;
		benefits += expense.Benefits;
	}

	let pie = document.getElementById('pie').getContext('2d'); // Get the canvas context for the pie chart

	// Create a new pie chart using Chart.js
	new Chart(pie, {
		type: 'pie',  // Chart type
		data: {
			labels: myLabels, // Use predefined labels
			datasets: [{
				label: 'Expense Distribution',  // Label for the dataset
				data: [amount, tax, benefits], // Data for the chart segments
				backgroundColor: [ // Colors for each segment
					'#28a745',
					'#6f42c1',
					'#ffc107'
				],
				hoverOffset: 4 // Offset effect when hovering over a segment
			}]
		}

	});
}

// Function to generate a table from the same JSON data
function generateTable(){
	$.getJSON("../json/expenses.json", createTable); // Fetch JSON data and pass it to createTable function
}

// Function to process JSON data and create a table using DataTables
function createTable(myJson){
	let expenseData = new Array(); // Array to store the expense data for the table

	// Loop through the expenses and prepare the data for table rows
	for(expense of myJson.expenses){
		let oneExpenseData = [
			expense.Category,
			expense.Amount,
			expense.Tax,
			expense.Benefits
		];
		expenseData.push(oneExpenseData); // Add row data to the expenseData array
	}
	
	// Initialize DataTable to display the expense data in tabular format
	$('#pichartDatatabel').DataTable({
		data: expenseData // Pass the data to DataTable for rendering
	});
}

// Call functions to generate the pie chart and table
generatePieChart();
generateTable()