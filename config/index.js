"use strict";
export const port = 9001;
export const host = "127.0.0.1";
export const environment = "development";
export const SERVICE_NAME = "user-platform";
export const runClusterServer = false;

export const mongodb = { uri: "mongodb://saif:M7vTiI7nRIJd@ds055905.mlab.com:55905/calories-counting-webapp" };


export const options = {
	reconnectTries: 100,
	reconnectInterval: 500,
	autoReconnect: true,
	//useNewUrlParser: true,
	dbName: "platform"
};

// THis_is_my_SECRET_LoL
// SET 
export const utils = {
	CRON_WORKER: "*/2 * * * * *",
	PASSWORD_SALT: "THis_is_my_SECRET_LoL_93fb06ad5b387ef3210e90e37fac2e9aaff06929e062ff3671168b1aa20f4e7b",
	JWT_SECRET: "THis_is_my_SECRET_LoL_93fb06ad5b387ef3210e90e37fac2e9aaff06929e062ff3671168b1aa20f4e7b",
	JWT_TOKEN_EXPIRE: 2 * 86000, // 2 day

	ENCRYPT_SALT: "THis_is_my_SECRET_LoL_93fb06ad5b387ef3210e90e37fac2e9aaff06929e062ff3671168b1aa20f4e7b",
	// ENCRYPT_TOKEN_EXPIRE: 2 * 86000, // 2 day

};

export const secret = {
	NODE_TOKEN_SECRET: "Basic 93fb06ad5b387ef3210e90e37fac2e9aaff06929e062ff3671168b1aa20f4e7b",
};
export const amazon = {
	bucketName: "Nothing",
	imageUrl: "Nothing"
};
