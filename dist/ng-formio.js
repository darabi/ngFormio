(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ngformio"] = factory();
	else
		root["ngformio"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/directives/formBuilder.js":
/*!***************************************!*\
  !*** ./lib/directives/formBuilder.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formiojs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'formiojs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

exports.default = angular.module('formio').directive('formBuilder', function () {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      url: '=?',
      form: '=?',
      options: '<'
    },
    link: function link(scope, element) {
      scope.initBuilder(element[0]);
    },
    controller: ['$scope', function ($scope) {
      var builder = null;
      var builderReady = null;
      var builderElement = null;
      $scope.options = $scope.options || {};

      // Initialize the builder.
      $scope.initBuilder = function (element) {
        builderElement = element;
        builderElement.innerHTML = '';
        builder = new _formiojs.Formio.FormBuilder(builderElement, $scope.form, $scope.options);
        builderReady = builder.setDisplay($scope.form.display);
      };

      $scope.$on('buildSidebar', function () {
        if (builder && builder.instance) {
          builder.instance.buildSidebar();
        }
      });

      // Detect when the display changes.
      $scope.$watch('form.display', function (display) {
        if (builderReady && display) {
          builderReady.then(function () {
            builder.setDisplay(display);
            if ($scope.url) {
              builder.instance.url = $scope.url;
            }
          });
        }
      });

      $scope.$on('$destroy', function () {
        if (builder && builder.instance) {
          builder.instance.destroy(true);
        }
      });
    }],
    template: '<div/>'
  };
});

/***/ }),

/***/ "./lib/directives/formio.js":
/*!**********************************!*\
  !*** ./lib/directives/formio.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formiojs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'formiojs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var app = angular.module('formio');
exports.default = app.directive('formio', function () {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      src: '=?',
      url: '=?',
      form: '=?',
      submission: '=?',
      readOnly: '=?',
      noSubmit: '=?',
      options: '<?'
    },
    link: function link(scope, element) {
      scope.element = element[0];
      scope.formioReady = false;
      scope.initialized = false;
      scope.options = scope.options || {};
      scope.noSubmit = !!scope.noSubmit;
    },
    controller: ['$scope', '$q', function ($scope, $q) {
      $scope.onLoad = $q.defer();
      $scope.onFormio = $scope.onLoad.promise;
      $scope.initializeForm = function () {
        if (!$scope.element) {
          return;
        }

        // Set read only if using legacy option.
        if (!$scope.options.hasOwnProperty('readOnly') && $scope.readOnly !== undefined) {
          $scope.options.readOnly = $scope.readOnly;
        }

        if ($scope.src || $scope.form) {
          $scope.initialized = true;
          _formiojs.Formio.createForm($scope.element, $scope.src || $scope.form, $scope.options).then(function (formio) {
            formio.nosubmit = $scope.noSubmit;
            $scope.$emit('formLoad', formio.wizard ? formio.wizard : formio.form);
            $scope.formio = formio;
            $scope.setupForm();
          });
        }
      };

      $scope.setupForm = function () {
        if ($scope.submission) {
          $scope.formio.submission = $scope.submission;
        }
        if ($scope.url) {
          $scope.formio.url = $scope.url;
          $scope.formio.nosubmit = $scope.noSubmit || false;
        }
        $scope.formio.events.onAny(function () {
          // Keep backwards compatibility by firing old events as well.
          var args = Array.prototype.slice.call(arguments);

          var eventParts = args[0].split('.');

          var shouldFire = true;

          // Only handle formio events.
          if (eventParts[0] !== 'formio' || eventParts.length !== 2) {
            return;
          }

          // Remove formio. from event.
          args[0] = eventParts[1];
          switch (eventParts[1]) {
            case 'error':
              args[0] = 'formError';
              break;
            case 'submit':
              var submission = args[1];
              args[0] = submission.saved ? 'formSubmission' : 'formSubmit';
              break;
            case 'submitDone':
              args[0] = 'formSubmission';
              break;
            case 'prevPage':
              args[0] = 'wizardPrev';
              break;
            case 'nextPage':
              args[0] = 'wizardNext';
              break;
            case 'customEvent':
              args[0] = args[1].type;
              //prevent customEvent from firing when it's emitted by button with event action (as it is emitted twice)
              if (args[1].component && args[1].component.type === 'button' && args[1].component.action === 'event') {
                shouldFire = false;
              }
              break;
          }

          if (shouldFire) {
            $scope.$emit.apply($scope, args);
          }
        });

        $scope.formioReady = true;
        $scope.onLoad.resolve($scope.formio);
        return $scope.formio;
      };

      $scope.$watch('src', function (src) {
        if (!src) {
          return;
        }
        if ($scope.formioReady) {
          $scope.formio.src = src;
        } else if (!$scope.initialized) {
          $scope.initializeForm();
        } else {
          $scope.onFormio.then(function () {
            return $scope.formio.src = src;
          });
        }
      });

      $scope.$watch('url', function (url) {
        if (!url) {
          return;
        }
        if ($scope.formioReady) {
          $scope.formio.url = url;
          $scope.formio.nosubmit = $scope.noSubmit || false;
        } else if (!$scope.initialized) {
          $scope.initializeForm();
        } else {
          $scope.onFormio.then(function () {
            $scope.formio.url = url;
            $scope.formio.nosubmit = $scope.noSubmit || false;
          });
        }
      });

      $scope.$watch('form', function (form) {
        if (!form || !form.components) {
          return;
        }
        if ($scope.formioReady) {
          $scope.formio.form = form;
        } else if (!$scope.initialized) {
          $scope.initializeForm();
        } else {
          $scope.onFormio.then(function () {
            return $scope.formio.form = form;
          });
        }
      });

      $scope.$watch('submission', function (submission) {
        if (!submission) {
          return;
        }
        $scope.onFormio.then(function () {
          return $scope.formio.submission = submission;
        });
      }, true);

      $scope.$on('componentChange', function () {
        $scope.$apply();
      });

      // Clean up the Form from DOM.
      $scope.$on('$destroy', function () {
        if ($scope.formio) {
          $scope.formio.destroy(true);
        }
      });

      // Initialize the form.
      $scope.initializeForm();
    }],
    template: '<div />'
  };
});

/***/ }),

