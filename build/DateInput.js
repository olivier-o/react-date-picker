'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dateFormatter = require('./shared/dateFormatter');

var _dates = require('./shared/dates');

var _locales = require('./shared/locales');

var _propTypes3 = require('./shared/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var allViews = ['century', 'decade', 'year', 'month'];
var allValueTypes = [].concat(_toConsumableArray(allViews.slice(1)), ['day']);

var min = function min() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Math.min.apply(Math, _toConsumableArray(args.filter(function (a) {
    return typeof a === 'number';
  })));
};
var max = function max() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return Math.max.apply(Math, _toConsumableArray(args.filter(function (a) {
    return typeof a === 'number';
  })));
};

var DateInput = function (_Component) {
  _inherits(DateInput, _Component);

  function DateInput() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DateInput);

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DateInput.__proto__ || Object.getPrototypeOf(DateInput)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      year: '',
      month: '',
      day: ''
    }, _this.onKeyDown = function (event) {
      if (event.key === _this.divider) {
        event.preventDefault();

        var input = event.target;
        var nextElement = input.nextElementSibling; // Divider between inputs

        if (!nextElement) {
          return;
        }

        var nextInput = nextElement.nextElementSibling;

        if (!nextInput) {
          return;
        }

        nextInput.focus();
        nextInput.select();
      }
    }, _this.onChange = function (event) {
      _this.setState(_defineProperty({}, event.target.name, event.target.value));

      _this.onChangeExternal();
    }, _this.onChangeNative = function (event) {
      var value = event.target.value;


      if (_this.props.onChange) {
        _this.props.onChange(new Date(value));
      }
    }, _this.onChangeExternal = function () {
      var formElements = [_this.dayInput, _this.monthInput, _this.yearInput].filter(function (a) {
        return a;
      });

      var values = {};
      formElements.forEach(function (formElement) {
        values[formElement.name] = formElement.value;
      });

      if (formElements.every(function (formElement) {
        return formElement.checkValidity();
      })) {
        var proposedValue = new Date(values.year, values.month - 1 || 0, values.day || 1);
        var processedValue = _this.getProcessedValue(proposedValue);
        if (_this.props.onChange) {
          _this.props.onChange(processedValue, false);
        }
      }
    }, _this.stopPropagation = function (event) {
      return event.stopPropagation();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DateInput, [{
    key: 'getValueFrom',
    value: function getValueFrom(value) {
      if (!value) {
        return value;
      }
      var minDate = this.props.minDate;

      var rawValueFrom = value instanceof Array ? value[0] : value;
      var valueFrom = (0, _dates.getBegin)(this.valueType, rawValueFrom);
      return minDate && minDate > valueFrom ? minDate : valueFrom;
    }
  }, {
    key: 'getValueTo',
    value: function getValueTo(value) {
      if (!value) {
        return value;
      }
      var maxDate = this.props.maxDate;

      var rawValueFrom = value instanceof Array ? value[1] : value;
      var valueTo = (0, _dates.getEnd)(this.valueType, rawValueFrom);
      return maxDate && maxDate < valueTo ? maxDate : valueTo;
    }

    /**
     * Gets current value in a desired format.
     */

  }, {
    key: 'getProcessedValue',
    value: function getProcessedValue(value) {
      var returnValue = this.props.returnValue;


      switch (returnValue) {
        case 'start':
          return this.getValueFrom(value);
        case 'end':
          return this.getValueTo(value);
        default:
          throw new Error('Invalid returnValue.');
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      (0, _locales.setLocale)(this.props.locale);
      this.updateValues();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var props = this.props;


      if (nextProps.locale !== props.locale) {
        (0, _locales.setLocale)(nextProps.locale);
      }

      if (!!nextProps.value !== !!props.value || nextProps.value && props.value && nextProps.value.getTime() !== props.value.getTime()) {
        this.updateValues(nextProps);
      }
    }
  }, {
    key: 'updateValues',
    value: function updateValues() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var value = props.value;


      this.setState({
        year: value ? (0, _dates.getYear)(value) : '',
        month: value ? (0, _dates.getMonth)(value) : '',
        day: value ? (0, _dates.getDay)(value) : ''
      });
    }

    /**
     * Called when non-native date input is changed.
     */


    /**
     * Called when native date input is changed.
     */


    /**
     * Called after internal onChange. Checks input validity. If all fields are valid,
     * calls props.onChange.
     */

  }, {
    key: 'renderDay',
    value: function renderDay() {
      var maxDetail = this.props.maxDetail;

      // Do not display if maxDetail is "year" or less

      if (allViews.indexOf(maxDetail) < 3) {
        return null;
      }

      return _react2.default.createElement('input', _extends({
        className: 'react-date-picker__button__input__day',
        name: 'day',
        key: 'day',
        max: this.maxDay,
        min: this.minDay,
        value: this.state.day
      }, this.commonInputProps));
    }
  }, {
    key: 'renderMonth',
    value: function renderMonth() {
      var maxDetail = this.props.maxDetail;

      // Do not display if maxDetail is "decade" or less

      if (allViews.indexOf(maxDetail) < 2) {
        return null;
      }

      return _react2.default.createElement('input', _extends({
        className: 'react-date-picker__button__input__month',
        name: 'month',
        key: 'month',
        max: this.maxMonth,
        min: this.minMonth,
        value: this.state.month
      }, this.commonInputProps));
    }
  }, {
    key: 'renderYear',
    value: function renderYear() {
      return _react2.default.createElement('input', _extends({
        className: 'react-date-picker__button__input__year',
        name: 'year',
        key: 'year',
        max: this.maxYear,
        min: this.minYear,
        step: this.yearStep,
        value: this.state.year
      }, this.commonInputProps));
    }
  }, {
    key: 'renderCustomInputs',
    value: function renderCustomInputs() {
      var _this2 = this;

      var divider = this.divider,
          dividerElement = this.dividerElement,
          placeholder = this.placeholder;


      return placeholder.split('')
      // Internet Explorer specific
      .filter(function (a) {
        return a.charCodeAt(0) !== 8206;
      }).join('').split(divider).map(function (part) {
        switch (part) {
          case 'day':
            return _this2.renderDay();
          case 'month':
            return _this2.renderMonth();
          case 'year':
            return _this2.renderYear();
          default:
            return null;
        }
      }).filter(function (part) {
        return part;
      }).reduce(function (result, element, index, array) {
        result.push(element);

        if (index + 1 < array.length) {
          // eslint-disable-next-line react/no-array-index-key
          result.push(_react2.default.cloneElement(dividerElement, { key: 'separator_' + index }));
        }

        return result;
      }, []);
    }
  }, {
    key: 'renderNativeInput',
    value: function renderNativeInput() {
      var nativeValueParser = this.nativeValueParser;
      var _props = this.props,
          maxDate = _props.maxDate,
          minDate = _props.minDate,
          value = _props.value;


      return _react2.default.createElement('input', {
        type: this.nativeInputType,
        max: maxDate ? nativeValueParser(maxDate) : null,
        min: minDate ? nativeValueParser(minDate) : null,
        name: 'date',
        key: 'date',
        onChange: this.onChangeNative,
        onFocus: this.stopPropagation,
        step: this.yearStep,
        style: {
          visibility: 'hidden',
          position: 'absolute',
          top: '-9999px',
          left: '-9999px'
        },
        value: value ? nativeValueParser(value) : ''
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'react-date-picker__button__input' },
        this.renderNativeInput(),
        this.renderCustomInputs()
      );
    }
  }, {
    key: 'maxDay',
    get: function get() {
      var maxDate = this.props.maxDate;
      var _state = this.state,
          month = _state.month,
          year = _state.year;

      return min(this.currentMonthMaxDays, maxDate && year === (0, _dates.getYear)(maxDate) && month === (0, _dates.getMonth)(maxDate) && (0, _dates.getDay)(maxDate));
    }
  }, {
    key: 'minDay',
    get: function get() {
      var minDate = this.props.minDate;
      var _state2 = this.state,
          month = _state2.month,
          year = _state2.year;

      return max(1, minDate && year === (0, _dates.getYear)(minDate) && month === (0, _dates.getMonth)(minDate) && (0, _dates.getDay)(minDate));
    }
  }, {
    key: 'maxMonth',
    get: function get() {
      var maxDate = this.props.maxDate;
      var year = this.state.year;

      return min(12, maxDate && year === (0, _dates.getYear)(maxDate) && (0, _dates.getMonth)(maxDate));
    }
  }, {
    key: 'minMonth',
    get: function get() {
      var minDate = this.props.minDate;
      var year = this.state.year;

      return max(1, minDate && year === (0, _dates.getYear)(minDate) && (0, _dates.getMonth)(minDate));
    }
  }, {
    key: 'maxYear',
    get: function get() {
      var maxDate = this.props.maxDate;

      return maxDate ? (0, _dates.getYear)(maxDate) : null;
    }
  }, {
    key: 'minYear',
    get: function get() {
      var minDate = this.props.minDate;

      return max(1000, minDate && (0, _dates.getYear)(minDate));
    }

    /**
     * Returns value type that can be returned with currently applied settings.
     */

  }, {
    key: 'valueType',
    get: function get() {
      var maxDetail = this.props.maxDetail;

      return allValueTypes[allViews.indexOf(maxDetail)];
    }
  }, {
    key: 'nativeInputType',
    get: function get() {
      switch (this.valueType) {
        case 'decade':
        case 'year':
          return 'number';
        case 'month':
          return 'month';
        case 'day':
          return 'date';
        default:
          throw new Error('Invalid valueType.');
      }
    }
  }, {
    key: 'nativeValueParser',
    get: function get() {
      switch (this.valueType) {
        case 'century':
        case 'decade':
        case 'year':
          return _dates.getYear;
        case 'month':
          return _dates.getISOLocalMonth;
        case 'day':
          return _dates.getISOLocalDate;
        default:
          throw new Error('Invalid valueType.');
      }
    }
  }, {
    key: 'yearStep',
    get: function get() {
      if (this.valueType === 'century') {
        return 10;
      }
      return 1;
    }

    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'divider',
    get: function get() {
      var date = new Date(2017, 11, 11);

      return (0, _dateFormatter.formatDate)(date).split('')
      // Internet Explorer specific
      .filter(function (a) {
        return a.charCodeAt(0) !== 8206;
      }).join('').match(/[^0-9]/)[0];
    }
  }, {
    key: 'dividerElement',
    get: function get() {
      return _react2.default.createElement(
        'span',
        { className: 'react-date-picker__button__input__divider' },
        this.divider
      );
    }

    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'placeholder',
    get: function get() {
      var date = new Date(2017, 11, 11);

      return (0, _dateFormatter.formatDate)(date).replace('2017', 'year').replace('12', 'month').replace('11', 'day');
    }
  }, {
    key: 'currentMonthMaxDays',
    get: function get() {
      var value = this.props.value;


      if (!value) {
        return null;
      }

      return (0, _dates.getDaysInMonth)(value);
    }
  }, {
    key: 'commonInputProps',
    get: function get() {
      var _this3 = this;

      return {
        type: 'number',
        onChange: this.onChange,
        onKeyDown: this.onKeyDown,
        required: true,
        ref: function ref(_ref2) {
          if (!_ref2) {
            return;
          }

          // Save a reference to each input field
          _this3[_ref2.name + 'Input'] = _ref2;
        }
      };
    }
  }]);

  return DateInput;
}(_react.Component);

exports.default = DateInput;


DateInput.defaultProps = {
  maxDetail: 'month',
  returnValue: 'start'
};

DateInput.propTypes = {
  locale: _propTypes2.default.string,
  maxDate: _propTypes3.isMaxDate,
  maxDetail: _propTypes2.default.oneOf(allViews),
  minDate: _propTypes3.isMinDate,
  onChange: _propTypes2.default.func,
  returnValue: _propTypes2.default.oneOf(['start', 'end']),
  value: _propTypes2.default.instanceOf(Date)
};