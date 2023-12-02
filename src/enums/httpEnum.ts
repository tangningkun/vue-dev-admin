/**
 * @description: 请求结果集|Request result set
 */
export enum ResultEnum {
    SUCCESS = 0,
    ERROR = 1,
    TIMEOUT = 401,
    TYPE = 'success',
}

/**
 * @description: 请求方式|request method
 */
export enum RequestEnum {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

/**
 * @description: 请求内容类型| contentType
 */
export enum ContentTypeEnum {
    // json
    JSON = 'application/json;charset=UTF-8',
    // form-data qs
    FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
    // form-data  upload
    FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
