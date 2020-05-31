import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Contact from '../../components/Contact';
import { Switch, Route, Redirect, NavLink, withRouter } from 'react-router-dom';
class ContactPage extends PureComponent {


    render() {
        // console.log('Contact page', '');
        return (
            <Contact />
        );
    }
}

ContactPage.propTypes = {

};

// export default ContactPage;
export default withRouter(ContactPage);