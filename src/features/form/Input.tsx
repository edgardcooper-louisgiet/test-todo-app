import { useField } from "formik"
import { ReactNode } from "react"
import { DetailedHTMLProps, InputHTMLAttributes, RefObject } from "react"

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

interface Props {
    name: NonNullable<InputProps["name"]>
    placeholder?: InputProps["placeholder"]
    rows?: number
    type?: InputProps["type"]
    className?: string
    tag?: "input" | "textarea"
    label?: ReactNode
    // inputRef?: RefObject<HTMLInputElement | HTMLTextAreaElement | HTMLElement>
}


const Input: React.FC<Props> = ({name, label, type = "text", tag: Tag = "input", ...props}) => {
    const [field, meta, helpers] = useField<string>(name)

    return (
        <label>
            <span className="block mb-2 text-lg">{label}</span>
            <Tag 
            {...(field as any)} 
            {...props} 
            type={type} 
            className="
            w-full
            rounded-md py-2 px-4 text-neutral-900 
            outline outline-transparent outline-2 outline-offset-1 focus-visible:outline-cyan-500
            border-none
            "
            />
            {meta.error && <p className="text-xs mt-1 ml-1 text-red-400">{meta.error}</p>}
        </label>
    )
}


export default Input