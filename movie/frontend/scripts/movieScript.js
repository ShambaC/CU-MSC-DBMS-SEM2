function addProductionOptions() {
  fetch('/productions')
      .then(res => res.json())
      .then(data => {
          const selectOpt = document.getElementById('productioncompany');
          
          data.forEach(element => {
              const optText = `<option value="${element.pName}">${element.pName}</option>`;
              selectOpt.innerHTML += optText;
          });
      });
}

function addGenreOptions() {
    fetch('/genres')
      .then(res => res.json())
      .then(data => {
          const selectOpt = document.getElementById('genre');

          var inner = "";

          inner += `<select name="genre" class="form-control" multiple="multiple">`;
          
          data.forEach(element => {
              const optText = `<option value="${element.genreName}">${element.genreName}</option>`;
              inner += optText;
          });

          inner += `</select>`;

          selectOpt.innerHTML = inner;

          $('select[multiple]').multiselect({
            templates: {
                button: '<button type="button" class="multiselect dropdown-toggle btn btn-outline-dark" data-bs-toggle="dropdown" aria-expanded="false"><span class="multiselect-selected-text"></span></button>',
            },
            });
      });
}

addProductionOptions();
addGenreOptions();