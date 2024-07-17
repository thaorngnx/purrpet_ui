import { favoriteProduct, getFavorite, getFavoriteProductDetail } from "../api/favorite";

const favoriteState = {
    loading: false,
    error: null,
    data: null,
  };

  export const favoriteStore = (set, get)=>({
    favoriteState,
    setFavoriteState: (newState)=>{
        set(
            (state) => {
              state.favoriteState = newState;
              console.log("newState", newState);
            },
            false,
            `favorite/setFavoriteStore`,
          );
    },
    getFavorite:()=>{
        set (
            (state)=>{
                state.favoriteState.loading = true
            },
            false,
            `favorite/getFavorite_loading`,
        );
        getFavorite().then((res)=>{
          console.log("getFavorite response:", res);
          if(res.err === 0){
            set(
              (state)=>{
                state.favoriteState.loading = false;
                state.favoriteState.data = res.data;
                state.favoriteState.error = null;
              },
              false,
              `favorite/getFavorite_success`,
            );
        }else{
            set(
                (state)=>{
                    state.favoriteState.loading = false;
                    state.favoriteState.error = res.message;
                    state.favoriteState.data = null;
                },
                false,
                `favorite/getFavorite_error`,
            );
        }
        }
        )
    },
    getFavoriteProductDetail:(productCode)=> {
      set(
        (state)=>{
          state.favoriteState.loading = true;
        },
        false,
        `favorite/getFavoriteProductDetail_loading`,
      );
      getFavoriteProductDetail(productCode).then((res)=>{
        if(res.err === 0){
          set(
            (state)=>{
              state.favoriteState.loading = false;
              state.favoriteState.data = res.data;
              state.favoriteState.error = null;
            },
            false,
            `favorite/getFavoriteProductDetail_success`,
          );
        }
        else{
          set(
            (state)=>{
              state.favoriteState.loading = false;
              state.favoriteState.error = res.message;
              state.favoriteState.data = null;
            },
            false,
            `favorite/getFavoriteProductDetail_error`,
          );
        }
      })
    },
    favoriteProduct:(favoriteInfo)=>{
      set(
        (state)=>{
          state.favoriteState.loading = true;
        },
        false,
        `favorite/favoriteProduct_loading`,
      );
      favoriteProduct(favoriteInfo).then((res)=>{
        if(res.err === 0){
          set(
            (state)=>{
              state.favoriteState.loading = false;
              state.favoriteState.data = res.data;
              state.favoriteState.error = null;
            },
            false,
            `favorite/favoriteProduct_success`,
          );
        }
        else{
          set(
            (state)=>{
              state.favoriteState.loading = false;
              state.favoriteState.error = res.message;
              state.favoriteState.data = null;
            },
            false,
            `favorite/favoriteProduct_error`,
          );
        }
      })
    }
  })
