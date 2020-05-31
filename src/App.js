import React, { PureComponent } from 'react';
// import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';
import Header from './components/Common/Header';
import HomePage from './containers/HomePage';
import Benefit from './components/Common/Benefit';
import Footer from './components/Common/Footer/Footer';

import { BrowserRouter, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NotFound from './containers/NotFound';
import ProductPage from './containers/ProductPage';
import SinglePage from './containers/SinglePage';
import CartPage from './containers/CartPage';
import ContactPage from './containers/ContactPage';

class App extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
    }
  }
  render() {
    // const { match, history, location } = this.props;
    return (
      <div className="app" >


        <BrowserRouter>
          <Header />
          <Switch>

            {/* <Route  path="/" component={HomePage} /> */}
            <Route exact path="/" component={HomePage} />
            <Route path="/index.html" component={HomePage} />
            <Route path="/categories" component={ProductPage} />
            <Route path="/single" component={SinglePage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/cart" component={CartPage} />
            <Redirect from="/reactjs" to="/" />
            <Route component={NotFound} />

          </Switch>
          <Benefit />
          <Footer />
        </BrowserRouter>




      </div>
    );
  }
}
// App.propTypes = {

//   match: PropTypes.object.isRequired,
//   location: PropTypes.object.isRequired,
//   history: PropTypes.object.isRequired,


// };
const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({

  }, dispatch);
}

// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
export default connect(mapStateToProps, mapDispatchToProps)(App);

