module.exports = {
  adminPort: 13300,
  adminBaseURL: 'http://localhost:13299',
  adminJwtSecret: '<TmplDemo Random 32>',
  mysql: {
    accountDB: {
      host: '127.0.0.1',
      port: 3306,
      dialect: 'mysql',
      database: 'demo_db',
      username: 'root',
      password: '',
    },
  },
}
