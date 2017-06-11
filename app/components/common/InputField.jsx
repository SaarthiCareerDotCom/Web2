import React from 'react';

var Input = React.createClass({
    getDefaultProps: function () {
        return {
            className: "",
            type: "text",
            name: "",
            placeholder: "",
            validate: null,
            value: ""
        }
    },

    getInitialState: function () {
        return {
            value: null,
            errorMessage: "",
            errorVisible: false
        }
    },
    validation: function (value, valid) {
        var message = "";
        var errorVisible = false;
        if (valid == false) {
            message = this.props.errorMessage;
            errorVisible = true;
        }
        this.setState({
            value: value,
            errorMessage: message,
            errorVisible: errorVisible
        });
    },

    getValue: function () {
        return this.refs.input.value;
    },

    handleFocusChange: function (event) {
        if (this.props.validate) {
            var valid = this.props.validate(event.target.value);
        }
        this.validation(event.target.value, valid);
    },
    render: function () {
        return (
            <div>
                <input className={this.props.className} type={this.props.type} name={this.props.name} placeholder={this.props.placeholder} onBlur={this.handleFocusChange} ref="input" />
                {this.state.errorVisible && <div>{this.props.errorMessage}</div>}
            </div>
        );
    }
});

module.exports = Input;