//배운것 복습겸 처음부터 게시판 만들어보기
import React, { useState, useEffect } from 'react'
import {format} from 'date-fns'

// context.js로 한 곳에서 데이터 처리
//-1. BoardLayout.js
// 0. 목록보기 /board
// 1. 글쓰기 버튼을 클릭하면 /board/write_board => 글작성 후 저장 => 목록보기
// 2. 수정 버튼 클릭 /board/edit_board/:id => 수정 후 저장 클릭 => 목록보기



const Board = () => {
  // 맨 처음 데이터를 역순으로 만든다.
  // 맨 처음 한번 역순으로 해놓기
  data.sort((prev, next) => next.id - prev.id); //desc하기 위해서 sort한다. sort는 요소가 두가지 있다. //원본이 바뀌어서 주의해야함

  const [posts, setPosts] = useState(data); //data 초기화는 꼭 해야함!

  const [title, setTitle] = useState();
  const [body, setBody] = useState();

  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState({
    id: null,
    title: "",
    body: ""
  });

  // let mapId = posts.map(item => item.id);
  // let maxId = Math.max( ...mapId ) 
  // let maxId = Math.max( ...(posts.map(item => item.id)) ) 
  



  const addPostHandle = (maxId, title, body) => {
    const newPost = {
      // id : maxId + 1,
      id : Math.max(...maxId) + 1,
      title, 
      body, 
      datetime : format(new Date(), 'yyyy.MM.dd')
    }
    setPosts([newPost, ...posts]);

    // posts = [newPost, ...posts];
    // setPosts(posts => posts=posts.push(newPost))

    setTitle('');
    setBody('');
  }


  const onSubmitHandle = (ev) => {
    ev.preventDefault();

    const maxId = posts.map(item=>item.id);
    
    addPostHandle(maxId, title, body)

    // const newPost = {
    //   // id : posts[posts.length-1].id + 1, //제일 마지막 번호 +1로 id를 붙인다
    //   // id : posts[0].id + 1, //제일 첫번째 번호 +1로 id를 붙인다
    //   id : maxId + 1,
    //   title, // title : title
    //   body, // body : body
    //   datetime : format(new Date(), 'yyyy.MM.dd')
    // }

    // setPosts(prev=>{prev.push})
    // setPosts(posts=>{...posts})// 각각의 객체로 풀어헤쳐서 앞에 넣어라

    // setPosts([newPost, ...posts]); //기존의 포스트를 디스트럭쳐링 한 다음에 값을 넣는다.
    // post.push(newPost)
  }


  const deleteHandle = (id) => {
    const deleted = posts.filter(post=>post.id !== id)
    setPosts(deleted)
    // 개선 : useReducer로 개선
  }

  // id 찾는 용도
  const updateHandle = (id) => {
    setIsEditing(true); // 수정할 창을 표시함

    const find = posts.find(post=>post.id === id) // 수정할 데이터 찾기
    setEditItem(find) // 창 안에 수정할 데이터 넣기
    // 수정할 데이터 저장. id
    
  }

  //타이틀 찾는 용도
  const setEditTitle = (value) => {
    // setEditItem(editItem=>editItem.title = value)
    setEditItem({...editItem, title : value})
  }
  //바디 찾는 용도
  const setEditBody = (value) => {
    // setEditItem(editItem=>editItem.body = value)
    setEditItem({...editItem, body : value})
  }

  //
  const onSubmitEditHandle = () => {
    setIsEditing(false);

    // const edit = posts.map(post=>{
    //   if(post.id === editItem.id){
    //     return editItem;
    //   }else{
    //     return post;
    //   }
    // })

    const edit = posts.map(post=>post.id === editItem.id ? editItem : post)

    setPosts(edit)
  }

  const [search, setSearch] = useState("");
  const [searchPosts, setSearchPosts] = useState([]);
  const onSearchHandle = (ev) => {
    ev.preventDefault();
  }
  const onSearchChangeHandle = (ev) => { // props의 문제 예전의 나와 새로운 나를 검색하면서 구분 못해서 한개 더 생긴다. key값을 줌으로써 해결 가능
    // 지울때와 등록할때 둘다 오류가 생길 수 있다.
    // ev.preventDefault();
    console.log(search);
    setSearch(ev.target.value)

  }

  useEffect(() => {

    const filter = posts.filter(post => post.title.includes(search) || post.body.includes(search))
    setSearchPosts(filter)
    
  }, [search, posts])//search나 posts가 갱신될때 실행

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

      <form className='inputForm' 
            id='inputForm'
            onSubmit={(ev) => onSubmitHandle(ev)}>
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
      {
        isEditing && // isEditing이 true일때만 보여준다. (수정모드)
        <form className='editForm' 
              id='editForm'
              onSubmit={(ev) => onSubmitEditHandle(ev)}>
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
      }
      <div>
        {
          posts.length && searchPosts.map((post)=>( //posts의 길이가 있으면 실행! 이렇게 하면 에러률을 낮출 수 있다.
            <div key={post.id}>
              <h2>{post.id} {post.title}</h2>
              <p>{post.body}</p>
              <p>{post.datetime}</p>
              <p>
                <button onClick={()=>deleteHandle(post.id)}>삭제</button>
                <button onClick={()=>updateHandle(post.id)}>수정</button>
              </p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Board