/***/ "./lib/directives/formioDelete.js":
/*!****************************************!*\
  !*** ./lib/directives/formioDelete.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formiojs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'formiojs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var app = angular.module('formio');
exports.default = app.directive('formioDelete', function () {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      form: '=?',
      submission: '=?',
      src: '=?',
      formAction: '=?',
      resourceName: '=?',
      message: '=?',
      options: '=?'
    },
    template: '<form role="form">\n        <div ng-repeat="alert in formioAlerts track by $index" class="alert alert-{{ alert.type }}" role="alert">\n          {{ alert.message | formioTranslate:null:options.building }}\n        </div>\n        <h3>{{ deleteMessage | formioTranslate:null:options.building }}</h3>\n        <div class="btn-toolbar">\n          <button ng-click="onDelete()" class="btn btn-danger">{{ \'Yes\' | formioTranslate:null:options.building }}</button>\n          <button ng-click="onCancel()" class="btn btn-default">{{ \'No\' | formioTranslate:null:options.building }}</button>\n        </div>\n      </form>',
    controller: ['$scope', '$element', '$http', 'FormioScope', function ($scope, $element, $http, FormioScope) {
      $scope.options = $scope.options || {};
      $scope.formioAlerts = [];
      $scope.showAlerts = function (alerts) {
        $scope.formioAlerts = [].concat(alerts);
      };
      var resourceName = '';
      var methodName = '';
      $scope.$watch('src', function (src) {
        if (!src) {
          return;
        }
        $scope.formio = new _formiojs.Formio(src);
        resourceName = $scope.formio.submissionId ? 'submission' : 'form';
        var resourceTitle = resourceName.charAt(0).toUpperCase() + resourceName.slice(1);
        methodName = 'delete' + resourceTitle;
        $scope.deleteMessage = $scope.message || 'Are you sure you wish to delete the ' + resourceName + '?';
      });

      $scope.$watch('resourceName', function (name) {
        if (!name) {
          return;
        }
        resourceName = name;
      });

      // Create delete capability.
      $scope.onDelete = function () {
        resourceName = resourceName || 'resource';
        // Rebuild resourceTitle, $scope.resourceName could have changed
        var resourceTitle = resourceName.charAt(0).toUpperCase() + resourceName.slice(1);
        // Called when the delete is done.
        var onDeleteDone = function onDeleteDone(data) {
          $scope.showAlerts({
            type: 'success',
            message: resourceTitle + ' was deleted.'
          });
          _formiojs.Formio.clearCache();
          $scope.$emit('delete', data);
        };

        if ($scope.action) {
          $http.delete($scope.action).then(onDeleteDone, FormioScope.onError($scope, $element));
        } else if ($scope.formio) {
          if (!methodName) return;
          if (typeof $scope.formio[methodName] !== 'function') return;
          $scope.formio[methodName]().then(onDeleteDone, FormioScope.onError($scope, $element));
        }
      };
      $scope.onCancel = function () {
        $scope.$emit('cancel');
      };
    }]
  };
});

/***/ }),

