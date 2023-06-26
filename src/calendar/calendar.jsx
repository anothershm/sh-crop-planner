

import React from 'react';
import '../common.css'
import './calendar.css';

/*
    return (
        <div id="calendar">
            <div class="day_names">
                <div class="day_name">M</div>
                <div class="day_name">T</div>
                <div class="day_name">W</div>
                <div class="day_name">Th</div>
                <div class="day_name">F</div>
                <div class="day_name">Sa</div>
                <div class="day_name">Su</div>
            </div>
            <div class="day_container">
                <div class="day" ng-repeat="date in self.days | limitTo:self.SEASON_DAYS:self.cseason.start-1" ng-click="self.open_plans(date)" ng-class="{'filled': self.cfarm().plans[date].length || self.cfarm().harvests[date].length}">

                    <div class="date_top">
                        <div class="date">
                            <span class="visible-xs">{{ self.get_date(date, '%j%S - %l') }}</span>
                            <span class="hidden-xs">{{ date% self.SEASON_DAYS > 0 && date % self.SEASON_DAYS || self.SEASON_DAYS}}</span>
                        </div>
                        <div class="event" ng-show="self.events[date] && self.player.settings.show_events" title="{{self.events[date].get_text()}}">
                            <img ng-src="{{self.events[date].get_image()}}">
                                <span>{{ self.events[date].get_text() }}</span>
                        </div>
                    </div>

                    <div ng-show="self.cfarm().plans[date].length" class="items">
                        <div class="planting">
                            <div class="plan" ng-repea t="plan in self.cfarm().plans[date] | limitTo:4">
                                <img ng-src="{{plan.crop.get_image(1)}}">
                                    <div class="amount">x{{ plan.amount }}</div>
                            </div>
                        </div>
                        <div class="more" ng-show="self.cfarm().plans[date].length > 4">{{ self.cfarm().plans[date].length - 4 }} more...</div>
                    </div>

                    <div ng-show="self.cfarm().harvests[date].length">
                        <div class="harvesting">
                            <div class="plan" ng-repeat="harvest in self.cfarm().harvests[date] | limitTo:4">
                                <img ng-src="{{harvest.crop.get_image()}}">
                                    <div class="amount">x{{ harvest.yield.min }}</div>
                            </div>
                        </div>
                        <div class="more" ng-show="self.cfarm().harvests[date].length > 4">{{ self.cfarm().harvests[date].length - 4 }} more...</div>
                    </div>

                    <div ng-show="self.cfarm().totals.day[date].profit.min || self.cfarm().totals.day[date].profit.max">
                        <div class="profit min" ng-show="self.cfarm().totals.day[date].profit.min==self.cfarm().totals.day[date].profit.max">
                            <div>{{ self.cfarm().totals.day[date].profit.min > 0 && '+' || '' }}{{ self.cfarm().totals.day[date].get_profit(1) }}g</div>
                        </div>

                        <div class="profit" ng-show="self.cfarm().totals.day[date].profit.min!=self.cfarm().totals.day[date].profit.max">
                            <i class="asc_icon fa fa-sort-amount-asc"></i>
                            <div>{{ self.cfarm().totals.day[date].profit.min > 0 && '+' || '' }}{{ self.cfarm().totals.day[date].get_profit(1) }}g</div>
                            <div>{{ self.cfarm().totals.day[date].profit.max > 0 && '+' || '' }}{{ self.cfarm().totals.day[date].get_profit(1, 1) }}g</div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        );
*/

function Calendar() {
    const SEASON_DAYS = 28;
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
               [...Array(SEASON_DAYS)].map((x, i) =>
               <div className="day" 
               /* 
               ng-click="self.open_plans(date)
               className="{'filled': self.cfarm().plans[date].length || self.cfarm().harvests[date].length}"
               */
                >

                    <div className="date_top">
                        <div className="date">
                            <span className="visible-xs">{ i+1 }</span>
                        </div>
                        
                    </div>
                    </div>
             )

            }
            </div>
        </div>
    )
}

export default Calendar;