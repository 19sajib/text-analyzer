import * as dotenv from 'dotenv';
import { install } from 'source-map-support';
install({ environment: 'node', handleUncaughtExceptions: true, hookRequire: true });

export interface Config {
	mongoURI: string;
	port: number;
	jwtSecretKey: string;
    jwtExpire:string;
}


dotenv.config();

const getConfig = (): Config => {
	const {
		MONGODB_URI: mongoURI,
		PORT,
		JWT_SECRET_KEY: jwtSecretKey,
        JWT_EXPIRE_LIMIT:jwtExpire,
	} = process.env;

	if (!mongoURI) throw new Error('MongoDB url is required');
	if (!jwtSecretKey) throw new Error('jwtSecretKey is required');
	if (!jwtExpire) throw new Error('jwtExpire is required');
	
	return {
		mongoURI,
		port:Number(PORT) | 4949,
		jwtSecretKey,
        jwtExpire
	};
};

export const config = getConfig();
    