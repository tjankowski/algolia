import React from 'react';
import Stars from '../Stars/Stars';
import './Item.css';

function Item({ item }) {
    return (
        <article className='Item'>
            <img className='Item__Image' src={ item.image_url } alt={ item.name } />
            <div className='Item__Description'>
                <div className='Item__Name'>{ item.name }</div>
                <div className='Item__Reviews'>
                    <span className='Item__ReviewsValue'>{ item.stars_count }</span>
                    <Stars value={ item.stars_count } />
                    <span className='Item__ReviewsCount'>({ item.reviews_count } reviews)</span>
                </div>
                <div className='Item__Info'>
                    <span className='Item__InfoItem'>{ item.food_type.join(' & ') }</span>
                    <span className='Item__InfoItem'>{ item.neighborhood }</span>
                    <span className='Item__InfoItem'>{ item.price_range }</span>
                </div>
            </div>
        </article>
    );
}

Item.propTypes = {
    item: React.PropTypes.shape({
        objectID: React.PropTypes.string.isRequired,
        image_url: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        stars_count: React.PropTypes.number.isRequired,
        reviews_count: React.PropTypes.number.isRequired,
        food_type: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        neighborhood: React.PropTypes.string.isRequired,
        price_range: React.PropTypes.string.isRequired,
    }).isRequired,
};

export default Item;
