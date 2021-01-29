const userModel = require('./account.model');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

module.exports = {
    register
}

async function register(params, origin) {
    if(await userModel.findOne({email: params.email})) {
        return res.json({
            message: "existing email"
        })
    }

    const account = new userModel(params);

    //The first account registered in the system is assigned the Admin role
    const isFirstAccount = await userModel.countDocuments({}) === 0;

    account.verificationToken = randomTokenString();

    account.passwordHash = bcrypt.hashSync(params.password)

    await account.save()
}

function randomTokenString() {
    return crypto.randomBytes(40).toString("hex")
}
