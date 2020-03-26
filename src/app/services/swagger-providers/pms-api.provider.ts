import {
    Http,
    Headers,
    Response
} from "@angular/http";
import {
    Observable
} from "rxjs/Observable";
import "rxjs/Rx";
import {
    Injectable
} from "@angular/core";
import 'rxjs/add/operator/map';

/**
 * 
 * @class pmsAPI
 * @param {(string)} [domainOrOptions] - The project domain.
 */
@Injectable()
export class pmsAPI {

    private domain: string;

    constructor(private http: Http) { //had to include HTTP_PROVIDERS in bootstrap (global) for this to work. Workaround needed
        //   this.domain = "http://tenant.internal-pms.stage-codal.net";
        var host = window.location.host;
        var proto = window.location.protocol;
        if (host && host.match('localhost')) {
            this.domain = 'http://tenant.internal-pms.stage-codal.net';
        } else {
            this.domain = proto + '//' + host;
        }
    }

    /**
     * Handles api call error
     * @param {any} error
     * @returns {ErrorObservable}
     */
    private handleError(error: any) {
        let errMsg = error || {
            status: 500
        };
        return Observable.throw(errMsg);
    }

    /**
     * Set pattern type parameters
     * @param {string} pattern - the regex pattern
     * @returns {Object} the query parameters
     */
    private setPatternTypeParameter(pattern, queryParameters, parameters) {
        Object.keys(parameters).forEach(function(parameterName) {
            if (new RegExp(pattern).test(parameterName)) {
                queryParameters[parameterName] = parameters[parameterName];
            }
        });
        return queryParameters;
    }

    /**
     * Set pattern type parameters
     * @param {string} camelCaseName - the camel case name of the parameter
     * @param {string} name - the name of the parameter
     * @returns {Object} the query parameters
     */
    private setNonPatternTypeParameter(camelCaseName: string, name: string, queryParameters, parameters) {
        if (parameters[camelCaseName] !== undefined) {
            queryParameters[name] = parameters[camelCaseName];
        }
        return queryParameters;
    }

    /**
     * Returns the api call url
     * @param {string} path - the path of the endpoint
     * @param {Object} queryParameters - the corresponding query parameters
     * @returns {string} - the complete query api call url
     */
    private getUrl(path: string, queryParameters) {

        let paramsStr = Object.keys(queryParameters).map(function(key) {
            return key + '=' + encodeURIComponent(queryParameters[key]);
        }).join('&');

        let url = paramsStr ? this.domain + path + '?' + paramsStr : this.domain + path;
        return url;
    }

