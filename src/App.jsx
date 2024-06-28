import { useState } from "react"
import Join from "./components/join/Join"
import Chat from "./components/chat/Chat"

export default function App() {

  const [chatVisibility, setChatVisibility] = useState(false)
  const [socket, setSocket] = useState(null)

  return (
    <div className="">
    {
      chatVisibility ? <Chat socket={socket}/> : <Join setSocket={setSocket} setChatVisibility={setChatVisibility}/>
    }
    </div>
  )
}
