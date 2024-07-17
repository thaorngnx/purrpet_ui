import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { cartStore } from "./cartStore";
import { activeProductCategoryStore } from "./activeProductCategoryStore";
import { customerStore } from "./customerStore";
import { favoriteStore } from "./favoriteStore";

const combineStore = (set, get) => ({
  ...cartStore(set, get),
  ...activeProductCategoryStore(set, get),
  ...customerStore(set, get), 
  ...favoriteStore(set, get),
});

export const useStore = create(devtools(combineStore));
