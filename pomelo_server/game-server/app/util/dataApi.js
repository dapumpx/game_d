var ceil = require('../../config/data/ceil');

var Data = function(data) {
    var fields = {};
    data[1].forEach(function(i, k) {
      fields[i] = k;
    });
    data.splice(0, 2);
  
    var result = {}, item;
    data.forEach(function(k) {
      item = mapData(fields, k);
      result[item.id] = item;
    });
  
    this.data = result;
};

/**
 * map the array data to object
 *
 * @param {Object}
 * @param {Array}
 * @return {Object} result
 * @api private
 */
var mapData = function(fields, item) {
    var obj = {};
    for (var k in fields) {
      obj[k] = item[fields[k]];
    }
    // console.log(obj.name);
    // console.log(obj);
    return obj;
  };

module.exports = {
    ceil: new Data(ceil)
  };