import {Link} from "react-router-dom";

export default function HomePage() {
    // todo add api
    return (
        <div className={"full-height d-flex justify-content-center align-items-center"}>
            <Link className="btn btn-outline-primary btn-lg me-3" to={"/game/0"}>Легко</Link>
            <Link className="btn btn-outline-primary btn-lg me-3" to={"/game/1"}>Средне</Link>
            <Link className="btn btn-outline-primary btn-lg me-3" to={"/game/2"}>Сложно</Link>
        </div>
    )
}