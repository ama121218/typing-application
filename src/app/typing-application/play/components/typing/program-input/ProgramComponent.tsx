'use client'

import React, {useEffect, useState} from "react";
import LineNumbers from "@/app/typing-application/play/components/typing/program-input/LineNumbers";
import ProgramTextArea from "@/app/typing-application/play/components/typing/program-input/ProgramTextArea";

type ProgramComponentProps = {
    content: string
    setCorrectFlagAction: React.Dispatch<React.SetStateAction<boolean>>
    correctFlag: boolean
}

export default function ProgramComponent({content, correctFlag, setCorrectFlagAction}: ProgramComponentProps){

    const [programCode, setProgramCode] = useState<string>(""); // ユーザーの入力
    const [lineNumbers, setLineNumbers] = useState<string[]>(["1"]); // 行番号

    //programCode変更時に改行コードを数えてlineNumbersに反映
    useEffect(() => {
        const lineLength = (programCode.match(/\n/g) || []).length + 1
        const newLineNumbers = Array.from({ length: lineLength }, (_, i) => (i + 1).toString())
        setLineNumbers(newLineNumbers)
    }, [programCode]);

    useEffect(() => {
        if(correctFlag)setProgramCode("")
    }, [correctFlag]);

    return (
        <div className="h-full flex flex-col">
            <div className="relative flex flex-start border border-gray-200 h-full">
                <LineNumbers lineNumbers={lineNumbers} />
                <ProgramTextArea programCode={programCode} setProgramCodeAction={setProgramCode} content={content} setCorrectFlagAction={setCorrectFlagAction} />
            </div>
        </div>
    )
}