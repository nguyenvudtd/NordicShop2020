import React, { PureComponent, useEffect, Suspense } from 'react';
import PropTypes from 'prop-types';
//import Product from '../../components/Product';
import productApi from '../../api/productApi'
import { Switch, Route, withRouter } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import ClipLoader from "react-spinners/ClipLoader";
import { PushSpinner } from "react-spinners-kit";

const Product = React.lazy(() => import('../../components/Product'));


class ProductPage extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            filters: {
                _page: 1,
                _limit: 12,
                _sort: 'originalPrice',
                _order: 'asc',
                salePrice_gte: 100000,
                salePrice_lte: 2000000,
            },
            productsList: [],
            totalRows: 0,
            totalPage: 0,

        }
    }
    CalculatePage(totalRows, limitOnePage) {
        if (!totalRows && totalRows > 0) return
        let totalPage = 0
        if (totalRows <= limitOnePage) {
            totalPage = 1
        }
        else {
            totalPage = Math.round(totalRows / limitOnePage)
        }
        return totalPage
    }
    async componentDidMount() {
        const products = await productApi.getAll(this.state.filters)
        //console.log(products);
        // this.wait(3000);
        this.setState(prevState => {
            const totalRows = products.pagination._totalRows
            const limitOnePage = this.state.filters._limit
            if (!totalRows && totalRows > 0) return
            let totalPage = 0
            if (totalRows <= limitOnePage) {
                totalPage = 1
            }
            else {
                totalPage = Math.round(totalRows / limitOnePage)
            }
            return {
                productsList: products.data,
                totalRows: products.pagination._totalRows,
                totalPage: totalPage,
            }
        });

    }

    handlePageChange = async (newPage) => {
        const newFilters = {
            ...this.state.filters,
            _page: newPage,
        }
        //console.log('newPage :', newPage);
        const products = await productApi.getAll(newFilters)
        //console.log('products :', products);
        this.setState(prevState => {
            return {
                filters: newFilters,
                productsList: products.data,

            };
        });
        console.log(products);
    }
    handlePageLimit = async (limitPage) => {
        const newFilters = {
            ...this.state.filters,
            _limit: limitPage,
        }
        //console.log('limitPage :', limitPage);
        const products = await productApi.getAll(newFilters)
        //console.log('products :', products);
        this.setState(prevState => {
            const totalRows = products.pagination._totalRows
            const limitOnePage = limitPage
            if (!totalRows && totalRows > 0) return
            let totalPage = 0
            if (totalRows <= limitOnePage) {
                totalPage = 1
            }
            else {
                totalPage = Math.round(totalRows / limitOnePage)
            }
            return {
                filters: newFilters,
                productsList: products.data,
                totalPage: totalPage,
            };
        });
        console.log(products);
    }
    handleSortBy = async (sortBy) => {
        let newSortBy = '';
        if (sortBy == 'Default Sorting') {
            newSortBy = 'originalPrice'
        }
        if (sortBy == 'Price') {
            newSortBy = 'salePrice'
        }
        if (sortBy == 'Product Name') {
            newSortBy = 'name'
        }
        const newFilters = {
            ...this.state.filters,
            _sort: newSortBy,
        }
        //console.log('sortBy :', sortBy);
        const products = await productApi.getAll(newFilters)
        //console.log('products :', products);
        this.setState(prevState => {
            const totalRows = products.pagination._totalRows
            const limitOnePage = products.pagination._limit
            if (!totalRows && totalRows > 0) return
            let totalPage = 0
            if (totalRows <= limitOnePage) {
                totalPage = 1
            }
            else {
                totalPage = Math.round(totalRows / limitOnePage)
            }
            return {
                filters: newFilters,
                productsList: products.data,
                totalPage: totalPage,
            };
        });
        console.log(products);
    }

    handlePriceFilterChange = async (priceRange) => {
        const newFilters = {
            // ...priceRange.filters,
            ...this.state.filters,
            _page: 1,
            salePrice_gte: priceRange.min,
            salePrice_lte: priceRange.max,
        };
        //console.log('newFilter :', newFilter);
        // Call API with new filters
        const products = await productApi.getAll(newFilters)
        //console.log('products :', products);
        const totalRows = products.pagination._totalRows
        const limitOnePage = this.state.filters._limit
        if (!totalRows && totalRows > 0) return
        let totalPage = 0
        if (totalRows <= limitOnePage) {
            totalPage = 1
        }
        else {
            totalPage = Math.round(totalRows / limitOnePage)
        }
        this.setState(prevState => {
            return {
                filters: newFilters,
                productsList: products.data,
                totalPage: totalPage,

            };
        });
        //console.log(products);

        //return products.data
        //this.setState({ productsList: products.data });
        // Call success --> update state: product list + new filters
    }

    render() {
        const { filters, productsList, totalRows, totalPage } = this.state;
        //console.log(productsList);
        //console.log('totalRows :', totalRows);
        // console.log('totalPage :', totalPage);
        //console.log('filters :', filters);

        const { match, history, location } = this.props;
        const routingHelpers = {
            match,
            location,
            history,
        };
        const style = { textAlign: 'center', position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

        return (
            <div>
                <Suspense fallback={<div style={style}>
                    <div>Loading server details</div>&nbsp;&nbsp;
                        <Spinner animation="border" role="status" size="large" width={'300%'}>
                        <span className="sr-only">Loading...</span>
                    </Spinner></div>
                }>
                    {/* <Suspense fallback={
                    <div className="sweet-loading">
                        <ClipLoader

                            size={150}
                            color={"#123abc"}
                        // loading={this.state.loading}
                        />
                    </div>
                }> */}

                    {/* <Suspense fallback={<PushSpinner size={40} color="#686769" /> */}
                }>
                    <Product
                        productsList={productsList}
                        filters={filters}
                        totalPage={totalPage}
                        totalRows={totalRows}
                        onPriceChange={this.handlePriceFilterChange}
                        onPageChange={this.handlePageChange}
                        onPageLimit={this.handlePageLimit}
                        onSortBy={this.handleSortBy}
                    // {...routingHelpers}
                    ></Product>
                </Suspense>


            </div >
        );
    }
}

ProductPage.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default withRouter(ProductPage);