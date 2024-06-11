import dotenv from 'dotenv';
dotenv.config();

const processEnvironmentVariable = () => {
    return process.env;
};

const processEnvVar = processEnvironmentVariable();
export default processEnvVar;