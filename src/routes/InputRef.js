import React, {useEffect, useRef, useState} from 'react'

const InputRef = () => {
    const [user, setUser] = useState();
    const inputRef = useRef();

    useEffect(() => {
        // inputRef.current.focus();
        inputRef.current.placeholder = 'hello ref'
        // inputRef.current.value = 'hello value'
    }, []); // 맨 처음 한 번 떴을 때


    const onChangeHandle = () => {
        setUser(inputRef.current.value);

    }
  return (
    <div>
        <input type='text'  />
        {/* 자체적으로 value를 가지고 있다. */}
        <input type='text' ref={inputRef}
                // onChange={(ev) => setUser(ev.target.value)}      
                onChange={onChangeHandle}      
        />
    </div>
  )
}

export default InputRef