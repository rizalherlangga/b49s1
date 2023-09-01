const promise = new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.npoint.io/5fd0aa5a2bd74641213c", true);

  xhr.onload = () => {
    if (xhr.status === 200) {
      resolve(JSON.parse(xhr.response));
    } else {
      reject("EROR LOADING DATA !");
    }
  };
  xhr.onerror = () => {
    reject("NETWORK EROR!");
  };
  xhr.send();

  console.log(xhr);
});

console.log(promise);

async function getAllTestimonials() {
  const response = await promise;
  //   console.log(response);

  let testimonialHTML = "";
  response.forEach(function (item) {
    testimonialHTML += `<div class="testimonial">
                                  <img
                                      src="${item.image}"
                                      class="profile-testimonial"
                                  />
                                  <p class="quote">${item.quote}</p>
                                  <p class="author">- ${item.user}</p>
                                  <p class="author">${item.rating} <i class="fa-solid fa-star"></i></p>
                              </div>
                          `;
  });

  document.getElementById("getAllTestimonials").innerHTML = testimonialHTML;
}

getAllTestimonials();

async function getFilteredTestimonials(rating) {
  const response = await promise;

  const testimonialFiltered = response.filter((item) => {
    return item.rating === rating;
  });

  //   console.log(testimonialFiltered);

  let testimonialHTML = "";

  if (testimonialFiltered.length === 0) {
    testimonialHTML = "<h1>Data not found!</h1>";
  } else {
    testimonialFiltered.forEach((item) => {
      testimonialHTML += `<div class="testimonial">
                                  <img
                                      src="${item.image}"
                                      class="profile-testimonial"
                                  />
                                  <p class="quote">${item.quote}</p>
                                  <p class="author">- ${item.user}</p>
                                  <p class="author">${item.rating} <i class="fa-solid fa-star"></i></p>
                              </div>
                          `;
    });
  }

  document.getElementById("getAllTestimonials").innerHTML = testimonialHTML;
}
