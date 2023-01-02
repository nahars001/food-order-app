import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';
const MealItemForm =  props=>{

    const [ amoutIsValid , setAmountIsValid] = useState(true);
        const amountInputRef = useRef();

    const submitHandler = event => {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber  = +enteredAmount; // convert to number 
        if(enteredAmount.trim().length === 0|| 
        enteredAmountNumber < 1 || 
        enteredAmountNumber > 5){
            setAmountIsValid(false);
            return;
        }


        props.onAddToCart(enteredAmountNumber);
        

    };


    return (
    <form className={classes.form}> 

   <Input 
                ref={amountInputRef}
   label ={'Amount'} input ={{
        id: 'amount_'  + props.id,
        type: 'number',
        min:'1',
        max:'5',
        step:'1',
        defaultValue : '1'
   }}></Input>
            <button onClick={submitHandler}> 
        + Add
    </button>
    {!amoutIsValid && <p>Please Enter a valid amount (1-5). </p>}





    </form>
    );

}


export default MealItemForm;