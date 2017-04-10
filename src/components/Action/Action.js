import React from 'react';
import ClickableLabel from '../../common/propTypes/ClickableLabel';
import './Action.css';

function Action({ label, onClick }) {
    return (
        <a className='Action' href='#' onClick={ onClick }>
            { label }
        </a>
    );
}

Action.propTypes = ClickableLabel;

export default Action;
