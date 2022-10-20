import React, {FC, useRef} from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorStyle from './BurgerItem.module.css'
import {resetItem} from "../../services/actions/ingredientsInConstructor";
import {useDrag, useDrop, XYCoord} from "react-dnd";
import {TConstructorDetails, useAppDispatch} from "../../utils/types";

const BurgerItem: FC<TConstructorDetails> = ({el, index, handleDelete}) => {
    const dispatch = useAppDispatch();
    const id = el.uId;
    const ref = useRef(null);

    const [{ handlerId }, drop] = useDrop({
        accept: 'element',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(el, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }
            // const hoverBoundingRect = ref.current?.getBoundingClientRect:an();
            // const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // const clientOffset = monitor.getClientOffset();
            // const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            //
            // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            //     return;
            // }
            // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            //     return;
            // }

            dispatch(resetItem(dragIndex, hoverIndex));
            index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'element',
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;

    drag(drop(ref));

    return (
        <li className={ConstructorStyle.items} data-handler-id={handlerId} ref={ref} style={{ opacity }}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={el.name}
                price={el.price}
                thumbnail={el.image_mobile}
                handleClose={() => handleDelete(el)}
                />
        </li>

    )
}

export default BurgerItem;
