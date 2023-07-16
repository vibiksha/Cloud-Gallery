import AWS from 'aws-sdk';
import { AWSConfigAttributes, USER_POOL_ID } from '../constants/env.constants';
import { AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserSession } from 'amazon-cognito-identity-js';

AWS.config.update({
  region: AWSConfigAttributes.REGION,
  accessKeyId: AWSConfigAttributes.ACCESS_KEY_ID,
  secretAccessKey: AWSConfigAttributes.SECRET_ACCESS_KEY,
});

const cognito = new AWS.CognitoIdentityServiceProvider();

export const createCognitoUser = async (
  username: string,
  email: string,
  phoneNumber: string,
  password: string,
  uid: string
): Promise<AWS.CognitoIdentityServiceProvider.AdminCreateUserResponse> => {
  const params: AWS.CognitoIdentityServiceProvider.AdminCreateUserRequest = {
    UserPoolId: USER_POOL_ID,
    Username: email,
    TemporaryPassword: password,
    UserAttributes: [
      {
        Name: 'email',
        Value: email,
      },
    {
      Name: 'email_verified',
      Value: 'true',
    },
      //   {
      //     Name: 'phone_number',
      //     Value: `+91${phoneNumber}`,
      //   },
      {
        Name: 'preferred_username',
        Value: uid,
      },
    ],
  };

  try {
    const data = await cognito.adminCreateUser(params).promise();
    setUserPassword(email,password)
    console.log('User created successfully:', data);
    return data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const setUserPassword = async (
  username: string,
  password: string
): Promise<AWS.CognitoIdentityServiceProvider.AdminSetUserPasswordResponse> => {
  const params: AWS.CognitoIdentityServiceProvider.AdminSetUserPasswordRequest = {
    UserPoolId: USER_POOL_ID,
    Username: username,
    Password: password,
    Permanent: true, // Set this to 'true' if you want to set a permanent password
  };

  try {
    const data = await cognito.adminSetUserPassword(params).promise();

    console.log('User password set successfully:', data);
    return data;
  } catch (error) {
    console.error('Error setting user password:', error);
    throw error;
  }
};
