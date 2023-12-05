import {
  getCart,
  addToCart,
  deleteCart,
  deleteProductCart,
  updateCart,
} from "../api/cart";

const cartState = {
  loading: false,
  error: undefined,
  data: [],
};

export const cartStore = (set, get) => ({
  cartState,
  getCart: () => {
    set(
      (state) => {
        state.cartState.loading = true;
      },
      false,
      `cart/getCart_loading`,
    );
    getCart().then((res) => {
      console.log(res);
      set(
        (state) => {
          state.cartState.loading = false;
          state.cartState.data = res;
        },
        false,
        `cart/getCart_success`,
      );
    });
  },
  addToCart: (params) => {
    set(
      (state) => {
        state.cartState.loading = true;
      },
      false,
      `cart/addToCart_loading`,
    );
    addToCart(params).then((res) => {
      console.log(res);
      set(
        (state) => {
          state.cartState.loading = false;
          state.cartState.data = res;
        },
        false,
        `cart/addToCart_success`,
      );
    });
  },
  deleteCart: (params) => {
    set(
      (state) => {
        state.cartState.loading = true;
      },
      false,
      `cart/deleteCart_loading`,
    );
    deleteCart(params).then((res) => {
      console.log(res);
      set(
        (state) => {
          state.cartState.loading = false;
          state.cartState.data = res;
        },
        false,
        `cart/deleteCart_success`,
      );
    });
  },
  deleteProductCart: (params) => {
    set(
      (state) => {
        state.cartState.loading = true;
      },
      false,
      `cart/deleteProductCart_loading`,
    );
    deleteProductCart(params).then((res) => {
      console.log(res);
      set(
        (state) => {
          state.cartState.loading = false;
          state.cartState.data = res;
        },
        false,
        `cart/deleteProductCart_success`,
      );
    });
  },
  updateCart: (params) => {
    set(
      (state) => {
        state.cartState.loading = true;
      },
      false,
      `cart/updateCart_loading`,
    );
    updateCart(params).then((res) => {
      console.log(res);
      set(
        (state) => {
          state.cartState.loading = false;
          state.cartState.data = res;
        },
        false,
        `cart/updateCart_success`,
      );
    });
  },
});
