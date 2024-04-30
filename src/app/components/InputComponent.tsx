import { FieldError, FieldErrorsImpl, Merge, UseFormRegisterReturn } from "react-hook-form"

interface InputProps{
  label?: string
  type?: 'text' | 'password' | 'email' | 'file'
  ClassNameInput?: string
  ClassNameLabel?: string
  placeholder?: string
  register?: UseFormRegisterReturn;
}

export default function InputComponent({ label, type, ClassNameInput, ClassNameLabel, placeholder, register }: InputProps){
  return(
    <div>
      <label className={`${ClassNameLabel}`}>
        {label}
      </label>
      <div>
        <input {...register} className={`focus:border-ignite-300 border-[2px] outline-none bg-gray-900 rounded-lg p-2 text-white text-sm ${ClassNameInput}`} placeholder={placeholder} type={type} />
      </div>
    </div>
  )
}