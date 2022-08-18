import AppLayout from "../../components/AppLayout"
import { createPage } from "../../utils/nextjs"
import TodoApp from "./TodoApp"
import TodoLayout from "./TodoLayout"

interface Props {
    
}


const TodoPage = createPage(TodoApp, {
    layout: AppLayout,
    subLayout: TodoLayout,
})


export default TodoPage