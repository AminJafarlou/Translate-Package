"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var prettier_1 = require("prettier");
//@ts-ignore
var translate_google_1 = __importDefault(require("translate-google"));
function generate() {
    return __awaiter(this, void 0, void 0, function () {
        var configString, config, source, sourceLanguage, isOldSourceExisting, oldSource, similarKeys, keysWithChangedValues, keysWithChangedValuesObject;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    configString = fs_1.default.readFileSync('./localize.config.json');
                    config = configString && JSON.parse(configString.toString());
                    if (!config) {
                        console.log('localize.config.json Not found');
                    }
                    source = require(path_1.default.resolve(config.source));
                    sourceLanguage = config.source.split('/').reverse()[0].split('.')[0];
                    isOldSourceExisting = fs_1.default.existsSync(path_1.default.resolve('./test/oldSource.js'));
                    oldSource = isOldSourceExisting
                        ? require(path_1.default.resolve('./test/oldSource.js'))
                        : {};
                    similarKeys = Object.keys(source).filter(function (item) {
                        return Object.keys(oldSource).includes(item);
                    });
                    keysWithChangedValues = similarKeys.filter(function (item) { return source[item] !== oldSource[item]; });
                    keysWithChangedValuesObject = keysWithChangedValues.reduce(function (obj, item) {
                        obj[item] = source[item];
                        return obj;
                    }, {});
                    // Loop the translation for every language
                    config.languages.forEach(function (language) { return __awaiter(_this, void 0, void 0, function () {
                        var fileName, isFileExisting, outputObject, remainingKeys, inputObject, reducer, i, slicedObj, result, finalResult;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    fileName = language + ".js";
                                    isFileExisting = fs_1.default.existsSync(path_1.default.resolve(config.out, fileName));
                                    outputObject = isFileExisting
                                        ? require(path_1.default.resolve(config.out, fileName))
                                        : {};
                                    remainingKeys = Object.keys(source).filter(function (key) { return !Object.keys(outputObject).includes(key); });
                                    inputObject = remainingKeys.reduce(function (obj, item) {
                                        obj[item] = source[item];
                                        return obj;
                                    }, {});
                                    // Adding keys whose values are changed in source to input object
                                    inputObject = Object.assign(inputObject, keysWithChangedValuesObject);
                                    reducer = {};
                                    i = 0;
                                    _a.label = 1;
                                case 1:
                                    if (!(i < Object.keys(inputObject).length)) return [3 /*break*/, 4];
                                    slicedObj = i + 50 > Object.keys(inputObject).length - 1
                                        ? Object.entries(inputObject)
                                            .slice(i, Object.keys(inputObject).length)
                                            .reduce(function (obj, _a) {
                                            var _b;
                                            var key = _a[0], value = _a[1];
                                            return (obj = __assign(__assign({}, obj), (_b = {}, _b[key] = value, _b)));
                                        }, {})
                                        : Object.entries(inputObject)
                                            .slice(i, i + 50)
                                            .reduce(function (obj, _a) {
                                            var _b;
                                            var key = _a[0], value = _a[1];
                                            return (obj = __assign(__assign({}, obj), (_b = {}, _b[key] = value, _b)));
                                        }, {});
                                    return [4 /*yield*/, (0, translate_google_1.default)(slicedObj, {
                                            from: sourceLanguage,
                                            to: language,
                                        })];
                                case 2:
                                    result = _a.sent();
                                    Object.assign(reducer, result);
                                    _a.label = 3;
                                case 3:
                                    i += 50;
                                    return [3 /*break*/, 1];
                                case 4:
                                    finalResult = Object.assign(outputObject, reducer);
                                    // Sorting the object before writing it in the outDir
                                    finalResult = Object.keys(finalResult)
                                        .sort()
                                        .reduce(function (obj, key) {
                                        obj[key] = finalResult[key];
                                        return obj;
                                    }, {});
                                    fs_1.default.writeFileSync(path_1.default.resolve(config.out, fileName), (0, prettier_1.format)("\n      // This File is Auto-Generated don't change manually\n\n        const " + language + " = " + JSON.stringify(finalResult) + "\n\n        module.exports = " + language + ";\n      ", {
                                        filepath: path_1.default.resolve(config.out, fileName),
                                    }));
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    // Make a copy of source file for future comparisons
                    return [4 /*yield*/, fs_1.default.copyFileSync(config.source, './test/oldSource.js')];
                case 1:
                    // Make a copy of source file for future comparisons
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.generate = generate;
