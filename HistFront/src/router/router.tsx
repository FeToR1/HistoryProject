import App from "../App.tsx";
import {Route, Routes} from "react-router-dom";
import HomePage from "../pages/HomePage.tsx";
import Game from "../pages/Game.tsx";
import StartGame from "../pages/StartGame.tsx";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<App/>}>
                <Route index element={<HomePage/>}/>
                <Route path="game/:difficultyId" element={<Game/>}/>
                <Route path={"game_selection"} element={<StartGame/>}/>
            </Route>
        </Routes>
    )
}