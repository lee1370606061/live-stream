'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */

const Response = use("App/Helpers/Response");
const Env = use('Env')

class ExceptionHandler extends BaseExceptionHandler {
    /**
     * Handle exception thrown during the HTTP lifecycle
     *
     * @method handle
     *
     * @param  {Object} error
     * @param  {Object} options.request
     * @param  {Object} options.response
     *
     * @return {void}
     */
    async handle(error, { request, response }) {
        if (error.name === "ValidationException") {
            return Response(response, {
                message: error.messages,
                success: false,
                status: 400,
            });
        }

        if (error.name === "InvalidJwtToken") {
            return Response(response, {
                message: "请求被拒绝",
                success: false,
                status: 403,
            });
        }

        if (error.name === "ExpiredJwtToken") {
            return Response(response, {
                message: "token已失效",
                success: false,
                status: 430,
            });
        }

        if (error.name === "PasswordMisMatchException") {
            return Response(response, {
                message: "账号或密码错误",
                success: false,
                status: 400,
            });
        }

        if (error.name === "HttpException" && error.status === 404) {
            return Response(response, {
                message: "找不到路径",
                success: false,
                status: 404,
            });
        }

        if (error.errno === -4078 && error.status === 500) {
            return Response(response, {
                message: "数据库相应异常",
                success: false,
                status: 500,
            });
        }

        if (error && Env.get('NODE_ENV') === "production") {
            return Response(response, {
                message: "错误",
                success: false,
                status: 500,
            });
        }
        console.log(error)
            // response.status(error.status).send(error.message)
        return super.handle(...arguments);
    }

    /**
     * Report exception for logging or debugging.
     *
     * @method report
     *
     * @param  {Object} error
     * @param  {Object} options.request
     *
     * @return {void}
     */
    async report(error, { request }) {}
}

module.exports = ExceptionHandler