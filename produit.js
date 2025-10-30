document.addEventListener("DOMContentLoaded", () => {
    const boutonsAjouter = document.querySelectorAll(".ajouter-panier");
    const btnPanier = document.getElementById("btnPanier");
  
    function majCompteurPanier() {
      const panier = JSON.parse(localStorage.getItem("panier")) || [];
      let total = 0;
      panier.forEach(item => total += item.quantite);
      if (btnPanier) {
        btnPanier.textContent = `🛒 Panier (${total})`;
      }
    }
  
    boutonsAjouter.forEach(bouton => {
      bouton.addEventListener("click", () => {
        const nom = bouton.getAttribute("data-nom");
        const prix = parseFloat(bouton.getAttribute("data-prix"));
        const inputQuantite = bouton.previousElementSibling;
        const quantite = parseInt(inputQuantite.value);
  
        if (!quantite || quantite <= 0) {
          alert("Veuillez saisir une quantité valide.");
          return;
        }
  
        // 🔽 Trouver l'image du produit
        const produitElement = bouton.closest(".produit"); // .produit = classe du conteneur
        const image = produitElement.querySelector("img").getAttribute("src");
  
        let panier = JSON.parse(localStorage.getItem("panier")) || [];
        const index = panier.findIndex(p => p.nom === nom && p.prix === prix);
        if (index > -1) {
          panier[index].quantite += quantite;
        } else {
          panier.push({ nom, prix, quantite, image }); // 🔽 On ajoute l'image ici
        }
  
        localStorage.setItem("panier", JSON.stringify(panier));
        majCompteurPanier();
      });
    });
  
    majCompteurPanier();
  });
  