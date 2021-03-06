import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Slider from 'rc-slider';

import i18n from '../../../lib/i18n';
import { NumberInput as Input } from '../../../components/Input';
import TipTrigger from '../../../components/TipTrigger';
import { actions } from '../../../flux/cncLaserShared';

class ConfigRasterVector extends PureComponent {
    static propTypes = {
        vectorThreshold: PropTypes.number,
        invert: PropTypes.bool,
        turdSize: PropTypes.number,

        updateSelectedModelConfig: PropTypes.func.isRequired
    };

    state = {
        expanded: true
    };

    actions = {
        onToggleExpand: () => {
            this.setState(state => ({ expanded: !state.expanded }));
        },
        changeVectorThreshold: (vectorThreshold) => {
            this.props.updateSelectedModelConfig({ vectorThreshold });
        },
        onChangeTurdSize: (turdSize) => {
            this.props.updateSelectedModelConfig({ turdSize });
        },
        onToggleInvert: (event) => {
            this.props.updateSelectedModelConfig({ invert: event.target.checked });
        }
    };

    render() {
        const { vectorThreshold, invert, turdSize } = this.props;

        return (
            <div>
                {this.state.expanded && (
                    <React.Fragment>
                        <div>
                            <TipTrigger
                                title={i18n._('Invert')}
                                content={i18n._('Inverts black to white and vise versa.')}
                            >
                                <div className="sm-parameter-row">
                                    <span className="sm-parameter-row__label">{i18n._('Invert')}</span>
                                    <input
                                        type="checkbox"
                                        className="sm-parameter-row__checkbox"
                                        checked={invert}
                                        onChange={this.actions.onToggleInvert}
                                    />
                                </div>
                            </TipTrigger>
                            <TipTrigger
                                title={i18n._('B&W')}
                                content={i18n._('Set the proportion of the black color based on the original color of the image.')}
                            >
                                <div className="sm-parameter-row">
                                    <span className="sm-parameter-row__label">{i18n._('B&W')}</span>
                                    <Input
                                        className="sm-parameter-row__slider-input"
                                        value={vectorThreshold}
                                        min={0}
                                        max={20}
                                        onChange={this.actions.changeVectorThreshold}
                                    />
                                    <Slider
                                        className="sm-parameter-row__slider"
                                        defaultValue={vectorThreshold}
                                        min={0}
                                        max={255}
                                        step={1}
                                        onChange={this.actions.changeVectorThreshold}
                                    />
                                </div>
                            </TipTrigger>
                            <TipTrigger
                                title={i18n._('Impurity Size')}
                                content={i18n._('Determines the minimum size of impurity which allows to be showed.')}
                            >
                                <div className="sm-parameter-row">
                                    <span className="sm-parameter-row__label">{i18n._('Impurity Size')}</span>
                                    <Input
                                        className="sm-parameter-row__input"
                                        value={turdSize}
                                        min={0}
                                        max={10000}
                                        onChange={this.actions.onChangeTurdSize}
                                    />
                                </div>
                            </TipTrigger>
                        </div>
                    </React.Fragment>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { config } = state.laser;
    const { vectorThreshold, invert, turdSize } = config;
    return {
        vectorThreshold,
        invert,
        turdSize
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateSelectedModelConfig: (config) => dispatch(actions.updateSelectedModelConfig('laser', config))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigRasterVector);
