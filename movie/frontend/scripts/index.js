

function checkMovies() {
    const actorBtn = document.getElementById("actor-btn");
    const directorBtn = document.getElementById("director-btn");

    fetch('/movies')
        .then(res => {
            if (res.status == 404) {
                actorBtn.ariaDisabled = true;
                actorBtn.classList.add('disabled');

                directorBtn.ariaDisabled = true;
                directorBtn.classList.add('disabled');
            }
            else if (res.status == 200) {
                actorBtn.ariaDisabled = false;
                actorBtn.classList.remove('disabled');

                directorBtn.ariaDisabled = false;
                directorBtn.classList.remove('disabled');
            }
        });
}

checkMovies();