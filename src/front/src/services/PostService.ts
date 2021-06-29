import { plainToClass } from "class-transformer";
import axios from "../services/Axios";
import { CreateReplyRequest } from "../../api/requests";
import {
  PostResponse,
  ReplyResponse,
  ItemVoteStatus
} from "../../api/responses";
import { SearchIn, StatusCodes, VoteStatus } from "../../api/models";
import { CreatePostRequest, AddVoteRequest } from "../../api/requests";

export class PostService {
  async createPost(request: CreatePostRequest): Promise<PostResponse | string> {
    const postResult = await axios.post("/posts", request);

    if (
      postResult.status == StatusCodes.Success ||
      postResult.status == StatusCodes.Created
    )
      return plainToClass(PostResponse, postResult.data);

    return `errror:Une erreur est survenue, message:${postResult.data}, status:${postResult.status}`;
  }

  async getPosts(
    skip: number,
    take: number,
    isRecent: boolean,
    isPopular: boolean
  ): Promise<PostResponse[] | string> {
    const response = await axios.get(
      `/posts?skip=${skip.toString()}&take=${take}&isRecent=${isRecent}&isPopular=${isPopular}`
    );

    if (response.status == StatusCodes.Success) {
      const posts: PostResponse[] = [];
      for (let post of response.data) {
        posts.push(post);
      }
      return posts;
    }

    return `error:Une erreur est survenue, message:${response.data}, status:${response.status}`;
  }

  async getPostsForUser(
    userId: number,
    skip: number,
    take: number,
    isRecent: boolean,
    isPopular: boolean
  ): Promise<PostResponse[] | string> {
    const response = await axios.get(
      `/posts/user/${userId}?skip=${skip.toString()}&take=${take}&isRecent=${isRecent}&isPopular=${isPopular}`
    );

    if (response.status == StatusCodes.Success) {
      const posts: PostResponse[] = [];
      for (let post of response.data) {
        posts.push(post);
      }
      return posts;
    }

    return `errror:Une erreur est survenue, message:${response.data}, status:${response.status}`;
  }

  async getPostsForTags(
    tags: string[],
    isPopular: boolean,
    skip: number,
    take: number
  ): Promise<PostResponse[] | string> {
    let requestUrl = `/posts?isPopular=${isPopular}&skip=${skip}&take=${take}`;
    for (const tag of tags) requestUrl = `${requestUrl}&tags=${tag}`;

    const response = await axios.get(requestUrl);

    if (response.status == StatusCodes.Success) {
      const posts: PostResponse[] = [];
      for (let post of response.data) {
        posts.push(post);
      }
      return posts;
    }

    return `errror:Une erreur est survenue, message:${response.data}, status:${response.status}`;
  }

  async createReply(
    request: CreateReplyRequest
  ): Promise<ReplyResponse | string> {
    const response = await axios.post(`/replies`, request);
    if (
      response.status == StatusCodes.Success ||
      response.status == StatusCodes.Created
    )
      return plainToClass(ReplyResponse, response.data);
    return `errror:Une erreur est survenue, message:${response.data}, status:${response.status}`;
  }

  async getReplies(
    postId: Nullable<number>,
    replyId: number | undefined,
    userId: number | undefined,
    skip: number,
    take: number
  ): Promise<ReplyResponse[] | string> {
    let requestUrl = "";
    if (postId)
      requestUrl = `/replies/post/${postId}?skip=${skip}&take=${take}`;
    if (replyId)
      requestUrl = `/replies/reply/${replyId}?skip=${skip}&take=${take}`;
    if (userId)
      requestUrl = `/replies/user/${userId}?skip=${skip}&take=${take}`;

    const response = await axios.get(requestUrl);
    if (response.status == StatusCodes.Success) {
      const replies: ReplyResponse[] = [];
      for (let item of response.data) {
        replies.push(item);
      }
      return replies;
    }
    return `errror:Une erreur est survenue, message:${response.data}, status:${response.status}`;
  }

  async vote(
    postId: string | undefined,
    replyId: string | undefined,
    userId: string,
    voteStatus: VoteStatus
  ) {
    let requestUrl = "";
    let itemId = "";
    if (postId) {
      requestUrl = `/posts/vote`;
      itemId = postId;
    }
    if (replyId) {
      requestUrl = `/replies/vote`;
      itemId = replyId;
    }

    const response = await axios.post(requestUrl, <AddVoteRequest>{
      userId: userId,
      itemId: itemId,
      voteStatus: voteStatus
    });

    if (
      response.status == StatusCodes.Success ||
      response.status == StatusCodes.Created
    ) {
      return response.data;
    }

    return `errror:Une erreur est survenue, message:${response.data}, status:${response.status}`;
  }

  async getVoteStatus(
    postId: string | undefined,
    replyId: string | undefined,
    userId: string | undefined
  ): Promise<ItemVoteStatus | string> {
    if (!userId) return "Not connected";
    let requestUrl = "";
    if (postId) requestUrl = `/posts/status/${postId}/${userId}`;
    if (replyId) requestUrl = `/replies/status/${postId}/${userId}`;

    const response = await axios.get(requestUrl);
    if (response.status == StatusCodes.Success)
      return plainToClass(ItemVoteStatus, response.data);

    return `error:Une erreur est survenue, message:${response.data}, status:${response.status}`;
  }

  async getPost(postId: string): Promise<PostResponse | string> {
    const response = await axios.get(`/posts/${postId}`);
    if (response.status == StatusCodes.Success) {
      return plainToClass(PostResponse, response.data);
    }
    return `error:Une erreur est survenue, message:${response.data}, status:${response.status}`;
  }

  async delete(
    postId: string | undefined,
    replyId: string | undefined,
    userId: string
  ): Promise<boolean | string> {
    if (!userId) return "Not connected, can not delete anything";

    let requestUrl = "";
    if (postId) requestUrl = `/posts/${postId}/${userId}`;
    if (replyId) requestUrl = `/replies/${replyId}/${userId}`;

    const response = await axios.delete(requestUrl);
    if (response.status == StatusCodes.Success) return true;
    return `errror:Une erreur est survenue, message:${response.data}, status:${response.status}`;
  }

  async search(
    query: string,
    searchIn: SearchIn
  ): Promise<PostResponse[] | string> {
    const response = await axios.get(
      `/posts/search/${searchIn}?query=${query}`
    );
    if (response.status == StatusCodes.Success) {
      const posts: PostResponse[] = [];
      for (let post of response.data) {
        posts.push(post);
      }
      return posts;
    }
    return `errror:Une erreur est survenue, message:${response.data}, status:${response.status}`;
  }
}
