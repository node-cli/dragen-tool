import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
var __rest = this && this.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};
import React from 'react';
import classnames from 'classnames';
import Icon from '../icon';
import TouchFeedback from 'rmc-feedback';
// 类对接口的实现： class A implements ButtonProps{}
// 类型声明：布尔、数字、字符串、数组:numer[]= 或 Array<number>=、元组(联合类型):[string, number]=、枚举 enum name {var = idx, ...}、any、void、Never、Null和Undefined；类型断言
// 数组、对象的解构与展开
var rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/; // 中文
var isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
function isString(str) {
    return typeof str === 'string';
}
function insertSpace(child) {
    // 两者判断的区别
    if (isString(child.type) && isTwoCNChar(child.props.children)) {
        return React.cloneElement(child, {}, child.props.children.split('').join(' '));
    }
    if (isString(child)) {
        if (isTwoCNChar(child)) {
            child = child.split('').join(' ');
        }
        return React.createElement(
            'span',
            null,
            child
        );
    }
    return child;
}

var Button = function (_React$Component) {
    _inherits(Button, _React$Component);

    function Button() {
        _classCallCheck(this, Button);

        return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
    }

    _createClass(Button, [{
        key: 'render',
        value: function render() {
            var _classnames;

            var _a = this.props,
                children = _a.children,
                className = _a.className,
                prefixCls = _a.prefixCls,
                type = _a.type,
                size = _a.size,
                inline = _a.inline,
                disabled = _a.disabled,
                icon = _a.icon,
                loading = _a.loading,
                activeStyle = _a.activeStyle,
                activeClassName = _a.activeClassName,
                onClick = _a.onClick,
                delayPressIn = _a.delayPressIn,
                delayPressOut = _a.delayPressOut,
                restProps = __rest(_a, ["children", "className", "prefixCls", "type", "size", "inline", "disabled", "icon", "loading", "activeStyle", "activeClassName", "onClick", "delayPressIn", "delayPressOut"]);
            var iconType = loading ? 'loading' : icon;
            var wrapCls = classnames(prefixCls, className, (_classnames = {}, _defineProperty(_classnames, prefixCls + '-primary', type === 'primary'), _defineProperty(_classnames, prefixCls + '-ghost', type === 'ghost'), _defineProperty(_classnames, prefixCls + '-warning', type === 'warning'), _defineProperty(_classnames, prefixCls + '-small', size === 'small'), _defineProperty(_classnames, prefixCls + '-inline', inline), _defineProperty(_classnames, prefixCls + '-disabled', disabled), _defineProperty(_classnames, prefixCls + '-loading', loading), _defineProperty(_classnames, prefixCls + '-icon', !!iconType), _classnames));
            var kids = React.Children.map(children, insertSpace);
            var iconEl = void 0;
            // aria...的作用，classname是 前缀+特性
            if (typeof iconType === 'string') {
                iconEl = React.createElement(Icon, { 'aria-hidden': 'true', type: iconType, size: size === 'small' ? 'xxs' : 'md', className: prefixCls + '-icon' });
            }
            return React.createElement(
                TouchFeedback,
                { activeClassName: activeClassName || (activeStyle ? prefixCls + '-active' : undefined), disabled: disabled, activeStyle: activeStyle },
                React.createElement(
                    'a',
                    _extends({ role: 'button', className: wrapCls }, restProps, { onClick: disabled ? undefined : onClick, 'aria-disabled': disabled }),
                    iconEl,
                    kids
                )
            );
        }
    }]);

    return Button;
}(React.Component);

Button.defaultProps = {
    prefixCls: 'am-button',
    size: 'large',
    inline: false,
    disabled: false,
    loading: false,
    activeStyle: {}
};