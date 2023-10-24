var recipientData = document.querySelector(".personal__data-recipient").innerHTML;

// Tranfer area
const btnCopyToTransfer = document.querySelector('#copyToTransfer-btn');
const textarea = document.querySelector('#copyToTransfer');

btnCopyToTransfer.addEventListener('click', (e) => {
  e.preventDefault();
  navigator.clipboard.writeText(textarea.value);
});

// Phone Mask
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

// Validation
function inputEmpty(input){
  return String(input.value).trim() === '';
}
function messageError(input, message){
  let error = document.createElement('p');
  error.classList.add('error');
  error.classList.add(`error-${input.classList[0]}`);
  error.innerHTML = `${message}`
  input.parentElement.appendChild(error);
}
function removeMessageError(inputErro, i) {
  inputErro.addEventListener("keyup", () => {
    let error = document.querySelectorAll(`.error-${inputErro.classList[0]}`)[i];
    if(!inputEmpty(inputErro) && error) {
      inputErro.parentElement.removeChild(error);
    }
  });
}
function putMessageError(input, errorInput, j) {
  if(inputEmpty(input) && !document.querySelectorAll(`.error-${input.classList[0]}`)[j]){
    messageError(input, errorInput);
    removeMessageError(input, j);
  }
}

const letterCouple = document.querySelector("#checkbox-couple");
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

const url = "https://refactored-engine-wq54p99xgg725w5g-8000.app.github.dev/additional";
fetch(url)
  .then((response) => response.json())
  .then((dados) => {
    dados.shift();
    dados.pop();
    var arOptions = [];
    var items = 0;
    dados.forEach((element, i) => {
      let value = String(element.value.toFixed(2)).replace(".", ",");
      let option = `
      <option class="${value} optionElement" value="${element.id}">R$${value} ${element.name}</option>
      `;
      arOptions[i] = option;
      items++;
    });
    const divAdditional = document.querySelector(".combos__additional");
    addAdditional.addEventListener("click", () => {
      if(items > 0){
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
  
        AdditionalInnerSelect.innerHTML += arOptions.toString();
  
        AdditionalField.appendChild(AdditionalInnerSelect);
        AdditionalField.innerHTML += AdditionalInnerBtn;
        divAdditional.appendChild(AdditionalField);
        // console.log(arOptions)
        // console.log(AdditionalInnerSelect.options)
        // let a = document.createElement("div");
        // a.appendChild(lastOption)
        // console.log(lastOption);
        // console.log(a);
        // console.log(a.innerHTML);

        // console.log(arOptions.indexOf(a.innerHTML))
        items--;
      }
      let removeAdditional = document.querySelectorAll(".additional__btn-remove");
      removeAdditional.forEach((element) => {
        element.addEventListener("click", () => {
          element.parentElement.remove();
        });
        items++;
      });
    });
  })
  .catch((_) => console.log(_));

  function setValueClass(select){
    if(select.value == '') {
      return null;
    } else {
      return select.value;
    }
  }

