import { Todo } from "@prisma/client"
import Link from "next/link"
import { useMutation, useQuery, useTrpcCtx } from "../../utils/trpc"
import { FaEdit, FaTrash } from "react-icons/fa"
import { toast } from "react-toastify"
import { Routes } from "../../utils/routes"

interface Props {
    todo: Todo
}


const TodoListCard: React.FC<Props> = ({todo}) => {
    const trpcCtx = useTrpcCtx()
    const {mutateAsync: toggleIsCompleted} = useMutation("todo.toggleCompleted", {
        onMutate(variables) {
            trpcCtx.setQueryData(["todo.getAll"], prev => prev!.map(
                t => t.id === todo.id 
                ? {...t, isCompleted: !t.isCompleted}
                : t
            ))
        },
        onSuccess(data) {
            trpcCtx.setQueryData(["todo.getAll"], prev => prev!.map(
                t => t.id === todo.id 
                ? data
                : t
            ))
        },
        onError(error, variables, context) {
            trpcCtx.setQueryData(["todo.getAll"], prev => prev!.map(
                t => t.id === todo.id 
                ? todo
                : t
            ))
        },
    }) 
    const {mutateAsync: deleteTodo} = useMutation("todo.delete", {
        onError(error, variables, context) {
            console.log("hiiii");
        },
    }) 

    return (
        <div onClick={(e) => toggleIsCompleted({id: todo.id, isCompleted: !todo.isCompleted})}
        className={`
        relative overflow-hidden
        rounded-md py-2 pr-2 pl-6 w-full
        flex items-center gap-2
        
        transition-default

        bg-neutral-700 hover:bg-neutral-600
        border border-neutral-600

        before:absolute 
        before:left-0 before:h-full before:w-2
        before:transition-default
        ${todo.isCompleted ? "before:bg-green-500" : "before:bg-orange-500"}
        `}
        >
            <h2 className={`
            transition-default
            ${todo.isCompleted ? "line-through opacity-70" : ""}
            `}>
                {todo.name}
            </h2>
            <div onClick={(e) => e.stopPropagation()} className="ml-auto flex items-center gap-2">
                <Link href={`${Routes.TODOS}$${todo.id}`}>
                    <a onMouseOver={() => {trpcCtx.prefetchQuery(["todo.getOne", {id: todo.id}])}}
                    className="
                    transition-all duration-150
                    bg-neutral-500 hover:bg-neutral-700
                    border border-neutral-600
                    w-8 h-8 p-2 rounded-md
                    flex items-center justify-center
                    ">
                        <FaEdit/>
                    </a>
                </Link>
                <button 
                onClick={async () => {
                    const BACKUP = [...trpcCtx.getQueryData(["todo.getAll"])!]

                    const reset = () => {trpcCtx.setQueryData(["todo.getAll"], BACKUP)}

                    toast.promise(
                        deleteTodo({id: todo.id}, {
                            // onSuccess(data, variables, context) {
                            //     // Moved to be called onClick
                            // },
                            // onError(error, variables, context) {
                            //     reset()
                            //     // This doesn't catch network errors for some reason...
                                
                            // },
                        }), 
                        {
                            pending: "Deleting...",
                            success: "Todo successfully deleted!",
                            error: "An error occured while deleting the todo."
                        }
                    ).catch(err => reset())


                    trpcCtx.setQueryData(["todo.getAll"], todos => todos!.filter(t => t.id !== todo.id))
                }}
                className="
                transition-all duration-150
                bg-red-500 hover:bg-red-600
                border border-red-600
                w-8 h-8 p-2 rounded-md
                flex items-center justify-center
                "
                >
                    <FaTrash/>
                </button>
            </div>
        </div>
    )
}


export default TodoListCard