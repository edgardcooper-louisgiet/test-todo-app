import { useRouter } from "next/router"
import { startTransition } from "react"
import Modal from "../../components/Modal"
import { Routes } from "../../utils/routes"
import TodoBaseForm from "./TodoBaseForm"

interface Props {
    mode: "update" | "create"
}


const TodoEditModal = <Mode extends "create" | "update">(
    props: Parameters<typeof TodoBaseForm<Mode>>[0]
): JSX.Element => {
    const router = useRouter()

    return (
        <Modal 
        defaultOpen
        onClose={() => startTransition(() => {router.push(Routes.TODOS)})}
        >
            {/* @ts-ignore */}
            <TodoBaseForm {...props} />
        </Modal>
    )
}


export default TodoEditModal