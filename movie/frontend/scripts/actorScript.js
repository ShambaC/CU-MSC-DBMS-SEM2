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

                        addRolesTextBox(movieName);
                        
                        selectedMovies.push(movieName);
                    } else {
                        removeQuoteTextBox(option.text());
                        removeRolesTextBox(movieName);
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
    quoteContainer.style.display = 'block';
    quoteContainer.appendChild(quoteBox);
}

function removeQuoteTextBox(movieName) {
    const quoteContainer = document.getElementById('quoteInput');
    const quoteBox = quoteContainer.querySelector(`[id="quote_${movieName}"]`).closest('.quote-box');
    if (quoteContainer.children.length === 0) {
        quoteContainer.style.display = 'none'; 
    }
    if (quoteBox) {
        quoteContainer.removeChild(quoteBox);
    }
}

function addRolesTextBox(movieName) {
    const roleContainer = document.getElementById("rolesInput");
    const roleBox = document.createElement('div');

    roleBox.className = 'role-box';
    roleBox.innerHTML = `
        <label for="role_${movieName}">${movieName} Role: </label>
        <input type="text" class="form-control" name="role_${movieName}" id="role_${movieName}" placeholder="Enter role" maxlength="10">
    `
    roleContainer.style.display = 'block';
    roleContainer.append(roleBox);
}

function removeRolesTextBox(movieName) {
    const roleContainer = document.getElementById("rolesInput");
    const roleBox = roleContainer.querySelector(`[id="role_${movieName}"]`).closest('.role-box');

    if (roleContainer.children.length === 0) {
        roleContainer.style.display = 'none';
    }
    if (roleBox) {
        roleContainer.removeChild(roleBox);
    }
}

addMovieOptions();