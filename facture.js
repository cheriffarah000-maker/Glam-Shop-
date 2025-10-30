
document.addEventListener("DOMContentLoaded", () => {
    const formulaireCommande = document.getElementById("formulaire-commande");
    const factureSection = document.getElementById("facture");
    const infosFacture = document.getElementById("infos-facture");
    const totalFacture = document.getElementById("total-facture");

    // Récupérer les articles du panier depuis localStorage
    const panier = JSON.parse(localStorage.getItem("panier")) || [];

    // Calcul du total
    let total = 0;
    panier.forEach(item => {
        total += item.prix * item.quantite;
    });

    // Affichage de la facture après soumission du formulaire
    formulaireCommande.addEventListener("submit", (event) => {
        event.preventDefault(); // Empêcher l'envoi du formulaire

        // Récupération des informations du formulaire
        const nom = document.getElementById("nom").value;
        const prenom = document.getElementById("prenom").value;
        const email = document.getElementById("email").value;
        const telephone = document.getElementById("telephone").value;
        const adresse = document.getElementById("adresse").value;
        const ville = document.getElementById("ville").value;

        // Affichage des informations de la facture
        infosFacture.innerHTML = `
  <div style="margin-bottom: 20px; line-height: 1.6;">
    <p style="font-size: 18px;"><strong>👤 Nom :</strong> ${nom} ${prenom}</p>
    <p style="font-size: 18px;"><strong>📧 Email :</strong> ${email}</p>
    <p style="font-size: 18px;"><strong>📞 Téléphone :</strong> ${telephone}</p>
    <p style="font-size: 18px;"><strong>🏠 Adresse :</strong> ${adresse}, ${ville}</p>
  </div>

  <strong><h4 style="margin-top: 20px; margin-left:10px; color: #c94691; font-size:20px;">🛍️ Articles commandés :</h4></strong>
  <table style="width: 60%; border-collapse: collapse; margin: auto;">
    <thead>
      <tr style="background-color: #DCAFBF;">
        <th style=" border: 1px solid #666;">Nom</th>
        <th style="border: 1px solid #666;">Quantité</th>
        <th style="border: 1px solid #666;">Prix unitaire (DT)</th>
        <th style="border: 1px solid #666;">Total</th>
      </tr>
    </thead>
    <tbody>
      ${panier.map(item => `
        <tr>
          <td style="padding: 8px;  border: 1px solid #666;">${item.nom}</td>
          <td style="padding: 8px; border: 1px solid #666;">${item.quantite}</td>
          <td style="padding: 8px; border: 1px solid #666;">${item.prix.toFixed(2)}</td>
          <td style="padding: 8px; border: 1px solid #666;">${(item.quantite * item.prix).toFixed(2)}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
`;
let remise = 0;
if (total > 150) {
  remise = total * 0.10; // 10%
}

let totalApresRemise = total - remise;

totalFacture.innerHTML = `
  <p style="margin-top: 20px; text-align: left; font-size: 18px;">
    <strong>Sous-total : ${total.toFixed(2)} DT</strong><br>
    ${remise > 0 ? `<span style="color: green;"><strong>Remise(totale>150DT) :</strong> -${remise.toFixed(2)} DT</span><br>` : ''}
    <strong>Total à payer : ${totalApresRemise.toFixed(2)} DT</strong><br>
    <em>(${enLettres(totalApresRemise)})</em>
  </p>
`;




        // Afficher la section de la facture
        factureSection.style.display = "block";
    });
// Annuler => retour au panier
document.getElementById("annuler").addEventListener("click", function() {
    window.location.href = "panier.html";});
});


function enLettres(nombre) {
    const unités = ["", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"];
    const dizaines = ["", "", "vingt", "trente", "quarante", "cinquante", "soixante"];
    const spéciaux = ["dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"];
  
    function convertNb(n) {
      if (n === 0) return "zéro";
      if (n < 10) return unités[n];
      if (n < 20) return spéciaux[n - 10];
      if (n < 70) {
        const u = n % 10;
        const d = Math.floor(n / 10);
        return dizaines[d] + (u ? "-" + unités[u] : "");
      }
      if (n < 80) return "soixante-" + convertNb(n - 60);
      if (n < 100) return "quatre-vingt" + (n === 80 ? "" : "-" + unités[n - 80]);
      if (n < 1000) {
        const c = Math.floor(n / 100);
        const reste = n % 100;
        return (c > 1 ? unités[c] + " cent" : "cent") + (reste ? " " + convertNb(reste) : "");
      }
      if (n < 10000) {
        const m = Math.floor(n / 1000);
        const reste = n % 1000;
        return (m > 1 ? unités[m] + " mille" : "mille") + (reste ? " " + convertNb(reste) : "");
      }
      return n.toString();
    }
  
    const dinars = Math.floor(nombre);
    const millimes = Math.round((nombre - dinars) * 100);
  
    let texte = `${convertNb(dinars)} dinar${dinars > 1 ? "s" : ""}`;
    if (millimes > 0) {
      texte += ` et ${convertNb(millimes)} millime${millimes > 1 ? "s" : ""}`;
    }
  
    return texte;
  }
  