// Taskmanager SDK universal object
var TsSDK = {};

// Taskmanager SDK global configurations
TsSDK.config = {
  apiUrl1: "",
  apiKey: null,
  applicationBearerToken: "",
};
TsSDK.targetSubUrl = {
  checkPing: "/checkPing",
  registerUser: "/registerUser",
};
TsSDK.events = {};

// Method to be listened by the user application for callback events
TsSDK.on = function (eventName, callback) {
  if (!TsSDK.events[eventName]) {
    TsSDK.events[eventName] = [];
  }
  TsSDK.events[eventName].push(callback);
};

TsSDK.emit = function (eventName, data) {
  if (TsSDK.events[eventName]) {
    TsSDK.events[eventName].forEach((callback) => callback(data));
  }
};

// Merge user configuration with default configuration
TsSDK.init = function (config) {
  TsSDK.config = Object.assign({}, TsSDK.config, config);
};

// Function to handle errors and return error objects with codes
TsSDK.handleError = function (code, message) {
  console.error(code, message);
};

// Method to validate the application configuration of SDK
function checkConfig() {
  if (!TsSDK.config.apiKey || !TsSDK.config.applicationBearerToken) {
    TsSDK.emit("SEVERE_ERROR", "SDK credentials are missing");
    throw TsSDK.handleError("SEVERE_ERROR", "SDK credentials are missing");
  }
}

// Check ping with the server
TsSDK.checkPing = function () {
  checkConfig();

  return fetch(`${TsSDK.config.apiUrl1}${TsSDK.targetSubUrl.checkPing}`, {
    headers: {
      Authorization: `Bearer ${TsSDK.config.applicationBearerToken}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        TsSDK.emit("SEVERE_ERROR", "Error occured in checking ping response");
        throw TsSDK.handleError("API_ERROR", `HTTP Error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      TsSDK.emit("PING_RECEIVED", data);
      return data;
    })
    .catch((error) => {
      TsSDK.emit("SEVERE_ERROR", "Error occured in checking ping response");
      throw TsSDK.handleError("CATCH_ERROR", error);
    });
};

TsSDK.registerUser = function (userObject) {
  if (!TsSDK.config.apiKey) {
    TsSDK.emit("SEVERE_ERROR", "SDK requires api key");
    throw TsSDK.handleError("SEVERE_ERROR", "SDK requires api key");
  }

  return fetch(`${TsSDK.config.apiUrl1}${TsSDK.targetSubUrl.registerUser}`, {
    method: "POST",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
    },
    body: userObject,
    cache: "default",
  })
    .then((response) => {
      if (!response.ok) {
        TsSDK.emit("SEVERE_ERROR", "Error occured while registering the user");
        throw TsSDK.handleError("API_ERROR", `HTTP Error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      TsSDK.emit("REGISTERED_USER", data);
      return data;
    })
    .catch((error) => {
      TsSDK.emit("SEVERE_ERROR", "Error occured while registering the user");
      throw TsSDK.handleError("CATCH_ERROR", error);
    });
};

// CATCH_ERROR - error occured while in trycatching
// API_ERROR - error occured in http response / non-ok response
// SEVERE_ERROR - error which blocks the functionality of the application

// Example usage of the SDK
// Note: Make sure to initialize the SDK with user-specific configuration before using it
// TsSDK.init({ apiUrl1: 'https://api.example.com', apiKey: 'user_api_key', applicationBearerToken: 'jwt token' });

// Subscribe to events
// TsSDK.on('dataReceived', function (data) {
//   console.log('Data received in UI:', data);
// });

// TsSDK.on('error', function (error) {
//   console.error('Error in UI:', error);
// });

// Use the SDK
// TsSDK.getData()
//   .then(data => {
//     // Handle the retrieved data
//   })
//   .catch(error => {
//     // Handle the error
//   });

// Export the SDK for use in other scripts
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = TsSDK;
} else {
  window.TsSDK = TsSDK;
}
