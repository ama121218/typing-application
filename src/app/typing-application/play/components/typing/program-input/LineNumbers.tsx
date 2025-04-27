type LineNumbersProps = {
    lineNumbers: string[]
}

export default function LineNumbers({lineNumbers}: LineNumbersProps){
    return (
        <div className="border-r border-gray-200 pr-1 pb-5 w-11 flex-shrink-0 bg-gray-100">
            {lineNumbers.map((lineNumber) => (
                <div key={lineNumber} className="text-right">
                    {lineNumber}
                </div>
            ))}
        </div>
    )
}