//func untuk peringatan alert jika ada kolom yang belum diisi

function emptyFromAlert() {
    let projectName = document.getElementById("input-nama").value;
    let projectStart = document.getElementById("input-start").value;
    let projectEnd = document.getElementById("input-end").value;
    let projectDescription = document.getElementById("input-deskripsi").value;
    let projectImage = document.getElementById("input-image").value;

    let say = [];

    if (projectName == "") {
        say.push("Name Project");
    }
    if (projectStart == "") {
        say.push("Start Project");
    }
    if (projectEnd == "") {
        say.push("End Project");
    }
    if (projectDescription == "") {
        say.push("Description Project");
    }
    if (projectImage == "") {
        say.push("Image Project");
    }

    if (say.length > 0) {
        let hay = say.join(", ");
        alert(`Kolom ${hay} semuanya harus diisi yah bang !`);
        return;
    }

}


// menampung array of object yang sudah di submit

let projectData = [];

//untuk mengambil/menyimpan data dan akan di tampung di projectData

function postProject(event) {
    event.preventDefault();

    let projectName = document.getElementById("input-nama").value;
    let projectStart = document.getElementById("input-start").value;
    let projectEnd = document.getElementById("input-end").value;
    let projectDescription = document.getElementById("input-deskripsi").value;
    let projectImage = document.getElementById("input-image").files;

    const jsIcon = '<img src="assets/images/js.png" alt="js">';
    const bootstrapIcon = '<img src="assets/images/bootstrap.png" alt="bootstrap">';
    const goIcon = '<img src="assets/images/go.jpg" alt="go">';
    const reactIcon = '<img src="assets/images/react.png" alt="react">';

    let jsCheckIcon = document.getElementById("input-js").checked ? jsIcon : "";
    let bootstrapCheckIcon = document.getElementById("input-bootstrap").checked ? bootstrapIcon : "";
    let goCheckIcon = document.getElementById("input-golang").checked ? goIcon : "";
    let reactcheckIcon = document.getElementById("input-react").checked ? reactIcon : "";

    projectImage = URL.createObjectURL(projectImage[0]);
    console.log(projectImage);

    let startDate = new Date(projectStart);
    let endDate = new Date(projectEnd);

    let differenceInDate = (startDate - endDate) / 1000;
    let year = Math.abs(Math.round(differenceInDate / (60 * 60 * 24) / 365.25));
    let month = Math.abs(Math.round(differenceInDate / (60 * 60 * 24 * 7 * 4)));
    let week = Math.abs(Math.round(differenceInDate / (60 * 60 * 24 * 7)));
    let days = Math.abs(Math.round(differenceInDate / (3600 * 24)));
    let differenceInDay

    if (days <= 7) {
        differenceInDay = days + " days";
    } 
    if (days >= 8) {
        differenceInDay = week + " week";
    }  
    if (week >= 4) {
        differenceInDay = month + " month";
    } 
    if (month >= 12) {
        differenceInDay = year + " year";
    }

    console.log((differenceInDay));



    let projectPreviewData = {
        projectName,
        differenceInDay,
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
        html += ` <div class="col-lg col-md-4 col-sm- 6mb-3">
        <div class="card mt-3 shadow p-2 bg-body-tertiary rounded">
          <img
            class="img-fluid w-100 object-fit-cover border rounded"
            style="height: 200px"
            src="${projectData[index].projectImage}"
            alt="bmth"
          />
          <h4 class="mt-2">
            <a
              class="text-decoration-none text-black"
              href="project-detail.html"
              >${projectData[index].projectName}</a
            >
          </h4>
          <p class="mt-1">durasi : ${projectData[index].differenceInDay} - Rizal Herlangga</p>
          <p>
             ${projectData[index].projectDescription}
          </p>
          <div class="fs-3">
             ${projectData[index].jsCheckIcon}
             ${projectData[index].bootstrapCheckIcon}
             ${projectData[index].goCheckIcon}
             ${projectData[index].reactcheckIcon}
          </div>
          <div class="mt-3">
            <button type="button" class="btn btn-dark" style="width: 49%">
              edit
            </button>
            <button type="button" class="btn btn-dark" style="width: 49%">
              delete
            </button>
          </div>
        </div>
      </div>`;
      }
    

    document.getElementById("kartu-t").innerHTML = html;
}