/***/ "./lib/directives/index.js":
/*!*********************************!*\
  !*** ./lib/directives/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./formio */ "./lib/directives/formio.js");

__webpack_require__(/*! ./formBuilder */ "./lib/directives/formBuilder.js");

__webpack_require__(/*! ./formioDelete */ "./lib/directives/formioDelete.js");

/***/ }),

/***/ "./lib/factories/FormioScope.js":
/*!**************************************!*\
  !*** ./lib/factories/FormioScope.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var _formiojs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'formiojs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var app = angular.module('formio');
exports.default = app.factory('FormioScope', function () {
  return {
    onError: function onError($scope, $element) {
      return function (error) {
        if (error.name === 'ValidationError' && $element) {
          var element = $element.find('#form-group-' + error.details[0].path);
          element.addClass('has-error');
          var message = 'ValidationError: ' + error.details[0].message;
          $scope.showAlerts({
            type: 'danger',
            message: message
          });
          $scope.$on('formSubmit', function () {
            element.removeClass('has-error');
          });
        } else {
          if (error instanceof Error) {
            error = error.toString();
          } else if ((typeof error === 'undefined' ? 'undefined' : _typeof(error)) === 'object') {
            error = JSON.stringify(error);
          }
          $scope.showAlerts({
            type: 'danger',
            message: error
          });
        }
        $scope.$emit('formError', error);
      };
    }
  };
});

/***/ }),

/***/ "./lib/factories/formioTableView.js":
/*!******************************************!*\
  !*** ./lib/factories/formioTableView.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Components = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'formiojs/components/Components'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _Components2 = _interopRequireDefault(_Components);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var app = angular.module('formio');
exports.default = app.factory('formioTableView', [function () {
  return function (value, component) {
    if (!value && value !== 0 && value !== false) {
      return '';
    }
    if (!component || !component.input || !component.type) {
      return value;
    }
    var componentObject = _Components2.default.create(component, {
      readOnly: true,
      viewAsHtml: true
    });
    if (!componentObject.getView) {
      return value;
    }
    if (component.multiple && value.length > 0) {
      var values = [];
      angular.forEach(value, function (arrayValue) {
        values.push(componentObject.getView(arrayValue));
      });
      return values;
    }
    return componentObject.getView(value);
  };
}]);

/***/ }),

/***/ "./lib/factories/index.js":
/*!********************************!*\
  !*** ./lib/factories/index.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./FormioScope */ "./lib/factories/FormioScope.js");

__webpack_require__(/*! ./formioTableView */ "./lib/factories/formioTableView.js");

/***/ }),

/***/ "./lib/filters/index.js":
/*!******************************!*\
  !*** ./lib/filters/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./translate */ "./lib/filters/translate.js");

/***/ }),

