# this is the first part of learning full stack devlopment on my own

- the major goal is to complete the application by april 10 (that all, it is need to be ready fo r deployment)

## the todo that are need to be checked are:

- [x] admin auth
- [x] user auth
- [ ] admin dashboard
- [x] add books
- [x] view book details and edit books

### the following things are need to be done before tuesday (14/03):

- [x] DB design -> the core basic is done
- [x] api design -> api routes are almost done
- [x] project setup for backend
- [x] Start backend
- [x] do auth part
- [x] frontend for auth part with the email verification
- [x] project setup for frontend with the colors -> no need for mobile responsiveness for v 1.0
- [ ] admin panel routes
- [ ] frontend for admin panel
- [ ] user panel routes
- [ ] user panel frontend
- [ ] model development for book recommendation system
- [ ] deployment setup for the frontend
- [ ] deployment setup for the backend

## running db locally using postgres image with docker daemon

### to run the postgres image

- docker run --name some-postgres -e POSTGRES_PASSWORD=<you-password> -d <db_name>

### to connect to the psql in terminal

- docker exec -it <postgres-image-name> psql -U <user-name> -d <db-name>
