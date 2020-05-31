import React, { PureComponent } from 'react';
import './Cart.css'
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, NavLink, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch, connect } from 'react-redux';
import { getID, addToCard, removeToCard } from '../../actions/getIDProduct';
class Cart extends PureComponent {
    handleRemoveToCardClick = (Cart) => {
        this.props.removeToCard({ Cart });
    }
    render() {
        const { cartDetail } = this.props;
        //const listCart = cartDetail.addtoCard
        let listCart
        if (cartDetail.addtoCard == null) {
            listCart = null
        }
        else {
            listCart = [{}]
            listCart = cartDetail.addtoCard.filter(list => list.id != null)
        }

        return (
            <div className="container">

                <div className="row">
                    <div className="col product_section clearfix">
                        <div className="main_content">
                            {/* <img src={cartDetail.addtoCard[1].images} alt="" data-image={cartDetail.addtoCard[1].images} />
                        <span>{cartDetail.addtoCard[1].name}</span> */}
                            <div className="products_iso">
                                <div className="row">



                                    {listCart != null && (listCart.map(todo => {
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

                                                    <div className="product_info">
                                                        <h6 className="product_name">
                                                            <a >
                                                                {todo.name}
                                                            </a>
                                                        </h6>

                                                    </div>
                                                    <div className="quantity d-flex flex-column flex-sm-row align-items-sm-center">
                                                        <span>Quantity :</span>

                                                        <span id="quantity_value"> {todo.Quantity}</span>

                                                    </div>
                                                </div>
                                                <div className="red_button add_to_cart_button" onClick={() => this.handleRemoveToCardClick(todo.id)}><a >Xóa</a></div>
                                            </div>
                                        );
                                    }))}


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Cart.propTypes = {
    cartDetail: PropTypes.object.isRequired,
    removeToCard: PropTypes.func.isRequired,

    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    cartDetail: state.cartDetail,

})
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        removeToCard
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps
)(withRouter(Cart));