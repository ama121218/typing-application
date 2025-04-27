import Footer from "@/app/typing-application/play/Footer"
import Header from "@/app/typing-application/play/Header"
import Main from "@/app/typing-application/play/Main"

export default function TypingAppPage(){
    return (
        <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 min-h-screen">
            <Header/>
            <hr className="border-gray-200"/>
            <Main/>
            <hr className="border-gray-200"/>
            <Footer/>
        </div>
    )
}