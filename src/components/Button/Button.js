import React from 'react';
import { noop } from 'lodash';
import ClickableLabel from '../../common/propTypes/ClickableLabel';
import './Button.css';

function Button({ label, onClick = noop }) {
    return (
        <button className="Button" onClick={ onClick }>{ label }</button>
    );
}

Button.propTypes = ClickableLabel;

export default Button;
