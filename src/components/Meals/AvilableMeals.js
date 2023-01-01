import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';


    const DUMMY_MEALS = [
        {
            id: 'm1',
            name: 'Dum Aloo',
            description: 'Finest fish and veggies',
            price: 22.99,
        },
        {
            id: 'm2',
            name: 'Burger',
            description: 'A german specialty!',
            price: 16.5,
        },
        {
            id: 'm3',
            name: 'Pizza',
            description: 'American, raw, meaty',
            price: 12.99,
        },
        {
            id: 'm4',
            name: 'Cheese',
            description: 'Healthy...and green...',
            price: 18.99,
        },
    ];

const AvailableMeals = () => {
    const mealsList = DUMMY_MEALS.map(meal => <MealItem key={meal.id} name={meal.name} description={meal.name} price={meal.price} id={meal.id} />);

    return <section className={classes.meals}> 
    <Card>
        <ul> 
            {mealsList} 
            

        </ul>
        </Card>
    </section>


}

export default AvailableMeals;