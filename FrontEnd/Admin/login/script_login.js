const btnLogin = document.getElementById("btn-form");
const userLogin = document.getElementById("name");
const passwordLogin = document.getElementById("password");

btnLogin.addEventListener("click", () => {
  const data = {
    login: userLogin.value,
    password: passwordLogin.value
  }

  const url = 'https://refactored-engine-wq54p99xgg725w5g-8000.app.github.dev/admin/login';
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  .then(response => {
    if(response.status === 200){
      window.location.href = "../listagemCartas/listagemCartas.html"
    }
    return response.json();
  })
  .then(dados => {
    localStorage.setItem("token", dados.token);
    console.log(dados)
  })
  .catch((_) => console.log(_));
})  
