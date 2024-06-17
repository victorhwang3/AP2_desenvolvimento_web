document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const password = document.getElementById("password").value;
    const hash = sha256(password);
    const validHash = "db36f96abf366f9e28583fe898ce814e4bc480102aa2e276eec4a28227588704"; // hash da senha "UMASENHA"
    if (hash === validHash) {
        localStorage.setItem("authorized", "true");
        window.location.href = "index.html";
    } else {
        alert("Senha incorreta");
    }
});
