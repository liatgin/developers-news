import {Pool} from 'pg';

const pool = new Pool ({
    max: 20,
    //connectionString: 'postgres://root:newPassword@localhost:port/dbname',
    // connectionString: 'postgres://postgres:newPassword@postgres:5432/dev-news-db',
    connectionString: 'postgres://postgres:newPassword@localhost:5432/dev-news-db',
    idleTimeoutMillis: 30000
});

export default pool;