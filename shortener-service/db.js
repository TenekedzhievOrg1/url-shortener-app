import { Pool } from "pg";
import dotenv from "dotenv";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

dotenv.config();

async function getDbCredentials() {
  try {
    const client = new SecretsManagerClient({ region: process.env.AWS_REGION });
    const command = new GetSecretValueCommand({
      SecretId: process.env.AWS_SECRETS_MANAGER_NAME,
    });
    const secret = await client.send(command);
    return JSON.parse(secret.SecretString);
  } catch (err) {
    console.error("Failed to fetch DB credentials from Secrets Manager:", err);
    throw err;
  }
}

async function createPool() {
  const { username, password } = await getDbCredentials();

  const pool = new Pool({
    connectionString: `postgres://${username}:${password}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}`,
  });

  return pool;
}

const pool = await createPool();

export default pool;
