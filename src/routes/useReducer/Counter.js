// 원본
import React, { useReducer, useState } from 'react'

// 공급자
const reducer = (state, action) => { //공급자 : 어떠한 일을 처리해 주는 친구
    console.log('reducer call', state, action.type, action.payload); //type:"increment" 하면 action이 받는다.
    switch(action.type){
        case "increment" :
            return state = state + action.payload; // 처음 초기값 state에다가 payload의 값을 넣으라는 의미
        case "decrement" :
            return state = state - action.payload; 
    }
} 

const Counter = () => {
    // 소비자는 dispatch() 로 요청
    const [state, dispatch] = useReducer(reducer, 5); //state는 0으로 초기화됨 dispatch가 호출되면 reduce가 호출됨
    // const [num, setNum] = useState();
    const increment = () => {
        dispatch({type:"increment", payload : 5})
        console.log(state);
    }
    const decrement = () => {
        dispatch({type:"decrement", payload : 5})
        console.log(state);
    }
  return (
    <div>
        <button onClick={increment}>increment</button>
        <button onClick={decrement}>decrement</button>
    </div>
  )
}

export default Counter