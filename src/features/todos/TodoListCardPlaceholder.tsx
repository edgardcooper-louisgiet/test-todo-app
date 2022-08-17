import Link from "next/link"
import { useEffect, useState } from "react"

interface Props {
    
}

const TRANSITION_DURATION = 1000 // in ms

const TodoListCardPlaceholder: React.FC<Props> = ({}) => {
    const [binary, setBinary] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setBinary(prev => !prev)
        }, TRANSITION_DURATION)
    }, [binary])

    return (
        <div className={`
        ${binary ? " opacity-90" : "opacity-40"}
        relative overflow-hidden
        rounded-md py-2 pr-2 pl-6 w-full
        flex items-center gap-2
        
        transition-default
        duration-1000

        bg-neutral-700
        border border-neutral-600

        before:absolute 
        before:left-0 before:h-full before:w-2
        before:transition-default
        before:bg-neutral-600
        `}>
            <div className={`
            transition-default
            h-8 w-full mr-2
            rounded-md
            bg-neutral-600
            `}>
            </div>
            {/* <p>{todo.description}</p> */}

            <div className="ml-auto flex items-center gap-2 opacity-80">
                <button className="
                transition-all duration-150
                bg-neutral-500
                w-8 h-8 p-2 rounded-md
                flex items-center justify-center
                ">
                    {/* <FaEdit/> */}
                </button>
                <button className="
                transition-all duration-150
                bg-red-500
                w-8 h-8 p-2 rounded-md
                flex items-center justify-center
                ">
                    {/* <FaTrash/> */}
                </button>
            </div>
        </div>
    )
}


export default TodoListCardPlaceholder