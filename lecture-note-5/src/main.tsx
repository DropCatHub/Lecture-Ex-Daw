import { createRoot } from "react-dom/client";
import React from "react";
import Counter from "./components/Counter";
import InputBox from "./components/InputBox";

createRoot(document.getElementById("container")!).render(
  //<Counter label="Contador" onIncrement={(v) => console.log(v)} />
    <InputBox 
        label="Input Box" 
        maxLength= {5} 
        minLength={3} 
        onSubmit={(value:string) => console.log({value})}
    >
    </InputBox>
);