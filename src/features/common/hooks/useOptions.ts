import type { OptionData } from "../types/optionTypes";

const useOptions = {
  setOption: (data: Array<{ key: string; value: string }>
  ): OptionData[] =>
    data?.map((data) => ({ keyValue: data.key, value: data.value })),
};

export default useOptions;
