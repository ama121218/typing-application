'use client'

import SelectDirectory from "@/app/typing-application/play/components/SelectDirectory";
import Game from "@/app/typing-application/play/components/typing/Game";
import {useEffect, useState} from "react";

export default function TypingAppComponent(){

    const [dirName, setDirName] = useState("")
    const [startGame, setStartGame] = useState(false)





    return(
        <div>
            <SelectDirectory dirName={dirName} setDirNameAction={setDirName} startGame={startGame} setStartGameAction={setStartGame}/>
            <hr className={"border-gray-200"} />
            {startGame &&
                <div>
                    <Game startGame={startGame} dirName={dirName} />
                </div>
            }
        </div>
    )
}
