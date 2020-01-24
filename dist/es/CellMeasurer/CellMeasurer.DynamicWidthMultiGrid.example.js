import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import _assertThisInitialized from '@babel/runtime/helpers/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/inherits';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key),
        );
      });
    }
  }
  return target;
}

import Immutable from 'immutable';
import PropTypes from 'prop-types';
import * as React from 'react';
import CellMeasurer from './CellMeasurer';
import CellMeasurerCache from './CellMeasurerCache';
import MultiGrid from '../MultiGrid';
import styles from './CellMeasurer.example.css';

var DynamicWidthMultiGrid =
  /*#__PURE__*/
  (function(_React$PureComponent) {
    _inherits(DynamicWidthMultiGrid, _React$PureComponent);

    function DynamicWidthMultiGrid(props, context) {
      var _this;

      _classCallCheck(this, DynamicWidthMultiGrid);

      _this = _possibleConstructorReturn(
        this,
        _getPrototypeOf(DynamicWidthMultiGrid).call(this, props, context),
      );
      _this._cache = new CellMeasurerCache({
        defaultHeight: 30,
        defaultWidth: 150,
        fixedHeight: true,
      });
      _this._cellRenderer = _this._cellRenderer.bind(
        _assertThisInitialized(_this),
      );
      return _this;
    }

    _createClass(DynamicWidthMultiGrid, [
      {
        key: 'render',
        value: function render() {
          var width = this.props.width;
          return React.createElement(MultiGrid, {
            className: styles.BodyGrid,
            columnCount: 50,
            columnWidth: this._cache.columnWidth,
            deferredMeasurementCache: this._cache,
            fixedColumnCount: 1,
            fixedRowCount: 0,
            height: 400,
            overscanColumnCount: 0,
            overscanRowCount: 0,
            cellRenderer: this._cellRenderer,
            rowCount: 50,
            rowHeight: 30,
            width: width,
          });
        },
      },
      {
        key: '_cellRenderer',
        value: function _cellRenderer(_ref) {
          var columnIndex = _ref.columnIndex,
            key = _ref.key,
            parent = _ref.parent,
            rowIndex = _ref.rowIndex,
            style = _ref.style;
          var _this$props = this.props,
            getClassName = _this$props.getClassName,
            getContent = _this$props.getContent,
            list = _this$props.list;
          var datum = list.get((rowIndex + columnIndex) % list.size);
          var classNames = getClassName({
            columnIndex: columnIndex,
            rowIndex: rowIndex,
          });
          var content = getContent({
            index: rowIndex,
            datum: datum,
            long: false,
          });

          if (columnIndex === 0) {
            content = content.substr(0, 50);
          }

          return React.createElement(
            CellMeasurer,
            {
              cache: this._cache,
              columnIndex: columnIndex,
              key: key,
              parent: parent,
              rowIndex: rowIndex,
            },
            React.createElement(
              'div',
              {
                className: classNames,
                style: _objectSpread({}, style, {
                  whiteSpace: 'nowrap',
                }),
              },
              content,
            ),
          );
        },
      },
    ]);

    return DynamicWidthMultiGrid;
  })(React.PureComponent);

export {DynamicWidthMultiGrid as default};
DynamicWidthMultiGrid.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        getClassName: PropTypes.func.isRequired,
        getContent: PropTypes.func.isRequired,
        list: PropTypes.instanceOf(Immutable.List).isRequired,
        width: PropTypes.number.isRequired,
      }
    : {};
