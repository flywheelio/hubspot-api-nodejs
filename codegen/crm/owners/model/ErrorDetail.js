/**
 * CRM Owners
 * HubSpot uses **owners** to assign CRM objects to specific people in your organization. The endpoints described here are used to get a list of the owners that are available for an account. To assign an owner to an object, set the hubspot_owner_id property using the appropriate CRM object update or create a request.  If teams are available for your HubSpot tier, these endpoints will also indicate which team an owner belongs to. Team membership can be one of PRIMARY (default), SECONDARY, or CHILD.
 *
 * OpenAPI spec version: v3
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.8
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.CrmOwners) {
      root.CrmOwners = {};
    }
    root.CrmOwners.ErrorDetail = factory(root.CrmOwners.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ErrorDetail model module.
   * @module model/ErrorDetail
   * @version v3
   */

  /**
   * Constructs a new <code>ErrorDetail</code>.
   * @alias module:model/ErrorDetail
   * @class
   * @param message {String} A human readable message describing the error along with remediation steps where appropriate
   */
  var exports = function(message) {
    var _this = this;

    _this['message'] = message;


  };

  /**
   * Constructs a <code>ErrorDetail</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ErrorDetail} obj Optional instance to populate.
   * @return {module:model/ErrorDetail} The populated <code>ErrorDetail</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('message')) {
        obj['message'] = ApiClient.convertToType(data['message'], 'String');
      }
      if (data.hasOwnProperty('in')) {
        obj['in'] = ApiClient.convertToType(data['in'], 'String');
      }
      if (data.hasOwnProperty('context')) {
        obj['context'] = ApiClient.convertToType(data['context'], {'String': ['String']});
      }
    }
    return obj;
  }

  /**
   * A human readable message describing the error along with remediation steps where appropriate
   * @member {String} message
   */
  exports.prototype['message'] = undefined;
  /**
   * The name of the field or parameter in which the error was found.
   * @member {String} in
   */
  exports.prototype['in'] = undefined;
  /**
   * Context about the error condition
   * @member {Object.<String, Array.<String>>} context
   */
  exports.prototype['context'] = undefined;



  return exports;
}));


