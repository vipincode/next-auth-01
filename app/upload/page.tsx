'use client'

import { CldUploadWidget, CldImage } from 'next-cloudinary'
import { useState } from 'react'

interface CloudinaryResult {
  public_id: string
}

const UploadPage = () => {
  const [publicId, setPublicId] = useState('')
  return (
    <div>
      {publicId && <CldImage src={publicId} width={270} height={180} alt="A spiritual image" />}
      <CldUploadWidget
        options={{
          sources: ['local'],
        }}
        uploadPreset="e4ewjbsg"
        onUpload={(result, widget) => {
          if (result.event !== 'success') return
          const info = result.info as CloudinaryResult
          setPublicId(info.public_id)
          // console.log(info)
        }}
      >
        {({ open }) => {
          return (
            <button className="btn btn-primary" onClick={() => open()}>
              Upload
            </button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}

export default UploadPage
