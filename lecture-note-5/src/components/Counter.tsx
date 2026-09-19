import { ReactElement, useState} from "react";
import React from "react";

type CounterProps = {
  label: string;
  onIncrement?: (newValue: number) => void;
};

export default function Counter(props: CounterProps):ReactElement{
    const [observedCounter, setCounter] = useState<number>(0);

    function handleClick(){
        let newValue = observedCounter + 1;
        setCounter(newValue);
        props.onIncrement?.(newValue);
    }
    // inicialmente eu coloquei o p e o button dentro de uma div e o valor não atualizava 
    // não entendo o porquê
    return (
        <>
            <p>{props.label}</p>
            <p>{observedCounter}</p>
            <button onClick={handleClick}>Increment</button>
        </>
    )
}