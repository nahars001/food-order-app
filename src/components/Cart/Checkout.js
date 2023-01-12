import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === "";
const isPostalValid = value => value.trim().length === 6 && !isNaN(value.trim());
const Checkout = (props) => {

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const [formInputvalidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    });




    const confirmHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalIsValid =    isPostalValid(enteredPostal);
         
        setFormInputValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalIsValid
        })

        const formIsVadlid = enteredNameIsValid &&
            enteredCityIsValid &&
            enteredStreetIsValid &&
            enteredPostalIsValid;
        if (!formIsVadlid) {


            return;
        }
        props.onConfirm({
            name: enteredName,
            street : enteredStreet,
            city : enteredCity,
            postalCode :enteredPostal
        });

    };
    const nameControlclasses =( `${classes.control} ${formInputvalidity.name ? '' : classes.invalid}`);
    const cityControlclasses = (`${classes.control} ${formInputvalidity.city ? '' : classes.invalid}`);
    const streetControlclasses = (`${classes.control} ${formInputvalidity.street ? '' : classes.invalid}`);
    const postalControlclasses = (`${classes.control} ${formInputvalidity.postalCode ? '' : classes.invalid}`);



    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlclasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formInputvalidity.name && <p> Please enter a valid name!</p>}
            </div>
            <div className={streetControlclasses}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef} />
                {!formInputvalidity.street && <p>Please enter a valid street address! </p>}
            </div>
            <div className={postalControlclasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalInputRef} />
                {!formInputvalidity.postalCode && <p>Please enter a 6 digit Postal code! </p>}
            </div>
            <div className={cityControlclasses}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef} />
                {!formInputvalidity.city && <p>Please enter a valid city! </p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
}


export default Checkout;