/***/ "./lib/filters/translate.js":
/*!**********************************!*\
  !*** ./lib/filters/translate.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formiojs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'formiojs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var app = angular.module('formio');
exports.default = app.filter('formioTranslate', ['$filter', '$injector', function ($filter, $injector) {
  var formioTranslate = function formioTranslate(text, key, builder) {
    /**
     * Lookup the available translate libraries, currently supports:
     * angular-translate: @see https://github.com/angular-translate/angular-translate
     * angular-gettext: @see https://github.com/rubenv/angular-gettext
     */
    var $translate, gettextCatalog;
    if ($injector.has('$translate')) {
      $translate = $injector.get('$translate');
    } else if ($injector.has('gettextCatalog')) {
      gettextCatalog = $injector.get('gettextCatalog');
    }
    if (builder) return text;
    try {
      // Translate text using either angular-translate or angular-gettext
      var translateText = function translateText(text) {
        if ($translate) return $translate.instant(text);
        if (gettextCatalog) return gettextCatalog.getString(text);
        return text;
      };

      // Allow translating by field key which helps with large blocks of html.
      if (key) {
        var result = translateText(key);
        if (result === key) {
          result = translateText(text);
        }
        return result;
      }

      return translateText(text);
    } catch (e) {
      return text;
    }
  };
  formioTranslate.$stateful = true;
  formioTranslate.use = function (language) {
    if ($injector.has('$translate')) {
      var $translate = $injector.get('$translate');
      $translate.use(language);
    }
  };
  return formioTranslate;
}]);

/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./module */ "./lib/module.js");

__webpack_require__(/*! ./filters */ "./lib/filters/index.js");

__webpack_require__(/*! ./providers */ "./lib/providers/index.js");

__webpack_require__(/*! ./directives */ "./lib/directives/index.js");

__webpack_require__(/*! ./factories */ "./lib/factories/index.js");

__webpack_require__(/*! formiojs/dist/formio.full.min.css */ "./node_modules/formiojs/dist/formio.full.min.css");

/***/ }),

/***/ "./lib/module.js":
/*!***********************!*\
  !*** ./lib/module.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = angular.module('formio', []);

/***/ }),

/***/ "./lib/providers/Formio.js":
/*!*********************************!*\
  !*** ./lib/providers/Formio.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formiojs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'formiojs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var app = angular.module('formio');

// Configure the formioInterceptor. to be used.
app.config(['$httpProvider', '$injector', function ($httpProvider, $injector) {
  if (!$httpProvider.defaults.headers.get) {
    $httpProvider.defaults.headers.get = {};
  }

  // Make sure that ngAnimate doesn't mess up loader.
  try {
    $injector.get('$animateProvider').classNameFilter(/^((?!(fa-spinner|glyphicon-spin)).)*$/);
  }
  /* eslint-disable no-empty */
  catch (err) {}
  /* eslint-enable no-empty */

  // Disable IE caching for GET requests.
  $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
  $httpProvider.defaults.headers.get.Pragma = 'no-cache';
  $httpProvider.interceptors.push('formioInterceptor');
}]);

exports.default = app.provider('Formio', function () {
  // Return the provider interface.
  return {

    // Expose Formio configuration functions
    setBaseUrl: _formiojs.Formio.setBaseUrl,
    getBaseUrl: _formiojs.Formio.getBaseUrl,
    setApiUrl: _formiojs.Formio.setBaseUrl,
    getApiUrl: _formiojs.Formio.getBaseUrl,
    setAppUrl: _formiojs.Formio.setAppUrl,
    setProjectUrl: _formiojs.Formio.setProjectUrl,
    getAppUrl: _formiojs.Formio.getAppUrl,
    getProjectUrl: _formiojs.Formio.getProjectUrl,
    registerPlugin: _formiojs.Formio.registerPlugin,
    getPlugin: _formiojs.Formio.getPlugin,
    providers: _formiojs.Formio.providers,
    setDomain: function setDomain() {
      // Remove this?
    },

    $get: ['$rootScope', '$q', function ($rootScope, $q) {
      var wrapQPromise = function wrapQPromise(promise) {
        return $q.when(promise).catch(function (error) {
          if (error === 'Unauthorized') {
            $rootScope.$broadcast('formio.unauthorized', error);
          } else if (error === 'Login Timeout') {
            $rootScope.$broadcast('formio.sessionExpired', error);
          }
          // Propagate error
          throw error;
        });
      };

      _formiojs.Formio.registerPlugin({
        priority: -100,
        // Wrap Formio.request's promises with $q so $apply gets called correctly.
        wrapRequestPromise: wrapQPromise,
        wrapStaticRequestPromise: wrapQPromise
      }, 'ngFormioPromiseWrapper');

      // Broadcast offline events from $rootScope
      _formiojs.Formio.events.onAny(function () {
        var event = 'formio.' + this.event;
        var args = [].splice.call(arguments, 0);
        args.unshift(event);
        $rootScope.$apply(function () {
          $rootScope.$broadcast.apply($rootScope, args);
        });
      });

      // Return the formio interface.
      return _formiojs.Formio;
    }]
  };
});

