import 'dotenv/config';

function assertNotAbsent(value) {
  if (value === null || value == undefined) {
    throw new Error('Environment variables missing!');
  }
  return value;
}

export default Object.freeze({
  MONGO_CONSTR: assertNotAbsent(process.env.MONGO_CONSTR),
  UPLOAD_DIR: assertNotAbsent(process.env.UPLOAD_DIR),
  EMAIL_HOST: assertNotAbsent(process.env.EMAIL_HOST),
  EMAIL_PORT: assertNotAbsent(process.env.EMAIL_PORT),
  EMAIL_SENDER_EMAIL: assertNotAbsent(process.env.EMAIL_SENDER_EMAIL),
  EMAIL_SENDER_PASS: assertNotAbsent(process.env.EMAIL_SENDER_PASS),
  RABBITMQ_CONSTR: assertNotAbsent(process.env.RABBITMQ_CONSTR),
});
