$(document).ready(function() {
  $('select[multiple]').multiselect({
      templates: {
          button: '<button type="button" class="multiselect dropdown-toggle btn btn-outline-dark" data-bs-toggle="dropdown" aria-expanded="false"><span class="multiselect-selected-text"></span></button>',
      },
  });
});

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

addProductionOptions();