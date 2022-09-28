import conn  from './Pdo.js';
import {QueryError, RowDataPacket} from 'mysql2';

export function addUser(email:string,name:string, pwd:string){
    return new Promise((result, reject) => {
        conn.query("INSERT INTO user (email,pseudo,password) VALUES (?,?,?) ", [email,name, pwd], (err, data) => {
            if(err) reject(err)
            else result(data)
        })
    }) 
}

