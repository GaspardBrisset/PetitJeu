import conn  from './Pdo.js';
import {QueryError, RowDataPacket} from 'mysql2';
import { updateUser } from './Connexion';
import { NumericLiteral } from 'typescript';
import {User} from '../classe/user.js'
import {Objet} from '../classe/objet.js'

export function selectUserObjects(email: string){
    return new Promise((result, reject)=> {
        conn.query("SELECT * FROM objet JOIN sac ON sac.id_obj = objet.id_obj JOIN user ON sac.email = user.email WHERE user.email =? AND sac.isEquiped = 0", [email], (err,data) => {
            if(err) reject(err)
            else result(data)
        })
    })
}

export function getBoutique() {
    return new  Promise((result, reject) => {
        conn.query("SELECT * FROM boutique join objet on boutique.id_obj=objet.id_obj", (err,data) => {
            if(err) reject(err)
            else result(data)
        })
    })
}

export function insertBoutique(id_obj:number, email:string){
    return new Promise((result, reject) => {
        conn.query("INSERT INTO sac (id_obj,email) VALUES (?,?) ", [id_obj,email], (err,data) => {
            if(err) reject(err)
            else result(data)
        })
    })
}

export function updateBoutique(nbExemplaires:number, id_obj:number){
    return new Promise((result, reject) => {
        conn.query("UPDATE boutique SET nbExemplaires=? where id_obj = ? ", [nbExemplaires,id_obj], (err,data) => {
            if(err) reject(err)
            else result(data)
        })
    })
}

export function updateUserBoutique(argent:number, email:string){
    return new Promise((result, reject) => {
        conn.query("UPDATE user SET argent=? where email = ? ", [argent,email], (err,data) => {
            if(err) reject(err)
            else result(data)
        })
    })
}
export function selectObjById(id_obj:number){
    return new Promise((result, reject) => {
        conn.query("SELECT * from boutique where id_obj = ? ", [id_obj], (err,data) => {
            if(err) reject(err)
            else result(data)
        })
    })
}

export function getObjByIds(id_obj: number[]){
    return new Promise((result, reject) => {
        conn.query("SELECT * FROM objet WHERE id_obj IN(?)",
        [id_obj],
        (err, res) => {
            if(err) reject(err)
            else result(res)
        })
    })
}
export function getObjByIdInBag(user:User, id_obj:number) {
    return new Promise((result, reject) => {
        conn.query("SELECT * FROM objet JOIN sac ON sac.id_obj = objet.id_obj JOIN user ON sac.email = user.email WHERE user.email = ? AND sac.id_obj = ? AND isEquiped = 0", [user.email, id_obj], (err, res) => {
            if (err)
                reject(err);
            else
                result(res);
        });
    });
}

export function getEquipedItemByType(user:User, obj:Objet) {
    return new Promise((result, reject) => {
        conn.query(`SELECT objet.id_obj, objet.nom, objet.type, objet.modAtt, objet.modDef, objet.modEsq, objet.modPV, objet.img FROM objet JOIN sac ON sac.id_obj = objet.id_obj WHERE sac.email = ? AND isEquiped = 1 AND objet.type = ?`, [user.email, obj.type], (err, res) => {
            if (err)
                reject(err);
            else
                result(res);
        });
    });
}

export function equipItem(user:User, id_obj:number) {
    return new Promise((result, reject) => {
        conn.query("UPDATE sac SET isEquiped = 1 WHERE email = ? AND  id_obj = ?  ", [user.email, id_obj], (err, res) => {
            if (err)
                reject(err);
            else
                result(res);
        });
    });
}

export function desequipItem(user:User, id_obj:number) {
    return new Promise((result, reject) => {
        conn.query("UPDATE sac SET isEquiped = 0 WHERE email = ? AND  id_obj = ?  ", [user.email, id_obj], (err, res) => {
            if (err)
                reject(err);
            else
                result(res);
        });
    });
}

export function getItemById(id_obj:number) {
    return new Promise((result, reject) => {
        conn.query("SELECT * FROM objet WHERE id_obj = ?", [id_obj], (err, res) => {
            if (err)
                reject(err);
            else
                result(res);
        });
    });
}

export function getEquipedItems(user:User) {
    return new Promise((result, reject) => {
        conn.query("SELECT * FROM objet JOIN sac ON sac.id_obj = objet.id_obj JOIN user ON sac.email = user.email WHERE user.email = ? AND isEquiped = 1", [user.email], (err, res) => {
            if (err)
                reject(err);
            else
                result(res);
        });
    });
}

export function checkItemInBag(user:User, id_obj:number) {
    return new Promise((result, reject) => {
        conn.query("select * from sac where id_obj = ? AND email = ?", [id_obj, user.email], (err, res) => {
            if (err)
                reject(err);
            else
                result(res);
        });
    })
}
