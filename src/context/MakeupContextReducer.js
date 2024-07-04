import { createContext, useContext, useEffect, useState, useReducer } from "react";
import data from '../models/products.json'
import './MakeupContext.css'
import Card from '../components/Card/Card'
import { useSearchParams } from "react-router-dom";


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


export const MakeupContext = createContext()

export const MakeupContextProvider = ({ children })=>{

    const [state, dispatch] = useReducer(fetchReducer, INITIAL_STATE)

    const [ makeup, setMakeup ] = useState(data);
    // const [ isPending, setIsPending ] = useState(true); // useReducer를 가져왔기에 필요없어짐
    const result = !state.loading && makeup.map(item => <Card key={item.id} item={item} />)

    const [id, setId] = useState();
    const findResult = id && makeup.find(item=>item.id === +id) //item의 id가 전달받은 파라미터 id와 같으면 findResult에 넣는다. 

    // from Makeup.js
    const [searchParams, setSearchParams] = useSearchParams();
    
    const queryParams = searchParams.get('brand');
    console.log(queryParams);

    const queryResult = (!state.loading && queryParams) && makeup.filter(item=>item.brand === queryParams);
    const qCardResult = (!state.loading && queryParams) && queryResult.map(item => <Card key={item.id} item={item} />);
    const queryParamsResult = (!state.loading && queryParams) ? qCardResult : result;

    useEffect(()=>{

        dispatch({type : ACTION_TYPES.FETCH_START})

        // 내 컴퓨터의 서버에서 데이터를 가져옴
        fetch('http://localhost:4500/makeup')
        .then(res=>res.json())
        .then(res=>{
            dispatch({type : ACTION_TYPES.FETCH_SUCCESS}) // 로딩되면 값이 바뀌게
            // dispatch({type : ACTION_TYPES.FETCH_SUCCESS, payload : res})
            setMakeup(res) // 이것은 똑같이
        })
        .catch((err) => dispatch({type : ACTION_TYPES.FETCH_ERROR}))

    },[]) 
    return (
        <MakeupContext.Provider value={{ makeup, setMakeup, state, result, findResult, id, setId, searchParams, setSearchParams, queryParamsResult }}>
            { children }
        </MakeupContext.Provider>
    )
}


export const useMakeupContext = ()=>{
    return useContext(MakeupContext)
}