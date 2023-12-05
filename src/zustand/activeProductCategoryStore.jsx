import { getActiveCategories } from "../api/category";
import * as CONST from "../constants";

const activeProductCategoryState = {
  loading: false,
  error: undefined,
  data: [],
};

export const activeProductCategoryStore = (set, get) => ({
  activeProductCategoryState,
  getActiveCategories: () => {
    set(
      (state) => {
        state.activeProductCategoryState.loading = true;
      },
      false,
      `category/getActiveCategories_loading`,
    );
    getActiveCategories({ categoryType: CONST.CATEGORY_TYPE.PRODUCT }).then(
      (res) => {
        console.log(res);
        if (res.err === 0) {
          set(
            (state) => {
              state.activeProductCategoryState.loading = false;
              state.activeProductCategoryState.data = res.data;
            },
            false,
            `category/getActiveCategories_success`,
          );
        } else {
          set(
            (state) => {
              state.activeProductCategoryState.loading = false;
              state.activeProductCategoryState.error = res.message;
            },
            false,
            `category/getActiveCategories_error`,
          );
        }
      },
    );
  },
});
