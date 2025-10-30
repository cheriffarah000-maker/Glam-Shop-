function verif(){
    const nom = document.getElementById("nom").value;
    const pre = document.getElementById("pre").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("messageText").value;
    if(nom=="" || !alpha(nom)){
        alert("nom invalide!!")
        return false;
    }
    if(pre=="" || !alpha(pre)){
        alert("prenom invalide!!")
        return false;
    }
    if(email==""){
        alert("email invalide!!")
        return false;
    }
    if(message==""){
        alert("ecrire message !!")
        return false;
    }
    else {
    alert("Merci pour votre message, " + nom + pre + " ! Nous vous répondrons bientôt.");
    document.getElementById("contactForm").reset();
    return false;
    }
}
function veriffacture(){
    const nom = document.getElementById("nom").value;
    const pre = document.getElementById("prenom").value;
    const email = document.getElementById("email").value;
    const tel = document.getElementById("telephone").value;
    const add = document.getElementById("adresse").value;
    const ville = document.getElementById("ville").value;
    if(nom=="" || !alpha(nom)){
        alert("nom invalide!!")
        return false;
    }
    if(pre=="" || !alpha(pre)){
        alert("prenom invalide!!")
        return false;
    }
    if(email==""){
        alert("email invalide!!")
        return false;
    }
    if(tel.length != 8){
        alert("Numero telephone invalide !!")
        return false;
    }
    if(add==""){
        alert("addresse invalide!!")
        return false;
    }
    if(ville=="" || !alpha(ville)){
        alert("ville invalide!!")
        return false;
    }
    else {
    alert("Merci pour votre confirmation, " + nom +" "+ pre + " voici votre facture");
    return false;
    }
}


function alpha(ch){
    ch=ch.toUpperCase();
    const car="AZERTYUIOPQSDFGHJKLMWXCVBN ";
    for (let i=0;i<ch.length;i++){
        if(car.indexOf(ch[i])!=-1){
            return true;
        }
        return false;
}
}
  