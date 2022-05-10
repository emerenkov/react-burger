import React from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorStyle from './Constructor.module.css'

const Constructor = () => {
    return (
        <>
        <li className={ConstructorStyle.items}>
            <DragIcon type="primary" className={'pr-10'} />
            <ConstructorElement

                text="Краторная булка N-200i (верх)"
                price={50}
                thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                />
        </li>
        <li className={ConstructorStyle.items}>
            <DragIcon type="primary" className={'pr-10'} />
            <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
        />
        </li>
        <li className={ConstructorStyle.items}>
            <DragIcon type="primary" className={'pr-10'} />
            <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
        />
        </li>
            <li className={ConstructorStyle.items}>
                <DragIcon type="primary" className={'pr-10'} />
                <ConstructorElement
                    text="Краторная булка N-200i (верх)"
                    price={50}
                    thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                />
            </li>
            <li className={ConstructorStyle.items}>
                <DragIcon type="primary" className={'pr-10'} />
                <ConstructorElement
                    text="Краторная булка N-200i (верх)"
                    price={50}
                    thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                />
            </li>
            <li className={ConstructorStyle.items}>
                <DragIcon type="primary" className={'pr-10'} />
                <ConstructorElement
                    text="Краторная булка N-200i (верх)"
                    price={50}
                    thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                />
            </li>
    </>
    )
}

export default Constructor;
