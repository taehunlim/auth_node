
const jwt = require('express-jwt');
const userModel = require('_accounts/account.model');
const refreshTokenModel = require('_accounts/refresh-token.model')


module.exports = authorize

function authorize (roles = []) {
    if(typeof roles === "string") {
        roles = [roles]
    }

    const secret = process.env.SECRET_KEY

    return [
        jwt({ secret, algorithms: ['HS256'] }),
        async (req, res, next) => {
            const account =  await userModel.findById(req.user.id)
            const refreshTokens = await refreshTokenModel.find({account: account.id})

            if(!account || (roles.length && !roles.includes(account.role))) {
                return res.status(401).json({
                    message: "Unauthorized"
                })
            }
            req.user.role = account.role;
            req.user.ownsToken = token => !!refreshTokens.find(x => x.token === token)
            next();
        }
    ]
}
