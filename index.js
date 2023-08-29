
const express = require('express')
const app = express()
const port = 5000
const path = require('path')

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname ,'src/views'))

app.use(express.static('src/assets'))
app.use(express.static('src/assets/css'))

app.use(express.urlencoded({ extended: false }))

app.get("/", home)
app.get("/contact/", contact)
app.get("/project-detail/:id", projectDetail)
app.get("/project", project)
app.get("/testimonial", testimonial)

app.post("/project", addProject)


app.listen(port, () => {
    console.log(`Jalan Nih Server ${port}`);
})

function home (req, res) {
    res.render('index')
}
function project (req, res) {
    res.render('project')
}

function addProject (req, res) {
    const { tittle, start, end, description, js, boostrap, golang, react, image} = req.body

    const isiData = {
        Tittle: tittle,
        StartDate: start,
        EndDate: end,
        Desc: description,
        JavaScript: js,
        Boostrap: boostrap,
        golang: golang,
        react: react,
        image: image,
    }

    console.log(isiData);

    res.redirect("/")
}

function projectDetail (req, res) {
    const {id} = req.params

    const data = {
        name : "New MV Song's JKT 48",
        tittle : "Ponytail dan Shu-shu (Ponytail to Shushu) (versi 2023) adalah sebuah lagu edisi musim panas yang dibawakan oleh anggota formasi Era Baru maksimal generasi 9 dari grup idola Indonesia JKT48. Lagu ini dirilis secara digital pada 12 Juni 2023 oleh Indonesia Musik Nusantara (atau pihak manajemen JKT48).[1] Lagu ini merupakan lagu adaptasi dari grup saudarinya dari Jepang, AKB48 dengan judul yang sama sebagai singel ke-16 tersebut yang dirilis pada 26 Mei 2010 yang lalu. Lagu ini merupakan proyek yang bertemakan tentang musim panas di tahun 2023 dan kembali melibatkan anggota tetap maksimal generasi 9 dengan jumlah 23 anggota dengan formasi Era Baru (NEW ERA), setelah mereka yang saat itu berjumlah 33 anggota tersebut pernah membawakan lagu Darashinai Aishikata Cara Ceroboh Untuk Mencinta dan terlibat sebagai senbatsu dalam singel ke-22 tersebut yang dirilis pada 16 Maret 2021 yang lalu. Ini juga merupakan lagu JKT48 pertama yang telah didaur ulang dan memiliki video musik. Angelina Christy dan Azizi Asadel dari generasi 7 yang sama-sama mengisi posisi tengah depan ganda dalam lagu ini."
    }

    res.render('project-detail', {data})
    
}
function testimonial (req, res) {
    res.render('testimonial')
}
function contact (req, res) {
    res.render('contact')
}

