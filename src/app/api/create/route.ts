import { NextRequest, NextResponse } from 'next/server'
import { mkdir, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
    const { dirName, fileName, text } = await req.json()

    if (!dirName || !fileName || !text) {
        return NextResponse.json({ message: '不正なリクエスト' }, { status: 400 })
    }

    const baseDir = path.join(process.cwd(), 'public', 'texts', dirName)

    if (!existsSync(baseDir)) {
        await mkdir(baseDir, { recursive: true })
    }

    const filePath = path.join(baseDir, `${fileName}.txt`)
    await writeFile(filePath, text)

    return NextResponse.json({ message: 'ファイル作成成功' })
}