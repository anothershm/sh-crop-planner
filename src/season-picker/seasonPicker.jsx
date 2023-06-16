import { Seasons } from "../common/config";
import './seasonPicker.css'
import 'bootstrap/dist/css/bootstrap.css';

import springIcon from './season-icons/Spring.png'
import summerIcon from './season-icons/Summer.png'
import fallIcon from './season-icons/Fall.png'
import winterIcon from './season-icons/Winter.png'

function SeasonPicker({ season, setSeason }) {

    const seasonArray = Object.values(Seasons)
    const icons = [springIcon, summerIcon, fallIcon, winterIcon]

    return (
        <div id="season_picker" className="row">
            {seasonArray.map((item, i) =>
                <div className="col">
                    <div className={"sh-btn season " + (season == item ? "active" : "deactive")} onClick={() => setSeason(item)}>
                        <img src={icons[i]} className="image" />
                        <div className="name">{item}</div>


                    </div>
                </div>
            )}
        </div>
    )

}

export default SeasonPicker;