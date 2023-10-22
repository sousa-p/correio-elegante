const letterCouple = document.querySelector("#checkbox-couple");
const letterAnonymous = document.querySelector("#checkbox-anonymous");

letterAnonymous.addEventListener("change", () => {
  let nameSender = document.querySelector("#name-sender");
  let yearSender = document.querySelector("#year-sender");
  let classSender = document.querySelector("#class-sender");
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

const url = "http://127.0.0.1:8000/additional";
fetch(url)
  .then((response) => response.json())
  .then((dados) => {
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

    var arrayAdditionals = [];
    dados.forEach((item, i) => {
      arrayAdditionals[i] = item;
    });
    arrayAdditionals.shift();
    arrayAdditionals.pop();

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

      arrayAdditionals.forEach((element) => {
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
