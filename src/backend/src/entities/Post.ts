import {Column, Entity, PrimaryGeneratedColumn,OneToMany,ManyToMany, JoinTable} from "typeorm"
import {Reply} from "./Reply"
import {Photo} from "./Photo";
import {HashTag} from "./HashTag";

@Entity()
export class Post{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column()
    body:string

    @Column()
    upvote:number

    @Column()
    downvote:number

    @Column()
    datePosted: Date

    @OneToMany(type => Reply, reply => reply.post)
    replys: Reply[]

    @OneToMany(type => Photo,photo => photo.post)
    photos:Photo[]

    @ManyToMany(type => HashTag)
    @JoinTable()
    hashTags: HashTag[];

}