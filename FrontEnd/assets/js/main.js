const letterCouple = document.querySelector(".letter__couple");

const divAdditional = document.querySelector(".combos__additional");
const addAdditional = document.querySelector(".additional__btn-add");

addAdditional.addEventListener("click", () => {
  const url = 'http://127.0.0.1:8000/additional/';

  fetch(url)
  .then(response => response.json())
  .then(dados => { 
    console.log(dados)
  })
  .catch((_) => console.log(_))

  const AdditionalFieldInner = `
  <select name="" id="" class="additional__option">
    <option value="">R$00,00 Doces</option>
    <option value="">R$00,00 Fini</option>
    <option value="">R$00,00 Bala</option>
  </select>
  <button type="button" class="additional__btn-remove">
    Remover
    <img src="./assets/img/minus-outline.svg" alt="">
  </button>
  `;

  var AdditionalField = document.createElement('div');
  AdditionalField.classList.add("additional__field");
  AdditionalField.innerHTML = AdditionalFieldInner;
  divAdditional.appendChild(AdditionalField);

  const removeAdditional = document.querySelectorAll(".additional__btn-remove");
  removeAdditional.forEach(element => {
    element.addEventListener("click", () => {
      element.parentElement.remove();
    });
  });
});