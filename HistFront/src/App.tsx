import {Outlet} from "react-router-dom";
import Logo from "./assets/Logo.svg"

function App() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img alt={"logo"} src={Logo}/>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-lg-flex justify-content-center align-items-center" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item mx-5">
                                <a className="nav-link active fw-bold fs-5" aria-current="page" href="#">О проекте</a>
                            </li>
                            <li className="nav-item mx-5">
                                <a className="nav-link active fw-bold fs-5" aria-current="page" href="#">Квесты</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet/>
        </>
    )
}

export default App
