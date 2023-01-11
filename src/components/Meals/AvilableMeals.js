import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';




const AvailableMeals = () => {
    const[meals, setMeals ] = useState([]);
    const [isLoading , setISLoading] = useState(true);
    const[httpError , setHttpError] = useState();


    useEffect(() =>{
        const fetchMeals = async () => {
        const response = await fetch('https://food-court-nahars001-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json');
        if(!response.ok){
            throw new Error ('Something went wrong');

        }
        const responseData = await response.json();
        const loadedMeals = [];
        for(const  key in responseData){
            loadedMeals.push({
                id : key,
                name : responseData[key].name,
                description : responseData[key].description,
                price : responseData[key].price

            });
        }
        setMeals(loadedMeals);
        setISLoading(false);
        };

        
            fetchMeals().catch((error)=> {
            setISLoading(false);
            
            setHttpError(error.message);
        })
      
    }, []);
    if(isLoading){
        return(
            <section className={classes.MealsLoading}> 
                <p> Loading...</p>
            </section>
        )
    }

    if(httpError){
        return(
            <section className={classes.MealsError}>
                <p> {httpError}</p>
            </section>
        )
    }
    const mealsList = meals.map(meal => <MealItem
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
        id={meal.id}
    />);

    return <section className={classes.meals}>
        <Card>
            <ul>
                {mealsList}
            </ul>
        </Card>
    </section>


}

export default AvailableMeals;