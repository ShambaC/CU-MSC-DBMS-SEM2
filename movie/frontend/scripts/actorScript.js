const quoteInput = document.getElementById('quoteInput');
const maxMovies = 3;

let selectedMovies = [];

function addMovieOptions() {
    fetch('/movies')
        .then(res => res.json())
        .then(data => {
            const selectOpt = document.getElementById('acted_by');

            var inner = `<select name="acted_by" class="form-select" aria-label="Default select example" multiple="multiple">`
            
            data.forEach(element => {
                const optText = `<option value="${element.title + "_" + element.year}">${element.title + "(" + element.year + ")"}</option>`;
                inner += optText;
            });

            inner += `</select>`;
            selectOpt.innerHTML += inner;

            $('select[multiple]').multiselect({
                templates: {
                    button: '<button type="button" class="multiselect dropdown-toggle btn btn-outline-light" data-bs-toggle="dropdown" aria-expanded="false"><span class="multiselect-selected-text"></span></button>',
                },

                onChange: (option, checked) => {
                    if (checked) {
                        if (selectedMovies.length >= maxMovies) {
                            alert(`You can select a maximum of ${maxMovies} movies.`);
                            return false;
                        }
                        
                        const movieName = option.text();
                        const hasQuote = confirm(`Does the actor have a quote in "${movieName}"?`);
                        
                        if (hasQuote) {
                            addQuoteTextBox(movieName);
                        }
                        
                        selectedMovies.push(movieName);
                    } else {
                        removeQuoteTextBox(option.text());
                        selectedMovies = selectedMovies.filter(movie => movie !== option.text());
                    }
                }
            });
        });
}

function addQuoteTextBox(movieName) {
    const quoteContainer = document.getElementById('quoteInput');
    const quoteBox = document.createElement('div');
    quoteBox.className = 'quote-box';
    quoteBox.innerHTML = `
        <label for="quote_${movieName}">${movieName} Quote:</label>
        <textarea id="quote_${movieName}" name="quote_${movieName}" rows="3" class="form-control"></textarea>
    `;
    quoteInput.style.display = 'block';
    quoteContainer.appendChild(quoteBox);
}

function removeQuoteTextBox(movieName) {
    const quoteContainer = document.getElementById('quoteInput');
    const quoteBox = quoteContainer.querySelector(`[id="quote_${movieName}"]`).closest('.quote-box');
    if (quoteInput.children.length === 0) {
        quoteInput.style.display = 'none'; 
    }
    if (quoteBox) {
        quoteContainer.removeChild(quoteBox);
    }
}

addMovieOptions();