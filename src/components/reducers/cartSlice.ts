import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartItem, IProduct } from '../../types';



interface CartState {
    items: ICartItem[];
    totalAmount: number;
    totalCount: number; 
};

const getInitialItems = () => {
    const data = localStorage.getItem('card_item');
    return data ? JSON.parse(data) : [];
};
const getInitialAmount = () => {
    const amount = localStorage.getItem('cart_amount');
    return amount ? JSON.parse(amount) : 0;
};

const getInitialCount = () => {
    const count = localStorage.getItem('cart_count');
    return count ? JSON.parse(count) : 0;
};

const saveToStorage = (state: CartState) => {
    localStorage.setItem('card_item', JSON.stringify(state.items));
    localStorage.setItem('cart_amount', JSON.stringify(state.totalAmount));
    localStorage.setItem('cart_count', JSON.stringify(state.totalCount));
};

const initialState: CartState = {
    items: getInitialItems(),
    totalAmount: getInitialAmount(),
    totalCount: getInitialCount(),
};
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<IProduct>) => {
            const findGood = state.items.find((el) => el.id === action.payload.id);
            // Immer дозволяє нам писати "мутуючий" код, перетворюючи його на immutable під капотом
            if (findGood) {
                findGood.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            state.totalCount += 1;
            state.totalAmount += action.payload.price;
            saveToStorage(state);
        },
        delCard: (state, action: PayloadAction<string>) => {
            const itemToRemove = state.items.find(el => el.id === action.payload);
            if (itemToRemove) {
                state.totalCount -= itemToRemove.quantity;
                state.totalAmount -= itemToRemove.price * itemToRemove.quantity;

            }
            state.items = state.items.filter(el => el.id !== action.payload);
            saveToStorage(state);
        },
        minusQuantity: (state, action: PayloadAction<string>) => {
            const findGood = state.items.find((el) => el.id === action.payload);
            if (findGood && findGood.quantity > 0) {
                findGood.quantity -= 1;
                state.totalCount -= 1;
                state.totalAmount -= findGood.price;
                if (findGood.quantity === 0) {
                    state.items = state.items.filter(el => el.id !== action.payload);
                }

            }
            saveToStorage(state);
        },
        plusQuantity: (state, action: PayloadAction<string>) => {
            const findGood = state.items.find((el) => el.id === action.payload);
            if (findGood) {
                findGood.quantity += 1;
                state.totalCount += 1;
                state.totalAmount += findGood.price;
                saveToStorage(state);
            }
        },
        resetAllSedeBar:(state) => {
           state.items = [];
            state.totalAmount = 0;
            state.totalCount = 0;
            
            localStorage.clear();
        }

    }
})

export const { addToCart, delCard, plusQuantity, minusQuantity,resetAllSedeBar } = cartSlice.actions;
export default cartSlice.reducer;