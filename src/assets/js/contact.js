// console.log("Hello Student");
// alert("Good Morning");
// document.write("Batch 47");

// var gelas = "air putih";
// var gelas = "kopi";
// console.log(gelas);

// let pemerintah = "PDIP";
// pemerintah = "NASDEM";
// console.log(pemerintah);

// let nama = "Rizal";
// let umur = 15;
// let isMarried = false;

// console.log("nama saya rizal saya umur 15 tahun");
// console.log("nama saya {nama} saya ${umur} tahun");

// let x = 20;
// let y = 26;

// let result = x + y;

// console.log(result);

// let nilai = 75;

// if (nilai >= 75) {
//   console.log("kamu lulus");
// } else {
//   console.log("tidak lulus");
// }

// function Hello() {
//   let x = 5;
//   let y = 10;

//   let result = x * y;

//   console.log(result);
// }

// Hello();

// function Hello2(x, y) {
//   console.log(x);
//   console.log(y);

//   let result = x * y;
//   console.log(result);
// }

// Hello2(5, 10);

function submitData() {
  let name = document.getElementById("input-name").value;
  let email = document.getElementById("input-email").value;
  let phone = document.getElementById("input-no").value;
  let subject = document.getElementById("subjek").value;
  let message = document.getElementById("message").value;

  let say = [];

  if (name == "") {
    say.push("nama");
  }
  if (email == "") {
    say.push("email");
  }
  if (phone == "") {
    say.push("phone");
  }
  if (subject == "") {
    say.push("subject");
  }
  if (message == "") {
    say.push("message");
  }

  if (say.length > 0) {
    let hay = say.join(", ");
    alert(`Kolom ${hay} semuanya harus diisi ya bang!`);
    return;
  }

  let emailReceiver = "rizsut03@gmail.com";

  let a = document.createElement("a");
  a.href = `mailto:${emailReceiver}?subject=${subject}&body=Halo, nama saya ${name}, ${message}. Silahkan kontak saya di nomor ${phone}, terimakasih`;
  a.click();

  console.log(name);
  console.log(email);
  console.log(phone);
  console.log(subject);
  console.log(message);

  let emailer = {
    name,
    email,
    phone,
    subject,
    message,
  };

  console.log(emailer);
}
