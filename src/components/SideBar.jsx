import  './SideBarStyle.css';
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { IoCloseCircleOutline } from "react-icons/io5";
import {delCard,plusQuantity,minusQuantity,resetAllSedeBar} from './reducers/cartSlice';
import ICartItem from '../types';
import {useAppDispatch} from './hooks';
import { db } from '../firebase'; 
import { collection, addDoc } from "firebase/firestore";

interface SideBarProps  {
items:ICartItem[];
toggleCard:()=>void;
totalAmount:number;
}

function SideBar({items,toggleCard,totalAmount}:SideBarProps) {
    const dispatch = useAppDispatch();

const handlrOrder = async()=>{

  if(items.length === 0){
alert("Your cart is empty!");
        return;
  }
  try{
    const newOrderBase = {
        items:items,
        total:totalAmount,
      createdAt: new Date().toISOString(),
      status:'pending'
    };
        const docRef = await addDoc(collection(db, "orders"), newOrderBase);
        
        console.log("Document written with ID: ", docRef.id);
        alert("Order successful! Thank you.");
dispatch(resetAllSedeBar());
        toggleCard();

  }catch (e) {
        console.error("Error adding document: ", e);
        alert("Something went wrong. Check console.");
    }
}


    return (
        < div className='side-bar'>
            <h2>Your packages</h2>
            <div className='card-item'>
     
                  <table>
                    <thead>
                        <tr>
                            <th>Your order</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Sum</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((item)=>(
                            <tr key={item.id}>
                            <td><img src={item.imageUtl} alt={`Card${item.id+1}`} className='side-bar-image'/></td>
                            <td>{item.name}</td>
                            <td>{item.price}$</td>
                            <td>
                                <CiCircleMinus className='minus'
                                onClick={()=>dispatch(minusQuantity(item.id))}/>
                                {item.quantity}
                                <CiCirclePlus className='plus'
                                   onClick={()=>dispatch(plusQuantity(item.id))}/>
                                </td>
                            <td>{item.price * item.quantity}$</td>
                             <button className='btn_del_El'
                             onClick={()=>dispatch(delCard(item.id))}>
                                <IoCloseCircleOutline/>
                             </button>
                        </tr>
                       
                            ))
                        }
                        <button>Total:{totalAmount}$</button>
                    </tbody>
                  </table>
                        </div>
                
             
            <button className='byOrder' onClick={handlrOrder}>Order</button>

        </div>
    );
}
export default SideBar;


