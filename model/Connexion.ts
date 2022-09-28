import conn  from './Pdo.js';
import {QueryError, RowDataPacket} from 'mysql2';
import {User} from '../classe/user.js'
import {Objet} from '../classe/objet.js'

export function selectUser(email:string){
    return new Promise((result, reject) => {
        conn.query("SELECT * FROM user WHERE email=?", [email], (err, data) => {
            if(err) reject(err)
            else result(data)
        })
    }) 
}

export function getAll(){
    return new Promise((result, reject) =>{
        conn.query("SELECT * from user", (err, data) => {
            if(err) reject(err)
            else result(data)
        })
    })
}

export function displayConnect(pseudo:string){
    return new Promise((result, reject) => {
        conn.query("SELECT * from user WHERE pseudo=?", [pseudo], (err,data) => {
            if(err) reject(err)
            else result(data)
        })
    })
}

export function displayProfile(pseudo:string){
    return new Promise((result, reject) => {
        conn.query("SELECT email, pseudo, password, image FROM user WHERE pseudo=?", [pseudo], (err,data) => {
            if(err) reject(err)
            else result(data)
        })
    })
}
export function addAvatar(image:string){
    return new Promise((result, reject) => {
        conn.query("SELECT robots.url FROM robots", [image], (err,data) => {
            if(err) reject(err)
            else result(data)
        })
    })
}

export function updateUser(user:User){
    return new Promise((result, reject) => {
        conn.query("UPDATE user SET pseudo = ?, password = ?, image = ?, force_rbt = ?, defense = ?, esquive = ?, pv = ?, niveau = ?, experience = ?, argent = ?, id_arme = ?, id_bouclier = ?, id_tenue = ? WHERE email = ? ", [user.pseudo, user.password, user.image, user.force_rbt, user.defense, user.esquive, user.pv, user.niveau, user.experience, user.argent, user.id_arme, user.id_bouclier, user.id_tenue, user.email], (err, data) => {
            if (err) reject(err)
            else result(data)
        })
    })
}

export function updateStatsUserEquip(user:User, objet:Objet) {
    let force = (+user.force_rbt) + (+objet.modAtt)
    let defense = (+user.defense) + (+objet.modDef)
    let esquive = (+user.esquive) + (+objet.modEsq)
    let pv = (+user.pv) + (+objet.modPV)
    return new Promise((result, reject) => {
        conn.query("UPDATE user SET force_rbt = ?, defense = ?, esquive = ?, pv = ? WHERE email = ?", [force, defense, esquive, pv, user.email], (err, data) => {
            if (err)
                reject(err);
            else
                result(data);
        });
    });
}

export function updateStatsUserDesequip(user:User, objet:Objet) {
    let force = (+user.force_rbt) - (+objet.modAtt)
    let defense = (+user.defense) - (+objet.modDef)
    let esquive = (+user.esquive) - (+objet.modEsq)
    let pv = (+user.pv) - (+objet.modPV)
    return new Promise((result, reject) => {
        conn.query("UPDATE user SET force_rbt = ?, defense = ?, esquive = ?, pv = ? WHERE email = ?", [force, defense, esquive, pv, user.email], (err, data) => {
            if (err)
                reject(err);
            else
                result(data);
        });
    });
}