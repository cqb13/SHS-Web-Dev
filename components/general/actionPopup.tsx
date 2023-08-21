import ActionPopup from "@/types/actionPopup";
import { useState } from "react";

export default function ActionPopup({
  title,
  message,
  inputVisible,
  expectedInput,
  confirmText,
  onConfirm,
  cancelText,
  onCancel
}: ActionPopup) {
  const [input, setInput] = useState<string>("");

  const handleConfirm = () => {
    if (inputVisible && input !== expectedInput) {
      return;
    }

    onConfirm();
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleInput = (e: any) => {
    setInput(e.target.value);
  };

  return (
    <section className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
      <div className='rounded-md bg-light p-4'>
        <h3 className='text-lg font-medium'>{title}</h3>
        <p>{message}</p>
        {inputVisible && (
          <input
            type='text'
            className='bg-highlight p-2 rounded-lg w-full placeholder:text-dark focus:outline-none'
            onChange={handleInput}
            placeholder={`Enter ${expectedInput}`}
          />
        )}
        <div className='flex gap-2'>
          <button
            onClick={handleCancel}
            className='bg-highlight hover:opacity-90 hover:rounded-lg p-2 flex-1 rounded-md focus:outline-none transition-all ease-in-out'
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className='bg-red-500 hover:bg-red-400 hover:rounded-lg p-2 flex-1 rounded-md focus:outline-none transition-all ease-in-out'
          >
            {confirmText}
          </button>
        </div>
      </div>
    </section>
  );
}
