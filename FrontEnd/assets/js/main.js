const letterCouple = document.querySelector(".letter__couple");

const divAdditional = document.querySelector(".combos__additional");
const addAdditional = document.querySelector(".additional__btn-add");

addAdditional.addEventListener("click", () => {
  const url = "http://127.0.0.1:8000/additional";

  fetch(url)
    .then((response) => response.json())
    .then((dados) => {
      let AdditionalField = document.createElement("div");
      AdditionalField.classList.add("additional__field");

      let AdditionalInnerSelect = document.createElement("select");
      AdditionalInnerSelect.classList.add("additional__select");

      let AdditionalInnerBtn = `
      <button type="button" class="additional__btn-remove">
        Remover
        <img src="./assets/img/minus-outline.svg" alt="">
      </button>
      `;

      dados.shift();
      dados.pop();
      dados.forEach(element => {
        let value = String(element.value.toFixed(2)).replace('.', ',');
        let option = `
        <option value="${element.id}">R$${value} ${element.name}</option>
        `;
        AdditionalInnerSelect.innerHTML += option;
      });

      AdditionalField.appendChild(AdditionalInnerSelect);
      AdditionalField.innerHTML += AdditionalInnerBtn;
      divAdditional.appendChild(AdditionalField);

      const removeAdditional = document.querySelectorAll(
        ".additional__btn-remove"
      );
      removeAdditional.forEach((element) => {
        element.addEventListener("click", () => {
          element.parentElement.remove();
        });
      });
    })
    .catch((_) => console.log(_));
});