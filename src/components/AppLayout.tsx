import classNames from "classnames"
import { PropsWithChildren } from "react"
import { ReactQueryDevtools } from "react-query/devtools"

interface Props {
    className?: string
}


const AppLayout: React.FC<PropsWithChildren<Props>> = ({
    className,
    children, 
}) => {
    return (
        <div className={classNames(`
        w-screen h-screen pt-12 pb-12
        flex flex-col items-center
        shadow-md
        bg-neutral-600 
        `, className)}>
            {children}

            <ReactQueryDevtools/>
        </div>
    )
}


export default AppLayout