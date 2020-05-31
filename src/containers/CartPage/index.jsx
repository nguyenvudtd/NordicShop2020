import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Cart from '../../components/Cart';
import { Switch, Route, Redirect, NavLink, withRouter } from 'react-router-dom';
class CartPage extends PureComponent {
    render() {
        return (

            <Cart />

        );
    }
}

CartPage.propTypes = {

};

export default withRouter(CartPage);