import './CardStyle.css';
import { IoIosBasket } from "react-icons/io";
import CardList from './CardList';
import { SlBasket } from "react-icons/sl";
import {useState } from 'react';
import SideBar from './SideBar';
import {addToCart} from './reducers/cartSlice';
import { IProduct } from '../types';
import{useAppDispatch,useAppSelector} from './hooks';


function ProductList (){

const [isOpenToggle,setIsOpenToggle] = useState(false);
const dispatch = useAppDispatch();
const { items, totalCount,totalAmount } = useAppSelector((state) => state.card);



const toggleCard = () =>{
  setIsOpenToggle(!isOpenToggle);
}
  
const handleAddToCard = (product:IProduct)=>{
dispatch(addToCart(product))
};


return(
        <div className='container'>
            <h1>Choose our products :</h1>
<IoIosBasket className='trash' onClick={toggleCard}/>
<span className='count-trash'>{totalCount}</span>

<div className='card-gallery'>
{
   CardList.map((card)=>{
         const inCard = items.find((el)=>el.id === card.id);
         const quantity = inCard ?inCard.quantity :0;
    
   return(
<div key={card.id} className='card'>
<img src={card.imageUtl} alt={`Card${card.id+1}`}/>
<p>{card.name}</p>
<div className='card_info'>
    <span>{card.price}$</span>
    <button 
    className='addBTN' 
    onClick={()=>handleAddToCard(card)}> 
    <SlBasket/>{quantity}
    </button>
</div>
 </div>
   );
})}

</div>
 {isOpenToggle && items.length > 0 &&
  <SideBar items={items}toggleCard={toggleCard} totalAmount={totalAmount}/>}

        </div>
    )
}

export default ProductList;