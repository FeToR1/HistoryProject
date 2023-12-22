import BlueTest from "../assets/blue2.png"
import Eat from "../assets/Food.png"
import ReviewImg from "../assets/Image quest.png"

export async function GetQuestDescription(): Promise<QuestDescription[]> {
    return [
        {
            imageUrl: BlueTest,
            header: "Тайны синей ветки: ключ к загадкам метрополитена",
            time: "60 мин",
            places: "7 станций метро",
            start_point: "станция метро “Электросила”",
            fires: 2
        },
        {
            imageUrl: Eat,
            header: "Гастрономический квест по Санкт-Петербургу",
            time: "60 мин",
            places: "6 ключевых точек",
            start_point: "Дворцовая набережная",
            fires: 1
        },
    ]
}

export async function GetReviews(): Promise<Review[]> {
    return [
        {
            rating: 4.5,
            comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            author: "A. Hvost",
            quest: "#quest",
            image: ReviewImg
        },
        {
            rating: 3.2,
            comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            author: "A. Zabashta",
            quest: "#quest",
            image: ReviewImg
        },
        {
            rating: 5.0,
            comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            author: "G. Kruglov",
            quest: "#quest",
            image: ReviewImg
        }
    ]
}