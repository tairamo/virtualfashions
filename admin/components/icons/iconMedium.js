export default function IconMedium({ type, color }) {

    /// Medium 2px stroke weight, 24x24 bounding box

    var d = ""
    var color = ""

    switch (type) {
        case "warning":
            d = "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            color = "yellow"
            break;
        case "success":
            d = "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            color = "green"
            break;
        case "error":
            d = "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            color = "red"
            break;
        case "avatar":
            d = "M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            color = (color ? color : "gray")
        default:
            d = "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            color = "gray"
            break;
    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke={color}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
        </svg>
    )
}