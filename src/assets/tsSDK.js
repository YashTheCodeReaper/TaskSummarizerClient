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

  TsSdk.targetSubUrl = {
    registerUser: "auth/registerUser",
    logInUser: "auth/logInUser",
    authorizeUser: "auth/authorizeUser",
    fetchJiraHistory: "jira/fetchJiraHistory",
    updateOnboarding: "general/updateOnboarding",
  };

  var ErrorCodes = {
    SEVERE_ERROR: 1001,
    ERROR: 1002,
    CATCH_ERROR: 1003,
    API_ERROR: 1004,
  };

  var SuccessCodes = {
    REGISTERED_USER: 3001,
    LOGGED_IN_USER: 3002,
    AUTHORIZED_USER: 3003,
    FETCHED_JIRA_HISTORY: 3004,
    ONBOARDING_UPDATED: 3005,
  };

  var ReturnCodes = {
    MISSING_SDK_CREDENTIAL: 2001,
    ERROR_REGISTERING_USER: 2002,
    ERROR_LOGGING_IN_USER: 2003,
    ERROR_AUTHORIZING_USER: 2004,
    ERROR_FETCHING_JIRA_HISTORY: 2005,
    ERROR_UPDATING_ONBOARDING: 2006,
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
  TsSdk.HandleError = function (code, message) {
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
        case ErrorCodes.ERROR:
          ret = "ERROR";
          break;
        case ErrorCodes.API_ERROR:
          ret = "API_ERROR";
          break;
        case ErrorCodes.CATCH_ERROR:
          ret = "CATCH_ERROR";
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
   * Get the name/title of the success using success code
   * @param {Number} code SDK success code that is to be converted to name
   * @param {String/Empty} defaultCode Default success name if code is not found
   * @returns {String} success name/title
   */
  this._GetSuccessCodeName = function (code, defaultCode) {
    try {
      switch (code) {
        case SuccessCodes.REGISTERED_USER:
          ret = "REGISTERED_USER";
          break;
        case SuccessCodes.LOGGED_IN_USER:
          ret = "LOGGED_IN_USER";
          break;
        case SuccessCodes.AUTHORIZED_USER:
          ret = "AUTHORIZED_USER";
          break;
        case SuccessCodes.FETCHED_JIRA_HISTORY:
          ret = "FETCHED_JIRA_HISTORY";
          break;
        case SuccessCodes.ONBOARDING_UPDATED:
          ret = "ONBOARDING_UPDATED";
          break;
        default:
          ret = defaultCode ?? "ACTION_SUCCESS";
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
        case ReturnCodes.ERROR_REGISTERING_USER:
          ret = "Error occured while registering a new user";
          break;
        case ReturnCodes.ERROR_LOGGING_IN_USER:
          ret = "Error occured while logging in user";
          break;
        case ReturnCodes.ERROR_AUTHORIZING_USER:
          ret = "Error occured while authorizing user";
          break;
        case ReturnCodes.ERROR_FETCHING_JIRA_HISTORY:
          ret = "Error occured while fetching jira task history";
          break;
        case ReturnCodes.ERROR_UPDATING_ONBOARDING:
          ret = "Error occured while updating onboarding status";
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
    if (!TsSdk.config.apiKey || !TsSdk.config.serverUrl1) {
      TsSdk.Emit(_GetErrorCodeName(ErrorCodes.SEVERE_ERROR), {
        callbackData: _GetReturnCodeName(ReturnCodes.MISSING_SDK_CREDENTIAL),
      });
      throw TsSdk.HandleError(_GetErrorCodeName(ErrorCodes.SEVERE_ERROR), {
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
  TsSdk.CheckServerPing = function () {};

  /**
   * Function to register a new user to the database
   * @param {Object: {name: String, email: string, password: string, jira: Object: {email: String, apiToken: String}, profilePicture: String, staySigned: Boolean, designation: String}} newUserObject
   */
  TsSdk.registerUser = function (newUserObject) {
    try {
      checkConfig();

      return fetch(
        `${TsSdk.config.serverUrl1}${TsSdk.targetSubUrl.registerUser}`,
        {
          method: "POST",
          headers: {
            Accept: "application.json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUserObject),
          cache: "default",
        }
      )
        .then((response) => {
          if (!response.ok) {
            TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
              callbackData: _GetReturnCodeName(
                ReturnCodes.ERROR_REGISTERING_USER
              ),
            });
            throw TsSdk.HandleError(
              _GetErrorCodeName(ErrorCodes.API_ERROR),
              `HTTP Error: ${response.status}`
            );
          }
          return response.json();
        })
        .then((data) => {
          TsSdk.Emit(_GetSuccessCodeName(SuccessCodes.REGISTERED_USER), data);
          return data;
        })
        .catch((error) => {
          TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
            callbackData: _GetReturnCodeName(
              ReturnCodes.ERROR_REGISTERING_USER
            ),
          });
          throw TsSdk.HandleError(
            _GetErrorCodeName(ErrorCodes.CATCH_ERROR),
            error
          );
        });
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Function to login a user to the setup
   * @param {Object: {email: string, password: string} userObject
   */
  TsSdk.logInUser = function (userObject) {
    try {
      checkConfig();

      return fetch(
        `${TsSdk.config.serverUrl1}${TsSdk.targetSubUrl.logInUser}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application.json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userObject),
          cache: "default",
        }
      )
        .then((response) => {
          if (!response.ok) {
            TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
              callbackData: _GetReturnCodeName(
                ReturnCodes.ERROR_LOGGING_IN_USER
              ),
            });
            throw TsSdk.HandleError(
              _GetErrorCodeName(ErrorCodes.API_ERROR),
              `HTTP Error: ${response.status}`
            );
          }
          return response.json();
        })
        .then((data) => {
          TsSdk.Emit(_GetSuccessCodeName(SuccessCodes.LOGGED_IN_USER), data);
          return data;
        })
        .catch((error) => {
          TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
            callbackData: _GetReturnCodeName(ReturnCodes.ERROR_LOGGING_IN_USER),
          });
          throw TsSdk.HandleError(
            _GetErrorCodeName(ErrorCodes.CATCH_ERROR),
            error
          );
        });
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Function to authorize a user using jwt
   * @param String jwtToken
   */
  TsSdk.authorizeUser = function (jwtToken) {
    try {
      checkConfig();

      return fetch(
        `${TsSdk.config.serverUrl1}${TsSdk.targetSubUrl.authorizeUser}`,
        {
          method: "POST",
          headers: {
            Accept: "application.json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: jwtToken }),
          cache: "default",
        }
      )
        .then((response) => {
          if (!response.ok) {
            TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
              callbackData: _GetReturnCodeName(
                ReturnCodes.ERROR_AUTHORIZING_USER
              ),
            });
            throw TsSdk.HandleError(
              _GetErrorCodeName(ErrorCodes.API_ERROR),
              `HTTP Error: ${response.status}`
            );
          }
          return response.json();
        })
        .then((data) => {
          TsSdk.Emit(_GetSuccessCodeName(SuccessCodes.AUTHORIZED_USER), data);
          return data;
        })
        .catch((error) => {
          TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
            callbackData: _GetReturnCodeName(
              ReturnCodes.ERROR_AUTHORIZING_USER
            ),
          });
          throw TsSdk.HandleError(
            _GetErrorCodeName(ErrorCodes.CATCH_ERROR),
            error
          );
        });
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Function to invoke fetching jira history
   * @param {Object: {email: string, apiToken: string} jiraCreds
   */
  TsSdk.fetchJiraHistory = function (jiraCreds) {
    try {
      checkConfig();

      return fetch(
        `${TsSdk.config.serverUrl1}${TsSdk.targetSubUrl.fetchJiraHistory}`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            Authorization: `Bearer ${TsSdk.config.apiToken}`,
            Accept: "application.json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jiraCreds),
          cache: "default",
        }
      )
        .then((response) => {
          if (!response.ok) {
            TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
              callbackData: _GetReturnCodeName(
                ReturnCodes.ERROR_FETCHING_JIRA_HISTORY
              ),
            });
            throw TsSdk.HandleError(
              _GetErrorCodeName(ErrorCodes.API_ERROR),
              `HTTP Error: ${response.status}`
            );
          }
          return response.json();
        })
        .then((data) => {
          TsSdk.Emit(
            _GetSuccessCodeName(SuccessCodes.FETCHED_JIRA_HISTORY),
            data
          );
          return data;
        })
        .catch((error) => {
          TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
            callbackData: _GetReturnCodeName(
              ReturnCodes.ERROR_FETCHING_JIRA_HISTORY
            ),
          });
          throw TsSdk.HandleError(
            _GetErrorCodeName(ErrorCodes.CATCH_ERROR),
            error
          );
        });
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Function to update onboarding status
   */
  TsSdk.updateOnboarding = function (obObj) {
    try {
      checkConfig();

      return fetch(
        `${TsSdk.config.serverUrl1}${TsSdk.targetSubUrl.updateOnboarding}`,
        {
          credentials: "include",
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${TsSdk.config.apiToken}`,
            Accept: "application.json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obObj),
          cache: "default",
        }
      )
        .then((response) => {
          if (!response.ok) {
            TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
              callbackData: _GetReturnCodeName(
                ReturnCodes.ERROR_UPDATING_ONBOARDING
              ),
            });
            throw TsSdk.HandleError(
              _GetErrorCodeName(ErrorCodes.API_ERROR),
              `HTTP Error: ${response.status}`
            );
          }
          return response.json();
        })
        .then((data) => {
          TsSdk.Emit(
            _GetSuccessCodeName(SuccessCodes.ONBOARDING_UPDATED),
            data
          );
          return data;
        })
        .catch((error) => {
          TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
            callbackData: _GetReturnCodeName(
              ReturnCodes.ERROR_UPDATING_ONBOARDING
            ),
          });
          throw TsSdk.HandleError(
            _GetErrorCodeName(ErrorCodes.CATCH_ERROR),
            error
          );
        });
    } catch (error) {
      console.error(error);
    }
  };
})(this);

/**
 * NOTES:
 * Private methods are declared with underscore at the beginning _methodName
 */
