//배운것 복습겸 처음부터 게시판 만들어보기
import React from 'react'
import { useBoardContext } from '../../context/BoardContext'
import { Link, useNavigate } from 'react-router-dom';

// context.js로 한 곳에서 데이터 처리
//-1. BoardLayout.js
// 0. 목록보기 /board
// 1. 글쓰기 버튼을 클릭하면 /board/write_board => 글작성 후 저장 => 목록보기
// 2. 수정 버튼 클릭 /board/edit_board/:id => 수정 후 저장 클릭 => 목록보기



const Board = () => {
  const {
    posts, deleteHandle, updateHandle,
    search, searchPosts,
    onSearchHandle, onSearchChangeHandle
  } = useBoardContext();

  const navigate =  useNavigate();


  const gotoEdit = (id) => {
    updateHandle(id);
    navigate('edit_board')
  }

  return (
    <div>
      <form className='search' id='search'
            onSubmit={(ev) => onSearchHandle(ev)}
      >
        <input type='search' 
                placeholder='search Here!'
                onChange={(ev)=>{onSearchChangeHandle(ev)}}
                value={search}
          />
      </form>

      <Link to='write_board'>글쓰기</Link>

      <div>
        {
          posts.length && searchPosts.map((post)=>(
            <div key={post.id}>
              <h2>{post.id} {post.title}</h2>
              <p>{post.body}</p>
              <p>{post.datetime}</p>
              <p>
                <button onClick={()=>deleteHandle(post.id)}>삭제</button>
                <button onClick={()=>gotoEdit(post.id)}>수정</button>
              </p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Board