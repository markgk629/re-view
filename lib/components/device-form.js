/**
 * Device add/edit form
 */
'use strict';
import tr from 'tiny-react';
import {cl} from './utils';
import {getStateValue, deviceWallFSM as fsm} from '../app';

const fid = name => `device-form.${name}`;

export default tr.component({
    render(props) {
        props = props || {};
        return <form action="" className={cl('form', props.visible && 'form_visible')}
            onsubmit={onSubmit} onreset={onReset} oninput={onInput}>
            <input type="hidden" name="id" value={props.id} />
            <div className={cl('form-row')}>
                <label htmlFor={fid('title')} className={cl('form-label')}>Device name</label>
                <input type="text" name="title" id={fid('title')} value={props.title || ''} required />
            </div>

            <div className={cl('form-row')}>
                <label htmlFor={fid('width')} className={cl('form-label')}>Screen size</label>
                <input type="number" name="width" id={fid('width')} value={props.width || ''} min="100" max="4096" required />
                <span> × </span>
                <input type="number" name="height" value={props.height || ''} min="100" max="4096" required />
                <span> px</span>
            </div>

            <div className={cl('form-row')}>
                <label htmlFor={fid('user-agent')} className={cl('form-label')}>User agent string (optional)</label>
                <textarea name="user-agent" fid={fid('user-agent')}>{props['user-agent'] || ''}</textarea>
            </div>

            <div className={cl('form-controls')}>
                <input type="submit" value="Save" className={cl('button')} />
                <input type="reset" value="Cancel" className={cl('button')} />
            </div>
        </form>
    }
});

function onSubmit(evt) {
    evt.preventDefault();
    fsm.submitDeviceEdit(getStateValue('deviceWallPicker.stateData'));
}

function onReset(evt) {
    evt.preventDefault();
    fsm.cancelDeviceEdit();
}

function onInput(evt) {
    var elem = evt.target;
    var value = elem.value;
    if (elem.type === 'number') {
        value = parseInt(value, 10);
        if (isNaN(value)) {
            value = 200;
        }
    }
    fsm.updateDeviceEditData({[elem.name]: value});
}
