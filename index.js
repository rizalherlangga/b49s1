
const express = require('express')
const app = express()
const port = 5000
const path = require('path')
const bodyParser = require('body-parser');

//sequelize init
const config = require('./src/config/config.json')
const { Sequelize, QueryTypes} = require('sequelize')
const sequelize = new Sequelize(config.development)


app.set('view engine', 'hbs')
app.set('views', path.join(__dirname ,'src/views'))


app.use(express.static('src/assets'))
app.use(express.static('src/assets/css'))

app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get("/", home)
app.get("/contact/", contact)
app.get("/project-detail/:id", projectDetail)
app.get("/project", project)
app.get("/testimonial", testimonial)
app.get("/edit-project/:id", displayEditForm);
app.get("/delete-project/:id", deleteProject)

app.post("/edit-project/:id", handleUpdate);
app.post("/project", addProject)


app.listen(port, () => {
    console.log(`Jalan Nih Server ${port}`);
})

// const dataDefault = [
//  {
//     tittle: "New Song's JKT 48",
//     startdate: "04-10-2023",
//     enddate: "04-11-2023",
//     differenceInDay: "1 Month",
//     description: "Ponytail dan Shu-shu (Ponytail to Shushu) (versi 2023) adalah sebuah lagu edisi musim panas yang dibawakan oleh anggota formasi Era Baru maksimal generasi 9 dari grup idola Indonesia JKT48. Lagu ini dirilis secara digital pada 12 Juni 2023 oleh Indonesia Musik Nusantara (atau pihak manajemen JKT48).[1] Lagu ini merupakan lagu adaptasi dari grup saudarinya dari Jepang, AKB48 dengan judul yang sama sebagai singel ke-16 tersebut yang dirilis pada 26 Mei 2010 yang lalu. Lagu ini merupakan proyek yang bertemakan tentang musim panas di tahun 2023 dan kembali melibatkan anggota tetap maksimal generasi 9 dengan jumlah 23 anggota dengan formasi Era Baru (NEW ERA), setelah mereka yang saat itu berjumlah 33 anggota tersebut pernah membawakan lagu Darashinai Aishikata Cara Ceroboh Untuk Mencinta dan terlibat sebagai senbatsu dalam singel ke-22 tersebut yang dirilis pada 16 Maret 2021 yang lalu. Ini juga merupakan lagu JKT48 pertama yang telah didaur ulang dan memiliki video musik. Angelina Christy dan Azizi Asadel dari generasi 7 yang sama-sama mengisi posisi tengah depan ganda dalam lagu ini.",
//     tech: {
//         js:true,
//         boostrap: false,
//         go: true,
//         react: true,
//     }
//  },
//  {
//     tittle: "New Song's At JKT 48",
//     startdate: "04-10-2023",
//     enddate: "04-11-2023",
//     differenceInDay: "1 Month",
//     description: "Ponytail dan Shu-shu (Ponytail to Shushu) (versi 2023) adalah sebuah lagu edisi musim panas yang dibawakan oleh anggota formasi Era Baru maksimal generasi 9 dari grup idola Indonesia JKT48. Lagu ini dirilis secara digital pada 12 Juni 2023 oleh Indonesia Musik Nusantara (atau pihak manajemen JKT48).[1] Lagu ini merupakan lagu adaptasi dari grup saudarinya dari Jepang, AKB48 dengan judul yang sama sebagai singel ke-16 tersebut yang dirilis pada 26 Mei 2010 yang lalu. Lagu ini merupakan proyek yang bertemakan tentang musim panas di tahun 2023 dan kembali melibatkan anggota tetap maksimal generasi 9 dengan jumlah 23 anggota dengan formasi Era Baru (NEW ERA), setelah mereka yang saat itu berjumlah 33 anggota tersebut pernah membawakan lagu Darashinai Aishikata Cara Ceroboh Untuk Mencinta dan terlibat sebagai senbatsu dalam singel ke-22 tersebut yang dirilis pada 16 Maret 2021 yang lalu. Ini juga merupakan lagu JKT48 pertama yang telah didaur ulang dan memiliki video musik. Angelina Christy dan Azizi Asadel dari generasi 7 yang sama-sama mengisi posisi tengah depan ganda dalam lagu ini.",
//     tech: {
//         js:true,
//         boostrap: false,
//         go: true,
//         react: true,
//     }
//  }
 
// ]

