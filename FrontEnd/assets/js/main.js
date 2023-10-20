const divCandies = document.querySelector(".combos__candies");
const addCandy = document.querySelector(".candy__btn-add");
const candyFieldInner = `
<select name="" id="" class="candy__option">
  <option value="">R$00,00 Doces</option>
  <option value="">R$00,00 Fini</option>
  <option value="">R$00,00 Bala</option>
</select>
<button type="button" class="candy__btn-remove">
  Remover
  <img src="./assets/img/minus-outline.svg" alt="">
</button>
`;

addCandy.addEventListener("click", () => {
  var candyField = document.createElement('div');
  candyField.classList.add("candy__field");
  candyField.innerHTML = candyFieldInner;
  divCandies.appendChild(candyField);

  const removeCandy = document.querySelectorAll(".candy__btn-remove");
  removeCandy.forEach(element => {
    element.addEventListener("click", () => {
      element.parentElement.remove();
    });
  });
});