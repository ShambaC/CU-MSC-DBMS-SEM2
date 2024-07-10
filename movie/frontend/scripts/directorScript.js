$(document).ready(function() {
    $('select[multiple]').multiselect({
        templates: {
            button: '<button type="button" class="multiselect dropdown-toggle btn btn-outline-light" data-bs-toggle="dropdown" aria-expanded="false"><span class="multiselect-selected-text"></span></button>',
        },
    });
  });

function addMovieOptions() {
    fetch('/movies')
        .then(res => res.json())
        .then(data => {
            const selectOpt = document.getElementById('directedMovies');
            const selectOpt2 = document.getElementById('acted_in');
            
            data.forEach(element => {
                const optText = `<option value="${element.title + "_" + element.year}">${element.title + "(" + element.year + ")"}</option>`;
                selectOpt.innerHTML += optText;
                selectOpt2.innerHTML += optText;
            });
        });
}

addMovieOptions();