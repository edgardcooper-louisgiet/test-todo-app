import type { FC, PropsWithChildren } from "react";
import { createContext, useRef, useContext } from "react";


const contextFactory = <T,>(contextValue: () => T) => {
    // const stateFunctionRef = useRef(state)

    const ctx = createContext<T>(null!);

    const CtxProvider: React.FC<PropsWithChildren> = ({ children }) => {
        const stateFunctionRef = useRef<typeof contextValue>();
        stateFunctionRef.current = contextValue;

        const value = stateFunctionRef.current();
        return <ctx.Provider value={value}>{children}</ctx.Provider>;
    };

    const useCtx = () => useContext(ctx);

    return [CtxProvider, useCtx] as const;
};

export default contextFactory;


export const withContext = <Props extends Object = {}>(
    Component: FC<Props>, 
    ContextProvider: ReturnType<typeof contextFactory>[0] 
): FC<Props> => (props) => <ContextProvider><Component {...props} /></ContextProvider>