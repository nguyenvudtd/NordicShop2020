import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, NavLink, withRouter } from 'react-router-dom';
import './contact_styles.css'

class Contact extends PureComponent {
    render() {
        return (
            <div className="container contact_container">
                <div className="row">
                    <div className="col">

                        {/* <!-- Breadcrumbs --> */}

                        <div className="breadcrumbs d-flex flex-row align-items-center">
                            <ul>
                                <li><a href="index.html">Home</a></li>
                                <li className="active"><a href="#"><i className="fa fa-angle-right" aria-hidden="true"></i>Contact</a></li>
                            </ul>
                        </div>

                    </div>
                </div>

                {/* <!-- Map Container --> */}

                <div className="row">
                    <div className="col">
                        <div id="google_map">
                            <div className="map_container">
                                <div id="map">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1958.9705747736402!2d106.76495177191613!3d10.892077213457283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDUzJzMxLjUiTiAxMDbCsDQ1JzU3LjEiRQ!5e0!3m2!1svi!2s!4v1590724074115!5m2!1svi!2s" width="100%" height="100%" frameborder="0" style={{ border: 0 }} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Contact Us --> */}

                <div className="row">

                    <div className="col-lg-6 contact_col">
                        <div className="contact_contents">
                            <h1>Contact Us</h1>
                            <p>There are many ways to contact us. You may drop us a line, give us a call or send an email, choose what suits you the most.</p>
                            <div>
                                <p>(800) 686-6688</p>
                                <p>info.deercreative@gmail.com</p>
                            </div>
                            <div>
                                <p>mm</p>
                            </div>
                            <div>
                                <p>Open hours: 8.00-18.00 Mon-Fri</p>
                                <p>Sunday: Closed</p>
                            </div>
                        </div>

                        {/* <!-- Follow Us --> */}

                        <div className="follow_us_contents">
                            <h1>Follow Us</h1>
                            <ul className="social d-flex flex-row">
                                <li><a href="#" style={{ backgroundColor: "#3a61c9" }}><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                                <li><a href="#" style={{ backgroundColor: "#41a1f6" }}><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                                <li><a href="#" style={{ backgroundColor: "#fb4343" }}><i className="fa fa-google-plus" aria-hidden="true"></i></a></li>
                                <li><a href="#" style={{ backgroundColor: "#8f6247" }}><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                            </ul>
                        </div>

                    </div>

                    <div className="col-lg-6 get_in_touch_col">
                        <div className="get_in_touch_contents">
                            <h1>Get In Touch With Us!</h1>
                            <p>Fill out the form below to recieve a free and confidential.</p>
                            <form action="post">
                                <div>
                                    <input id="input_name" className="form_input input_name input_ph" type="text" name="name" placeholder="Name" required="required" data-error="Name is required." />
                                    <input id="input_email" className="form_input input_email input_ph" type="email" name="email" placeholder="Email" required="required" data-error="Valid email is required." />
                                    <input id="input_website" className="form_input input_website input_ph" type="url" name="name" placeholder="Website" required="required" data-error="Name is required." />
                                    <textarea id="input_message" className="input_ph input_message" name="message" placeholder="Message" rows="3" required data-error="Please, write us a message."></textarea>
                                </div>
                                <div>
                                    <button id="review_submit" type="submit" className="red_button message_submit_btn trans_300" value="Submit">send message</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>



        );
    }
}

Contact.propTypes = {

};
// export default Contact;
export default withRouter(Contact);