async function home (req, res) {
    try {
        const query = `SELECT id, name, start, "end", description, technologies, image, 
        "createdAt", "updatedAt" FROM "Projets";`
        let obj = await sequelize.query(query, {type: QueryTypes.SELECT})
        const data = obj.map(res => ({
            ...res,
            differenceInDay : duration(res.start, res.end),
            technologies: {
                js: res.technologies.includes('js'),
                boostrap: res.technologies.includes('boostrap'),
                golang: res.technologies.includes('go'),
                react: res.technologies.includes('react'),
              }
        }))
        res.render('index', {dataDefault: data})
    } catch (error) {

    }
}
function project (req, res) {
    res.render('project')
}

function duration (start, end) {
    let startDate = new Date(start);
    let endDate = new Date(end);

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

    return differenceInDay
}

async function addProject (req, res) {
try {
        var {tittle, start, end, description, image} = req.body
        const differenceInDay =  duration(start, end) 
        const technologies = {
            js: req.body.js !== undefined,
            boostrap: req.body.boostrap !== undefined,
            go: req.body.golang !== undefined,
            react: req.body.react !== undefined,
        }
    
        const isiData = {
            tittle,
            start,
            end,
            differenceInDay,
            description,
            selectedTechnologies:  Object.keys(technologies).filter(key => technologies[key]),
            image
        }
        
        console.log(isiData);
        await sequelize.query(`
        INSERT INTO "Projets"(
            name, start, "end", description, technologies, image, "createdAt", "updatedAt"
        ) VALUES (
            '${isiData.tittle}', '${isiData.start}', '${isiData.end}', '${isiData.description}',
            ARRAY[${isiData.selectedTechnologies.map(tech => `'${tech}'`).join(', ')}]::VARCHAR[],
            '${isiData.image}', NOW(), NOW()
        );
    `);
    
        
        res.redirect("/")
    }catch (error) {
        console.log(error);
    }
}

async function displayEditForm(req, res) {
    try {
        const projectId = req.params.id;
        const projectQuery = `SELECT id, name, start, "end", description, technologies, image FROM "Projets" WHERE id = ${projectId};`;
        const [project] = await sequelize.query(projectQuery, { type: QueryTypes.SELECT });

        if (!project) {
            // Handle jika proyek tidak ditemukan
            return res.redirect('/');
        }

        // Render halaman edit dengan data proyek
        res.render('edit-project', { dataDefault: project });
    } catch (error) {
        // Tangani error
    }
}

async function handleUpdate(req, res) {
    try {
        const projectId = req.params.id;
        const { title, start, end, description, image } = req.body;
        const differenceInDay = duration(start, end);
        const technologies = {
            js: req.body.js !== undefined,
            boostrap: req.body.boostrap !== undefined,
            go: req.body.golang !== undefined,
            react: req.body.react !== undefined,
        }

        const isiData = {
            title,
            start,
            end,
            differenceInDay,
            description,
            selectedTechnologies: Object.keys(technologies).filter(key => technologies[key]),
            image
        }

        const updateQuery = `
            UPDATE "Projets" SET
            name = '${isiData.title}',
            start = '${isiData.start}',
            "end" = '${isiData.end}',
            description = '${isiData.description}',
            technologies = ARRAY[${isiData.selectedTechnologies.map(tech => `'${tech}'`).join(', ')}]::VARCHAR[]
            WHERE id = ${projectId};
        `;

        await sequelize.query(updateQuery);

        res.redirect("/"); // Redirect ke halaman utama setelah pembaruan berhasil
    } catch (error) {
        // Tangani error
    }
}
// async function editProject(req, res) {
//     try {
//         const projectId = req.params.id;
//         const { title, start, end, description, image } = req.body; // Ubah penamaan tittle menjadi title
//         const differenceInDay = duration(start, end);
//         const technologies = {
//             js: req.body.js !== undefined,
//             bootstrap: req.body.bootstrap !== undefined, // Ubah boostrap menjadi bootstrap
//             golang: req.body.golang !== undefined,
//             react: req.body.react !== undefined,
//         }

//         const isiData = {
//             title, // Ubah penamaan tittle menjadi title
//             start,
//             end,
//             differenceInDay,
//             description,
//             selectedTechnologies: Object.keys(technologies).filter(key => technologies[key]),
//             image
//         }

//         const projectQuery = `SELECT id, name, start, "end", description, technologies, image FROM "Projets" WHERE id = ${projectId};`;
//         const [project] = await sequelize.query(projectQuery, { type: QueryTypes.SELECT });

