import SendPushNotification from "../utils/PushProtocol"

export const Dashboard = () => {

    return (
        <div><button onClick={() => SendPushNotification("0x4bdB8234AD81F26985d257F36a2d2d8c30365546")}>Hola</button></div>
    )
}