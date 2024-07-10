$(document).ready(function() {
    $('select[multiple]').multiselect({
        templates: {
            button: '<button type="button" class="multiselect dropdown-toggle btn btn-outline-light" data-bs-toggle="dropdown" aria-expanded="false"><span class="multiselect-selected-text"></span></button>',
        },
    });
  });