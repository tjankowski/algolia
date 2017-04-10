import algoliasearch from 'algoliasearch';
import algoliasearchHelper from 'algoliasearch-helper';
import { FIELDS } from '../constants/constants';

export default function createHelper(applicationID, apiKey, index = 'dev_RESTAURANTS') {
    const client = algoliasearch(applicationID, apiKey);
    return algoliasearchHelper(client, index, {
        facets: [FIELDS.STARS_COUNT],
        disjunctiveFacets: [FIELDS.FOOD_TYPE, FIELDS.PAYMENT_OPTIONS],
        hitsPerPage: 5,
        maxValuesPerFacet: 7,

    });
}



