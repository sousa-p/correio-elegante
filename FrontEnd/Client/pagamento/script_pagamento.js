// function changeValueSubtotal(dados, index) {
//   let value = String(dados[index].value.toFixed(2)).replace(".", ",");
//   const typeLetter = document.querySelector(".type__letter");
//   typeLetter.innerHTML = `<span class="amount__title">Carta "${dados[index].name}"</span>R$${value}`;
// }
// changeValueSubtotal(dados, 0);
// changeValueSubtotal(dados, 6);


// const amountPrices = document.querySelector(".amount__prices");
// let additionalPrice = document.createElement("p");
// console.log(additionalPrice);
// additionalPrice.classList.add("additional__price");
// additionalPrice.innerHTML = `<span class="amount__title">Batom e Fini</span>R$0,00`;
// amountPrices.appendChild(additionalPrice)

fetch()
.then(response => response.json())
.then(dados => console.log(dados))
.catch((_) => console.log(_));