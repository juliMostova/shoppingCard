import  './SideBarStyle.css';
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";

function SideBar({toggleCard,countClick,setCountClick,trash,setTrash,cardInfo}) {
    
    const plusCount = (ind) =>{
let newCount = [...countClick];
newCount[ind] += 1;
setCountClick(newCount);
setTrash(prev =>prev +1);
    }
    
    const minusCount = (ind)=>{
let delCount = [...countClick];
if(delCount[ind] >0){
    delCount[ind] -= 1;
}

setCountClick(delCount);
setTrash(prev =>prev-1);
    }
    return (
        <div className='side-bar'>
            <h2>Your packages</h2>
            <div className='card-items'>
            {
                cardInfo.map((card,ind)=>(
                    countClick[ind] > 0 &&(
                        <div  key={ind} className='card-item'>
                        <img src={card.img} alt={`Card${ind+1}`}/>
                      
                        <div className='card-item-info'>
                        <p>{card.describe}</p>
                     <p>{card.cost}$</p>
                     <div className='counter'>
                        <CiCirclePlus onClick={()=>plusCount(ind)}style={{color:'rgb(0,255,0)',fontWeight:'800px'}}/>
                        {countClick[ind]}
                        <CiCircleMinus onClick={()=>minusCount(ind)}style={{color:'rgb(255,0,0)',fontWeight:'800px'}}/>
                        </div>
                        </div>
                    </div>
                    )
                ))
            }
            </div>
            
<button className='reset' onClick={toggleCard}>Close</button>
        </div>
    );
}
export default SideBar;