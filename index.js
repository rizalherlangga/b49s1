
const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const session = require('express-session')
const flash = require('express-flash')

//sequelize init
const config = require('./src/config/config.json')
const { Sequelize, QueryTypes} = require('sequelize')
const sequelize = new Sequelize(config.development)

//setup call hbs with sub folder
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname ,'src/views'))

// set serving stattic file
app.use(express.static('src/assets'))
app.use(express.static('src/assets/css'))

//parsing data from client
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json());

//setup flash
app.use(flash())

//setup session
app.use(session({
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 2
    },
    store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: false,
    secret: 'secretValue'
}))

app.get("/", home)
app.get("/contact/", contact)
app.get("/project-detail/:id", projectDetail)
app.get("/project", project)
app.get("/testimonial", testimonial)
app.get("/edit-project/:id", displayEditForm)
app.get("/delete-project/:id", deleteProject)
app.get("/login", login)
app.get("/register", register)
app.get("/logout", logout)

app.post("/register", addUser)
app.post("/login", userLogin)
app.post("/edit-project/:id", handleUpdate)
app.post("/project", addProject)


app.listen(port, () => {
    console.log(`Jalan Nih Server ${port}`);
})


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
                golang: res.technologies.includes('golang'),
                react: res.technologies.includes('react'),
              },
              isLogin: req.session.isLogin
        }))
        res.render('index', {dataDefault: data, isLogin: req.session.isLogin,
            user: req.session.user})
    } catch (error) {

    }
}

function project (req, res) {
    if(!req.session.isLogin) {
        res.redirect('/')
        return
    }
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
    if(!req.session.isLogin) {
        res.redirect('/')
        return
    }

try {
        var {tittle, start, end, description, image} = req.body
        const differenceInDay =  duration(start, end) 
        const technologies = {
            js: req.body.js !== undefined,
            boostrap: req.body.boostrap !== undefined,
            golang: req.body.golang !== undefined,
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
    if(!req.session.isLogin) {
        res.redirect('/')
        return
    }

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
    if(!req.session.isLogin) {
        res.redirect('/')
        return
    }

    try {
        const projectId = req.params.id;
        const { title, start, end, description, image } = req.body;
        const differenceInDay = duration(start, end);
        const technologies = {
            js: req.body.js !== undefined,
            boostrap: req.body.boostrap !== undefined,
            golang: req.body.golang !== undefined,
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


async function deleteProject (req, res) {
    if(!req.session.isLogin) {
        res.redirect('/')
        return
    }
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
                golang: res.technologies.includes('golang'),
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

function login (req, res) {
    if(req.session.isLogin) {
        res.redirect('/')
        return
    }

    res.render('login')
}
async function userLogin (req, res) {
    if(req.session.isLogin) {
        res.redirect('/')
        return
    }

    try {
        const {email, password} = req.body
        const query = `SELECT * FROM "Users" WHERE email = '${email}'`
        let obj = await sequelize.query(query, {type: QueryTypes.SELECT})

        if (!obj.length) {
            req.flash('danger', "user has not been registered")
            return res.redirect('/login')
        }

        await bcrypt.compare(password, obj[0].password, (err, result) => {
            if(!result) {
                req.flash('danger', "password wrong")
                return res.redirect('/login')
            }else{
                req.session.isLogin = true
                req.session.user = obj[0].name
                req.flash('succes', "login succes")
                res.redirect('/')
            }
        })
    }catch(error) {
        console.log(error);
    }
}
function register (req, res) {
    if(req.session.isLogin) {
        res.redirect('/')
        return
    }

    res.render('register')
}
async function addUser(req, res) {
    if(req.session.isLogin) {
        res.redirect('/')
        return
    }

    try {
        const {name , email, password} = req.body
        const salt = 10

        await bcrypt.hash(password, salt, (err, hash) => {
            const query = `INSERT INTO "Users"(name, email, password, "createdAt", "updatedAt") VALUES ('${name}','${email}', '${hash}', NOW(), NOW())`

            sequelize.query(query)
            res.redirect('login')
        })
    }catch(error) {

    }
}

function logout(req, res) {
    req.session.isLogin = false
    req.session.user = null

    res.redirect('/')
}



