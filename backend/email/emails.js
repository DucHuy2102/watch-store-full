import {
    PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE,
    VERIFICATION_EMAIL_TEMPLATE,
} from './emailTemplates.js';
import { mailTrapClient, sender } from './mailtrap.config.js';

// Send email verification account
export const sendEmail_Verification = async (email, name, verificationToken) => {
    const recipient = [{ email }];

    try {
        const res = await mailTrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Email verification',
            html: VERIFICATION_EMAIL_TEMPLATE.replace('{username}', name).replace(
                '{verificationCode}',
                verificationToken
            ),
            category: 'email-verification',
        });
        console.log('Email verification sent successfully', res);
    } catch (error) {
        console.error(`Error sending verification email`, error);
        throw new Error('Error sending verification email:', error);
    }
};

// Send email welcome to website
export const sendEmail_WelcomeToWebsite = async (email, name) => {
    const recipient = [{ email }];

    try {
        const res = await mailTrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: '567c9096-6b41-4542-a499-0561eb9bfab5',
            template_variables: {
                company_info_name: 'Watches Store',
                name: name,
            },
        });
        console.log('Welcome email sent successfully', res);
    } catch (error) {
        console.error(`Error sending welcome email`, error);
        throw new Error('Error sending welcome email:', error);
    }
};

// Send email reset password
export const sendEmail_ResetPassword = async (email, name, resetURL) => {
    const recipient = [{ email }];

    try {
        const res = await mailTrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Reset your password',
            category: 'password-reset',
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{username}', name).replace(
                '{resetURL}',
                resetURL
            ),
        });
        console.log('Sending email reset password successfully', res);
    } catch (error) {
        console.log('Error sending email reset password:', error);
        throw new Error('Error sending email reset password:', error);
    }
};

// Send email confirm reset password
export const sendEmail_Confirm_ResetPassword = async (email, name) => {
    const recipient = [{ email }];

    try {
        const res = await mailTrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Password reset confirmation',
            category: 'password-reset',
            html: PASSWORD_RESET_SUCCESS_TEMPLATE.replace('{username}', name),
        });
        console.log('Sending email confirm reset password successfully', res);
    } catch (error) {
        console.log('Error sending email confirm reset password:', error);
        throw new Error('Error sending email confirm reset password:', error);
    }
};
