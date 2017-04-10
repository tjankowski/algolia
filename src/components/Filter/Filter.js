import React from 'react';
import cx from 'classnames';

export function FilterOption({ children, isSelected, onClick, selectedClass = 'Filter__Option--selected' }) {
    const classNames = cx('Filter__Option', {
        [ selectedClass ] : isSelected
    });

    return (
        <li className={ classNames } onClick={ onClick }>
            { children }
        </li>
    );
};

function Filter({ label, children }) {
    return (
        <div className='Filter'>
            <label className="Filter__Label">{ label }</label>
            <ul className="Filter__Options">
                { children }
            </ul>
        </div>
    );
}

Filter.propTypes = {
    label: React.PropTypes.string.isRequired
};

export default Filter;