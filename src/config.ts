import 'dotenv/config';

function assertNotAbsent(value) {
  if (value === null || value == undefined) {
    throw new Error('Environment variables missing');
  }
  return value;
}

export default Object.freeze({
  MONGO_CONSTR: assertNotAbsent(process.env.MONGO_CONSTR),
  UPLOAD_DIR: assertNotAbsent(process.env.UPLOAD_DIR),
});
