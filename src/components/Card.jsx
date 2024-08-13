import './CardStyle.css';
import { IoIosBasket } from "react-icons/io";
import CardInfo from './CardInfo';
import { SlBasket } from "react-icons/sl";
import { useEffect, useState } from 'react';
import SideBar from './SideBar';



function Card (){

 const [countClick,setCountClick] = useState(()=>{
    const savedClick = JSON.parse(localStorage.getItem('countClick'));
    return savedClick || Array(CardInfo.length).fill(0);
 });
 const [trash,setTrash] = useState(()=>{
    return JSON.parse(localStorage.getItem('trash') || 0);
 });
const [isOpenToggle,setIsOpenToggle] = useState(false);

const addBacked = (ind) =>{

    const newClickCount = [...countClick];
    newClickCount[ind]  += 1;
    setCountClick(newClickCount);
   setTrash(prev =>prev+1);

}

useEffect(()=>{
localStorage.setItem('countClick',JSON.stringify(countClick));
localStorage.setItem('trash',JSON.stringify(trash));
},[trash,countClick]);


const toggleCard = () =>{
  setIsOpenToggle(!isOpenToggle);
}
    return(
        <div className='container'>
            <h1>Choose our products :</h1>
<IoIosBasket className='trash' onClick={toggleCard}/>
<span className='count-trash'>{trash}</span>

<div className='card-gallery'>
{
   CardInfo.map((card,ind)=>(
    <div key={ind} className='card'>
<img src={card.img} alt={`Card${ind+1}`}/>
<p>{card.describe}</p>
<div className='card_info'>
    <span>{card.cost}$</span>
    <button className='addBTN' onClick={()=>addBacked(ind)}> <SlBasket/>{countClick[ind]}</button>
</div>
    </div>
   )) 
}
</div>
{isOpenToggle && <SideBar toggleCard={toggleCard}
countClick={countClick} setCountClick={setCountClick}
trash={trash} setTrash={setTrash} cardInfo={CardInfo}
/>}
        </div>
    )
}

export default Card;