    /**
     * Returns the query parameters
     * @param {Object} parameters - the api call parameters
     * @param queryParameters - the corresponding query parameters
     * @returns {Object} - the query parameters of the api call
     */
    private setQueryParameters(parameters, queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
            var parameter = parameters.$queryParameters[parameterName];
            queryParameters[parameterName] = parameter;
        });
        return queryParameters;
    }

    /**
     * User related operations
     * @method
     * @name pmsAPI#siteconfig_list
     * @param {string} authorization - Authorization
     * @param {integer} page - A page number within the paginated result set.
     * @param {integer} pageSize - Number of results to return per page.
     *
     */
    siteconfig_list(parameters: {
        'authorization' ? : string,
        'page' ? : number,
        'pageSize' ? : number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/account/siteconfig/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('page', 'page', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('pageSize', 'page_size', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * User related operations
     * @method
     * @name pmsAPI#siteconfig_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this site config.
     *
     */
    siteconfig_read(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/account/siteconfig/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#userrole_list
     * @param {string} authorization - Authorization
     * @param {string} company - To get role listing
     * @param {boolean} isAdmin - To get list of roles with or with out admins
     *
     */
    userrole_list(parameters: {
        'authorization' ? : string,
        'company' ? : string,
        'isAdmin' ? : boolean,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/account/userrole/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('company', 'company', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('isAdmin', 'is_admin', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#userrole_create
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    userrole_create(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/account/userrole/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#userrole_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this user role.
     *
     */
    userrole_read(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/account/userrole/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#userrole_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this user role.
     * @param {} data - 
     *
     */
    userrole_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/account/userrole/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.put(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#userrole_partial_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this user role.
     * @param {} data - 
     *
     */
    userrole_partial_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/account/userrole/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.patch(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#userrole_delete
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this user role.
     *
     */
    userrole_delete(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/account/userrole/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.delete(url, requestOptionArgs)
            .catch(this.handleError);
    };
    /**
     * User related operations
     * @method
     * @name pmsAPI#users_list
     * @param {string} authorization - Authorization
     * @param {integer} page - A page number within the paginated result set.
     * @param {integer} pageSize - Number of results to return per page.
     *
     */
    users_list(parameters: {
        'authorization' ? : string,
        'page' ? : number,
        'pageSize' ? : number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/account/users/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('page', 'page', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('pageSize', 'page_size', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * User related operations
     * @method
     * @name pmsAPI#users_create
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    users_create(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/account/users/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
    * GET IdentityID and Token from Cognito
    upload permission to directory bucket/< IdentityId > only

    To test upload. go to : <a href="/api/account/users/aws_upload_test" target="_blank">/api/account/users/aws_upload_test</a>
    * @method
    * @name pmsAPI#users_awsIdentity
         * @param {string} authorization - Authorization
    *
    */
    users_awsIdentity(parameters: {
        'authorization' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/account/users/awsIdentity/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
    * Set bucketName, bucketRegion, IdentityId, webtoken to upload directly to AWS.
    use that url to associate file to table(model)
    * @method
    * @name pmsAPI#users_aws_upload_test
         * @param {string} authorization - Authorization
    *
    */
    users_aws_upload_test(parameters: {
        'authorization' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/account/users/aws_upload_test/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
    * Change Or Reset password
    Required reset_password_token only if not logged in ( For reset password )
    * @method
    * @name pmsAPI#users_changePassword
         * @param {string} authorization - Authorization
         * @param {} data - 
    *
    */
    users_changePassword(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/account/users/changePassword/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * check if email already exists.
     * @method
     * @name pmsAPI#users_checkDuplicateEmail
     * @param {string} authorization - Authorization
     * @param {string} email - check for duplicate Email address.
     *
     */
    users_checkDuplicateEmail(parameters: {
        'authorization' ? : string,
        'email': string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/account/users/checkDuplicateEmail/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['email'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: email'));
        //}

        queryParameters = this.setNonPatternTypeParameter('email', 'email', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * google auth
     * @method
     * @name pmsAPI#users_google_login
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    users_google_login(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/account/users/google_login/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * device_id : For only ios and android
     * @method
     * @name pmsAPI#users_login
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    users_login(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/account/users/login/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * Logout based on the token in the header for logged in user.
     * @method
     * @name pmsAPI#users_logout
     * @param {string} authorization - Authorization
     *
     */
    users_logout(parameters: {
        'authorization' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/account/users/logout/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
    * Send email with reset password link and set password reset token
    to requested user.
    * @method
    * @name pmsAPI#users_resetPassword
         * @param {string} authorization - Authorization
         * @param {} data - 
    *
    */
    users_resetPassword(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/account/users/resetPassword/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * User related operations
     * @method
     * @name pmsAPI#users_verifyAccount
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    users_verifyAccount(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/account/users/verifyAccount/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * User related operations
     * @method
     * @name pmsAPI#users_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this user.
     *
     */
    users_read(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/account/users/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * User related operations
     * @method
     * @name pmsAPI#users_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this user.
     * @param {} data - 
     *
     */
    users_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/account/users/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.put(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * User related operations
     * @method
     * @name pmsAPI#users_partial_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this user.
     * @param {} data - 
     *
     */
    users_partial_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/account/users/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.patch(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * User related operations
     * @method
     * @name pmsAPI#users_delete
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this user.
     *
     */
    users_delete(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/account/users/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.delete(url, requestOptionArgs)
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#account_list
     * @param {string} authorization - Authorization
     * @param {integer} page - A page number within the paginated result set.
     * @param {integer} pageSize - Number of results to return per page.
     *
     */
    account_list(parameters: {
        'authorization' ? : string,
        'page' ? : number,
        'pageSize' ? : number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/company/account/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('page', 'page', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('pageSize', 'page_size', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#account_create
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    account_create(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/company/account/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#account_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this account.
     *
     */
    account_read(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/company/account/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#account_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this account.
     * @param {} data - 
     *
     */
    account_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/company/account/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.put(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#account_partial_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this account.
     * @param {} data - 
     *
     */
    account_partial_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/company/account/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.patch(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#account_delete
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this account.
     *
     */
    account_delete(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/company/account/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.delete(url, requestOptionArgs)
            .catch(this.handleError);
    };
    /**
    * * API for listing company
        ```
            (1) query parameter for listing,

                (a) is_owner:

                    To get list of accounts,
                     False (This will exclude the owner company)

                    Example:
                           is_owner = False

            (2) query parameters for sorting(ordering)

                (a) name:

                    "name" (ascending),
                    "-name" (descending)

                (b) owner_name:

                    "owner_name" (ascending),
                    "-owner_name" (descending)

            (3) query parameters for searching,

                (a) currently searching will work these fields,
                    name, owner name

        ```
    * @method
    * @name pmsAPI#company_list
         * @param {string} authorization - Authorization
         * @param {integer} page - A page number within the paginated result set.
         * @param {integer} pageSize - Number of results to return per page.
         * @param {string} isOwner - 
         * @param {string} search - A search term.
         * @param {string} ordering - Which field to use when ordering the results.
    *
    */
    company_list(parameters: {
        'authorization' ? : string,
        'page' ? : number,
        'pageSize' ? : number,
        'isOwner' ? : string,
        'search' ? : string,
        'ordering' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/company/company/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('page', 'page', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('pageSize', 'page_size', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('isOwner', 'is_owner', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('search', 'search', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('ordering', 'ordering', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
    * * API to create comapany
        ```
        {
          "name": "The ONE",
          "address_one": "address line one",
          "address_two": "address line two",
          "city": "ahmedabad",
          "state": "Gujarat",
          "zip_code": "380001",
          "owner_name": "Abhishek",
          "owner_email": "agelot@codal.com",
          "owner_contact": "+918401328198",
          "uber_access_code" : "theone"
        }

         ```
    * @method
    * @name pmsAPI#company_create
         * @param {string} authorization - Authorization
         * @param {} data - 
    *
    */
    company_create(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/company/company/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#company_company_list
     * @param {string} authorization - Authorization
     *
     */
    company_company_list(parameters: {
        'authorization' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/company/company/company_list/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#company_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this company.
     * @param {string} isOwner - 
     * @param {string} search - A search term.
     * @param {string} ordering - Which field to use when ordering the results.
     *
     */
    company_read(parameters: {
        'authorization' ? : string,
        'id': number,
        'isOwner' ? : string,
        'search' ? : string,
        'ordering' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/company/company/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('isOwner', 'is_owner', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('search', 'search', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('ordering', 'ordering', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#company_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this company.
     * @param {string} isOwner - 
     * @param {string} search - A search term.
     * @param {string} ordering - Which field to use when ordering the results.
     * @param {} data - 
     *
     */
    company_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'isOwner' ? : string,
        'search' ? : string,
        'ordering' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/company/company/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('isOwner', 'is_owner', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('search', 'search', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('ordering', 'ordering', queryParameters, parameters);

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.put(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#company_partial_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this company.
     * @param {string} isOwner - 
     * @param {string} search - A search term.
     * @param {string} ordering - Which field to use when ordering the results.
     * @param {} data - 
     *
     */
    company_partial_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'isOwner' ? : string,
        'search' ? : string,
        'ordering' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/company/company/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('isOwner', 'is_owner', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('search', 'search', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('ordering', 'ordering', queryParameters, parameters);

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.patch(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#company_delete
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this company.
     * @param {string} isOwner - 
     * @param {string} search - A search term.
     * @param {string} ordering - Which field to use when ordering the results.
     *
     */
    company_delete(parameters: {
        'authorization' ? : string,
        'id': number,
        'isOwner' ? : string,
        'search' ? : string,
        'ordering' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/company/company/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('isOwner', 'is_owner', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('search', 'search', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('ordering', 'ordering', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.delete(url, requestOptionArgs)
            .catch(this.handleError);
    };
    /**
    * * API for listing company users
        ```
            (1) query parameters for listing,

                (a) user_type:

                    To get listing according to roles,pass ids in user_type,
                     id = 1 (Super Admin)
                     id = 2 (Admin)
                     id = 3 (Account Manager)
                     id = 4 (Employee)
                     id = 5 (Client Admin)
                     id = 6 (Client User)

                    Example:
                            if you want listing of Super Admin and Admins then
                            pass user_type = 1,2

                            if you want listing of excluding the roles then
                            pass user_type = not,1,2 (add "not," in start)

                (b) in_owner_company:

                    To get owner company's users list,
                    in_owner_company = True

                    To get client company's users list,
                    in_owner_company = False

            (2) query parameters for sorting(ordering),

                (a) name:

                    "company_user__first_name" (ascending),
                    "-company_user__first_name" (descending)

                (b) team:

                    "team__team_name" (ascending),
                    "-team__team_name" (descending)

                (c) location:

                     "location" (ascending),
                     "-location" (descending)

                (d) created(date):

                     "created_timestamp" (ascending),
                     "-created_timestamp" (descending)

                Example:
                        ordering = "created_timestamp,-company_user__first_name"

            (3) query parameters for searching,

                (a) currently searching will work these fields,
                    name, email, team name, location, date


         ```
    * @method
    * @name pmsAPI#companyuser_list
         * @param {string} authorization - Authorization
         * @param {integer} page - A page number within the paginated result set.
         * @param {integer} pageSize - Number of results to return per page.
         * @param {string} userType - 
         * @param {string} companyId - 
         * @param {string} inOwnerCompany - 
         * @param {string} search - A search term.
         * @param {string} ordering - Which field to use when ordering the results.
    *
    */
    companyuser_list(parameters: {
        'authorization' ? : string,
        'page' ? : number,
        'pageSize' ? : number,
        'userType' ? : string,
        'companyId' ? : string,
        'inOwnerCompany' ? : string,
        'search' ? : string,
        'ordering' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/company/companyuser/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('page', 'page', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('pageSize', 'page_size', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('userType', 'user_type', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('companyId', 'company_id', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('inOwnerCompany', 'in_owner_company', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('search', 'search', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('ordering', 'ordering', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#companyuser_create
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    companyuser_create(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/company/companyuser/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#companyuser_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this company user.
     * @param {string} userType - 
     * @param {string} companyId - 
     * @param {string} inOwnerCompany - 
     * @param {string} search - A search term.
     * @param {string} ordering - Which field to use when ordering the results.
     *
     */
    companyuser_read(parameters: {
        'authorization' ? : string,
        'id': number,
        'userType' ? : string,
        'companyId' ? : string,
        'inOwnerCompany' ? : string,
        'search' ? : string,
        'ordering' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/company/companyuser/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('userType', 'user_type', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('companyId', 'company_id', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('inOwnerCompany', 'in_owner_company', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('search', 'search', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('ordering', 'ordering', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#companyuser_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this company user.
     * @param {string} userType - 
     * @param {string} companyId - 
     * @param {string} inOwnerCompany - 
     * @param {string} search - A search term.
     * @param {string} ordering - Which field to use when ordering the results.
     * @param {} data - 
     *
     */
    companyuser_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'userType' ? : string,
        'companyId' ? : string,
        'inOwnerCompany' ? : string,
        'search' ? : string,
        'ordering' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/company/companyuser/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('userType', 'user_type', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('companyId', 'company_id', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('inOwnerCompany', 'in_owner_company', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('search', 'search', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('ordering', 'ordering', queryParameters, parameters);

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.put(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
    * * API for partial update company user
        ```
            (1) request body for listing,
            user_role:
                     1 (Super Admin)
                     2 (Admin)
                     3 (Account Manager)
                     4 (Employee)
                     5 (Client Admin)
                     6 (Client User)
        ```
    * @method
    * @name pmsAPI#companyuser_partial_update
         * @param {string} authorization - Authorization
         * @param {integer} id - A unique integer value identifying this company user.
         * @param {string} userType - 
         * @param {string} companyId - 
         * @param {string} inOwnerCompany - 
         * @param {string} search - A search term.
         * @param {string} ordering - Which field to use when ordering the results.
         * @param {} data - 
    *
    */
    companyuser_partial_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'userType' ? : string,
        'companyId' ? : string,
        'inOwnerCompany' ? : string,
        'search' ? : string,
        'ordering' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/company/companyuser/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('userType', 'user_type', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('companyId', 'company_id', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('inOwnerCompany', 'in_owner_company', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('search', 'search', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('ordering', 'ordering', queryParameters, parameters);

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.patch(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#companyuser_delete
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this company user.
     * @param {string} userType - 
     * @param {string} companyId - 
     * @param {string} inOwnerCompany - 
     * @param {string} search - A search term.
     * @param {string} ordering - Which field to use when ordering the results.
     *
     */
    companyuser_delete(parameters: {
        'authorization' ? : string,
        'id': number,
        'userType' ? : string,
        'companyId' ? : string,
        'inOwnerCompany' ? : string,
        'search' ? : string,
        'ordering' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/company/companyuser/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('userType', 'user_type', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('companyId', 'company_id', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('inOwnerCompany', 'in_owner_company', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('search', 'search', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('ordering', 'ordering', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.delete(url, requestOptionArgs)
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#invitation_accept_invitation
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    invitation_accept_invitation(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/company/invitation/accept_invitation/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.patch(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
    * ```
    list of permissions:
         permission = 1 (Super Admin)
         permission = 2 (Admin)
         permission = 3 (Account Manager)
         permission = 4 (Employee)
         permission = 5 (Client Admin)
         permission = 6 (Client User)

    * SAMPLE DATA
        {
          "data" :[
                    {
                      "first_name" : "abhishek",
                      "last_name" : "gelot",
                      "email": "agelot@codal.com",
                      "permission" : "2"
                    },
                    {
                      "first_name" : "rahul",
                      "last_name" : "raval",
                      "email": "rraval@codal.com",
                      "permission" : "0"
                    }
                ],
          "company" : {"company_id" : "2"}
        }
    ```
    * @method
    * @name pmsAPI#invitation_send_invitation
         * @param {string} authorization - Authorization
         * @param {} data - 
    *
    */
    invitation_send_invitation(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/company/invitation/send_invitation/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for BoardData CRUD operations
     * @method
     * @name pmsAPI#boardlist_list
     * @param {string} authorization - Authorization
     * @param {integer} page - A page number within the paginated result set.
     * @param {integer} pageSize - Number of results to return per page.
     *
     */
    boardlist_list(parameters: {
        'authorization' ? : string,
        'page' ? : number,
        'pageSize' ? : number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/dashboard/boardlist/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('page', 'page', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('pageSize', 'page_size', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for BoardData CRUD operations
     * @method
     * @name pmsAPI#boardlist_create
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    boardlist_create(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/dashboard/boardlist/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for BoardData CRUD operations
     * @method
     * @name pmsAPI#boardlist_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this boarddata.
     *
     */
    boardlist_read(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/dashboard/boardlist/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for BoardData CRUD operations
     * @method
     * @name pmsAPI#boardlist_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this boarddata.
     * @param {} data - 
     *
     */
    boardlist_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/dashboard/boardlist/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.put(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for BoardData CRUD operations
     * @method
     * @name pmsAPI#boardlist_partial_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this boarddata.
     * @param {} data - 
     *
     */
    boardlist_partial_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/dashboard/boardlist/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.patch(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for BoardData CRUD operations
     * @method
     * @name pmsAPI#boardlist_delete
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this boarddata.
     *
     */
    boardlist_delete(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/dashboard/boardlist/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.delete(url, requestOptionArgs)
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#file_list
     * @param {string} authorization - Authorization
     * @param {integer} page - A page number within the paginated result set.
     * @param {integer} pageSize - Number of results to return per page.
     *
     */
    file_list(parameters: {
        'authorization' ? : string,
        'page' ? : number,
        'pageSize' ? : number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/files/file/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('page', 'page', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('pageSize', 'page_size', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#file_create
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    file_create(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/files/file/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#file_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this file.
     *
     */
    file_read(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/files/file/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#file_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this file.
     * @param {} data - 
     *
     */
    file_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/files/file/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.put(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#file_partial_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this file.
     * @param {} data - 
     *
     */
    file_partial_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/files/file/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.patch(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#file_delete
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this file.
     *
     */
    file_delete(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/files/file/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.delete(url, requestOptionArgs)
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#files_in_project_list
     * @param {string} authorization - Authorization
     * @param {integer} page - A page number within the paginated result set.
     * @param {integer} pageSize - Number of results to return per page.
     * @param {string} projectId - 
     *
     */
    files_in_project_list(parameters: {
        'authorization' ? : string,
        'page' ? : number,
        'pageSize' ? : number,
        'projectId' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/files/files_in_project/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('page', 'page', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('pageSize', 'page_size', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('projectId', 'project_id', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#files_in_project_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this file.
     * @param {string} projectId - 
     *
     */
    files_in_project_read(parameters: {
        'authorization' ? : string,
        'id': number,
        'projectId' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/files/files_in_project/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('projectId', 'project_id', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#files_in_task_list
     * @param {string} authorization - Authorization
     * @param {integer} page - A page number within the paginated result set.
     * @param {integer} pageSize - Number of results to return per page.
     * @param {string} taskId - 
     *
     */
    files_in_task_list(parameters: {
        'authorization' ? : string,
        'page' ? : number,
        'pageSize' ? : number,
        'taskId' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/files/files_in_task/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('page', 'page', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('pageSize', 'page_size', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('taskId', 'task_id', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#files_in_task_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this file.
     * @param {string} taskId - 
     *
     */
    files_in_task_read(parameters: {
        'authorization' ? : string,
        'id': number,
        'taskId' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/files/files_in_task/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('taskId', 'task_id', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#locker_list
     * @param {string} authorization - Authorization
     * @param {integer} page - A page number within the paginated result set.
     * @param {integer} pageSize - Number of results to return per page.
     *
     */
    locker_list(parameters: {
        'authorization' ? : string,
        'page' ? : number,
        'pageSize' ? : number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/files/locker/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('page', 'page', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('pageSize', 'page_size', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#locker_create
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    locker_create(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/files/locker/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#locker_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this locker.
     *
     */
    locker_read(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/files/locker/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#locker_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this locker.
     * @param {} data - 
     *
     */
    locker_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/files/locker/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.put(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#locker_partial_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this locker.
     * @param {} data - 
     *
     */
    locker_partial_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/files/locker/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.patch(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#locker_delete
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this locker.
     *
     */
    locker_delete(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/files/locker/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.delete(url, requestOptionArgs)
            .catch(this.handleError);
    };
    /**
     * View for PendingFile CRUD operations
     * @method
     * @name pmsAPI#pendingfile_list
     * @param {string} authorization - Authorization
     * @param {integer} page - A page number within the paginated result set.
     * @param {integer} pageSize - Number of results to return per page.
     *
     */
    pendingfile_list(parameters: {
        'authorization' ? : string,
        'page' ? : number,
        'pageSize' ? : number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/files/pendingfile/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('page', 'page', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('pageSize', 'page_size', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for PendingFile CRUD operations
     * @method
     * @name pmsAPI#pendingfile_create
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    pendingfile_create(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/files/pendingfile/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for PendingFile CRUD operations
     * @method
     * @name pmsAPI#pendingfile_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this pending file.
     *
     */
    pendingfile_read(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/files/pendingfile/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for PendingFile CRUD operations
     * @method
     * @name pmsAPI#pendingfile_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this pending file.
     * @param {} data - 
     *
     */
    pendingfile_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/files/pendingfile/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.put(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for PendingFile CRUD operations
     * @method
     * @name pmsAPI#pendingfile_partial_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this pending file.
     * @param {} data - 
     *
     */
    pendingfile_partial_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/files/pendingfile/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.patch(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for PendingFile CRUD operations
     * @method
     * @name pmsAPI#pendingfile_delete
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this pending file.
     *
     */
    pendingfile_delete(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/files/pendingfile/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.delete(url, requestOptionArgs)
            .catch(this.handleError);
    };
    /**
     * View for PendingFile CRUD operations
     * @method
     * @name pmsAPI#author_id_list
     * @param {string} authorization - Authorization
     * @param {integer} page - A page number within the paginated result set.
     * @param {integer} pageSize - Number of results to return per page.
     *
     */
    author_id_list(parameters: {
        'authorization' ? : string,
        'page' ? : number,
        'pageSize' ? : number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/message/author_id/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('page', 'page', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('pageSize', 'page_size', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for PendingFile CRUD operations
     * @method
     * @name pmsAPI#author_id_create
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    author_id_create(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/message/author_id/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for PendingFile CRUD operations
     * @method
     * @name pmsAPI#author_id_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this a author_id.
     *
     */
    author_id_read(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/message/author_id/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for PendingFile CRUD operations
     * @method
     * @name pmsAPI#author_id_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this a author_id.
     * @param {} data - 
     *
     */
    author_id_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/message/author_id/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.put(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for PendingFile CRUD operations
     * @method
     * @name pmsAPI#author_id_partial_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this a author_id.
     * @param {} data - 
     *
     */
    author_id_partial_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/message/author_id/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.patch(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for PendingFile CRUD operations
     * @method
     * @name pmsAPI#author_id_delete
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this a author_id.
     *
     */
    author_id_delete(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/message/author_id/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.delete(url, requestOptionArgs)
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#message_list
     * @param {string} authorization - Authorization
     * @param {integer} page - A page number within the paginated result set.
     * @param {integer} pageSize - Number of results to return per page.
     * @param {string} project - 
     * @param {string} category - 
     * @param {string} parentMessage - 
     *
     */
    message_list(parameters: {
        'authorization' ? : string,
        'page' ? : number,
        'pageSize' ? : number,
        'project' ? : string,
        'category' ? : string,
        'parentMessage' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/message/message/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('page', 'page', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('pageSize', 'page_size', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('project', 'project', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('category', 'category', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('parentMessage', 'parent_message', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#message_create
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    message_create(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/message/message/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#message_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this message.
     * @param {string} project - 
     * @param {string} category - 
     * @param {string} parentMessage - 
     *
     */
    message_read(parameters: {
        'authorization' ? : string,
        'id': number,
        'project' ? : string,
        'category' ? : string,
        'parentMessage' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/message/message/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('project', 'project', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('category', 'category', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('parentMessage', 'parent_message', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#message_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this message.
     * @param {string} project - 
     * @param {string} category - 
     * @param {string} parentMessage - 
     * @param {} data - 
     *
     */
    message_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'project' ? : string,
        'category' ? : string,
        'parentMessage' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/message/message/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('project', 'project', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('category', 'category', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('parentMessage', 'parent_message', queryParameters, parameters);

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.put(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#message_partial_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this message.
     * @param {string} project - 
     * @param {string} category - 
     * @param {string} parentMessage - 
     * @param {} data - 
     *
     */
    message_partial_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'project' ? : string,
        'category' ? : string,
        'parentMessage' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/message/message/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('project', 'project', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('category', 'category', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('parentMessage', 'parent_message', queryParameters, parameters);

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.patch(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#message_delete
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this message.
     * @param {string} project - 
     * @param {string} category - 
     * @param {string} parentMessage - 
     *
     */
    message_delete(parameters: {
        'authorization' ? : string,
        'id': number,
        'project' ? : string,
        'category' ? : string,
        'parentMessage' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/message/message/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('project', 'project', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('category', 'category', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('parentMessage', 'parent_message', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.delete(url, requestOptionArgs)
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#template_list
     * @param {string} authorization - Authorization
     * @param {integer} page - A page number within the paginated result set.
     * @param {integer} pageSize - Number of results to return per page.
     * @param {string} group - 
     *
     */
    template_list(parameters: {
        'authorization' ? : string,
        'page' ? : number,
        'pageSize' ? : number,
        'group' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/message/template/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('page', 'page', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('pageSize', 'page_size', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('group', 'group', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#template_create
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    template_create(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/message/template/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#template_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this template.
     * @param {string} group - 
     *
     */
    template_read(parameters: {
        'authorization' ? : string,
        'id': number,
        'group' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/message/template/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('group', 'group', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#template_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this template.
     * @param {string} group - 
     * @param {} data - 
     *
     */
    template_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'group' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/message/template/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('group', 'group', queryParameters, parameters);

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.put(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#template_partial_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this template.
     * @param {string} group - 
     * @param {} data - 
     *
     */
    template_partial_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'group' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/message/template/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('group', 'group', queryParameters, parameters);

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.patch(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#template_delete
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this template.
     * @param {string} group - 
     *
     */
    template_delete(parameters: {
        'authorization' ? : string,
        'id': number,
        'group' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/message/template/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('group', 'group', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.delete(url, requestOptionArgs)
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#template_group_list
     * @param {string} authorization - Authorization
     * @param {integer} page - A page number within the paginated result set.
     * @param {integer} pageSize - Number of results to return per page.
     *
     */
    template_group_list(parameters: {
        'authorization' ? : string,
        'page' ? : number,
        'pageSize' ? : number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/message/template_group/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('page', 'page', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('pageSize', 'page_size', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#template_group_create
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    template_group_create(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/message/template_group/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#template_group_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this template group.
     *
     */
    template_group_read(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/message/template_group/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for Tags CRUD operations
     * @method
     * @name pmsAPI#permission_list
     * @param {string} authorization - Authorization
     * @param {integer} page - A page number within the paginated result set.
     * @param {integer} pageSize - Number of results to return per page.
     *
     */
    permission_list(parameters: {
        'authorization' ? : string,
        'page' ? : number,
        'pageSize' ? : number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/permission/permission/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('page', 'page', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('pageSize', 'page_size', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for Tags CRUD operations
     * @method
     * @name pmsAPI#permission_create
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    permission_create(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/permission/permission/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for Tags CRUD operations
     * @method
     * @name pmsAPI#permission_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this permissions.
     *
     */
    permission_read(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/permission/permission/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for Tags CRUD operations
     * @method
     * @name pmsAPI#permission_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this permissions.
     * @param {} data - 
     *
     */
    permission_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/permission/permission/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.put(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for Tags CRUD operations
     * @method
     * @name pmsAPI#permission_partial_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this permissions.
     * @param {} data - 
     *
     */
    permission_partial_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/permission/permission/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.patch(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for Tags CRUD operations
     * @method
     * @name pmsAPI#permission_delete
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this permissions.
     *
     */
    permission_delete(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/permission/permission/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.delete(url, requestOptionArgs)
            .catch(this.handleError);
    };
    /**
    * listing of category

       * Category_type ==> choices are ('project', 'message')
    * @method
    * @name pmsAPI#category_list
         * @param {string} authorization - Authorization
         * @param {integer} page - A page number within the paginated result set.
         * @param {integer} pageSize - Number of results to return per page.
         * @param {string} categoryType - 
         * @param {string} search - A search term.
    *
    */
    category_list(parameters: {
        'authorization' ? : string,
        'page' ? : number,
        'pageSize' ? : number,
        'categoryType' ? : string,
        'search' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/category/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('page', 'page', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('pageSize', 'page_size', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('categoryType', 'category_type', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('search', 'search', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
    * create a category in project and message

       * Category_type ==> choices are ('project', 'message')
    * @method
    * @name pmsAPI#category_create
         * @param {string} authorization - Authorization
         * @param {} data - 
    *
    */
    category_create(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/category/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#category_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this category.
     * @param {string} categoryType - 
     * @param {string} search - A search term.
     *
     */
    category_read(parameters: {
        'authorization' ? : string,
        'id': number,
        'categoryType' ? : string,
        'search' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/category/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('categoryType', 'category_type', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('search', 'search', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#category_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this category.
     * @param {string} categoryType - 
     * @param {string} search - A search term.
     * @param {} data - 
     *
     */
    category_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'categoryType' ? : string,
        'search' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/category/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('categoryType', 'category_type', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('search', 'search', queryParameters, parameters);

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.put(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#category_partial_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this category.
     * @param {string} categoryType - 
     * @param {string} search - A search term.
     * @param {} data - 
     *
     */
    category_partial_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'categoryType' ? : string,
        'search' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/category/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('categoryType', 'category_type', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('search', 'search', queryParameters, parameters);

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.patch(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#category_delete
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this category.
     * @param {string} categoryType - 
     * @param {string} search - A search term.
     *
     */
    category_delete(parameters: {
        'authorization' ? : string,
        'id': number,
        'categoryType' ? : string,
        'search' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/category/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('categoryType', 'category_type', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('search', 'search', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.delete(url, requestOptionArgs)
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#contract_list
     * @param {string} authorization - Authorization
     * @param {integer} page - A page number within the paginated result set.
     * @param {integer} pageSize - Number of results to return per page.
     *
     */
    contract_list(parameters: {
        'authorization' ? : string,
        'page' ? : number,
        'pageSize' ? : number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/contract/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('page', 'page', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('pageSize', 'page_size', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#contract_create
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    contract_create(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/contract/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#contract_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this contract.
     *
     */
    contract_read(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/contract/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#contract_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this contract.
     * @param {} data - 
     *
     */
    contract_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/contract/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.put(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#contract_partial_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this contract.
     * @param {} data - 
     *
     */
    contract_partial_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/contract/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.patch(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#contract_delete
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this contract.
     *
     */
    contract_delete(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/contract/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.delete(url, requestOptionArgs)
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#contract_template_list
     * @param {string} authorization - Authorization
     * @param {integer} page - A page number within the paginated result set.
     * @param {integer} pageSize - Number of results to return per page.
     *
     */
    contract_template_list(parameters: {
        'authorization' ? : string,
        'page' ? : number,
        'pageSize' ? : number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/contract_template/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('page', 'page', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('pageSize', 'page_size', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#contract_template_create
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    contract_template_create(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/contract_template/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#contract_template_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this contract template.
     *
     */
    contract_template_read(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/contract_template/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#contract_template_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this contract template.
     * @param {} data - 
     *
     */
    contract_template_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/contract_template/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.put(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#contract_template_partial_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this contract template.
     * @param {} data - 
     *
     */
    contract_template_partial_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/contract_template/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.patch(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#contract_template_delete
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this contract template.
     *
     */
    contract_template_delete(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/contract_template/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.delete(url, requestOptionArgs)
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#google_drive_connect_drive
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    google_drive_connect_drive(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/google_drive/connect_drive/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#google_drive_disconnect_drive
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    google_drive_disconnect_drive(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/google_drive/disconnect_drive/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#jira_access_token
     * @param {string} authorization - Authorization
     *
     */
    jira_access_token(parameters: {
        'authorization' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/jira/access_token/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * PLEASE DO NOT CALL THIS API.
     * @method
     * @name pmsAPI#jira_auth_token_for_worklog
     * @param {string} authorization - Authorization
     *
     */
    jira_auth_token_for_worklog(parameters: {
        'authorization' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/jira/auth_token_for_worklog/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#jira_get_project
     * @param {string} authorization - Authorization
     *
     */
    jira_get_project(parameters: {
        'authorization' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/jira/get_project/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#jira_get_weekly_issue
     * @param {string} authorization - Authorization
     *
     */
    jira_get_weekly_issue(parameters: {
        'authorization' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/jira/get_weekly_issue/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
    * ```
        {
            "project_key" : "CCM",
            "from" : "2019-10-13",
            "to" : "2019-10-19"
        }
    ```
    * @method
    * @name pmsAPI#jira_get_worklog
         * @param {string} authorization - Authorization
         * @param {string} projectKey - Your Jira's project key
         * @param {string} from - yyyy-mm-dd
         * @param {string} to - yyyy-mm-dd
    *
    */
    jira_get_worklog(parameters: {
        'authorization' ? : string,
        'projectKey': string,
        'from': string,
        'to': string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/jira/get_worklog/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['projectKey'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: projectKey'));
        //}

        queryParameters = this.setNonPatternTypeParameter('projectKey', 'project_key', queryParameters, parameters);

        //TODO check if param is required in header or body
        //if(parameters['from'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: from'));
        //}

        queryParameters = this.setNonPatternTypeParameter('from', 'from', queryParameters, parameters);

        //TODO check if param is required in header or body
        //if(parameters['to'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: to'));
        //}

        queryParameters = this.setNonPatternTypeParameter('to', 'to', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#jira_new_access_token
     * @param {string} authorization - Authorization
     *
     */
    jira_new_access_token(parameters: {
        'authorization' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/jira/new_access_token/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#jira_revoke_access_token
     * @param {string} authorization - Authorization
     *
     */
    jira_revoke_access_token(parameters: {
        'authorization' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/jira/revoke_access_token/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#jira_revoke_refresh_token
     * @param {string} authorization - Authorization
     *
     */
    jira_revoke_refresh_token(parameters: {
        'authorization' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/jira/revoke_refresh_token/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#jira_template_list
     * @param {string} authorization - Authorization
     * @param {integer} page - A page number within the paginated result set.
     * @param {integer} pageSize - Number of results to return per page.
     * @param {string} projectType - 
     *
     */
    jira_template_list(parameters: {
        'authorization' ? : string,
        'page' ? : number,
        'pageSize' ? : number,
        'projectType' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/jira_template/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('page', 'page', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('pageSize', 'page_size', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('projectType', 'project_type', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#jira_template_create
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    jira_template_create(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/jira_template/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#jira_template_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this jira project template.
     * @param {string} projectType - 
     *
     */
    jira_template_read(parameters: {
        'authorization' ? : string,
        'id': number,
        'projectType' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/jira_template/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('projectType', 'project_type', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#jira_template_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this jira project template.
     * @param {string} projectType - 
     * @param {} data - 
     *
     */
    jira_template_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'projectType' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/jira_template/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('projectType', 'project_type', queryParameters, parameters);

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.put(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#jira_template_partial_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this jira project template.
     * @param {string} projectType - 
     * @param {} data - 
     *
     */
    jira_template_partial_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'projectType' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/jira_template/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('projectType', 'project_type', queryParameters, parameters);

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.patch(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#jira_template_delete
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this jira project template.
     * @param {string} projectType - 
     *
     */
    jira_template_delete(parameters: {
        'authorization' ? : string,
        'id': number,
        'projectType' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/jira_template/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('projectType', 'project_type', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.delete(url, requestOptionArgs)
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#links_list
     * @param {string} authorization - Authorization
     * @param {integer} page - A page number within the paginated result set.
     * @param {integer} pageSize - Number of results to return per page.
     *
     */
    links_list(parameters: {
        'authorization' ? : string,
        'page' ? : number,
        'pageSize' ? : number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/links/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('page', 'page', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('pageSize', 'page_size', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#links_create
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    links_create(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/links/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#links_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this links.
     *
     */
    links_read(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/links/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#links_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this links.
     * @param {} data - 
     *
     */
    links_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/links/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.put(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#links_partial_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this links.
     * @param {} data - 
     *
     */
    links_partial_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/links/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.patch(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#links_delete
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this links.
     *
     */
    links_delete(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/links/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.delete(url, requestOptionArgs)
            .catch(this.handleError);
    };
    /**
     * View for Owner CRUD operations
     * @method
     * @name pmsAPI#owner_list
     * @param {string} authorization - Authorization
     * @param {integer} page - A page number within the paginated result set.
     * @param {integer} pageSize - Number of results to return per page.
     *
     */
    owner_list(parameters: {
        'authorization' ? : string,
        'page' ? : number,
        'pageSize' ? : number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/owner/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('page', 'page', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('pageSize', 'page_size', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for Owner CRUD operations
     * @method
     * @name pmsAPI#owner_create
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    owner_create(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/owner/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for Owner CRUD operations
     * @method
     * @name pmsAPI#owner_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this owner.
     *
     */
    owner_read(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/owner/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for Owner CRUD operations
     * @method
     * @name pmsAPI#owner_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this owner.
     * @param {} data - 
     *
     */
    owner_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/owner/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.put(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for Owner CRUD operations
     * @method
     * @name pmsAPI#owner_partial_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this owner.
     * @param {} data - 
     *
     */
    owner_partial_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/owner/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.patch(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for Owner CRUD operations
     * @method
     * @name pmsAPI#owner_delete
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this owner.
     *
     */
    owner_delete(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/owner/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.delete(url, requestOptionArgs)
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#presentation_list
     * @param {string} authorization - Authorization
     * @param {integer} page - A page number within the paginated result set.
     * @param {integer} pageSize - Number of results to return per page.
     *
     */
    presentation_list(parameters: {
        'authorization' ? : string,
        'page' ? : number,
        'pageSize' ? : number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/presentation/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('page', 'page', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('pageSize', 'page_size', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
    * ```
    Request body:
                {
                  "presentation_template": 17,
                  "presentation_title": "Title of your presentation file",
                  "from_date": "2019-12-01",
                  "to_date": "2019-12-10"
                }
    Respone body:

    ```
    * @method
    * @name pmsAPI#presentation_create
         * @param {string} authorization - Authorization
         * @param {} data - 
    *
    */
    presentation_create(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/presentation/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#presentation_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this presentation.
     *
     */
    presentation_read(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/presentation/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#presentation_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this presentation.
     * @param {} data - 
     *
     */
    presentation_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/presentation/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.put(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#presentation_partial_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this presentation.
     * @param {} data - 
     *
     */
    presentation_partial_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/presentation/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.patch(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#presentation_delete
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this presentation.
     *
     */
    presentation_delete(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/presentation/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.delete(url, requestOptionArgs)
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#presentation_template_list
     * @param {string} authorization - Authorization
     * @param {integer} page - A page number within the paginated result set.
     * @param {integer} pageSize - Number of results to return per page.
     *
     */
    presentation_template_list(parameters: {
        'authorization' ? : string,
        'page' ? : number,
        'pageSize' ? : number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/presentation_template/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('page', 'page', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('pageSize', 'page_size', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#presentation_template_create
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    presentation_template_create(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/presentation_template/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#presentation_template_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this presentation template.
     *
     */
    presentation_template_read(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/presentation_template/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#presentation_template_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this presentation template.
     * @param {} data - 
     *
     */
    presentation_template_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/presentation_template/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.put(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#presentation_template_partial_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this presentation template.
     * @param {} data - 
     *
     */
    presentation_template_partial_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/presentation_template/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.patch(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#presentation_template_delete
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this presentation template.
     *
     */
    presentation_template_delete(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/presentation_template/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.delete(url, requestOptionArgs)
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#project_phases_list
     * @param {string} authorization - Authorization
     * @param {integer} page - A page number within the paginated result set.
     * @param {integer} pageSize - Number of results to return per page.
     *
     */
    project_phases_list(parameters: {
        'authorization' ? : string,
        'page' ? : number,
        'pageSize' ? : number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/project_phases/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('page', 'page', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('pageSize', 'page_size', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#project_phases_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this project phase.
     *
     */
    project_phases_read(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/project_phases/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#project_types_list
     * @param {string} authorization - Authorization
     * @param {integer} page - A page number within the paginated result set.
     * @param {integer} pageSize - Number of results to return per page.
     *
     */
    project_types_list(parameters: {
        'authorization' ? : string,
        'page' ? : number,
        'pageSize' ? : number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/project_types/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('page', 'page', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('pageSize', 'page_size', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#project_types_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this project type.
     *
     */
    project_types_read(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/project_types/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
    * View for Owner CRUD operations

        * search for tags
    * @method
    * @name pmsAPI#projectowner_list
         * @param {string} authorization - Authorization
         * @param {integer} page - A page number within the paginated result set.
         * @param {integer} pageSize - Number of results to return per page.
         * @param {string} category - 
         * @param {string} search - A search term.
    *
    */
    projectowner_list(parameters: {
        'authorization' ? : string,
        'page' ? : number,
        'pageSize' ? : number,
        'category' ? : string,
        'search' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/projectowner/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('page', 'page', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('pageSize', 'page_size', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('category', 'category', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('search', 'search', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for Owner CRUD operations
     * @method
     * @name pmsAPI#projectowner_create
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    projectowner_create(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/projectowner/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for Owner CRUD operations
     * @method
     * @name pmsAPI#projectowner_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this project owner.
     * @param {string} category - 
     * @param {string} search - A search term.
     *
     */
    projectowner_read(parameters: {
        'authorization' ? : string,
        'id': number,
        'category' ? : string,
        'search' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/projectowner/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('category', 'category', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('search', 'search', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for Owner CRUD operations
     * @method
     * @name pmsAPI#projectowner_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this project owner.
     * @param {string} category - 
     * @param {string} search - A search term.
     * @param {} data - 
     *
     */
    projectowner_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'category' ? : string,
        'search' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/projectowner/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('category', 'category', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('search', 'search', queryParameters, parameters);

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.put(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for Owner CRUD operations
     * @method
     * @name pmsAPI#projectowner_partial_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this project owner.
     * @param {string} category - 
     * @param {string} search - A search term.
     * @param {} data - 
     *
     */
    projectowner_partial_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'category' ? : string,
        'search' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/projectowner/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('category', 'category', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('search', 'search', queryParameters, parameters);

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.patch(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for Owner CRUD operations
     * @method
     * @name pmsAPI#projectowner_delete
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this project owner.
     * @param {string} category - 
     * @param {string} search - A search term.
     *
     */
    projectowner_delete(parameters: {
        'authorization' ? : string,
        'id': number,
        'category' ? : string,
        'search' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/projectowner/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('category', 'category', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('search', 'search', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.delete(url, requestOptionArgs)
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#projects_list
     * @param {string} authorization - Authorization
     * @param {string} categoryId - category id
     * @param {string} tagName - search project on bases of tag name
     *
     */
    projects_list(parameters: {
        'authorization' ? : string,
        'categoryId' ? : string,
        'tagName' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/projects/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('categoryId', 'category_id', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('tagName', 'tag_name', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#projects_create
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    projects_create(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/projects/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#projects_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this project.
     *
     */
    projects_read(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/projects/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#projects_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this project.
     * @param {} data - 
     *
     */
    projects_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/projects/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.put(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#projects_partial_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this project.
     * @param {} data - 
     *
     */
    projects_partial_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/projects/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.patch(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#projects_delete
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this project.
     *
     */
    projects_delete(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/projects/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.delete(url, requestOptionArgs)
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#questinnaire_project_list
     * @param {string} authorization - Authorization
     * @param {integer} page - A page number within the paginated result set.
     * @param {integer} pageSize - Number of results to return per page.
     * @param {string} projectId - 
     *
     */
    questinnaire_project_list(parameters: {
        'authorization' ? : string,
        'page' ? : number,
        'pageSize' ? : number,
        'projectId' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/questinnaire_project/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('page', 'page', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('pageSize', 'page_size', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('projectId', 'project_id', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
    * ```
    Request body:
                [{
                    "project": 0,
                    "question": 0,
                    "answer": "string"
                }]

    ```
    * @method
    * @name pmsAPI#questinnaire_project_create
         * @param {string} authorization - Authorization
         * @param {} data - 
    *
    */
    questinnaire_project_create(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/questinnaire_project/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
    * ```
    Request body:
                [{
                    "project": 0,
                    "question": 0,
                    "answer": "string"
                }]

    ```
    * @method
    * @name pmsAPI#questinnaire_project_bulk_update
         * @param {string} authorization - Authorization
         * @param {} data - 
    *
    */
    questinnaire_project_bulk_update(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/questinnaire_project/bulk_update/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#questinnaire_project_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this questinnaire project.
     * @param {string} projectId - 
     *
     */
    questinnaire_project_read(parameters: {
        'authorization' ? : string,
        'id': number,
        'projectId' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/questinnaire_project/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('projectId', 'project_id', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#question_categories_list
     * @param {string} authorization - Authorization
     * @param {integer} page - A page number within the paginated result set.
     * @param {integer} pageSize - Number of results to return per page.
     *
     */
    question_categories_list(parameters: {
        'authorization' ? : string,
        'page' ? : number,
        'pageSize' ? : number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/question_categories/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('page', 'page', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('pageSize', 'page_size', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#question_categories_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this question category.
     *
     */
    question_categories_read(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/question_categories/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#questions_list
     * @param {string} authorization - Authorization
     * @param {integer} page - A page number within the paginated result set.
     * @param {integer} pageSize - Number of results to return per page.
     * @param {string} categoryId - 
     *
     */
    questions_list(parameters: {
        'authorization' ? : string,
        'page' ? : number,
        'pageSize' ? : number,
        'categoryId' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/questions/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('page', 'page', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('pageSize', 'page_size', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('categoryId', 'category_id', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#questions_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this question.
     * @param {string} categoryId - 
     *
     */
    questions_read(parameters: {
        'authorization' ? : string,
        'id': number,
        'categoryId' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/questions/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('categoryId', 'category_id', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#quick_books_quick_book_auth
     * @param {string} authorization - Authorization
     *
     */
    quick_books_quick_book_auth(parameters: {
        'authorization' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/quick_books/quick_book_auth/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#quick_books_quick_book_disconnect
     * @param {string} authorization - Authorization
     *
     */
    quick_books_quick_book_disconnect(parameters: {
        'authorization' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/quick_books/quick_book_disconnect/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#quick_books_quick_books_customers_list
     * @param {string} authorization - Authorization
     *
     */
    quick_books_quick_books_customers_list(parameters: {
        'authorization' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/quick_books/quick_books_customers_list/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
    * ```
        {
            "customer_id" : 154,
            "invoice_data" : [
                                 {
                                    "service": "test_service",
                                    "description": "text_description",
                                    "amount": "12345"
                                 },
                                 {
                                    "service": "test_service_1",
                                    "description": "text_description_1",
                                    "amount": "12345"
                                 }
                              ]
        }
    ```
    * @method
    * @name pmsAPI#quick_books_quick_books_generate_invoice
         * @param {string} authorization - Authorization
    *
    */
    quick_books_quick_books_generate_invoice(parameters: {
        'authorization' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/quick_books/quick_books_generate_invoice/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#quick_books_quick_books_refresh_token
     * @param {string} authorization - Authorization
     *
     */
    quick_books_quick_books_refresh_token(parameters: {
        'authorization' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/quick_books/quick_books_refresh_token/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
    * ```
    you will get the invoice_id in response of
    '/api/project/quick_books/quick_books_generate_invoice/'


        {
            "project_id" : "12",
            "invoice_id" : "154"
        }
    ```
    * @method
    * @name pmsAPI#quick_books_quick_books_send_invoice_as_pdf
         * @param {string} authorization - Authorization
    *
    */
    quick_books_quick_books_send_invoice_as_pdf(parameters: {
        'authorization' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/quick_books/quick_books_send_invoice_as_pdf/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#quick_books_quickbooks_oauth
     * @param {string} authorization - Authorization
     *
     */
    quick_books_quickbooks_oauth(parameters: {
        'authorization' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/quick_books/quickbooks_oauth/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#risk_list
     * @param {string} authorization - Authorization
     * @param {integer} page - A page number within the paginated result set.
     * @param {integer} pageSize - Number of results to return per page.
     *
     */
    risk_list(parameters: {
        'authorization' ? : string,
        'page' ? : number,
        'pageSize' ? : number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/risk/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('page', 'page', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('pageSize', 'page_size', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#risk_create
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    risk_create(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/risk/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#risk_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this risk.
     *
     */
    risk_read(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/risk/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#risk_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this risk.
     * @param {} data - 
     *
     */
    risk_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/risk/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.put(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#risk_partial_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this risk.
     * @param {} data - 
     *
     */
    risk_partial_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/risk/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.patch(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#risk_delete
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this risk.
     *
     */
    risk_delete(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/risk/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.delete(url, requestOptionArgs)
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#slack_add_members_to_channel
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    slack_add_members_to_channel(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/slack/add_members_to_channel/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#slack_create_channel
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    slack_create_channel(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/slack/create_channel/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#slack_get_slack_members
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    slack_get_slack_members(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/slack/get_slack_members/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#slack_list_channel
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    slack_list_channel(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/slack/list_channel/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for Tags CRUD operations
     * @method
     * @name pmsAPI#tags_list
     * @param {string} authorization - Authorization
     * @param {integer} page - A page number within the paginated result set.
     * @param {integer} pageSize - Number of results to return per page.
     * @param {string} search - A search term.
     *
     */
    tags_list(parameters: {
        'authorization' ? : string,
        'page' ? : number,
        'pageSize' ? : number,
        'search' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/tags/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('page', 'page', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('pageSize', 'page_size', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('search', 'search', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for Tags CRUD operations
     * @method
     * @name pmsAPI#tags_create
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    tags_create(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/tags/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for Tags CRUD operations
     * @method
     * @name pmsAPI#tags_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this tags.
     * @param {string} search - A search term.
     *
     */
    tags_read(parameters: {
        'authorization' ? : string,
        'id': number,
        'search' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/tags/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('search', 'search', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for Tags CRUD operations
     * @method
     * @name pmsAPI#tags_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this tags.
     * @param {string} search - A search term.
     * @param {} data - 
     *
     */
    tags_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'search' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/tags/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('search', 'search', queryParameters, parameters);

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.put(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for Tags CRUD operations
     * @method
     * @name pmsAPI#tags_partial_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this tags.
     * @param {string} search - A search term.
     * @param {} data - 
     *
     */
    tags_partial_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'search' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/tags/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('search', 'search', queryParameters, parameters);

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.patch(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for Tags CRUD operations
     * @method
     * @name pmsAPI#tags_delete
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this tags.
     * @param {string} search - A search term.
     *
     */
    tags_delete(parameters: {
        'authorization' ? : string,
        'id': number,
        'search' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/tags/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('search', 'search', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.delete(url, requestOptionArgs)
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#users_in_project_list
     * @param {string} authorization - Authorization
     * @param {integer} page - A page number within the paginated result set.
     * @param {integer} pageSize - Number of results to return per page.
     * @param {string} projectId - 
     *
     */
    users_in_project_list(parameters: {
        'authorization' ? : string,
        'page' ? : number,
        'pageSize' ? : number,
        'projectId' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/users_in_project/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('page', 'page', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('pageSize', 'page_size', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('projectId', 'project_id', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#users_in_project_create
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    users_in_project_create(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/users_in_project/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#users_in_project_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this project user.
     * @param {string} projectId - 
     *
     */
    users_in_project_read(parameters: {
        'authorization' ? : string,
        'id': number,
        'projectId' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/users_in_project/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('projectId', 'project_id', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#users_in_project_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this project user.
     * @param {string} projectId - 
     * @param {} data - 
     *
     */
    users_in_project_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'projectId' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/users_in_project/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('projectId', 'project_id', queryParameters, parameters);

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.put(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#users_in_project_partial_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this project user.
     * @param {string} projectId - 
     * @param {} data - 
     *
     */
    users_in_project_partial_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'projectId' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/users_in_project/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('projectId', 'project_id', queryParameters, parameters);

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.patch(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#users_in_project_delete
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this project user.
     * @param {string} projectId - 
     *
     */
    users_in_project_delete(parameters: {
        'authorization' ? : string,
        'id': number,
        'projectId' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/users_in_project/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('projectId', 'project_id', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.delete(url, requestOptionArgs)
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#wysiwygEditor_list
     * @param {string} authorization - Authorization
     * @param {integer} page - A page number within the paginated result set.
     * @param {integer} pageSize - Number of results to return per page.
     *
     */
    wysiwygEditor_list(parameters: {
        'authorization' ? : string,
        'page' ? : number,
        'pageSize' ? : number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/wysiwygEditor/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('page', 'page', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('pageSize', 'page_size', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#wysiwygEditor_create
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    wysiwygEditor_create(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/wysiwygEditor/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#wysiwygEditor_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this wysiwyg editor.
     *
     */
    wysiwygEditor_read(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/wysiwygEditor/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#wysiwygEditor_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this wysiwyg editor.
     * @param {} data - 
     *
     */
    wysiwygEditor_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/wysiwygEditor/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.put(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#wysiwygEditor_partial_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this wysiwyg editor.
     * @param {} data - 
     *
     */
    wysiwygEditor_partial_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/wysiwygEditor/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.patch(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#wysiwygEditor_delete
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this wysiwyg editor.
     *
     */
    wysiwygEditor_delete(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/project/wysiwygEditor/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.delete(url, requestOptionArgs)
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#task_list
     * @param {string} authorization - Authorization
     * @param {integer} page - A page number within the paginated result set.
     * @param {integer} pageSize - Number of results to return per page.
     * @param {string} createdByUserId - 
     * @param {string} priority - 
     * @param {string} createdTimestamp - 
     * @param {string} status - 
     * @param {string} projectId - 
     * @param {string} search - A search term.
     *
     */
    task_list(parameters: {
        'authorization' ? : string,
        'page' ? : number,
        'pageSize' ? : number,
        'createdByUserId' ? : string,
        'priority' ? : string,
        'createdTimestamp' ? : string,
        'status' ? : string,
        'projectId' ? : string,
        'search' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/task/task/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('page', 'page', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('pageSize', 'page_size', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('createdByUserId', 'created_by_user_id', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('priority', 'priority', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('createdTimestamp', 'created_timestamp', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('status', 'status', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('projectId', 'project_id', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('search', 'search', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#task_create
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    task_create(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/task/task/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#task_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this task.
     * @param {string} createdByUserId - 
     * @param {string} priority - 
     * @param {string} createdTimestamp - 
     * @param {string} status - 
     * @param {string} projectId - 
     * @param {string} search - A search term.
     *
     */
    task_read(parameters: {
        'authorization' ? : string,
        'id': number,
        'createdByUserId' ? : string,
        'priority' ? : string,
        'createdTimestamp' ? : string,
        'status' ? : string,
        'projectId' ? : string,
        'search' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/task/task/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('createdByUserId', 'created_by_user_id', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('priority', 'priority', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('createdTimestamp', 'created_timestamp', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('status', 'status', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('projectId', 'project_id', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('search', 'search', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#task_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this task.
     * @param {string} createdByUserId - 
     * @param {string} priority - 
     * @param {string} createdTimestamp - 
     * @param {string} status - 
     * @param {string} projectId - 
     * @param {string} search - A search term.
     * @param {} data - 
     *
     */
    task_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'createdByUserId' ? : string,
        'priority' ? : string,
        'createdTimestamp' ? : string,
        'status' ? : string,
        'projectId' ? : string,
        'search' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/task/task/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('createdByUserId', 'created_by_user_id', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('priority', 'priority', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('createdTimestamp', 'created_timestamp', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('status', 'status', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('projectId', 'project_id', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('search', 'search', queryParameters, parameters);

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.put(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#task_partial_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this task.
     * @param {string} createdByUserId - 
     * @param {string} priority - 
     * @param {string} createdTimestamp - 
     * @param {string} status - 
     * @param {string} projectId - 
     * @param {string} search - A search term.
     * @param {} data - 
     *
     */
    task_partial_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'createdByUserId' ? : string,
        'priority' ? : string,
        'createdTimestamp' ? : string,
        'status' ? : string,
        'projectId' ? : string,
        'search' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/task/task/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('createdByUserId', 'created_by_user_id', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('priority', 'priority', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('createdTimestamp', 'created_timestamp', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('status', 'status', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('projectId', 'project_id', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('search', 'search', queryParameters, parameters);

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.patch(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#task_delete
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this task.
     * @param {string} createdByUserId - 
     * @param {string} priority - 
     * @param {string} createdTimestamp - 
     * @param {string} status - 
     * @param {string} projectId - 
     * @param {string} search - A search term.
     *
     */
    task_delete(parameters: {
        'authorization' ? : string,
        'id': number,
        'createdByUserId' ? : string,
        'priority' ? : string,
        'createdTimestamp' ? : string,
        'status' ? : string,
        'projectId' ? : string,
        'search' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/task/task/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('createdByUserId', 'created_by_user_id', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('priority', 'priority', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('createdTimestamp', 'created_timestamp', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('status', 'status', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('projectId', 'project_id', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('search', 'search', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.delete(url, requestOptionArgs)
            .catch(this.handleError);
    };
    /**
     * View for Task CRUD operations
     * @method
     * @name pmsAPI#task_list_list
     * @param {string} authorization - Authorization
     * @param {integer} page - A page number within the paginated result set.
     * @param {integer} pageSize - Number of results to return per page.
     *
     */
    task_list_list(parameters: {
        'authorization' ? : string,
        'page' ? : number,
        'pageSize' ? : number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/task/task_list/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('page', 'page', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('pageSize', 'page_size', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for Task CRUD operations
     * @method
     * @name pmsAPI#task_list_create
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    task_list_create(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/task/task_list/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for Task CRUD operations
     * @method
     * @name pmsAPI#task_list_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this task list.
     *
     */
    task_list_read(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/task/task_list/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for Task CRUD operations
     * @method
     * @name pmsAPI#task_list_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this task list.
     * @param {} data - 
     *
     */
    task_list_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/task/task_list/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.put(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for Task CRUD operations
     * @method
     * @name pmsAPI#task_list_partial_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this task list.
     * @param {} data - 
     *
     */
    task_list_partial_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/task/task_list/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.patch(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * View for Task CRUD operations
     * @method
     * @name pmsAPI#task_list_delete
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this task list.
     *
     */
    task_list_delete(parameters: {
        'authorization' ? : string,
        'id': number,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/task/task_list/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.delete(url, requestOptionArgs)
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#todo_item_list
     * @param {string} authorization - Authorization
     * @param {integer} page - A page number within the paginated result set.
     * @param {integer} pageSize - Number of results to return per page.
     * @param {string} priority - 
     * @param {string} createdTimestamp - 
     * @param {string} state - 
     * @param {string} assignedTo - 
     * @param {string} search - A search term.
     *
     */
    todo_item_list(parameters: {
        'authorization' ? : string,
        'page' ? : number,
        'pageSize' ? : number,
        'priority' ? : string,
        'createdTimestamp' ? : string,
        'state' ? : string,
        'assignedTo' ? : string,
        'search' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/task/todo_item/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        queryParameters = this.setNonPatternTypeParameter('page', 'page', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('pageSize', 'page_size', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('priority', 'priority', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('createdTimestamp', 'created_timestamp', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('state', 'state', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('assignedTo', 'assigned_to', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('search', 'search', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#todo_item_create
     * @param {string} authorization - Authorization
     * @param {} data - 
     *
     */
    todo_item_create(parameters: {
        'authorization' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/task/todo_item/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.post(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#todo_item_read
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this todo item.
     * @param {string} priority - 
     * @param {string} createdTimestamp - 
     * @param {string} state - 
     * @param {string} assignedTo - 
     * @param {string} search - A search term.
     *
     */
    todo_item_read(parameters: {
        'authorization' ? : string,
        'id': number,
        'priority' ? : string,
        'createdTimestamp' ? : string,
        'state' ? : string,
        'assignedTo' ? : string,
        'search' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/task/todo_item/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('priority', 'priority', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('createdTimestamp', 'created_timestamp', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('state', 'state', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('assignedTo', 'assigned_to', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('search', 'search', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.get(url, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#todo_item_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this todo item.
     * @param {string} priority - 
     * @param {string} createdTimestamp - 
     * @param {string} state - 
     * @param {string} assignedTo - 
     * @param {string} search - A search term.
     * @param {} data - 
     *
     */
    todo_item_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'priority' ? : string,
        'createdTimestamp' ? : string,
        'state' ? : string,
        'assignedTo' ? : string,
        'search' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/task/todo_item/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('priority', 'priority', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('createdTimestamp', 'created_timestamp', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('state', 'state', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('assignedTo', 'assigned_to', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('search', 'search', queryParameters, parameters);

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.put(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#todo_item_partial_update
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this todo item.
     * @param {string} priority - 
     * @param {string} createdTimestamp - 
     * @param {string} state - 
     * @param {string} assignedTo - 
     * @param {string} search - A search term.
     * @param {} data - 
     *
     */
    todo_item_partial_update(parameters: {
        'authorization' ? : string,
        'id': number,
        'priority' ? : string,
        'createdTimestamp' ? : string,
        'state' ? : string,
        'assignedTo' ? : string,
        'search' ? : string,
        'data' ? : any,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/task/todo_item/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('priority', 'priority', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('createdTimestamp', 'created_timestamp', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('state', 'state', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('assignedTo', 'assigned_to', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('search', 'search', queryParameters, parameters);

        if (parameters['data'] !== undefined) {
            body = JSON.stringify(parameters['data']);
        }

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.patch(url, body, requestOptionArgs)
            .map(res => {

                return {
                    body: res.json(),
                    headers: res.headers,
                    status: res.status
                }
            })
            .catch(this.handleError);
    };
    /**
     * 
     * @method
     * @name pmsAPI#todo_item_delete
     * @param {string} authorization - Authorization
     * @param {integer} id - A unique integer value identifying this todo item.
     * @param {string} priority - 
     * @param {string} createdTimestamp - 
     * @param {string} state - 
     * @param {string} assignedTo - 
     * @param {string} search - A search term.
     *
     */
    todo_item_delete(parameters: {
        'authorization' ? : string,
        'id': number,
        'priority' ? : string,
        'createdTimestamp' ? : string,
        'state' ? : string,
        'assignedTo' ? : string,
        'search' ? : string,
        $queryParameters ? : {}
    }, headers: Headers): Observable < any > {
        let domain = this.domain;
        let path = '/api/task/todo_item/{id}/';
        let body: string = "";
        let queryParameters = {};
        let url: string;
        let requestOptionArgs = {};
        let paramsStr: string;
        let form = new FormData();

        //TODO check if param is required in header or body
        //if(parameters['id'] === undefined){
        //    return Observable.throw(new Error('Missing required  parameter: id'));
        //}

        path = path.replace(/{id}/, parameters['id'].toString());

        queryParameters = this.setNonPatternTypeParameter('priority', 'priority', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('createdTimestamp', 'created_timestamp', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('state', 'state', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('assignedTo', 'assigned_to', queryParameters, parameters);

        queryParameters = this.setNonPatternTypeParameter('search', 'search', queryParameters, parameters);

        if (parameters.$queryParameters) {
            queryParameters = this.setQueryParameters(parameters, queryParameters);
        }
        url = this.getUrl(path, queryParameters);

        requestOptionArgs = {
            headers: headers
        };

        return this.http.delete(url, requestOptionArgs)
            .catch(this.handleError);
    };
}

export const APP_pms_PROVIDERS = [pmsAPI];