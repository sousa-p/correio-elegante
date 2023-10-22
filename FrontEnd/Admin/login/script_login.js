const btnLogin = document.getElementById("btn-form");
const userLogin = document.getElementById("name");
const passwordLogin = document.getElementById("password");

btnLogin.addEventListener("click", () => {
  const data = {
    login: userLogin.value,
    password: passwordLogin.value
  }

  const url = 'http://127.0.0.1:8000/admin/login';
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  .then(response => {
    (response.status === 200)
    ? window.location.href = "../listagemCartas/listagemCartas.html"
    : response.json();
  })
  .then(dados => {
    localStorage.setItem("token", dados.token);
    console.log(dados)
  })
  .catch((_) => console.log(_));
})  