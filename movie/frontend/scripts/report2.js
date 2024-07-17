// Function to fetch production company names and populate the select dropdown
function addProductionOptions() {
    fetch('/productions')
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to fetch production companies');
            }
            return res.json();
        })
        .then(data => {
            const selectOpt = document.getElementById('productioncompany');
            selectOpt.innerHTML = ''; 

            data.forEach(element => {
                const opt = document.createElement('option');
                opt.value = element.pName;
                opt.textContent = element.pName;
                selectOpt.appendChild(opt);
            });
        })
        .catch(error => {
            console.error('Error fetching production companies:', error);
            alert('Failed to fetch production companies. Please try again later.');
        });
}

// Function to fetch and display movies based on selected production company
document.getElementById('fetchReport2').addEventListener('click', function() {
    const pName = document.getElementById('productioncompany').value;

    if (!pName) {
        alert('Please select a production company.');
        return;
    }

    const params = new URLSearchParams({
        pName: pName,
    });
    const queryString = params.toString();

    fetch(`/reports/2?${queryString}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('No movies found for the given production company');
            }
            return response.json();
        })
        .then(data => {
            displayMovies(data);
        })
        .catch(error => {
            console.error('Error fetching report 2:', error);
            alert(error.message);
        });
});

function displayMovies(movies) {
    const moviesContainer = document.getElementById('moviesContainer');
    moviesContainer.innerHTML = '';

    if (movies.length === 0) {
        moviesContainer.innerHTML = '<p>No movies found.</p>';
        return;
    }


    const movieMap = new Map();

    
    movies.forEach(movie => {
        const title = movie.title;
        const genre = movie.genreName;
        const director = movie.dName;

        if (!movieMap.has(title)) {
            movieMap.set(title, {
                genres: [],
                directors: []
            });
        }

        if (genre && !movieMap.get(title).genres.includes(genre)) {
            movieMap.get(title).genres.push(genre);
        }

        if (director && !movieMap.get(title).directors.includes(director)) {
            movieMap.get(title).directors.push(director);
        }
    });

    // Clear movies container
    moviesContainer.innerHTML = '';


    const table = document.createElement('table');
    table.classList.add('table', 'table-bordered');

    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th>Title</th>
        <th>Release Year</th>
        <th>Duration</th>
        <th>Plot Outline</th>
        <th>Production Company</th>
        <th>Genre</th>
        <th>Director</th>
    `;
    table.appendChild(headerRow);

    // Iterate through movieMap to display movies with multiple genres / directors
    movieMap.forEach((data, title) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${title}</td>
            <td>${movies.find(movie => movie.title === title).year}</td>
            <td>${movies.find(movie => movie.title === title).duration} minutes</td>
            <td>${movies.find(movie => movie.title === title).plot_outline}</td>
            <td>${movies.find(movie => movie.title === title).pName}</td>
            <td>${data.genres.join(', ')}</td>
            <td>${data.directors.join(', ')}</td>
        `;
        table.appendChild(row);
    });

    
    moviesContainer.appendChild(table);
}

addProductionOptions();