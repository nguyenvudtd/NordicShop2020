import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Reviews extends PureComponent {
    render() {
        return (
            <div className="row">
                {/* <!-- User Reviews --> */}
                <div className="col-lg-6 reviews_col">
                    <div className="tab_title reviews_title">
                        <h4>Reviews (2)</h4>
                    </div>
                    {/* <!-- User Review --> */}

                    <div className="user_review_container d-flex flex-column flex-sm-row">
                        <div className="user">
                            <div className="user_pic"></div>
                            <div className="user_rating">
                                <ul className="star_rating">
                                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                    <li><i className="fa fa-star-o" aria-hidden="true"></i></li>
                                </ul>
                            </div>
                        </div>
                        <div className="review">
                            <div className="review_date">27 Aug 2016</div>
                            <div className="user_name">Brandon William</div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                    </div>


                    {/* <!-- User Review --> */}

                    <div className="user_review_container d-flex flex-column flex-sm-row">
                        <div className="user">
                            <div className="user_pic"></div>
                            <div className="user_rating">
                                <ul className="star_rating">
                                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                    <li><i className="fa fa-star-o" aria-hidden="true"></i></li>
                                </ul>
                            </div>
                        </div>
                        <div className="review">
                            <div className="review_date">27 Aug 2016</div>
                            <div className="user_name">Brandon William</div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                    </div>


                </div>
                {/* <!-- Add Review --> */}
                <div className="col-lg-6 add_review_col">

                    <div className="add_review">
                        <form id="review_form" action="post">
                            <div>
                                <h1>Add Review</h1>
                                <input id="review_name" className="form_input input_name" type="text" name="name" placeholder="Name*" required="required" data-error="Name is required." />
                                <input id="review_email" className="form_input input_email" type="email" name="email" placeholder="Email*" required="required" data-error="Valid email is required." />
                            </div>
                            <div>
                                <h1>Your Rating:</h1>
                                <ul className="user_star_rating">
                                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                    <li><i className="fa fa-star-o" aria-hidden="true"></i></li>
                                </ul>
                                <textarea id="review_message" className="input_review" name="message" placeholder="Your Review" rows="4" required data-error="Please, leave us a review."></textarea>
                            </div>
                            <div className="text-left text-sm-right">
                                <button id="review_submit" type="submit" className="red_button review_submit_btn trans_300" value="Submit">submit</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        );
    }
}

Reviews.propTypes = {

};

export default Reviews;