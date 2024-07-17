document.getElementById('fetchReport1').addEventListener('click', function() {
    const yearL = document.getElementById('yearL').value;
    const yearU = document.getElementById('yearU').value;

    if (!yearL || !yearU) {
        alert('Please enter both lower and upper year limits.');
        return;
    }

    const params = new URLSearchParams({
        year_l: yearL,
        year_u: yearU,
    });
    const queryString = params.toString();

    fetch(`/reports/1?${queryString}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('No movies found for the given year range');
            }
            return response.json();
        })
        .then(data => {
            displayMovies(data);
        })
        .catch(error => {
            console.error('Error fetching report 1:', error);
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

    // Map to store data for each movie title
    const movieMap = new Map();

    movies.forEach(movie => {
        const title = movie.title;

    
        if (!movieMap.has(title)) {
            movieMap.set(title, {
                
                productionCompanies: [],
                genres: [],
                directors: []
                
            });
        }

    
        if (movie.genreName && !movieMap.get(title).genres.includes(movie.genreName)) {
            movieMap.get(title).genres.push(movie.genreName);
        }
        if (movie.pName && !movieMap.get(title).productionCompanies.includes(movie.pName)) {
            movieMap.get(title).productionCompanies.push(movie.pName);
        }
        if (movie.dName && !movieMap.get(title).directors.includes(movie.dName)) {
            movieMap.get(title).directors.push(movie.dName);
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
        <th>Production Companies</th>
        <th>Genres</th>
        <th>Directors</th>
        
    `;
    table.appendChild(headerRow);

    // Iterate through movieMap to display movies
    movieMap.forEach((data, title) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${title}</td>
            <td>${movies.find(movie => movie.title === title).year}</td>
            <td>${movies.find(movie => movie.title === title).duration} minutes</td>
            <td>${movies.find(movie => movie.title === title).plot_outline}</td>
            <td>${data.productionCompanies.join(', ')}</td>
            <td>${data.genres.join(', ')}</td>
             <td>${data.directors.join(', ')}</td>

        `;
        table.appendChild(row);
    });


    moviesContainer.appendChild(table);
}

