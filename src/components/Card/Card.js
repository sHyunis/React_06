import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Card = ({item}) => {
    const navigate = useNavigate(); //라우트에 대한 모든 주소정보를 useNavigate가 가지고 있다.
  return (
    <div className='card'>
        <h2>Card</h2>

        <h3 onClick={()=>{navigate(`./${item.id}`)}}>{item.brand}</h3>
        {/* <h3 onClick={()=>{navigate(`/makeup/${item.id}`)}}>{item.brand}</h3> */}
        {/* localhost://3000/makeup/:id 이렇게 주소가 생긴 것 */}

        <h4>{item.name}</h4>
        <h5>{item.price}</h5>
        <Link to={`./${item.id}`}> 상품 자세히 보기 </Link>
    </div>
  )
}

export default Card