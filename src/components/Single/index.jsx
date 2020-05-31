import React, { PureComponent, Suspense } from 'react';
import PropTypes from 'prop-types';
import './single_styles.css'
// import './single_responsive.css'
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch, connect } from 'react-redux';
import { getID, addToCard } from '../../actions/getIDProduct';
import { increaseCounter, decreaseCounter, increaseCounterAsync } from '../../actions/counter';
import { Switch, Route, Redirect, NavLink, withRouter } from 'react-router-dom';
import NotFound from '../../containers/NotFound';
import { withUnloadConfirmation } from '../../hocs/withUnloadConfirmation';

import Description from '../Single/Description';
import Information from '../Single/Information';
import Reviews from '../Single/Reviews';
import SanitizedHTML from 'react-sanitized-html';
import CartPage from '../../containers/CartPage';

// const Description = React.lazy(() => import('../Single/Description'));
// const Information = React.lazy(() => import('../Single/Information'));
// const Reviews = React.lazy(() => import('../Single/Reviews'));

class Single extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeTodoId: null,
            activeImage: null,
        };
    }

    currencyFormat(num) {
        return num.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'đ'
    }
    handleIncreaseClick = () => {
        this.props.increaseCounter();

    }

    handleDecreaseClick = () => {
        this.props.decreaseCounter();
    }
    handleAddToCardClick = (Cart, Quantity) => {
        this.props.addToCard({ Cart, Quantity });
    }
    handleTodoClick = (todo) => {
        // which todo is clicked
        //console.log(todo);
        this.setState({ activeTodoId: todo.id });
        this.setState({ activeImage: todo.img });
    };
    render() {
        const { cartDetail, count } = this.props;
        const { activeTodoId, activeImage } = this.state;
        const { match, history, location } = this.props;
        let listImg = [];

        listImg.push({ id: 1, img: cartDetail.id.images[0] });
        listImg.push({ id: 2, img: cartDetail.id.images[1] });
        listImg.push({ id: 3, img: cartDetail.id.images[2] });


        //console.log('activeImage :', activeImage);
        //console.log('listImg :', listImg);
        return (
            <div>

                <div className="container single_product_container">
                    <div className="row">
                        <div className="col">

                            {/* <!-- Breadcrumbs --> */}

                            <div className="breadcrumbs d-flex flex-row align-items-center">
                                <ul>
                                    <li>
                                        <NavLink exact activeClassName="active" to="/">
                                            home
                                        </NavLink>
                                    </li>
                                    <li>

                                        <NavLink exact activeClassName="active" to="/categories">
                                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                                            Men's
                                        </NavLink>


                                    </li>
                                    <li className="active"><a href="#"><i className="fa fa-angle-right" aria-hidden="true"></i>Single Product</a></li>
                                </ul>
                            </div>

                        </div>
                    </div>


                    <div className="row">
                        <div className="col-lg-7">
                            <div className="single_product_pics">
                                <div className="row">
                                    <div className="col-lg-3 thumbnails_col order-lg-1 order-2">
                                        <div className="single_product_thumbnails">
                                            <ul>
                                                {/* <li className="active"><img src={cartDetail.id.images[1]} alt="" data-image={cartDetail.id.images[1]} /></li>
                                                <li><img src={cartDetail.id.images[2]} alt="" data-image={cartDetail.id.images[2]} /></li>
                                                <li><img src={cartDetail.id.images[3]} alt="" data-image={cartDetail.id.images[3]} /></li> */}
                                                {listImg.map(todo => {
                                                    const isActive = todo.id === activeTodoId;

                                                    return (
                                                        <li
                                                            className={isActive ? 'active' : ''}
                                                            key={todo.id}
                                                            onClick={() => this.handleTodoClick(todo)}
                                                        >
                                                            <img src={todo.img} alt="" data-image={todo.img} />
                                                        </li>


                                                    );
                                                })}

                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-9 image_col order-lg-2 order-1">
                                        <div className="single_product_image">
                                            <div className="single_product_image_background" style={{ backgroundImage: `url(${activeImage ? activeImage : cartDetail.id.images[0]})` }}></div>
                                            {/* cartDetail.id.images[1] */}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="product_details">
                                <div className="product_details_title">
                                    <h2>{cartDetail.id.name}</h2>
                                    <p>{cartDetail.id.shortDescription}</p>
                                </div>
                                <div className="free_delivery d-flex flex-row align-items-center justify-content-center">
                                    <span className="ti-truck"></span><span>free delivery</span>
                                </div>
                                <div className="original_price">{this.currencyFormat(cartDetail.id.originalPrice)}</div>
                                <div className="product_price">{this.currencyFormat(cartDetail.id.salePrice)}</div>
                                <ul className="star_rating">
                                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                    <li><i className="fa fa-star-o" aria-hidden="true"></i></li>
                                </ul>
                                <div className="product_color">
                                    <span>Select Color:</span>
                                    <ul>
                                        <li style={{ background: '#e54e5d' }}></li>
                                        <li style={{ background: '#252525' }}></li>
                                        < li style={{ background: '#60b3f3' }}></li>
                                    </ul>
                                </div>
                                <div className="quantity d-flex flex-column flex-sm-row align-items-sm-center">
                                    <span>Quantity:</span>
                                    <div className="quantity_selector">
                                        <span className="minus" onClick={this.handleDecreaseClick}><i className="fa fa-minus" aria-hidden="true"></i></span>
                                        <span id="quantity_value"> {count}</span>
                                        <span className="plus" onClick={this.handleIncreaseClick}><i className="fa fa-plus" aria-hidden="true"></i></span>
                                    </div>
                                    <div className="red_button add_to_cart_buttons" onClick={() => this.handleAddToCardClick(cartDetail.id, count)}><a href="#" >add to cart</a></div>
                                    <div className="product_favorite d-flex flex-column align-items-center justify-content-center"></div>
                                </div>
                            </div>
                        </div>
                    </div>




                </div>
                <div className="tabs_section_container">
                    <div className="container">

                        {/* <!-- Tabs --> */}
                        <div className="row">
                            <div className="col">
                                <div className="tabs_container">
                                    <ul className="tabs d-flex flex-sm-row flex-column align-items-left align-items-md-center justify-content-center">
                                        <li className="tab">
                                            <NavLink
                                                exact
                                                to={`${match.url}/description`}
                                                className="tab"
                                                activeClassName="active"
                                            >
                                                <span>
                                                    Description
                                                </span>
                                            </NavLink>
                                        </li>

                                        <li className="tab">
                                            <NavLink
                                                to={`${match.url}/information`}
                                                className="tab"
                                                activeClassName="active"
                                            >
                                                <span>
                                                    Additional Information
                                                </span>
                                            </NavLink>
                                        </li>

                                        <li className="tab">
                                            <NavLink
                                                to={`${match.url}/reviews`}
                                                className="tab"
                                                activeClassName="active"
                                            >
                                                <span>
                                                    Reviews
                                                </span>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <section >
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <Switch>
                                            <Route path="/single/description" component={Description} />
                                            <Route path="/single/information" component={Information} />
                                            <Route path="/single/reviews" component={Reviews} />
                                            {/* <Route path="/single/cart" component={CartPage} /> */}
                                            <Redirect from="/single" to="/single/description" />
                                            <Route component={NotFound} />
                                        </Switch>
                                    </Suspense>
                                </section>
                            </div >
                        </div >
                    </div >
                </div >
            </div >
        );
    }
}

Single.propTypes = {
    cartDetail: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,

    increaseCounter: PropTypes.func.isRequired,
    decreaseCounter: PropTypes.func.isRequired,
    increaseCounterAsync: PropTypes.func.isRequired,

    addToCard: PropTypes.func.isRequired,

    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    cartDetail: state.cartDetail,
    count: state.counter,
})
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getID,
        addToCard,
        increaseCounter,
        decreaseCounter,
        increaseCounterAsync,
    }, dispatch);
}
//export default Single;
export default connect(mapStateToProps, mapDispatchToProps
)(withUnloadConfirmation(withRouter(Single)));