// @ts-ignore
export default function ({title, text, icon, isDark = false}: {
    title: string,
    text: string,
    icon: string,
    isDark?: boolean
}) {
    return (
        <div className={"col-lg-4 px-3 mb-lg-0 mb-3"}>
            <div className=" d-flex flex-column align-items-center h-100"
                 style={{
                     backgroundColor: isDark ? "#9EC5FE" : "#CFE2FF",
                     borderRadius: "0.94rem",
                 }}
            >
                <div className={"my-3"}>
                    <div className={"rounded-circle bg-white d-flex align-items-center justify-content-center"}
                         style={{
                             display: "block",
                             width: 72,
                             height: 72
                         }}>
                        <i className={`bi ${icon} `}
                           style={{
                               fontSize: "3rem"
                           }}
                        ></i>
                    </div>

                </div>
                <div className="fw-bold fs-3 mb-1 text-center px-2">
                    {title}
                </div>
                <div className={"text-center mb-5 px-4"}>
                    {text}
                </div>
            </div>
        </div>
    )
}