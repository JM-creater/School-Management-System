import { 
    createContext, 
    useContext 
} from "react";
import { IRootStoreModel } from "./root-store";

// RootStoreProvider is a context provider that wraps the RootStoreModel and provides
// an instance of the store to its children components. It is used to share the
// root store between components. The useStore hook is a convenience hook that
// allows components to access the root store without having to use the context
// const RootStoreContext = createContext<IRootStoreModel>({} as IRootStoreModel);
const RootStoreContext = createContext<IRootStoreModel>({} as IRootStoreModel);

// This provider wraps the RootStoreModel and provides it to components
// as a context. It is used by the useStore hook to allow components to
// access the root store easily.
// eslint-disable-next-line react-refresh/only-export-components
export const useStore = () => useContext(RootStoreContext);

// This context provider is used to share the root store between components
// in the app. Components can use the useStore hook to access the root store
// without having to use the context api directly.
export const RootStoreProvider = RootStoreContext.Provider;