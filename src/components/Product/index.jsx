import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Categories.css'
import './CategoriesResponsive.css'
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Switch, Route, Redirect, NavLink, withRouter } from 'react-router-dom';
import { useSelector, useDispatch, connect } from 'react-redux';
import { getID } from '../../actions/getIDProduct';
import { bindActionCreators } from 'redux';
import { increaseCounter, decreaseCounter, increaseCounterAsync, resetQuantity } from '../../actions/counter';
class Product extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            min: 10000,
            max: 1000000,
            step: 1000,
            value: 1000000,
            valueLow: 100000,
            valueHigh: 1000000,
        };
    }
    handleClickFilter = () => {

        const salePrice_gte = this.state.valueLow
        const salePrice_lte = this.state.valueHigh

        const { onPriceChange } = this.props;
        if (onPriceChange) {
            onPriceChange({ min: salePrice_gte, max: salePrice_lte })
        }
    };
    currencyFormat(num) {
        return num.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'đ'
    }
    onSliderChangePrice = value => {
        this.setState({ valueLow: value[0], valueHigh: value[1] });

    };
    handlePageChange = (newPage) => {
        const { onPageChange } = this.props;
        if (onPageChange) {
            onPageChange(newPage);
        }
    }
    handlePageNext = (filters, totalPage) => {
        const { onPageChange } = this.props;
        if (onPageChange) {
            const newPage = filters._page < totalPage ? filters._page + 1 : filters._page

            console.log('PageNext :', filters._page);
            onPageChange(newPage);
        }
    }
    handlePageLimit = (limitPage) => {
        const { onPageLimit } = this.props;
        if (onPageLimit) {
            console.log('limitPage :', limitPage);
            onPageLimit(limitPage);
        }
    }
    handleSortBy = (sortBy) => {
        const { onSortBy } = this.props;
        if (onSortBy) {
            console.log('limitPage :', sortBy);
            onSortBy(sortBy);
        }
    }
    handleDetailClick = (id) => {

        this.props.getID(id);
        this.props.resetQuantity();
    }
    render() {
        const { filters, productsList, totalPage, count, totalRows } = this.props;

        //console.log('render :', totalPage);
        //console.log('filters :', filters);
        let listPage = [];
        for (var i = 0; i < totalPage; i++) {
            listPage.push(i + 1);
        }
        let listLimit = [];
        listLimit.push(6);
        listLimit.push(12);
        listLimit.push(24);
        let listsortBy = []
        listsortBy.push('Default Sorting');
        listsortBy.push('Price');
        listsortBy.push('Product Name');

        // const { match } = this.props;
        // console.log('match.url: ', match);
        //console.log('Product :', this.props);
        //console.log('totalRows :', totalRows);
        //console.log('productsList :', productsList.length);
        //const dispatch = useDispatch();
        //console.log('DetailID :', DetailID);
        //console.log('count :', count);

        return (

            <div className="container ">


                <div className="row">
                    <div className="col product_section clearfix">
                        {/* <!-- Breadcrumbs --> */}

                        <div className="breadcrumbs d-flex flex-row align-items-center">
                            <ul>
                                <li><a href="index.html">Home</a></li>
                                <li className="active"><a href="index.html"><i className="fa fa-angle-right" aria-hidden="true"></i>Men's</a></li>
                            </ul>
                        </div>

                        {/* <!-- Sidebar --> */}

                        <div className="sidebar">
                            <div className="sidebar_section">
                                <div className="sidebar_title">
                                    <h5>Product Category</h5>
                                </div>
                                <ul className="sidebar_categories">
                                    <li><a href="#">Men</a></li>
                                    <li className="active"><a href="#"><span><i className="fa fa-angle-double-right" aria-hidden="true"></i></span>Women</a></li>
                                    <li><a href="#">Accessories</a></li>
                                    <li><a href="#">New Arrivals</a></li>
                                    <li><a href="#">Collection</a></li>
                                    <li>

                                        <NavLink exact activeClassName="active" to="/categories">
                                            shop
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>

                            {/* <!-- Price Range Filtering --> */}
                            <div className="sidebar_section">
                                <div className="sidebar_title">
                                    <h5>Filter by Price</h5>
                                </div>
                                <p>
                                    <input type="text" id="amount" style={{ border: 0, color: "#f6931f", fontWeight: "bold" }}
                                    />
                                </p>
                                <span>{this.currencyFormat(this.state.valueLow)}- {this.currencyFormat(this.state.valueHigh)}</span>
                                <Range
                                    handleStyle={[
                                        {
                                            borderColor: 'red',
                                            height: 14,
                                            width: 14,
                                            backgroundColor: 'red',
                                        },
                                        {
                                            borderColor: 'red',
                                            height: 14,
                                            width: 14,
                                            backgroundColor: 'red',
                                        }
                                    ]}
                                    trackStyle={[
                                        {
                                            backgroundColor: 'red', height: 4
                                        }
                                    ]}
                                    step={this.state.step}
                                    min={this.state.min}
                                    max={this.state.max}
                                    defaultValue={[this.state.valueLow, this.state.valueHigh]}
                                    tipFormatter={value => `${value}%`}
                                    onAfterChange={this.onSliderChangePrice} />
                                <div className="filter_button" onClick={() => this.handleClickFilter()} > <span>filter</span></div>
                            </div>

                        </div>
                        {/* <!-- Main Content --> */}

                        <div className="main_content">

                            {/* <!-- Products --> */}

                            <div className="products_iso">
                                <div className="row">
                                    <div className="col">

                                        {/* <!-- Product Sorting --> */}

                                        <div className="product_sorting_container product_sorting_container_top">
                                            <ul className="product_sorting">
                                                <li>
                                                    {/* <span className="type_sorting_text">Default Sorting</span> */}
                                                    <span className="type_sorting_text">{filters._sort}</span>

                                                    <i className="fa fa-angle-down"></i>
                                                    <ul className="sorting_type">

                                                        {listsortBy.map(todo => {
                                                            return (
                                                                <li
                                                                    className="type_sorting_btn"
                                                                    key={todo}
                                                                    onClick={() => this.handleSortBy(todo)}
                                                                >
                                                                    <span>
                                                                        {todo}
                                                                    </span>
                                                                </li>


                                                            );
                                                        })}
                                                        {/* <li className="type_sorting_btn" data-isotope-option='{ "sortBy": "original-order" }'><span>Default Sorting</span></li>
                                                        <li className="type_sorting_btn" data-isotope-option='{ "sortBy": "price" }'><span>Price</span></li>
                                                        <li className="type_sorting_btn" data-isotope-option='{ "sortBy": "name" }'><span>Product Name</span></li> */}
                                                    </ul>
                                                </li>
                                                <li>
                                                    <span>Show</span>
                                                    <span className="num_sorting_text">{filters._limit}</span>
                                                    <i className="fa fa-angle-down"></i>
                                                    <ul className="sorting_num">
                                                        {/* <li className="num_sorting_btn"><span>6</span></li>
                                                        <li className="num_sorting_btn"><span>12</span></li>
                                                        <li className="num_sorting_btn"><span>24</span></li> */}

                                                        {listLimit.map(todo => {
                                                            return (
                                                                <li
                                                                    className="num_sorting_btn"
                                                                    key={todo}
                                                                    onClick={() => this.handlePageLimit(todo)}
                                                                >
                                                                    <span>
                                                                        {todo}
                                                                    </span>
                                                                </li>


                                                            );
                                                        })}

                                                    </ul>
                                                </li>
                                            </ul>
                                            <div className="pages d-flex flex-row align-items-center">
                                                <div className="page_current">
                                                    <span>{
                                                        filters._page
                                                    }</span>
                                                    <ul className="page_selection">
                                                        {listPage.map(todo => {
                                                            return (
                                                                <li
                                                                    key={todo}
                                                                    onClick={() => this.handlePageChange(todo)}
                                                                >
                                                                    {todo}
                                                                </li>
                                                            );
                                                        })}

                                                    </ul>
                                                </div>
                                                <div className="page_total"><span>of</span>
                                                    {totalPage}
                                                </div>
                                                <div id="next_page_1" className="page_next">
                                                    <a
                                                        onClick={() => this.handlePageNext(filters, totalPage)}
                                                    >
                                                        <i className="fa fa-long-arrow-right" aria-hidden="true">
                                                        </i>
                                                    </a>
                                                </div>
                                            </div>

                                        </div>

                                        {/* <!-- Product Grid --> */}

                                        {/* <div className="product-grid"> */}

                                        {/* <!-- Product 1 --> */}
                                        <div className="container">
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
                                                                        {/* <a onClick={() => this.handleDetailClick(todo)} href="single">
                                                                            {todo.name}
                                                                        </a> */}
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
                                        {/* </div> */}

                                        {/* <!-- Product Sorting --> */}

                                        <div className="product_sorting_container product_sorting_container_bottom clearfix">
                                            <ul className="product_sorting">
                                                <li>
                                                    <span>Show:</span>
                                                    <span className="num_sorting_text">04</span>
                                                    <i className="fa fa-angle-down"></i>
                                                    <ul className="sorting_num">
                                                        <li className="num_sorting_btn"><span>01</span></li>
                                                        <li className="num_sorting_btn"><span>02</span></li>
                                                        <li className="num_sorting_btn"><span>03</span></li>
                                                        <li className="num_sorting_btn"><span>04</span></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                            <span className="showing_results">Showing 1–{totalPage} of {totalRows} results</span>
                                            <div className="pages d-flex flex-row align-items-center">
                                                <div className="page_current">
                                                    <span>{
                                                        filters._page
                                                    }</span>
                                                    <ul className="page_selection">
                                                        {listPage.map(todo => {
                                                            return (
                                                                <li
                                                                    key={todo}
                                                                    onClick={() => this.handlePageChange(todo)}
                                                                >
                                                                    {todo}
                                                                </li>
                                                            );
                                                        })}

                                                    </ul>
                                                </div>
                                                <div className="page_total"><span>of</span>
                                                    {totalPage}
                                                </div>
                                                <div id="next_page_1" className="page_next">
                                                    <a
                                                        onClick={() => this.handlePageNext(filters, totalPage)}
                                                    >
                                                        <i className="fa fa-long-arrow-right" aria-hidden="true">
                                                        </i>
                                                    </a>
                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        );
    }
}
//onClick={this.handleDecreaseClick(todo.id)}
Product.propTypes = {
    productsList: PropTypes.array,
    filters: PropTypes.object.isRequired,
    totalPage: PropTypes.number.isRequired,
    totalRows: PropTypes.number.isRequired,
    onPageChange: PropTypes.func,
    onPriceChange: PropTypes.func,
    onPageLimit: PropTypes.func,
    onSortBy: PropTypes.func,

    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,

    count: PropTypes.number.isRequired,
    increaseCounter: PropTypes.func.isRequired,
    decreaseCounter: PropTypes.func.isRequired,
    increaseCounterAsync: PropTypes.func.isRequired,
    resetQuantity: PropTypes.func.isRequired,

    cartDetail: PropTypes.object.isRequired,
};
// Product.defaultProps = {
//     productsList: [],
//     onPageChange: null,
//     onPriceChange: null,
//     onPageLimit: null,
//     onSortBy: null,
// };

const mapStateToProps = state => ({
    cartDetail: state.cartDetail,
    count: state.counter,
})
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        increaseCounter,
        decreaseCounter,
        increaseCounterAsync,
        resetQuantity,
        getID,
    }, dispatch);
}
// export default withRouter(Product);
export default connect(mapStateToProps, mapDispatchToProps
)(withRouter(Product));