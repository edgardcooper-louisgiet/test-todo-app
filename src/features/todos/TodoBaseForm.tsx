import { Todo } from "@prisma/client"
import { Form, Formik } from "formik"
import {toast, } from "react-toastify"
import { useRouter } from "next/router"
import { useRef } from "react"
import { useEffect } from "react"
import {toFormikValidationSchema} from "zod-formik-adapter"
import { TODO_VALIDATORS } from "../../shared/validators/todo.validators"
import { useMutation, useQuery, useTrpcCtx } from "../../utils/trpc"
import Input from "../form/Input"

type Props<Mode extends "create" | "update"> = {
    mode: Mode
} 
& (
    Mode extends "update" 
    ? {
        todoId: Todo["id"]
    } 
    : {}
)

const formValidator = toFormikValidationSchema(TODO_VALIDATORS.todo.create)

const initialValues: Omit<Todo, "createdAt" | "updatedAt" | "id" | "order" | "isCompleted"> = {
    name: "",
    description: "",
    // isCompleted: false,
}

const TodoBaseForm = <Mode extends "create" | "update">(props: Props<Mode>): JSX.Element => {
    const {mode} = props
    const todoId = props.mode === "update" 
    // @ts-ignore
    ? props.todoId
    : "null"

    const router = useRouter()
    const trpcCtx = useTrpcCtx()
    const todoToUpdate = mode === "create" 
    ? {data: {} as any} 
    // eslint-disable-next-line react-hooks/rules-of-hooks
    : useQuery(["todo.getOne", {id: todoId}])
    const {mutateAsync} = useMutation(mode === "create" ? "todo.create" : "todo.update", {
        onSuccess(data, variables, context) {
            trpcCtx.setQueryData(["todo.getAll"], 
                prev => mode === "create"
                ? [...prev!, data]
                : prev!.map(
                    t => t.id === data.id 
                    ? {...data}
                    : t
                )
            )
        },
    })

    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        if (formRef.current === null) return

        (formRef.current.firstElementChild! as HTMLElement).focus()
    }, [formRef])

    return (
        <Formik onSubmit={async (values, helpers) => toast.promise(
            mutateAsync(values, {
                onSuccess(data, variables, context) {
                    helpers.setSubmitting(false)
                    router.push("/todos")
                },
                // onError(error, variables, context) {
                //     toast.error(error.message)
                // },
            }),
            {
                pending: "Submitting...",
                success: `Todo was successfully ${mode}d!`,
                error: `Failed to ${mode} a todo.`
            }
        )} 
        validationSchema={formValidator}
        initialValues={mode === "update" && todoToUpdate.data ? todoToUpdate.data : initialValues }
        enableReinitialize
        >
            <Form ref={formRef} className="flex flex-col gap-4">
                <Input name="name" label="Name" placeholder="My todo" />
                <Input name="description" label="Description" placeholder="A short description..." tag="textarea" rows={5}/>
                <input type="submit" value="Submit" 
                className="
                rounded-md
                py-2 px-4
                transition-all duration-150
                bg-cyan-700 hover:bg-cyan-600
                outline outline-transparent outline-2 outline-offset-1 focus-visible:outline-cyan-500
                "
                />
            </Form>
        </Formik>
    )
}


export default TodoBaseForm