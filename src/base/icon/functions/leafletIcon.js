'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = leafletIcon;

var _leaflet = _interopRequireDefault(require('leaflet'));

var _LeafletIconParams = _interopRequireDefault(require('../classes/LeafletIconParams'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Returns an icon to be used in Leaflet maps
 * 
 * @param {Object} params icon params {@link LeafletIconParams} 
 */
function leafletIcon(params) {
    return new _leaflet['default'].Icon(new _LeafletIconParams['default'](params));
}