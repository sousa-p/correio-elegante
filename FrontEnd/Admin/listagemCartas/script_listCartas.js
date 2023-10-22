const url = "http://127.0.0.1:8000/letter";
const token = localStorage.getItem("token");
fetch(url, {
  method: "GET",
  headers: new Headers({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/x-www-form-urlencoded'
    })
  })
  .then((response) => response.json())
  .then((dados) => {
    console.log(dados)

    const divCards = document.querySelector(".cards__container");
    dados.forEach((element, i) => {
      let card = document.createElement('div');
      card.classList.add('card');
      let cardInner = `
      <div class="card__closed d-flex flex-wrap justify-content-between">
        <div class="d-flex">
          <p class="title">Para:</p>
          <p class="text">${element.receiver.name}</p>
        </div>
        <div class="d-flex">
          <p class="title">Sala:</p>
          <p class="text">${element.receiver.year}º ${element.receiver.course}</p>
        </div>
      </div>
      <div class="card__content content__d-none">
        <div class="info info__message d-flex flex-column justify-content-between">
          <p>${element.message}</p>
          <div class="info__message-obs">
            <p class="title">Características:</p>
            <p class="text">${element.receiver.characteristics}</p>
          </div>
        </div>
        <div class="info d-flex flex-wrap justify-content-between">
          <div class="d-flex">
            <p class="title">De:</p>
            <p class="text">${element.sender.name}</p>
          </div>
          <div class="d-flex">
            <p class="title">Sala:</p>
            <p class="text">${element.sender.year}º ${element.sender.course}</p>
          </div> 
          <div class="d-flex">
            <p class="title">Telefone:</p>
            <p class="text">${element.sender.tel}</p>
          </div>       
        </div>
        <div class="info d-flex flex-column justify-content-between">
          <p class="title">Adicionais:</p>
          <div class="info__combos d-flex flex-column justify-content-between"></div>
        </div>
      </div>
      <div class="card__status">
        <select name="status" id="status">
        <option value="${element.status}" select hidden>${element.status}</option>
        <option value="Aguardando Pagamento">Aguardando Pagamento</option>
        <option value="Pendente de Envio">Pendente de Envio</option>
        <option value="Enviado">Enviado</option>
        </select>
      </div>`;
      card.innerHTML += cardInner
      divCards.appendChild(card)

      let combos = document.querySelectorAll(".info__combos")[i];
      element.additionals.forEach(item => {
        let value = String(item.value.toFixed(2)).replace('.', ',');
        let combosInner = `
        <div class="d-flex justify-content-between w-75">
          <p class="text">${item.name}</p>
          <p class="text">R$${value}</p>
        </div>
        `;
        combos.innerHTML += combosInner;
      });
    });

    const cards = document.querySelectorAll(".card");
    const divCardsClosed = document.querySelectorAll(".card__closed");
    const divCardsContent = document.querySelectorAll(".card__content");    

    divCardsClosed.forEach((element, i) => {
      let card = cards[i];
      let classes = divCardsContent[i].classList;
    
      element.addEventListener("click", () => {
        classes.toggle("content__d-none");
    
        card.style.outline = 
        (!classes.contains("content__d-none")) 
        ? "2px solid var(--tertiary-color)" : "0";
      });
    });
  })
  .catch((_) => console.log(_));