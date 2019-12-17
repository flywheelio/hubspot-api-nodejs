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
    define(['ApiClient', 'model/Paging', 'model/PublicOwner'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Paging'), require('./PublicOwner'));
  } else {
    // Browser globals (root is window)
    if (!root.CrmOwners) {
      root.CrmOwners = {};
    }
    root.CrmOwners.CollectionResponsePublicOwner = factory(root.CrmOwners.ApiClient, root.CrmOwners.Paging, root.CrmOwners.PublicOwner);
  }
}(this, function(ApiClient, Paging, PublicOwner) {
  'use strict';




  /**
   * The CollectionResponsePublicOwner model module.
   * @module model/CollectionResponsePublicOwner
   * @version v3
   */

  /**
   * Constructs a new <code>CollectionResponsePublicOwner</code>.
   * @alias module:model/CollectionResponsePublicOwner
   * @class
   * @param results {Array.<module:model/PublicOwner>} 
   */
  var exports = function(results) {
    var _this = this;

    _this['results'] = results;

  };

  /**
   * Constructs a <code>CollectionResponsePublicOwner</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CollectionResponsePublicOwner} obj Optional instance to populate.
   * @return {module:model/CollectionResponsePublicOwner} The populated <code>CollectionResponsePublicOwner</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('results')) {
        obj['results'] = ApiClient.convertToType(data['results'], [PublicOwner]);
      }
      if (data.hasOwnProperty('paging')) {
        obj['paging'] = Paging.constructFromObject(data['paging']);
      }
    }
    return obj;
  }

  /**
   * @member {Array.<module:model/PublicOwner>} results
   */
  exports.prototype['results'] = undefined;
  /**
   * @member {module:model/Paging} paging
   */
  exports.prototype['paging'] = undefined;



  return exports;
}));


