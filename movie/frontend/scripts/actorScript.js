$(document).ready(function() {
    $('select[multiple]').multiselect({
        templates: {
            button: '<button type="button" class="multiselect dropdown-toggle btn btn-outline-light" data-bs-toggle="dropdown" aria-expanded="false"><span class="multiselect-selected-text"></span></button>',
        },
    });
});

const quoteCheck = document.getElementById('quoteCheck');
const quoteInput = document.getElementById('quoteInput');

function toggleQuoteInput() {
    quoteInput.style.display = quoteCheck.checked ? 'block' : 'none';
}

quoteCheck.addEventListener('change', toggleQuoteInput);

function addMovieOptions() {
    fetch('/movies')
        .then(res => res.json())
        .then(data => {
            const selectOpt = document.getElementById('acted_by');
            
            data.forEach(element => {
                const optText = `<option value="${element.title + "_" + element.year}">${element.title + "(" + element.year + ")"}</option>`;
                selectOpt.innerHTML += optText;
            });
        });
}

addMovieOptions();