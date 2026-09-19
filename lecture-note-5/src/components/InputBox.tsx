import React, { ReactElement, useState} from "react";

type InputBoxProps = {
  label: string;
  minLength: number;
  maxLength: number;
  onSubmit: (value: string) => void;
};

export default function InputBox(props: InputBoxProps): ReactElement{
    const [observedInput, setInput] = useState<string>("");
    const length = observedInput.length
    const isValid = length <= props.maxLength && length >= props.minLength
    const showError = !isValid && length > 0

    return(
        <>
            <p>{props.label}</p>
            <input 
                value = {observedInput} 
                type = "text" 
                onChange = {(e) => setInput(e.target.value)}
            />
            <button disabled = {!isValid} onClick={() => props.onSubmit(observedInput)}>
                Submit
            </button>
            {showError && <p>Invalid Input</p>}
        </>
    )
}