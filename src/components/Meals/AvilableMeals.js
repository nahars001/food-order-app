import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';


const DUMMY_MEALS = [
    {
        id: 'm1',
        name: 'Noodles',
        description: 'Finest fish and veggies',
        price: 65,
    },
    {
        id: 'm2',
        name: 'Burger',
        description: 'A german specialty!',
        price: 57,
    },
    {
        id: 'm3',
        name: 'Pizza',
        description: 'American, raw, meaty',
        price: 299,
    },
    {
        id: 'm4',
        name: 'Coffee',
        description: 'Healthy...and green...',
        price: 40,
    },
];

const AvailableMeals = () => {
    const mealsList = DUMMY_MEALS.map(meal => <MealItem
        key={meal.id}
        name={meal.name}
        description={meal.name}
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