import { promises as fs } from 'fs'
import path from 'path'
import crypto from 'crypto'

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'demo-uploads')

export const ensureUploadDir = async (): Promise<void> => {
  await fs.mkdir(UPLOAD_DIR, { recursive: true })
}

export const saveUploadedFile = async (file: File, prefix: string): Promise<string> => {
  await ensureUploadDir()

  const arrayBuffer = await file.arrayBuffer()
  const bytes = new Uint8Array(arrayBuffer)

  const extFromName = (() => {
    const idx = file.name.lastIndexOf('.')
    if (idx === -1) return ''
    return file.name.slice(idx)
  })()

  const safeExt = extFromName && extFromName.length <= 8 ? extFromName : ''
  const filename = `${prefix}_${crypto.randomBytes(8).toString('hex')}${safeExt}`
  const absPath = path.join(UPLOAD_DIR, filename)

  await fs.writeFile(absPath, bytes)

  return `/demo-uploads/${filename}`
}
