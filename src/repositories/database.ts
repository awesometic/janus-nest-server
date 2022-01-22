import mariadb, {QueryOptions} from 'mariadb';

// Is the app running in production mode?
const isProduction = process.env.NODE_ENV === 'production';
console.log('isProduction:', isProduction);

// Create database connection pool
let pool: mariadb.Pool;

if (isProduction) {
  pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,
  });
} else {
  pool = mariadb.createPool({
    host: 'localhost',
    user: 'awesometic',
    password: 'didejrrb',
    database: 'janus',
    connectionLimit: 10,
  });
}

/**
 * Check if the database has a table at least 1
 * @return {Promise<boolean>} Promise that resolves to true if the table exists
 */
async function checkTableExists(): Promise<boolean> {
  const rows = await execute('SHOW TABLES');

  return new Promise((resolve, reject) => {
    resolve(rows.length > 0);
  });
}

/**
 * Executes a query.
 * @param {string | QueryOptions} sql Query to execute
 * @param {any?} values Query options
 * @return {Promise<any>} Promise that resolves to the result of the query
 * @throws Error if the query fails
 * @example
 * execute('SELECT * FROM users WHERE id = ?', [1])
 */
async function execute(sql: string | QueryOptions, values?: any): Promise<any> {
  const conn = await pool.getConnection();
  try {
    return conn.query(sql, values);
  } finally {
    conn.end();
  }
}

export {checkTableExists, execute};
