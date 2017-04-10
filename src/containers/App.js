import React, { Component } from 'react';
import {
    range,
    mapValues,
    values,
    includes,
    isEmpty
} from 'lodash';
import Item from '../components/Item/Item';
import Stars from '../components/Stars/Stars';
import Button from '../components/Button/Button';
import SearchSummary from '../components/SearchSummary/SearchSummary';
import Filter, { FilterOption } from '../components/Filter/Filter';
import Action from '../components/Action/Action';
import {
    FIELDS,
    NUMERIC_OPERATOR
} from '../common/constants/constants';
import './App.css';
import '../components/Filter/Filter.css';

function isNotLastPage(current, nuberOfPages) {
    return nuberOfPages > current + 1;
}

class App extends Component {

    constructor(props) {
        super(props);
        this.helper = props.helper;
        this.state = {
            results: {},
            hits: [],
            foodTypes: [],
        };
    }

    componentDidMount() {
        this.helper.on('result', (results) => {
            this.setState({
                results,
                hits: results.page > 0 ? [...this.state.hits, ...results.hits] : results.hits,
                foodTypes: results.getFacetValues(FIELDS.FOOD_TYPE, {sortBy: ['count:desc', 'selected']}),
            });
        });
        this.helper.search();
    }

    renderMoreItemsButton = (nextPage) => {
        return (
            <div className='Content__footer'>
                <Button label='Show more' onClick={ nextPage } />
            </div>
        );
    };

    renderSearchSummary = (nbHits, processingTimeMS) => {
        return (
            <div className='Content__header'>
                <SearchSummary nbHits={ nbHits } processingTimeMS={ processingTimeMS } />
            </div>
        )
    };

    renderFoodType = ({ name, count, isRefined }, key) => {
        return (
            <FilterOption
                key={key}
                isSelected={ isRefined }
                onClick={ this.props.onSelectRefinement.bind(this, FIELDS.FOOD_TYPE, name) }
            >
                <span className='Filter__OptionLabel'>{ name }</span>
                <span className='Filter__OptionCount'>{ count }</span>
            </FilterOption>
        );
    };

    renderPaymentType = (value, key) => {
        return (
            <FilterOption
                key={key}
                isSelected={ this.state.results._state && includes(this.state.results._state.disjunctiveFacetsRefinements.payment_options, key) }
                onClick={ this.props.onSelectRefinement.bind(this, FIELDS.PAYMENT_OPTIONS, value) }
            >
                <span className='Filter__OptionLabel'>{ key }</span>
            </FilterOption>
        );
    };

    renderStarFacet = (value, key) => {
        return (
            <FilterOption
                key={key}
                isSelected={ includes(this.helper.getNumericRefinement(FIELDS.STARS_COUNT, NUMERIC_OPERATOR), value) }
                selectedClass='Filter__Option--hover'
                onClick={this.props.onSelectNumericRefinement.bind(this, FIELDS.STARS_COUNT, value)}
            >
                <Stars className='space-vertical' value={ value } />
            </FilterOption>
        );
    };

    render() {
        const { paymentTypes, onNextPage, onClearRefinements, onInputChange } = this.props;
        const { hits } = this.state;
        const { nbHits, processingTimeMS, page, nbPages } = this.state.results;
        return (
            <div className='App'>
                <header className='App__header'>
                    <input className='App__search' type='text' onChange={ onInputChange }
                           placeholder='Search for Restaurants by Name, Cuisine, Location'/>
                </header>
                <div className='App__content'>
                    <aside className='Sidebar'>
                        <Filter label='Cuisine/Food Type'>
                            { this.state.foodTypes.map(this.renderFoodType) }
                        </Filter>
                        <Filter label='Rating'>
                            { range(1, 6).map(this.renderStarFacet, this) }
                        </Filter>
                        <Filter label='Payment options'>
                            { values(mapValues(paymentTypes, this.renderPaymentType)) }
                        </Filter>
                    </aside>
                    <main className='Content'>
                        { nbHits != null ? this.renderSearchSummary(nbHits, processingTimeMS) : null }
                        <div>
                            {
                                isEmpty(hits) ?
                                    <span>
                                        <span>It looks that we didn't find any results for your request. </span>
                                        <Action label='Clear all your filters and try again.' onClick={ onClearRefinements } />
                                    </span> :
                                    hits.map((item) => (<Item key={item.objectID} item={item} />))
                            }
                        </div>
                        { isNotLastPage(page, nbPages) ? this.renderMoreItemsButton( onNextPage ) : null }
                    </main>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    paymentTypes: React.PropTypes.objectOf(React.PropTypes.arrayOf(React.PropTypes.string)).isRequired,
    onNextPage: React.PropTypes.func.isRequired,
    onClearRefinements: React.PropTypes.func.isRequired,
    onInputChange: React.PropTypes.func.isRequired,
    onSelectNumericRefinement: React.PropTypes.func.isRequired,
    helper: React.PropTypes.object.isRequired
};

export default App;
