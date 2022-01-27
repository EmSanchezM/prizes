import dotenv from 'dotenv';

dotenv.config();

export default {
    port: 8000,
    dbUri: process.env.DATABASE_URI,
    saltWorkFactor: 10,
    accessToken: "30m",
    refreshToken: "1y",
    accessTokenPrivateKey: process.env.PRIVATE_KEY,
    accessTokenPublicKey: process.env.PUBLIC_KEY,
    refreshTokenPrivateKey: ``,
    refreshTokenPublicKey: ``,
}