'use strict'

const Response = use("App/Helpers/Response");
const User = use("App/Models/User");
const { validate } = use("Validator");

class UserController {
    async login({ auth, request, response }) {
        const rules = {
            username: "required|min:4",
            password: "required|min:6",
        };

        const { username, password } = request.all()

        const validation = await validate({ username, password }, rules);

        if (validation.fails()) {
            return Response(response, {
                message: validation.messages()[0].message,
                success: false,
                status: 400,
            });
        }

        try {
            const user = await User.findByOrFail(
                "username",
                username
            );

            const token = await auth
                .withRefreshToken()
                .attempt(username, password);

            return Response(response, {
                data: {
                    tokenInfo: token,
                    userInfo: {
                        id: user.id,
                        username: user.username,
                        create_by: user.create_by,
                        created_at: user.created_at,
                    },
                },
            });
        } catch (error) {
            console.log(error)
            return Response(response, {
                message: `账号或密码错误`,
                success: false,
                status: 400,
            });
        }
    }

    async logout({ auth, response }) {
        const apiToken = auth.getAuthHeader()

        await auth.revokeTokens([apiToken], true)

        return Response(response, {});
    }
}

module.exports = UserController