/***/ }),

/***/ "./lib/providers/FormioUtils.js":
/*!**************************************!*\
  !*** ./lib/providers/FormioUtils.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'formiojs/utils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var app = angular.module('formio');
exports.default = app.factory('FormioUtils', function () {
  return Object.assign({
    hideFields: function hideFields(form, components) {
      this.eachComponent(form.components, function (component) {
        for (var i in components) {
          if (component.key === components[i]) {
            component.type = 'hidden';
          }
        }
      });
    },
    uniqueName: function uniqueName(name) {
      var parts = name.toLowerCase().replace(/[^0-9a-z\.]/g, '').split('.');
      var fileName = parts[0];
      var ext = '';
      if (parts.length > 1) {
        ext = '.' + parts[parts.length - 1];
      }
      return fileName.substr(0, 10) + '-' + this.guid() + ext;
    },
    guid: function guid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
      });
    },
    fieldWrap: function fieldWrap(field) {
      return field;
    }
  }, _utils2.default);
});

/***/ }),

/***/ "./lib/providers/formioComponents.js":
/*!*******************************************!*\
  !*** ./lib/providers/formioComponents.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var app = angular.module('formio');
var Components = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'formiojs/components'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())).default;
exports.default = app.provider('formioComponents', function () {
  var components = Components;
  var groups = {
    __component: {
      title: 'Basic Components'
    },
    advanced: {
      title: 'Special Components'
    },
    layout: {
      title: 'Layout Components'
    }
  };
  return {
    addGroup: function addGroup(name, group) {
      console.warn('formioComponents is deprecated');
    },
    register: function register(type, component, group) {
      console.warn('formioComponents is deprecated');
    },
    $get: function $get() {
      return {
        components: components,
        groups: groups
      };
    }
  };
});

/***/ }),

/***/ "./lib/providers/formioInterceptor.js":
/*!********************************************!*\
  !*** ./lib/providers/formioInterceptor.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var app = angular.module('formio');
exports.default = app.factory('formioInterceptor', ['$q', '$rootScope', 'Formio', function ($q, $rootScope, Formio) {
  var Interceptor = {
    /**
     * Update JWT token received from response.
     */
    response: function response(_response) {
      var token = _response.headers('x-jwt-token');
      if (_response.status >= 200 && _response.status < 300 && token && token !== '') {
        Formio.setToken(token);
      }
      return _response;
    },

    /**
     * Intercept a response error.
     */
    responseError: function responseError(response) {
      if (parseInt(response.status, 10) === 440) {
        response.loggedOut = true;
        Formio.setToken(null);
        $rootScope.$broadcast('formio.sessionExpired', response.body);
      } else if (parseInt(response.status, 10) === 401) {
        $rootScope.$broadcast('formio.unauthorized', response.body);
      }
      return $q.reject(response);
    },

    /**
     * Set the token in the request headers.
     */
    request: function request(config) {
      if (config.disableJWT) return config;
      var token = Formio.getToken();
      if (token) config.headers['x-jwt-token'] = token;
      return config;
    }
  };

  return Interceptor;
}]);

/***/ }),

/***/ "./lib/providers/index.js":
/*!********************************!*\
  !*** ./lib/providers/index.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./Formio */ "./lib/providers/Formio.js");

__webpack_require__(/*! ./formioComponents */ "./lib/providers/formioComponents.js");

__webpack_require__(/*! ./formioInterceptor */ "./lib/providers/formioInterceptor.js");

__webpack_require__(/*! ./FormioUtils */ "./lib/providers/FormioUtils.js");

/***/ }),

/***/ "./node_modules/formiojs/dist/formio.full.min.css":
/*!********************************************************!*\
  !*** ./node_modules/formiojs/dist/formio.full.min.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });
});
//# sourceMappingURL=ng-formio.js.map