const genreDropdown = document.getElementById('genre');
genreDropdown.addEventListener('change', toggleOthersInput(genreDropdown, 'otherGenre'));

function toggleOthersInput(select, targetId) {
    var targetElement = document.getElementById(targetId);
    if (select.value === "others") {
      targetElement.classList.add("active");
    } else {
      targetElement.classList.remove("active");
    }
  }