

import React, { useState, useContext } from 'react';
import { CropContext } from '../common/CropContext'
import '../common.css'
import './calendar.css';
import configData from '../common/config.json';
import PlantCropModal from './plant-crop/plantCropModal';

const importAll = (r) => {
    let images = {};
    r.keys().map((item) => {
        images[item.replace('./', '')] = r(item);
    });
    return images;
};

const imagesEvents = importAll(require.context('./calendar-icons', false, /\.(png)$/));
const imagesCrops = importAll(require.context('../common/crops-icon', false, /\.(png)$/));

function Calendar({ season, farmType, year }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [dayModal, setDay] = useState(0);

    const { cropsData } = useContext(CropContext);
    const seasonData = cropsData[year]?.[farmType]?.[season]

    const SEASON_DAYS = 28;
    const calendarEvents = configData.events[season]

    const openModal = (day) => {
        setDay(day);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

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
                <PlantCropModal isOpen={isModalOpen} onClose={closeModal} day={dayModal} season={season} farmType={farmType} year={year} />
                {
                    [...Array(SEASON_DAYS)].map((x, i) => {
                        const foundEvent = calendarEvents.find((eventDay) => eventDay.day === i + 1);
                        const eventName = foundEvent ? foundEvent.name : '';
                        const imageSrc = imagesEvents[eventName + '.png'];

                        const eventDiv = eventName ? (
                            <div className='event'
                                title={eventName}>
                                <img src={imageSrc} alt={eventName} />
                            </div>
                        ) : null;

                        const cropsForDay = seasonData ? seasonData[i + 1] : [];
                        const cropImagesToPlant = cropsForDay ? cropsForDay.map((crop, i) => (
                            <img key={i} className="cropImagesToPlant" src={imagesCrops[crop.id + '.png']} alt={crop.id} />
                        )) : null;

                        const handleClick = () => {
                            openModal(i + 1);
                        };
                        return (
                            <div className="day" onClick={handleClick} key={i}>
                                <div className="date_top">
                                    <div className="date">
                                        <span className="visible-xs">{i + 1}</span>
                                    </div>
                                </div>
                                {eventDiv}
                                {cropImagesToPlant}
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