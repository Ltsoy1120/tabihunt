import React, { useRef, useState } from "react"
import { classMerge } from "../../../helpers/common"
import Button from "../buttons/Button"
import Icon from "../Icon"
import "./style.scss"

interface FileInputProps {
  name: string
  value?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onDrop?: (newFile: File) => void
}

const FileInput = ({ name, value, onChange, onDrop }: FileInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const activateInput = () => {
    inputRef.current?.click()
  }

  const [isFileActive, setFileActive] = useState(false)

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setFileActive(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setFileActive(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setFileActive(false)
    const newFile = e.dataTransfer.files[0]
    onDrop && onDrop(newFile)
  }

  return (
    <div
      className={classMerge(
        name === "rulesUrl" ? "doc-file-input" : "file-input",
        isFileActive ? "drag" : ""
      )}
    >
      {name === "rulesUrl" ? (
        <Button type="button" onClick={activateInput}>
          Загрузить файл
        </Button>
      ) : (
        <div
          className="file-input__content"
          onClick={activateInput}
          onDrop={handleDrop}
          onDragOver={handleDrag}
          onDragEnter={handleDrag}
          onDragLeave={handleDragLeave}
        >
          <Icon name="upload-file" size={50} />
          <span>Загрузите файл или перетащите его сюда файл</span>
          <Button type="button">Выбрать файл</Button>
        </div>
      )}

      <input
        name={name}
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default FileInput
