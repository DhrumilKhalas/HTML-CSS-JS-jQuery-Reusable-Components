// This function loads the data from the API endpoint
function loadData() {
    $.getJSON("../json/books.json", displayTable); // Get the JSON data and call displayTable function
}

// Callback function after fetching the JSON data from the API endpoint
function displayTable(jsonResponse){

    let booksList = ''; // Initialize an empty string to hold the table rows
    for(let book of jsonResponse.books){ // Looping through each book in the response
        // Constructing each book row with title, author, genre, year, and price
        booksList += `
            <tr>
                <td>${book.bookTitle}</td>
                <td>${book.authorName}</td>
                <td>${book.genre}</td>
                <td>${book.publisher}</td>
                <td>${book.publicationYear}</td>
                <td>${book.price}</td>
                <td>${book.ISBN}</td>
                <td>${book.language}</td>
                <td>${book.pageCount}</td>
                <td>${book.rating}</td>
            </tr>
        `;
    }

    // Writing the table data to the table body
    document.getElementById('booksInfo').innerHTML = booksList; // Insert the rows into the table body

    // Adding jQuery DataTable functionality for searching, sorting, etc.
    $('#dataTable').DataTable(); // Initializes DataTable plugin for enhanced table features
}

// Call the loadData function to start the process
loadData(); // Execute the function to fetch and display the data
