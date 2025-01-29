import "./style.scss"

interface TextareaProps {
  name?: string
  placeholder?: string
  value: string
  required?: boolean
  autoFocus?: boolean
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}
const Textarea = ({
  name,
  placeholder,
  value,
  required,
  autoFocus,
  onChange
}: TextareaProps) => {
  return (
    <div className={"textarea-wrapper"}>
      <textarea
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        autoFocus={autoFocus}
        onChange={onChange}
      />
    </div>
  )
}

export default Textarea
