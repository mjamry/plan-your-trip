import React, {useCallback, useState} from 'react'
import Timeline from '@material-ui/lab/Timeline';
import DraggableTimelineElement from './DraggableTimelineElement'
import TimelineElementPositionTypes from './TimelineElementPositionTypes'
import useLoggerService from './../../Services/Diagnostics/LoggerService'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const DraggableTimeline = ({data, position}) => {
    const [locations, setLocations] = useState(data);
    const [index, setIndex] = useState(0);
    const logger = useLoggerService('DragabbleTimeline')

    const moveTimelineElements = useCallback((dragIndex, hoverIndex)=>{
            logger.debug(`[DROP] ${dragIndex}, ${hoverIndex}`);
            
            //swap two elements
            var locs = locations;
            [locs[dragIndex], locs[hoverIndex]] = [locs[hoverIndex], locs[dragIndex]];
            setLocations(locs)
            setIndex(dragIndex);
            logger.debug('end')
    }, [locations])

    const renderTimelineElement = (location, index) => {
        const elementPosition = position === TimelineElementPositionTypes.Alternate 
                    ? index % 2 == 0 ? TimelineElementPositionTypes.Left : TimelineElementPositionTypes.Right
                    : position
        return (
            <DraggableTimelineElement 
                position={elementPosition} 
                location={location} 
                routeDetails={{
                    distance: `${Math.round(Math.random()*10*index)}km`, 
                    time: `${Math.round(Math.random()*index)}h ${Math.round(Math.random()*60)}min`
                }}
                key={location.id} 
                index={index}
                onMove={moveTimelineElements}
                onDrop={()=>{}}
            />)
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <Timeline align={position}>
                {locations.map((location, index) => (renderTimelineElement(location, index)))}
            </Timeline>
            index: {index}
        </DndProvider>
    )
}

export default DraggableTimeline;