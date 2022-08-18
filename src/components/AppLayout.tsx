import classNames from "classnames"
import { PropsWithChildren } from "react"

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
        </div>
    )
}


export default AppLayout