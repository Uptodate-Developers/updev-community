import {VoteStatus} from "../entities"

export class AddVoteRequest {
    userId:string
    itemId:string
    voteStatus:VoteStatus
}