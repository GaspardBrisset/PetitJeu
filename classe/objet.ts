
class Objet{
    public id_obj: number
    public nom: string
    public type: string
    public modAtt:number
    public modDef:number
    public modEsq:number
    public modPV:number
    public img:string

    constructor(
        id_obj: number,
        nom: string,
        type: string,
        modAtt:number,
        modDef:number,
        modEsq:number,
        modPV:number,
        img:string
        ){
        this.id_obj = id_obj;
        this.nom = nom ;
        this.type = type ;  
        this.modAtt = modAtt;
        this.modDef = modDef;
        this.modEsq = modEsq ;
        this.modPV = modPV ;  
        this.img = img;
    }
    // Getters
    get idObj():number {
        return this.id_obj;
    }
    get nomObj():string{
        return this.nom
    }
    get typeObj():string{
        return this.type
    }
    get attObj():number {
        return this.modAtt
    }
    get defObj():number {
        return this.modDef;
    }
    get esqObj():number{
        return this.modEsq
    }
    get pvObj():number{
        return this.modPV
    }
    get imgObj():string {
        return this.img
    }

    // Setters
    set idObj(id:number) {
        this.id_obj = id
    }
    set nomObj(nom:string){
        this.nom = nom
    }
    set typeObj(type:string){
        this.type = type
    }
    set attObj(modAtt:number) {
        this.modAtt = modAtt
    }
    set defObj(modDef:number) {
        this.modDef = modDef
    }
    set esqObj(modEsq:number){
        this.modEsq = modEsq
    }
    set pvObj(modPV:number){
        this.modPV = modPV
    }
    set imgObj(img:string){
        this.img = img
    }
}

export {Objet};
