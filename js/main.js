document.addEventListener("DOMContentLoaded", () => {
    if (!isAuthorized()) {
        window.location.href = "login.html";
    } else {
        fetchAthletes("all");
        document.getElementById("filter-select").addEventListener("change", (e) => {
            fetchAthletes(e.target.value);
        });
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

function fetchAthletes(category) {
    let url;
    switch (category) {
        case "masculino":
            url = "https://botafogo-atletas.mange.li/2024-1/masculino";
            break;
        case "feminino":
            url = "https://botafogo-atletas.mange.li/2024-1/feminino";
            break;
        default:
            url = "https://botafogo-atletas.mange.li/2024-1/all";
    }
    fetch(url)
        .then(response => response.json())
        .then(data => renderAthletes(data))
        .catch(error => console.error("Error fetching athletes:", error));
}

function renderAthletes(athletes) {
    const container = document.getElementById("athletes-container");
    container.innerHTML = "";
    athletes.forEach(athlete => {
        const card = document.createElement("div");
        card.className = "athlete-card";
        card.innerHTML = `
            <h2>${athlete.nome}</h2>
            <img src="${athlete.imagem}"></img>
            <p>${athlete.posicao}</p>
            <a href="details.html?id=${athlete.id}">Ver detalhes</a>
        `;
        container.appendChild(card);
    });
}

