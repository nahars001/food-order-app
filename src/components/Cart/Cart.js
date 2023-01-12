
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import { useContext, useState } from 'react';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = props => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);

    const totalAmount = `  ₹${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;
    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };
    const cartItemAddHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 })
    };

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        const response = await fetch('https://food-court-nahars001-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        console.log(response);
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}

                />
            ))}
        </ul>
    );

    const orderHandler = () => {
        setIsCheckout(true);

    }
    const modalActions =
        (
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose} > Close </button>
                {hasItems && <button className={classes.button} onClick={orderHandler}> Order</button>}
            </div>);


    const cartModalContent = (<>{!isCheckout && cartItems
    }

        <div className={classes.total}>
            <span >Total Amount</span>
            <span> {totalAmount}</span>
        </div>
        {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
        {!isCheckout && modalActions} </>
    );
const isSubmittingModalContent = (<> <p> Sending Your Order...</p> </>);
const didSubmitModalContent =  (<><p> We've received your order. </p>
 <div className={classes.actions}>
                <button className={classes.button} onClick={props.onClose} > Close </button>
               
            </div> </>);
    return <Modal onClose={props.onClose}>
        {!isSubmitting &&  !didSubmit&& cartModalContent}
        { isSubmitting && isSubmittingModalContent}
        {didSubmit && !isSubmitting && didSubmitModalContent }

    </Modal>

}


export default Cart;