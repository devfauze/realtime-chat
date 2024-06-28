/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useRef} from "react"
import io from 'socket.io-client'

export default function Join({setChatVisibility, setSocket}) {

    const usernameRef=useRef()

    const handleSubmit = async () => {
        const username = usernameRef.current.value
        if(!username.trim()) return
        const socket = await io.connect(process.env.APIURL)
        socket.emit('set_username', username)
        setSocket(socket)
        setChatVisibility(true)
    }

    return(
        <section className="flex justify-center items-center h-screen">
            <div className="w-[35rem] bg-[#271c19] text-white p-4 rounded-lg">
                
                <h1 className="text-center text-2xl">
                    Entre no chat 😀
                </h1>

                <div className="flex items-center justify-center mt-10">

                <input 
                    className="rounded-md h-8 text-center placeholder:text-center text-black hover: hover:scale-105 duration-200"
                    type="text" ref={usernameRef} 
                    placeholder="Nome de usuário"
                />

                <button
                    className="mx-5 px-2 py-1 bg-[#ffc0ad] border-[#ffc0ad] border rounded-lg hover: hover:scale-105 duration-200" 
                    onClick={() => handleSubmit()}>Entrar
                </button>
                
                </div>
            </div>
        </section>
    )
}