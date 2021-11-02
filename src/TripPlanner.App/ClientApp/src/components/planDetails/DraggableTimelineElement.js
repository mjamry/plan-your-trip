import React,  { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import TimelineElement from './TimelineElement'

const DraggableTypes = {
    TimelineElement: 'timelineElement'
}

const DraggableTimelineElement = ({location, routeDetails, position, index, onMove, onDrop}) => {
    const ref = useRef(null)
    const [, drop] = useDrop({
        accept: DraggableTypes.TimelineElement,
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Time to actually perform the action
            onMove(dragIndex, hoverIndex)
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })
    const [{ isDragging }, drag] = useDrag({
        item: { type: DraggableTypes.TimelineElement, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end(item, monitor){
            onDrop(item)
        }
    })

    const opacity = isDragging ? 0 : 1
    drag(drop(ref))

    return (
        <div ref={ref} 
        style={{ opacity}}>
             <TimelineElement 
                position={position} 
                location={location} 
                routeDetails={routeDetails}
                key={location.id} 
                index={index}
        />
        </div>
       
    )
}

export default DraggableTimelineElement;