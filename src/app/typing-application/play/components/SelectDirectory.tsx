'use client'
import {useState} from "react";

type SelectDirectoryProps = {
    dirName: string
    setDirNameAction: React.Dispatch<React.SetStateAction<string>>
    startGame: boolean
    setStartGameAction: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SelectDirectory({ dirName, setDirNameAction, startGame, setStartGameAction }: SelectDirectoryProps){
    const [dirList, setDirList] = useState<string[]>([])
    const [showDirList, setShowDirList] = useState(false)

    const fetchDirectories = async () => {
        const res = await fetch('http://localhost:3000/api/get/directions')
        const data = await res.json()
        setDirList(data.directories)
        setShowDirList(true)
    }
    const handleStart = () => {
        if (dirName) {
            console.log('Starting with directory:', dirName)
            setStartGameAction(!startGame)
        } else {
            alert('ディレクトリを選択してください')
        }
    }

    return (
        <div>{!startGame ?
            <div className="flex items-center space-x-4 w-full px-2">
                <div className="mb-4 relative flex-grow">
                    <label className="block text-purple-600 font-semibold mb-2">ディレクトリ名</label>
                    <div>
                        <input
                            value={dirName}
                            onChange={(e) => setDirNameAction(e.target.value)}
                            onFocus={fetchDirectories}
                            onBlur={() => setTimeout(() => setShowDirList(false), 100)}
                            className="border border-purple-300 rounded-xl w-64 p-3 bg-purple-50 focus:ring-4 focus:ring-purple-300 focus:outline-none h-12"
                            placeholder="例: lesson1"
                        />
                        {showDirList && (
                            <div
                                className="absolute left-0 mt-1 border border-gray-300 rounded-xl bg-white shadow-lg z-10 w-64 overflow-hidden"
                            >
                                {dirList.map((dir, idx) => (
                                    <div
                                        key={idx}
                                        className="px-4 py-2 text-gray-700 hover:bg-purple-100 hover:text-purple-800 transition-colors duration-150 cursor-pointer text-sm"
                                        onMouseDown={() => {
                                            setDirNameAction(dir);
                                            setShowDirList(false);
                                        }}
                                    >
                                        {dir}
                                    </div>
                                ))}
                            </div>
                        )}
                        <button
                            onClick={handleStart}
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white rounded-lg shadow-xl hover:scale-105 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out transform h-12"
                        >
                            開始
                        </button>
                    </div>
                </div>
            </div>
            :
            <button
                onClick={handleStart}
                className="ml-4 mb-3 px-6 py-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white rounded-lg shadow-xl hover:scale-105 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out transform h-12"
            >
                Stop
            </button>
        }
        </div>
    )
}