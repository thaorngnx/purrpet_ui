import {
  favoriteProduct,
  getFavorite,
  getFavoriteProductDetail,
} from "../api/favorite";

const favoriteState = {
  loading: false,
  error: null,
  data: null,
};

const favoriteDetailState = {
  loading: false,
  error: null,
  data: null,
  pagination: {
    page: 1,
    total: 1,
    limit: 10,
  },
};

export const favoriteStore = (set, get) => ({
  favoriteState,
  favoriteDetailState,
  setFavoriteState: (newState) => {
    set(
      (state) => {
        state.favoriteState = newState;
        console.log("newState", newState);
      },
      false,
      `favorite/setFavoriteStore`,
    );
  },
  setFavoriteDetailState: (newState) => {
    set(
      (state) => {
        state.favoriteDetailState = newState;
      },
      false,
      `favorite/setFavoriteDetailStore`,
    );
  },
  getFavorite: () => {
    set(
      (state) => {
        state.favoriteState.loading = true;
      },
      false,
      `favorite/getFavorite_loading`,
    );
    getFavorite().then((res) => {
      console.log("getFavorite response:", res);
      if (res.err === 0) {
        set(
          (state) => {
            state.favoriteState.loading = false;
            state.favoriteState.data = res.data;
            state.favoriteState.error = null;
          },
          false,
          `favorite/getFavorite_success`,
        );
      } else {
        set(
          (state) => {
            state.favoriteState.loading = false;
            state.favoriteState.error = res.message;
            state.favoriteState.data = null;
          },
          false,
          `favorite/getFavorite_error`,
        );
      }
    });
  },
  getFavoriteProductDetail: (params) => {
    set(
      (state) => {
        state.favoriteDetailState.loading = true;
      },
      false,
      `favorite/getFavoriteProductDetail_loading`,
    );
    getFavoriteProductDetail(params).then((res) => {
      if (res.err === 0) {
        set(
          (state) => {
            state.favoriteDetailState.loading = false;
            state.favoriteDetailState.data = res.data;
            state.favoriteDetailState.pagination = res.pagination;
            state.favoriteDetailState.error = null;
          },
          false,
          `favorite/getFavoriteProductDetail_success`,
        );
      } else {
        set(
          (state) => {
            state.favoriteDetailState.loading = false;
            state.favoriteDetailState.error = res.message;
            state.favoriteDetailState.data = null;
          },
          false,
          `favorite/getFavoriteProductDetail_error`,
        );
      }
    });
  },
  favoriteProduct: (favoriteInfo) => {
    set(
      (state) => {
        state.favoriteState.loading = true;
      },
      false,
      `favorite/favoriteProduct_loading`,
    );
    favoriteProduct(favoriteInfo).then((res) => {
      if (res.err === 0) {
        console.log("favoriteProduct response:", res);
        //get favorite list after favorite product
        getFavorite().then((res) => {
          console.log("getFavorite response:", res);
          if (res.err === 0) {
            set(
              (state) => {
                state.favoriteState.loading = false;
                state.favoriteState.data = res.data;
                state.favoriteState.error = null;
              },
              false,
              `favorite/favoriteProduct_success`,
            );
          } else {
            set(
              (state) => {
                state.favoriteState.loading = false;
                state.favoriteState.error = res.message;
                state.favoriteState.data = null;
              },
              false,
              `favorite/favoriteProduct_error`,
            );
          }
        });
      }
    });
  },
});
