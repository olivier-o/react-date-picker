'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mergeClassNames = require('merge-class-names');

var _mergeClassNames2 = _interopRequireDefault(_mergeClassNames);

var _detectElementOverflow = require('detect-element-overflow');

var _detectElementOverflow2 = _interopRequireDefault(_detectElementOverflow);

var _entry = require('react-calendar/dist/entry.nostyle');

var _entry2 = _interopRequireDefault(_entry);

var _DateInput = require('./DateInput');

var _DateInput2 = _interopRequireDefault(_DateInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DatePicker = function (_PureComponent) {
  _inherits(DatePicker, _PureComponent);

  function DatePicker() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DatePicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isOpen: _this.props.isOpen
    }, _this.onClick = function (event) {
      if (_this.wrapper && !_this.wrapper.contains(event.target)) {
        _this.closeCalendar();
      }
    }, _this.openCalendar = function () {
      _this.setState({ isOpen: true });
    }, _this.closeCalendar = function () {
      _this.setState({ isOpen: false });
    }, _this.toggleCalendar = function () {
      _this.setState(function (prevState) {
        return { isOpen: !prevState.isOpen };
      });
    }, _this.onChange = function (value) {
      var closeCalendar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      _this.setState({
        isOpen: !closeCalendar
      });

      var onChange = _this.props.onChange;

      if (onChange) {
        onChange(value);
      }
    }, _this.onFocus = function () {
      _this.openCalendar();
    }, _this.stopPropagation = function (event) {
      return event.stopPropagation();
    }, _this.clear = function () {
      return _this.onChange(null);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DatePicker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('mousedown', this.onClick);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('mousedown', this.onClick);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var props = this.props;


      if (nextProps.isOpen !== props.isOpen) {
        this.setState({ isOpen: nextProps.isOpen });
      }
    }
  }, {
    key: 'renderInputs',
    value: function renderInputs() {
      var _props = this.props,
          calendarIcon = _props.calendarIcon,
          clearIcon = _props.clearIcon,
          locale = _props.locale,
          maxDate = _props.maxDate,
          maxDetail = _props.maxDetail,
          minDate = _props.minDate,
          name = _props.name,
          returnValue = _props.returnValue,
          required = _props.required,
          showLeadingZeros = _props.showLeadingZeros,
          value = _props.value;
      var isOpen = this.state.isOpen;

      var _concat = [].concat(value),
          _concat2 = _slicedToArray(_concat, 1),
          valueFrom = _concat2[0];

      return _react2.default.createElement(
        'div',
        { className: 'react-date-picker__button' },
        _react2.default.createElement(_DateInput2.default, {
          locale: locale,
          isCalendarOpen: isOpen,
          maxDate: maxDate,
          maxDetail: maxDetail,
          minDate: minDate,
          name: name,
          onChange: this.onChange,
          returnValue: returnValue,
          required: required,
          showLeadingZeros: showLeadingZeros,
          value: valueFrom
        }),
        _react2.default.createElement(
          'button',
          {
            className: 'react-date-picker__clear-button react-date-picker__button__icon',
            onClick: this.clear,
            onFocus: this.stopPropagation,
            type: 'button'
          },
          clearIcon
        ),
        _react2.default.createElement(
          'button',
          {
            className: 'react-date-picker__calendar-button react-date-picker__button__icon',
            onClick: this.toggleCalendar,
            onFocus: this.stopPropagation,
            onBlur: this.resetValue,
            type: 'button'
          },
          calendarIcon
        )
      );
    }
  }, {
    key: 'renderCalendar',
    value: function renderCalendar() {
      var isOpen = this.state.isOpen;


      if (isOpen === null) {
        return null;
      }

      var _props2 = this.props,
          calendarClassName = _props2.calendarClassName,
          datePickerClassName = _props2.className,
          onChange = _props2.onChange,
          value = _props2.value,
          calendarProps = _objectWithoutProperties(_props2, ['calendarClassName', 'className', 'onChange', 'value']);

      var className = 'react-date-picker__calendar';

      return _react2.default.createElement(
        'div',
        {
          className: (0, _mergeClassNames2.default)(className, className + '--' + (isOpen ? 'open' : 'closed')),
          ref: function ref(_ref2) {
            if (!_ref2) {
              return;
            }

            _ref2.classList.remove(className + '--above-label');

            var collisions = (0, _detectElementOverflow2.default)(_ref2, document.body);

            if (collisions.collidedBottom) {
              _ref2.classList.add(className + '--above-label');
            }
          }
        },
        _react2.default.createElement(_entry2.default, _extends({
          className: calendarClassName,
          onChange: this.onChange,
          value: value || null
        }, calendarProps))
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var className = 'react-date-picker';

      return _react2.default.createElement(
        'div',
        {
          className: (0, _mergeClassNames2.default)(className, className + '--' + (this.state.isOpen ? 'open' : 'closed'), this.props.className),
          onFocus: this.onFocus,
          ref: function ref(_ref3) {
            _this2.wrapper = _ref3;
          }
        },
        this.renderInputs(),
        this.renderCalendar()
      );
    }
  }]);

  return DatePicker;
}(_react.PureComponent);

exports.default = DatePicker;


var CalendarIcon = _react2.default.createElement(
  'svg',
  { xmlns: 'http://www.w3.org/2000/svg', width: '19', height: '19', viewBox: '0 0 19 19' },
  _react2.default.createElement(
    'g',
    { stroke: 'black', strokeWidth: '2' },
    _react2.default.createElement('rect', { width: '15', height: '15', x: '2', y: '2', fill: 'none' }),
    _react2.default.createElement('line', { x1: '6', y1: '0', x2: '6', y2: '4' }),
    _react2.default.createElement('line', { x1: '13', y1: '0', x2: '13', y2: '4' })
  )
);

var ClearIcon = _react2.default.createElement(
  'svg',
  { xmlns: 'http://www.w3.org/2000/svg', width: '19', height: '19', viewBox: '0 0 19 19' },
  _react2.default.createElement(
    'g',
    { stroke: 'black', strokeWidth: '2' },
    _react2.default.createElement('line', { x1: '4', y1: '4', x2: '15', y2: '15' }),
    _react2.default.createElement('line', { x1: '15', y1: '4', x2: '4', y2: '15' })
  )
);

DatePicker.defaultProps = {
  calendarIcon: CalendarIcon,
  clearIcon: ClearIcon,
  isOpen: null,
  returnValue: 'start'
};

DatePicker.propTypes = _extends({}, _entry2.default.propTypes, {
  calendarClassName: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]),
  calendarIcon: _propTypes2.default.node,
  className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]),
  clearIcon: _propTypes2.default.node,
  isOpen: _propTypes2.default.bool,
  returnValue: _propTypes2.default.oneOf(['start', 'end']),
  showLeadingZeros: _propTypes2.default.bool
});