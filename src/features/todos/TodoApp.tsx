import Link from "next/link"
import { useRouter } from "next/router"
import { FC, useMemo } from "react"
import { Fragment } from "react"
import { useState } from "react"
import { Routes } from "../../utils/routes"
import TodoEditModal from "./TodoEditModal"
import TodoList from "./TodoList"

type TDisplayMode = "add" | "list" | "edit"

// const LINK_MAP: {
//     [mode in TDisplayMode]: {href: string, label: string}
// } = {
//     list: {
//         href: Routes.NEW_TODO,
//         label: "Add"
//     },
//     add: {
//         href: Routes.TODOS,
//         label: "List"
//     },
// } as const

const MODE_MODAL_MAP: {[mode in TDisplayMode]: FC<any>} = {
    add: () => <TodoEditModal mode="create" />,
    edit: ({todoId}: {todoId: string}) => <TodoEditModal mode="update" todoId={todoId}  />,
    list: () => null,
} as const


const TodoApp: React.FC = ({}) => {
    const router = useRouter()
    // const [mode, setMode] = useState<TDisplayMode>("list")

    const mode = useMemo<TDisplayMode>(() => {
        if (router.asPath === Routes.TODOS) return "list"
        if (router.asPath === Routes.NEW_TODO) return "add"
        else return "edit"
    }, [router.asPath])

    const ModeComponent = MODE_MODAL_MAP[mode]

    const todoId = mode === "edit" ? router.asPath.split("/").pop()! : "never"

    return (
        <div className="
        w-screen h-screen pt-12 pb-12
        flex flex-col items-center
        shadow-md
        bg-neutral-600 
        ">
            <div className="
            w-[800px] h-full
            rounded-md
            text-neutral-200
            bg-neutral-800 p-8 
            border border-neutral-900
            ">
                <header className="mb-8 flex justify-between">
                    <h1 className="text-3xl">My todos</h1>
                    <Link href={Routes.NEW_TODO}>
                        <a className="
                        center
                        p-4 rounded-md pt-1 pb-1
                        bg-cyan-700 hover:bg-cyan-600 
                        border border-cyan-600
                        ">
                            Add
                        </a>
                    </Link>
                </header>
                <TodoList />

                <ModeComponent todoId={todoId} />
            </div>
        </div>
    )
}


export default TodoApp