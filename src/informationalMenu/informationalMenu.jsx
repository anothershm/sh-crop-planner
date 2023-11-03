import React, { useContext } from 'react';
import './informationalMenu.css'
import '../common.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretLeft, faArrowDownShortWide, faArrowUpShortWide } from '@fortawesome/free-solid-svg-icons'
import { FarmType } from '../common/constants'

import { CropContext } from '../common/CropContext'
import configData from '../common/config.json';

import sunHavenIcon from './farms-icons/0.png'
import nervariIcon from './farms-icons/1.png'
import withergateIcon from './farms-icons/2.png'


function InformationalMenu({ year, season, farmType, onChangeYear, onChangeFarm }) {

    return (
        <nav id="informational_menu" className="row">
            <div className="col-md-5 col-xs-12 year_navigation">
                <YearButtons year={year} onChangeYear={onChangeYear} />

                <FarmPicker farm={farmType} onChangeFarm={onChangeFarm} />

                <Information year={year} season={season} farmType={farmType} />
            </div>
            <div className="col-md-7 col-xs-12">
                <InvestmentInfo year={year} season={season} farmType={farmType}></InvestmentInfo>
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
            <div className="yi_name"><b>Year {year}, {season}</b></div>
            <div className="yi_farmtype">{farmType}</div>
        </div>
    );
}

function InvestmentInfo({ year, season, farmType }) {
    const { cropsData } = useContext(CropContext);

    function calculateTotalSpent() {
        if (!cropsData[year]?.[farmType]?.[season]) {
            return 0;
        }

        let totalSpent = 0;
        let seasonData = cropsData[year]?.[farmType]?.[season]
        Object.keys(seasonData).forEach((day) => {
            const cropsInSeason = seasonData[day];
            totalSpent += cropsInSeason.reduce((total, crop) => {
                const cropConfig = configData.crops[farmType].find((c) => c.id === crop.id);
                return total + crop.amount * cropConfig.buy;
            }, 0);
        });
        return totalSpent;
    }

    function calculateTotalProfitForSeason() {
        if (!cropsData[year]?.[farmType]?.[season]) {
            return 0;
        }

        let seasonData = cropsData[year]?.[farmType]?.[season]
        let totalProfit = 0;
        const SEASON_DAYS = 28; // Total number of days in the season

        Object.keys(seasonData).forEach((day) => {
            const cropsForDay = seasonData[day] || [];
            cropsForDay.forEach((crop) => {
                const cropConfig = configData.crops[farmType].find((c) => c.id === crop.id);
                const profitForCrop = crop.amount * cropConfig.yield * cropConfig.sell;
                totalProfit += profitForCrop;

                if (cropConfig.regrow > 0) {
                    // Calculate the profit for regrown crops on subsequent days
                    for (let i = parseInt(day) + parseInt(cropConfig.grow); i < SEASON_DAYS; i = i + parseInt(cropConfig.regrow)) {
                        totalProfit += profitForCrop;
                    }
                }
            });
        });

        return totalProfit;
    }

    return (
        <div className="investment_info row">
            <div className="col-md-6 ii_invested"> <FontAwesomeIcon icon={faArrowDownShortWide} /> Invested:  -{calculateTotalSpent()}</div>
            <div className="col-md-6 ii_profit"><FontAwesomeIcon icon={faArrowUpShortWide} /> Profit +{calculateTotalProfitForSeason()}</div>
        </div>
    )
}


export default InformationalMenu;