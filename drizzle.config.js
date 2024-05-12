/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.jsx",
    dialect: 'postgresql',
    driver: "aws-data-api",
    dbCredentials: {
      url: 'postgresql://Expensedb_owner:CeViSO2JH1cz@ep-super-frog-a12dfb23.ap-southeast-1.aws.neon.tech/budgets?sslmode=require',
    }
  } ;
