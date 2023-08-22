function contactFrom() {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let no = document.getElementById("no").value;
    let subject = document.getElementById("sub").value;
    let message = document.getElementById("message").value;

    let data = {
        name,
        email,
        no,
        subject,
        message,
    } 

    let notif = [];

    if (name == ""){
        notif.push("Nama")
    } if (email == ""){
        notif.push("email ")
    } if (no == ""){
        notif.push("no")
    } if (subject == "select"){
        notif.push("subject")
    } if (message == ""){
        notif.push("message")
    }

    if (notif.length == 1) {
        let hay = notif.join(", ");
        alert(`Kolom ${hay}  harus diisi ya bang!`);
        return;
    }else if (notif.length > 0){
        let bye = notif.join(", ")
        alert(`Kolom ${bye} semuanya harus diisi ya bang!`);
        return;   
    }  

    console.log(data);
    // console.log(notif);
    // console.log(name);

    let emailRecaiver = document.getElementById("email").value;
    let a = document.createElement("a");
    a.href = `mailto:${emailRecaiver}?subject=${subject}&body=Halo nama saya ${name}, ${message}, silahkan kontak saya di nomer berikut: ${no}`;
    a.click();
    
}