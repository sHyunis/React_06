//배운것 복습겸 처음부터 게시판 만들어보기
import React from 'react'
import { useBoardContext } from '../../context/BoardContext';
import { useNavigate } from 'react-router-dom';

// context.js로 한 곳에서 데이터 처리
//-1. BoardLayout.js
// 0. 목록보기 /board
// 1. 글쓰기 버튼을 클릭하면 /board/write_board => 글작성 후 저장 => 목록보기
// 2. 수정 버튼 클릭 /board/edit_board/:id => 수정 후 저장 클릭 => 목록보기



const EditBoard = () => {
    const {
        editItem, setEditTitle, setEditBody, onSubmitEditHandle,
      } = useBoardContext();

      const navigate = useNavigate();
      
      const editHandle = (ev) => {
        onSubmitEditHandle(ev)
        navigate('..'); //상위로 이동
      }
  return (
    <div>
        <form className='editForm' 
              id='editForm'
              onSubmit={(ev) => editHandle(ev)}>
          <div>
            <input type='text' 
                  placeholder='title'
                  onChange={(ev)=>{setEditTitle(ev.target.value)}}
                  value={editItem.title}
                  // document.querySelector(id).addEventListener(click,()=>{})    
            />
          </div>
          <textarea placeholder='body'
                    onChange={(ev)=>{setEditBody(ev.target.value)}}
                    value={editItem.body}>
          </textarea>
          <button>수정완료</button>
        </form>
    </div>
  )
}

export default EditBoard