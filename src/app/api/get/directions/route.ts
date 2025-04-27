import { NextResponse } from 'next/server'
import { readdirSync, statSync } from 'fs'
import path from 'path'

export async function GET() {
    const baseDir = path.join(process.cwd(), 'public', 'texts')

    try {
        const allFiles = readdirSync(baseDir)
        const directories = allFiles.filter(file => {
            const fullPath = path.join(baseDir, file)
            return statSync(fullPath).isDirectory()
        })

        return NextResponse.json({ directories })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ directories: [] }, { status: 500 })
    }
}