
import BananaItem01 from '../../images/banana-01.jpg';
import BananaItem02 from '../../images/banana-02.jpg';
import BananaItem03 from '../../images/banana-03.jpg';
import CableItem01 from '../../images/cable-01.jpg';
import CableItem02 from '../../images/cable-02.jpg';
import CableItem03 from '../../images/cable-03.jpg';
import CarrotItem01 from '../../images/carrot-01.jpg';
import CarrotItem02 from '../../images/carrot-02.jpg';
import CarrotItem03 from '../../images/carrot-03.jpg';
import ChairItem01 from '../../images/chair-01.jpg';
import ChairItem02 from '../../images/chair-02.jpg';
import ChairItem03 from '../../images/chair-03.jpg';
import FanItem01 from '../../images/fan-01.jpg';
import FanItem02 from '../../images/fan-02.jpg';
import FanItem03 from '../../images/fan-03.jpg';
import HeadsetItem01 from '../../images/headset-01.jpg';
import HeadsetItem02 from '../../images/headset-02.jpg';
import HeadsetItem03 from '../../images/headset-03.jpg';
import PhoneItem01 from '../../images/phone-01.jpg';
import PhoneItem02 from '../../images/phone-02.jpg';
import PhoneItem03 from '../../images/phone-03.jpg';
import ShoesItem1 from '../../images/shoes-01.jpg';
import ShoesItem2 from '../../images/shoes-02.jpg';
import ShoesItem3 from '../../images/shoes-03.jpg';
import ShoesItem4 from '../../images/shoes-04.jpg';
import ShoesItem5 from '../../images/shoes-05.jpg';
import ShoesItem6 from '../../images/shoes-06.jpg';
import WatchItem01 from '../../images/watch-01.jpg';
import WatchItem02 from '../../images/watch-02.jpg';
import WatchItem03 from '../../images/watch-03.jpg';

import { ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY, ADD_QUANTITY, ADD_SHIPPING } from '../actions/action-types/cart-actions'

const initState = {
    items: [
        { id: 1, title: '', category: "banana", desc: "Red banana", price: 100, img: BananaItem01 },
        { id: 2, title: '', category: "banana", desc: "Dark green banana", price: 80, img: BananaItem02 },
        { id: 3, title: '', category: "banana", desc: "Light green banana", price: 110, img: BananaItem03 },
        { id: 4, title: '', category: "cable", desc: "HDMI cable", price: 2000, img: CableItem01 },
        { id: 5, title: '', category: "cable", desc: "Micro usb cable", price: 700, img: CableItem02 },
        { id: 6, title: '', category: "cable", desc: "Audio cable", price: 1250, img: CableItem03 },
        { id: 7, title: '', category: "carrot", desc: "Normal carrot", price: 80, img: CarrotItem01 },
        { id: 8, title: '', category: "carrot", desc: "Carrot piece", price: 190, img: CarrotItem02 },
        { id: 9, title: '', category: "carrot", desc: "Long carrot", price: 120, img: CarrotItem03 },
        { id: 10, title: '', category: "chair", desc: "Office chair", price: 80, img: ChairItem01 },
        { id: 11, title: '', category: "chair", desc: "Normal chair", price: 190, img: ChairItem02 },
        { id: 12, title: '', category: "chair", desc: "Child chair", price: 120, img: ChairItem03 },
        { id: 13, title: '', category: "fan", desc: "Ceiling fan", price: 2500, img: FanItem01 },
        { id: 14, title: '', category: "fan", desc: "Tabel fan", price: 3750, img: FanItem02 },
        { id: 15, title: '', category: "fan", desc: "Small fan", price: 2900, img: FanItem03 },
        { id: 16, title: '', category: "headset", desc: "Headset", price: 16000, img: HeadsetItem01 },
        { id: 17, title: '', category: "headset", desc: "Bluetooth headset", price: 4500, img: HeadsetItem02 },
        { id: 18, title: '', category: "headset", desc: "Hands Free", price: 3200, img: HeadsetItem03 },
        { id: 19, title: '', category: "phone", desc: "Latest phone", price: 95000, img: PhoneItem01 },
        { id: 20, title: '', category: "phone", desc: "Small phone", price: 30000, img: PhoneItem02 },
        { id: 21, title: '', category: "phone", desc: "Old phone", price: 4500, img: PhoneItem03 },
        { id: 22, title: '', category: "watch", desc: "Watch", price: 65000, img: WatchItem01 },
        { id: 23, title: '', category: "watch", desc: "Smart watch", price: 27500, img: WatchItem02 },
        { id: 24, title: '', category: "watch", desc: "Clock", price: 7800, img: WatchItem03 },
        { id: 25, title: '', category: "shoes", desc: "Winter body", price: 7500, img: ShoesItem1 },
        { id: 26, title: '', category: "shoes", desc: "Adidas", price: 7200, img: ShoesItem2 },
        { id: 27, title: '', category: "shoes", desc: "Vans", price: 9000, img: ShoesItem3 },
        { id: 28, title: '', category: "shoes", desc: "Bessi", price: 12000, img: ShoesItem4 },
        { id: 29, title: '', category: "shoes", desc: "Cropped-sho", price: 6500, img: ShoesItem5 },
        { id: 30, title: '', category: "shoes", desc: "Normal shoes", price: 4200, img: ShoesItem6 }
    ],
    addedItems: [],
    total: 0

}
const cartReducer = (state = initState, action) => {

    //INSIDE HOME COMPONENT
    if (action.type === ADD_TO_CART) {
        let addedItem = state.items.find(item => item.id === action.id)
        //check if the action id exists in the addedItems
        let existed_item = state.addedItems.find(item => action.id === item.id)
        if (existed_item) {
            addedItem.quantity += 1
            return {
                ...state,
                total: state.total + addedItem.price
            }
        }
        else {
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price

            return {
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total: newTotal
            }

        }
    }
    if (action.type === REMOVE_ITEM) {
        let itemToRemove = state.addedItems.find(item => action.id === item.id)
        let new_items = state.addedItems.filter(item => action.id !== item.id)

        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity)
        console.log(itemToRemove)
        return {
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if (action.type === ADD_QUANTITY) {
        let addedItem = state.items.find(item => item.id === action.id)
        addedItem.quantity += 1
        let newTotal = state.total + addedItem.price
        return {
            ...state,
            total: newTotal
        }
    }
    if (action.type === SUB_QUANTITY) {
        let addedItem = state.items.find(item => item.id === action.id)
        //if the qt == 0 then it should be removed
        if (addedItem.quantity === 1) {
            let new_items = state.addedItems.filter(item => item.id !== action.id)
            let newTotal = state.total - addedItem.price
            return {
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return {
                ...state,
                total: newTotal
            }
        }

    }

    if (action.type === ADD_SHIPPING) {
        return {
            ...state,
            total: state.total + 6
        }
    }

    if (action.type === 'SUB_SHIPPING') {
        return {
            ...state,
            total: state.total - 6
        }
    }

    else {
        return state
    }

}

export default cartReducer
