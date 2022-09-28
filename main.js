//imports
import {User} from './dist/classe/user.js'
import {Objet} from './dist/classe/objet.js'
import {addUser} from "./dist/model/register.js"
import {selectUser, displayConnect, displayProfile, getAll, addAvatar, updateUser, updateStatsUserEquip, updateStatsUserDesequip} from "./dist/model/login.js"
import {selectUserObjects, getBoutique, insertBoutique, updateBoutique, updateUserBoutique, selectObjById, getObjByIdInBag, getEquipedItemByType, equipItem, getItemById, getEquipedItems, checkItemInBag, desequipItem} from "./dist/model/objets.js"
import cookieSession from 'cookie-session'
import express from "express"
const app = express()

app.set('views', './vues');
app.set('view engine', 'ejs')

app.use(express.static("./assets"))
app.use(express.urlencoded({ extended: false }))

app.use(cookieSession({
    name: 'session',
    keys: ['123987456'],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.get("/", (req,res) => {
    res.render('register', {title: "register page"})   
})
app.get("/login/", (req,res) => {  
    res.render('login', {title: "login page"})
})
app.get("/index/", (req,res) => {  
    if(req.session.user && req.session.user.pseudo) {
        getAll().then(users=> {
            res.render('index', {users : users , email: users[0].email, pseudo: users[0].pseudo, name: req.session.user.pseudo, title: req.session.user})
        })
    }
    else {
        res.redirect('/login')
    }
})

app.get("/profil/", (req,res) => {  
    if(req.session.user && req.session.user.pseudo) {
        let user = req.session.user
        displayConnect(user.pseudo).then(profile => {
           res.render('profil', {profile: profile, title: req.session.user, name: profile[0].pseudo, image: profile[0].image})
        }
    )}
    else {
        res.redirect('/login')
    }
})

app.get("/editprofil", (req, res) => {
    if(req.session.user) {
        addAvatar(req.session.user.avatar).then(images => {
            //let value =getElementsByClassName("avatar").value;
            res.render('editprofil', {title: req.session.user, name: req.session.user.pseudo, images: images, url: images.url, avatar : req.session.avatar})
        })
    }
    else {
        res.redirect('/login')
    }
})

app.post("/edit", (req,res) => {
    let userObj = req.session.user
    let user = new User(userObj.email, req.body.pseudo, req.body.password, req.body.avatar, userObj.force_rbt, userObj.defense, userObj.esquive, userObj.pv, userObj.niveau, userObj.experience, userObj.argent, userObj.id_arme, userObj.id_bouclier, userObj.id_tenue)
    updateUser(user).then(() => {
        req.session.user.pseudo = req.body.pseudo;
        req.session.user.password = req.body.password
        req.session.user.image = req.body.avatar
        res.redirect('/index')
    })
})

app.get("/mesobjets", (req,res) => {
    if(req.session.user && req.session.user.pseudo) {
        let users = req.session.user
        getEquipedItems(users).then((objets) => {
            displayConnect(users.pseudo).then((utilisateur) => {
                res.render('objets', {title: req.session.user, name: req.session.user.pseudo, objets: objets, user: utilisateur[0]})
            })            
        })
    }
    else {
        res.redirect('/login')
    }
})

app.get("/sac", (req,res) => {
    if(req.session.user && req.session.user.pseudo) {
        let users = req.session.user;
        selectUserObjects(users.email).then((objets) => {
            res.render('sac', {title: req.session.user, name: req.session.user.pseudo, objets: objets})
        })
    }
    else{ 
        res.redirect('/login');
    }
})

app.get("/boutique", (req,res) => {
    if(req.session.user && req.session.user.pseudo) {
        getBoutique().then(boutique => {
            res.render('boutique', {title: req.session.user, name: req.session.user.pseudo, shops: boutique, erreur: ''})
        })
    }
    else {
        res.redirect('/login')
    }
})

app.post("/buyshop", (req,res) => {
    selectObjById(req.body.objetshop).then((data) => {
        checkItemInBag(req.session.user, data[0].id_obj).then((data2) => {
            if(data2.length > 0){
                res.render('erreurboutique', {error: '<span class="erreur">Vous ne pouvez pas acheter un objet que vous possédez déjà.</span><div class="retour"> <a href="/boutique">Retourner à la boutique</a></div>', name: req.session.user.pseudo, title: req.session.user})
            }else{
                insertBoutique(req.body.objetshop, req.session.user.email);
                let exemplaires = data[0].nbExemplaires - 1;
                updateBoutique(exemplaires, req.body.objetshop);
                let argent = req.session.user.argent - data[0].prix;
                updateUserBoutique(argent, req.session.user.email).then(() => {
                    res.redirect('/sac');
                })
            }
        })
    })
})

app.get('/logout',(req,res) => {
    req.session.destroy;
    res.redirect('/login');
});

//route after connection
app.post("/index/", (req,res) => {
    selectUser(req.body.email).then((data) => {
        if(data.length>0 && req.body.password==data[0].password && req.body.pseudo==data[0].pseudo){
            req.session.user = data[0]
            res.redirect('/index')
        }
        else {
            res.render('erreur', {title: 'Le mot de passe ou l\'email entré est erronné'})
        }
    }) 
})

//route combat
app.get("/combat/:email", (req,res) => {
    let userTemp = req.session.user
    selectUser(userTemp.email).then((user1) => {
        let user = new User(user1[0].email, user1[0].pseudo, user1[0].password, user1[0].image, user1[0].force_rbt, user1[0].defense, user1[0].esquive, user1[0].pv, user1[0].niveau, user1[0].experience, user1[0].argent, user1[0].id_arme, user1[0].id_bouclier, user1[0].id_tenue)
        selectUser(req.params.email).then((user2) => {
            let adversaire = new User(user2[0].email, user2[0].pseudo, user2[0].password, user2[0].image, user2[0].force_rbt, user2[0].defense, user2[0].esquive, user2[0].pv, user2[0].niveau, user2[0].experience, user2[0].argent, user2[0].id_arme, user2[0].id_bouclier, user2[0].id_tenue)
            let combat = user.fight(adversaire)
            updateUser(combat.adversaire)
            updateUser(combat.user)
            res.render('combat', {name: req.session.user.pseudo, title: req.session.user, combat: combat.message, adversaire: combat.adversaire, user: combat.user})
        })
    })
    
})

//route equiper
app.post("/equiper", (req,res) => {
    let userTemp = req.session.user
    getObjByIdInBag(userTemp, req.body.equipement).then((data) => {
        console.log(data)
        let monObj = new Objet(data[0].id_obj, data[0].nom, data[0].type, data[0].modAtt, data[0].modDef, data[0].modEsq, data[0].modPV, data[0].img)
        getEquipedItemByType(userTemp, monObj).then((data2) => {
            if(data2.length == 1){
                desequipItem(userTemp, data2[0].id_obj).then(() => {
                    getItemById(data2[0].id_obj).then((data3) => {
                        updateStatsUserDesequip(userTemp, data3[0]).then(() => {
                            selectUser(userTemp.email).then((data5) => {
                                let myUpdatedUser = new User(data5[0].email, data5[0].pseudo, data5[0].password, data5[0].image, data5[0].force_rbt, data5[0].defense, data5[0].esquive, data5[0].pv, data5[0].niveau, data5[0].experience, data5[0].argent, data5[0].id_arme, data5[0].id_bouclier, data5[0].id_tenue)
                                equipItem(myUpdatedUser, req.body.equipement).then(() => {
                                    getItemById(req.body.equipement).then((data4) => {
                                        updateStatsUserEquip(myUpdatedUser, data4[0]).then(() => {
                                            selectUser(userTemp.email).then((data6) => {
                                                req.session.user = data6[0]
                                                res.redirect(`/mesobjets`)
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            }else{
                equipItem(req.session.user, req.body.equipement).then(() => {
                    getItemById(req.body.equipement).then((data5) => {
                        updateStatsUserEquip(req.session.user, data5[0]).then(() => {
                            selectUser(userTemp.email).then((data7) => {
                                req.session.user = data7[0]
                                res.redirect(`/mesobjets`)
                            })
                        })
                    })
               })
            }
        })
    })
})

//route desequiper
app.get("/desequiper/:id_item", (req,res) => {
    desequipItem(req.session.user, req.params.id_item).then(() => {
        getItemById(req.params.id_item).then((data5) => {
            updateStatsUserDesequip(req.session.user, data5[0]).then(() => {
                selectUser(req.session.user.email).then((data7) => {
                    req.session.user = data7[0]
                    res.redirect(`/mesobjets`)
                })
            })
        })
    })
})

//route after registration
app.post("/log", (req,res) => {
    selectUser(req.body.email).then((data) => {
        if(data.length>0){
            res.render('erreur', {title: 'Cet email ou ce pseudo est déjà utilisé'})   
        }
        else {
            addUser(req.body.email,req.body.pseudo, req.body.password)
            res.redirect("/login/")
        }
    })
})

let port = 3100;

app.listen(port, () => {
    console.log(`⚡️[server]: Server is listening on http://localhost:${port}`)
})