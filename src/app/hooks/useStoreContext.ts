import { useContext } from "react";
import { StoreContext } from "../context/store-context";

export const useStoreContext = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw Error("Oops - we do not seem to be inside the provider");
  }
  return context;
};
