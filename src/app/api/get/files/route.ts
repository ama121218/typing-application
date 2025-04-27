import fs from 'fs';
import path from 'path';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const dirName = searchParams.get('dirName');

    if (!dirName) {
        return new Response(JSON.stringify({ error: 'ディレクトリ名が指定されていません' }), {
            status: 400,
        });
    }

    // public/texts/ディレクトリのパスを指定
    const directoryPath = path.join(process.cwd(), 'public', 'texts', dirName);

    try {
        // ディレクトリ内のファイルを非同期で取得
        const files = await fs.promises.readdir(directoryPath);

        // ファイルの内容も取得
        const filesContent = await Promise.all(
            files.map(async (file) => {
                const filePath = path.join(directoryPath, file);
                const content = await fs.promises.readFile(filePath, 'utf-8'); // ファイルの内容を読み込む
                const fileNameWithoutExtension = file.replace(/\.txt$/, '')
                return { file:fileNameWithoutExtension, content }; // ファイル名と内容を返す
            })
        );

        // ファイル名と内容を返す
        return new Response(
            JSON.stringify({ files: filesContent }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (err) {
        // エラーハンドリング
        console.error('Error reading directory:', err);
        return new Response(
            JSON.stringify({ error: 'ディレクトリを読み込む際にエラーが発生しました' }),
            { status: 500 }
        );
    }
}