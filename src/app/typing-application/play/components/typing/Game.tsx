'use client'
import { useEffect, useState } from "react";
import ProgramComponent from "@/app/typing-application/play/components/typing/program-input/ProgramComponent";

type GameProps = {
    startGame: boolean
    dirName: string
}

export default function Game({ startGame, dirName }: GameProps) {

    const [files, setFiles] = useState<{ file: string; content: string }[]>([]);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [correctFlag, setCorrectFlag] = useState<boolean>(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0); // 現在の問題番号
    const [isGameOver, setIsGameOver] = useState<boolean>(false)

    const [gameStartTime, setGameStartTime] = useState<number | null>(null); // ゲーム開始時刻
    const [gameEndTime, setGameEndTime] = useState<number | null>(null);

    useEffect(() => {
        const fetchFiles = async () => {
            const res = await fetch(`http://localhost:3000/api/get/files?dirName=${dirName}`);
            const data = await res.json();
            const shuffledFiles = data.files.sort(() => Math.random() - 0.5); // ランダムにシャッフル
            setFiles(shuffledFiles); // シャッフルされたファイルをセット
        };
        if (dirName) fetchFiles();
    }, [startGame, dirName]);

    useEffect(() => {
        // ファイルが取得できたら最初の問題を表示
        if (files.length > 0 && currentQuestionIndex < files.length) {
            const currentFile = files[currentQuestionIndex];
            setTitle(currentFile.file); // ランダムに選ばれたファイル名をタイトルとして設定
            setContent(currentFile.content); // content（テキスト内容）を問題として設定
        }
    }, [files, currentQuestionIndex]);

    useEffect(() => {
        // 正解フラグが立ったら次の問題に進む
        if (correctFlag) {
            if (currentQuestionIndex + 1 < files.length) {
                setCorrectFlag(false);
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setCorrectFlag(false)
            } else {
                setIsGameOver(true);
            }
        }
    }, [correctFlag, currentQuestionIndex, files.length]);

    useEffect(() => {
        if (startGame) {
            setGameStartTime(Date.now())
            setGameEndTime(null)
        }
    }, [startGame]);

    useEffect(() => {
        if (isGameOver && gameStartTime && !gameEndTime) {
            setGameEndTime(Date.now()); // ゲーム終了時に終了時刻を設定
        }
    }, [isGameOver, gameStartTime, gameEndTime]);

    // ゲーム時間を計算する関数
    const getGameDuration = () => {
        if (gameStartTime && gameEndTime) {
            const duration = gameEndTime - gameStartTime;
            const seconds = Math.floor(duration / 1000);
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes}分 ${remainingSeconds}秒`;
        }
        return null;
    };

    return (
        <div>
            {isGameOver ? (
                <div>
                    <div className="text-red-500 font-bold text-xl mt-4 ml-2">ゲーム終了！</div>
                    <div className="text-lg font-semibold mt-4 ml-2">
                        ゲーム時間: {getGameDuration()}
                    </div>
                </div>
            ) :
            <div className="flex flex-col items-center min-h-screen">
                <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-5xl">
                    <div className="mb-4 text-xl font-semibold">
                        <p>{title}</p>
                    </div>
                    <ProgramComponent content={content} setCorrectFlagAction={setCorrectFlag} correctFlag={correctFlag} />
                </div>
            </div>
        }
        </div>
    )
}