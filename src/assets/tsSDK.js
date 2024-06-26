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
    createBoard: "boards/createBoard",
    getAllBoards: "boards/getAllBoards",
    addLinkedTeam: "boards/addLinkedTeam",
    createTeam: "teams/createTeam",
    getMyTeam: "teams/getMyTeam",
    getTeam: "teams/getTeam",
    getAllInvolvedTeams: "teams/getAllInvolvedTeams",
    joinTeam: "users/joinTeam",
    createInvite: "teams/createInvite",
    getInvite: "teams/getInvite",
    deleteInvite: "teams/deleteInvite",
    getTeamMembers: "teams/getTeamMembers",
    getUnjoinedMembers: "teams/getUnjoinedMembers",
    createNotification: "notifications/createNotification",
    getAllNotifications: "notifications/getAllNotifications",
    clearActiveNotificationStatus:
      "notifications/clearActiveNotificationStatus",
    joinTeam: "users/joinTeam",
    deleteNotification: "notifications/deleteNotification",
    validateInvite: "teams/validateInvite",
    getOverallJiraStats: "jira/getOverallStats",
    updateJiraProjectKeyMapping: "admin/updateJiraProjectKeyMapping",
    getJiraProjectKeyMapper: "jira/getJiraProjectKeyMapper",
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
    BOARD_CREATED: 3006,
    BOARDS_FETCHED: 3007,
    TEAM_CREATED: 3008,
    YOUR_TEAM_FETCHED: 3009,
    TEAM_LINKED_TO_BOARD: 3010,
    JOINED_TEAM: 3011,
    ALL_TEAMS_FETCHED: 3012,
    INVITE_CREATED: 3013,
    FETCHED_INVITE: 3014,
    DELETED_INVITE: 3015,
    FETCHED_TEAM_MEMBERS: 3016,
    FETCHED_UNJOINED_TEAM_MEMBERS: 3017,
    CREATED_NOTIFICATION: 3018,
    FETCHED_NOTIFICATIONS: 3019,
    CHANGED_ACTIVE_NOTIFICATION_STATUSES: 3020,
    DELETED_NOTIFICATION: 3021,
    TEAM_FETCHED: 3022,
    INVITE_VALIDATED: 3023,
    FETCHED_OVERALL_JIRA_STATS: 3024,
    UPDATED_JIRA_PROJECT_KEY_MAPPING: 3025,
    FETCHED_JIRA_PROJECT_KEY_MAPPER: 3026,
  };

  var ReturnCodes = {
    MISSING_SDK_CREDENTIAL: 2001,
    ERROR_REGISTERING_USER: 2002,
    ERROR_LOGGING_IN_USER: 2003,
    ERROR_AUTHORIZING_USER: 2004,
    ERROR_FETCHING_JIRA_HISTORY: 2005,
    ERROR_UPDATING_ONBOARDING: 2006,
    ERROR_CREATING_BOARD: 2007,
    ERROR_FETCHING_BOARDS: 2008,
    ERROR_CREATING_TEAM: 2009,
    ERROR_FETCHING_MY_TEAM: 2010,
    ERROR_LINKING_TEAM_TO_BOARD: 2011,
    ERROR_JOINING_TEAM: 2012,
    ERROR_FETCHING_ALL_MY_TEAMS: 2013,
    ERROR_CREATING_AN_INVITE: 2014,
    ERROR_FETCHING_INVITES: 2015,
    ERROR_DELETING_INVITE: 2016,
    ERROR_FETCHING_TEAM_MEMBERS: 2017,
    ERROR_FETCHING_UNJOINED_TEAM_MEMBERS: 2018,
    ERROR_CREATING_NOTIFICATION: 2019,
    ERROR_FETCHING_NOTIFICATIONS: 2020,
    ERROR_CHANGING_NOTIFICATION_STATUSES: 2021,
    ERROR_DELETING_NOTIFICATION: 2022,
    ERROR_FETCHING_TEAM: 2023,
    ERROR_VALIDATING_INVITE: 2024,
    ERROR_FETCHING_OVERALL_JIRA_STATS: 2025,
    ERROR_UPDATING_JIRA_PROJECT_KEY_MAPPING: 2026,
    ERROR_FETCHING_JIRA_PROJECT_KEY_MAPPER: 2027,
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
        case SuccessCodes.BOARD_CREATED:
          ret = "BOARD_CREATED";
          break;
        case SuccessCodes.BOARDS_FETCHED:
          ret = "BOARDS_FETCHED";
          break;
        case SuccessCodes.TEAM_CREATED:
          ret = "TEAM_CREATED";
          break;
        case SuccessCodes.YOUR_TEAM_FETCHED:
          ret = "YOUR_TEAM_FETCHED";
          break;
        case SuccessCodes.TEAM_LINKED_TO_BOARD:
          ret = "TEAM_LINKED_TO_BOARD";
          break;
        case SuccessCodes.JOINED_TEAM:
          ret = "JOINED_TEAM";
          break;
        case SuccessCodes.ALL_TEAMS_FETCHED:
          ret = "ALL_TEAMS_FETCHED";
          break;
        case SuccessCodes.INVITE_CREATED:
          ret = "INVITE_CREATED";
          break;
        case SuccessCodes.FETCHED_INVITE:
          ret = "FETCHED_INVITE";
          break;
        case SuccessCodes.DELETED_INVITE:
          ret = "DELETED_INVITE";
          break;
        case SuccessCodes.FETCHED_TEAM_MEMBERS:
          ret = "FETCHED_TEAM_MEMBERS";
          break;
        case SuccessCodes.FETCHED_UNJOINED_TEAM_MEMBERS:
          ret = "FETCHED_UNJOINED_TEAM_MEMBERS";
          break;
        case SuccessCodes.CREATED_NOTIFICATION:
          ret = "CREATED_NOTIFICATION";
          break;
        case SuccessCodes.FETCHED_NOTIFICATIONS:
          ret = "FETCHED_NOTIFICATIONS";
          break;
        case SuccessCodes.CHANGED_ACTIVE_NOTIFICATION_STATUSES:
          ret = "CHANGED_ACTIVE_NOTIFICATION_STATUSES";
          break;
        case SuccessCodes.DELETED_NOTIFICATION:
          ret = "DELETED_NOTIFICATION";
          break;
        case SuccessCodes.TEAM_FETCHED:
          ret = "TEAM_FETCHED";
          break;
        case SuccessCodes.INVITE_VALIDATED:
          ret = "INVITE_VALIDATED";
          break;
        case SuccessCodes.FETCHED_OVERALL_JIRA_STATS:
          ret = "FETCHED_OVERALL_JIRA_STATS";
          break;
        case SuccessCodes.FETCHED_JIRA_PROJECT_KEY_MAPPER:
          ret = "FETCHED_JIRA_PROJECT_KEY_MAPPER";
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
        case ReturnCodes.ERROR_CREATING_BOARD:
          ret = "Error occured while creating a board";
          break;
        case ReturnCodes.ERROR_FETCHING_BOARDS:
          ret = "Error occured while fetching all boards";
          break;
        case ReturnCodes.ERROR_CREATING_TEAM:
          ret = "Error occured while creating a team";
          break;
        case ReturnCodes.ERROR_FETCHING_MY_TEAM:
          ret = "Error occured while fetching your team";
          break;
        case ReturnCodes.ERROR_LINKING_TEAM_TO_BOARD:
          ret = "Error occured while linking team in a board";
          break;
        case ReturnCodes.ERROR_JOINING_TEAM:
          ret = "Error occured while adding user to a team";
          break;
        case ReturnCodes.ERROR_FETCHING_ALL_MY_TEAMS:
          ret = "Error occured while getting all my teams details";
          break;
        case ReturnCodes.ERROR_CREATING_AN_INVITE:
          ret = "Error occured while creating an invite";
          break;
        case ReturnCodes.ERROR_FETCHING_INVITES:
          ret = "Error occured while fetching invites for the team";
          break;
        case ReturnCodes.ERROR_DELETING_INVITE:
          ret = "Error occured while deleting an invite";
          break;
        case ReturnCodes.ERROR_FETCHING_TEAM_MEMBERS:
          ret = "Error occured while fetching all team members";
          break;
        case ReturnCodes.ERROR_FETCHING_UNJOINED_TEAM_MEMBERS:
          ret =
            "Error occured while fetching all members who are not part of the team";
          break;
        case ReturnCodes.ERROR_CREATING_NOTIFICATION:
          ret = "Error occured while creating a notification";
          break;
        case ReturnCodes.ERROR_FETCHING_NOTIFICATIONS:
          ret = "Error occured while fetching notifications";
          break;
        case ReturnCodes.ERROR_CHANGING_NOTIFICATION_STATUSES:
          ret = "Error occured while changing notification statuses";
          break;
        case ReturnCodes.ERROR_DELETING_NOTIFICATION:
          ret = "Error occured while deleting a notification";
          break;
        case ReturnCodes.ERROR_FETCHING_TEAM:
          ret = "Error occured while fetching a team";
          break;
        case ReturnCodes.ERROR_VALIDATING_INVITE:
          ret = "Error occured while validating the invitation";
          break;
        case ReturnCodes.ERROR_FETCHING_OVERALL_JIRA_STATS:
          ret = "Error occured while fetching overall jira stats";
          break;
        case ReturnCodes.ERROR_FETCHING_JIRA_PROJECT_KEY_MAPPER:
          ret = "Error occured while fetching jira project key mapper";
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
   * @param {Object: {email: string, password: string}} userObject
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
   * @param {Object: {email: string, apiToken: string}} jiraCreds
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
   * @param {Object : {intro: Boolean, dashboard: Boolean, teams: Boolean, settings: Boolean, timesheetCompanion: Boolean}} obObj
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

  /**
   * Function to update onboarding status
   * @param {Object: {name: String, description: String, trackables: Array, accessibilityConstraints: Object, timeConstraints: Object[]}} boardObject
   */
  TsSdk.createBoard = function (boardObject) {
    try {
      checkConfig();

      return fetch(
        `${TsSdk.config.serverUrl1}${TsSdk.targetSubUrl.createBoard}`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            Authorization: `Bearer ${TsSdk.config.apiToken}`,
            Accept: "application.json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(boardObject),
          cache: "default",
        }
      )
        .then((response) => {
          if (!response.ok) {
            TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
              callbackData: _GetReturnCodeName(
                ReturnCodes.ERROR_CREATING_BOARD
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
          TsSdk.Emit(_GetSuccessCodeName(SuccessCodes.BOARD_CREATED), data);
          return data;
        })
        .catch((error) => {
          TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
            callbackData: _GetReturnCodeName(ReturnCodes.ERROR_CREATING_BOARD),
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
   * Function to get all active boards of a user
   */
  TsSdk.getAllBoards = function () {
    try {
      checkConfig();

      return fetch(
        `${TsSdk.config.serverUrl1}${TsSdk.targetSubUrl.getAllBoards}`,
        {
          credentials: "include",
          method: "GET",
          headers: {
            Authorization: `Bearer ${TsSdk.config.apiToken}`,
            Accept: "application.json",
            "Content-Type": "application/json",
          },
          cache: "default",
        }
      )
        .then((response) => {
          if (!response.ok) {
            TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
              callbackData: _GetReturnCodeName(
                ReturnCodes.ERROR_FETCHING_BOARDS
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
          TsSdk.Emit(_GetSuccessCodeName(SuccessCodes.BOARDS_FETCHED), data);
          return data;
        })
        .catch((error) => {
          TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
            callbackData: _GetReturnCodeName(ReturnCodes.ERROR_FETCHING_BOARDS),
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
   * Function to create a team
   * @param {Object: {name: String, description: String, constraints: Object, profilePicture: String}} teamObject
   */
  TsSdk.createTeam = function (teamObject) {
    try {
      checkConfig();

      return fetch(
        `${TsSdk.config.serverUrl1}${TsSdk.targetSubUrl.createTeam}`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            Authorization: `Bearer ${TsSdk.config.apiToken}`,
            Accept: "application.json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(teamObject),
          cache: "default",
        }
      )
        .then((response) => {
          if (!response.ok) {
            TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
              callbackData: _GetReturnCodeName(ReturnCodes.ERROR_CREATING_TEAM),
            });
            throw TsSdk.HandleError(
              _GetErrorCodeName(ErrorCodes.API_ERROR),
              `HTTP Error: ${response.status}`
            );
          }
          return response.json();
        })
        .then((data) => {
          TsSdk.Emit(_GetSuccessCodeName(SuccessCodes.TEAM_CREATED), data);
          return data;
        })
        .catch((error) => {
          TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
            callbackData: _GetReturnCodeName(ReturnCodes.ERROR_CREATING_TEAM),
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
   * Function to fetch a team
   */
  TsSdk.getMyTeam = function () {
    try {
      checkConfig();

      return fetch(
        `${TsSdk.config.serverUrl1}${TsSdk.targetSubUrl.getMyTeam}`,
        {
          credentials: "include",
          method: "GET",
          headers: {
            Authorization: `Bearer ${TsSdk.config.apiToken}`,
            Accept: "application.json",
            "Content-Type": "application/json",
          },
          cache: "default",
        }
      )
        .then((response) => {
          if (!response.ok) {
            TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
              callbackData: _GetReturnCodeName(
                ReturnCodes.ERROR_FETCHING_MY_TEAM
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
          TsSdk.Emit(_GetSuccessCodeName(SuccessCodes.YOUR_TEAM_FETCHED), data);
          return data;
        })
        .catch((error) => {
          TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
            callbackData: _GetReturnCodeName(
              ReturnCodes.ERROR_FETCHING_MY_TEAM
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
   * Function to add linked teams in a board
   * @param {Object: {boardId: String, teamToLink: String}} linkTeamObj
   */
  TsSdk.addLinkedTeam = function (linkTeamObj) {
    try {
      checkConfig();

      return fetch(
        `${TsSdk.config.serverUrl1}${TsSdk.targetSubUrl.addLinkedTeam}`,
        {
          credentials: "include",
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${TsSdk.config.apiToken}`,
            Accept: "application.json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(linkTeamObj),
          cache: "default",
        }
      )
        .then((response) => {
          if (!response.ok) {
            TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
              callbackData: _GetReturnCodeName(
                ReturnCodes.ERROR_LINKING_TEAM_TO_BOARD
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
            _GetSuccessCodeName(SuccessCodes.TEAM_LINKED_TO_BOARD),
            data
          );
          return data;
        })
        .catch((error) => {
          TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
            callbackData: _GetReturnCodeName(
              ReturnCodes.ERROR_LINKING_TEAM_TO_BOARD
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
   * Function to join the user to a team
   * @param teamId: String
   */
  TsSdk.joinTeam = function (teamId) {
    try {
      checkConfig();

      return fetch(`${TsSdk.config.serverUrl1}${TsSdk.targetSubUrl.joinTeam}`, {
        credentials: "include",
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${TsSdk.config.apiToken}`,
          Accept: "application.json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teamId }),
        cache: "default",
      })
        .then((response) => {
          if (!response.ok) {
            TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
              callbackData: _GetReturnCodeName(ReturnCodes.ERROR_JOINING_TEAM),
            });
            throw TsSdk.HandleError(
              _GetErrorCodeName(ErrorCodes.API_ERROR),
              `HTTP Error: ${response.status}`
            );
          }
          return response.json();
        })
        .then((data) => {
          TsSdk.Emit(_GetSuccessCodeName(SuccessCodes.JOINED_TEAM), data);
          return data;
        })
        .catch((error) => {
          TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
            callbackData: _GetReturnCodeName(ReturnCodes.ERROR_JOINING_TEAM),
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
   * Function to get all user involved teams
   * @param {Object: {allTeams: Array} allMyTeamsArray
   */
  TsSdk.getAllInvolvedTeams = function (allMyTeamsArray) {
    try {
      checkConfig();

      return fetch(
        `${TsSdk.config.serverUrl1}${TsSdk.targetSubUrl.getAllInvolvedTeams}`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            Authorization: `Bearer ${TsSdk.config.apiToken}`,
            Accept: "application.json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(allMyTeamsArray),
          cache: "default",
        }
      )
        .then((response) => {
          if (!response.ok) {
            TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
              callbackData: _GetReturnCodeName(
                ReturnCodes.ERROR_FETCHING_ALL_MY_TEAMS
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
          TsSdk.Emit(_GetSuccessCodeName(SuccessCodes.ALL_TEAMS_FETCHED), data);
          return data;
        })
        .catch((error) => {
          TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
            callbackData: _GetReturnCodeName(
              ReturnCodes.ERROR_FETCHING_ALL_MY_TEAMS
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
   * Function to create an invite for the team
   * @param {Object: {expireIn24Hours: Boolean, teamId: String, password: String} inviteObj
   */
  TsSdk.createInvite = function (inviteObj) {
    try {
      checkConfig();

      return fetch(
        `${TsSdk.config.serverUrl1}${TsSdk.targetSubUrl.createInvite}`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            Authorization: `Bearer ${TsSdk.config.apiToken}`,
            Accept: "application.json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inviteObj),
          cache: "default",
        }
      )
        .then((response) => {
          if (!response.ok) {
            TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
              callbackData: _GetReturnCodeName(
                ReturnCodes.ERROR_CREATING_AN_INVITE
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
          TsSdk.Emit(_GetSuccessCodeName(SuccessCodes.INVITE_CREATED), data);
          return data;
        })
        .catch((error) => {
          TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
            callbackData: _GetReturnCodeName(
              ReturnCodes.ERROR_CREATING_AN_INVITE
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
   * Function to get an invites for a team by a user
   * @param teamId: String
   */
  TsSdk.getInvite = function (teamId, inviteId) {
    try {
      checkConfig();

      return fetch(
        `${TsSdk.config.serverUrl1}${TsSdk.targetSubUrl.getInvite}`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            Authorization: `Bearer ${TsSdk.config.apiToken}`,
            Accept: "application.json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ teamId, inviteId }),
          cache: "default",
        }
      )
        .then((response) => {
          if (!response.ok) {
            TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
              callbackData: _GetReturnCodeName(
                ReturnCodes.ERROR_FETCHING_INVITES
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
          TsSdk.Emit(_GetSuccessCodeName(SuccessCodes.FETCHED_INVITE), data);
          return data;
        })
        .catch((error) => {
          TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
            callbackData: _GetReturnCodeName(
              ReturnCodes.ERROR_FETCHING_INVITES
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
   * Function to delete an invite for a team
   * @param inviteId: String
   */
  TsSdk.deleteInvite = function (inviteId) {
    try {
      checkConfig();

      return fetch(
        `${TsSdk.config.serverUrl1}${TsSdk.targetSubUrl.deleteInvite}`,
        {
          credentials: "include",
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${TsSdk.config.apiToken}`,
            Accept: "application.json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inviteId }),
          cache: "default",
        }
      )
        .then((response) => {
          if (!response.ok) {
            TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
              callbackData: _GetReturnCodeName(
                ReturnCodes.ERROR_DELETING_INVITE
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
          TsSdk.Emit(_GetSuccessCodeName(SuccessCodes.DELETED_INVITE), data);
          return data;
        })
        .catch((error) => {
          TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
            callbackData: _GetReturnCodeName(ReturnCodes.ERROR_DELETING_INVITE),
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
   * Function to fetch all the members of a team
   * @param teamId: String
   */
  TsSdk.getTeamMembers = function (teamId) {
    try {
      checkConfig();

      return fetch(
        `${TsSdk.config.serverUrl1}${TsSdk.targetSubUrl.getTeamMembers}`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            Authorization: `Bearer ${TsSdk.config.apiToken}`,
            Accept: "application.json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ teamId }),
          cache: "default",
        }
      )
        .then((response) => {
          if (!response.ok) {
            TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
              callbackData: _GetReturnCodeName(
                ReturnCodes.ERROR_FETCHING_TEAM_MEMBERS
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
            _GetSuccessCodeName(SuccessCodes.FETCHED_TEAM_MEMBERS),
            data
          );
          return data;
        })
        .catch((error) => {
          TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
            callbackData: _GetReturnCodeName(
              ReturnCodes.ERROR_FETCHING_TEAM_MEMBERS
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
   * Function to fetch all the members who are not part of the team
   * @param {Object: {teamId: String, searchQuote: String}} searchObj
   */
  TsSdk.getUnjoinedMembers = function (searchObj) {
    try {
      checkConfig();

      return fetch(
        `${TsSdk.config.serverUrl1}${TsSdk.targetSubUrl.getUnjoinedMembers}`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            Authorization: `Bearer ${TsSdk.config.apiToken}`,
            Accept: "application.json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(searchObj),
          cache: "default",
        }
      )
        .then((response) => {
          if (!response.ok) {
            TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
              callbackData: _GetReturnCodeName(
                ReturnCodes.ERROR_FETCHING_UNJOINED_TEAM_MEMBERS
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
            _GetSuccessCodeName(SuccessCodes.FETCHED_UNJOINED_TEAM_MEMBERS),
            data
          );
          return data;
        })
        .catch((error) => {
          TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
            callbackData: _GetReturnCodeName(
              ReturnCodes.ERROR_FETCHING_UNJOINED_TEAM_MEMBERS
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
   * Function to fetch all the members who are not part of the team
   * @param {Object: {userId: String, type: String, data: Object} notificationObj
   */
  TsSdk.createNotification = function (notificationObj) {
    try {
      checkConfig();

      return fetch(
        `${TsSdk.config.serverUrl1}${TsSdk.targetSubUrl.createNotification}`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            Authorization: `Bearer ${TsSdk.config.apiToken}`,
            Accept: "application.json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notificationObj),
          cache: "default",
        }
      )
        .then((response) => {
          if (!response.ok) {
            TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
              callbackData: _GetReturnCodeName(
                ReturnCodes.ERROR_CREATING_NOTIFICATION
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
            _GetSuccessCodeName(SuccessCodes.CREATED_NOTIFICATION),
            data
          );
          return data;
        })
        .catch((error) => {
          TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
            callbackData: _GetReturnCodeName(
              ReturnCodes.ERROR_CREATING_NOTIFICATION
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
   * Function to fetch all notifications for the user
   */
  TsSdk.getAllNotifications = function () {
    try {
      checkConfig();

      return fetch(
        `${TsSdk.config.serverUrl1}${TsSdk.targetSubUrl.getAllNotifications}`,
        {
          credentials: "include",
          method: "GET",
          headers: {
            Authorization: `Bearer ${TsSdk.config.apiToken}`,
            Accept: "application.json",
            "Content-Type": "application/json",
          },
          cache: "default",
        }
      )
        .then((response) => {
          if (!response.ok) {
            TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
              callbackData: _GetReturnCodeName(
                ReturnCodes.ERROR_FETCHING_NOTIFICATIONS
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
            _GetSuccessCodeName(SuccessCodes.FETCHED_NOTIFICATIONS),
            data
          );
          return data;
        })
        .catch((error) => {
          TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
            callbackData: _GetReturnCodeName(
              ReturnCodes.ERROR_FETCHING_NOTIFICATIONS
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
   * Function to clear all active notification statuses
   */
  TsSdk.clearActiveNotificationStatus = function () {
    try {
      checkConfig();

      return fetch(
        `${TsSdk.config.serverUrl1}${TsSdk.targetSubUrl.clearActiveNotificationStatus}`,
        {
          credentials: "include",
          method: "GET",
          headers: {
            Authorization: `Bearer ${TsSdk.config.apiToken}`,
            Accept: "application.json",
            "Content-Type": "application/json",
          },
          cache: "default",
        }
      )
        .then((response) => {
          if (!response.ok) {
            TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
              callbackData: _GetReturnCodeName(
                ReturnCodes.ERROR_CHANGING_NOTIFICATION_STATUSES
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
            _GetSuccessCodeName(
              SuccessCodes.CHANGED_ACTIVE_NOTIFICATION_STATUSES
            ),
            data
          );
          return data;
        })
        .catch((error) => {
          TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
            callbackData: _GetReturnCodeName(
              ReturnCodes.ERROR_CHANGING_NOTIFICATION_STATUSES
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
   * Function to clear all active notification statuses
   * @param notificationId: String
   */
  TsSdk.deleteNotification = function (notificationId) {
    try {
      checkConfig();

      return fetch(
        `${TsSdk.config.serverUrl1}${TsSdk.targetSubUrl.deleteNotification}`,
        {
          credentials: "include",
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${TsSdk.config.apiToken}`,
            Accept: "application.json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ notificationId }),
          cache: "default",
        }
      )
        .then((response) => {
          if (!response.ok) {
            TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
              callbackData: _GetReturnCodeName(
                ReturnCodes.ERROR_DELETING_NOTIFICATION
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
            _GetSuccessCodeName(SuccessCodes.DELETED_NOTIFICATION),
            data
          );
          return data;
        })
        .catch((error) => {
          TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
            callbackData: _GetReturnCodeName(
              ReturnCodes.ERROR_DELETING_NOTIFICATION
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
   * Function to get the data of the team
   * @param teamId: String
   */
  TsSdk.getTeam = function (teamId) {
    try {
      checkConfig();

      return fetch(`${TsSdk.config.serverUrl1}${TsSdk.targetSubUrl.getTeam}`, {
        credentials: "include",
        method: "POST",
        headers: {
          Authorization: `Bearer ${TsSdk.config.apiToken}`,
          Accept: "application.json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teamId }),
        cache: "default",
      })
        .then((response) => {
          if (!response.ok) {
            TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
              callbackData: _GetReturnCodeName(ReturnCodes.ERROR_FETCHING_TEAM),
            });
            throw TsSdk.HandleError(
              _GetErrorCodeName(ErrorCodes.API_ERROR),
              `HTTP Error: ${response.status}`
            );
          }
          return response.json();
        })
        .then((data) => {
          TsSdk.Emit(_GetSuccessCodeName(SuccessCodes.TEAM_FETCHED), data);
          return data;
        })
        .catch((error) => {
          TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
            callbackData: _GetReturnCodeName(ReturnCodes.ERROR_FETCHING_TEAM),
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
   * Function to validate the invitation
   * @param {Object: {password: String, hashedPassword: String}}: passwordObj
   */
  TsSdk.validateInvite = function (passwordObj) {
    try {
      checkConfig();

      return fetch(
        `${TsSdk.config.serverUrl1}${TsSdk.targetSubUrl.validateInvite}`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            Authorization: `Bearer ${TsSdk.config.apiToken}`,
            Accept: "application.json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(passwordObj),
          cache: "default",
        }
      )
        .then((response) => {
          if (!response.ok) {
            TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
              callbackData: _GetReturnCodeName(
                ReturnCodes.ERROR_VALIDATING_INVITE
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
          TsSdk.Emit(_GetSuccessCodeName(SuccessCodes.INVITE_VALIDATED), data);
          return data;
        })
        .catch((error) => {
          TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
            callbackData: _GetReturnCodeName(
              ReturnCodes.ERROR_VALIDATING_INVITE
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
   * Function to get overall jira statistics
   * @param jiraEmail: String
   */
  TsSdk.getOverallJiraStats = function (jiraEmail) {
    try {
      checkConfig();

      return fetch(
        `${TsSdk.config.serverUrl1}${TsSdk.targetSubUrl.getOverallJiraStats}`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            Authorization: `Bearer ${TsSdk.config.apiToken}`,
            Accept: "application.json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ jiraEmail }),
          cache: "default",
        }
      )
        .then((response) => {
          if (!response.ok) {
            TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
              callbackData: _GetReturnCodeName(
                ReturnCodes.ERROR_FETCHING_OVERALL_JIRA_STATS
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
            _GetSuccessCodeName(SuccessCodes.FETCHED_OVERALL_JIRA_STATS),
            data
          );
          return data;
        })
        .catch((error) => {
          TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
            callbackData: _GetReturnCodeName(
              ReturnCodes.ERROR_FETCHING_OVERALL_JIRA_STATS
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
   * Function to validate the invitation
   * @param {Object: {jiraEmail: String, apiToken: String}} jiraCredsObj
   */
  TsSdk.updateJiraProjectKeyMapping = function (jiraCredsObj) {
    try {
      checkConfig();

      return fetch(
        `${TsSdk.config.serverUrl1}${TsSdk.targetSubUrl.updateJiraProjectKeyMapping}`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            Authorization: `Bearer ${TsSdk.config.apiToken}`,
            Accept: "application.json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jiraCredsObj),
          cache: "default",
        }
      )
        .then((response) => {
          if (!response.ok) {
            TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
              callbackData: _GetReturnCodeName(
                ReturnCodes.ERROR_UPDATING_JIRA_PROJECT_KEY_MAPPING
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
            _GetSuccessCodeName(SuccessCodes.UPDATED_JIRA_PROJECT_KEY_MAPPING),
            data
          );
          return data;
        })
        .catch((error) => {
          TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
            callbackData: _GetReturnCodeName(
              ReturnCodes.ERROR_UPDATING_JIRA_PROJECT_KEY_MAPPING
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
   * Function to fetch jira project key mapping
   */
  TsSdk.getJiraProjectKeyMapper = function () {
    try {
      checkConfig();

      return fetch(
        `${TsSdk.config.serverUrl1}${TsSdk.targetSubUrl.getJiraProjectKeyMapper}`,
        {
          credentials: "include",
          method: "GET",
          headers: {
            Authorization: `Bearer ${TsSdk.config.apiToken}`,
            Accept: "application.json",
            "Content-Type": "application/json",
          },
          cache: "default",
        }
      )
        .then((response) => {
          if (!response.ok) {
            TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
              callbackData: _GetReturnCodeName(
                ReturnCodes.ERROR_FETCHING_JIRA_PROJECT_KEY_MAPPER
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
            _GetSuccessCodeName(SuccessCodes.FETCHED_JIRA_PROJECT_KEY_MAPPER),
            data
          );
          return data;
        })
        .catch((error) => {
          TsSdk.Emit(_GetErrorCodeName(ErrorCodes.ERROR), {
            callbackData: _GetReturnCodeName(
              ReturnCodes.ERROR_FETCHING_JIRA_PROJECT_KEY_MAPPER
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
