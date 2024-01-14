(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/react/cjs/react.development.js
  var require_react_development = __commonJS({
    "node_modules/react/cjs/react.development.js"(exports, module) {
      "use strict";
      if (true) {
        (function() {
          "use strict";
          if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
          }
          var ReactVersion = "18.2.0";
          var REACT_ELEMENT_TYPE = Symbol.for("react.element");
          var REACT_PORTAL_TYPE = Symbol.for("react.portal");
          var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
          var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
          var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
          var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
          var REACT_CONTEXT_TYPE = Symbol.for("react.context");
          var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
          var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
          var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
          var REACT_MEMO_TYPE = Symbol.for("react.memo");
          var REACT_LAZY_TYPE = Symbol.for("react.lazy");
          var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
          var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
          var FAUX_ITERATOR_SYMBOL = "@@iterator";
          function getIteratorFn(maybeIterable) {
            if (maybeIterable === null || typeof maybeIterable !== "object") {
              return null;
            }
            var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
            if (typeof maybeIterator === "function") {
              return maybeIterator;
            }
            return null;
          }
          var ReactCurrentDispatcher = {
            /**
             * @internal
             * @type {ReactComponent}
             */
            current: null
          };
          var ReactCurrentBatchConfig = {
            transition: null
          };
          var ReactCurrentActQueue = {
            current: null,
            // Used to reproduce behavior of `batchedUpdates` in legacy mode.
            isBatchingLegacy: false,
            didScheduleLegacyUpdate: false
          };
          var ReactCurrentOwner = {
            /**
             * @internal
             * @type {ReactComponent}
             */
            current: null
          };
          var ReactDebugCurrentFrame = {};
          var currentExtraStackFrame = null;
          function setExtraStackFrame(stack) {
            {
              currentExtraStackFrame = stack;
            }
          }
          {
            ReactDebugCurrentFrame.setExtraStackFrame = function(stack) {
              {
                currentExtraStackFrame = stack;
              }
            };
            ReactDebugCurrentFrame.getCurrentStack = null;
            ReactDebugCurrentFrame.getStackAddendum = function() {
              var stack = "";
              if (currentExtraStackFrame) {
                stack += currentExtraStackFrame;
              }
              var impl = ReactDebugCurrentFrame.getCurrentStack;
              if (impl) {
                stack += impl() || "";
              }
              return stack;
            };
          }
          var enableScopeAPI = false;
          var enableCacheElement = false;
          var enableTransitionTracing = false;
          var enableLegacyHidden = false;
          var enableDebugTracing = false;
          var ReactSharedInternals = {
            ReactCurrentDispatcher,
            ReactCurrentBatchConfig,
            ReactCurrentOwner
          };
          {
            ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
            ReactSharedInternals.ReactCurrentActQueue = ReactCurrentActQueue;
          }
          function warn(format) {
            {
              {
                for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                  args[_key - 1] = arguments[_key];
                }
                printWarning("warn", format, args);
              }
            }
          }
          function error(format) {
            {
              {
                for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                  args[_key2 - 1] = arguments[_key2];
                }
                printWarning("error", format, args);
              }
            }
          }
          function printWarning(level, format, args) {
            {
              var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
              var stack = ReactDebugCurrentFrame2.getStackAddendum();
              if (stack !== "") {
                format += "%s";
                args = args.concat([stack]);
              }
              var argsWithFormat = args.map(function(item) {
                return String(item);
              });
              argsWithFormat.unshift("Warning: " + format);
              Function.prototype.apply.call(console[level], console, argsWithFormat);
            }
          }
          var didWarnStateUpdateForUnmountedComponent = {};
          function warnNoop(publicInstance, callerName) {
            {
              var _constructor = publicInstance.constructor;
              var componentName = _constructor && (_constructor.displayName || _constructor.name) || "ReactClass";
              var warningKey = componentName + "." + callerName;
              if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
                return;
              }
              error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, componentName);
              didWarnStateUpdateForUnmountedComponent[warningKey] = true;
            }
          }
          var ReactNoopUpdateQueue = {
            /**
             * Checks whether or not this composite component is mounted.
             * @param {ReactClass} publicInstance The instance we want to test.
             * @return {boolean} True if mounted, false otherwise.
             * @protected
             * @final
             */
            isMounted: function(publicInstance) {
              return false;
            },
            /**
             * Forces an update. This should only be invoked when it is known with
             * certainty that we are **not** in a DOM transaction.
             *
             * You may want to call this when you know that some deeper aspect of the
             * component's state has changed but `setState` was not called.
             *
             * This will not invoke `shouldComponentUpdate`, but it will invoke
             * `componentWillUpdate` and `componentDidUpdate`.
             *
             * @param {ReactClass} publicInstance The instance that should rerender.
             * @param {?function} callback Called after component is updated.
             * @param {?string} callerName name of the calling function in the public API.
             * @internal
             */
            enqueueForceUpdate: function(publicInstance, callback, callerName) {
              warnNoop(publicInstance, "forceUpdate");
            },
            /**
             * Replaces all of the state. Always use this or `setState` to mutate state.
             * You should treat `this.state` as immutable.
             *
             * There is no guarantee that `this.state` will be immediately updated, so
             * accessing `this.state` after calling this method may return the old value.
             *
             * @param {ReactClass} publicInstance The instance that should rerender.
             * @param {object} completeState Next state.
             * @param {?function} callback Called after component is updated.
             * @param {?string} callerName name of the calling function in the public API.
             * @internal
             */
            enqueueReplaceState: function(publicInstance, completeState, callback, callerName) {
              warnNoop(publicInstance, "replaceState");
            },
            /**
             * Sets a subset of the state. This only exists because _pendingState is
             * internal. This provides a merging strategy that is not available to deep
             * properties which is confusing. TODO: Expose pendingState or don't use it
             * during the merge.
             *
             * @param {ReactClass} publicInstance The instance that should rerender.
             * @param {object} partialState Next partial state to be merged with state.
             * @param {?function} callback Called after component is updated.
             * @param {?string} Name of the calling function in the public API.
             * @internal
             */
            enqueueSetState: function(publicInstance, partialState, callback, callerName) {
              warnNoop(publicInstance, "setState");
            }
          };
          var assign = Object.assign;
          var emptyObject = {};
          {
            Object.freeze(emptyObject);
          }
          function Component(props, context, updater) {
            this.props = props;
            this.context = context;
            this.refs = emptyObject;
            this.updater = updater || ReactNoopUpdateQueue;
          }
          Component.prototype.isReactComponent = {};
          Component.prototype.setState = function(partialState, callback) {
            if (typeof partialState !== "object" && typeof partialState !== "function" && partialState != null) {
              throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
            }
            this.updater.enqueueSetState(this, partialState, callback, "setState");
          };
          Component.prototype.forceUpdate = function(callback) {
            this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
          };
          {
            var deprecatedAPIs = {
              isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
              replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
            };
            var defineDeprecationWarning = function(methodName, info) {
              Object.defineProperty(Component.prototype, methodName, {
                get: function() {
                  warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
                  return void 0;
                }
              });
            };
            for (var fnName in deprecatedAPIs) {
              if (deprecatedAPIs.hasOwnProperty(fnName)) {
                defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
              }
            }
          }
          function ComponentDummy() {
          }
          ComponentDummy.prototype = Component.prototype;
          function PureComponent(props, context, updater) {
            this.props = props;
            this.context = context;
            this.refs = emptyObject;
            this.updater = updater || ReactNoopUpdateQueue;
          }
          var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
          pureComponentPrototype.constructor = PureComponent;
          assign(pureComponentPrototype, Component.prototype);
          pureComponentPrototype.isPureReactComponent = true;
          function createRef() {
            var refObject = {
              current: null
            };
            {
              Object.seal(refObject);
            }
            return refObject;
          }
          var isArrayImpl = Array.isArray;
          function isArray(a) {
            return isArrayImpl(a);
          }
          function typeName(value) {
            {
              var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
              var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
              return type;
            }
          }
          function willCoercionThrow(value) {
            {
              try {
                testStringCoercion(value);
                return false;
              } catch (e) {
                return true;
              }
            }
          }
          function testStringCoercion(value) {
            return "" + value;
          }
          function checkKeyStringCoercion(value) {
            {
              if (willCoercionThrow(value)) {
                error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
                return testStringCoercion(value);
              }
            }
          }
          function getWrappedName(outerType, innerType, wrapperName) {
            var displayName = outerType.displayName;
            if (displayName) {
              return displayName;
            }
            var functionName = innerType.displayName || innerType.name || "";
            return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
          }
          function getContextName(type) {
            return type.displayName || "Context";
          }
          function getComponentNameFromType(type) {
            if (type == null) {
              return null;
            }
            {
              if (typeof type.tag === "number") {
                error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
              }
            }
            if (typeof type === "function") {
              return type.displayName || type.name || null;
            }
            if (typeof type === "string") {
              return type;
            }
            switch (type) {
              case REACT_FRAGMENT_TYPE:
                return "Fragment";
              case REACT_PORTAL_TYPE:
                return "Portal";
              case REACT_PROFILER_TYPE:
                return "Profiler";
              case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
              case REACT_SUSPENSE_TYPE:
                return "Suspense";
              case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_CONTEXT_TYPE:
                  var context = type;
                  return getContextName(context) + ".Consumer";
                case REACT_PROVIDER_TYPE:
                  var provider = type;
                  return getContextName(provider._context) + ".Provider";
                case REACT_FORWARD_REF_TYPE:
                  return getWrappedName(type, type.render, "ForwardRef");
                case REACT_MEMO_TYPE:
                  var outerName = type.displayName || null;
                  if (outerName !== null) {
                    return outerName;
                  }
                  return getComponentNameFromType(type.type) || "Memo";
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return getComponentNameFromType(init(payload));
                  } catch (x) {
                    return null;
                  }
                }
              }
            }
            return null;
          }
          var hasOwnProperty = Object.prototype.hasOwnProperty;
          var RESERVED_PROPS = {
            key: true,
            ref: true,
            __self: true,
            __source: true
          };
          var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
          {
            didWarnAboutStringRefs = {};
          }
          function hasValidRef(config) {
            {
              if (hasOwnProperty.call(config, "ref")) {
                var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
                if (getter && getter.isReactWarning) {
                  return false;
                }
              }
            }
            return config.ref !== void 0;
          }
          function hasValidKey(config) {
            {
              if (hasOwnProperty.call(config, "key")) {
                var getter = Object.getOwnPropertyDescriptor(config, "key").get;
                if (getter && getter.isReactWarning) {
                  return false;
                }
              }
            }
            return config.key !== void 0;
          }
          function defineKeyPropWarningGetter(props, displayName) {
            var warnAboutAccessingKey = function() {
              {
                if (!specialPropKeyWarningShown) {
                  specialPropKeyWarningShown = true;
                  error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
                }
              }
            };
            warnAboutAccessingKey.isReactWarning = true;
            Object.defineProperty(props, "key", {
              get: warnAboutAccessingKey,
              configurable: true
            });
          }
          function defineRefPropWarningGetter(props, displayName) {
            var warnAboutAccessingRef = function() {
              {
                if (!specialPropRefWarningShown) {
                  specialPropRefWarningShown = true;
                  error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
                }
              }
            };
            warnAboutAccessingRef.isReactWarning = true;
            Object.defineProperty(props, "ref", {
              get: warnAboutAccessingRef,
              configurable: true
            });
          }
          function warnIfStringRefCannotBeAutoConverted(config) {
            {
              if (typeof config.ref === "string" && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
                var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
                if (!didWarnAboutStringRefs[componentName]) {
                  error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', componentName, config.ref);
                  didWarnAboutStringRefs[componentName] = true;
                }
              }
            }
          }
          var ReactElement = function(type, key, ref, self, source, owner, props) {
            var element = {
              // This tag allows us to uniquely identify this as a React Element
              $$typeof: REACT_ELEMENT_TYPE,
              // Built-in properties that belong on the element
              type,
              key,
              ref,
              props,
              // Record the component responsible for creating this element.
              _owner: owner
            };
            {
              element._store = {};
              Object.defineProperty(element._store, "validated", {
                configurable: false,
                enumerable: false,
                writable: true,
                value: false
              });
              Object.defineProperty(element, "_self", {
                configurable: false,
                enumerable: false,
                writable: false,
                value: self
              });
              Object.defineProperty(element, "_source", {
                configurable: false,
                enumerable: false,
                writable: false,
                value: source
              });
              if (Object.freeze) {
                Object.freeze(element.props);
                Object.freeze(element);
              }
            }
            return element;
          };
          function createElement(type, config, children) {
            var propName;
            var props = {};
            var key = null;
            var ref = null;
            var self = null;
            var source = null;
            if (config != null) {
              if (hasValidRef(config)) {
                ref = config.ref;
                {
                  warnIfStringRefCannotBeAutoConverted(config);
                }
              }
              if (hasValidKey(config)) {
                {
                  checkKeyStringCoercion(config.key);
                }
                key = "" + config.key;
              }
              self = config.__self === void 0 ? null : config.__self;
              source = config.__source === void 0 ? null : config.__source;
              for (propName in config) {
                if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                  props[propName] = config[propName];
                }
              }
            }
            var childrenLength = arguments.length - 2;
            if (childrenLength === 1) {
              props.children = children;
            } else if (childrenLength > 1) {
              var childArray = Array(childrenLength);
              for (var i = 0; i < childrenLength; i++) {
                childArray[i] = arguments[i + 2];
              }
              {
                if (Object.freeze) {
                  Object.freeze(childArray);
                }
              }
              props.children = childArray;
            }
            if (type && type.defaultProps) {
              var defaultProps = type.defaultProps;
              for (propName in defaultProps) {
                if (props[propName] === void 0) {
                  props[propName] = defaultProps[propName];
                }
              }
            }
            {
              if (key || ref) {
                var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
                if (key) {
                  defineKeyPropWarningGetter(props, displayName);
                }
                if (ref) {
                  defineRefPropWarningGetter(props, displayName);
                }
              }
            }
            return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
          }
          function cloneAndReplaceKey(oldElement, newKey) {
            var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
            return newElement;
          }
          function cloneElement(element, config, children) {
            if (element === null || element === void 0) {
              throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
            }
            var propName;
            var props = assign({}, element.props);
            var key = element.key;
            var ref = element.ref;
            var self = element._self;
            var source = element._source;
            var owner = element._owner;
            if (config != null) {
              if (hasValidRef(config)) {
                ref = config.ref;
                owner = ReactCurrentOwner.current;
              }
              if (hasValidKey(config)) {
                {
                  checkKeyStringCoercion(config.key);
                }
                key = "" + config.key;
              }
              var defaultProps;
              if (element.type && element.type.defaultProps) {
                defaultProps = element.type.defaultProps;
              }
              for (propName in config) {
                if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                  if (config[propName] === void 0 && defaultProps !== void 0) {
                    props[propName] = defaultProps[propName];
                  } else {
                    props[propName] = config[propName];
                  }
                }
              }
            }
            var childrenLength = arguments.length - 2;
            if (childrenLength === 1) {
              props.children = children;
            } else if (childrenLength > 1) {
              var childArray = Array(childrenLength);
              for (var i = 0; i < childrenLength; i++) {
                childArray[i] = arguments[i + 2];
              }
              props.children = childArray;
            }
            return ReactElement(element.type, key, ref, self, source, owner, props);
          }
          function isValidElement(object) {
            return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
          }
          var SEPARATOR = ".";
          var SUBSEPARATOR = ":";
          function escape(key) {
            var escapeRegex = /[=:]/g;
            var escaperLookup = {
              "=": "=0",
              ":": "=2"
            };
            var escapedString = key.replace(escapeRegex, function(match) {
              return escaperLookup[match];
            });
            return "$" + escapedString;
          }
          var didWarnAboutMaps = false;
          var userProvidedKeyEscapeRegex = /\/+/g;
          function escapeUserProvidedKey(text) {
            return text.replace(userProvidedKeyEscapeRegex, "$&/");
          }
          function getElementKey(element, index) {
            if (typeof element === "object" && element !== null && element.key != null) {
              {
                checkKeyStringCoercion(element.key);
              }
              return escape("" + element.key);
            }
            return index.toString(36);
          }
          function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
            var type = typeof children;
            if (type === "undefined" || type === "boolean") {
              children = null;
            }
            var invokeCallback = false;
            if (children === null) {
              invokeCallback = true;
            } else {
              switch (type) {
                case "string":
                case "number":
                  invokeCallback = true;
                  break;
                case "object":
                  switch (children.$$typeof) {
                    case REACT_ELEMENT_TYPE:
                    case REACT_PORTAL_TYPE:
                      invokeCallback = true;
                  }
              }
            }
            if (invokeCallback) {
              var _child = children;
              var mappedChild = callback(_child);
              var childKey = nameSoFar === "" ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
              if (isArray(mappedChild)) {
                var escapedChildKey = "";
                if (childKey != null) {
                  escapedChildKey = escapeUserProvidedKey(childKey) + "/";
                }
                mapIntoArray(mappedChild, array, escapedChildKey, "", function(c) {
                  return c;
                });
              } else if (mappedChild != null) {
                if (isValidElement(mappedChild)) {
                  {
                    if (mappedChild.key && (!_child || _child.key !== mappedChild.key)) {
                      checkKeyStringCoercion(mappedChild.key);
                    }
                  }
                  mappedChild = cloneAndReplaceKey(
                    mappedChild,
                    // Keep both the (mapped) and old keys if they differ, just as
                    // traverseAllChildren used to do for objects as children
                    escapedPrefix + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
                    (mappedChild.key && (!_child || _child.key !== mappedChild.key) ? (
                      // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
                      // eslint-disable-next-line react-internal/safe-string-coercion
                      escapeUserProvidedKey("" + mappedChild.key) + "/"
                    ) : "") + childKey
                  );
                }
                array.push(mappedChild);
              }
              return 1;
            }
            var child;
            var nextName;
            var subtreeCount = 0;
            var nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;
            if (isArray(children)) {
              for (var i = 0; i < children.length; i++) {
                child = children[i];
                nextName = nextNamePrefix + getElementKey(child, i);
                subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
              }
            } else {
              var iteratorFn = getIteratorFn(children);
              if (typeof iteratorFn === "function") {
                var iterableChildren = children;
                {
                  if (iteratorFn === iterableChildren.entries) {
                    if (!didWarnAboutMaps) {
                      warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
                    }
                    didWarnAboutMaps = true;
                  }
                }
                var iterator = iteratorFn.call(iterableChildren);
                var step;
                var ii = 0;
                while (!(step = iterator.next()).done) {
                  child = step.value;
                  nextName = nextNamePrefix + getElementKey(child, ii++);
                  subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
                }
              } else if (type === "object") {
                var childrenString = String(children);
                throw new Error("Objects are not valid as a React child (found: " + (childrenString === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString) + "). If you meant to render a collection of children, use an array instead.");
              }
            }
            return subtreeCount;
          }
          function mapChildren(children, func, context) {
            if (children == null) {
              return children;
            }
            var result = [];
            var count = 0;
            mapIntoArray(children, result, "", "", function(child) {
              return func.call(context, child, count++);
            });
            return result;
          }
          function countChildren(children) {
            var n = 0;
            mapChildren(children, function() {
              n++;
            });
            return n;
          }
          function forEachChildren(children, forEachFunc, forEachContext) {
            mapChildren(children, function() {
              forEachFunc.apply(this, arguments);
            }, forEachContext);
          }
          function toArray(children) {
            return mapChildren(children, function(child) {
              return child;
            }) || [];
          }
          function onlyChild(children) {
            if (!isValidElement(children)) {
              throw new Error("React.Children.only expected to receive a single React element child.");
            }
            return children;
          }
          function createContext(defaultValue) {
            var context = {
              $$typeof: REACT_CONTEXT_TYPE,
              // As a workaround to support multiple concurrent renderers, we categorize
              // some renderers as primary and others as secondary. We only expect
              // there to be two concurrent renderers at most: React Native (primary) and
              // Fabric (secondary); React DOM (primary) and React ART (secondary).
              // Secondary renderers store their context values on separate fields.
              _currentValue: defaultValue,
              _currentValue2: defaultValue,
              // Used to track how many concurrent renderers this context currently
              // supports within in a single renderer. Such as parallel server rendering.
              _threadCount: 0,
              // These are circular
              Provider: null,
              Consumer: null,
              // Add these to use same hidden class in VM as ServerContext
              _defaultValue: null,
              _globalName: null
            };
            context.Provider = {
              $$typeof: REACT_PROVIDER_TYPE,
              _context: context
            };
            var hasWarnedAboutUsingNestedContextConsumers = false;
            var hasWarnedAboutUsingConsumerProvider = false;
            var hasWarnedAboutDisplayNameOnConsumer = false;
            {
              var Consumer = {
                $$typeof: REACT_CONTEXT_TYPE,
                _context: context
              };
              Object.defineProperties(Consumer, {
                Provider: {
                  get: function() {
                    if (!hasWarnedAboutUsingConsumerProvider) {
                      hasWarnedAboutUsingConsumerProvider = true;
                      error("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?");
                    }
                    return context.Provider;
                  },
                  set: function(_Provider) {
                    context.Provider = _Provider;
                  }
                },
                _currentValue: {
                  get: function() {
                    return context._currentValue;
                  },
                  set: function(_currentValue) {
                    context._currentValue = _currentValue;
                  }
                },
                _currentValue2: {
                  get: function() {
                    return context._currentValue2;
                  },
                  set: function(_currentValue2) {
                    context._currentValue2 = _currentValue2;
                  }
                },
                _threadCount: {
                  get: function() {
                    return context._threadCount;
                  },
                  set: function(_threadCount) {
                    context._threadCount = _threadCount;
                  }
                },
                Consumer: {
                  get: function() {
                    if (!hasWarnedAboutUsingNestedContextConsumers) {
                      hasWarnedAboutUsingNestedContextConsumers = true;
                      error("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                    }
                    return context.Consumer;
                  }
                },
                displayName: {
                  get: function() {
                    return context.displayName;
                  },
                  set: function(displayName) {
                    if (!hasWarnedAboutDisplayNameOnConsumer) {
                      warn("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", displayName);
                      hasWarnedAboutDisplayNameOnConsumer = true;
                    }
                  }
                }
              });
              context.Consumer = Consumer;
            }
            {
              context._currentRenderer = null;
              context._currentRenderer2 = null;
            }
            return context;
          }
          var Uninitialized = -1;
          var Pending = 0;
          var Resolved = 1;
          var Rejected = 2;
          function lazyInitializer(payload) {
            if (payload._status === Uninitialized) {
              var ctor = payload._result;
              var thenable = ctor();
              thenable.then(function(moduleObject2) {
                if (payload._status === Pending || payload._status === Uninitialized) {
                  var resolved = payload;
                  resolved._status = Resolved;
                  resolved._result = moduleObject2;
                }
              }, function(error2) {
                if (payload._status === Pending || payload._status === Uninitialized) {
                  var rejected = payload;
                  rejected._status = Rejected;
                  rejected._result = error2;
                }
              });
              if (payload._status === Uninitialized) {
                var pending = payload;
                pending._status = Pending;
                pending._result = thenable;
              }
            }
            if (payload._status === Resolved) {
              var moduleObject = payload._result;
              {
                if (moduleObject === void 0) {
                  error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", moduleObject);
                }
              }
              {
                if (!("default" in moduleObject)) {
                  error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", moduleObject);
                }
              }
              return moduleObject.default;
            } else {
              throw payload._result;
            }
          }
          function lazy(ctor) {
            var payload = {
              // We use these fields to store the result.
              _status: Uninitialized,
              _result: ctor
            };
            var lazyType = {
              $$typeof: REACT_LAZY_TYPE,
              _payload: payload,
              _init: lazyInitializer
            };
            {
              var defaultProps;
              var propTypes;
              Object.defineProperties(lazyType, {
                defaultProps: {
                  configurable: true,
                  get: function() {
                    return defaultProps;
                  },
                  set: function(newDefaultProps) {
                    error("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                    defaultProps = newDefaultProps;
                    Object.defineProperty(lazyType, "defaultProps", {
                      enumerable: true
                    });
                  }
                },
                propTypes: {
                  configurable: true,
                  get: function() {
                    return propTypes;
                  },
                  set: function(newPropTypes) {
                    error("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                    propTypes = newPropTypes;
                    Object.defineProperty(lazyType, "propTypes", {
                      enumerable: true
                    });
                  }
                }
              });
            }
            return lazyType;
          }
          function forwardRef(render) {
            {
              if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
                error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).");
              } else if (typeof render !== "function") {
                error("forwardRef requires a render function but was given %s.", render === null ? "null" : typeof render);
              } else {
                if (render.length !== 0 && render.length !== 2) {
                  error("forwardRef render functions accept exactly two parameters: props and ref. %s", render.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
                }
              }
              if (render != null) {
                if (render.defaultProps != null || render.propTypes != null) {
                  error("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
                }
              }
            }
            var elementType = {
              $$typeof: REACT_FORWARD_REF_TYPE,
              render
            };
            {
              var ownName;
              Object.defineProperty(elementType, "displayName", {
                enumerable: false,
                configurable: true,
                get: function() {
                  return ownName;
                },
                set: function(name) {
                  ownName = name;
                  if (!render.name && !render.displayName) {
                    render.displayName = name;
                  }
                }
              });
            }
            return elementType;
          }
          var REACT_MODULE_REFERENCE;
          {
            REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
          }
          function isValidElementType(type) {
            if (typeof type === "string" || typeof type === "function") {
              return true;
            }
            if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
              return true;
            }
            if (typeof type === "object" && type !== null) {
              if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
              // types supported by any Flight configuration anywhere since
              // we don't know which Flight build this will end up being used
              // with.
              type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
                return true;
              }
            }
            return false;
          }
          function memo(type, compare) {
            {
              if (!isValidElementType(type)) {
                error("memo: The first argument must be a component. Instead received: %s", type === null ? "null" : typeof type);
              }
            }
            var elementType = {
              $$typeof: REACT_MEMO_TYPE,
              type,
              compare: compare === void 0 ? null : compare
            };
            {
              var ownName;
              Object.defineProperty(elementType, "displayName", {
                enumerable: false,
                configurable: true,
                get: function() {
                  return ownName;
                },
                set: function(name) {
                  ownName = name;
                  if (!type.name && !type.displayName) {
                    type.displayName = name;
                  }
                }
              });
            }
            return elementType;
          }
          function resolveDispatcher() {
            var dispatcher = ReactCurrentDispatcher.current;
            {
              if (dispatcher === null) {
                error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
              }
            }
            return dispatcher;
          }
          function useContext(Context) {
            var dispatcher = resolveDispatcher();
            {
              if (Context._context !== void 0) {
                var realContext = Context._context;
                if (realContext.Consumer === Context) {
                  error("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?");
                } else if (realContext.Provider === Context) {
                  error("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
                }
              }
            }
            return dispatcher.useContext(Context);
          }
          function useState(initialState) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useState(initialState);
          }
          function useReducer(reducer, initialArg, init) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useReducer(reducer, initialArg, init);
          }
          function useRef(initialValue) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useRef(initialValue);
          }
          function useEffect(create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useEffect(create, deps);
          }
          function useInsertionEffect(create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useInsertionEffect(create, deps);
          }
          function useLayoutEffect(create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useLayoutEffect(create, deps);
          }
          function useCallback(callback, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useCallback(callback, deps);
          }
          function useMemo(create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useMemo(create, deps);
          }
          function useImperativeHandle(ref, create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useImperativeHandle(ref, create, deps);
          }
          function useDebugValue(value, formatterFn) {
            {
              var dispatcher = resolveDispatcher();
              return dispatcher.useDebugValue(value, formatterFn);
            }
          }
          function useTransition() {
            var dispatcher = resolveDispatcher();
            return dispatcher.useTransition();
          }
          function useDeferredValue(value) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useDeferredValue(value);
          }
          function useId() {
            var dispatcher = resolveDispatcher();
            return dispatcher.useId();
          }
          function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
          }
          var disabledDepth = 0;
          var prevLog;
          var prevInfo;
          var prevWarn;
          var prevError;
          var prevGroup;
          var prevGroupCollapsed;
          var prevGroupEnd;
          function disabledLog() {
          }
          disabledLog.__reactDisabledLog = true;
          function disableLogs() {
            {
              if (disabledDepth === 0) {
                prevLog = console.log;
                prevInfo = console.info;
                prevWarn = console.warn;
                prevError = console.error;
                prevGroup = console.group;
                prevGroupCollapsed = console.groupCollapsed;
                prevGroupEnd = console.groupEnd;
                var props = {
                  configurable: true,
                  enumerable: true,
                  value: disabledLog,
                  writable: true
                };
                Object.defineProperties(console, {
                  info: props,
                  log: props,
                  warn: props,
                  error: props,
                  group: props,
                  groupCollapsed: props,
                  groupEnd: props
                });
              }
              disabledDepth++;
            }
          }
          function reenableLogs() {
            {
              disabledDepth--;
              if (disabledDepth === 0) {
                var props = {
                  configurable: true,
                  enumerable: true,
                  writable: true
                };
                Object.defineProperties(console, {
                  log: assign({}, props, {
                    value: prevLog
                  }),
                  info: assign({}, props, {
                    value: prevInfo
                  }),
                  warn: assign({}, props, {
                    value: prevWarn
                  }),
                  error: assign({}, props, {
                    value: prevError
                  }),
                  group: assign({}, props, {
                    value: prevGroup
                  }),
                  groupCollapsed: assign({}, props, {
                    value: prevGroupCollapsed
                  }),
                  groupEnd: assign({}, props, {
                    value: prevGroupEnd
                  })
                });
              }
              if (disabledDepth < 0) {
                error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
              }
            }
          }
          var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
          var prefix;
          function describeBuiltInComponentFrame(name, source, ownerFn) {
            {
              if (prefix === void 0) {
                try {
                  throw Error();
                } catch (x) {
                  var match = x.stack.trim().match(/\n( *(at )?)/);
                  prefix = match && match[1] || "";
                }
              }
              return "\n" + prefix + name;
            }
          }
          var reentry = false;
          var componentFrameCache;
          {
            var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
            componentFrameCache = new PossiblyWeakMap();
          }
          function describeNativeComponentFrame(fn, construct) {
            if (!fn || reentry) {
              return "";
            }
            {
              var frame = componentFrameCache.get(fn);
              if (frame !== void 0) {
                return frame;
              }
            }
            var control;
            reentry = true;
            var previousPrepareStackTrace = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            var previousDispatcher;
            {
              previousDispatcher = ReactCurrentDispatcher$1.current;
              ReactCurrentDispatcher$1.current = null;
              disableLogs();
            }
            try {
              if (construct) {
                var Fake = function() {
                  throw Error();
                };
                Object.defineProperty(Fake.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                });
                if (typeof Reflect === "object" && Reflect.construct) {
                  try {
                    Reflect.construct(Fake, []);
                  } catch (x) {
                    control = x;
                  }
                  Reflect.construct(fn, [], Fake);
                } else {
                  try {
                    Fake.call();
                  } catch (x) {
                    control = x;
                  }
                  fn.call(Fake.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (x) {
                  control = x;
                }
                fn();
              }
            } catch (sample) {
              if (sample && control && typeof sample.stack === "string") {
                var sampleLines = sample.stack.split("\n");
                var controlLines = control.stack.split("\n");
                var s = sampleLines.length - 1;
                var c = controlLines.length - 1;
                while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                  c--;
                }
                for (; s >= 1 && c >= 0; s--, c--) {
                  if (sampleLines[s] !== controlLines[c]) {
                    if (s !== 1 || c !== 1) {
                      do {
                        s--;
                        c--;
                        if (c < 0 || sampleLines[s] !== controlLines[c]) {
                          var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                          if (fn.displayName && _frame.includes("<anonymous>")) {
                            _frame = _frame.replace("<anonymous>", fn.displayName);
                          }
                          {
                            if (typeof fn === "function") {
                              componentFrameCache.set(fn, _frame);
                            }
                          }
                          return _frame;
                        }
                      } while (s >= 1 && c >= 0);
                    }
                    break;
                  }
                }
              }
            } finally {
              reentry = false;
              {
                ReactCurrentDispatcher$1.current = previousDispatcher;
                reenableLogs();
              }
              Error.prepareStackTrace = previousPrepareStackTrace;
            }
            var name = fn ? fn.displayName || fn.name : "";
            var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
            {
              if (typeof fn === "function") {
                componentFrameCache.set(fn, syntheticFrame);
              }
            }
            return syntheticFrame;
          }
          function describeFunctionComponentFrame(fn, source, ownerFn) {
            {
              return describeNativeComponentFrame(fn, false);
            }
          }
          function shouldConstruct(Component2) {
            var prototype = Component2.prototype;
            return !!(prototype && prototype.isReactComponent);
          }
          function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
            if (type == null) {
              return "";
            }
            if (typeof type === "function") {
              {
                return describeNativeComponentFrame(type, shouldConstruct(type));
              }
            }
            if (typeof type === "string") {
              return describeBuiltInComponentFrame(type);
            }
            switch (type) {
              case REACT_SUSPENSE_TYPE:
                return describeBuiltInComponentFrame("Suspense");
              case REACT_SUSPENSE_LIST_TYPE:
                return describeBuiltInComponentFrame("SuspenseList");
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_FORWARD_REF_TYPE:
                  return describeFunctionComponentFrame(type.render);
                case REACT_MEMO_TYPE:
                  return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                  } catch (x) {
                  }
                }
              }
            }
            return "";
          }
          var loggedTypeFailures = {};
          var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
          function setCurrentlyValidatingElement(element) {
            {
              if (element) {
                var owner = element._owner;
                var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
                ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
              } else {
                ReactDebugCurrentFrame$1.setExtraStackFrame(null);
              }
            }
          }
          function checkPropTypes(typeSpecs, values, location, componentName, element) {
            {
              var has = Function.call.bind(hasOwnProperty);
              for (var typeSpecName in typeSpecs) {
                if (has(typeSpecs, typeSpecName)) {
                  var error$1 = void 0;
                  try {
                    if (typeof typeSpecs[typeSpecName] !== "function") {
                      var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                      err.name = "Invariant Violation";
                      throw err;
                    }
                    error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                  } catch (ex) {
                    error$1 = ex;
                  }
                  if (error$1 && !(error$1 instanceof Error)) {
                    setCurrentlyValidatingElement(element);
                    error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                    setCurrentlyValidatingElement(null);
                  }
                  if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                    loggedTypeFailures[error$1.message] = true;
                    setCurrentlyValidatingElement(element);
                    error("Failed %s type: %s", location, error$1.message);
                    setCurrentlyValidatingElement(null);
                  }
                }
              }
            }
          }
          function setCurrentlyValidatingElement$1(element) {
            {
              if (element) {
                var owner = element._owner;
                var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
                setExtraStackFrame(stack);
              } else {
                setExtraStackFrame(null);
              }
            }
          }
          var propTypesMisspellWarningShown;
          {
            propTypesMisspellWarningShown = false;
          }
          function getDeclarationErrorAddendum() {
            if (ReactCurrentOwner.current) {
              var name = getComponentNameFromType(ReactCurrentOwner.current.type);
              if (name) {
                return "\n\nCheck the render method of `" + name + "`.";
              }
            }
            return "";
          }
          function getSourceInfoErrorAddendum(source) {
            if (source !== void 0) {
              var fileName = source.fileName.replace(/^.*[\\\/]/, "");
              var lineNumber = source.lineNumber;
              return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
            }
            return "";
          }
          function getSourceInfoErrorAddendumForProps(elementProps) {
            if (elementProps !== null && elementProps !== void 0) {
              return getSourceInfoErrorAddendum(elementProps.__source);
            }
            return "";
          }
          var ownerHasKeyUseWarning = {};
          function getCurrentComponentErrorInfo(parentType) {
            var info = getDeclarationErrorAddendum();
            if (!info) {
              var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
              if (parentName) {
                info = "\n\nCheck the top-level render call using <" + parentName + ">.";
              }
            }
            return info;
          }
          function validateExplicitKey(element, parentType) {
            if (!element._store || element._store.validated || element.key != null) {
              return;
            }
            element._store.validated = true;
            var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
            if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
              return;
            }
            ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
            var childOwner = "";
            if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
              childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
            }
            {
              setCurrentlyValidatingElement$1(element);
              error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
              setCurrentlyValidatingElement$1(null);
            }
          }
          function validateChildKeys(node, parentType) {
            if (typeof node !== "object") {
              return;
            }
            if (isArray(node)) {
              for (var i = 0; i < node.length; i++) {
                var child = node[i];
                if (isValidElement(child)) {
                  validateExplicitKey(child, parentType);
                }
              }
            } else if (isValidElement(node)) {
              if (node._store) {
                node._store.validated = true;
              }
            } else if (node) {
              var iteratorFn = getIteratorFn(node);
              if (typeof iteratorFn === "function") {
                if (iteratorFn !== node.entries) {
                  var iterator = iteratorFn.call(node);
                  var step;
                  while (!(step = iterator.next()).done) {
                    if (isValidElement(step.value)) {
                      validateExplicitKey(step.value, parentType);
                    }
                  }
                }
              }
            }
          }
          function validatePropTypes(element) {
            {
              var type = element.type;
              if (type === null || type === void 0 || typeof type === "string") {
                return;
              }
              var propTypes;
              if (typeof type === "function") {
                propTypes = type.propTypes;
              } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
              // Inner props are checked in the reconciler.
              type.$$typeof === REACT_MEMO_TYPE)) {
                propTypes = type.propTypes;
              } else {
                return;
              }
              if (propTypes) {
                var name = getComponentNameFromType(type);
                checkPropTypes(propTypes, element.props, "prop", name, element);
              } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
                propTypesMisspellWarningShown = true;
                var _name = getComponentNameFromType(type);
                error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
              }
              if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
                error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
              }
            }
          }
          function validateFragmentProps(fragment) {
            {
              var keys = Object.keys(fragment.props);
              for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                if (key !== "children" && key !== "key") {
                  setCurrentlyValidatingElement$1(fragment);
                  error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                  setCurrentlyValidatingElement$1(null);
                  break;
                }
              }
              if (fragment.ref !== null) {
                setCurrentlyValidatingElement$1(fragment);
                error("Invalid attribute `ref` supplied to `React.Fragment`.");
                setCurrentlyValidatingElement$1(null);
              }
            }
          }
          function createElementWithValidation(type, props, children) {
            var validType = isValidElementType(type);
            if (!validType) {
              var info = "";
              if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
                info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
              }
              var sourceInfo = getSourceInfoErrorAddendumForProps(props);
              if (sourceInfo) {
                info += sourceInfo;
              } else {
                info += getDeclarationErrorAddendum();
              }
              var typeString;
              if (type === null) {
                typeString = "null";
              } else if (isArray(type)) {
                typeString = "array";
              } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
                typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
                info = " Did you accidentally export a JSX literal instead of a component?";
              } else {
                typeString = typeof type;
              }
              {
                error("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
              }
            }
            var element = createElement.apply(this, arguments);
            if (element == null) {
              return element;
            }
            if (validType) {
              for (var i = 2; i < arguments.length; i++) {
                validateChildKeys(arguments[i], type);
              }
            }
            if (type === REACT_FRAGMENT_TYPE) {
              validateFragmentProps(element);
            } else {
              validatePropTypes(element);
            }
            return element;
          }
          var didWarnAboutDeprecatedCreateFactory = false;
          function createFactoryWithValidation(type) {
            var validatedFactory = createElementWithValidation.bind(null, type);
            validatedFactory.type = type;
            {
              if (!didWarnAboutDeprecatedCreateFactory) {
                didWarnAboutDeprecatedCreateFactory = true;
                warn("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.");
              }
              Object.defineProperty(validatedFactory, "type", {
                enumerable: false,
                get: function() {
                  warn("Factory.type is deprecated. Access the class directly before passing it to createFactory.");
                  Object.defineProperty(this, "type", {
                    value: type
                  });
                  return type;
                }
              });
            }
            return validatedFactory;
          }
          function cloneElementWithValidation(element, props, children) {
            var newElement = cloneElement.apply(this, arguments);
            for (var i = 2; i < arguments.length; i++) {
              validateChildKeys(arguments[i], newElement.type);
            }
            validatePropTypes(newElement);
            return newElement;
          }
          function startTransition(scope, options) {
            var prevTransition = ReactCurrentBatchConfig.transition;
            ReactCurrentBatchConfig.transition = {};
            var currentTransition = ReactCurrentBatchConfig.transition;
            {
              ReactCurrentBatchConfig.transition._updatedFibers = /* @__PURE__ */ new Set();
            }
            try {
              scope();
            } finally {
              ReactCurrentBatchConfig.transition = prevTransition;
              {
                if (prevTransition === null && currentTransition._updatedFibers) {
                  var updatedFibersCount = currentTransition._updatedFibers.size;
                  if (updatedFibersCount > 10) {
                    warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.");
                  }
                  currentTransition._updatedFibers.clear();
                }
              }
            }
          }
          var didWarnAboutMessageChannel = false;
          var enqueueTaskImpl = null;
          function enqueueTask(task) {
            if (enqueueTaskImpl === null) {
              try {
                var requireString = ("require" + Math.random()).slice(0, 7);
                var nodeRequire = module && module[requireString];
                enqueueTaskImpl = nodeRequire.call(module, "timers").setImmediate;
              } catch (_err) {
                enqueueTaskImpl = function(callback) {
                  {
                    if (didWarnAboutMessageChannel === false) {
                      didWarnAboutMessageChannel = true;
                      if (typeof MessageChannel === "undefined") {
                        error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning.");
                      }
                    }
                  }
                  var channel = new MessageChannel();
                  channel.port1.onmessage = callback;
                  channel.port2.postMessage(void 0);
                };
              }
            }
            return enqueueTaskImpl(task);
          }
          var actScopeDepth = 0;
          var didWarnNoAwaitAct = false;
          function act(callback) {
            {
              var prevActScopeDepth = actScopeDepth;
              actScopeDepth++;
              if (ReactCurrentActQueue.current === null) {
                ReactCurrentActQueue.current = [];
              }
              var prevIsBatchingLegacy = ReactCurrentActQueue.isBatchingLegacy;
              var result;
              try {
                ReactCurrentActQueue.isBatchingLegacy = true;
                result = callback();
                if (!prevIsBatchingLegacy && ReactCurrentActQueue.didScheduleLegacyUpdate) {
                  var queue = ReactCurrentActQueue.current;
                  if (queue !== null) {
                    ReactCurrentActQueue.didScheduleLegacyUpdate = false;
                    flushActQueue(queue);
                  }
                }
              } catch (error2) {
                popActScope(prevActScopeDepth);
                throw error2;
              } finally {
                ReactCurrentActQueue.isBatchingLegacy = prevIsBatchingLegacy;
              }
              if (result !== null && typeof result === "object" && typeof result.then === "function") {
                var thenableResult = result;
                var wasAwaited = false;
                var thenable = {
                  then: function(resolve, reject) {
                    wasAwaited = true;
                    thenableResult.then(function(returnValue2) {
                      popActScope(prevActScopeDepth);
                      if (actScopeDepth === 0) {
                        recursivelyFlushAsyncActWork(returnValue2, resolve, reject);
                      } else {
                        resolve(returnValue2);
                      }
                    }, function(error2) {
                      popActScope(prevActScopeDepth);
                      reject(error2);
                    });
                  }
                };
                {
                  if (!didWarnNoAwaitAct && typeof Promise !== "undefined") {
                    Promise.resolve().then(function() {
                    }).then(function() {
                      if (!wasAwaited) {
                        didWarnNoAwaitAct = true;
                        error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);");
                      }
                    });
                  }
                }
                return thenable;
              } else {
                var returnValue = result;
                popActScope(prevActScopeDepth);
                if (actScopeDepth === 0) {
                  var _queue = ReactCurrentActQueue.current;
                  if (_queue !== null) {
                    flushActQueue(_queue);
                    ReactCurrentActQueue.current = null;
                  }
                  var _thenable = {
                    then: function(resolve, reject) {
                      if (ReactCurrentActQueue.current === null) {
                        ReactCurrentActQueue.current = [];
                        recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                      } else {
                        resolve(returnValue);
                      }
                    }
                  };
                  return _thenable;
                } else {
                  var _thenable2 = {
                    then: function(resolve, reject) {
                      resolve(returnValue);
                    }
                  };
                  return _thenable2;
                }
              }
            }
          }
          function popActScope(prevActScopeDepth) {
            {
              if (prevActScopeDepth !== actScopeDepth - 1) {
                error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ");
              }
              actScopeDepth = prevActScopeDepth;
            }
          }
          function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
            {
              var queue = ReactCurrentActQueue.current;
              if (queue !== null) {
                try {
                  flushActQueue(queue);
                  enqueueTask(function() {
                    if (queue.length === 0) {
                      ReactCurrentActQueue.current = null;
                      resolve(returnValue);
                    } else {
                      recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                    }
                  });
                } catch (error2) {
                  reject(error2);
                }
              } else {
                resolve(returnValue);
              }
            }
          }
          var isFlushing = false;
          function flushActQueue(queue) {
            {
              if (!isFlushing) {
                isFlushing = true;
                var i = 0;
                try {
                  for (; i < queue.length; i++) {
                    var callback = queue[i];
                    do {
                      callback = callback(true);
                    } while (callback !== null);
                  }
                  queue.length = 0;
                } catch (error2) {
                  queue = queue.slice(i + 1);
                  throw error2;
                } finally {
                  isFlushing = false;
                }
              }
            }
          }
          var createElement$1 = createElementWithValidation;
          var cloneElement$1 = cloneElementWithValidation;
          var createFactory = createFactoryWithValidation;
          var Children = {
            map: mapChildren,
            forEach: forEachChildren,
            count: countChildren,
            toArray,
            only: onlyChild
          };
          exports.Children = Children;
          exports.Component = Component;
          exports.Fragment = REACT_FRAGMENT_TYPE;
          exports.Profiler = REACT_PROFILER_TYPE;
          exports.PureComponent = PureComponent;
          exports.StrictMode = REACT_STRICT_MODE_TYPE;
          exports.Suspense = REACT_SUSPENSE_TYPE;
          exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
          exports.cloneElement = cloneElement$1;
          exports.createContext = createContext;
          exports.createElement = createElement$1;
          exports.createFactory = createFactory;
          exports.createRef = createRef;
          exports.forwardRef = forwardRef;
          exports.isValidElement = isValidElement;
          exports.lazy = lazy;
          exports.memo = memo;
          exports.startTransition = startTransition;
          exports.unstable_act = act;
          exports.useCallback = useCallback;
          exports.useContext = useContext;
          exports.useDebugValue = useDebugValue;
          exports.useDeferredValue = useDeferredValue;
          exports.useEffect = useEffect;
          exports.useId = useId;
          exports.useImperativeHandle = useImperativeHandle;
          exports.useInsertionEffect = useInsertionEffect;
          exports.useLayoutEffect = useLayoutEffect;
          exports.useMemo = useMemo;
          exports.useReducer = useReducer;
          exports.useRef = useRef;
          exports.useState = useState;
          exports.useSyncExternalStore = useSyncExternalStore;
          exports.useTransition = useTransition;
          exports.version = ReactVersion;
          if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
          }
        })();
      }
    }
  });

  // node_modules/react/index.js
  var require_react = __commonJS({
    "node_modules/react/index.js"(exports, module) {
      "use strict";
      if (false) {
        module.exports = null;
      } else {
        module.exports = require_react_development();
      }
    }
  });

  // src/jsx/ui.jsx
  var import_react5 = __toESM(require_react());

  // src/jsx/example.jsx
  var import_react = __toESM(require_react());
  var Example = ({ react, setupController }) => {
    const [dropdownSelection, setDropdownSelection] = react.useState("");
    const maskIcons = [
      "advisor",
      "angle",
      "arrow-circular",
      "arrow-left",
      "arrow-right",
      "check",
      "circle",
      "clear",
      "close",
      "copy",
      "credits",
      "dev-point",
      "dice",
      "education",
      "eye-closed",
      "eye",
      "solid-arrow-left",
      "solid-arrow-right",
      "gdk-cloud",
      "gear",
      "solid-heart",
      "heart",
      "info",
      "length",
      "lock",
      "money",
      "on-off",
      "pdx-cloud",
      "pen",
      "plus",
      "progress",
      "residence",
      "save",
      "school",
      "pause",
      "play",
      "speed1",
      "speed2",
      "speed3",
      "slope",
      "solid-star",
      "star",
      "steam-cloud",
      "stroke-arrow-down",
      "stroke-arrow-up",
      "student",
      "thick-stroke-arrow-down",
      "thick-stroke-arrow-left",
      "thick-stroke-arrow-right",
      "thick-stroke-arrow-up",
      "trash",
      "trend-down",
      "trend-down-high",
      "trend-down-med",
      "trend-up",
      "trend-up-high",
      "trend-up-med",
      "triangle-arrow-left",
      "view-info",
      "warning",
      "wide-arrow-down",
      "wide-arrow-up",
      "workplace"
    ];
    const faBrands = [
      "square-reddit",
      "square-instagram",
      "github-alt",
      "linkedin-in",
      "steam",
      "square-twitter",
      "square-youtube",
      "wikipedia-w",
      "skype",
      "reddit",
      "discord",
      "square-steam",
      "square-github",
      "paypal",
      "reddit-alien",
      "patreon",
      "facebook-f",
      "soundcloud",
      "facebook-messenger",
      "x-twitter",
      "tiktok",
      "square-facebook",
      "linkedin",
      "twitch",
      "instagram",
      "facebook",
      "pinterest-p",
      "deviantart",
      "square-tumblr",
      "github",
      "youtube",
      "twitter",
      "pinterest",
      "tumblr",
      "square-x-twitter",
      "teamspeak",
      "steam-symbol"
    ];
    const faRegIcons = [
      "trash-can",
      "message",
      "file-lines",
      "calendar-days",
      "hand-point-right",
      "face-smile-beam",
      "face-grin-stars",
      "address-book",
      "comments",
      "paste",
      "face-grin-tongue-squint",
      "face-flushed",
      "square-caret-right",
      "square-minus",
      "compass",
      "square-caret-down",
      "face-kiss-beam",
      "lightbulb",
      "flag",
      "square-check",
      "circle-dot",
      "face-dizzy",
      "futbol",
      "pen-to-square",
      "hourglass-half",
      "eye-slash",
      "hand",
      "hand-spock",
      "face-kiss",
      "face-grin-tongue",
      "chess-bishop",
      "face-grin-wink",
      "face-grin-wide",
      "face-frown-open",
      "hand-point-up",
      "bookmark",
      "hand-point-down",
      "folder",
      "user",
      "square-caret-left",
      "star",
      "chess-knight",
      "face-laugh-squint",
      "face-laugh",
      "folder-open",
      "clipboard",
      "chess-queen",
      "hand-back-fist",
      "square-caret-up",
      "chart-bar",
      "window-restore",
      "square-plus",
      "image",
      "folder-closed",
      "lemon",
      "handshake",
      "gem",
      "circle-play",
      "circle-check",
      "circle-stop",
      "id-badge",
      "face-laugh-beam",
      "registered",
      "address-card",
      "face-tired",
      "face-smile-wink",
      "file-word",
      "file-powerpoint",
      "envelope-open",
      "file-zipper",
      "square",
      "snowflake",
      "newspaper",
      "face-kiss-wink-heart",
      "star-half-stroke",
      "file-excel",
      "face-grin-beam",
      "object-ungroup",
      "circle-right",
      "face-rolling-eyes",
      "object-group",
      "heart",
      "face-surprise",
      "circle-pause",
      "circle",
      "circle-up",
      "file-audio",
      "file-image",
      "circle-question",
      "face-meh-blank",
      "eye",
      "face-sad-cry",
      "file-code",
      "window-maximize",
      "face-frown",
      "floppy-disk",
      "comment-dots",
      "face-grin-squint",
      "hand-pointer",
      "hand-scissors",
      "face-grin-tears",
      "calendar-xmark",
      "file-video",
      "file-pdf",
      "comment",
      "envelope",
      "hourglass",
      "calendar-check",
      "hard-drive",
      "face-grin-squint-tears",
      "rectangle-list",
      "calendar-plus",
      "circle-left",
      "money-bill-1",
      "clock",
      "keyboard",
      "closed-captioning",
      "images",
      "face-grin",
      "face-meh",
      "id-card",
      "sun",
      "face-laugh-wink",
      "circle-down",
      "thumbs-down",
      "chess-pawn",
      "credit-card",
      "bell",
      "file",
      "hospital",
      "chess-rook",
      "star-half",
      "chess-king",
      "circle-user",
      "copy",
      "share-from-square",
      "copyright",
      "map",
      "bell-slash",
      "hand-lizard",
      "face-smile",
      "hand-peace",
      "face-grin-hearts",
      "building",
      "face-grin-beam-sweat",
      "moon",
      "calendar",
      "face-grin-tongue-wink",
      "clone",
      "face-angry",
      "rectangle-xmark",
      "paper-plane",
      "life-ring",
      "face-grimace",
      "calendar-minus",
      "circle-xmark",
      "thumbs-up",
      "window-minimize",
      "square-full",
      "note-sticky",
      "face-sad-tear",
      "hand-point-left"
    ];
    const faSolidIcons = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "fill-drip",
      "arrows-to-circle",
      "circle-chevron-right",
      "at",
      "trash-can",
      "text-height",
      "user-xmark",
      "stethoscope",
      "message",
      "info",
      "down-left-and-up-right-to-center",
      "explosion",
      "file-lines",
      "wave-square",
      "ring",
      "building-un",
      "dice-three",
      "calendar-days",
      "anchor-circle-check",
      "building-circle-arrow-right",
      "volleyball",
      "arrows-up-to-line",
      "sort-down",
      "circle-minus",
      "door-open",
      "right-from-bracket",
      "atom",
      "soap",
      "icons",
      "microphone-lines-slash",
      "bridge-circle-check",
      "pump-medical",
      "fingerprint",
      "hand-point-right",
      "magnifying-glass-location",
      "forward-step",
      "face-smile-beam",
      "flag-checkered",
      "football",
      "school-circle-exclamation",
      "crop",
      "angles-down",
      "users-rectangle",
      "people-roof",
      "people-line",
      "beer-mug-empty",
      "diagram-predecessor",
      "arrow-up-long",
      "fire-flame-simple",
      "person",
      "laptop",
      "file-csv",
      "menorah",
      "truck-plane",
      "record-vinyl",
      "face-grin-stars",
      "bong",
      "spaghetti-monster-flying",
      "arrow-down-up-across-line",
      "spoon",
      "jar-wheat",
      "envelopes-bulk",
      "file-circle-exclamation",
      "circle-h",
      "pager",
      "address-book",
      "strikethrough",
      "k",
      "landmark-flag",
      "pencil",
      "backward",
      "caret-right",
      "comments",
      "paste",
      "code-pull-request",
      "clipboard-list",
      "truck-ramp-box",
      "user-check",
      "vial-virus",
      "sheet-plastic",
      "blog",
      "user-ninja",
      "person-arrow-up-from-line",
      "scroll-torah",
      "broom-ball",
      "toggle-off",
      "box-archive",
      "person-drowning",
      "arrow-down-9-1",
      "face-grin-tongue-squint",
      "spray-can",
      "truck-monster",
      "w",
      "earth-africa",
      "rainbow",
      "circle-notch",
      "tablet-screen-button",
      "paw",
      "cloud",
      "trowel-bricks",
      "face-flushed",
      "hospital-user",
      "tent-arrow-left-right",
      "gavel",
      "binoculars",
      "microphone-slash",
      "box-tissue",
      "motorcycle",
      "bell-concierge",
      "pen-ruler",
      "people-arrows",
      "mars-and-venus-burst",
      "square-caret-right",
      "scissors",
      "sun-plant-wilt",
      "toilets-portable",
      "hockey-puck",
      "table",
      "magnifying-glass-arrow-right",
      "tachograph-digital",
      "users-slash",
      "clover",
      "reply",
      "star-and-crescent",
      "house-fire",
      "square-minus",
      "helicopter",
      "compass",
      "square-caret-down",
      "file-circle-question",
      "laptop-code",
      "swatchbook",
      "prescription-bottle",
      "bars",
      "people-group",
      "hourglass-end",
      "heart-crack",
      "square-up-right",
      "face-kiss-beam",
      "film",
      "ruler-horizontal",
      "people-robbery",
      "lightbulb",
      "caret-left",
      "circle-exclamation",
      "school-circle-xmark",
      "arrow-right-from-bracket",
      "circle-chevron-down",
      "unlock-keyhole",
      "cloud-showers-heavy",
      "headphones-simple",
      "sitemap",
      "circle-dollar-to-slot",
      "memory",
      "road-spikes",
      "fire-burner",
      "flag",
      "hanukiah",
      "feather",
      "volume-low",
      "comment-slash",
      "cloud-sun-rain",
      "compress",
      "wheat-awn",
      "ankh",
      "hands-holding-child",
      "asterisk",
      "square-check",
      "peseta-sign",
      "heading",
      "ghost",
      "list",
      "square-phone-flip",
      "cart-plus",
      "gamepad",
      "circle-dot",
      "face-dizzy",
      "egg",
      "house-medical-circle-xmark",
      "campground",
      "folder-plus",
      "futbol",
      "paintbrush",
      "lock",
      "gas-pump",
      "hot-tub-person",
      "map-location",
      "house-flood-water",
      "tree",
      "bridge-lock",
      "sack-dollar",
      "pen-to-square",
      "car-side",
      "share-nodes",
      "heart-circle-minus",
      "hourglass-half",
      "microscope",
      "sink",
      "bag-shopping",
      "arrow-down-z-a",
      "mitten",
      "person-rays",
      "users",
      "eye-slash",
      "flask-vial",
      "hand",
      "om",
      "worm",
      "house-circle-xmark",
      "plug",
      "chevron-up",
      "hand-spock",
      "stopwatch",
      "face-kiss",
      "bridge-circle-xmark",
      "face-grin-tongue",
      "chess-bishop",
      "face-grin-wink",
      "ear-deaf",
      "road-circle-check",
      "dice-five",
      "square-rss",
      "land-mine-on",
      "i-cursor",
      "stamp",
      "stairs",
      "i",
      "hryvnia-sign",
      "pills",
      "face-grin-wide",
      "tooth",
      "v",
      "bangladeshi-taka-sign",
      "bicycle",
      "staff-snake",
      "head-side-cough-slash",
      "truck-medical",
      "wheat-awn-circle-exclamation",
      "snowman",
      "mortar-pestle",
      "road-barrier",
      "school",
      "igloo",
      "joint",
      "angle-right",
      "horse",
      "q",
      "g",
      "notes-medical",
      "temperature-half",
      "dong-sign",
      "capsules",
      "poo-storm",
      "face-frown-open",
      "hand-point-up",
      "money-bill",
      "bookmark",
      "align-justify",
      "umbrella-beach",
      "helmet-un",
      "bullseye",
      "bacon",
      "hand-point-down",
      "arrow-up-from-bracket",
      "folder",
      "file-waveform",
      "radiation",
      "chart-simple",
      "mars-stroke",
      "vial",
      "gauge",
      "wand-magic-sparkles",
      "e",
      "pen-clip",
      "bridge-circle-exclamation",
      "user",
      "school-circle-check",
      "dumpster",
      "van-shuttle",
      "building-user",
      "square-caret-left",
      "highlighter",
      "key",
      "bullhorn",
      "globe",
      "synagogue",
      "person-half-dress",
      "road-bridge",
      "location-arrow",
      "c",
      "tablet-button",
      "building-lock",
      "pizza-slice",
      "money-bill-wave",
      "chart-area",
      "house-flag",
      "person-circle-minus",
      "ban",
      "camera-rotate",
      "spray-can-sparkles",
      "star",
      "repeat",
      "cross",
      "box",
      "venus-mars",
      "arrow-pointer",
      "maximize",
      "charging-station",
      "shapes",
      "shuffle",
      "person-running",
      "mobile-retro",
      "grip-lines-vertical",
      "spider",
      "hands-bound",
      "file-invoice-dollar",
      "plane-circle-exclamation",
      "x-ray",
      "spell-check",
      "slash",
      "computer-mouse",
      "arrow-right-to-bracket",
      "shop-slash",
      "server",
      "virus-covid-slash",
      "shop-lock",
      "hourglass-start",
      "blender-phone",
      "building-wheat",
      "person-breastfeeding",
      "right-to-bracket",
      "venus",
      "passport",
      "heart-pulse",
      "people-carry-box",
      "temperature-high",
      "microchip",
      "crown",
      "weight-hanging",
      "xmarks-lines",
      "file-prescription",
      "weight-scale",
      "user-group",
      "arrow-up-a-z",
      "chess-knight",
      "face-laugh-squint",
      "wheelchair",
      "circle-arrow-up",
      "toggle-on",
      "person-walking",
      "l",
      "fire",
      "bed-pulse",
      "shuttle-space",
      "face-laugh",
      "folder-open",
      "heart-circle-plus",
      "code-fork",
      "city",
      "microphone-lines",
      "pepper-hot",
      "unlock",
      "colon-sign",
      "headset",
      "store-slash",
      "road-circle-xmark",
      "user-minus",
      "mars-stroke-up",
      "champagne-glasses",
      "clipboard",
      "house-circle-exclamation",
      "file-arrow-up",
      "wifi",
      "bath",
      "underline",
      "user-pen",
      "signature",
      "stroopwafel",
      "bold",
      "anchor-lock",
      "building-ngo",
      "manat-sign",
      "not-equal",
      "border-top-left",
      "map-location-dot",
      "jedi",
      "square-poll-vertical",
      "mug-hot",
      "car-battery",
      "gift",
      "dice-two",
      "chess-queen",
      "glasses",
      "chess-board",
      "building-circle-check",
      "person-chalkboard",
      "mars-stroke-right",
      "hand-back-fist",
      "square-caret-up",
      "cloud-showers-water",
      "chart-bar",
      "hands-bubbles",
      "less-than-equal",
      "train",
      "eye-low-vision",
      "crow",
      "sailboat",
      "window-restore",
      "square-plus",
      "torii-gate",
      "frog",
      "bucket",
      "image",
      "microphone",
      "cow",
      "caret-up",
      "screwdriver",
      "folder-closed",
      "house-tsunami",
      "square-nfi",
      "arrow-up-from-ground-water",
      "martini-glass",
      "rotate-left",
      "table-columns",
      "lemon",
      "head-side-mask",
      "handshake",
      "gem",
      "dolly",
      "smoking",
      "minimize",
      "monument",
      "snowplow",
      "angles-right",
      "cannabis",
      "circle-play",
      "tablets",
      "ethernet",
      "euro-sign",
      "chair",
      "circle-check",
      "circle-stop",
      "compass-drafting",
      "plate-wheat",
      "icicles",
      "person-shelter",
      "neuter",
      "id-badge",
      "marker",
      "face-laugh-beam",
      "helicopter-symbol",
      "universal-access",
      "circle-chevron-up",
      "lari-sign",
      "volcano",
      "person-walking-dashed-line-arrow-right",
      "sterling-sign",
      "viruses",
      "square-person-confined",
      "user-tie",
      "arrow-down-long",
      "tent-arrow-down-to-line",
      "certificate",
      "reply-all",
      "suitcase",
      "person-skating",
      "filter-circle-dollar",
      "camera-retro",
      "circle-arrow-down",
      "file-import",
      "square-arrow-up-right",
      "box-open",
      "scroll",
      "spa",
      "location-pin-lock",
      "pause",
      "hill-avalanche",
      "temperature-empty",
      "bomb",
      "registered",
      "address-card",
      "scale-unbalanced-flip",
      "subscript",
      "diamond-turn-right",
      "burst",
      "house-laptop",
      "face-tired",
      "money-bills",
      "smog",
      "crutch",
      "cloud-arrow-up",
      "palette",
      "arrows-turn-right",
      "vest",
      "ferry",
      "arrows-down-to-people",
      "seedling",
      "left-right",
      "boxes-packing",
      "circle-arrow-left",
      "group-arrows-rotate",
      "bowl-food",
      "candy-cane",
      "arrow-down-wide-short",
      "cloud-bolt",
      "text-slash",
      "face-smile-wink",
      "file-word",
      "file-powerpoint",
      "arrows-left-right",
      "house-lock",
      "cloud-arrow-down",
      "children",
      "chalkboard",
      "user-large-slash",
      "envelope-open",
      "handshake-simple-slash",
      "mattress-pillow",
      "guarani-sign",
      "arrows-rotate",
      "fire-extinguisher",
      "cruzeiro-sign",
      "greater-than-equal",
      "shield-halved",
      "book-atlas",
      "virus",
      "envelope-circle-check",
      "layer-group",
      "arrows-to-dot",
      "archway",
      "heart-circle-check",
      "house-chimney-crack",
      "file-zipper",
      "square",
      "martini-glass-empty",
      "couch",
      "cedi-sign",
      "italic",
      "church",
      "comments-dollar",
      "democrat",
      "z",
      "person-skiing",
      "road-lock",
      "a",
      "temperature-arrow-down",
      "feather-pointed",
      "p",
      "snowflake",
      "newspaper",
      "rectangle-ad",
      "circle-arrow-right",
      "filter-circle-xmark",
      "locust",
      "sort",
      "list-ol",
      "person-dress-burst",
      "money-check-dollar",
      "vector-square",
      "bread-slice",
      "language",
      "face-kiss-wink-heart",
      "filter",
      "question",
      "file-signature",
      "up-down-left-right",
      "house-chimney-user",
      "hand-holding-heart",
      "puzzle-piece",
      "money-check",
      "star-half-stroke",
      "code",
      "whiskey-glass",
      "building-circle-exclamation",
      "magnifying-glass-chart",
      "arrow-up-right-from-square",
      "cubes-stacked",
      "won-sign",
      "virus-covid",
      "austral-sign",
      "f",
      "leaf",
      "road",
      "taxi",
      "person-circle-plus",
      "chart-pie",
      "bolt-lightning",
      "sack-xmark",
      "file-excel",
      "file-contract",
      "fish-fins",
      "building-flag",
      "face-grin-beam",
      "object-ungroup",
      "poop",
      "location-pin",
      "kaaba",
      "toilet-paper",
      "helmet-safety",
      "eject",
      "circle-right",
      "plane-circle-check",
      "face-rolling-eyes",
      "object-group",
      "chart-line",
      "mask-ventilator",
      "arrow-right",
      "signs-post",
      "cash-register",
      "person-circle-question",
      "h",
      "tarp",
      "screwdriver-wrench",
      "arrows-to-eye",
      "plug-circle-bolt",
      "heart",
      "mars-and-venus",
      "house-user",
      "dumpster-fire",
      "house-crack",
      "martini-glass-citrus",
      "face-surprise",
      "bottle-water",
      "circle-pause",
      "toilet-paper-slash",
      "apple-whole",
      "kitchen-set",
      "r",
      "temperature-quarter",
      "cube",
      "bitcoin-sign",
      "shield-dog",
      "solar-panel",
      "lock-open",
      "elevator",
      "money-bill-transfer",
      "money-bill-trend-up",
      "house-flood-water-circle-arrow-right",
      "square-poll-horizontal",
      "circle",
      "backward-fast",
      "recycle",
      "user-astronaut",
      "plane-slash",
      "trademark",
      "basketball",
      "satellite-dish",
      "circle-up",
      "mobile-screen-button",
      "volume-high",
      "users-rays",
      "wallet",
      "clipboard-check",
      "file-audio",
      "burger",
      "wrench",
      "bugs",
      "rupee-sign",
      "file-image",
      "circle-question",
      "plane-departure",
      "handshake-slash",
      "book-bookmark",
      "code-branch",
      "hat-cowboy",
      "bridge",
      "phone-flip",
      "truck-front",
      "cat",
      "anchor-circle-exclamation",
      "truck-field",
      "route",
      "clipboard-question",
      "panorama",
      "comment-medical",
      "teeth-open",
      "file-circle-minus",
      "tags",
      "wine-glass",
      "forward-fast",
      "face-meh-blank",
      "square-parking",
      "house-signal",
      "bars-progress",
      "faucet-drip",
      "cart-flatbed",
      "ban-smoking",
      "terminal",
      "mobile-button",
      "house-medical-flag",
      "basket-shopping",
      "tape",
      "bus-simple",
      "eye",
      "face-sad-cry",
      "audio-description",
      "person-military-to-person",
      "file-shield",
      "user-slash",
      "pen",
      "tower-observation",
      "file-code",
      "signal",
      "bus",
      "heart-circle-xmark",
      "house-chimney",
      "window-maximize",
      "face-frown",
      "prescription",
      "shop",
      "floppy-disk",
      "vihara",
      "scale-unbalanced",
      "sort-up",
      "comment-dots",
      "plant-wilt",
      "diamond",
      "face-grin-squint",
      "hand-holding-dollar",
      "bacterium",
      "hand-pointer",
      "drum-steelpan",
      "hand-scissors",
      "hands-praying",
      "arrow-rotate-right",
      "biohazard",
      "location-crosshairs",
      "mars-double",
      "child-dress",
      "users-between-lines",
      "lungs-virus",
      "face-grin-tears",
      "phone",
      "calendar-xmark",
      "child-reaching",
      "head-side-virus",
      "user-gear",
      "arrow-up-1-9",
      "door-closed",
      "shield-virus",
      "dice-six",
      "mosquito-net",
      "bridge-water",
      "person-booth",
      "text-width",
      "hat-wizard",
      "pen-fancy",
      "person-digging",
      "trash",
      "gauge-simple",
      "book-medical",
      "poo",
      "quote-right",
      "shirt",
      "cubes",
      "divide",
      "tenge-sign",
      "headphones",
      "hands-holding",
      "hands-clapping",
      "republican",
      "arrow-left",
      "person-circle-xmark",
      "ruler",
      "align-left",
      "dice-d6",
      "restroom",
      "j",
      "users-viewfinder",
      "file-video",
      "up-right-from-square",
      "table-cells",
      "file-pdf",
      "book-bible",
      "o",
      "suitcase-medical",
      "user-secret",
      "otter",
      "person-dress",
      "comment-dollar",
      "business-time",
      "table-cells-large",
      "book-tanakh",
      "phone-volume",
      "hat-cowboy-side",
      "clipboard-user",
      "child",
      "lira-sign",
      "satellite",
      "plane-lock",
      "tag",
      "comment",
      "cake-candles",
      "envelope",
      "angles-up",
      "paperclip",
      "arrow-right-to-city",
      "ribbon",
      "lungs",
      "arrow-up-9-1",
      "litecoin-sign",
      "border-none",
      "circle-nodes",
      "parachute-box",
      "indent",
      "truck-field-un",
      "hourglass",
      "mountain",
      "user-doctor",
      "circle-info",
      "cloud-meatball",
      "camera",
      "square-virus",
      "meteor",
      "car-on",
      "sleigh",
      "arrow-down-1-9",
      "hand-holding-droplet",
      "water",
      "calendar-check",
      "braille",
      "prescription-bottle-medical",
      "landmark",
      "truck",
      "crosshairs",
      "person-cane",
      "tent",
      "vest-patches",
      "check-double",
      "arrow-down-a-z",
      "money-bill-wheat",
      "cookie",
      "arrow-rotate-left",
      "hard-drive",
      "face-grin-squint-tears",
      "dumbbell",
      "rectangle-list",
      "tarp-droplet",
      "house-medical-circle-check",
      "person-skiing-nordic",
      "calendar-plus",
      "plane-arrival",
      "circle-left",
      "train-subway",
      "chart-gantt",
      "indian-rupee-sign",
      "crop-simple",
      "money-bill-1",
      "left-long",
      "dna",
      "virus-slash",
      "minus",
      "chess",
      "arrow-left-long",
      "plug-circle-check",
      "street-view",
      "franc-sign",
      "volume-off",
      "hands-asl-interpreting",
      "gear",
      "droplet-slash",
      "mosque",
      "mosquito",
      "star-of-david",
      "person-military-rifle",
      "cart-shopping",
      "vials",
      "plug-circle-plus",
      "place-of-worship",
      "grip-vertical",
      "arrow-turn-up",
      "u",
      "square-root-variable",
      "clock",
      "backward-step",
      "pallet",
      "faucet",
      "baseball-bat-ball",
      "s",
      "timeline",
      "keyboard",
      "caret-down",
      "house-chimney-medical",
      "temperature-three-quarters",
      "mobile-screen",
      "plane-up",
      "piggy-bank",
      "battery-half",
      "mountain-city",
      "coins",
      "khanda",
      "sliders",
      "folder-tree",
      "network-wired",
      "map-pin",
      "hamsa",
      "cent-sign",
      "flask",
      "person-pregnant",
      "wand-sparkles",
      "ellipsis-vertical",
      "ticket",
      "power-off",
      "right-long",
      "flag-usa",
      "laptop-file",
      "tty",
      "diagram-next",
      "person-rifle",
      "house-medical-circle-exclamation",
      "closed-captioning",
      "person-hiking",
      "venus-double",
      "images",
      "calculator",
      "people-pulling",
      "n",
      "cable-car",
      "cloud-rain",
      "building-circle-xmark",
      "ship",
      "arrows-down-to-line",
      "download",
      "face-grin",
      "delete-left",
      "eye-dropper",
      "file-circle-check",
      "forward",
      "mobile",
      "face-meh",
      "align-center",
      "book-skull",
      "id-card",
      "outdent",
      "heart-circle-exclamation",
      "house",
      "calendar-week",
      "laptop-medical",
      "b",
      "file-medical",
      "dice-one",
      "kiwi-bird",
      "arrow-right-arrow-left",
      "rotate-right",
      "utensils",
      "arrow-up-wide-short",
      "mill-sign",
      "bowl-rice",
      "skull",
      "tower-broadcast",
      "truck-pickup",
      "up-long",
      "stop",
      "code-merge",
      "upload",
      "hurricane",
      "mound",
      "toilet-portable",
      "compact-disc",
      "file-arrow-down",
      "caravan",
      "shield-cat",
      "bolt",
      "glass-water",
      "oil-well",
      "vault",
      "mars",
      "toilet",
      "plane-circle-xmark",
      "yen-sign",
      "ruble-sign",
      "sun",
      "guitar",
      "face-laugh-wink",
      "horse-head",
      "bore-hole",
      "industry",
      "circle-down",
      "arrows-turn-to-dots",
      "florin-sign",
      "arrow-down-short-wide",
      "less-than",
      "angle-down",
      "car-tunnel",
      "head-side-cough",
      "grip-lines",
      "thumbs-down",
      "user-lock",
      "arrow-right-long",
      "anchor-circle-xmark",
      "ellipsis",
      "chess-pawn",
      "kit-medical",
      "person-through-window",
      "toolbox",
      "hands-holding-circle",
      "bug",
      "credit-card",
      "car",
      "hand-holding-hand",
      "book-open-reader",
      "mountain-sun",
      "arrows-left-right-to-line",
      "dice-d20",
      "truck-droplet",
      "file-circle-xmark",
      "temperature-arrow-up",
      "medal",
      "bed",
      "square-h",
      "podcast",
      "temperature-full",
      "bell",
      "superscript",
      "plug-circle-xmark",
      "star-of-life",
      "phone-slash",
      "paint-roller",
      "handshake-angle",
      "location-dot",
      "file",
      "greater-than",
      "person-swimming",
      "arrow-down",
      "droplet",
      "eraser",
      "earth-americas",
      "person-burst",
      "dove",
      "battery-empty",
      "socks",
      "inbox",
      "section",
      "gauge-high",
      "envelope-open-text",
      "hospital",
      "wine-bottle",
      "chess-rook",
      "bars-staggered",
      "dharmachakra",
      "hotdog",
      "person-walking-with-cane",
      "drum",
      "ice-cream",
      "heart-circle-bolt",
      "fax",
      "paragraph",
      "check-to-slot",
      "star-half",
      "boxes-stacked",
      "link",
      "ear-listen",
      "tree-city",
      "play",
      "font",
      "rupiah-sign",
      "magnifying-glass",
      "table-tennis-paddle-ball",
      "person-dots-from-line",
      "trash-can-arrow-up",
      "naira-sign",
      "cart-arrow-down",
      "walkie-talkie",
      "file-pen",
      "receipt",
      "square-pen",
      "suitcase-rolling",
      "person-circle-exclamation",
      "chevron-down",
      "battery-full",
      "skull-crossbones",
      "code-compare",
      "list-ul",
      "school-lock",
      "tower-cell",
      "down-long",
      "ranking-star",
      "chess-king",
      "person-harassing",
      "brazilian-real-sign",
      "landmark-dome",
      "arrow-up",
      "tv",
      "shrimp",
      "list-check",
      "jug-detergent",
      "circle-user",
      "user-shield",
      "wind",
      "car-burst",
      "y",
      "person-snowboarding",
      "truck-fast",
      "fish",
      "user-graduate",
      "circle-half-stroke",
      "clapperboard",
      "circle-radiation",
      "baseball",
      "jet-fighter-up",
      "diagram-project",
      "copy",
      "volume-xmark",
      "hand-sparkles",
      "grip",
      "share-from-square",
      "child-combatant",
      "gun",
      "square-phone",
      "plus",
      "expand",
      "computer",
      "xmark",
      "arrows-up-down-left-right",
      "chalkboard-user",
      "peso-sign",
      "building-shield",
      "baby",
      "users-line",
      "quote-left",
      "tractor",
      "trash-arrow-up",
      "arrow-down-up-lock",
      "lines-leaning",
      "ruler-combined",
      "copyright",
      "equals",
      "blender",
      "teeth",
      "shekel-sign",
      "map",
      "rocket",
      "photo-film",
      "folder-minus",
      "store",
      "arrow-trend-up",
      "plug-circle-minus",
      "sign-hanging",
      "bezier-curve",
      "bell-slash",
      "tablet",
      "school-flag",
      "fill",
      "angle-up",
      "drumstick-bite",
      "holly-berry",
      "chevron-left",
      "bacteria",
      "hand-lizard",
      "notdef",
      "disease",
      "briefcase-medical",
      "genderless",
      "chevron-right",
      "retweet",
      "car-rear",
      "pump-soap",
      "video-slash",
      "battery-quarter",
      "radio",
      "baby-carriage",
      "traffic-light",
      "thermometer",
      "vr-cardboard",
      "hand-middle-finger",
      "percent",
      "truck-moving",
      "glass-water-droplet",
      "display",
      "face-smile",
      "thumbtack",
      "trophy",
      "person-praying",
      "hammer",
      "hand-peace",
      "rotate",
      "spinner",
      "robot",
      "peace",
      "gears",
      "warehouse",
      "arrow-up-right-dots",
      "splotch",
      "face-grin-hearts",
      "dice-four",
      "sim-card",
      "transgender",
      "mercury",
      "arrow-turn-down",
      "person-falling-burst",
      "award",
      "ticket-simple",
      "building",
      "angles-left",
      "qrcode",
      "clock-rotate-left",
      "face-grin-beam-sweat",
      "file-export",
      "shield",
      "arrow-up-short-wide",
      "house-medical",
      "golf-ball-tee",
      "circle-chevron-left",
      "house-chimney-window",
      "pen-nib",
      "tent-arrow-turn-left",
      "tents",
      "wand-magic",
      "dog",
      "carrot",
      "moon",
      "wine-glass-empty",
      "cheese",
      "yin-yang",
      "music",
      "code-commit",
      "temperature-low",
      "person-biking",
      "broom",
      "shield-heart",
      "gopuram",
      "earth-oceania",
      "square-xmark",
      "hashtag",
      "up-right-and-down-left-from-center",
      "oil-can",
      "t",
      "hippo",
      "chart-column",
      "infinity",
      "vial-circle-check",
      "person-arrow-down-to-line",
      "voicemail",
      "fan",
      "person-walking-luggage",
      "up-down",
      "cloud-moon-rain",
      "calendar",
      "trailer",
      "bahai",
      "sd-card",
      "dragon",
      "shoe-prints",
      "circle-plus",
      "face-grin-tongue-wink",
      "hand-holding",
      "plug-circle-exclamation",
      "link-slash",
      "clone",
      "person-walking-arrow-loop-left",
      "arrow-up-z-a",
      "fire-flame-curved",
      "tornado",
      "file-circle-plus",
      "book-quran",
      "anchor",
      "border-all",
      "face-angry",
      "cookie-bite",
      "arrow-trend-down",
      "rss",
      "draw-polygon",
      "scale-balanced",
      "gauge-simple-high",
      "shower",
      "desktop",
      "m",
      "table-list",
      "comment-sms",
      "book",
      "user-plus",
      "check",
      "battery-three-quarters",
      "house-circle-check",
      "angle-left",
      "diagram-successor",
      "truck-arrow-right",
      "arrows-split-up-and-left",
      "hand-fist",
      "cloud-moon",
      "briefcase",
      "person-falling",
      "image-portrait",
      "user-tag",
      "rug",
      "earth-europe",
      "cart-flatbed-suitcase",
      "rectangle-xmark",
      "baht-sign",
      "book-open",
      "book-journal-whills",
      "handcuffs",
      "triangle-exclamation",
      "database",
      "share",
      "bottle-droplet",
      "mask-face",
      "hill-rockslide",
      "right-left",
      "paper-plane",
      "road-circle-exclamation",
      "dungeon",
      "align-right",
      "money-bill-1-wave",
      "life-ring",
      "hands",
      "calendar-day",
      "water-ladder",
      "arrows-up-down",
      "face-grimace",
      "wheelchair-move",
      "turn-down",
      "person-walking-arrow-right",
      "square-envelope",
      "dice",
      "bowling-ball",
      "brain",
      "bandage",
      "calendar-minus",
      "circle-xmark",
      "gifts",
      "hotel",
      "earth-asia",
      "id-card-clip",
      "magnifying-glass-plus",
      "thumbs-up",
      "user-clock",
      "hand-dots",
      "file-invoice",
      "window-minimize",
      "mug-saucer",
      "brush",
      "mask",
      "magnifying-glass-minus",
      "ruler-vertical",
      "user-large",
      "train-tram",
      "user-nurse",
      "syringe",
      "cloud-sun",
      "stopwatch-20",
      "square-full",
      "magnet",
      "jar",
      "note-sticky",
      "bug-slash",
      "arrow-up-from-water-pump",
      "bone",
      "user-injured",
      "face-sad-tear",
      "plane",
      "tent-arrows-down",
      "exclamation",
      "arrows-spin",
      "print",
      "turkish-lira-sign",
      "dollar-sign",
      "x",
      "magnifying-glass-dollar",
      "users-gear",
      "person-military-pointing",
      "building-columns",
      "umbrella",
      "trowel",
      "d",
      "stapler",
      "masks-theater",
      "kip-sign",
      "hand-point-left",
      "handshake-simple",
      "jet-fighter",
      "square-share-nodes",
      "barcode",
      "plus-minus",
      "video",
      "graduation-cap",
      "hand-holding-medical",
      "person-circle-check",
      "turn-up"
    ];
    const colContent = (text) => {
      return /* @__PURE__ */ import_react.default.createElement("div", { className: "p-4 bg-white-trans-faded rounded-sm" }, text);
    };
    const { model } = setupController();
    const [sliderValue, setSliderValue] = react.useState(0);
    const exampleOptions = [
      {
        label: "Apple",
        value: "apple"
      },
      {
        label: "Peach",
        value: "peach"
      },
      {
        label: "Pear",
        value: "pear"
      },
      {
        label: "Banana",
        value: "banana"
      }
    ];
    const gridCode = "<Grid auto>\n    <div>Content</div>\n    <div>Content</div>\n</Grid>\n";
    const { FormCheckBox, FormGroup, TextBox, Icon, Button, Grid, Code, RadioGroup, Slider, GradientSlider, RadioItem, ToolTip, ToolTipContent, Scrollable, TabModal, Dropdown, CheckBox, CheckBoxGroup } = window.$_gooee.framework;
    const icon = /* @__PURE__ */ import_react.default.createElement("div", { className: "fa fa-eye" });
    const tabs = [
      {
        name: "GRIDS",
        label: /* @__PURE__ */ import_react.default.createElement("div", { className: "d-flex flex-row w-x" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "align-self-flex-start icon-sm fa fa-solid-border-all mr-2" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-1 w-x" }, "Grids")),
        content: /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h2", { className: "text-primary mb-1" }, "Grids"), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-black-trans-less-faded rounded-sm mb-4 p-4" }, /* @__PURE__ */ import_react.default.createElement("p", { className: "mb-2", cohinline: "cohinline" }, "You can define grids using the following syntax:"), /* @__PURE__ */ import_react.default.createElement(Code, { htmlString: gridCode })), /* @__PURE__ */ import_react.default.createElement(Grid, { className: "mb-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "col-3" }, colContent("col-3")), /* @__PURE__ */ import_react.default.createElement("div", { className: "col-9" }, colContent("col-9"))), /* @__PURE__ */ import_react.default.createElement(Grid, { className: "mb-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "col-9" }, colContent("col-9")), /* @__PURE__ */ import_react.default.createElement("div", { className: "col-3" }, colContent("col-3"))), /* @__PURE__ */ import_react.default.createElement(Grid, { className: "mb-4", auto: true }, /* @__PURE__ */ import_react.default.createElement("div", null, colContent("col-6")), /* @__PURE__ */ import_react.default.createElement("div", null, colContent("col-6"))), /* @__PURE__ */ import_react.default.createElement(Grid, { className: "mb-4", auto: true }, /* @__PURE__ */ import_react.default.createElement("div", null, colContent("col-4")), /* @__PURE__ */ import_react.default.createElement("div", null, colContent("col-4")), /* @__PURE__ */ import_react.default.createElement("div", null, colContent("col-4"))), /* @__PURE__ */ import_react.default.createElement(Grid, { className: "mb-4", auto: true }, /* @__PURE__ */ import_react.default.createElement("div", null, colContent("col-3")), /* @__PURE__ */ import_react.default.createElement("div", null, colContent("col-3")), /* @__PURE__ */ import_react.default.createElement("div", null, colContent("col-3")), /* @__PURE__ */ import_react.default.createElement("div", null, colContent("col-3"))), /* @__PURE__ */ import_react.default.createElement(Grid, { className: "mb-4", auto: true }, /* @__PURE__ */ import_react.default.createElement("div", null, colContent("col-2")), /* @__PURE__ */ import_react.default.createElement("div", null, colContent("col-2")), /* @__PURE__ */ import_react.default.createElement("div", null, colContent("col-2")), /* @__PURE__ */ import_react.default.createElement("div", null, colContent("col-2")), /* @__PURE__ */ import_react.default.createElement("div", null, colContent("col-2")), /* @__PURE__ */ import_react.default.createElement("div", null, colContent("col-2"))), /* @__PURE__ */ import_react.default.createElement(Grid, { className: "mb-4", auto: true }, /* @__PURE__ */ import_react.default.createElement("div", null, colContent("col-1")), /* @__PURE__ */ import_react.default.createElement("div", null, colContent("col-1")), /* @__PURE__ */ import_react.default.createElement("div", null, colContent("col-1")), /* @__PURE__ */ import_react.default.createElement("div", null, colContent("col-1")), /* @__PURE__ */ import_react.default.createElement("div", null, colContent("col-1")), /* @__PURE__ */ import_react.default.createElement("div", null, colContent("col-1")), /* @__PURE__ */ import_react.default.createElement("div", null, colContent("col-1")), /* @__PURE__ */ import_react.default.createElement("div", null, colContent("col-1")), /* @__PURE__ */ import_react.default.createElement("div", null, colContent("col-1")), /* @__PURE__ */ import_react.default.createElement("div", null, colContent("col-1")), /* @__PURE__ */ import_react.default.createElement("div", null, colContent("col-1")), /* @__PURE__ */ import_react.default.createElement("div", null, colContent("col-1"))))
      },
      {
        name: "BUTTONS",
        label: /* @__PURE__ */ import_react.default.createElement("div", { className: "d-flex flex-row w-x" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "align-self-flex-start icon-sm fa fa-solid-stop mr-2" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-1 w-x" }, "Buttons")),
        content: /* @__PURE__ */ import_react.default.createElement(Grid, { auto: true }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h2", { className: "text-primary" }, "Buttons"), /* @__PURE__ */ import_react.default.createElement("h3", { className: "text-muted mb-1" }, "Colours"), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-black-trans-less-faded rounded-sm mb-4" }, /* @__PURE__ */ import_react.default.createElement(Code, { htmlString: '<Button color="name">Button</Button>' }), /* @__PURE__ */ import_react.default.createElement("div", { className: "p-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "d-flex flex-row flex-wrap" }, /* @__PURE__ */ import_react.default.createElement(Button, { className: "mr-1", color: "primary" }, "Primary"), /* @__PURE__ */ import_react.default.createElement(Button, { className: "mr-1", color: "secondary" }, "Secondary"), /* @__PURE__ */ import_react.default.createElement(Button, { className: "mr-1", color: "info" }, "Info"), /* @__PURE__ */ import_react.default.createElement(Button, { className: "mr-1", color: "success" }, "Success"), /* @__PURE__ */ import_react.default.createElement(Button, { className: "mr-1", color: "warning" }, "Warning"), /* @__PURE__ */ import_react.default.createElement(Button, { color: "danger" }, "Danger")), /* @__PURE__ */ import_react.default.createElement("div", { className: "mt-2 d-flex flex-row flex-wrap" }, /* @__PURE__ */ import_react.default.createElement(Button, { className: "mr-1", color: "light" }, "Light"), /* @__PURE__ */ import_react.default.createElement(Button, { className: "mr-1", color: "dark" }, "Dark"), /* @__PURE__ */ import_react.default.createElement(Button, { className: "mr-1", color: "white" }, "White"), /* @__PURE__ */ import_react.default.createElement(Button, { color: "black" }, "Black")))), /* @__PURE__ */ import_react.default.createElement("h3", { className: "text-muted mb-1" }, "Styles"), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-black-trans-less-faded rounded-sm mb-4" }, /* @__PURE__ */ import_react.default.createElement(Code, { htmlString: '<Button style="outline">Outline</Button>\n<Button style="trans">Translucent</Button>\n<Button disabled>Disabled</Button>\n<Button isBlock>Block</Button>' }), /* @__PURE__ */ import_react.default.createElement("div", { className: "d-flex flex-row flex-wrap align-items-start m-4" }, /* @__PURE__ */ import_react.default.createElement(Button, { className: "mr-1", color: "light", style: "outline" }, "Outline"), /* @__PURE__ */ import_react.default.createElement(Button, { className: "mr-1", color: "light", style: "trans" }, "Translucent"), /* @__PURE__ */ import_react.default.createElement(Button, { color: "light", disabled: true }, "Disabled")), /* @__PURE__ */ import_react.default.createElement("div", { className: "d-flex flex-row flex-wrap align-items-start pl-4 pr-4 pb-4" }, /* @__PURE__ */ import_react.default.createElement(Button, { color: "light", isBlock: true }, "Block"))), /* @__PURE__ */ import_react.default.createElement("h3", { className: "text-muted mb-1" }, "Sizes"), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-black-trans-less-faded rounded-sm mb-4" }, /* @__PURE__ */ import_react.default.createElement(Code, { htmlString: '<Button size="sm">Small Button</Button>\n<Button size="lg">Large Button</Button>' }), /* @__PURE__ */ import_react.default.createElement("div", { className: "d-flex flex-row flex-wrap align-items-start m-4" }, /* @__PURE__ */ import_react.default.createElement(Button, { className: "mr-1", color: "primary", size: "lg" }, "Large Button"), /* @__PURE__ */ import_react.default.createElement(Button, { className: "mr-1", color: "secondary", size: "lg" }, "Large Button"), /* @__PURE__ */ import_react.default.createElement(Button, { className: "mr-1", color: "primary", size: "sm" }, "Small Button"), /* @__PURE__ */ import_react.default.createElement(Button, { color: "secondary", size: "sm" }, "Small Button")))), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h3", { className: "text-muted mb-1" }, "Icon Buttons"), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-black-trans-less-faded rounded-sm mb-4" }, /* @__PURE__ */ import_react.default.createElement(Code, { htmlString: '<Button icon>\n    <Icon icon="close" mask />\n</Button>' }), /* @__PURE__ */ import_react.default.createElement("div", { className: "d-flex flex-row flex-wrap align-items-start m-4" }, /* @__PURE__ */ import_react.default.createElement(Button, { className: "mr-1", size: "sm", icon: true }, /* @__PURE__ */ import_react.default.createElement("div", { className: "icon mask-icon icon-close" })), /* @__PURE__ */ import_react.default.createElement(Button, { className: "mr-1", icon: true }, /* @__PURE__ */ import_react.default.createElement("div", { className: "icon mask-icon icon-close" })), /* @__PURE__ */ import_react.default.createElement(Button, { className: "mr-1", size: "lg", icon: true }, /* @__PURE__ */ import_react.default.createElement("div", { className: "icon mask-icon icon-close" })))), /* @__PURE__ */ import_react.default.createElement("h3", { className: "text-muted mb-1" }, "Icon Buttons (Bordered Circular)"), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-black-trans-less-faded rounded-sm mb-4" }, /* @__PURE__ */ import_react.default.createElement(Code, { htmlString: '<Button border icon circular>\n    <Icon icon="close" mask />\n</Button>' }), /* @__PURE__ */ import_react.default.createElement("div", { className: "d-flex flex-row flex-wrap align-items-start m-4" }, /* @__PURE__ */ import_react.default.createElement(Button, { className: "mr-1", size: "sm", border: true, icon: true, circular: true }, /* @__PURE__ */ import_react.default.createElement(Icon, { icon: "close", mask: true })), /* @__PURE__ */ import_react.default.createElement(Button, { className: "mr-1", border: true, icon: true, circular: true }, /* @__PURE__ */ import_react.default.createElement(Icon, { icon: "close", mask: true })), /* @__PURE__ */ import_react.default.createElement(Button, { className: "mr-1", size: "lg", border: true, icon: true, circular: true }, /* @__PURE__ */ import_react.default.createElement(Icon, { icon: "close", mask: true })))), /* @__PURE__ */ import_react.default.createElement("h2", { className: "text-primary" }, "Button Groups"), /* @__PURE__ */ import_react.default.createElement("div", { className: "row no-gutter mb-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "col-6 pr-2" }, /* @__PURE__ */ import_react.default.createElement("h3", { className: "text-muted mb-1" }, "Horizontal"), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-black-trans-less-faded rounded-sm" }, /* @__PURE__ */ import_react.default.createElement("code", null, "btn-group"), /* @__PURE__ */ import_react.default.createElement("div", { className: "p-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "btn-group" }, /* @__PURE__ */ import_react.default.createElement(Button, { color: "primary" }, "One"), /* @__PURE__ */ import_react.default.createElement(Button, { color: "danger" }, "Two"), /* @__PURE__ */ import_react.default.createElement(Button, { color: "success" }, "Three"), /* @__PURE__ */ import_react.default.createElement(Button, { color: "warning" }, "Four"))))), /* @__PURE__ */ import_react.default.createElement("div", { className: "col-6 pl-2" }, /* @__PURE__ */ import_react.default.createElement("h3", { className: "text-muted mb-1" }, "Vertical"), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-black-trans-less-faded rounded-sm" }, /* @__PURE__ */ import_react.default.createElement("code", null, "btn-group-vertical"), /* @__PURE__ */ import_react.default.createElement("div", { className: "p-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "btn-group-vertical" }, /* @__PURE__ */ import_react.default.createElement(Button, { color: "primary" }, "One"), /* @__PURE__ */ import_react.default.createElement(Button, { color: "danger" }, "Two"), /* @__PURE__ */ import_react.default.createElement(Button, { color: "success" }, "Three"), /* @__PURE__ */ import_react.default.createElement(Button, { color: "warning" }, "Four"))))))))
      },
      {
        name: "TYPOGRAPHY",
        label: /* @__PURE__ */ import_react.default.createElement("div", { className: "d-flex flex-row w-x" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "align-self-flex-start icon-sm fa fa-solid-font mr-2" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-1 w-x" }, "Typography")),
        content: /* @__PURE__ */ import_react.default.createElement(Grid, { auto: true }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("div", { className: "mb-4" }, /* @__PURE__ */ import_react.default.createElement("h2", { className: "text-primary" }, "Typography"), /* @__PURE__ */ import_react.default.createElement("h3", { className: "text-muted mb-1" }, "Headers"), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-black-trans-less-faded rounded-sm p-4" }, /* @__PURE__ */ import_react.default.createElement("h1", null, "h1.Header"), /* @__PURE__ */ import_react.default.createElement("h2", null, "h2.Header"), /* @__PURE__ */ import_react.default.createElement("h4", null, "h4.Header"), /* @__PURE__ */ import_react.default.createElement("h5", null, "h5.Header"), /* @__PURE__ */ import_react.default.createElement("h6", null, "h6.Header")), /* @__PURE__ */ import_react.default.createElement("h3", { className: "text-muted mt-4 mb-1" }, "Paragraph"), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-black-trans-less-faded rounded-sm p-4" }, /* @__PURE__ */ import_react.default.createElement("p", { cohinline: "cohinline" }, "Dolorem delectus et laborum voluptatum animi. Et placeat reiciendis qui minima officiis ullam consequatur excepturi.\xA0", /* @__PURE__ */ import_react.default.createElement("b", null, "Et id delectus aut"), ".\xA0Ullam dicta ut adipisci aut iure quos aut. Quam illum sint non\xA0", /* @__PURE__ */ import_react.default.createElement("b", null, "voluptatem"), "\xA0earum commodi eos impedit.")))), /* @__PURE__ */ import_react.default.createElement("div", null))
      },
      ,
      {
        name: "MISC",
        label: /* @__PURE__ */ import_react.default.createElement("div", { className: "d-flex flex-row w-x" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "align-self-flex-start icon-sm fa fa-solid-font mr-2" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-1 w-x" }, "Misc")),
        content: /* @__PURE__ */ import_react.default.createElement(Grid, { auto: true }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h2", { className: "text-primary" }, "Badges"), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-black-trans-less-faded rounded-sm mb-4 p-4 d-flex flex-row flex-wrap" }, /* @__PURE__ */ import_react.default.createElement("div", { class: "badge badge-primary mr-1" }, "badge-primary"), /* @__PURE__ */ import_react.default.createElement("div", { class: "badge badge-secondary mr-1" }, "badge-secondary"), /* @__PURE__ */ import_react.default.createElement("div", { class: "badge badge-success mr-1" }, "badge-success"), /* @__PURE__ */ import_react.default.createElement("div", { class: "badge badge-danger mr-1" }, "badge-danger")), /* @__PURE__ */ import_react.default.createElement("h3", { className: "text-muted mb-1" }, "Pill"), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-black-trans-less-faded rounded-sm p-4 d-flex flex-row flex-wrap" }, /* @__PURE__ */ import_react.default.createElement("div", { class: "badge badge-primary badge-pill mr-1" }, "badge-primary"), /* @__PURE__ */ import_react.default.createElement("div", { class: "badge badge-secondary badge-pill mr-1" }, "badge-secondary"), /* @__PURE__ */ import_react.default.createElement("div", { class: "badge badge-success badge-pill mr-1" }, "badge-success"), /* @__PURE__ */ import_react.default.createElement("div", { class: "badge badge-danger badge-pill mr-1" }, "badge-danger"))), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h2", { className: "text-primary" }, "Alerts"), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-black-trans-less-faded rounded-sm p-4" }, /* @__PURE__ */ import_react.default.createElement("div", { class: "alert alert-primary mb-4" }, "A simple primary alert-check it out!"), /* @__PURE__ */ import_react.default.createElement("div", { class: "alert alert-secondary mb-4" }, "A simple secondary alert-check it out!"), /* @__PURE__ */ import_react.default.createElement("div", { class: "alert alert-success mb-4" }, "A simple success alert-check it out!"), /* @__PURE__ */ import_react.default.createElement("div", { class: "alert alert-danger mb-4" }, "A simple danger alert-check it out!"), /* @__PURE__ */ import_react.default.createElement("div", { class: "alert alert-warning mb-4" }, "A simple warning alert-check it out!"), /* @__PURE__ */ import_react.default.createElement("div", { class: "alert alert-info mb-4" }, "A simple info alert-check it out!"), /* @__PURE__ */ import_react.default.createElement("div", { class: "alert alert-light mb-4" }, "A simple light alert-check it out!"), /* @__PURE__ */ import_react.default.createElement("div", { class: "alert alert-dark" }, "A simple dark alert-check it out!"))))
      },
      {
        name: "FORMS",
        label: /* @__PURE__ */ import_react.default.createElement("div", { className: "d-flex flex-row w-x" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "align-self-flex-start icon-sm fa fa-solid-square-check mr-2" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-1 w-x" }, "Forms")),
        content: /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h2", { className: "text-primary" }, "Forms"), /* @__PURE__ */ import_react.default.createElement(Grid, { auto: true }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h3", { className: "text-muted mb-1" }, "Text"), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-black-trans-less-faded rounded-sm mb-4" }, /* @__PURE__ */ import_react.default.createElement(Code, { htmlString: "<TextBox />" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "p-4" }, /* @__PURE__ */ import_react.default.createElement(TextBox, null))), /* @__PURE__ */ import_react.default.createElement("h3", { className: "text-muted mb-1" }, "Sizing"), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-black-trans-less-faded rounded-sm mb-4" }, /* @__PURE__ */ import_react.default.createElement(Code, { htmlString: '<TextBox size="sm" />\n<TextBox size="lg" />' }), /* @__PURE__ */ import_react.default.createElement("div", { className: "p-4" }, /* @__PURE__ */ import_react.default.createElement(TextBox, { className: "mb-4", size: "sm" }), /* @__PURE__ */ import_react.default.createElement(TextBox, { size: "lg" }))), /* @__PURE__ */ import_react.default.createElement("h3", { className: "text-muted mb-1" }, "Text Area"), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-black-trans-less-faded rounded-sm mb-4" }, /* @__PURE__ */ import_react.default.createElement(Code, { htmlString: '<TextBox rows="3" />' }), /* @__PURE__ */ import_react.default.createElement("div", { className: "p-4" }, /* @__PURE__ */ import_react.default.createElement(TextBox, { rows: "3" }))), /* @__PURE__ */ import_react.default.createElement("h3", { className: "text-muted mb-1" }, "Disabled"), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-black-trans-less-faded rounded-sm" }, /* @__PURE__ */ import_react.default.createElement(Code, { htmlString: "<TextBox disabled />" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "p-4" }, /* @__PURE__ */ import_react.default.createElement(TextBox, { disabled: true })))), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h3", { className: "text-muted mb-1" }, "Dropdown"), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-black-trans-less-faded rounded-sm p-4 mb-4" }, /* @__PURE__ */ import_react.default.createElement(FormGroup, { label: "Fruit" }, /* @__PURE__ */ import_react.default.createElement(Dropdown, { options: exampleOptions, selected: dropdownSelection, onSelectionChanged: (val) => setDropdownSelection(val) }))), /* @__PURE__ */ import_react.default.createElement("h3", { className: "text-muted mb-1" }, "Slider"), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-black-trans-less-faded rounded-sm p-4 mb-4" }, /* @__PURE__ */ import_react.default.createElement(FormGroup, { label: "Some setting", className: "form-group" }, /* @__PURE__ */ import_react.default.createElement(Grid, null, /* @__PURE__ */ import_react.default.createElement("div", { className: "col-10" }, /* @__PURE__ */ import_react.default.createElement(Slider, { onValueChanged: (val) => setSliderValue(val) })), /* @__PURE__ */ import_react.default.createElement("div", { className: "col-2 align-items-center justify-content-center text-muted" }, sliderValue + "%")), /* @__PURE__ */ import_react.default.createElement("small", { className: "form-text text-muted" }, "Some example muted text."))), /* @__PURE__ */ import_react.default.createElement("h3", { className: "text-muted mb-1" }, "Gradient Slider"), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-black-trans-less-faded rounded-sm p-4" }, /* @__PURE__ */ import_react.default.createElement(FormGroup, { label: "Some setting", className: "form-group" }, /* @__PURE__ */ import_react.default.createElement(Grid, null, /* @__PURE__ */ import_react.default.createElement("div", { className: "col-10" }, /* @__PURE__ */ import_react.default.createElement(GradientSlider, { className: "form-control-sm", spectrum: true, onValueChanged: (val) => setSliderValue(val) })), /* @__PURE__ */ import_react.default.createElement("div", { className: "col-2 align-items-center justify-content-center text-muted" }, sliderValue + "%")), /* @__PURE__ */ import_react.default.createElement("small", { className: "form-text text-muted" }, "Some example muted text.")))), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h3", { className: "text-muted mb-1" }, "Checkbox"), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-black-trans-less-faded rounded-sm p-4 mb-4" }, /* @__PURE__ */ import_react.default.createElement(FormGroup, { label: "Fruit" }, /* @__PURE__ */ import_react.default.createElement(CheckBoxGroup, { options: exampleOptions }))), /* @__PURE__ */ import_react.default.createElement("h3", { className: "text-muted mb-1" }, "Radio Group"), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-black-trans-less-faded rounded-sm p-4 mb-4" }, /* @__PURE__ */ import_react.default.createElement(FormGroup, { label: "Fruit" }, /* @__PURE__ */ import_react.default.createElement(RadioGroup, { options: exampleOptions }))), /* @__PURE__ */ import_react.default.createElement("h3", { className: "text-muted mb-1" }, "Validation"), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-black-trans-less-faded rounded-sm p-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "form was-validated" }, /* @__PURE__ */ import_react.default.createElement(FormGroup, { label: "Email address" }, /* @__PURE__ */ import_react.default.createElement(TextBox, { type: "email" })), /* @__PURE__ */ import_react.default.createElement(FormGroup, { label: "Password" }, /* @__PURE__ */ import_react.default.createElement(TextBox, { type: "password", className: "is-invalid" }), /* @__PURE__ */ import_react.default.createElement("div", { class: "invalid-feedback" }, "More example invalid feedback text")))))))
      },
      {
        name: "ICONS",
        label: /* @__PURE__ */ import_react.default.createElement("div", { className: "d-flex flex-row w-x" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "align-self-flex-start icon-sm fa fa-solid-icons mr-2" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-1 w-x" }, "Icons")),
        content: /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement(Grid, null, /* @__PURE__ */ import_react.default.createElement("div", { className: "col-4" }, /* @__PURE__ */ import_react.default.createElement("h2", { className: "text-primary" }, "Game Icons"), /* @__PURE__ */ import_react.default.createElement("h4", { className: "text-muted mb-1" }, "Sizing"), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-black-trans-less-faded rounded-sm mb-4" }, /* @__PURE__ */ import_react.default.createElement("code", null, "icon-sm", /* @__PURE__ */ import_react.default.createElement("br", null), "icon-lg"), /* @__PURE__ */ import_react.default.createElement("div", { className: "d-flex flex-row flex-wrap align-items-center m-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "w-33 d-flex flex-row align-items-center", key: maskIcons[0] }, /* @__PURE__ */ import_react.default.createElement("div", { className: `icon mask-icon icon-sm icon-${maskIcons[0]} mr-2` }), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-1 w-x" }, "Small")), /* @__PURE__ */ import_react.default.createElement("div", { className: "w-33 d-flex flex-row align-items-center", key: maskIcons[0] }, /* @__PURE__ */ import_react.default.createElement("div", { className: `icon mask-icon icon-${maskIcons[0]} mr-2` }), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-1 w-x" }, "Normal")), /* @__PURE__ */ import_react.default.createElement("div", { className: "w-33 d-flex flex-row align-items-center", key: maskIcons[0] }, /* @__PURE__ */ import_react.default.createElement("div", { className: `icon mask-icon icon-lg icon-${maskIcons[0]} mr-2` }), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-1 w-x" }, "Large")))), /* @__PURE__ */ import_react.default.createElement("h4", { className: "text-muted mb-1" }, "Animations"), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-black-trans-less-faded rounded-sm mb-4" }, /* @__PURE__ */ import_react.default.createElement("code", null, "icon-spin"), /* @__PURE__ */ import_react.default.createElement("div", { className: "d-flex flex-row flex-wrap align-items-center m-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "fa icon-spin icon-lg fa-solid-spinner mr-2" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "fa icon-spin icon-lg fa-solid-rotate-right mr-2" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "fa icon-spin icon-lg fa-solid-rotate mr-2" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "fa icon-spin icon-lg fa-solid-circle-notch mr-2" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "fa icon-spin icon-lg fa-solid-arrows-spin mr-2" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "fa icon-spin icon-lg fa-solid-dharmachakra mr-2" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "fa icon-spin icon-lg fa-solid-asterisk mr-2" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "fa icon-spin icon-lg fa-solid-life-ring mr-2" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "fa icon-spin icon-lg fa-solid-hurricane mr-2" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "fa icon-spin icon-lg fa-solid-fan" }))), /* @__PURE__ */ import_react.default.createElement("h4", { className: "text-muted mb-1" }, "Mask"), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-black-trans-less-faded rounded-sm mb-4" }, /* @__PURE__ */ import_react.default.createElement("code", null, "mask-icon icon-[name]"), /* @__PURE__ */ import_react.default.createElement("div", { className: "d-flex flex-row flex-wrap align-items-start m-4" }, maskIcons.map((icon2, index) => {
          const iconClassName = `icon mask-icon icon-sm icon-${icon2} mr-2`;
          return /* @__PURE__ */ import_react.default.createElement("div", { className: "w-50 d-flex flex-row align-items-center", key: icon2 }, /* @__PURE__ */ import_react.default.createElement("div", { className: iconClassName }), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-1 w-x" }, icon2));
        })))), /* @__PURE__ */ import_react.default.createElement("div", { className: "col-8" }, /* @__PURE__ */ import_react.default.createElement("h2", { className: "text-primary" }, "FontAwesome v6 Icons"), /* @__PURE__ */ import_react.default.createElement("h4", { className: "text-muted mb-1" }, "Regular"), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-black-trans-less-faded rounded-sm mb-4" }, /* @__PURE__ */ import_react.default.createElement("code", null, "fa fa-[name]"), /* @__PURE__ */ import_react.default.createElement("div", { className: "d-flex flex-row flex-wrap align-items-start m-4" }, faRegIcons.map((icon2, index) => {
          const iconClassName = `fa fa-${icon2} mr-2`;
          return /* @__PURE__ */ import_react.default.createElement("div", { className: "w-33 d-flex flex-row align-items-center", key: icon2 }, /* @__PURE__ */ import_react.default.createElement("div", { className: iconClassName }), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-1 w-x" }, icon2));
        }))), /* @__PURE__ */ import_react.default.createElement("h4", { className: "text-muted mb-1" }, "Solid"), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-black-trans-less-faded rounded-sm mb-4" }, /* @__PURE__ */ import_react.default.createElement("code", null, "fa fa-solid-[name]"), /* @__PURE__ */ import_react.default.createElement("div", { className: "d-flex flex-row flex-wrap align-items-start m-4" }, faSolidIcons.map((icon2, index) => {
          const iconClassName = `fa fa-solid-${icon2} mr-2`;
          return /* @__PURE__ */ import_react.default.createElement("div", { className: "w-33 d-flex flex-row align-items-center", key: icon2 }, /* @__PURE__ */ import_react.default.createElement("div", { className: iconClassName }), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-1 w-x" }, icon2));
        }))), /* @__PURE__ */ import_react.default.createElement("h4", { className: "text-muted mb-1" }, "Brands"), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-black-trans-less-faded rounded-sm" }, /* @__PURE__ */ import_react.default.createElement("code", null, "fa fa-brand-[name]"), /* @__PURE__ */ import_react.default.createElement("div", { className: "d-flex flex-row flex-wrap align-items-start m-4" }, faBrands.map((icon2, index) => {
          const iconClassName = `fa fa-brand-${icon2} mr-2`;
          return /* @__PURE__ */ import_react.default.createElement("div", { className: "w-33 d-flex flex-row align-items-center", key: icon2 }, /* @__PURE__ */ import_react.default.createElement("div", { className: iconClassName }), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-1 w-x" }, icon2));
        }))))))
      }
    ];
    return model.ShowExample ? /* @__PURE__ */ import_react.default.createElement(TabModal, { fixed: true, size: "lg", title: "Gooee - Example", icon, tabs }) : null;
  };
  var example_default = Example;

  // src/jsx/components/changelog.jsx
  var import_react2 = __toESM(require_react());
  function Changelog({ react }) {
    const { Icon } = window.$_gooee.framework;
    return /* @__PURE__ */ import_react2.default.createElement("div", null, /* @__PURE__ */ import_react2.default.createElement("div", { className: "mb-2" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "d-flex flex-row w-x" }, /* @__PURE__ */ import_react2.default.createElement(Icon, { fa: true, className: "align-self-flex-start icon-sm mr-2", icon: "solid-circle-chevron-right" }), /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex-1 w-x" }, /* @__PURE__ */ import_react2.default.createElement("b", { className: "mb-1" }, "v1.2.0"))), /* @__PURE__ */ import_react2.default.createElement("ul", { className: "fs-sm" }, /* @__PURE__ */ import_react2.default.createElement("li", null, "Added household wealth tooltip"), /* @__PURE__ */ import_react2.default.createElement("li", null, "Added citizen wealth tooltip"), /* @__PURE__ */ import_react2.default.createElement("li", null, "Added citizen type (tourist, citizen, commuter) tooltip"), /* @__PURE__ */ import_react2.default.createElement("li", null, 'Added "In stock" label to industrial/company/office storage tooltip'), /* @__PURE__ */ import_react2.default.createElement("li", null, "Added Polish language"), /* @__PURE__ */ import_react2.default.createElement("li", null, "Fixed waiting passengers tooltip on public transport stations"), /* @__PURE__ */ import_react2.default.createElement("li", null, "Only show min-max rent if they are different"), /* @__PURE__ */ import_react2.default.createElement("li", null, "Changed the layout for households"), /* @__PURE__ */ import_react2.default.createElement("li", null, "Update Korean translation (thx to @hibiyasleep)"), /* @__PURE__ */ import_react2.default.createElement("li", null, "Update Japanese translation (thx to @hibiyasleep)"), /* @__PURE__ */ import_react2.default.createElement("li", null, "Update Chinese translation (thx to @hibiyasleep)"), /* @__PURE__ */ import_react2.default.createElement("li", null, "Added translation for Anarchy Mode (thx to @hibiyasleep)"))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "mb-2" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "d-flex flex-row w-x" }, /* @__PURE__ */ import_react2.default.createElement(Icon, { fa: true, className: "align-self-flex-start icon-sm mr-2", icon: "solid-circle-chevron-right" }), /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex-1 w-x" }, /* @__PURE__ */ import_react2.default.createElement("b", { className: "mb-1" }, "v1.1.0"))), /* @__PURE__ */ import_react2.default.createElement("ul", { className: "fs-sm" }, /* @__PURE__ */ import_react2.default.createElement("li", null, "New Feature: Added tons (t), barrels (bbl.) and liters (l, kl) for resource tooltips"), /* @__PURE__ */ import_react2.default.createElement("li", null, "Fixed French translation (thx to @Edou24)"), /* @__PURE__ */ import_react2.default.createElement("li", null, "Requirements updated to HookUI v0.3.5"))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "mb-2" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "d-flex flex-row w-x" }, /* @__PURE__ */ import_react2.default.createElement(Icon, { fa: true, className: "align-self-flex-start icon-sm mr-2", icon: "solid-circle-chevron-right" }), /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex-1 w-x" }, /* @__PURE__ */ import_react2.default.createElement("b", { className: "mb-1" }, "v1.0.1"))), /* @__PURE__ */ import_react2.default.createElement("ul", { className: "fs-sm" }, /* @__PURE__ */ import_react2.default.createElement("li", null, "Fix padding of tooltip group for higher resolutions by changing the layout a bit"))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "mb-2" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "d-flex flex-row w-x" }, /* @__PURE__ */ import_react2.default.createElement(Icon, { fa: true, className: "align-self-flex-start icon-sm mr-2", icon: "solid-circle-chevron-right" }), /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex-1 w-x" }, /* @__PURE__ */ import_react2.default.createElement("b", { className: "mb-1" }, "v1.0.0"))), /* @__PURE__ */ import_react2.default.createElement("ul", { className: "fs-sm" }, /* @__PURE__ */ import_react2.default.createElement("li", null, "New Feature: Added an extended layout to improve tooltips readability"), /* @__PURE__ */ import_react2.default.createElement("li", null, "New Feature: Added company/industry storage info"), /* @__PURE__ */ import_react2.default.createElement("li", null, "Fixed some languages not showing"))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "mb-2" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "d-flex flex-row w-x" }, /* @__PURE__ */ import_react2.default.createElement(Icon, { fa: true, className: "align-self-flex-start icon-sm mr-2", icon: "solid-circle-chevron-right" }), /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex-1 w-x" }, /* @__PURE__ */ import_react2.default.createElement("b", { className: "mb-1" }, "v0.10.0"))), /* @__PURE__ */ import_react2.default.createElement("ul", { className: "fs-sm" }, /* @__PURE__ */ import_react2.default.createElement("li", null, "New Feature: Added balance info to households. Thx to @Biffa for the idea"), /* @__PURE__ */ import_react2.default.createElement("li", null, "New Feature: Added passenger info to public transport station buildings"), /* @__PURE__ */ import_react2.default.createElement("li", null, "New Feature: Added more detailed rent info to buildings with 1+ households"), /* @__PURE__ */ import_react2.default.createElement("li", null, "Fixed citizen state tooltip. Thx @Rotiti for reporting"), /* @__PURE__ */ import_react2.default.createElement("li", null, "Added color indictator to low density households. Thx @Scaristotle for reporting"))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "mb-2" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "d-flex flex-row w-x" }, /* @__PURE__ */ import_react2.default.createElement(Icon, { fa: true, solid: true, className: "align-self-flex-start icon-sm mr-2", icon: "solid-circle-chevron-right" }), /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex-1 w-x" }, /* @__PURE__ */ import_react2.default.createElement("b", { className: "mb-1" }, "v0.9.1"))), /* @__PURE__ */ import_react2.default.createElement("ul", { className: "fs-sm" }, /* @__PURE__ */ import_react2.default.createElement("li", null, "Added Anarchy Mode indicator for terrain tool"))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "mb-2" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "d-flex flex-row w-x" }, /* @__PURE__ */ import_react2.default.createElement(Icon, { fa: true, className: "align-self-flex-start icon-sm mr-2", icon: "solid-circle-chevron-right" }), /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex-1 w-x" }, /* @__PURE__ */ import_react2.default.createElement("b", { className: "mb-1" }, "v0.9.0"))), /* @__PURE__ */ import_react2.default.createElement("ul", { className: "fs-sm" }, /* @__PURE__ */ import_react2.default.createElement("li", null, "New Feature: Anarchy Mode indicator"), /* @__PURE__ */ import_react2.default.createElement("li", null, "New Feature: Net Tool Tooltips"), /* @__PURE__ */ import_react2.default.createElement("li", null, "Shows the current net tool mode"), /* @__PURE__ */ import_react2.default.createElement("li", null, "Shows the elevation"))));
  }
  var changelog_default = Changelog;

  // src/jsx/_tab_settings.jsx
  var import_react4 = __toESM(require_react());

  // src/jsx/components/_et_settings_box.jsx
  var import_react3 = __toESM(require_react());
  function EtSettingsBox({ icon, title, description, children }) {
    const { Icon } = window.$_gooee.framework;
    return /* @__PURE__ */ import_react3.default.createElement("div", { className: settingsBoxContainer }, /* @__PURE__ */ import_react3.default.createElement("div", { class: "p-4" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "d-flex flex-row align-items-end w-x mb-1" }, icon != void 0 && /* @__PURE__ */ import_react3.default.createElement(Icon, { className: "align-self-flex-start icon-md mr-2", icon }), /* @__PURE__ */ import_react3.default.createElement("h4", null, title)), description != void 0 && /* @__PURE__ */ import_react3.default.createElement("p", { className: "text-muted mb-2" }, description), children));
  }
  var et_settings_box_default = EtSettingsBox;

  // src/jsx/_tab_settings.jsx
  function TabSettings({ controller, react }) {
    const { Grid, FormGroup, FormCheckBox, Dropdown, Button, Icon } = window.$_gooee.framework;
    const [tooltipCategory, setTooltipCategory] = react.useState("general");
    const { model, update, trigger } = controller();
    const onCategoryChanged = (value) => {
      setTooltipCategory(value);
    };
    const onDisplayModeChanged = (value) => {
      update("DisplayMode", value);
      trigger("DoSave");
    };
    const displayModeOptions = [
      {
        label: "Instant",
        value: "instant"
      },
      {
        label: "Delayed",
        value: "delayed"
      },
      {
        label: "Hotkey",
        value: "hotkey"
      }
    ];
    const onDisplayModeHotkeyChanged = (value) => {
      update("DisplayModeHotkey", value);
      trigger("DoSave");
    };
    const displayModeHotkeyOptions = [
      {
        label: "CTRL",
        value: "CTRL"
      },
      {
        label: "SHIFT",
        value: "SHIFT"
      },
      {
        label: "ALT",
        value: "ALT"
      }
    ];
    const onSettingsToggle = (name, value) => {
      update(name, value);
      trigger("DoSave");
    };
    const tooltipCategoryContent = [
      {
        name: "general",
        content: /* @__PURE__ */ import_react4.default.createElement(et_settings_box_default, { title: "General", description: "Manage tooltips which show up on multiple entities of the game.", icon: "coui://GameUI/Media/Game/Icons/Information.svg" }, /* @__PURE__ */ import_react4.default.createElement(Grid, null, /* @__PURE__ */ import_react4.default.createElement("div", { className: "col-6" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "my-3" }, /* @__PURE__ */ import_react4.default.createElement(FormCheckBox, { className: "mb-1", checked: model.ShowCompanyOutput, label: "Show Company Resources", onToggle: (value) => onSettingsToggle("ShowCompanyOutput", value), disabled: !model.IsEnabled }), /* @__PURE__ */ import_react4.default.createElement("p", { className: "text-muted fs-sm" }, "The amount of resources the company has in stock.")), /* @__PURE__ */ import_react4.default.createElement("div", { className: "my-3" }, /* @__PURE__ */ import_react4.default.createElement(FormCheckBox, { className: "mb-1", checked: model.ShowEmployee, label: "Show Employees", onToggle: (value) => onSettingsToggle("ShowEmployee", value), disabled: !model.IsEnabled }), /* @__PURE__ */ import_react4.default.createElement("p", { className: "text-muted fs-sm" }, "Shows the amount of employees a buildings has."))), /* @__PURE__ */ import_react4.default.createElement("div", { className: "col-6" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "my-3" }, /* @__PURE__ */ import_react4.default.createElement(FormCheckBox, { className: "mb-1", checked: model.ShowEfficiency, label: "Show Efficiency", onToggle: (value) => onSettingsToggle("ShowEfficiency", value), disabled: !model.IsEnabled }), /* @__PURE__ */ import_react4.default.createElement("p", { className: "text-muted fs-sm" }, "Shows the efficiency of buliding in %.")))))
      },
      {
        name: "citizen",
        content: /* @__PURE__ */ import_react4.default.createElement(et_settings_box_default, { title: "Citizen", description: "Manage tooltips while hover a citizen.", icon: "coui://GameUI/Media/Game/Icons/Population.svg" }, /* @__PURE__ */ import_react4.default.createElement(Grid, null, /* @__PURE__ */ import_react4.default.createElement("div", { className: "col-6" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "my-3" }, /* @__PURE__ */ import_react4.default.createElement(FormCheckBox, { className: "mb-1", checked: model.ShowCitizenState, label: "Show State", onToggle: (value) => onSettingsToggle("ShowCitizenState", value), disabled: !model.IsEnabled }), /* @__PURE__ */ import_react4.default.createElement("p", { className: "text-muted fs-sm" }, "Shows the current state of the selected citizen.")), /* @__PURE__ */ import_react4.default.createElement("div", { className: "my-3" }, /* @__PURE__ */ import_react4.default.createElement(FormCheckBox, { className: "mb-1", checked: model.ShowCitizenWealth, label: "Show Wealth", onToggle: (value) => onSettingsToggle("ShowCitizenWealth", value), disabled: !model.IsEnabled }), /* @__PURE__ */ import_react4.default.createElement("p", { className: "text-muted fs-sm" }, "Shows the current wealth of the selected citizen.")), /* @__PURE__ */ import_react4.default.createElement("div", { className: "my-3" }, /* @__PURE__ */ import_react4.default.createElement(FormCheckBox, { className: "mb-1", checked: model.ShowCitizenType, label: "Show Type", onToggle: (value) => onSettingsToggle("ShowCitizenType", value), disabled: !model.IsEnabled }), /* @__PURE__ */ import_react4.default.createElement("p", { className: "text-muted fs-sm" }, "Shows which type the selected citizen is."))), /* @__PURE__ */ import_react4.default.createElement("div", { className: "col-6" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "my-3" }, /* @__PURE__ */ import_react4.default.createElement(FormCheckBox, { className: "mb-1", checked: model.ShowCitizenHappiness, label: "Show Happiness", onToggle: (value) => onSettingsToggle("ShowCitizenHappiness", value), disabled: !model.IsEnabled }), /* @__PURE__ */ import_react4.default.createElement("p", { className: "text-muted fs-sm" }, "Shows how happy the selected citizen currently is.")), /* @__PURE__ */ import_react4.default.createElement("div", { className: "my-3" }, /* @__PURE__ */ import_react4.default.createElement(FormCheckBox, { className: "mb-1", checked: model.ShowCitizenEducation, label: "Show Education", onToggle: (value) => onSettingsToggle("ShowCitizenEducation", value), disabled: !model.IsEnabled }), /* @__PURE__ */ import_react4.default.createElement("p", { className: "text-muted fs-sm" }, "Shows the education level of the selected citizen.")))))
      },
      {
        name: "education",
        content: /* @__PURE__ */ import_react4.default.createElement(et_settings_box_default, { title: "Education", description: "Manage tooltips related to educational buildings.", icon: "coui://GameUI/Media/Game/Icons/Education.svg" }, /* @__PURE__ */ import_react4.default.createElement(Grid, null, /* @__PURE__ */ import_react4.default.createElement("div", { class: "col-6" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "my-3" }, /* @__PURE__ */ import_react4.default.createElement(FormCheckBox, { className: "mb-1", label: "Show Student Capacity", checked: model.ShowSchoolStudentCapacity, onToggle: (value) => onSettingsToggle("ShowSchoolStudentCapacity", value), disabled: !model.IsEnabled }), /* @__PURE__ */ import_react4.default.createElement("p", { className: "text-muted fs-sm" }, "Shows the currently occupied and available places at schools and universities."))), /* @__PURE__ */ import_react4.default.createElement("div", { class: "col-6" }, "\xA0")))
      },
      {
        name: "growables",
        content: /* @__PURE__ */ import_react4.default.createElement(et_settings_box_default, { title: "Growables", description: "Enable related tooltips for growables.", icon: "coui://GameUI/Media/Game/Icons/Zones.svg" }, /* @__PURE__ */ import_react4.default.createElement(Grid, null, /* @__PURE__ */ import_react4.default.createElement("div", { className: "col-6" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "my-3" }, /* @__PURE__ */ import_react4.default.createElement(FormCheckBox, { className: "mb-2", checked: model.ShowGrowablesHousehold, label: "Show Households", onToggle: (value) => onSettingsToggle("ShowGrowablesHousehold", value), disabled: !model.IsEnabled })), /* @__PURE__ */ import_react4.default.createElement("div", { className: "my-3" }, /* @__PURE__ */ import_react4.default.createElement(FormCheckBox, { className: "mb-2", checked: model.ShowGrowablesHouseholdDetails, label: "Show Detailed Households", onToggle: (value) => onSettingsToggle("ShowGrowablesHouseholdDetails", value), disabled: !model.IsEnabled })), /* @__PURE__ */ import_react4.default.createElement("div", { className: "my-3" }, /* @__PURE__ */ import_react4.default.createElement(FormCheckBox, { className: "mb-2", checked: model.ShowGrowablesHouseholdWealth, label: "Show Household Wealth", onToggle: (value) => onSettingsToggle("ShowGrowablesHouseholdWealth", value), disabled: !model.IsEnabled })), /* @__PURE__ */ import_react4.default.createElement("div", { className: "my-3" }, /* @__PURE__ */ import_react4.default.createElement(FormCheckBox, { className: "mb-2", checked: model.ShowGrowablesLevel, label: "Show Level", onToggle: (value) => onSettingsToggle("ShowGrowablesLevel", value), disabled: !model.IsEnabled }))), /* @__PURE__ */ import_react4.default.createElement("div", { className: "col-6" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "my-3" }, /* @__PURE__ */ import_react4.default.createElement(FormCheckBox, { className: "mb-2", checked: model.ShowGrowablesLevelDetails, label: "Show Detailed Level", onToggle: (value) => onSettingsToggle("ShowGrowablesLevelDetails", value), disabled: !model.IsEnabled })), /* @__PURE__ */ import_react4.default.createElement("div", { className: "my-3" }, /* @__PURE__ */ import_react4.default.createElement(FormCheckBox, { className: "mb-2", checked: model.ShowGrowablesRent, label: "Show Rent", onToggle: (value) => onSettingsToggle("ShowGrowablesRent", value), disabled: !model.IsEnabled })), /* @__PURE__ */ import_react4.default.createElement("div", { className: "my-3" }, /* @__PURE__ */ import_react4.default.createElement(FormCheckBox, { className: "mb-2", checked: model.ShowGrowablesBalance, label: "Show Balance", onToggle: (value) => onSettingsToggle("ShowGrowablesBalance", value), disabled: !model.IsEnabled })), /* @__PURE__ */ import_react4.default.createElement("div", { className: "my-3" }, /* @__PURE__ */ import_react4.default.createElement(FormCheckBox, { className: "mb-2", checked: model.ShowGrowablesZoneInfo, label: "Show Zone Info", onToggle: (value) => onSettingsToggle("ShowGrowablesZoneInfo", value), disabled: !model.IsEnabled })))))
      },
      {
        name: "nettool",
        content: /* @__PURE__ */ import_react4.default.createElement(et_settings_box_default, { title: "NetTool", description: "Manage tooltips which show up while in placing roads.", icon: "coui://GameUI/Media/Game/Icons/Roads.svg" }, /* @__PURE__ */ import_react4.default.createElement(Grid, null, /* @__PURE__ */ import_react4.default.createElement("div", { className: "col-6" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "my-3" }, /* @__PURE__ */ import_react4.default.createElement(FormCheckBox, { className: "mb-2", label: "Show Mode", checked: model.ShowNetToolMode, onToggle: (value) => onSettingsToggle("ShowNetToolMode", value), disabled: !model.IsEnabled }))), /* @__PURE__ */ import_react4.default.createElement("div", { className: "col-6" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "my-3" }, /* @__PURE__ */ import_react4.default.createElement(FormCheckBox, { className: "mb-2", label: "Show Elevation", checked: model.ShowNetToolElevation, onToggle: (value) => onSettingsToggle("ShowNetToolElevation", value), disabled: !model.IsEnabled })))))
      },
      {
        name: "parks",
        content: /* @__PURE__ */ import_react4.default.createElement(et_settings_box_default, { title: "Parks & Recreation", description: "Shows information related to company data", icon: "coui://GameUI/Media/Game/Icons/ParksAndRecreation.svg" }, /* @__PURE__ */ import_react4.default.createElement(FormCheckBox, { className: "mb-2", checked: model.ShowParkMaintenance, label: "Show Park Maintenance", onToggle: (value) => onSettingsToggle("ShowParkMaintenance", value), disabled: !model.IsEnabled }))
      },
      {
        name: "parking",
        content: /* @__PURE__ */ import_react4.default.createElement(et_settings_box_default, { title: "Parking", description: "Enable parking related tooltips.", icon: "coui://GameUI/Media/Game/Icons/Parking.svg" }, /* @__PURE__ */ import_react4.default.createElement(FormCheckBox, { className: "mb-2", checked: model.ShowParkingFees, label: "Show Fees", onToggle: (value) => onSettingsToggle("ShowParkingFees", value), disabled: !model.IsEnabled }), /* @__PURE__ */ import_react4.default.createElement(FormCheckBox, { className: "mb-2", checked: model.ShowParkingCapacity, label: "Show Parking Capacity", onToggle: (value) => onSettingsToggle("ShowParkingCapacity", value), disabled: !model.IsEnabled }))
      },
      {
        name: "publictransport",
        content: /* @__PURE__ */ import_react4.default.createElement(et_settings_box_default, { title: "Public Transportation", description: "Enable parking related tooltips.", icon: "coui://GameUI/Media/Game/Icons/TransportationOverview.svg" }, /* @__PURE__ */ import_react4.default.createElement(FormCheckBox, { className: "mb-2", checked: model.ShowPublicTransportWaitingPassengers, label: "Show Waiting Passengers", onToggle: (value) => onSettingsToggle("ShowPublicTransportWaitingPassengers", value), disabled: !model.IsEnabled }), /* @__PURE__ */ import_react4.default.createElement(FormCheckBox, { className: "mb-2", checked: model.ShowPublicTransportWaitingTime, label: "Show Waiting Time", onToggle: (value) => onSettingsToggle("ShowPublicTransportWaitingTime", value), disabled: !model.IsEnabled }))
      },
      {
        name: "roads",
        content: /* @__PURE__ */ import_react4.default.createElement(et_settings_box_default, { title: "Roads", description: "Enable tooltips while hover over roads", icon: "coui://GameUI/Media/Game/Icons/Roads.svg" }, /* @__PURE__ */ import_react4.default.createElement(FormCheckBox, { className: "mb-2", checked: model.ShowRoadLength, label: "Show Length", onToggle: (value) => onSettingsToggle("ShowRoadLength", value), disabled: !model.IsEnabled }), /* @__PURE__ */ import_react4.default.createElement(FormCheckBox, { className: "mb-2", checked: model.ShowRoadUpkeep, label: "Show Upkeep", onToggle: (value) => onSettingsToggle("ShowRoadUpkeep", value), disabled: !model.IsEnabled }), /* @__PURE__ */ import_react4.default.createElement(FormCheckBox, { className: "mb-2", checked: model.ShowRoadCondition, label: "Show Conditions", onToggle: (value) => onSettingsToggle("ShowRoadCondition", value), disabled: !model.IsEnabled }))
      },
      {
        name: "vehicles",
        content: /* @__PURE__ */ import_react4.default.createElement(et_settings_box_default, { title: "Vehicles", description: "Enable related tooltips for vehicles.", icon: "coui://GameUI/Media/Game/Icons/Traffic.svg" }, /* @__PURE__ */ import_react4.default.createElement(FormCheckBox, { className: "mb-2", checked: model.ShowVehicleState, label: "Show State", onToggle: (value) => onSettingsToggle("ShowVehicleState", value), disabled: !model.IsEnabled }), /* @__PURE__ */ import_react4.default.createElement(FormCheckBox, { className: "mb-2", checked: model.ShowVehicleDriver, label: "Show Driver", onToggle: (value) => onSettingsToggle("ShowVehicleDriver", value), disabled: !model.IsEnabled }), /* @__PURE__ */ import_react4.default.createElement(FormCheckBox, { className: "mb-2", checked: model.ShowVehiclePostvan, label: "Show Postvan", onToggle: (value) => onSettingsToggle("ShowVehiclePostvan", value), disabled: !model.IsEnabled }), /* @__PURE__ */ import_react4.default.createElement(FormCheckBox, { className: "mb-2", checked: model.ShowVehicleGarbageTruck, label: "Show Garbage Truck", onToggle: (value) => onSettingsToggle("ShowVehicleGarbageTruck", value), disabled: !model.IsEnabled }), /* @__PURE__ */ import_react4.default.createElement(FormCheckBox, { className: "mb-2", checked: model.ShowVehiclePassengerDetails, label: "Show Passenger Details", onToggle: (value) => onSettingsToggle("ShowVehiclePassengerDetails", value), disabled: !model.IsEnabled }))
      }
    ];
    return /* @__PURE__ */ import_react4.default.createElement("div", null, /* @__PURE__ */ import_react4.default.createElement(Grid, { className: "h-100" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "col-3 p-4 bg-black-trans-faded rounded-sm" }, /* @__PURE__ */ import_react4.default.createElement("h2", { className: "mb-2" }, "General"), /* @__PURE__ */ import_react4.default.createElement("div", { className: "bg-black-trans-less-faded rounded-sm mb-4" }, /* @__PURE__ */ import_react4.default.createElement("div", { class: "p-4" }, /* @__PURE__ */ import_react4.default.createElement(FormGroup, { label: "Enable Mod" }, /* @__PURE__ */ import_react4.default.createElement("p", { className: "text-muted mb-2" }, "Enables a wider layout for the tooltips."), /* @__PURE__ */ import_react4.default.createElement(FormCheckBox, { checked: model.IsEnabled, label: "On/Off", onToggle: (value) => onSettingsToggle("IsEnabled", value) })))), /* @__PURE__ */ import_react4.default.createElement("div", { className: "bg-black-trans-less-faded rounded-sm mb-4" }, /* @__PURE__ */ import_react4.default.createElement("div", { class: "p-4" }, /* @__PURE__ */ import_react4.default.createElement(FormGroup, { label: "Display Mode" }, /* @__PURE__ */ import_react4.default.createElement("p", { className: "text-muted mb-2" }, "Choose how the tooltip is displayed."), /* @__PURE__ */ import_react4.default.createElement(Dropdown, { options: displayModeOptions, selected: model.DisplayMode, onSelectionChanged: onDisplayModeChanged })), model.DisplayMode == "hotkey" ? /* @__PURE__ */ import_react4.default.createElement(FormGroup, { className: "mt-3", label: "Hotkey" }, /* @__PURE__ */ import_react4.default.createElement(Dropdown, { options: displayModeHotkeyOptions, selected: model.DisplayModeHotkey, onSelectionChanged: onDisplayModeHotkeyChanged, disabled: !model.IsEnabled })) : null)), /* @__PURE__ */ import_react4.default.createElement("div", { className: "bg-black-trans-less-faded rounded-sm mb-4" }, /* @__PURE__ */ import_react4.default.createElement("div", { class: "p-4" }, /* @__PURE__ */ import_react4.default.createElement(FormGroup, { label: "Extended Layout" }, /* @__PURE__ */ import_react4.default.createElement("p", { className: "text-muted mb-2" }, "Enables a wider layout for the tooltips."), /* @__PURE__ */ import_react4.default.createElement(FormCheckBox, { checked: model.UseExtendedLayout, label: "On/Off", onToggle: (value) => onSettingsToggle("UseExtendedLayout", value), disabled: !model.IsEnabled }))))), /* @__PURE__ */ import_react4.default.createElement("div", { className: "col-9 p-4 bg-black-trans-faded rounded-sm" }, /* @__PURE__ */ import_react4.default.createElement("h2", { className: "mb-2" }, "Tooltips"), /* @__PURE__ */ import_react4.default.createElement("p", { className: "mb-2" }, "Which tooltips you want to enable."), /* @__PURE__ */ import_react4.default.createElement("div", { className: "btn-group pb-4 w-x" }, /* @__PURE__ */ import_react4.default.createElement(Button, { size: "sm", color: tooltipCategory == "general" ? "dark" : "light", onClick: () => onCategoryChanged("general") }, "General"), /* @__PURE__ */ import_react4.default.createElement(Button, { size: "sm", color: tooltipCategory == "citizen" ? "dark" : "light", onClick: () => onCategoryChanged("citizen") }, "Citizen"), /* @__PURE__ */ import_react4.default.createElement(Button, { size: "sm", color: tooltipCategory == "education" ? "dark" : "light", onClick: () => onCategoryChanged("education") }, "Education"), /* @__PURE__ */ import_react4.default.createElement(Button, { size: "sm", color: tooltipCategory == "growables" ? "dark" : "light", onClick: () => onCategoryChanged("growables") }, "Growables"), /* @__PURE__ */ import_react4.default.createElement(Button, { size: "sm", color: tooltipCategory == "nettool" ? "dark" : "light", onClick: () => onCategoryChanged("nettool") }, "NetTool"), /* @__PURE__ */ import_react4.default.createElement(Button, { size: "sm", color: tooltipCategory == "parking" ? "dark" : "light", onClick: () => onCategoryChanged("parking") }, "Parking"), /* @__PURE__ */ import_react4.default.createElement(Button, { size: "sm", color: tooltipCategory == "parks" ? "dark" : "light", onClick: () => onCategoryChanged("parks") }, "Parks & Recreation"), /* @__PURE__ */ import_react4.default.createElement(Button, { size: "sm", color: tooltipCategory == "publictransport" ? "dark" : "light", onClick: () => onCategoryChanged("publictransport") }, "Public Transport"), /* @__PURE__ */ import_react4.default.createElement(Button, { size: "sm", color: tooltipCategory == "roads" ? "dark" : "light", onClick: () => onCategoryChanged("roads") }, "Roads"), /* @__PURE__ */ import_react4.default.createElement(Button, { size: "sm", color: tooltipCategory == "vehicles" ? "dark" : "light", onClick: () => onCategoryChanged("vehicles") }, "Vehicles")), !model.IsEnabled && /* @__PURE__ */ import_react4.default.createElement("div", { className: "alert alert-danger mb-2" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "d-flex flex-row align-items-center" }, /* @__PURE__ */ import_react4.default.createElement(Icon, { fa: true, className: "mr-2", icon: "solid-circle-exclamation" }), /* @__PURE__ */ import_react4.default.createElement("div", null, "Mod is globally disabled!"))), tooltipCategoryContent.find((x) => x["name"] === tooltipCategory).content)));
  }
  var tab_settings_default = TabSettings;

  // src/jsx/styles.jsx
  settingsBoxContainer = "bg-black-trans-less-faded rounded-sm mb-4";
  settingsBoxHeader = "d-flex flex-row align-items-end w-x mb-1";
  settingsBoxIcon = "align-self-flex-start icon-md mr-2";

  // src/jsx/ui.jsx
  var ExtendedTooltipButton = ({ react, setupController }) => {
    const [tooltipVisible, setTooltipVisible] = react.useState(false);
    const onMouseEnter = () => {
      setTooltipVisible(true);
      engine.trigger("audio.playSound", "hover-item", 1);
    };
    const onMouseLeave = () => {
      setTooltipVisible(false);
    };
    const { ToolTip, ToolTipContent, Icon } = window.$_gooee.framework;
    const { model, update } = setupController();
    const onClick = () => {
      const newValue = !model.IsVisible;
      update("IsVisible", newValue);
      engine.trigger("audio.playSound", "select-item", 1);
      if (newValue) {
        engine.trigger("audio.playSound", "open-panel", 1);
        engine.trigger("tool.selectTool", null);
      } else
        engine.trigger("audio.playSound", "close-panel", 1);
    };
    const description = `Open the ExtendedTooltip v${model.Version} panel.`;
    return /* @__PURE__ */ import_react5.default.createElement(import_react5.default.Fragment, null, /* @__PURE__ */ import_react5.default.createElement("div", { className: "spacer_oEi" }), /* @__PURE__ */ import_react5.default.createElement("button", { onMouseEnter, onMouseLeave, onClick, class: "button_s2g button_ECf item_It6 item-mouse-states_Fmi item-selected_tAM item-focused_FuT button_s2g button_ECf item_It6 item-mouse-states_Fmi item-selected_tAM item-focused_FuT toggle-states_X82 toggle-states_DTm" }, /* @__PURE__ */ import_react5.default.createElement(Icon, { className: "icon-lg", icon: "coui://GameUI/Media/Game/Notifications/LeveledUp.svg" }), /* @__PURE__ */ import_react5.default.createElement(ToolTip, { visible: tooltipVisible, float: "up", align: "right" }, /* @__PURE__ */ import_react5.default.createElement(ToolTipContent, { title: "Extended Tooltip", description }))));
  };
  window.$_gooee.register("extendedtooltip", "ExtendedTooltipIconButton", ExtendedTooltipButton, "bottom-right-toolbar", "extendedtooltip");
  var ExtendedTooltipContainer = ({ react, setupController }) => {
    const { Grid, TabModal, Scrollable } = window.$_gooee.framework;
    const { model, update } = setupController();
    const tabs = [
      {
        name: "SETTINGS",
        label: /* @__PURE__ */ import_react5.default.createElement("div", null, "Settings"),
        content: /* @__PURE__ */ import_react5.default.createElement(tab_settings_default, { react, controller: setupController })
      },
      {
        name: "WHATSNEW",
        label: /* @__PURE__ */ import_react5.default.createElement("div", { className: "d-flex flex-row w-x" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "align-self-flex-start icon-sm fa fa-solid-stop mr-2" }), /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex-1 w-x" }, "What's new!")),
        content: /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement(Grid, { className: "h-100", auto: true }, /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("h2", { className: "text-primary mb-2" }, "What's new!"), /* @__PURE__ */ import_react5.default.createElement("div", { className: "bg-black-trans-less-faded rounded-sm" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "p-4" }, /* @__PURE__ */ import_react5.default.createElement("p", { className: "mb-2" }, "Welcome to ExtendedTooltip!"), /* @__PURE__ */ import_react5.default.createElement("p", null, "This mod is developed by Cities2Modding community.")))), /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("h2", { className: "text-muted mb-2" }, "Changelog"), /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("p", null, "These are the last updates of ExtendedTooltip. You can always see more under:")), /* @__PURE__ */ import_react5.default.createElement("div", { className: "bg-black-trans-less-faded rounded-sm flex-1" }, /* @__PURE__ */ import_react5.default.createElement(Scrollable, null, /* @__PURE__ */ import_react5.default.createElement("div", { className: "p-4" }, /* @__PURE__ */ import_react5.default.createElement(changelog_default, null)))))))
      },
      {
        name: "ABOUT",
        label: /* @__PURE__ */ import_react5.default.createElement("div", null, "About"),
        content: /* @__PURE__ */ import_react5.default.createElement("div", null, "Test")
      }
    ];
    const closeModal = () => {
      update("IsVisible", false);
      engine.trigger("audio.playSound", "close-panel", 1);
    };
    return model.IsVisible ? /* @__PURE__ */ import_react5.default.createElement(TabModal, { fixed: true, size: "xl", title: "Extended Tooltip", tabs, onClose: closeModal }) : null;
  };
  window.$_gooee.register("extendedtooltip", "ExtendedTooltipContainer", ExtendedTooltipContainer, "main-container", "extendedtooltip");
  var ExtendedTooltipExampleButton = ({ react, setupController }) => {
    const [tooltipVisible, setTooltipVisible] = react.useState(false);
    const onMouseEnter = () => {
      setTooltipVisible(true);
      engine.trigger("audio.playSound", "hover-item", 1);
    };
    const onMouseLeave = () => {
      setTooltipVisible(false);
    };
    const { ToolTip, ToolTipContent } = window.$_gooee.framework;
    const { model, update } = setupController();
    const onClick = () => {
      const newValue = !model.ShowExample;
      update("ShowExample", newValue);
      engine.trigger("audio.playSound", "select-item", 1);
      if (newValue) {
        engine.trigger("audio.playSound", "open-panel", 1);
        engine.trigger("tool.selectTool", null);
      } else
        engine.trigger("audio.playSound", "close-panel", 1);
    };
    return /* @__PURE__ */ import_react5.default.createElement(import_react5.default.Fragment, null, /* @__PURE__ */ import_react5.default.createElement("div", { className: "spacer_oEi" }), /* @__PURE__ */ import_react5.default.createElement("button", { onMouseEnter, onMouseLeave, onClick, class: "button_s2g button_ECf item_It6 item-mouse-states_Fmi item-selected_tAM item-focused_FuT button_s2g button_ECf item_It6 item-mouse-states_Fmi item-selected_tAM item-focused_FuT toggle-states_X82 toggle-states_DTm" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "fa fa-solid-toolbox icon-lg" }), /* @__PURE__ */ import_react5.default.createElement(ToolTip, { visible: tooltipVisible, float: "up", align: "right" }, /* @__PURE__ */ import_react5.default.createElement(ToolTipContent, { title: "ExtendedTooltip", description: "Open the ExtendedTooltip modal to adjust the mod settings." }))));
  };
  window.$_gooee.register("extendedtooltip", "ExtendedTooltipExampleButton", ExtendedTooltipExampleButton, "bottom-right-toolbar", "extendedtooltip");
  window.$_gooee.register("extendedTooltip", "Example", example_default, "main-container", "extendedtooltip");
})();
/*! Bundled license information:

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
