const userModel = require('./account.model');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const sendEmail = require('_helper/send-email');

module.exports = {
    register,
    verifyEmail,
    authenticate
}

async function register(params, origin) {
    if(await userModel.findOne({email: params.email})) {
        return await sendAlreadyRegisterEmail(params.email, origin)
    }

    const account = new userModel(params);

    //The first account registered in the system is assigned the Admin role
    const isFirstAccount = await userModel.countDocuments({}) === 0;

    account.verificationToken = randomTokenString();

    account.passwordHash = bcrypt.hashSync(params.password)

    await account.save()

    await sendVerificationEmail(account, origin)
}

function randomTokenString() {
    return crypto.randomBytes(40).toString("hex")
}

async function sendAlreadyRegisterEmail (email, origin) {
    let message;

    if(origin) {
        message = `<p>If you do not know your password please visit the <a href="${origin}/account/forgot-password">forgot password</a> page.</p>`;
    }
    else {
        message = `<p>If you do not know your password you can reset it via the <code>/account/forgot-password</code>api route.</p>`;
    }

    await sendEmail({
        to: email,
        subject: "sign-up verification API - Email Already registered",
        html: `<h4>Email Already Registered</h4> 
                <p>Your Email <strong>${email}</strong> is already registered.</p>
                ${message}`
    })
}

async function sendVerificationEmail (account, origin) {
    let message;

    if(origin) {
        const verifyUrl = `${origin}/account/verify-email?token=${account.verificationToken}`

        message = `<p>Please Click The below link to verify your email address</p>
                   <p><a href={verifyUrl}>${verifyUrl}</a></p>`;
    }
    else {
        message = `<p>Please use the below token to verify your email address with the <code>/account/verify-email</code> api route:</p> 
                   <p><code>${account.verificationToken}</code></p>`;
    }

    await sendEmail({
        to: account.email,
        subject: "sign-up verification API - verify email",
        html: `<h4>verify email</h4>
                <p>Thanks for registering</p>
                ${message}`
    })
}

async function verifyEmail ({token}) {
    const account = await userModel.findOne({verificationToken: token})

    if(!account) throw 'Verification failed';

    account.verified = Date.now();
    account.verificationToken = undefined;
    await account.save();
}

async function authenticate ({email, password}) {
    const account = await userModel.findOne({email: email})

    if(!account || !account.verified || !bcrypt.compareSync(password, account.passwordHash)) {
        throw "Email or Password is incorrect";
    }

    const jwtToken = generateJwtToken(account);

    return {
        ...basicDetails(account),
        jwtToken
    }
}

function generateJwtToken (account) {
    return jwt.sign(
        {id: account._id},
        process.env.SECRET_KEY,
        {expiresIn: "30m"}
    )
}

function basicDetails (account) {
    const {id, title, firstName, lastName, email, role, created, updated, verified} = account;
    return {id, title, firstName, lastName, email, role, created, updated, verified}
}