//         if (!project) {
//             // Handle jika proyek tidak ditemukan
//             return res.redirect('/');
//         }

//         // Render halaman edit dengan data proyek
//         res.render('edit-project', { dataDefault: project });
//     } catch (error) {
//         // Tangani error
//     }
// }

// async function updateProject(req, res) {
//     try {
//         const projectId = req.params.id;
//         const { title, start, end, description, image } = req.body;
//         const differenceInDay = duration(start, end);
//         const technologies = {
//             js: req.body.js !== undefined,
//             bootstrap: req.body.bootstrap !== undefined,
//             golang: req.body.golang !== undefined,
//             react: req.body.react !== undefined,
//         }

//         const isiData = {
//             title,
//             start,
//             end,
//             differenceInDay,
//             description,
//             selectedTechnologies: Object.keys(technologies).filter(key => technologies[key]),
//             image
//         }

//         const updateQuery = `
//             UPDATE "Projets" SET
//             name = '${isiData.title}',
//             start = '${isiData.start}',
//             "end" = '${isiData.end}',
//             description = '${isiData.description}',
//             technologies = ARRAY[${isiData.selectedTechnologies.map(tech => `'${tech}'`).join(', ')}]::VARCHAR[]
//             WHERE id = ${projectId};
//         `;

//         await sequelize.query(updateQuery);

//         res.redirect("/"); // Redirect ke halaman utama setelah pembaruan berhasil
//     } catch (error) {
//         // Tangani error
//     }
// }


// async function editProject (req, res) {
 
//     try {
//         var {tittle, start, end, description, image} = req.body
//         const differenceInDay =  duration(start, end) 
//         const technologies = {
//             js: req.body.js !== undefined,
//             boostrap: req.body.boostrap !== undefined,
//             go: req.body.golang !== undefined,
//             react: req.body.react !== undefined,
//         }
    
//         const isiData = {
//             tittle,
//             start,
//             end,
//             differenceInDay,
//             description,
//             selectedTechnologies:  Object.keys(technologies).filter(key => technologies[key]),
//             image
//         }

//         await sequelize.query(`UPDATE "Projets" SET
//                                     name = '${isiData.title}',
//                                     start = '${isiData.start}',
//                                     "end" = '${isiData.end}',
//                                     description = '${isiData.description}',
//                                     technologies = ARRAY[${isiData.selectedTechnologies.map(tech => `'${tech}'`).join(', ')}]::VARCHAR[]
//                                     WHERE id = ${id};
//                               `);

//         res.redirect("/"); // Redirect ke halaman utama setelah pembaruan berhasil
//     } catch (error) {
//         // Tangani error
//     }
// }

// async function updateProject (req, res) {
//     try {
//         const projectId = req.params.id;
//         const query = `SELECT id, name, start, "end", description, technologies, image FROM "Projets" WHERE id = ${projectId};`;
//         const obj = await sequelize.query(query, { type: QueryTypes.SELECT });
//         const data = obj.map(res => ({
//             ...res,
//             differenceInDay : duration(res.start, res.end),
//             technologies: {
//                 js: res.technologies.includes('js'),
//                 boostrap: res.technologies.includes('boostrap'),
//                 golang: res.technologies.includes('go'),
//                 react: res.technologies.includes('react'),
//               }
//         }))

//         if (!project) {
//             // Handle jika proyek tidak ditemukan
//             return res.redirect('/');
//         }

//         res.render('edit-project', { dataDefault: data[0] });
//     } catch (error) {
//         // Tangani error
//     }
// }

async function deleteProject (req, res) {
    try {
        const {id} = req.params
      
        await sequelize.query(`
          DELETE FROM "Projets" WHERE id = ${id}
        `)
        
        res.redirect('/')
      } catch (error) {
        console.log(error)
      }
}

async function projectDetail (req, res) {
    try {
        const {id} = req.params

        const query = `SELECT * FROM "Projets" WHERE id=${id};`
        let obj = await sequelize.query(query, {type: QueryTypes.SELECT})
        const data = obj.map(res => ({
            ...res,
            differenceInDay : duration(res.start, res.end),
            technologies: {
                js: res.technologies.includes('js'),
                boostrap: res.technologies.includes('boostrap'),
                golang: res.technologies.includes('go'),
                react: res.technologies.includes('react'),
            }
        }))
        res.render('project-detail', {dataDefault:data[0]})
    } catch (error) {

    }

}
function testimonial (req, res) {
    res.render('testimonial')
}
function contact (req, res) {
    res.render('contact')
}

