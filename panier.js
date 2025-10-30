// panier.js

// Récupérer les données du panier depuis localStorage
const panier = JSON.parse(localStorage.getItem("panier")) || [];

// Sélection du conteneur où afficher les articles
const tableau = document.getElementById("liste-panier");

// Affichage des produits
if (panier.length === 0) {
  tableau.innerHTML = "<td colspan='1'>Aucun article dans le panier.</td>";
} else {
  panier.forEach((produit) => {
    const item = document.createElement("div");

    // Création du contenu HTML pour chaque produit
    item.innerHTML = `
      <img src="${produit.image || ''}" alt="" width="100">
      <h3>${produit.nom}</h3>
      <p>Prix : ${parseFloat(produit.prix).toFixed(2)} DT</p>
      <p>${produit.description || ''}</p>
      <p>Quantité : ${produit.quantite}</p>
      <hr>
    `;

    tableau.appendChild(item);
  });
}

// Vider le panier
const boutonVider = document.querySelector("button"); // Le premier bouton
boutonVider.addEventListener("click", () => {
  if (confirm("Voulez-vous vraiment vider le panier ?")) {
    localStorage.removeItem("panier");
    location.reload();
  }
});

// Confirmer la commande
const boutonConfirmer = document.getElementById("confirmer-commande");
boutonConfirmer.addEventListener("click", () => {
  if (panier.length === 0) {
    alert("Votre panier est vide !");
  } else {
    window.location.href = "facture.html";
  }
});

