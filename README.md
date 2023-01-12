# Bhuma insights with Cube and Postgres

The sql directory contains the ecommerce data base dump for postgres sql and the schema directory contains all the necessary schema files to be replaced in cubecloud. The below are the step by setup for creating a postgres account on supabase and cube cloud deployments. Once completed the full setup you can follow [Ecommerce Management App](https://docs.bhuma.dev/docs/e-commerce-management-app) to build with Bhuma
# Create a Cube Cloud account

<aside>
‼️ If you already have a Cube Cloud account, jump to the “Create a deployment in Cube Cloud” section.

</aside>

We'll be using Cube Cloud to build, deploy, and manage the Cube application during the workshop. While it's totally possible to build a self-hosted Cube app, we can save some time by using some developer tools available in Cube Cloud. 

1. Open the [sign-up page](https://cubecloud.dev/auth/signup)
2. Enter your name and email, then press **Sign Up**
![image](https://user-images.githubusercontent.com/94040257/211775238-db6a377a-eb80-4fd3-b559-af6b6ef30aa4.png)

    
3. Enter any **Cube Cloud subdomain** and your **company name**, then press **Get Started**
![image](https://user-images.githubusercontent.com/94040257/211775292-dfeb26fc-ed2a-479c-a817-842ddcd73bd7.png)

    
4. After a while, please check your inbox and proceed with **Set Password**

![image](https://user-images.githubusercontent.com/94040257/211775372-1139b283-2948-47cf-80e6-06a16629afcf.png)
    
5. Enter and confirm your password, then click **Sign Up**
    ![image](https://user-images.githubusercontent.com/94040257/211775520-192aeb84-003e-4a52-a3b4-b13af35d91ff.png)
 
    
6. Please accept the license agreement by clicking **Accept**
    
![image](https://user-images.githubusercontent.com/94040257/211775818-425be5fc-fe60-4012-bf0d-3d81dfef9d5b.png)
    

# Create a Supabase account

We’ll start by signing in to Supabase with GitHub.

1. Click **Sign in with GitHub**

![image](https://user-images.githubusercontent.com/94040257/211776103-2009617d-0e3d-4103-993e-e28bf7546103.png)

2. Authorize Supabase in your GitHub account

![image](https://user-images.githubusercontent.com/94040257/211776160-82cc0bc8-4b47-4b79-bc5c-d6e7adc2f990.png)
3. Continue by creating a new organization

![image](https://user-images.githubusercontent.com/94040257/211776208-2d8e0cad-d669-4f93-9354-ed3f3a17885a.png)

4. Then create a new project within your organization. Make sure to save the password. You’ll need it later in the workshop to import data.

![image](https://user-images.githubusercontent.com/94040257/211776478-f2f4818a-59db-4e8c-b722-74face8e1bbb.png)
# Import the dataset into Supabase

1. Now you can import the e-commerce dataset we’ll use for the workshop. Go to the SQL Editor. In the SQL Editor, run this query:
    
    ```sql
    ALTER ROLE postgres SUPERUSER;
    ```
    
2. Copy the database host from the settings
*In my example, the Host is: `db.nykpkgkczcbynhhmfbrr.supabase.co`*

![image](https://user-images.githubusercontent.com/94040257/211776676-306f05ab-a0f3-43b5-ad26-cf3f56f1f04e.png)

2. Open your terminal, and run the import with the `ecom-dump.sql` file below.
    
    [ecom-dump.sql] from the sql directory 
    
    ```bash
    export DB_URL=<your_db_host>
    psql -h $DB_URL -U postgres -f ecom-dump.sql
    ```
    
    You’ll get a password prompt, and paste the password you added when you created your project. Wait for the import, and get a ☕  in the meantime. 😄
    
2. Go back to the SQL Editor in Supabase, and run:
    
    ```sql
    ALTER ROLE postgres NOSUPERUSER;
    ```
    
3. Add a database user for connecting the database with Cube Cloud
    
    ```sql
    CREATE USER cube with encrypted password '12345';
    GRANT USAGE ON SCHEMA public TO cube;
    ```
    

# Create a deployment in Cube Cloud

We'll start by creating a new deployment which is a combination of a Cube application (defined by a data schema and configuration) and infrastructure it's using (defined by a cloud provider, region, cluster settings, etc.).

1. Start by clicking **Create Deployment**
    
![image](https://user-images.githubusercontent.com/94040257/211776850-1901c153-e22c-49bd-8893-7acc97763c31.png)
    
2. Enter any name, select any cloud provider and region, then press **Next**
    
![image](https://user-images.githubusercontent.com/94040257/211776893-e08a8138-53ef-446c-8dc7-02b3cf0e7fac.png)
    
3. Create a new Cube application from scratch by choosing **Create**
    
![image](https://user-images.githubusercontent.com/94040257/211776944-9c788a66-7701-463e-86af-c7fb8547bf1b.png)
    
4. Proceed with selecting **PostgreSQL** for a data source connection
    
 ![image](https://user-images.githubusercontent.com/94040257/211777023-88370348-d779-49c8-ac13-07bd969dd53a.png)
    
5. Enter the following credentials for the database
    - Hostname: `<your_database_host>`
    *For me that would be `db.nykpkgkczcbynhhmfbrr.supabase.co`*
    - Port: `5432`
    - Database: `postgres`
    - Username: `cube`
    - Password: `12345`
    *Remember, you’re using the `cube` user you created in the previous step.*

![image](https://user-images.githubusercontent.com/94040257/211777096-6dfbb390-8efa-44bf-a961-dbcc63b5d50d.png)

7. Please select the **public** schema which we'll be using during the workshop. Click **Generate** to create the data schema

![image](https://user-images.githubusercontent.com/94040257/211777232-c5214bf6-331f-41d7-a1c2-4d70f4a18114.png)

**Once the schema is generated, replace all the files in the schema dierctory with the schema files in the github directory**

8. Wait a bit until your deployment is ready and explore the **Overview** page

![image](https://user-images.githubusercontent.com/94040257/211777295-570388ec-3630-4388-a6a7-36ea9e1f3715.png)


Great! Once you have gotten to this point, you're all set for the workshop.

Congratulations 🎉

**Follow  [Ecommerce Management App](https://docs.bhuma.dev/docs/e-commerce-management-app) and build using bhuma**
