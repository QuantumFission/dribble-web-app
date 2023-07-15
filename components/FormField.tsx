import { useRef, useEffect } from "react";

type Props = {
  type?: string;
  title?: string;
  icon?: React.ReactNode;
  state: string;
  placeholder: string;
  isTextArea?: boolean;
  main?: boolean;
  setState: (value: string) => void;
};

export default function FormField({
  type,
  title,
  icon,
  state,
  placeholder,
  isTextArea,
  main,
  setState,
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [state]);

  return (
    <div className='flexStart flex-col w-full gap-2'>
      {title && (
        <label className='w-full flex gap-2 items-center text-gray-700 font-bold px-4'>
          {icon}
          {title}
        </label>
      )}
      {isTextArea ? (
        <textarea
          id='tweetTextarea'
          ref={textareaRef}
          placeholder={placeholder}
          value={state}
          required
          className='form_field-textarea'
          style={{
            whiteSpace: "pre-wrap",
            overflowWrap: "break-word",
            wordBreak: "break-word"
          }}
          onChange={(e) => setState(e.target.value)}
        />
      ) : (
        <>
          <input
            type={type || "text"}
            placeholder={placeholder}
            value={state}
            required
            className={main ? "form_field-input-main" : "form_field-input"}
            onChange={(e) => setState(e.target.value)}
          />
        </>
      )}
    </div>
  );
}
