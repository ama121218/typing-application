'use client'
import { useState } from "react"

export default function CreatePage() {
    const [dirName, setDirName] = useState("")
    const [fileName, setFileName] = useState("")
    const [text, setText] = useState("")

    const [dirList, setDirList] = useState<string[]>([])
    const [showDirList, setShowDirList] = useState(false)

    const invalidChars = /[\\\/:*?"<>|]/

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
        const value = e.target.value
        if (invalidChars.test(value)) return
        setter(value)
    }

    const handleSubmit = async () => {
        if (!dirName || !fileName || !text) {
            alert('ディレクトリ名、タイトル、内容をすべて入力してください')
            return
        }

        await fetch('http://localhost:3000/api/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dirName, fileName, text }),
        })

        alert('保存しました！')
        setFileName("")
        setText("")
    }

    const fetchDirectories = async () => {
        const res = await fetch('http://localhost:3000/api/get/directions')
        const data = await res.json()
        setDirList(data.directories)
        setShowDirList(true)
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
            <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-xl">
                <h1 className="text-3xl font-extrabold text-center mb-8 text-blue-600">
                    タイピングテキスト作成
                </h1>

                <div className="mb-4 relative">
                    <label className="block text-purple-600 font-semibold mb-2">ディレクトリ名</label>
                    <input
                        value={dirName}
                        onChange={(e) => handleInputChange(e, setDirName)}
                        onFocus={fetchDirectories}
                        onBlur={() => setTimeout(() => setShowDirList(false), 100)}
                        className="border border-purple-300 rounded-xl w-full p-3 bg-purple-50 focus:ring-4 focus:ring-purple-300 focus:outline-none"
                        placeholder="例: lesson1"
                    />
                    {showDirList && (
                        <div className="absolute left-0 right-0 mt-1 border border-gray-300 rounded-xl bg-white shadow-lg z-10 min-w-full overflow-hidden">
                            {dirList.map((dir, idx) => (
                                <div
                                    key={idx}
                                    className="px-4 py-2 text-gray-700 hover:bg-purple-100 hover:text-purple-800 transition-colors duration-150 cursor-pointer text-sm"
                                    onMouseDown={() => {
                                        setDirName(dir);
                                        setShowDirList(false);
                                    }}
                                >
                                    {dir}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-green-600 font-semibold mb-2">タイトル</label>
                    <input
                        value={fileName}
                        onChange={(e) => handleInputChange(e, setFileName)}
                        className="border border-green-300 rounded-xl w-full p-3 bg-green-50 focus:ring-4 focus:ring-green-300 focus:outline-none"
                        placeholder="例: typing-practice"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-pink-600 font-semibold mb-2">テキスト内容</label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="border border-pink-300 rounded-xl w-full h-40 p-3 bg-pink-50 focus:ring-4 focus:ring-pink-300 resize-none focus:outline-none"
                        placeholder="ここにタイピングテキストを書いてください..."
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-blue-400 to-purple-500 hover:scale-105 hover:brightness-110 text-white font-bold py-3 px-4 rounded-2xl transition transform duration-300 ease-in-out focus:outline-none"
                >
                    保存する
                </button>
            </div>
        </div>
    )
}