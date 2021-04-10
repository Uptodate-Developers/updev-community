import {Description,Example,Required, MaxLength, MinLength, Minimum, Maximum, Format, Enum, Pattern, Email} from "@tsed/schema";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {UserRoles} from "./UserRoles";

@Entity()
export class User{

    @Description("Id generer par la base de données")
    @PrimaryGeneratedColumn()
    id:number;

    @Description("Email de l'utilisateur")
    @Example("utlisateur@domaine.com")
    @Format("email")
    @Column({unique: true,nullable:true},)
    email:string;

    @Description("Numéro de téléphone de l'utilisateur")
    @Example("+243893843203")
    @Format("phone")
    @Column({unique: true,nullable:true})
    phoneNumber:string;

    @Description("Brève description de l'utilisateur")
    @Column()
    bio:string;

    @Description("Nom de l'utilisateur")
    @Required(true)
    @Column()
    name:string;

    @Description("Prénom de l'utilisateur")
    @Required(true)
    @Column()
    firstName:string;

    @Description("Postnom de l'utilisateur")
    @Required(true)
    @Column()
    lastName:string;

    @Column({unique: true,nullable:true})
    facebookProfileId:string;

    @Column({unique: true,nullable:true})
    googleProfileId:string;

    @Column({unique: true,nullable:true})
    twitterProfileId:string;

    @Column({unique: true,nullable:true})
    githubProfileId:string;

    @Column()
    profilePicUrl:string;

    @Column()
    role:string = UserRoles.Member;
}

