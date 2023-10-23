function inputEmpty(input){
  return String(input.value).trim() === '';
}

function messageError(input, message){
  let error = document.createElement('p');
  error.classList.add("error");
  error.innerHTML = `${message}`
  input.parentElement.appendChild(error);
}

function removeMessageError(input) {
  input.addEventListener("keydown", () => {
    if(!inputEmpty(input)) {
      let error = document.querySelectorAll(".error");
      input.parentElement.removeChild(error);
    }
  });
}

const letterCouple = document.querySelector("#checkbox-couple");
const letterAnonymous = document.querySelector("#checkbox-anonymous");

letterAnonymous.addEventListener("change", () => {
  let nameSender = document.querySelector(".name-sender");
  let yearSender = document.querySelector(".year-sender");
  let classSender = document.querySelector(".class-sender");
  if (letterAnonymous.checked) {
    nameSender.value = null;
    yearSender.value = "default";
    classSender.value = "default";

    nameSender.disabled = true;
    yearSender.disabled = true;
    classSender.disabled = true;
  } else {
    nameSender.disabled = false;
    yearSender.disabled = false;
    classSender.disabled = false;
  }
});

const addAdditional = document.querySelector(".additional__btn-add");
letterCouple.addEventListener("change", () => {
  const disclaimerCombos = document.querySelector(".disclaimer__combos");

  if (letterCouple.checked) {
    let secondRecipientData = document.createElement("div");
    secondRecipientData.classList.add("personal__data-recipient");

    let recipientData = document.querySelector(".personal__data-recipient");
    secondRecipientData.innerHTML = recipientData.innerHTML;

    let divRecipient = document.querySelectorAll(".personal__data")[1];
    divRecipient.appendChild(secondRecipientData);

    addAdditional.disabled = true;
    disclaimerCombos.style.display = "block";
    let additional = document.querySelectorAll(".additional__field");
    additional.forEach((element) => {
      element.remove();
    });
  } else {
    let divRecipient = document.querySelectorAll(".personal__data")[1];
    let secondRecipientData = document.querySelectorAll(".personal__data-recipient")[1];
    divRecipient.removeChild(secondRecipientData);

    addAdditional.disabled = false;
    disclaimerCombos.style.display = "none";
  }
});

const url = "http://127.0.0.1:8000/additional";
fetch(url)
  .then((response) => response.json())
  .then((dados) => {
    dados.shift();
    dados.pop();
    const divAdditional = document.querySelector(".combos__additional");
    addAdditional.addEventListener("click", () => {
      let AdditionalField = document.createElement("div");
      AdditionalField.classList.add("additional__field");

      let AdditionalInnerSelect = document.createElement("select");
      AdditionalInnerSelect.classList.add("additional__select");

      let AdditionalInnerBtn = `
        <button type="button" class="additional__btn-remove">
          Remover
          <img src="../../assets/img/minus-outline.svg" alt="">
        </button>
        `;

      dados.forEach((element) => {
        let value = String(element.value.toFixed(2)).replace(".", ",");
        let option = `
          <option value="${element.id}">R$${value} ${element.name}</option>
          `;
        AdditionalInnerSelect.innerHTML += option;
      });

      AdditionalField.appendChild(AdditionalInnerSelect);
      AdditionalField.innerHTML += AdditionalInnerBtn;
      divAdditional.appendChild(AdditionalField);

      let removeAdditional = document.querySelectorAll(".additional__btn-remove");
      removeAdditional.forEach((element) => {
        element.addEventListener("click", () => {
          element.parentElement.remove();
        });
      });
    });
  })
  .catch((_) => console.log(_));

