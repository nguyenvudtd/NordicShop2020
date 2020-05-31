import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Banner.css'
import { Switch, Route, Redirect, NavLink, withRouter } from 'react-router-dom';
class Banner extends PureComponent {
    render() {
        return (

            // < !--Banner -- >

            <div className="banner">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="banner_item align-items-center" style={{ backgroundImage: 'url(/images/banner_1.jpg)' }}>
                                <div className="banner_category">
                                    {/* <a href="categories.html">women's</a> */}
                                    <NavLink exact activeClassName="active" to="/categories">
                                        women's
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="banner_item align-items-center" style={{ backgroundImage: 'url(/images/banner_2.jpg)' }}>
                                <div className="banner_category">
                                    {/* <a href="categories.html">accessories's</a> */}
                                    <NavLink exact activeClassName="active" to="/categories">
                                        accessories's
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="banner_item align-items-center" style={{ backgroundImage: 'url(/images/banner_3.jpg)' }}>
                                <div className="banner_category">
                                    {/* <a href="categories.html">men's</a> */}
                                    <NavLink exact activeClassName="active" to="/categories">
                                        men's
                                    </NavLink>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Banner.propTypes = {

};

export default Banner;