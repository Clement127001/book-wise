# this is the first part of learning full stack devlopment on my own

- the major goal is to complete the application by april 10 (that all, it is need to be ready fo r deployment)

## the todo that are need to be checked are:

- [x] admin auth
- [x] user auth
- [x] add books
- [x] view book details and edit books
- [ ] admin dashboard

### the following things are need to be done before tuesday (14/03):

- [x] DB design -> the core basic is done
- [x] api design -> api routes are almost done
- [x] project setup for backend
- [x] Start backend
- [x] do auth part
- [x] frontend for auth part with the email verification
- [x] project setup for frontend with the colors -> no need for mobile responsiveness for v 1.0
- [x] admin panel routes
- [x] frontend for admin panel
- [x] user panel routes
- [x] user panel frontend
- [x] model development for book recommendation system
- [ ] deployment setup for the frontend
- [ ] deployment setup for the backend

## running db locally using postgres image with docker daemon

### to run the postgres image

- docker run --name some-postgres -e POSTGRES_PASSWORD=<you-password> -d <db_name>

### to connect to the psql in terminal

- docker exec -it <postgres-image-name> psql -U <user-name> -d <db-name>

## Design

- what are we are going to to is not split admin from superadmin ( where he is also the admin but with the superadmin role, so I can reuse everything that I could )
- we can only reuse the entity, but not the modules and controllers
