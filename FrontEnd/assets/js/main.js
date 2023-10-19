// function changeDisplay()

const addMessage = document.querySelector(".message__btn-add");
const removeMessage = document.querySelector(".message__btn-remove");
const fieldMessage = document.querySelector(".message>textarea");

addMessage.addEventListener("click", () => {
    addMessage.style.display = "none";
    removeMessage.style.display = "block";
    fieldMessage.style.display = "block";
});

removeMessage.addEventListener("click", () => {
    removeMessage.style.display = "none";
    addMessage.style.display = "block";
    fieldMessage.style.display = "none";
});