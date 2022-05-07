import React from 'react';
import AddHeader from '../AppHeader/AppHeader';
// import {} from '@ya.praktikum/react-developer-burger-ui-components';
import appStyles from './App.module.css';
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";

import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

const App = () => {
    return(
        <div className={appStyles.app}>
            <AddHeader />
            <main className={appStyles.main}>
                <BurgerIngredients  />
                <BurgerConstructor />
            </main>
        </div>
    )
}


export default App;