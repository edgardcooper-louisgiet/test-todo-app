declare const useEventListener: <T extends keyof DocumentEventMap, E extends Window | EventTarget | Document | HTMLElement = Document>(type: T, listener: (e: {
    target: E;
} & DocumentEventMap[T]) => void, { autoAdd, element, fireOnce }?: {
    element?: E | undefined;
    fireOnce?: boolean | undefined;
    autoAdd?: boolean | undefined;
}) => {
    readonly callback: (e: any) => any;
    readonly add: () => void;
    readonly remove: () => void;
    readonly firesOnce: boolean;
    readonly element: E;
};
export default useEventListener;
