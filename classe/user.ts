
class User{
    public email: string
    public pseudo: string
    public password: string
    public image: string
    public force_rbt:number
    public defense:number
    public esquive:number
    public pv:number
    public niveau:number
    public experience:number
    public argent:number
    public id_arme:number
    public id_bouclier:number
    public id_tenue: number
    
    

    constructor(
        email: string, 
        pseudo: string, 
        password: string, 
        image:string, 
        force_rbt:number, 
        defense:number, 
        esquive:number, 
        pv:number, 
        niveau:number, 
        experience:number, 
        argent:number, 
        id_arme:number, 
        id_bouclier:number, 
        id_tenue:number
        ){
        this.email = email;
        this.pseudo = pseudo ;
        this.password = password ;  
        this.image = image;
        this.force_rbt = force_rbt;
        this.defense = defense ;
        this.esquive = esquive ;  
        this.pv = pv;
        this.niveau = niveau;
        this.experience = experience ;
        this.argent = argent ;  
        this.id_arme = id_arme;
        this.id_bouclier = id_bouclier;
        this.id_tenue = id_tenue;
    }
    // Getters
    get emailUser():string {
        return this.email;
    }
    get pseudoUser():string{
        return this.pseudo
    }
    get pwdUser():string{
        return this.password
    }
    get imageUser():string {
        return this.image
    }
    get forceUser():number {
        return this.force_rbt;
    }
    get defenseUser():number{
        return this.defense
    }
    get esquiveUser():number{
        return this.esquive
    }
    get pvUser():number {
        return this.pv
    }
    get niveauUser():number {
        return this.niveau;
    }
    get experienceUser():number{
        return this.experience
    }
    get argentUser():number{
        return this.argent
    }
    get armeUser():number {
        return this.id_arme
    }
    get bouclierUser():number {
        return this.id_bouclier
    }
    get tenueUser():number {
        return this.id_tenue
    }

    // Setters
    set emailUser(email:string){
        this.email = email
    }
    set pseudoUser(pseudo:string){
        this.pseudo = pseudo
    }
    set pwdUser(password:string){
        this.password = password
    }
    set imageUser(image:string) {
        this.image = image
    }
    set forceUser(force: number) {
        this.force_rbt = force
    }
    set defenseUser(defense: number){
        this.defense = defense
    }
    set esquiveUser(esquive:number){
        this.esquive = esquive
    }
    set pvUser(pv:number) {
        this.pv = pv
    }
    set niveauUser(niveau:number) {
        this.niveau = niveau
    }
    set experienceUser(experience:number){
        this.experience = experience
    }
    set argentUser(argent:number){
        this.argent = argent
    }
    set armeUser(arme:number){
        this.id_arme = arme
    }
    set bouclierUser(bouclier:number) {
        this.id_bouclier = bouclier
    }
    set tenueUser(tenue:number) {
        this.id_tenue = tenue
    }
    
    fight(adversaire:User){
        let robotpv:number = this.pv
        let adversairePV:number = adversaire.pv
        let message:string = "";
        let tourJoueur:boolean = true
        let esquive:boolean = false
        let esquiveTab:number[] = []
        let aleatoire:number = 0;
        let count:number = 0;
        let balance:number = 0;
        let experience:number = 0;
        while((this.pv > 0) && (adversaire.pv > 0) && (count<=10)){
            if(tourJoueur){
                esquive = false
                message += "<div class=\"tour\">À vous !</div>"
                esquiveTab.splice(0, esquiveTab.length)
                for(let i=0; i<adversaire.esquive; i++){
                    aleatoire = this.nombreAleatoire(1,100)
                    if(!esquiveTab.includes(aleatoire)){
                        esquiveTab.push(aleatoire)
                    }
                    else{
                        i--;
                    }
                }
                aleatoire = this.nombreAleatoire(1,100)
                if(esquiveTab.includes(aleatoire)){
                    esquive = true;
                }
                if(esquive){
                    message += "<div class=\"message\">Le robot ennemi a esquivé votre attaque !</div>"
                }
                else{
                    if(adversaire.defense < this.force_rbt){
                        adversaire.pv -= ((+this.force_rbt)-(+adversaire.defense))
                        message += "<div class=\"message\">Le robot ennemi a perdu" + ((+this.force_rbt)-(+adversaire.defense)) + " pv</div> "
                        message += "<div class=\"message\">Il reste " + adversaire.pv +" pv au robot ennemi</div>"
                    }else{
                        message += "<div class=\"message\">Le robot ennemi a une défense trop élevée pour que votre attaque n'aboutisse !</div>"
                    }
                }
            }
            else{
                message += "<div class=\"tour\">À l'adversaire</div>"
                esquive = false
                esquiveTab.splice(0, esquiveTab.length)
                aleatoire = 0;
                for(let i=0; i<this.esquive; i++){
                    aleatoire = adversaire.nombreAleatoire(1,100)
                    if(!esquiveTab.includes(aleatoire)){
                        esquiveTab.push(aleatoire)
                    }
                    else{
                        i--;
                    }
                }
                aleatoire = adversaire.nombreAleatoire(1,100)
                if(esquiveTab.includes(aleatoire)){
                    esquive = true;
                }
                if(esquive){
                    message += "<div class=\"message\">Votre robot à esquivé l'attaque !</div>"
                }
                else{
                    if(this.defense < adversaire.force_rbt){
                        this.pv -= ((+adversaire.force_rbt)-(+this.defense))
                        message += "<div class=\"message\">Votre robot a perdu " + ((+adversaire.force_rbt)-(+this.defense)) + " pv</div>"
                        message += "<div class=\"message\">Il reste " + this.pv +" pv à votre robot</div>"
                    }else{
                        message += "<div class=\"message\">La défense de votre ennemi est trop élevée pour que votre attaque n'aboutisse !</div>"
                    }
                }
            }
            if(adversaire.pv <=0){
                balance = 10
                this.argent += balance;
                experience = 100
                this.experience += experience;
                message += "<div class=\"message\">Vous avez gagné "+ experience + " points d'expérience !</div>";
                message += "<div class=\"result\"><span>Vous avez gagné !</span></div>";
            }
            else{
                if(this.pv <=0){
                    balance = 4
                    this.argent += balance;
                    experience = 50
                    adversaire.experience += experience;
                    this.experience += experience;
                    message += "<div class=\"message\">Vous avez gagné " + experience + " points d'expérience !</div>";
                    message += "<div class=\"result\"><span>Vous avez perdu...</span></div>"
                }
                else{
                    if(count==10) {
                        experience = 10
                        adversaire.experience += experience
                        this.experience+= experience
                        message+="<div class=\"result\"><span>Match nul</span></div>"
                    }
                }
            }
            tourJoueur = !tourJoueur;
            count++;
        }
        adversaire.pv = adversairePV
        this.pv = robotpv
        return {'message': message, 'adversaire': adversaire, 'user': this}

    }
    nombreAleatoire(min:number, max:number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min +1)) + min;
     }
}

export {User};
