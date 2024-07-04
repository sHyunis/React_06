//배운것 복습겸 처음부터 게시판 만들어보기
import React from 'react'
import { useBoardContext } from '../../context/BoardContext';
import { useNavigate } from 'react-router-dom';

// context.js로 한 곳에서 데이터 처리
//-1. BoardLayout.js
// 0. 목록보기 /board
// 1. 글쓰기 버튼을 클릭하면 /board/write_board => 글작성 후 저장 => 목록보기
// 2. 수정 버튼 클릭 /board/edit_board/:id => 수정 후 저장 클릭 => 목록보기



const WriteBoard = () => {
  
  const {
    title, setTitle,
    body, setBody, onSubmitHandle
  } = useBoardContext();

  const navigate = useNavigate();
  const writeHandle = (ev) => {
    onSubmitHandle(ev);
    navigate('/board') //상위로 이동
  }

  return (
    <div>
      

      <form className='inputForm' 
            id='inputForm'
            onSubmit={(ev) => writeHandle(ev)}>
        <div>
          <input type='text' 
                placeholder='title'
                onChange={(ev)=>{setTitle(ev.target.value)}}
                value={title}
                // document.querySelector(id).addEventListener(click,()=>{})    
          />
        </div>
        <textarea placeholder='body'
                  onChange={(ev)=>{setBody(ev.target.value)}}
                  value={body}>
        </textarea>
        <button>등록</button>
      </form>
      
      
    </div>
  )
}

export default WriteBoard