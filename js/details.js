document.addEventListener("DOMContentLoaded", () => {
    if (!isAuthorized()) {
        window.location.href = "login.html";
    } else {
        const urlParams = new URLSearchParams(window.location.search);
        const athleteId = urlParams.get("id");
        if (athleteId) {
            fetchAthleteDetails(athleteId);
        } else {
            displayError("ID do atleta não fornecido");
        }
        document.getElementById("logout-button").addEventListener("click", logout);
    }
});

function isAuthorized() {
    return localStorage.getItem("authorized") === "true";
}

function logout() {
    localStorage.removeItem("authorized");
    window.location.href = "login.html";
}

function fetchAthleteDetails(id) {
    fetch(`https://botafogo-atletas.mange.li/2024-1/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => renderAthleteDetails(data))
        .catch(error => displayError(error.message));
}

function renderAthleteDetails(athlete) {
    const container = document.getElementById("details-container");
    container.innerHTML = `
        <h1>${athlete.nome}</h1>
        <img src="${athlete.imagem}"></img>
        <p>${athlete.detalhes}</p>
        <p><strong>Jogos pelo Botafogo:</strong> ${athlete.n_jogos}</p>
        <p><strong>Posição:</strong> ${athlete.posicao}</p>
        <p><strong>Nascimento:</strong> ${athlete.nascimento}</p>
        <p><strong>Altura:</strong> ${athlete.altura}</p>
        <p><strong>Naturalidade:</strong> ${athlete.naturalidade}</p>
    `;
}

function displayError(message) {
    const container = document.getElementById("details-container");
    container.innerHTML = `<p style="color: red;">Erro: ${message}</p>`;
}

