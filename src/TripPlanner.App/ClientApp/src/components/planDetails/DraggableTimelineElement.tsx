import React, { useRef } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { XYCoord } from 'dnd-core';
import LocationDto from '../../Common/Dto/LocationDto';
import TimelineElement from './TimelineElement';

const DraggableTypes = {
  TimelineElement: 'timelineElement',
};

interface DragItem {
  index: number
  id: string
  type: string
}

type Props = {
    location: LocationDto;
    routeDetails: any;
    position: any;
    index: number;
    onMove: any;
    onDrop: any;
}

const DraggableTimelineElement = (props: Props) => {
  const {
    location, routeDetails, position, index, onMove, onDrop,
  } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: DraggableTypes.TimelineElement,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      onMove(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: DraggableTypes.TimelineElement, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end(item) {
      onDrop(item);
    },
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      <TimelineElement
        position={position}
        location={location}
        routeDetails={routeDetails}
        key={location.id}
      />
    </div>

  );
};

export default DraggableTimelineElement;
