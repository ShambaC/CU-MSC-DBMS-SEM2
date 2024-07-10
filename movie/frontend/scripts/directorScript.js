function addMovieOptions() {
    fetch('/movies')
        .then(res => res.json())
        .then(data => {
            const selectOpt = document.getElementById('directedMovies');
            const selectOpt2 = document.getElementById('acted_in');

            var inner1 = `<select name="directedMovies" class="form-select" aria-label="Default select example" multiple="multiple">`;
            var inner2 = `<select name="acted_in" class="form-select" aria-label="Default select example" multiple="multiple">`; 
            
            data.forEach(element => {
                const optText = `<option value="${element.title + "_" + element.year}">${element.title + "(" + element.year + ")"}</option>`;
                inner1 += optText;
                inner2 += optText;
            });

            inner1 += `</select>`;
            inner2 += `</select>`;

            selectOpt.innerHTML = inner1;
            selectOpt2.innerHTML = inner2;

            $('select[multiple]').multiselect({
                templates: {
                    button: '<button type="button" class="multiselect dropdown-toggle btn btn-outline-light" data-bs-toggle="dropdown" aria-expanded="false"><span class="multiselect-selected-text"></span></button>',
                },
            });
        });
}

addMovieOptions();