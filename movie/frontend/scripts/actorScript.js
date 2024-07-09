$(document).ready(function() {
    $('select[multiple]').multiselect({
        templates: {
            button: '<button type="button" class="multiselect dropdown-toggle btn btn-outline-light" data-bs-toggle="dropdown" aria-expanded="false"><span class="multiselect-selected-text"></span></button>',
        },
    });
});

const quoteCheck = document.getElementById('quoteCheck');
const quoteInput = document.getElementById('quoteInput');
const selectElement = document.getElementById('acted_by');
const selectWrapper = selectElement.closest('.select-wrapper');

function toggleQuoteInput() {
    quoteInput.style.display = quoteCheck.checked ? 'block' : 'none';
}

quoteCheck.addEventListener('change', toggleQuoteInput);