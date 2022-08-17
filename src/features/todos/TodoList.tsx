import { useQuery } from "../../utils/trpc"
import TodoListCard from "./TodoListCard"

import {useAutoAnimate} from "@formkit/auto-animate/react"
import { FaPlus } from "react-icons/fa"
import { useRouter } from "next/router"
import { Routes } from "../../utils/routes"
import TodoListCardPlaceholder from "./TodoListCardPlaceholder"

interface Props {
    
}


const TodoList: React.FC<Props> = ({}) => {
    const router = useRouter()
    const {isLoading, data} = useQuery(["todo.getAll"])

    const [listRef] = useAutoAnimate<HTMLUListElement>({
        duration: 300
    })

    // if (isLoading) return <p>Loading</p>
    // if (data!.length === 0) return <p>You currently have no todos.</p>

    return (
        <ul ref={listRef} className="flex flex-col gap-4">
            {isLoading
                ? new Array(10)
                .fill(null)
                .map((_, i) => (
                    <li key={i}>
                        <TodoListCardPlaceholder/>
                    </li>
                ))
                : data!.map(todo => (
                    <li key={todo.id}>
                        <TodoListCard todo={todo} />
                    </li>
                ))
            }
            <li>
                <button onClick={() => router.push(Routes.NEW_TODO)}
                className="center rounded-md py-2 w-full
                transition-duration
                bg-neutral-700 opacity-20 hover:opacity-100 border border-neutral-600 
                ">
                    <FaPlus className="h-8"/>
                </button>
            </li>
        </ul>
    )
}


export default TodoList