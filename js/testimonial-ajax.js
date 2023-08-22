const proms = new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    var url = "https://api.npoint.io/5fd0aa5a2bd74641213c";

    xhr.onload = function() {
        if(xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText))
        }else if(xhr.status === 400) {
            reject("Loading Data !")
        }
    }

    xhr.open("GET", url, true);

    xhr.onerror = function () {
        reject("Network error")
    }

    xhr.send()
})

let testimonialData = []

async function getData() {
    try {
        const response = await proms
        console.log(response)
        testimonialData = response
        allTestimonial()
    } catch (err) {
        console.log(err)
    }
}

getData()

function allTestimonial() {
    let testimonialHTML = ""

    testimonialData.forEach((card) => {
        testimonialHTML += `<div class="testimonial">
           <img src="${card.image}" class="profile-testimonial" />
           <p class="quote">"${card.quote}"</p>
           <div class= "oke">
             <p class="author">${card.user} - </p>
             <p class="author">${card.rating} <i class="fa-solid fa-star"></i></p>
           </div>
           </div>`
    })

    document.getElementById("testimonial").innerHTML = testimonialHTML
}

allTestimonial()

function filterData(rating) {
    let filterDataHTML = ""

    const filterTestimonial = testimonialData.filter((card) => {
        return card.rating === rating
    })

    if (filterTestimonial.length === 0) {
        filterDataHTML += `
                            <div class= "kartu" style= "width: fit-content; justify-content: center; padding-top: 20px;">
                            <h1 style= " font-family: 'Poppins', sans-serif;">DATA KOSONG GAN !</h1>
                            </div>
                          `
      } else {
                filterTestimonial.forEach((card) => {
                filterDataHTML += `<div class="testimonial">
                                     <img src="${card.image}" class="profile-testimonial" />
                                     <p class="quote">"${card.quote}"</p>
                                     <div class= "oke">
                                       <p class="author">${card.user} - </p>
                                       <p class="author">${card.rating} <i class="fa-solid fa-star"></i></p>
                                     </div>
                                    </div>`
       }) }
    
    

    document.getElementById("testimonial").innerHTML = filterDataHTML
}
