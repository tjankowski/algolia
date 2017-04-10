import React from 'react';
import ReactDOM from 'react-dom';
import {
    includes,
    isArray
} from 'lodash';
import App from './containers/App';
import {
    PAYMENT_TYPES,
    NUMERIC_OPERATOR
} from './common/constants/constants';
import createHelper from './common/algolia/helper';
import 'normalize.css';
import './index.css';

const helper = createHelper('L2K34P8B2C', 'f0314e9ed371e4f1a6c1c5d45dc7a34b');

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
        helper.setQueryParameter('aroundLatLng', `${position.coords.latitude}, ${position.coords.longitude}`)
    });
}

const onChange = (event) => {
    event.preventDefault();
    helper.setQuery(event.target.value).search();
};

const onSelectRefinement = (type, value) => {
    if (isArray(value)) {
        value.forEach((item) => {
            helper.toggleRefine(type, item);
        });
    } else {
        helper.toggleRefine(type, value);
    }
    helper.search();
};

const onSelectNumericRefinement = (type, value) => {
    if (includes(helper.getNumericRefinement(type, NUMERIC_OPERATOR), value)) {
        helper.removeNumericRefinement(type, NUMERIC_OPERATOR);
    } else {
        helper.removeNumericRefinement(type, NUMERIC_OPERATOR);
        helper.addNumericRefinement(type, NUMERIC_OPERATOR, value);
    }
    helper.search();
};

const onNextPage = () => {
    helper.nextPage().search();
};

const onClearRefinements = () => {
    helper.clearRefinements().search();
};



ReactDOM.render(
    <App
        onInputChange={ onChange }
        onSelectRefinement={ onSelectRefinement }
        onSelectNumericRefinement={ onSelectNumericRefinement }
        onNextPage={ onNextPage }
        onClearRefinements={ onClearRefinements }
        helper={ helper }
        paymentTypes={ PAYMENT_TYPES }
    />,
    document.getElementById('root')
);
