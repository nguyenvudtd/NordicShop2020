import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './NewArrivals.css'
import { useSelector, useDispatch, connect } from 'react-redux';
import { getID } from '../../../actions/getIDProduct';
import { bindActionCreators } from 'redux';
import { increaseCounter, decreaseCounter, increaseCounterAsync, resetQuantity } from '../../../actions/counter';
import { Switch, Route, Redirect, NavLink, withRouter } from 'react-router-dom';

class NewArrivals extends PureComponent {

    handleCategoryChange = (todo) => {
        const { onActiveItemChange } = this.props;
        if (onActiveItemChange) {
            onActiveItemChange(todo.id);
        }
    };
    currencyFormat(num) {

        return num.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'đ';

    }
    handleDetailClick = (id) => {

        this.props.getID(id);
        this.props.resetQuantity();
    }
    render() {
        const { categoriesList, activeTodoIdNewArrivals, productsList } = this.props;

        // if (categoriesList === null) {
        //     return <h2>Loading posts...</h2>;
        // }
        return (

            // < !--New Arrivals-- >

            <div className="new_arrivals">
                <div className="container">
                    <div className="row">
                        <div className="col text-center">
                            <div className="section_title new_arrivals_title">
                                <h2>New Arrivals</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col text-center">
                            <div className="new_arrivals_sorting">
                                <ul className="arrivals_grid_sorting clearfix button-group filters-button-group">
                                    {categoriesList.map(todo => {
                                        // reuse logic
                                        const isActive = todo.id === activeTodoIdNewArrivals;
                                        const AddClass = 'grid_sorting_button button d-flex flex-column justify-content-center align-items-center'
                                        //console.log(todo);
                                        return (
                                            <li
                                                key={todo.id}
                                                className={isActive ? `${AddClass} active` : `${AddClass}`}
                                                style={{ color: isActive ? 'white' : 'black' }}
                                                onClick={() => this.handleCategoryChange(todo)}

                                            >
                                                {todo.name}
                                            </li>
                                        );
                                    })}

                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {productsList.map(todo => {
                            return (
                                <div
                                    key={todo.id}
                                    className="product-item"

                                >
                                    <div className="product discount product_filter">
                                        <div className="product_image">
                                            <img src={todo.images[0]} alt="" />
                                        </div>
                                        <div className="favorite favorite_left"></div>
                                        <div className="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center"><span>-{todo.promotionPercent}</span></div>
                                        <div className="product_info">
                                            <h6 className="product_name">
                                                {/* <a href="single.html">{todo.name}</a> */}
                                                <NavLink exact activeClassName="active" to="/single" onClick={() => this.handleDetailClick(todo)}>
                                                    {todo.name}
                                                </NavLink>

                                            </h6>
                                            <div className="product_price">{this.currencyFormat(todo.salePrice)}<span>{this.currencyFormat(todo.originalPrice)}</span></div>
                                        </div>
                                    </div>
                                    <div className="red_button add_to_cart_button"><a href="#">add to cart</a></div>

                                </div>


                            );
                        })}
                    </div>
                </div>
            </div>


        );
    }
}


NewArrivals.propTypes = {
    productsList: PropTypes.array,
    categoriesList: PropTypes.array,
    activeTodoIdNewArrivals: PropTypes.string,
    onActiveItemChange: PropTypes.func,

    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,


    resetQuantity: PropTypes.func.isRequired,


};
NewArrivals.defaultProps = {
    productsList: [],
    categoriesList: [],
    activeTodoIdNewArrivals: '',
    onActiveItemChange: null,
};

const mapStateToProps = state => ({

})
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        resetQuantity,
        getID,
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps
)(withRouter(NewArrivals));