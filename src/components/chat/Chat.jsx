/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useRef, useState, useEffect } from "react"


export default function Chat({socket}){

    const messageRef = useRef()
    const [messageList, setMessageList] = useState([])

    useEffect(() => {
        socket.on('receive_message', data => {
            setMessageList((current) => [...current, data])
        })

        return () => socket.off('receive_message')
    }, [socket])

    const handleSubmit = () => {
        const message = messageRef.current.value
        if(!message.trim()) return

        socket.emit('message', message)
        socket.emit('date', new Date().getHours())
        clearInput()
        focusInput()
    }

    const clearInput = () =>{
        messageRef.current.value = ''
    }

    const focusInput = () =>{
        messageRef.current.focus()
    }

    const getEnterKey = (enter) =>{
        if(enter.key === 'Enter')
        handleSubmit()
    }

    return(
        <section className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-[#fffffe] text-3xl w-[400px]">
                    Chat
            </h1>
            <div className={`h-[35rem] w-[400px] overflow-auto rounded-lg bg-[#271c19]`}>  
                <div className=" mx-5 my-5">
                {        
                    messageList.map((message, index) => (
                        <div className={`flex max-w-screen ${message.authorId === socket.id ? 'justify-end' : '' }`} key={index}>
                            <div className={`max-w-[250px] mt-2.5 px-2.5 py-[5px] rounded-[7px] ${message.authorId === socket.id ? 'bg-[#55423d]' : 'bg-[#55423d8e]' }`}>
                                <div className="text-[#ffc0ad]"><strong>{message.author}</strong></div>
                                <div className="text-[#fffffe]">{message.text}</div>
                            </div>
                        </div>
                    ))
                }
                </div>
            </div>

                <div className="flex w-[400px] mx-5 my-5">
                    <input 
                    className="mr-5 w-[25rem] box-border rounded-lg flex items-center h-[50px] px-2.5 py-0 bottom-0"
                        type="text" 
                        ref={messageRef} 
                        onKeyDown={(enter) => getEnterKey(enter)} 
                        placeholder="Mensagem"
                    />

                    <button 
                        className="bg-[#ffc0ad] rounded-lg w-fit text-white hover: hover:scale-105 duration-200 hover:bg-[#271c19]"
                        onClick={() => handleSubmit()}>
                        <p className="p-3 text-[#271c19] font-bold hover: hover:scale-105 duration-200 hover:text-[#ffc0ad]">Enviar</p>
                    </button>
                </div>

            
        </section>
    )
}