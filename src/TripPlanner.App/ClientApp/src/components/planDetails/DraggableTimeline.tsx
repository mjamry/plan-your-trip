import React, { useCallback, useEffect, useState } from 'react';
import Timeline from '@mui/lab/Timeline';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import dayjs from 'dayjs';
import DraggableTimelineElement from './DraggableTimelineElement';
import TimelineElementPositionType from '../../Common/Dto/TimelineElementPositionTypes';
import useLoggerService from '../../Services/Diagnostics/LoggerService';
import LocationDto from '../../Common/Dto/LocationDto';

type Props = {
  data: LocationDto[];
  position: TimelineElementPositionType;
}

const DraggableTimeline = (props: Props) => {
  const { data, position } = props;
  const [locations, setLocations] = useState<LocationDto[]>(data);
  const [index, setIndex] = useState(0);
  const logger = useLoggerService('DraggableTimeline');

  useEffect(() => {
    setLocations(data);
  }, [data]);

  const moveTimelineElements = useCallback((dragIndex: number, hoverIndex: number) => {
    const start = dayjs();

    // swap two elements
    const locs = locations;
    [locs[dragIndex], locs[hoverIndex]] = [locs[hoverIndex], locs[dragIndex]];
    setLocations(locs);
    setIndex(dragIndex);
    const end = dayjs();
    logger.debug(end.diff(start).toString());
  }, [locations]);

  const renderTimelineElement = (location: LocationDto, ind: number) => {
    let elementPosition: TimelineElementPositionType = position;
    if (position === TimelineElementPositionType.alternate) {
      elementPosition = ind % 2 === 0
        ? TimelineElementPositionType.left
        : TimelineElementPositionType.right;
    }

    return (
      <DraggableTimelineElement
        position={elementPosition}
        location={location}
        routeDetails={{
          distance: `${Math.round(Math.random() * 10 * ind)}km`,
          time: `${Math.round(Math.random() * ind)}h ${Math.round(Math.random() * 60)}min`,
        }}
        key={location.id}
        index={ind}
        onMove={moveTimelineElements}
        onDrop={() => {}}
      />
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Timeline position={position}>
        {locations.map(
          (location: LocationDto, ind: number) => (renderTimelineElement(location, ind)),
        )}
      </Timeline>
      index:
      {' '}
      {index}
    </DndProvider>
  );
};

export default DraggableTimeline;
