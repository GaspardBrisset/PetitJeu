abstract class Equipement{
    constructor(id:number ) {}
}

class Arme extends Equipement {
    constructor(id:number, nom:string, type:string, modAtt: number ,img:string){
        super(id);
    }
}

class Bouclier extends Equipement {
    constructor(id:number, nom:string, type:string, modDef: number, modEsq: number, modPV :number ,img:string){
        super(id);
    }
}

class Tenue extends Equipement {
    constructor(id:number, nom:string, type:string, modDef: number, modPV :number ,img:string){
        super(id);
    }
}

export {Equipement, Arme, Bouclier, Tenue}