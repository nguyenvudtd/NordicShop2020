import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SanitizedHTML from 'react-sanitized-html';
import { getID, addToCard } from '../../../actions/getIDProduct';
import { useSelector, useDispatch, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, Route, Redirect, NavLink, withRouter } from 'react-router-dom';
class Description extends PureComponent {
    render() {

        const { cartDetail } = this.props;
        // console.log('cartDetail :', cartDetail.id.description);
        const HTML_FROM_USER = cartDetail.id.description;
        // <SanitizedHTML html={HTML_FROM_USER} />,
        return (

            <div className="row">
                <SanitizedHTML html={HTML_FROM_USER} />
            </div>


        );
    }
}


Description.propTypes = {
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
        getID,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps
)(withRouter(Description));