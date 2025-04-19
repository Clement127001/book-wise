# API design

- maintain the borrow requrest, is the most important thing

## User flow

### User

- Register with otp :

  - `generateUserRegisterOTP`
  - `verifyUserRegisterOTP`

- Login in with otp :

  - `generateUserLoginOTP`
  - `verifyUserLoginOTP`

- Profile Page

  - `getUserProfile`
  - `updateUserProfile`
  - `getBorrowedBooks` => **paginated**

### Home page

- `getHomePageData` -> contain most popular book and list of popular books **limit -> 10** which are also :

  - availabe
  - that can be borrowed by the user, that means it is returned by the user and he was crossed the cool down period

### Search page

- same for user and admin
- `searchBooks` -> that can used to search in the weighted text **paginated**

  - A:Title
  - B:author
  - C:Genred
  - D:Summary

### Book Detail page

- have page details with the similar books
- **very important page for user**
- same for both user and admin
- `getBookDetails`
- `getSimilarBooks` => **paginated**

## Admin flow

- `generateAdminLoginOTP`
- `verifyAdminLoginOTP`

### Admin Dashboard page

- not having search

- `getPageStats`
- `getBorrowRequest`
- `getRecentlyAddedBooks`
- `getRecentAccountRequests`

### All Users page

- `getAllVerifiedUsers` **paginated**
- `deleteUser` - will mark isDeleted as true

### All Books page

- going to be same for both user and admin
- having search, sort by popularity

  - `searchBooks` **paginated**

### Book Detail page

- `getBookDetails`
- `editBookDetails`
- `deleteBook` - will mark isDeleted as true

### Borrow Request page

- having search and sort
- `changeBorrowRequestStatus` **paginated**

### Account Request page

- having search and sort
- `changeAccountRequestStatus` **paginated**
