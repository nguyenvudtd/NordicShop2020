import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Header.css'

import { bindActionCreators } from 'redux';
import { useSelector, useDispatch, connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { Switch, Route, Redirect, NavLink, withRouter } from 'react-router-dom';
class Header extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,

        };
    }
    handleShow = () => {
        // which todo is clicked
        //console.log(todo);
        this.setState({ showModal: true });

    };

    handleClose = () => {
        // which todo is clicked
        //console.log(todo);
        this.setState({ showModal: false });

    };
    render() {

        const { cartDetail } = this.props;
        const { match, history, location } = this.props;
        const { showModal } = this.state;
        let Cart = cartDetail.addtoCard ? cartDetail.addtoCard.length - 1 : 0;
        //console.log('Total Cart :', Cart);
        //console.log('showModal :', showModal);
        // console.log('match :', match);
        // console.log('history :', history);
        return (
            <>
                <header className="header trans_300">

                    {/* <!-- Top Navigation --> */}

                    <div className="top_nav">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="top_nav_left">free shipping on all u.s orders over $50</div>
                                </div>
                                <div className="col-md-6 text-right">
                                    <div className="top_nav_right">
                                        <ul className="top_nav_menu">

                                            {/* <!-- Currency / Language / My Account --> */}
                                            <li className="language">
                                                <a href="#">
                                                    English
										<i className="fa fa-angle-down"></i>
                                                </a>
                                                <ul className="language_selection">
                                                    <li><a href="#">French</a></li>
                                                    <li><a href="#">Italian</a></li>
                                                    <li><a href="#">German</a></li>
                                                    <li><a href="#">Spanish</a></li>
                                                </ul>
                                            </li>
                                            <li className="account">
                                                <a href="#">
                                                    My Account
										<i className="fa fa-angle-down"></i>
                                                </a>
                                                <ul className="account_selection">
                                                    <li><a href="#"><i className="fa fa-sign-in" aria-hidden="true"></i>Sign In</a></li>
                                                    <li><a href="#"><i className="fa fa-user-plus" aria-hidden="true"></i>Register</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Main Navigation --> */}

                    <div className="main_nav_container">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 text-right">
                                    <div className="logo_container">
                                        <a href="/">Nordic<span>Shop</span></a>
                                    </div>
                                    <nav className="navbar">
                                        <ul className="navbar_menu">
                                            <li>
                                                <NavLink exact activeClassName="active" to="/">
                                                    home
                                                </NavLink>

                                            </li>

                                            <li>
                                                <NavLink exact activeClassName="active" to={`/categories`}>
                                                    shop
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink exact activeClassName="active" to="/promotion">
                                                    promotion
                                                </NavLink>
                                            </li>
                                            <li>
                                                <a href="https://nordiccoder.com/blog" target="blank">blog</a>

                                            </li>
                                            <li>
                                                <NavLink exact activeClassName="active" to="/contact">
                                                    contact
                                                </NavLink>
                                            </li>
                                        </ul>
                                        <ul className="navbar_user">

                                            <li className="checkout" onMouseOver={() => this.handleShow()}>
                                                <a href="/cart">
                                                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                                    {/* <span id="checkout_items" className="checkout_items" >{cartDetail.addtoCard.length - 1}</span> */}
                                                    <span id="checkout_items" className="checkout_items" >{cartDetail.addtoCard ? cartDetail.addtoCard.length - 1 : 0}</span>
                                                </a>
                                            </li>
                                            {/* <Button variant="primary" >
                                                Launch demo modal
                                            </Button> */}

                                        </ul>
                                        <div className="hamburger_container">
                                            <i className="fa fa-bars" aria-hidden="true"></i>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>

                </header>
                {/* <!-- Modal --> */}
                <Modal show={showModal} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>New products added</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Total Product :{Cart}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleClose()}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => this.handleClose()} >
                            <NavLink exact activeClassName="active" className="button_cart" to="/cart">
                                cart
                            </NavLink>
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className="fs_menu_overlay"></div>
                <div className="hamburger_menu">
                    <div className="hamburger_close"><i className="fa fa-times" aria-hidden="true"></i></div>
                    <div className="hamburger_menu_content text-right">
                        <ul className="menu_top_nav">
                            <li className="menu_item has-children">
                                <a href="#">
                                    usd
						<i className="fa fa-angle-down"></i>
                                </a>
                                <ul className="menu_selection">
                                    <li><a href="#">cad</a></li>
                                    <li><a href="#">aud</a></li>
                                    <li><a href="#">eur</a></li>
                                    <li><a href="#">gbp</a></li>
                                </ul>
                            </li>
                            <li className="menu_item has-children">
                                <a href="#">
                                    English
						<i className="fa fa-angle-down"></i>
                                </a>
                                <ul className="menu_selection">
                                    <li><a href="#">French</a></li>
                                    <li><a href="#">Italian</a></li>
                                    <li><a href="#">German</a></li>
                                    <li><a href="#">Spanish</a></li>
                                </ul>
                            </li>
                            <li className="menu_item has-children">
                                <a href="#">
                                    My Account
						<i className="fa fa-angle-down"></i>
                                </a>
                                <ul className="menu_selection">
                                    <li><a href="#"><i className="fa fa-sign-in" aria-hidden="true"></i>Sign In</a></li>
                                    <li><a href="#"><i className="fa fa-user-plus" aria-hidden="true"></i>Register</a></li>
                                </ul>
                            </li>
                            <li className="menu_item">
                                <NavLink exact activeClassName="active" to="/">
                                    home
                                </NavLink>
                            </li>
                            <li className="menu_item">
                                <NavLink exact activeClassName="active" to="/categories">
                                    shop
                                </NavLink>
                            </li>
                            <li className="menu_item">
                                <NavLink exact activeClassName="active" to="/promotion">
                                    promotion
                                </NavLink>
                            </li>
                            <li className="menu_item">
                                <a href="#">pages</a>
                            </li>
                            <li className="menu_item">
                                <a href="https://nordiccoder.com/blog" target="blank">blog</a>
                            </li>
                            <li className="menu_item">
                                <NavLink exact activeClassName="active" to="/contact">
                                    contact
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </>
        );
    }
}

Header.propTypes = {
    cartDetail: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    cartDetail: state.cartDetail,

})
const mapDispatchToProps = dispatch => {
    return bindActionCreators({

    }, dispatch);
}

//export default Header;
export default connect(mapStateToProps, mapDispatchToProps
)(withRouter(Header));