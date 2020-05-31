import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Single from '../../components/Single';
import { Switch, Route, Redirect, NavLink, withRouter } from 'react-router-dom';
class SinglePage extends PureComponent {
    render() {
        // const { match, history, location } = this.props;
        //console.log('Single :', this.props);
        return (
            <div>
                <Single></Single>
            </div>
        );
    }
}

SinglePage.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default withRouter(SinglePage);