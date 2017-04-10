import React from 'react';
import cx from 'classnames';
import './Stars.css';

function Stars({ value, className }) {
    const percent = value / 5 * 100;
    return (
        <span className={ cx('Stars', className) }>
            <span style={{ width: `${percent}%` }} className='Stars__Rating'></span>
        </span>
    );
}

Stars.propTypes = {
    value: React.PropTypes.number.isRequired,
    className: React.PropTypes.string
};

export default Stars;