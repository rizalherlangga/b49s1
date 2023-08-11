//func untuk peringatan alert jika ada kolom yang belum diisi

function emptyFromAlert() {
    let projectName = document.getElementById("project").value;
    let projectStart = document.getElementById("start-date").value;
    let projectEnd = document.getElementById("end-date").value;
    let projectDescription = document.getElementById("desc").value;
    let projectImage = document.getElementById("img").value;

    let say = [];

    if (projectName == "") {
        say.push("projectName");
    }
    if (projectStart == "") {
        say.push("projectStart");
    }
    if (projectEnd == "") {
        say.push("projectEnd");
    }
    if (projectDescription == "") {
        say.push("projectDescription");
    }
    if (projectImage == "") {
        say.push("projectImage");
    }

    if (say.length == 1) {
        let hay = say.join(", ");
        alert(`Kolom ${hay}  harus diisi ya bang!`);
        return;
    }else if (say.length > 0){
        let bye = say.join(", ")
        alert(`Kolom ${bye} semuanya harus diisi ya bang!`);
        return;   
    }  

}


// menampung array of object yang sudah di submit

let projectData = [];

//untuk mengambil/menyimpan data dan akan di tampung di projectData

function postProject() {
    
    // emptyFromAlert();
    

    let projectName = document.getElementById("project").value;
    let projectDescription = document.getElementById("desc").value;
    let projectImage = document.getElementById("img").files;
    
    if (!projectName || !projectDescription || !projectImage.length) {
        emptyFromAlert();
        return; // Menghentikan eksekusi fungsi jika data kosong
    }
    
    const jsIcon = '<i class="fa-brands fa-square-js fa-xl fa-fw"></i>';
    const bootstrapIcon = '<i class="fa-brands fa-bootstrap fa-xl fa-fw"></i>';
    const goIcon = '<i class="fa-brands fa-golang fa-xl fa-fw"></i>';
    const reactIcon = '<i class="fa-brands fa-react fa-xl fa-fw"></i>';


    let jsCheckIcon = document.getElementById("js").checked ? jsIcon : "";
    let bootstrapCheckIcon = document.getElementById("bootstrap").checked ? bootstrapIcon : "";
    let goCheckIcon = document.getElementById("go").checked ? goIcon : "";
    let reactcheckIcon = document.getElementById("react").checked ? reactIcon : "";

    projectImage = URL.createObjectURL(projectImage[0]);
    console.log(projectImage);

    let projectPreviewData = {
        projectName,
        projectDescription,
        jsCheckIcon,
        bootstrapCheckIcon,
        goCheckIcon,
        reactcheckIcon,
        projectImage,
    };

    projectData.push(projectPreviewData);
    console.log(projectData);

    renderProject();
}

function renderProject() {
    let html = "";

    for (let index = 0; index < projectData.length; index++) {
        html += `
          <div class="project-card">
          <img src="${projectData[index].projectImage}" alt="1"/>
          <a href="project-detail.html" style="color: black ; text-decoration: none">
              <h4>${projectData[index].projectName}</h4>
          </a>
          <p > 3 Bulan - Rizal Herlangga</p>
          <p class="deskripsi">${projectData[index].projectDescription}</p>
          <div class="gambar">
              ${projectData[index].jsCheckIcon}
              ${projectData[index].bootstrapCheckIcon}
              ${projectData[index].goCheckIcon}
              ${projectData[index].reactcheckIcon}
          </div>
          <div class="ini-data">
              <button class="edit-button">Edit</button>
              <button class="delete-button">Delete</button>
          </div>
          </div>`;
      }
    

    document.getElementById("kartu-t").innerHTML = html;
}


