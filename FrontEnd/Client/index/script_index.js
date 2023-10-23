var recipientData = document.querySelector(".personal__data-recipient").innerHTML;

const inputPhone = (event) => {
  let phone = document.querySelector(".phone");
  phone = event.target;
  phone.value = maskPhone(phone.value);
}

const maskPhone = (value) => {
  if (!value) return ""
  value = value.replace(/\D/g,'')
  value = value.replace(/(\d{2})(\d)/,"($1) $2")
  value = value.replace(/(\d)(\d{4})$/,"$1-$2")
  return value
}

function inputEmpty(input){
  return String(input.value).trim() === '';
}

function messageError(input, message){
  let error = document.createElement('p');
  let nameClass = `error-${input.classList[0]}`
  error.classList.add('error');
  error.classList.add(nameClass);

  error.innerHTML = `${message}`
  input.parentElement.appendChild(error);
}

function removeMessageError(inputErro, i) {
  inputErro.addEventListener("keyup", () => {
    if(!inputEmpty(inputErro)) {
      let nameClass = `.error-${inputErro.classList[0]}`;
      let error = document.querySelectorAll(nameClass)[i];
      if(error) {
        inputErro.parentElement.removeChild(error)
      }
    }
  });
}

function putMessageError(input, errorInput, j) {
  if(inputEmpty(input)){
    let nameClass = `.error-${input.classList[0]}`
    if(!document.querySelectorAll(nameClass)[j]){
      messageError(input, errorInput);
    }
    removeMessageError(input, j);
  }
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

    secondRecipientData.innerHTML = recipientData;

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

const url = "https://jubilant-space-trout-57r9j445rr427vp7-8000.app.github.dev/additional";
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

  fetch('https://jubilant-space-trout-57r9j445rr427vp7-8000.app.github.dev/letter/store/couple', {
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
        let errorSender_name = "O campo 'nome' é obrigatório.";
        let nameClass = `.error-${sender_name.classList[0]}`

        if(!document.querySelector(nameClass)){
          messageError(sender_name, errorSender_name);
        }
    
        removeMessageError(sender_name, 0);
      }

      console.log(messages);
      let errorTel = "O campo 'telefone' é obrigatório.";
      putMessageError(sender_tel, errorTel, 0);

      let errorReceiverName = "O campo 'nome destinatário' é obrigatório.";
      putMessageError(receivers_names[0], errorReceiverName, 0);
      if(!putMessageError(receivers_names[0], errorReceiverName, 0)){
        putMessageError(receivers_names[1], errorReceiverName, 0);
      } else {
        putMessageError(receivers_names[1], errorReceiverName, 1);
      }

      let errorCharacteristics = "O campo 'caracteríticas' é obrigatório.";
      putMessageError(receivers_characteristics[0], errorCharacteristics, 0);
      if(!putMessageError(receivers_characteristics[0], errorCharacteristics, 0)){
        putMessageError(receivers_characteristics[1], errorCharacteristics, 0);
      } else {
        putMessageError(receivers_characteristics[1], errorCharacteristics, 1);
      }

      let errorMessage = "O campo 'mensagem' é obrigatório.";
      putMessageError(messages[0], errorMessage, 0);
      if(!putMessageError(messages[0], errorMessage, 0)){
        putMessageError(messages[1], errorMessage, 0);
      } else {
        putMessageError(messages[1], errorMessage, 1);
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

    fetch('https://jubilant-space-trout-57r9j445rr427vp7-8000.app.github.dev/letter/store', {
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
        let errorSender_name = "O campo 'nome' é obrigatório.";
        let nameClass = `.error-${sender_name.classList[0]}`

        if(!document.querySelector(nameClass)){
          messageError(sender_name, errorSender_name);
        }
    
        removeMessageError(sender_name, 0);
      }

      let errorSenderTel = "O campo 'telefone' é obrigatório.";
      putMessageError(sender_tel, errorSenderTel, 0);

      let errorReceiverName = "O campo 'nome destinatário' é obrigatório.";
      putMessageError(receivers_names[0], errorReceiverName, 0);

      let errorCharacteristics = "O campo 'caracteríticas' é obrigatório.";
      putMessageError(receivers_characteristics[0], errorCharacteristics, 0);

      let errorMessage = "O campo 'mensagem' é obrigatório.";
      putMessageError(messages[0], errorMessage, 0);
    })
    .catch((_) => console.log(_));
  }
})  

