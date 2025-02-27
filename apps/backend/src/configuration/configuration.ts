export default () => ({
  port: parseInt(process.env['PORT'] || '3001', 10),
  database: {
    dbUrl: process.env['DATABASE_URL'],
  },
});
