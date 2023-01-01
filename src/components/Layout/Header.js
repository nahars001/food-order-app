import React from 'react';
import meals from  '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = props => {



    return <React.Fragment>
        <header className={classes.header}>
            <h1> Dudu's Shop </h1>
            <HeaderCartButton></HeaderCartButton>
        </header>
        <div className={classes['main-image']}>
        <img src={meals} alt =" A table full of delecious Food!"></img>
        </div>

    </React.Fragment>

}


export default Header;