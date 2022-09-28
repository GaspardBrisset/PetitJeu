
import { User } from "../model/Utilisateur.Interface"
import { getObjByIds } from '../model/objets';

export class FightRobot {
    robot_user1 : User
    robot_user2: User

    constructor(robot_user1: User, robot_user2: User) {
        this.robot_user1 = robot_user1
        this.robot_user2 = robot_user2
    }
 
}