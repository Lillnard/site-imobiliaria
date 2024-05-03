// script.js
const properties = [
  {
    type: "apartamento",
    imageCount: 3, // Número de imagens para cada imóvel
    priceForSale: 300000,
    priceForRent: 1500,
    description: "Linda casa de 3 quartos com jardim espaçoso.",
    availability: "ambos",
  },
  {
    type: "casa",
    imageCount: 2,
    priceForSale: 200000,
    priceForRent: 1000,
    description: "Apartamento moderno com vista para o mar.",
    availability: "venda",
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
  const searchInput = document.getElementById("searchInput").value;
  const searchType = document.querySelector(
    'input[name="searchType"]:checked'
  ).value;
  const priceRange = document.getElementById("priceRange").value;

  let filteredProperties = properties;

  if (searchInput) {
    filteredProperties = filteredProperties.filter(
      (property) => property.code === searchInput
    );
  }

  if (searchType === "buy") {
    filteredProperties = filteredProperties.filter(
      (property) =>
        property.availability === "venda" || property.availability === "ambos"
    );
  } else if (searchType === "rent") {
    filteredProperties = filteredProperties.filter(
      (property) =>
        property.availability === "locacao" || property.availability === "ambos"
    );
  }

  filteredProperties = filteredProperties.filter(
    (property) =>
      property.priceForSale <= priceRange || property.priceForRent <= priceRange
  );

  displayProperties(filteredProperties);
}

function displayProperties(properties) {
  const propertiesContainer = document.getElementById("properties");
  propertiesContainer.innerHTML = "";

  properties.forEach((property, index) => {
    const propertyDiv = document.createElement("div");
    propertyDiv.classList.add("property");

    const h2 = document.createElement("h2");
    const code = generatePropertyCode(property.type, index);
    h2.textContent = `Código: ${code} - ${property.type.toUpperCase()}`;

    const pDescription = document.createElement("p");
    pDescription.textContent = `Descrição: ${property.description}`;

    propertyDiv.appendChild(h2);
    propertyDiv.appendChild(pDescription);

    // Se disponível para venda
    if (
      property.availability === "venda" ||
      property.availability === "ambos"
    ) {
      const pPriceForSale = document.createElement("p");
      pPriceForSale.textContent = `Preço para venda: R$ ${property.priceForSale}`;
      propertyDiv.appendChild(pPriceForSale);
    }

    // Se disponível para locação
    if (
      property.availability === "locacao" ||
      property.availability === "ambos"
    ) {
      const pPriceForRent = document.createElement("p");
      pPriceForRent.textContent = `Preço para locação: R$ ${property.priceForRent}`;
      propertyDiv.appendChild(pPriceForRent);
    }

    // Adicionar imagens
    const imagesDiv = document.createElement("div");
    for (let i = 0; i < property.imageCount; i++) {
      const img = document.createElement("img");
      const imgSrc = getPropertyImageSrc(property.type, code, i);
      img.src = imgSrc;
      imagesDiv.appendChild(img);
    }
    propertyDiv.appendChild(imagesDiv);

    propertiesContainer.appendChild(propertyDiv);
  });
}

// Exibir todas as propriedades ao carregar a página
displayProperties(properties);

// Atualizar valor exibido conforme alteração do input range
document.getElementById("priceRange").addEventListener("input", function () {
  document.getElementById("priceValue").textContent = `R$ ${this.value}`;
});
