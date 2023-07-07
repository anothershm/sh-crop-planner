

import React from 'react';
import '../common.css'
import './calendar.css';
import configData from '../common/config.json';

const importAll = (r) => {
    let images = {};
    r.keys().map((item) => {
        images[item.replace('./', '')] = r(item);
    });
    return images;
};

const images = importAll(require.context('./calendar-icons', false, /\.(png)$/));

function Calendar({ season }) {
    const SEASON_DAYS = 28;
    const calendarEvents = configData.events[season]

    return (
        <div id="calendar">
            <div className='weekdays'>
                <div className="day_name">Mon</div>
                <div className="day_name">Tue</div>
                <div className="day_name">Wed</div>
                <div className="day_name">Thu</div>
                <div className="day_name">Fri</div>
                <div className="day_name">Sat</div>
                <div className="day_name">Sun</div>
            </div>
            <div className="day_container">
                {
                    [...Array(SEASON_DAYS)].map((x, i) => {
                       const foundEvent = calendarEvents.find((eventDay) => eventDay.day === i+1);
                        const eventName = foundEvent ? foundEvent.name : '';
                        const imageSrc = images[eventName+'.png']

                        return (<div className="day">
                            <div className="date_top" key={i}>
                                <div className="date">
                                    <span className="visible-xs">{i + 1}</span>
                                    <div className='event'
                                        title={eventName}>
                                        <img src={imageSrc} alt={eventName}/>
                                    </div>

                                </div>

                            </div>
                        </div>
                        )
                    }
                    )
                }
            </div>
        </div>
    )
}

export default Calendar;