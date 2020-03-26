#!/usr/bin/env node

'use strict';

var https = require('http');
var request = require('request');
var fs = require('fs');
var CodeGen = require('swagger-js-codegen').CodeGen;
var ts = require('../node_modules/swagger-js-codegen/lib/typescript');
var path = require('path');
var appConfig = require('../src/config/app.config.js');
// var config = appConfig(getEnvironment());
// var services = config.LIST_SWAGGER_CONF_ENDPOINTS.local; 
const services = [
	{
		'className': 'pmsAPI',
		'apiName': 'pms',
		'url': 'http://tenant.internal-pms.stage-codal.net',
		'path': '../src/app/services/swagger-providers/pms-api.provider.ts',
		'sub_path': '/api/doc?format=openapi'
	}
];

console.log('process.argv[2]', process.argv[2])
console.log('services', services)

// if (process.argv[2] != undefined) {
// 	if (process.argv[2] == 'dev') {
// 		var services = config.LIST_SWAGGER_CONF_ENDPOINTS.dev;
// 	} else if (process.argv[2] == 'qa') {
// 		var services = config.LIST_SWAGGER_CONF_ENDPOINTS.qa;
// 	} else if (process.argv[2] == 'production') {
// 		var services = config.LIST_SWAGGER_CONF_ENDPOINTS.production;
// 	}
// }
/**
 * Environment configuration custom parameters
 */
function getEnvironment() {

	return process.argv[1];
}

/**
 * Gets JSON spec from a given host and path (url)
 * @param host
 * @param path
 * @param callback
 */
function getSpec(host, path, callback) {
	// console.log('Calling ', host + path);

	var options = {};
	options["url"] = host + path;
	options["headers"] = {
		"Content-Type": "application/json"
	};
	options["method"] = "GET";
	request(options, function (l_error, l_response, l_body) {
		if (l_error) {
			callback(null, l_error);
			return;
		}
		var data = JSON.parse(l_body);
		callback(data, null);
	});
}

/**
 * Goes through the services and generate the corresponding
 * provider file.
 */
function generateProviderFiles() {
	for (var i = 0; i < services.length; i++) {
		generateProviderFile(services[i]);
	}
}

/**
 * Generates the provider file for the corresponding service
 * @param service
 */
function generateProviderFile(service) {
	getSpec(service['url'], service['sub_path'], function (swagger, error) {
		if (error) {
			console.log(error);
		} else {
			handleSwaggerResponse(service, swagger);
		}
	});
}

/**
 * Handles swagger response
 * @param serviceObject
 * @param swagger
 */
function handleSwaggerResponse(serviceObject, swagger) {
	var source = CodeGen.getCustomCode({
		moduleName: serviceObject['apiName'],
		className: serviceObject['className'],
		lint: false,
		swagger: swagger,
		template: getTemplatesObject(),
		apiName: serviceObject['apiName'],
		mustache: {
			getLowercaseMethod: function getCapitalMethod() {
				return function (val, render) {
					return this.method.toLowerCase();
				}
			},
			hasFormParameter: function hasFormParameter() {
				var isFormRequest = false;
				if (this.parameters && Array.isArray(this.parameters)) {
					this.parameters.forEach(function (parameter) {
						if (parameter.isFormParameter) {
							isFormRequest = true;
						}
					});
				}
				return isFormRequest;
			},
			hasResponseBody: function hasResponseBody() {
				return this.method.toLowerCase() !== 'delete';
			},
			getResponseType: function () {
				return function (val, render) {
					// get the swagger definition for this calling context
					var swaggerDef = swagger.paths[this.path][this.method.toLowerCase()];
					return processSuccessResponses(swaggerDef, render);
				};
			},
			getName: function getName() {
				return function (val, render) {

					var displayName = this.name;
					// if property contains a hyphen, we quote the property so that
					// we don't get JS error
					if (this.name.match(/\-/)) {
						displayName = '"' + this.name + '"';
					}
					return displayName;
				};
			},
			getApiUrl: function () {
				return function (val, render) {
					return '"' + serviceObject['url'] + '"';
				}
			},
			getType: function getType() {
				function identity(x) {
					return x;
				}
				return function _getType(val, render) {
					if (this.tsType.isRef) {
						return render(this.tsType.target);
					}

					if (this.tsType.isArray) {
						return render('Array<' + _getType.call({
							tsType: this.tsType.elementType
						}, null, identity) + '>');
					}

					if (this.tsType.isObject) {
						return render('any');
					}
					return render(this.tsType.tsType);
				};
			},
			definitions: mapSwaggerDefinitions({})
		}
	});
	// generate corresponding file
	fs.writeFileSync(path.join(__dirname, serviceObject['path']), source);
	console.log(serviceObject['className'] + ' file generated at ' + serviceObject['path']);
}

/**
 * Returns an object containing the class, method and request mustache template files
 * @returns {{class: (string|Buffer), method: (string|Buffer), request: (string|Buffer)}}
 */
function getTemplatesObject() {
	var templateDir = path.join(__dirname, 'templates');
	return {
		class: fs.readFileSync(path.join(templateDir, 'class.mustache'), 'utf-8'),
		method: fs.readFileSync(path.join(templateDir, 'method.mustache'), 'utf-8'),
		request: fs.readFileSync(path.join(templateDir, 'request.mustache'), 'utf-8')
	};
}

/**
 * Maps swagger definitions
 * @param swaggerDefinitions
 * @returns {U[]|Array}
 */
function mapSwaggerDefinitions(swaggerDefinitions) {
	return Object.keys(swaggerDefinitions).map(function (defName) {
		var definition = swaggerDefinitions[defName];
		return {
			name: defName,
			properties: Object.keys(definition.properties || {}).map(function mapProperties(propertyName) {
				var property = definition.properties[propertyName];

				var prop = {
					name: propertyName,
					type: property.type,
					$ref: property.ref,
					cardinality: (definition.required || []).indexOf(propertyName) !== -1 ? '' : '?',
					items: property.items
				};

				prop.tsType = ts.convertType(prop);
				return prop;
			})
		};
	})
}

/**
 * Process the success responses from swagger api
 * @param swaggerDef
 * @returns {*}
 */
function processSuccessResponses(swaggerDef, render) {
	var successResponseTypes = [];
	// check the success responses for type
	for (var responseCode in swaggerDef.responses) {
		if (responseCode >= 200 && responseCode <= 299) {
			// by default, the type is 'any'
			var successResponseType = 'any';
			var response = swaggerDef.responses[responseCode];

			// attempt to get the corresponding TS type
			if (response.schema) {
				var tsType = ts.convertType(response.schema);
				if (tsType.isRef) {
					successResponseType = tsType.target + 'Wrapper';
				} else {
					successResponseType = tsType.tsType;
				}
			}

			// use 'any' as the type instead of a type union, as 'any' includes everything
			if (successResponseType === 'any') {
				return render('any');
			}

			successResponseTypes.push(successResponseType);
		}
	}
	return render(successResponseTypes.join('|') || 'any');
}

generateProviderFiles();
