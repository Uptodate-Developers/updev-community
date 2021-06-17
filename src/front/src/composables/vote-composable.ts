export interface VoteParamsSchema {
  resource?: string;
  status: string;
  id: number;
}

import { useAxios } from "../services/Axios";

import { watch, ref, reactive, Ref } from "vue";
import { User, VoteStatus } from "./../../api/models";

export default function useVote(resource: string = "Post") {
  const { data, loading, exec, cancel } = useAxios();

  const isVisible = ref<Boolean>(false);
  const isLoading = ref<Boolean>(false);
  const voteStatus = ref(VoteStatus);
  let users = ref<User[]>([]);

  let params = reactive<VoteParamsSchema>({
    resource,
    status: "",
    id: 0,
  });

  const handleTooltipVisibility = (visible: Boolean): void => {
    isVisible.value = visible;
  };

  const loadVoaters = (): void => {
    exec({
      method: "GET",
      url: "/votes",
      params,
    });
  };

  const setParams = (payload: VoteParamsSchema): void => {
    for (const key in payload) {
      // @ts-ignore
      const val = payload[key];
      if (val) {
        // @ts-ignore
        params[key] = val;
      }
    }
  };

  watch([loading, data as Ref<User[]>], (values) => {
    const [loading, response]: [
      loading: boolean,
      response: User[]
    ] = values
    isLoading.value = loading
    if (response) {
      users.value = response
    }
  })

  watch(isVisible, (value) => {
    if (value) {
      users.value = []
      loadVoaters()
    } else {
      cancel()
    }
  });

  return { users, setParams, isLoading, voteStatus, handleTooltipVisibility };
}
