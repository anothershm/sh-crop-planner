import React from 'react';
import { IYear } from '../App';
import './informationalMenu.css'
import '../common.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretLeft} from '@fortawesome/free-solid-svg-icons'

function InformationalMenu({ year, setYear }: IYear) {
    return (
        <nav id="informational_menu" className="row">
            <div className="col-md-3 col-xs-12 year_navigation">
                <YearButtons year={year} setYear={setYear} />

                {/*
                <div className="btn-group sn_arrows">
                    <div className="btn btn-default" ng-click="self.inc_year(-1)"><i className="fa fa-chevron-left"></i></div>
                    <div className="btn btn-default" ng-click="self.inc_year(1)"><i className="fa fa-chevron-right"></i></div>
                </div>
                <div className="farm_picker">
                    <div className="btn btn-default" ng-click="self.toggle_mode()">
                        <img ng-src="{{self.cfarm().get_image()}}">
                    </div>
                </div>
                <div className="year_info">
                    <div className="yi_name">Year {{ self.cyear.index + 1 }}, {{ self.cseason.name }}</div>
                    <div className="yi_farmtype">{{ self.cmode }}</div>
                </div>
                */}
            </div>
            {/*
            <div className="col-md-6 col-xs-8">
                <div className="season_stats">
                    <table className="table table-striped">
                        <tbody>
                            <tr>
                                <th width="25%"><i className="fa fa-fw fa-tint"></i> Planted</th>
                                <td>{{ self.cfarm().totals.season[self.cseason.index].get_plantings(1) }}</td>

                                <th width="25%"><i className="fa fa-fw fa-pagelines"></i> Harvests</th>
                                <td>{{ self.cfarm().totals.season[self.cseason.index].get_harvests(1) }}</td>
                            </tr>
                            <tr>
                                <th width="25%"><i className="fa fa-fw fa-bar-chart"></i> Profit</th>
                                <td colspan="3">
                                    <div class="profit min" ng-show="self.cfarm().totals.season[self.cseason.index].profit.min==self.cfarm().totals.season[self.cseason.index].profit.max">
                                        <div>{{ self.cfarm().totals.season[self.cseason.index].profit.min > 0 && '+' || '' }}{{ self.cfarm().totals.season[self.cseason.index].get_profit(1) }}g</div>
                                    </div>

                                    <div class="profit" ng-show="self.cfarm().totals.season[self.cseason.index].profit.min!=self.cfarm().totals.season[self.cseason.index].profit.max">
                                        <span>{{ self.cfarm().totals.season[self.cseason.index].profit.min > 0 && '+' || '' }}{{ self.cfarm().totals.season[self.cseason.index].get_profit(1) }}g</span>
                                        <i class="asc_icon fa fa-sort-amount-asc fa-rotate-270"></i>
                                        <span>{{ self.cfarm().totals.season[self.cseason.index].profit.max > 0 && '+' || '' }}{{ self.cfarm().totals.season[self.cseason.index].get_profit(1, 1) }}g</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="col-md-2 col-md-offset-1 col-xs-4 clear_buttons">
                <div className="btn btn-default btn-block" ng-click="self.clear_season(self.cseason)"><i className="fa fa-calendar"></i> Clear {{ self.cseason.name }}</div>
                <div className="btn btn-default btn-block" ng-click="self.clear_year(self.cyear)"><i className="fa fa-trash"></i> Clear Year</div>
</div> */}
        </nav>
    );
}

function YearButtons({ year, setYear }: IYear) {
    function handleClickRight() {
        setYear(year + 1);
    }
    function handleClickLeft() {
        if (year != 1)
            setYear(year - 1);
    }

    return (
        <div className="btn-group sn_arrows">
            <button className='sh-btn' onClick={handleClickLeft}>
            <FontAwesomeIcon icon={faCaretLeft} inverse/>
            </button>
            <button className='sh-btn' onClick={handleClickRight}>
            <FontAwesomeIcon icon={faCaretRight} inverse/>
            </button>
            {year} 
        </div >
    );
}
/*
function inc_year(direction) {
  direction = direction > 0 ? true : false;

  if (direction) {
      // Next year
      self.cyear = self.cyear.next(true);
  } else {
      // Previous year
      var prev_year = self.cyear.previous();
      if (!prev_year) return;
      self.cyear = prev_year;
  }
}
*/
export default InformationalMenu;