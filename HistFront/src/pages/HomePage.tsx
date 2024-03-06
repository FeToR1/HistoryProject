import {Link} from "react-router-dom";
import Pluses from "../elements/Pluses.tsx";

export default function HomePage() {
    return (


        <div className={"full-height container"}>
            <Pluses/>
            <div className={"text-center my-lg-5 d-flex flex-column"}>
                <Link className="btn btn-outline-primary btn-lg fs-3 border-2"
                      to={"/game_selection"}>Начать!</Link>
            </div>
        </div>

    )
}