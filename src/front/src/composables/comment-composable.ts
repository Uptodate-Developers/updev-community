import { reactive, ref } from "vue";
import { PostService } from "../services";
import { ReplyResponse } from "../../api/responses";

type ResourceSchema = {
  id: Nullable<number>;
  type: string;
};

export interface ManagerSchema {
  isLoading: boolean;
  containerOpened: boolean;
  resource: ResourceSchema;
  replies: ReplyResponse[];
}

export default function useComment() {
  const skip = ref(0);
  const take = ref(20);
  const postService = new PostService();

  const manager = reactive<ManagerSchema>({
    isLoading: false,
    replies: [],
    resource: {
      id: null,
      type: ""
    },
    containerOpened: false
  });

  const getReplies = async () => {
    const id = manager.resource.id;
    manager.isLoading = true;
    const repliesResponse = await postService.getReplies(
      id,
      undefined,
      undefined,
      skip.value,
      take.value
    );
    if (typeof repliesResponse === "string") {
      manager.isLoading = false;
      return [];
    }

    manager.isLoading = false;
    return repliesResponse;
  };

  const actions = {
    setResource(payload: ResourceSchema) {
      manager.resource = payload;
    },
    addReply(reply: ReplyResponse) {
      if (reply) {
        manager.replies.push(reply);
      }
    },
    async loadReplies() {
      manager.containerOpened = !manager.containerOpened;
      if (manager.containerOpened) {
        manager.replies = await getReplies();
      }
    },
    onReplyDeleted(replyId: string) {
      const index = manager.replies.findIndex(r => r.id.toString() === replyId);
      if (index > -1) {
        manager.replies.splice(index, 1);
      }
    }
  };

  return { manager, ...actions };
}
