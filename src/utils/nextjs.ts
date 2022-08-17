import { FC, Fragment, PropsWithChildren } from "react";

export type DeepRequired<T> = {
    [K in keyof T]: Required<DeepRequired<T[K]>>
}

interface ICreatePageOptions {
    layout?: FC<PropsWithChildren>
    subLayout?: FC<PropsWithChildren>
}

export const createPage = <Props extends Object = {}>(Page: FC<Props>, options: ICreatePageOptions = {}) => {

    const p = Page as typeof Page & {
        Layout: NonNullable<ICreatePageOptions["layout"]>
        SubLayout: NonNullable<ICreatePageOptions["subLayout"]>
    }


    p.Layout = options.layout || Fragment
    p.SubLayout = options.subLayout || Fragment

    return p
}