<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  <link rel="stylesheet" href="../../assets/css/main.css">
  <link rel="stylesheet" href="./style_listCartas.css">
  <title>Listagem</title>
</head>

<body class="d-flex justify-content-center align-items-center">
  <main class="d-flex flex-column justify-content-between align-items-center">
    <div class="logo">
      <img src="" alt="">
    </div>

    <div class="menu__container">
      <input type="checkbox" name="menu" id="menu">
      <label for="menu" class="menu__closed d-flex justify-content-between align-items-center">
        <p>Pedidos</p>
        <img src="../../assets/img/ion_menu.svg" alt="menu">
      </label>
      <ul class="menu__nav">
        <li>
          <a href="#">Pendentes</a>
        </li>
        <li>
          <a href="#">Entregues</a>
        </li>
      </ul>
    </div>

    <div class="cards__container">
      <div class="card">
        <div class="info info__recipient d-flex justify-content-between">
          <p class="name"><span>Para:</span> </p>
          <p class="classroom"><span>Sala:</span> </p>
        </div>
        <div class="info info__message d-flex flex-column justify-content-between">
          <p></p>
          <div class="info__message-obs">
            <p><span>Observações:</span> </p>
          </div>
        </div>
        <div class="info info__sender d-flex justify-content-between">
          <p class="name"><span>De:</span> </p>
          <p class="classroom"><span>Sala:</span> </p>
        </div>
        <div class="info info__combos d-flex justify-content-between">
          <p><span>Doces:</span> </p>
          <p>R$00,00</p>
        </div>
        <div class="card__status">
          <select name="status" id="status">
            <option value="0" selected>Pendente</option>
            <option value="1">Entregue</option>
          </select>
        </div>
      </div>
    </div>
  </main>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
</body>

</html>