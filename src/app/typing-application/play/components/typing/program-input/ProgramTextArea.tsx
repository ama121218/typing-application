'use client'

import {useEffect, useRef, useState} from "react";

type ProgramTextAreaProps = {
    programCode: string
    setProgramCodeAction: React.Dispatch<React.SetStateAction<string>>
    content: string
    setCorrectFlagAction: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ProgramTextArea({programCode, setProgramCodeAction, content, setCorrectFlagAction}: ProgramTextAreaProps){

    const textareaRef = useRef<HTMLTextAreaElement | null>(null)

    const [isDisabled, setIsDisabled] = useState<boolean>(false)

    const correctSound = new Audio("/sound/correct_answer.mp3")

    //Tabを押したときにインデント挿入
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Tab') {
            e.preventDefault(); // デフォルトのTab動作を無効化

            const textarea = e.currentTarget;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const spaces = '    '; // 空白4つ

            // 現在の行を対象に空白を挿入
            const lines = programCode.split('\n'); // 複数行の分割
            const currentLineIndex = textarea.value.substring(0, start).split('\n').length - 1;
            const currentLine = lines[currentLineIndex];

            // カーソル位置に空白を挿入
            const newLine =
                currentLine.substring(0, start - textarea.value.lastIndexOf('\n', start - 1) - 1) +
                spaces +
                currentLine.substring(end - textarea.value.lastIndexOf('\n', start - 1) - 1);

            // 更新された行を挿入
            lines[currentLineIndex] = newLine;
            const newValue = lines.join('\n');

            setProgramCodeAction(newValue);

            // カーソル位置を調整
            requestAnimationFrame(() => {
                textarea.selectionStart = textarea.selectionEnd = start + spaces.length;
            });
        }
    };

    const renderText = () => {
        const renderedText = [];
        for (let i = 0; i < content.length; i++) {
            if (i < programCode.length && content[i] === programCode[i]) {
                renderedText.push(
                    <span key={i} className="text-black">{content[i]}</span>
                )
            } else {
                renderedText.push(
                    <span key={i} className="text-gray-400">{content[i]}</span>
                )
            }
        }
        return renderedText
    }

    useEffect(() => {
        console.log("programCode:" + programCode)
        console.log("content:" + content)
        if (content) {
            if (programCode === content) {
                correctSound.play()
                setIsDisabled(true);
                setCorrectFlagAction(true);
                console.log("正解")
            }else{
                if (textareaRef.current)textareaRef.current.focus()
                setIsDisabled(false);
                setCorrectFlagAction(false);
            }
        }
    }, [programCode, content]);

    return (
        <div className="relative w-full">
            {/* ユーザーがタイピングするテキストエリア */}
            <textarea
                ref={textareaRef}
                spellCheck="false"
                className="w-full min-h-[400px] resize-none pl-1 pb-5 focus:outline-none overflow-hidden overflow-x-auto bg-transparent text-black z-10 font-mono"
                wrap="off"
                value={programCode}
                onKeyDown={handleKeyDown}
                onChange={(e) => setProgramCodeAction(e.target.value)}
                disabled={isDisabled}
            />

            {/* 背景に問題文（content）を表示 */}
            <p className="absolute top-0 left-0 pl-1 w-full text-gray-400 z-0 pointer-events-none font-mono"
               style={{whiteSpace: 'pre-wrap'}}>
                {renderText()}
            </p>
        </div>
    );
}


