// class✅
// object ✅
// inheritance ✅
// polymorphism ✅
// abstraction ✅
// encapsulation ✅

class Testimonial {
    #quote = ""
    #image = ""

    constructor(quote, image) {
        this.#quote = quote
        this.#image = image
    }

    get quote() {
        return this.#quote
    }

    get image() {
        return this.#image
    }

    get user() {
        throw new Error('there is must be user to make testimonials')
    }

    get testimonialHTML() {
        return `<div class="testimonial">
            <img src="${this.image}" class="profile-testimonial" />
            <p class="quote">"${this.quote}"</p>
            <p class="author">- ${this.user}</p>
        </div>
        `
    }
}

class UserTestimonial extends Testimonial {
    #user = ""

    constructor(user, quote, image) {
        super(quote, image)
        this.#user = user
    }

    get user() {
        return "user : " + this.#user
    }
}

class CompanyTestimonial extends Testimonial {
    #company = ""

    constructor(company, quote, image) {
        super(quote, image)
        this.#company = company
    }

    get user() {
        return "company : " + this.#company
    }
}

const testimonial1 = new UserTestimonial("Teh Ancika", "Si Keren", "https://assets.ayobandung.com/crop/0x0:0x0/750x500/webp/photo/2022/02/21/1841722559.jpg")

const testimonial2 = new UserTestimonial("Shanks", "aku adalah aku, bukan antum.", "https://mmc.tirto.id/image/otf/700x0/2022/12/02/one-piece-_ratio-16x9.jpg")

const testimonial3 = new CompanyTestimonial("Marsha", "Apasih ga jelas", "https://assets.ayobandung.com/crop/0x0:0x0/750x500/webp/photo/2022/01/07/3019702339.jpg")

let testimonialData = [testimonial1, testimonial2, testimonial3]

let testimonialHTML = ""

for (let i = 0; i < testimonialData.length; i++) {
    testimonialHTML += testimonialData[i].testimonialHTML
}



document.getElementById("testimonial").innerHTML = testimonialHTML