const btnCad = document.getElementById("btn-form");
var total = 1.5;
btnCad.addEventListener("click", () => {
  const select = document.querySelectorAll(".additional__select") 
  select.forEach(element => {
    let lastOption = element.options[element.selectedIndex].classList[0];
    total += Number(lastOption.replace(",", "."))
    console.log(lastOption);
  });

  const price = document.querySelector(".amount__title");
  price.innerHTML = `Total: R$${total.toFixed(2)}`
  console.log(total);

  const messages = document.querySelectorAll('.message__input');
  const receivers_characteristics = document.querySelectorAll('.characteristics__input');
  const receivers_courses = document.querySelectorAll('.class-recipient');
  const receivers_names = document.querySelectorAll('.name-recipient');
  const receivers_years = document.querySelectorAll('.year-recipient');
  const sender_tel = document.querySelector('.phone-sender');
  const sender_year = document.querySelector('.year-sender');
  const sender_course = document.querySelector('.class-sender');
  const sender_name = document.querySelector('.name-sender');
  const letterAnonymous = document.querySelector("#checkbox-anonymous");
  var anonymousCheck = (letterAnonymous.checked) ? true : false;

  if(letterCouple.checked) {
  price.innerHTML = `Total: R$2.50`
  
  const data = {
    additional: ['7', '7'],
    anonymous: anonymousCheck,
    messages: [messages[0].value, messages[1].value],
    receivers_characteristics: [receivers_characteristics[0].value, receivers_characteristics[1].value],
    receivers_courses: [receivers_courses[0].value, receivers_courses[1].value],
    receivers_names: [receivers_names[0].value, receivers_names[1].value],
    receivers_years: [setValueClass(receivers_years[0]), setValueClass(receivers_years[1])],
    sender_tel: sender_tel.value,
    sender_year: setValueClass(sender_year),
    sender_course: sender_course.value,
    sender_name: sender_name.value
  }

  console.log(data)
  fetch('https://refactored-engine-wq54p99xgg725w5g-8000.app.github.dev/letter/store/couple', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if(response.status === 200 || response.status === 201){
        const modal = document.querySelector('.payment_modal');
        modal.classList.add("payment_modal-open");
      }
      return response.json();
    })
    .then(dados => {
      console.log(dados)

      putMessageError(sender_name, String(dados.sender_name).replace("sender name", "nome"), 0);
      putMessageError(sender_tel, String(dados.sender_tel).replace("sender tel", "telefone"), 0);

      let strDados = "Campo Obrigatório";
      putMessageError(receivers_names[0], strDados, 0);
      if(!putMessageError(receivers_names[0], strDados, 0)){
        putMessageError(receivers_names[1], strDados, 0);
      } else {
        putMessageError(receivers_names[1], strDados, 1);
      }

      putMessageError(receivers_characteristics[0], strDados, 0);
      if(!putMessageError(receivers_characteristics[0], strDados, 0)){
        putMessageError(receivers_characteristics[1], strDados, 0);
      } else {
        putMessageError(receivers_characteristics[1], strDados, 1);
      }

      putMessageError(messages[0], strDados, 0);
      if(!putMessageError(messages[0], strDados, 0)){
        putMessageError(messages[1], strDados, 0);
      } else {
        putMessageError(messages[1], strDados, 1);
      }
    })
    .catch((_) => console.log(_));

  } else {
    let arrayAdditionals = [];
    arrayAdditionals = ['1'];
    let additionalSelects = document.querySelectorAll('.additional__select');
    additionalSelects.forEach(element => {
      arrayAdditionals.push(element.value);
    });

    const data = {
      additionals: arrayAdditionals,
      anonymous: anonymousCheck,
      message: messages[0].value,
      receiver_characteristics: receivers_characteristics[0].value,
      receiver_course: receivers_courses[0].value,
      receiver_name: receivers_names[0].value,
      receiver_year: setValueClass(receivers_years[0]),
      sender_tel: sender_tel.value,
      sender_year:  setValueClass(sender_year),
      sender_course: sender_course.value,
      sender_name: sender_name.value
    }

    fetch('https://refactored-engine-wq54p99xgg725w5g-8000.app.github.dev/letter/store', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if(response.status === 200 || response.status === 201){
        const modal = document.querySelector('.payment_modal');
        modal.classList.add("payment_modal-open");
      }
      return response.json();
    })
    .then(dados => {
      console.log(dados)

      putMessageError(sender_name, String(dados.sender_name).replace("sender name", "nome"), 0);
      putMessageError(sender_tel, String(dados.sender_tel).replace("sender tel", "telefone"), 0);
      putMessageError(receivers_names[0], String(dados.receiver_name).replace("receiver name", "destinatário"), 0);
      putMessageError(receivers_characteristics[0], String(dados.receiver_characteristics).replace("receiver characteristics", "características"), 0);
      putMessageError(messages[0], dados.message, 0);
    })
    .catch((_) => console.log(_));
  }
})  

