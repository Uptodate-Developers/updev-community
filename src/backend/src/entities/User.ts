import {Description,Example,Required,Format} from "@tsed/schema"
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import {Photo} from "./Photo";
import {Post} from "./Post";
import {Reply} from "./Reply";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number

    @Description("Email de l'utilisateur")
    @Example("utlisateur@domaine.com")
    @Format("email")
    @Column({unique: true,nullable:true},)
    email:string

    @Description("Numéro de téléphone de l'utilisateur")
    @Example("+243893843203")
    @Format("phone")
    @Column({unique: true,nullable:true})
    phoneNumber:string

    @Description("Brève description de l'utilisateur")
    @Column()
    bio:string

    @Description("Nom de l'utilisateur")
    @Required(true)
    @Column()
    name:string

    @Description("Prénom de l'utilisateur")
    @Required(true)
    @Column()
    firstName:string

    @Description("Postnom de l'utilisateur")
    @Required(true)
    @Column()
    lastName:string

    @Column({unique: true,nullable:true})
    facebookProfileId:string

    @Column()
    facebookProfileLink:string

    @Column({unique: true,nullable:true})
    googleProfileId:string

    @Column({unique: true,nullable:true})
    twitterProfileId:string

    @Column()
    twitterProfileLink:string

    @Column({unique: true,nullable:true})
    githubProfileId:string

    @Column()
    githubProfileLink:string

    @Column()
    profilePicUrl:string

    @Column()
    role:string = UserRoles.Member

    @Column()
    profession:string

    @Column()
    dateCreated: Date = new Date()

    @Column()
    dateUpdated: Date = new Date()

    @OneToMany(() => Post, post => post.user)
    posts:Post[]

    @OneToMany(() => Reply, reply => reply.user)
    replies:Reply[]
}
export enum UserRoles {
    Member = "Member",
    Moderator = "Moderator",
    Admin = "Admin"
}