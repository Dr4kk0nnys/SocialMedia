import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Catalog from 'components/Catalog';
import Category from 'components/Category';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Switch>
                <Route path='/categories/:categoryName/' render={(props) => <Category categoryName={props.location.pathname} />} />
                <Route path='/' component={Catalog} />
            </Switch>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);