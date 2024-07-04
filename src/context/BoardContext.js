import { format } from "date-fns";
import { createContext, useContext, useEffect, useState } from "react";

export const BoardContext = createContext()

export const BoardContextProvider = ({ children })=>{

    
    
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4500/board')
        .then(res=>res.json()) //json
        .then(res=>setPosts(res));// 실제 데이터
    }, []) 
    
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    
    const [isEditing, setIsEditing] = useState(false);
    const [editItem, setEditItem] = useState({
        id: null,
        title: "",
        body: ""
    });

    const [search, setSearch] = useState("");
    const [searchPosts, setSearchPosts] = useState([]);
    
    
    
    
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
    
        fetch('http://localhost:4500/board',{
            method: 'POST',
            headers: {'Content-Type' : 'application/json;charset=utf-8'},
            body: JSON.stringify(newPost)
        })
            .then(res=>res.json()) 
            .then(res=>console.log(res));


        setTitle('');
        setBody('');
    }
    
    
    const onSubmitHandle = (ev) => {
        ev.preventDefault();

        // 공백 확인시 그냥 리턴
        if(title === '' || body === ''){
            return ;
        }
    
        const maxId = posts.map(item=>item.id);
        
        addPostHandle(maxId, title, body);
    }
    
    
    const deleteHandle = (id) => {
        const deleted = posts.filter(post=>post.id !== id)
        setPosts(deleted)
        // 개선 : useReducer로 개선

        fetch(`http://localhost:4500/board/${id}`,{
            method: 'DELETE'
        })
            .then(res=>res.json()) 
            .then(res=>console.log(res));
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

        fetch(`http://localhost:4500/board/${editItem.id}`,{
            method: 'PUT',
            headers: {'Content-Type' : 'application/json;charset=utf-8'},
            body: JSON.stringify(editItem)
        })
            .then(res=>res.json()) 
            .then(res=>console.log(res));
    }
    
    
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
        <BoardContext.Provider value={{ 
            posts, setPosts,
            title, setTitle,
            body, setBody,
            isEditing, setIsEditing,
            editItem, setEditItem,
            addPostHandle, onSubmitHandle, deleteHandle, updateHandle,
            setEditTitle, setEditBody, onSubmitEditHandle,
            search, setSearch, searchPosts, setSearchPosts,
            onSearchHandle, onSearchChangeHandle
        }}>
            { children }
        </BoardContext.Provider>
    )
}

export const useBoardContext = ()=>{
    return useContext(BoardContext)
}