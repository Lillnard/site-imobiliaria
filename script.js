// script.js
const properties = [
  {
    type: "apartamento",
    imageCount: 3,
    price: "350.000,00",
    description: "Linda casa de 3 quartos com jardim espaçoso.",
    room: 3,
    toilet: 2,
    garage: 2,
    code: "AP0001",
    bairro: "Gopoúva",
  },
  {
    type: "casa",
    imageCount: 3,
    price: "200.000,00",
    description: "Apartamento moderno com vista para o mar.",
    room: 2,
    toilet: 2,
    garage: 1,
    code: "CA0001",
    bairro: "Praia Grande",
  },
  {
    type: "sobrado",
    imageCount: 3,
    price: "150.000,00",
    description: "Sobrado excelente.",
    room: 4,
    toilet: 3,
    garage: 2,
    code: "SO0001",
    bairro: "Mooca",
  },
  // Adicione mais propriedades conforme necessário
];

function generatePropertyCode(type, index) {
  let code = "";
  switch (type) {
    case "apartamento":
      code = "AP";
      break;
    case "casa":
      code = "CA";
      break;
    case "sobrado":
      code = "SO";
      break;
    case "galpao":
      code = "GA";
      break;
    case "salao":
      code = "SA";
      break;
    case "terreno":
      code = "TE";
      break;
    default:
      code = "OT"; // Outros tipos
  }
  const paddedIndex = String(index + 1).padStart(4, "0");
  return code + paddedIndex;
}

function getPropertyImageSrc(type, code, index) {
  return `imagens/${type}/${code}/${code} (${index + 1}).jpg`;
}

function search() {
  // Função search permanece a mesma
}

function displayProperties(properties) {
  const propertiesContainer = document.getElementById("properties");

  properties.forEach((property, index) => {
    const propertyDiv = document.createElement("div");
    propertyDiv.classList.add("properties-container");

    const imagesContentDiv = document.createElement("div");
    imagesContentDiv.classList.add("images-content");

    const aTag = document.createElement("a");
    aTag.setAttribute("href", "#");

    for (let i = 0; i < property.imageCount; i++) {
      const img = document.createElement("img");
      img.setAttribute(
        "src",
        getPropertyImageSrc(property.type, property.code, i)
      );
      img.classList.add(`img${i + 1}`, "fade");
      if (i > 0) img.classList.add("hide");
      aTag.appendChild(img);
    }

    imagesContentDiv.appendChild(aTag);

    const bulletsContainerDiv = document.createElement("div");
    bulletsContainerDiv.classList.add("bullets-container");

    for (let i = 0; i < property.imageCount; i++) {
      const bulletDiv = document.createElement("div");
      bulletDiv.classList.add("circulo");
      if (i === 0) bulletDiv.classList.add("ativo");
      bulletDiv.id = `property${index + 1}-btn${i + 1}`;
      const bulletIcon = document.createElement("i");
      bulletIcon.classList.add("fa-regular", "fa-circle");
      bulletDiv.appendChild(bulletIcon);
      bulletsContainerDiv.appendChild(bulletDiv);
    }

    imagesContentDiv.appendChild(bulletsContainerDiv);
    propertyDiv.appendChild(imagesContentDiv);

    const propertiesContentDiv = document.createElement("div");
    propertiesContentDiv.classList.add("properties-content");

    const h3 = document.createElement("h3");
    h3.innerHTML = `<span id="type">${property.type}</span> - <span id="bairro">${property.bairro}</span> - <span id="code">cód: ${property.code}</span>`;
    propertiesContentDiv.appendChild(h3);

    const propertyDependenciesDiv = document.createElement("div");
    propertyDependenciesDiv.classList.add("property-dependencies");
    propertyDependenciesDiv.innerHTML = `
      <i class="fa-solid fa-bed" id="room"> ${property.room}</i>
      <i class="fa-solid fa-toilet" id="toilet"> ${property.toilet}</i>
      <i class="fa-solid fa-car" id="garage"> ${property.garage}</i>
    `;
    propertiesContentDiv.appendChild(propertyDependenciesDiv);

    const priceH3 = document.createElement("h3");
    priceH3.textContent = `R$ ${property.price}`;
    propertiesContentDiv.appendChild(priceH3);

    const pDescription = document.createElement("p");
    pDescription.innerHTML = `<span class="sep">&#8226;</span> Descrição: ${property.description}`;
    propertiesContentDiv.appendChild(pDescription);

    propertyDiv.appendChild(propertiesContentDiv);
    propertiesContainer.appendChild(propertyDiv);
  });

  // Capturando os botões (bullets) e imagens
  document.querySelectorAll(".bullets-container .circulo").forEach((bullet) => {
    bullet.addEventListener("click", () => {
      const propertyIndex = bullet.id.split("-")[0].replace("property", "");
      const currentActiveBullet = document.querySelector(
        `#property${propertyIndex} .bullets-container .circulo.ativo`
      );
      const currentActiveImage = document.querySelector(
        `#property${propertyIndex} .images-container .img.fade`
      );
      const nextBulletIndex = parseInt(bullet.id.split("btn")[1]) - 1;
      const nextImage = document.querySelector(
        `#property${propertyIndex} .images-container .img${nextBulletIndex + 1}`
      );

      currentActiveBullet.classList.remove("ativo");
      bullet.classList.add("ativo");
      currentActiveImage.classList.add("hide");
      nextImage.classList.remove("hide");
    });
  });
}

// Exibir todas as propriedades ao carregar a página
displayProperties(properties);

// funão para exibir mais itens de pesquisa
let showMoreBtn = document.querySelector(".show-more-btn");
let showMoreContent = document.querySelector(".show-more-content");

showMoreBtn.addEventListener("click", () => {
  showMoreContent.classList.toggle("hide");
  showMoreBtn.classList.toggle("ativo");
});
