import { Pool } from "pg";
import dotenv from "dotenv";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const client = new SecretsManagerClient({ region: process.env.AWS_REGION });
const command = new GetSecretValueCommand({
  SecretId: process.env.AWS_SECRETS_MANAGER_NAME,
});
const secret = await client.send(command);
const { username, password } = JSON.parse(secret.SecretString);

dotenv.config();

const pool = new Pool({
  connectionString: `postgres://${username}:${password}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}`,
});

export default pool;
