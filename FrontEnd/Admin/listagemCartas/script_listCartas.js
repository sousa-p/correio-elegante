const divCards = document.querySelectorAll(".card");
const divCardsClosed = document.querySelectorAll(".card__closed");
const divCardsContent = document.querySelectorAll(".card__content");

divCardsClosed.forEach((element, i) => {
  const card = divCards[i];
  const classes = divCardsContent[i].classList;

  element.addEventListener("click", () => {
    classes.toggle("content__d-none");

    card.style.border = 
    (!classes.contains("content__d-none")) 
    ? "2px solid var(--tertiary-color)" : "0";

    element.style.borderRadius =
    (!classes.contains("content__d-none")) 
    ? "0" : null;
  });
});