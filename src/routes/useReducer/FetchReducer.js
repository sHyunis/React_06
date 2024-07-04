// 데이터의 상태 읽기, 쓰기, 완료
// 읽기 : pending, 에러 : error, 완료 : loading
// loading, error, post <= 이런 상태 만들기

import { useReducer } from "react";

// action은 별도 파일로 빼두기
const ACTION_TYPES = {
    FETCH_START : "FETCH_START", // 시작했나
    FETCH_SUCCESS : "FETCH_SUCCESS", // 읽기를 성공했나. 
    FETCH_ERROR : "FETCH_ERROR", //읽기가 에러가 났나
}

const INITIAL_STATE = {
    loading : false,
    error : false,
    post : {}
}

// reducer
const fetchReducer = (state, action) =>{
    switch(action.type){ //액션 타입
        case ACTION_TYPES.FETCH_START :
            return {
                loading : true, // 읽기를 시작했으면 로딩으로 바꾼다.
                error : false,
                post : {}, // post는 기본값
            }
        
        case ACTION_TYPES.FETCH_SUCCESS :
            return {
                ...state, // 기존 값을 갖고 있어야 한다.
                loading : false,
                post : action.payload, 
            }
        
        case ACTION_TYPES.FETCH_ERROR :
            return {
                error : true,
                loading : false,
                post : {}, 
            }
        
    }
}

const Post = () => {
    const [state, dispatch] = useReducer(fetchReducer, INITIAL_STATE); // state를 원래 3개 정해야 하지만 reducer를 이용해 하나만 사용
    // state에 INITIAL_STATE의 값을 저장하고,
    // dispatch에 FetchReducer속 action 3가지는 사용할 수 있다는 의미(START, SUCCESS, ERROR)
    console.log(state);

    const fetchHandle = () => {
        dispatch({type : ACTION_TYPES.FETCH_START}); // 상태를 FETCH_START로 바꿔라

        fetch('http://localhost:4500/board')
        // fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then((res) => res.json())
        .then((res) => { // 이 안에 들어오면 다 읽어 들어온 것이라 상태를 바꾼다.
            dispatch({type : ACTION_TYPES.FETCH_SUCCESS, payload : res}); // 완료 되면 상태 바꾸고
        })
        .catch((err) => { //에러나면 상태 바꾼다.
            dispatch({type : ACTION_TYPES.FETCH_ERROR})// 에러는 payload 없다.
        })
    }

    return (
        <div>
            <button onClick={fetchHandle}>
                {/* {state.loading ? "loading..." : state.post} // 원래 써야 하는 것 */ } 
                {state.loading ? "loading..." : "fetch 하려면 클릭"}
            </button>
            <h2>{state.post.title}</h2>
            <p>{state.post.body}</p>
            <span>{state.error && "데이터를 찾을 수 없습니다."}</span>
        </div>
    )
}

export default Post;