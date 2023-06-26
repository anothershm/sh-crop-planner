import React from 'react';
import './informationalMenu.css'
import '../common.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import { FarmType } from '../common/constants'

import sunHavenIcon from './farms-icons/0.png'

import nervariIcon from './farms-icons/1.png'

import withergateIcon from './farms-icons/2.png'


function InformationalMenu({ year, season, farmType, onChangeYear, onChangeFarm }) {

    return (
        <nav id="informational_menu" className="row">
            <div className="col-md-3 col-xs-12 year_navigation">
                <YearButtons year={year} onChangeYear={onChangeYear} />

                <FarmPicker farm={farmType} onChangeFarm={onChangeFarm} />

                <Information year={year} season={season} farmType={farmType} />

            </div>
        </nav>
    );
}

function YearButtons({ year, onChangeYear }) {
    function handleClickRight() {
        onChangeYear(year + 1);
    }
    function handleClickLeft() {
        if (year !== 1)
            onChangeYear(year - 1);
    }

    return (
        <div className="btn-group sn_arrows">
            <button className='sh-btn' onClick={handleClickLeft}>
                <FontAwesomeIcon icon={faCaretLeft} inverse />
            </button>
            <button className='sh-btn' onClick={handleClickRight}>
                <FontAwesomeIcon icon={faCaretRight} inverse />
            </button>
        </div >
    );
}
function FarmPicker({ farm, onChangeFarm }) {
    function handleClick() {
        const values = Object.values(FarmType)
        var nextValue = Object.values(FarmType).indexOf(farm) + 1;
        if (nextValue >= values.length)
            nextValue = 0
        document.getElementById("farmSelector").setAttribute("src", getImg(nextValue));
        onChangeFarm(values[nextValue]);
    }

    function getImg(nextValue) {
        if (nextValue === 0) {
            return sunHavenIcon
        }
        if (nextValue === 1) {
            return nervariIcon
        }
        if (nextValue === 2) {
            return withergateIcon
        }
    }

    return (
        <div className="btn-group">
            <button className='sh-btn' onClick={handleClick}>
                <img id='farmSelector' src={sunHavenIcon} alt="the icon of the farm selected" height='35px' width='35px' />
            </button>
        </div >
    );
}

function Information({ year, season, farmType }) {
    return (
        <div className="year_info">
            <div className="yi_name">Year {year}, {season}</div>
            <div className="yi_farmtype">{farmType}</div>
        </div>
    );
}
export default InformationalMenu;