const btnCad = document.getElementById("btn-form");
btnCad.addEventListener("click", () => {
  const messages = document.querySelectorAll('.message__input');
  const receivers_characteristics = document.querySelectorAll('.characteristics__input');
  const receivers_courses = document.querySelectorAll('.class-recipient');
  const receivers_names = document.querySelectorAll('.name-recipient');
  const receivers_years = document.querySelectorAll('.year-recipient');
  const sender_tel = document.querySelector('.phone-sender');
  const sender_year = document.querySelector('.year-sender').value;
  const sender_course = document.querySelector('.class-sender').value;
  const sender_name = document.querySelector('.name-sender');

  if(letterCouple.checked) {
  const data = {
    additional: ['7', '7'],
    messages: [messages[0].value, messages[1].value],
    receivers_characteristics: [receivers_characteristics[0].value, receivers_characteristics[1].value],
    receivers_courses: [receivers_courses[0].value, receivers_courses[1].value],
    receivers_names: [receivers_names[0].value, receivers_names[1].value],
    receivers_years: [receivers_years[0].value, receivers_years[1].value],
    sender_tel: sender_tel.value,
    sender_year: sender_year,
    sender_course: sender_year,
    sender_name: sender_name.value
  }

  fetch('http://127.0.0.1:8000/letter/store/couple', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if(response.status === 200){
        window.location.href = "../pagamento/pagamento.html"
      }
      return response.json();
    })
    .then(dados => {
      console.log(dados)
      
      if(inputEmpty(receivers_names[1])){
        dados.receiver_names = "O campo 'nome destinatário' é obrigatório."
        messageError(receivers_names[1], dados.receiver_names);
        
        removeMessageError(receivers_names[1]);
      }

      if(inputEmpty(receivers_characteristics[1])){
        dados.receivers_characteristics = "O campo 'caracteríticas' é obrigatório."
        messageError(receivers_characteristics[1], dados.receivers_characteristics);
        
        removeMessageError(receivers_characteristics[1]);
      }

      if(inputEmpty(messages[1])){
        dados.message = "O campo 'mensagem' é obrigatório."
        messageError(messages[1], dados.message);
        
        removeMessageError(messages[1]);
      }
    })
    .catch((_) => console.log(_));

  } else {
    let arrayAdditionals = [];
    arrayAdditionals = ['1'];
    additionalSelects = document.querySelectorAll('.additional__select');
    additionalSelects.forEach(element => {
      arrayAdditionals.push(element.value);
    });

    const data = {
      additionals: arrayAdditionals,
      message: messages[0].value,
      receiver_characteristics: receivers_characteristics[0].value,
      receiver_course: receivers_courses[0].value,
      receiver_name: receivers_names[0].value,
      receiver_year: receivers_years[0].value,
      sender_tel: sender_tel.value,
      sender_year: sender_year,
      sender_course: sender_course,
      sender_name: sender_name.value
    }

    fetch('http://127.0.0.1:8000/letter/store', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if(response.status === 200){
        window.location.href = "../pagamento/pagamento.html"
      }
      return response.json();
    })
    .then(dados => {
      console.log(dados)
      if(inputEmpty(sender_name) && !letterAnonymous.checked){
        let errorSender_name = "O campo 'nome' é obrigatório."
        messageError(sender_name, errorSender_name);
        
        removeMessageError(sender_name);
      }

      if(inputEmpty(sender_tel)){
        dados.sender_tel = "O campo 'telefone' é obrigatório."
        messageError(sender_tel, dados.sender_tel);
        
        removeMessageError(sender_tel);
      }

      if(inputEmpty(receivers_names[0])){
        dados.receiver_names = "O campo 'nome destinatário' é obrigatório."
        messageError(receivers_names[0], dados.receiver_names);
        
        removeMessageError(receivers_names[0]);
      }

      if(inputEmpty(receivers_characteristics[0])){
        dados.receivers_characteristics = "O campo 'caracteríticas' é obrigatório."
        messageError(receivers_characteristics[0], dados.receivers_characteristics);
        
        removeMessageError(receivers_characteristics[0]);
      }


      if(inputEmpty(messages[0])){
        dados.message = "O campo 'mensagem' é obrigatório."
        messageError(messages[0], dados.message);
        
        removeMessageError(messages[0]);
      }
    })
    .catch((_) => console.log(_));
  }
})  

