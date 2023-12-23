export default function ({text}: { text: string }) {
    return (
        <div style={
            {
                height: "24px",
                color: "white"
            }
        }
             className={"col-4 px-5"}
        >
            {text}
        </div>
    )
}