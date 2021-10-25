# Organizations-API

## Running Application

To run the application, assuming that you have Docker installed, you can follow these steps:

### Create .env file
We will run the application in development, and it's already sets on `docker-compose.yml` file, so create a new file
name `.env.dev` on the root of this project:

```text
APPLICATION_PORT=8012
POSTGRES_USER=postgres
POSTGRES_PASSWORD=pass
POSTGRES_PORT=5432
SEED_FOLDER=./seeds
```

Or you can rename the provided file `.env.example` to `.env.dev`
and reconfigure it as you like

### Running docker-compose
This application (organizations-api) will be automatically built when running the command below.

```shell
docker-compose --env-file ./.env.dev up --renew-anon-volumes -d postgres organizations-api
```

These are the explanations for those command:

1) Run containers by passing the `.env.dev` file
2) `-d postgres organizations-api` is argument parameter when we needs to run specific containers,
    in these case is `postgres` and `organizations-api`
3) `--renew-anon-volumes` is an options we use when we want to recreate new volumes instead of using the previous volume
   by containers
   
The application will be started, and will be running on `localhost:8123`. We can also access the PostgreSql database on
`localhost:54326`

### Routes
Here is the list of the routes:
```text
GET /orgs/{orgId}/comments => Gets all comments posted on specific organization
POST /orgs/{orgId}/comments => Post / publish comment on specific organization
DELETE /orgs/{orgId}/comments => Delete / Change the status of all comments on specific organization

GET /orgs/{orgId}/members => Get all members on specific organization and sorts it by followers count
```

### Seeds data
Seeds data means that data will be provided whenever the application is starting up.

Here are the list of Organizations registered in database:

| orgId        | Organization |
| ------------- |:----------:|
| xendit      | Xendit       |
| google      | Google       |
| apple       | Apple        |
| microsoft   | Microsoft    |
| lestari     | Lestari      |


