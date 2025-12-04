import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      image,
      backgroundImage,
      watermarkSettings,
      detectionSettings,
      logoSettings,
      backgroundReplacement,
      apiKey,
      userId,
      contentType,
    } = body

    if (!image || !apiKey) {
      return NextResponse.json({ error: 'Missing required fields: image or apiKey' }, { status: 400 })
    }

    const formData = new FormData()

    // Helper to convert base64 string (without data URI prefix) to Blob
    const base64ToBlob = (base64: string, type: string) => {
      const buffer = Buffer.from(base64, 'base64')
      const uint8 = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength)
      return new Blob([uint8 as unknown as BlobPart], { type })
    }

    const mimeType = contentType || 'image/jpeg'

    // Image
    formData.append('image', base64ToBlob(image, mimeType), 'image.jpg')

    // Background image
    if (backgroundImage) {
      formData.append('background_image', base64ToBlob(backgroundImage, mimeType), 'background.jpg')
    }

    // Watermark
    if (watermarkSettings?.text) {
      formData.append('watermark_text', watermarkSettings.text)
      if (watermarkSettings.position) formData.append('watermark_position', watermarkSettings.position)
      if (typeof watermarkSettings.size === 'number') formData.append('watermark_size', String(watermarkSettings.size))
      if (typeof watermarkSettings.opacity === 'number') formData.append('watermark_opacity', String(watermarkSettings.opacity))
      if (watermarkSettings.color) formData.append('watermark_color', watermarkSettings.color)
    }

    // Detection toggles
    if (typeof detectionSettings?.blurFaces === 'boolean') {
      formData.append('blur_faces', String(detectionSettings.blurFaces))
    }
    if (typeof detectionSettings?.blurLicensePlates === 'boolean') {
      formData.append('blur_license_plates', String(detectionSettings.blurLicensePlates))
    }

    // Logo
    if (logoSettings?.url) {
      formData.append('logo_url', logoSettings.url)
      if (logoSettings.position) formData.append('logo_position', logoSettings.position)
    }

    // Background label (optional, from template)
    if (backgroundReplacement?.template) {
      formData.append('background_label', String(backgroundReplacement.template))
    }

    const externalResponse = await fetch('http://77.104.167.149:43159/api/v1/generate-external', {
      method: 'POST',
      headers: {
        Authorization: apiKey,
        Accept: 'image/png',
      },
      body: formData,
    })

    if (!externalResponse.ok) {
      const text = await externalResponse.text().catch(() => '')
      return NextResponse.json(
        { error: 'Failed to process image', details: text },
        { status: externalResponse.status },
      )
    }

    const arrayBuffer = await externalResponse.arrayBuffer()
    const base64Image = Buffer.from(arrayBuffer).toString('base64')
    const dataUri = `data:image/png;base64,${base64Image}`

    return NextResponse.json({ maskedImage: dataUri })
  } catch (error) {
    console.error('process-image route error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
