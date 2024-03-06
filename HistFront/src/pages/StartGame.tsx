import {Link} from "react-router-dom";

export default function StartGame() {
    return (

        <div className={"full-height d-flex justify-content-center align-items-center flex-column"}>
            <div>
                <Link className="btn btn-outline-primary btn-lg me-3 fs-3 border-2" to={"/game/1"}>Легко</Link>
                <Link className="btn btn-outline-primary btn-lg me-3 fs-3 border-2" to={"/game/2"}>Средне</Link>
                <Link className="btn btn-outline-primary btn-lg fs-3 border-2" to={"/game/3"}>Сложно</Link>
            </div>
        </div>
    )
}