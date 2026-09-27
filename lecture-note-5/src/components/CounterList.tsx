import { act, useReducer } from "react";
import React from "react";
import InputBox from "./InputBox";
import Counter from "./Counter";

// State for an individual counter
type CounterState = {
  label: string;
  value: number;
};
// State for the complete component
type State = {
  sum: number;
  counters: Array<CounterState>;
};

// Type of the possible actions
type Action =
  | { type: "addCounter"; label: string }
  | { type: "removeCounter"; index: number }
  | { type: "valueUpdate"; index: number; newValue: number };


const initialCounterList: State = {sum: 0, counters: []};

export default function CounterList(){
    const [observedCounterList, dispatch] = useReducer(counterListReducer, initialCounterList)

    function counterListReducer(counters: State, action: Action): State{
        if(action.type === 'addCounter'){
          return {
            sum: counters.sum,
            counters: [...counters.counters, {label: action.label, value: 0}]
          }
        }else if(action.type === 'removeCounter'){
          let removedCounter = counters.counters[action.index]
          return {
            sum: counters.sum - removedCounter.value,
            counters: [...counters.counters.slice(0, action.index), ...counters.counters.slice(action.index + 1)]
          }
        }else{
          return {
            sum: counters.sum + 1,
            counters: [...counters.counters.map((counter, index) => {
              if(index === action.index){
                return {label: counter.label, value: action.newValue}
              }else{return counter}
            })]
          }
        }
    }

    function handleDeleteTask(counterId: number){
      dispatch({
        type: 'removeCounter', 
        index: counterId
      });
    }

    function handleValueUpdate(index: number, newValue: number){
      dispatch({
        type: 'valueUpdate',
        index: index,
        newValue: newValue
      });
    }

    function handleAddCounter(label: string){
      dispatch({
        type: 'addCounter',
        label: label
      })
      
    }

    return (
      <>
        <InputBox 
          label="counter list" 
          minLength={1} 
          maxLength={10}
          onSubmit={(value: string) => handleAddCounter(value)}
        ></InputBox>
        <p>Counters Total Amount:{observedCounterList.sum}</p>
        {observedCounterList.counters.map((counter, index) => (
              <div key={index}>
                <Counter label= {counter.label} onIncrement= {(newValue: number) =>handleValueUpdate(index, newValue)}></Counter>
                <button onClick={() => handleDeleteTask(index)}>Delete</button>
              </div>
          ))
        }
      </> 
    )




}