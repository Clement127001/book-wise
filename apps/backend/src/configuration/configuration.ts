export default () => ({
  port: parseInt(process.env['PORT'] || '3001', 10),
  database: {
    dbUrl: process.env['DATABASE_URL'],
  },
  secret: process.env['JWT_SECRET'] || 'super-secret-123',
  aws: {
    accessekey: process.env['AWS_ACCESS_KEY'],
    secretKey: process.env['AWS_KEY_SECRET'],
    region: process.env['AWS_REGION'],
    bucket: process.env['AWS_S3_BUCKET'],
  },
});
