const testimonialData = [
    {
        user: "Teh Ancika",
        quote: "Si keren",
        image: "https://assets.ayobandung.com/crop/0x0:0x0/750x500/webp/photo/2022/02/21/1841722559.jpg",
        rating: 5
    },
    {
        user: "Macha",
        quote: "LOH LOH LOH LOH LOH !",
        image: "https://assets.ayobandung.com/crop/0x0:0x0/750x500/webp/photo/2022/01/07/3019702339.jpg",
        rating: 5
    },
    {
        user: "Shanks",
        quote: "Buntung dibales dengan buntung",
        image: "https://mmc.tirto.id/image/otf/700x0/2022/12/02/one-piece-_ratio-16x9.jpg",
        rating: 2
    },
    {
        user: "Frayaaaa",
        quote: "Gadis Karoliss, yang mempunyai senyuman manis",
        image: "https://api.duniagames.co.id/api/content/upload/file/6013685931683276029.jpg",
        rating: 4
    },
    {
        user: "Marsha",
        quote: "Aku adalah marsha",
        image: "https://thumb.viva.id/intipseleb/1265x711/2023/02/06/63e0758a10dd2-marsha-jkt48.jpg",
        rating: 3
    },
    {
        user: "Matcha",
        quote: "Gadis penyuka matcha",
        image: "https://thumb.viva.id/intipseleb/665x374/2023/02/06/63e074d2c2f7b-marsha-jkt48.jpg",
        rating: 4
    },
]

function allTestimonial() {
    let testimonialHTML = ""

    testimonialData.forEach((card,index) => {
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
        })
      }

    document.getElementById("testimonial").innerHTML = filterDataHTML
}