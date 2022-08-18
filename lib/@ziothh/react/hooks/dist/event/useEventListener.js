import { useEffect, useRef } from "react";
const useEventListener = (type, listener, { autoAdd = true, 
// @ts-ignore
element = document, fireOnce = false } = {}) => {
    const listenerRef = useRef();
    listenerRef.current = listener;
    const addEventListener = () => element.addEventListener(type, listenerRef.current, { once: fireOnce });
    const removeEventListener = () => element.removeEventListener(type, listenerRef.current);
    useEffect(() => {
        addEventListener();
        return removeEventListener;
    }, [listenerRef, fireOnce, type, element]);
    return {
        callback: listenerRef.current,
        add: addEventListener,
        remove: removeEventListener,
        firesOnce: fireOnce,
        element,
    };
};
export default useEventListener;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlRXZlbnRMaXN0ZW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ldmVudC91c2VFdmVudExpc3RlbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sT0FBTyxDQUFBO0FBRXpDLE1BQU0sZ0JBQWdCLEdBQUcsQ0FDckIsSUFBTyxFQUNQLFFBQXdELEVBQ3hELEVBQ0ksT0FBTyxHQUFHLElBQUk7QUFDZCxhQUFhO0FBQ2IsT0FBTyxHQUFHLFFBQVEsRUFDbEIsUUFBUSxHQUFHLEtBQUssS0FLaEIsRUFBRSxFQUNSLEVBQUU7SUFDQSxNQUFNLFdBQVcsR0FBRyxNQUFNLEVBQW1CLENBQUE7SUFDN0MsV0FBVyxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUE7SUFFOUIsTUFBTSxnQkFBZ0IsR0FBRyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxPQUFRLEVBQUUsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQTtJQUNyRyxNQUFNLG1CQUFtQixHQUFHLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLE9BQVEsQ0FBQyxDQUFBO0lBRXpGLFNBQVMsQ0FBQyxHQUFHLEVBQUU7UUFDWCxnQkFBZ0IsRUFBRSxDQUFBO1FBQ2xCLE9BQU8sbUJBQW1CLENBQUE7SUFDOUIsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQTtJQUUxQyxPQUFPO1FBQ0gsUUFBUSxFQUFFLFdBQVcsQ0FBQyxPQUFPO1FBQzdCLEdBQUcsRUFBRSxnQkFBZ0I7UUFDckIsTUFBTSxFQUFFLG1CQUFtQjtRQUMzQixTQUFTLEVBQUUsUUFBUTtRQUNuQixPQUFPO0tBQ0QsQ0FBQTtBQUNkLENBQUMsQ0FBQTtBQUVELGVBQWUsZ0JBQWdCLENBQUEifQ==