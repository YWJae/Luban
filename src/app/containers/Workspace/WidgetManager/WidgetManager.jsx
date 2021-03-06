import _ from 'lodash';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../../../components/Modal';
import i18n from '../../../lib/i18n';
import WidgetList from './WidgetList';

class WidgetManager extends PureComponent {
    static propTypes = {
        onSave: PropTypes.func,
        onClose: PropTypes.func.isRequired,

        defaultWidgets: PropTypes.array.isRequired,
        primaryWidgets: PropTypes.array.isRequired,
        secondaryWidgets: PropTypes.array.isRequired

    };

    state = {
        show: true
    };

    widgetList = [
        {
            id: 'visualizer',
            caption: i18n._('Visualizer Widget'),
            details: i18n._('This widget visualizes a G-code file and simulates the tool path.'),
            visible: true,
            disabled: true
        },
        {
            id: 'connection',
            caption: i18n._('Connection Widget'),
            details: i18n._('This widget lets you establish a connection to a serial port.'),
            visible: true,
            disabled: true
        },
        {
            id: 'console',
            caption: i18n._('Console Widget'),
            details: i18n._('This widget lets you read and write data to the CNC controller connected to a serial port.'),
            visible: true,
            disabled: false
        },
        {
            id: 'grbl',
            caption: i18n._('Grbl Widget'),
            details: i18n._('This widget can view Grbl state and settings.'),
            visible: true,
            disabled: false
        },
        {
            id: 'marlin',
            caption: i18n._('Marlin Widget'),
            details: i18n._('This widget can view Marlin state and settings.'),
            visible: true,
            disabled: false
        },
        {
            id: 'smoothie',
            caption: i18n._('Smoothie Widget'),
            details: i18n._('This widget can view Smoothie state and settings.'),
            visible: true,
            disabled: false
        },
        {
            id: 'tinyg',
            caption: i18n._('TinyG Widget'),
            details: i18n._('This widget can view TinyG state and settings.'),
            visible: true,
            disabled: false
        },
        {
            id: 'control',
            caption: i18n._('Control Widget'),
            details: i18n._('This widget shows the XYZ position. It includes jog controls, homing, and axis zeroing.'),
            visible: true,
            disabled: false
        },
        {
            id: 'gcode',
            caption: i18n._('G-code Widget'),
            details: i18n._('This widget shows the current status of G-code commands.'),
            visible: true,
            disabled: false
        },
        {
            id: 'laser',
            caption: i18n._('Laser Widget'),
            details: i18n._('This widget allows you control laser intensity and turn the laser on/off.'),
            visible: true,
            disabled: false
        },
        {
            id: 'webcam',
            caption: i18n._('Webcam Widget'),
            details: i18n._('This widget lets you monitor a webcam.'),
            visible: true,
            disabled: false
        }
    ];

    actions = {
        handleChange: (id, checked) => {
            const o = _.find(this.widgetList, { id: id });
            if (o) {
                o.visible = checked;
            }
        },
        handleSave: () => {
            this.setState({ show: false });

            const activeWidgets = _(this.widgetList)
                .filter(item => item.visible)
                .map(item => item.id)
                .value();
            const inactiveWidgets = _(this.widgetList)
                .map('id')
                .difference(activeWidgets)
                .value();

            this.props.onSave(activeWidgets, inactiveWidgets);
        },
        handleCancel: () => {
            this.setState({ show: false });
        }
    };

    componentDidUpdate() {
        if (!(this.state.show)) {
            this.props.onClose();
        }
    }

    render() {
        const defaultWidgets = this.props.defaultWidgets
            .map(widgetId => widgetId.split(':')[0]);
        const primaryWidgets = this.props.primaryWidgets
            .map(widgetId => widgetId.split(':')[0]);
        const secondaryWidgets = this.props.secondaryWidgets
            .map(widgetId => widgetId.split(':')[0]);
        const activeWidgets = _.union(defaultWidgets, primaryWidgets, secondaryWidgets);

        this.widgetList.forEach((widget) => {
            widget.visible = _.includes(activeWidgets, widget.id);
        });

        const actions = this.actions;

        return (
            <Modal
                onClose={actions.handleCancel}
                show={this.state.show}
                size="md"
            >
                <Modal.Header>
                    <Modal.Title>{i18n._('Widgets')}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: 0 }}>
                    <WidgetList list={this.widgetList} onChange={actions.handleChange} />
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={actions.handleCancel}
                    >
                        {i18n._('Cancel')}
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={actions.handleSave}
                    >
                        {i18n._('OK')}
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}
const mapStateToProps = (state) => {
    const widget = state.widget;
    const defaultWidgets = widget.workspace.default.widgets;
    const primaryWidgets = widget.workspace.primary.widgets;
    const secondaryWidgets = widget.workspace.secondary.widgets;
    return {
        defaultWidgets,
        primaryWidgets,
        secondaryWidgets
    };
};

export default connect(mapStateToProps, null)(WidgetManager);
