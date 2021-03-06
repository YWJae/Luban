import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import i18n from '../../lib/i18n';
import RepeatButton from '../../components/RepeatButton';
import {
    DISTANCE_MIN,
    DISTANCE_MAX,
    DISTANCE_STEP
} from './constants';
import styles from './index.styl';

const JogDistance = (props) => {
    const { state, actions } = props;
    const { canClick, units, selectedDistance, customDistance } = state;

    const distance = String(selectedDistance); // force convert to string
    const isCustomDistanceSelected = !(_.includes(['10', '1', '0.1', '0.05'], distance));
    const classes = {
        '10': classNames(
            'btn',
            {
                'btn-secondary': distance === '10',
                'btn-outline-secondary': distance !== '10'
            }
        ),
        '1': classNames(
            'btn',
            {
                'btn-secondary': distance === '1',
                'btn-outline-secondary': distance !== '1'
            }
        ),
        '0.1': classNames(
            'btn',
            {
                'btn-secondary': distance === '0.1',
                'btn-outline-secondary': distance !== '0.1'
            }
        ),
        '0.05': classNames(
            'btn',
            {
                'btn-secondary': distance === '0.05',
                'btn-outline-secondary': distance !== '0.05'
            }
        ),
        'custom': classNames(
            'btn',
            {
                'btn-secondary': isCustomDistanceSelected,
                'btn-outline-secondary': !isCustomDistanceSelected
            }
        )
    };

    return (
        <div className={styles['jog-distance-control']}>
            <div className="row no-gutters">
                <div className="col-12">
                    <div className="input-group">
                        <button
                            type="button"
                            className={classes['10']}
                            title={`10 ${units}`}
                            onClick={() => actions.selectDistance('10')}
                            disabled={!canClick}
                        >
                            10
                        </button>
                        <button
                            type="button"
                            className={classes['1']}
                            title={`1 ${units}`}
                            onClick={() => actions.selectDistance('1')}
                            disabled={!canClick}
                        >
                            1
                        </button>
                        <button
                            type="button"
                            className={classes['0.1']}
                            title={`0.1 ${units}`}
                            onClick={() => actions.selectDistance('0.1')}
                            disabled={!canClick}
                        >
                            0.1
                        </button>
                        <button
                            type="button"
                            className={classes['0.05']}
                            title={`0.05 ${units}`}
                            onClick={() => actions.selectDistance('0.05')}
                            disabled={!canClick}
                        >
                            0.05
                        </button>
                        <button
                            type="button"
                            className={classes.custom}
                            title={i18n._('User Defined')}
                            onClick={() => actions.selectDistance()}
                            disabled={!canClick}
                        >
                            <i className="fa fa-adjust" />
                        </button>
                        <input
                            type="number"
                            className="form-control"
                            title={i18n._('Custom distance for every move operation')}
                            min={DISTANCE_MIN}
                            max={DISTANCE_MAX}
                            step={DISTANCE_STEP}
                            value={customDistance}
                            onChange={(event) => {
                                const value = event.target.value;
                                actions.changeCustomDistance(value);
                            }}
                            disabled={!canClick}
                        />
                        <RepeatButton
                            className="btn btn-outline-secondary"
                            title={i18n._('Increase custom distance by one unit')}
                            onClick={actions.increaseCustomDistance}
                            disabled={!canClick}
                        >
                            <i className="fa fa-plus" />
                        </RepeatButton>
                        <RepeatButton
                            className="btn btn-outline-secondary"
                            title={i18n._('Decrease custom distance by one unit')}
                            onClick={actions.decreaseCustomDistance}
                            disabled={!canClick}
                        >
                            <i className="fa fa-minus" />
                        </RepeatButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

JogDistance.propTypes = {
    state: PropTypes.object,
    actions: PropTypes.object
};

export default JogDistance;
