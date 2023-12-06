/*
 *  This is the client side software development kit for Taks Summarizer
 *
 *  @author Yashwanthkumar Arivazhagan (yashwanthkumar.arivazhagan@tetherfi.com)
 */

/**
 * The browser console
 *
 * @property console
 * @private
 * @type object
 */
window.console = window.console || {};
window.console.log = this.console.log || function () {};

/**
 * expose our sdk
 */
(function (root) {
  root.TsSdk = root.TsSdk || {};
  root.TsSdk.VERSION = "tss_v1.0.0-beta.1";
  root.TsSdk.BUILD_DATE = "06-12-2023";
  root.TsSdk.events = {};
})(this);

/**
 * main sdk
 */
(function (root) {
  root.TsSdk = root.TsSdk || {};

  /**
   * Contains all TsSdk API classes and functions.
   * @name TsSdk
   * @namespace
   *
   * Contains all TsSdk API classes and functions.
   */
  var TsSdk = root.TsSdk;

  // TsSdk configurations
  TsSdk.config = {
    serverUrl1: "",
    serverUrl2: "",
    apiKey: "",
    apiToken: "",
  };

  var ErrorCodes = {
    SEVERE_ERROR: 1001,
  };

  var ReturnCodes = {
    MISSING_SDK_CREDENTIAL: 2001,
  };

  /**
   * This is to be listened by client for emitted events handling.
   * @param {String} eventName Name of the event to be emitted.
   * @param {Object} callback Callback data to be passed as arguments.
   */
  TsSdk.On = function (eventName, callback) {
    if (!TsSdk.events[eventName]) {
      TsSdk.events[eventName] = [];
    }
    TsSdk.events[eventName].push(callback);
  };

  /**
   * Callback data and event name is emitted accordingly to be catched by the ON function.
   * @param {String} eventName of the event to be emitted.
   * @param {Object} data Callback data to be passed as arguments.
   */
  TsSdk.Emit = function (eventName, data) {
    if (TsSdk.events[eventName]) {
      TsSdk.events[eventName].forEach((callback) => callback(data));
    }
  };

  /**
   * Method to handle error occuring in SDK operations.
   * @param {String/Number} code Name of the error
   * @param {Any} message Error data
   */
  TsSdk.handleError = function (code, message) {
    console.error(code, message.errorMessage);
  };

  /**
   * Get the name/title of the error using error code
   * @param {Number} code SDK error code that is to be converted to name
   * @param {String/Empty} defaultCode Default error name if code is not found
   * @returns {String} Error name/title
   */
  this._GetErrorCodeName = function (code, defaultCode) {
    try {
      switch (code) {
        case ErrorCodes.SEVERE_ERROR:
          ret = "SEVERE_ERROR";
          break;
        default:
          ret = defaultCode ?? "SDK_ERROR";
      }
      return ret;
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Get the name/title of the message using return code
   * @param {Number} code SDK return code that is to be converted to message
   * @param {String/Empty} defaultCode Default return message
   * @returns {String} Return message
   */
  this._GetReturnCodeName = function (code, defaultCode) {
    try {
      switch (code) {
        case ReturnCodes.MISSING_SDK_CREDENTIAL:
          ret = "Sdk essential configurations are missing";
          break;
        default:
          ret =
            defaultCode ??
            "Error occured while performing some SDK operations!";
      }
      return ret;
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Validate SDK essential configurations
   */
  function checkConfig() {
    if (
      !TsSdk.config.apiKey ||
      !TsSdk.config.serverUrl1 ||
      !TsSdk.config.apiToken
    ) {
      TsSdk.Emit(_GetErrorCodeName(ErrorCodes.SEVERE_ERROR), {
        callbackData: _GetReturnCodeName(ReturnCodes.MISSING_SDK_CREDENTIAL),
      });
      throw TsSdk.handleError(_GetErrorCodeName(ErrorCodes.SEVERE_ERROR), {
        errorMessage: _GetReturnCodeName(ReturnCodes.MISSING_SDK_CREDENTIAL),
      });
    }
  }

  /**
   * Call this method first to set your TsSdk configurations.
   * @param {Object} TsSdk configurations
   */
  TsSdk.Initialize = function (config) {
    TsSdk._initialize(config);
  };

  /**
   * Abstracted method to set TsSdk configurations
   * @param {Object} TsSdk configurations
   */
  TsSdk._initialize = function (config) {
    try {
      TsSdk.config = Object.assign({}, TsSdk.config, config);
      console.log("TsSdk initialized", TsSdk.VERSION);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Check for server availability and handle accordingly.
   */
  TsSdk.CheckServerPing = function () {
    checkConfig();
  };
})(this);

/**
 * NOTES:
 * Private methods are declared with underscore at the beginning _methodName
 */
