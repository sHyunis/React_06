// 조금 발전된 형태의 Reducer
import React, { useReducer, useState } from 'react'

// 데이터 타입을 따로 만들어놔서 오류를 예방함
const dataType={
    INCREMENT : "increment",
    DECREMENT : "decrement",
}

const initialState = {
    count : 0,
}

// 공급자
// fetch : GET, POST, PUT, DELETE <- http 관리 (요청방식이 4개가 정해져 있다.)
// Reducer : state => 데이터, action.type = 요청(fetch와는 다르게 우리가 정한다), action.payload = 요청할때 주는 데이터
const reducer = (state, action) => { //공급자 : 어떠한 일을 처리해 주는 친구
    console.log('reducer call', state, action.type, action.payload); //type:"increment" 하면 action이 받는다.
    switch(action.type){ //type, payload
        case dataType.INCREMENT :
            return {...state, count : state.count + action.payload } ; // 처음 초기값 state에다가 payload의 값을 넣으라는 의미
        case dataType.DECREMENT :
            return {...state, count : state.count - action.payload } //객체로 만들었으니 저장하는 방식을 스프레드 연산자를 사용한다.
    }
} 

const Counter = () => {
    // 소비자는 dispatch() 로 요청
    const [state, dispatch] = useReducer(reducer, initialState); //state는 0으로 초기화됨 dispatch가 호출되면 reduce가 호출됨
    // const [num, setNum] = useState();
    const increment = () => {
        dispatch({type:dataType.INCREMENT, payload : 5})
        console.log(state.count);
    }
    const decrement = () => {
        dispatch({type:dataType.DECREMENT, payload : 5})
        console.log(state.count);
    }
  return (
    <div>
        <button onClick={increment}>increment</button>
        <button onClick={decrement}>decrement</button>
    </div>
  )
}

export default Counter