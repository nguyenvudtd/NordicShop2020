import React, { PureComponent, Suspense } from 'react';
import PropTypes from 'prop-types';
import Banner from '../../components/Home/Banner';
import Slider from '../../components/Home/Slider';
import categoryApi from '../../api/categoryApi'
import productApi from '../../api/productApi'
import DealWeek from '../../components/Home/DealWeek';
import { Spinner } from 'react-bootstrap';
//import NewArrivals from '../../components/Home/NewArrivals';
const NewArrivals = React.lazy(() => import('../../components/Home/NewArrivals'));
class HomePage extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            //activeTodoIdNewArrivals: '32a63859-293f-4e5b-817e-968e28bf309d',
            activeTodoIdNewArrivals: '',
            categoriesList: [],
            productsList: [],
            filters: {
                _page: 1,
                _limit: 12,
            },
            filtersProduct: {
                categoryId: '',
                _page: 1,
                _limit: 12,
            },
        };
    }
    async componentDidMount() {
        //console.log('HOME PAGE: did mount');
        try {
            let categorie = await categoryApi.getAll(this.state.filters)
            let categories = categorie.data
            //console.log('categories :', categories);
            this.setState({ categoriesList: categories });
            //let category = '32a63859-293f-4e5b-817e-968e28bf309d'
            let category = categories[0].id
            //console.log('category :', category);
            const newFilters = {
                ...this.state.filtersProduct,
                categoryId: category,
            }
            let product = await productApi.getAll(newFilters)
            const products = product.data
            /////////////////////////////////
            const { activeTodoIdNewArrivals } = this.state;
            //console.log('activeTodoIdNewArrivals :', activeTodoIdNewArrivals);
            if (activeTodoIdNewArrivals == '') {
                this.setState({ activeTodoIdNewArrivals: categories[0].id });
            }
            //////////////////////////
            this.setState({ productsList: products });
        } catch (error) {
            console.log('Failed to fetch data: ', error.message);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log('HOME PAGE: did update');
    }

    fetchData = async (url) => {
        const response = await fetch(url);
        const responseJSON = await response.json();
        return responseJSON.data;
    }

    handleCategoryChange = async (category) => {
        // fetch products
        try {

            if (!category) {
                //category = '32a63859-293f-4e5b-817e-968e28bf309d'
            }

            const newFilters = {
                ...this.state.filtersProduct,
                categoryId: category,
            }
            let product = await productApi.getAll(newFilters)
            const products = product.data

            this.setState({ activeTodoIdNewArrivals: category, productsList: products });

        } catch (error) {
            console.log('Failed to fetch products: ', error.message);
        }
    };

    render() {
        const { categoriesList, productsList, activeTodoIdNewArrivals } = this.state;
        const style = { textAlign: 'center', position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
        return (
            <div>

                <Slider></Slider>
                <Banner></Banner>
                <Suspense fallback={
                    <div style={style}>
                        <div>Loading server details</div>&nbsp;&nbsp;
                        <Spinner animation="border" role="status" size="large">
                            <span className="sr-only">Loading...</span>
                        </Spinner></div>
                }>
                    {/* <Suspense fallback={<span className="sr-only">Loading...</span>}> */}
                    <NewArrivals categoriesList={categoriesList}
                        activeTodoIdNewArrivals={activeTodoIdNewArrivals}
                        productsList={productsList}
                        onActiveItemChange={this.handleCategoryChange}
                    />
                </Suspense>
                <DealWeek ></DealWeek>
            </div>
        );
    }
}

HomePage.propTypes = {

};

export default HomePage;