import React, {useRef} from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorStyle from './BurgerItem.module.css'
import PropTypes from 'prop-types';
import types from '../../utils/types.js'
import {useDispatch} from "react-redux";
import {resetItem} from "../../services/actions/ingredientsInConstructor";
import {useDrag, useDrop} from "react-dnd";
import ingredient from "../Ingredient/Ingredient";


const BurgerItem = ({el, index, handleDelete}) => {

    const dispatch = useDispatch();

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
            const dragIndex = el.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            dispatch(resetItem(dragIndex, hoverIndex));
            el.index = hoverIndex;
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
        <>
        <li className={ConstructorStyle.items} data-handler-id={handlerId} ref={ref} style={{ opacity }}>
            <DragIcon type="primary" className={'pr-10'} />
            <ConstructorElement
                text={el.name}
                price={el.price}
                thumbnail={el.image_mobile}
                handleClose={() => handleDelete(el)}
                />
        </li>
    </>
    )
}

BurgerItem.propTypes = {
    el: types.isRequired,
    index: PropTypes.number.isRequired,
    handleDelete: PropTypes.func.isRequired,
}

export default BurgerItem;
