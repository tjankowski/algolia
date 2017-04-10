import React from 'react';
import { duration } from 'moment';
import './SearchSummary.css';

function SearchSummary({ nbHits, processingTimeMS }) {
    return (
        <div className='SearchSummary'>
            <div>
                <span className='SearchSummary__Results'>{nbHits} results found </span>
                <span className='SearchSummary__Time'>in { duration(processingTimeMS, 'ms').asSeconds() } seconds</span>
            </div>
            <div className='SearchSummary__Separator'></div>
        </div>
    );
}

SearchSummary.propTypes = {
    nbHits: React.PropTypes.number.isRequired,
    processingTimeMS: React.PropTypes.number.isRequired
};

export default  SearchSummary;