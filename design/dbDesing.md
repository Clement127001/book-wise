# Database design

---

> **_NOTE:_** for more contents

take look at this link for more details : https://app.eraser.io/workspace/e8fx0ybLIw4hAng5GGR4?origin=share

> **_Desgin_:** figma
> take the look at this figma
> https://www.figma.com/design/GtXhGy4Tmx1PesvcZfnIEB/Library-Management-System-(Copy)?node-id=2-2

---

### User

```
User[icon:user, color: White]{
  id              String         @id @default(uuid())
  name            String
  avatarUrl       String
  identityCardUrl String
  email           String    @unique
  isDeleted       Boolean   @default(false)
  status          enum["pending","denied","verified"] @default("pending")

  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt
}
```

### Admin

- for now we are only considering the single library as the source.
- future advancement add college or univerysity, assign admin, then the user will belongs to single university

```
Admin[icon:gcp-administration,color:blue]
{
  id           String    @id @default(uuid())
  firstname    String
  lastname     String
  avatarUrl    String
  email        String         @unique

  createdAt    DateTime       @default(now())
  updatedAt    DateTime       @updatedAt
}
```

### Books

- books that are availble in the single library

```
Book[icon:book,color:cyan]
{
  id           String @id @default(uuid())
  author       String
  title        String
  summary      String
  total        Number
  available    Number
  isDeleted    Boolean   @default(false)
  genredId     String
  Genre        Genre @relation(fields: [genredId], references: [id])
  rating       Float @deafult(0.0)

  createdAt    DateTime       @default(now())
  updatedAt    DateTime       @updatedAt
}
Book.genredId - Genre.id
```

### BookRating

- for rating and average rating
- one user can give atmost 1 review to 1 book

```
BookRating[icon:star,color:yellow]
{
    id          String @id @default(uuid())
    rating      Float @default(0.0)
    userId      String
    bookId      String
    User        User @relation(fields:[userId], reference[id])
    Book        Book @relation(fields:[bookId], reference:[id])

    createdAt   DateTime @default(now())
    updatedAt   DateTime @updatedAt

    @@index([bookId])
    @@unique([userId,bookId])
}
BookRating.userId - User.id
BookRating.bookId - Book.id
```

### Genre

- genre of the book
- can be modified by admin

```
Genre[icon:cloud-snow,color:red]
{
  id          String @id @default(uuid())
  title       String

  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt
}
```

### BorrowedBooks

- for maitaining the borrowed books list

```
BorrowedBooks[icon:hand,color:white]{
  id                String @id @default(uuid())
  userId            String
  User              @relation(fields: [userId], references: [id])
  bookId            String
  expectedReturn    DateTime
  actualReturn      DateTime?
  fineAmount        Float @default(0.0)
  Book              @relation(fields: [bookId], references:[id])
  status            enum["pending","borrowed","returned","late return"] @default("pending")

  borrowedAt        DateTime       @default(now())
  createdAt         DateTime       @default(now())
  updatedAt         DateTime       @updatedAt

  @@index([bookId]) // for borrowed books
  @@unique([userId, bookId, borrowedAt])
  @@index([userId]) // for user based retrievals
}
BorrowedBooks.userId - User.id
BorrowedBooks.bookId - Book.id
```

### BorrowReqeust

- maintaint borrow request in separte table so that it will be easy to query and manage
- having expiry and cool down for [rejected, expired]

```
BorrowRequest[icon:bookmark,color:orange]{
  id                  String @id @default(uuid())
  userId              String
  bookId              String
  status              enum["pending","accepted","rejected","expired"] @default("pending")
  expectedBorrowDate  DateTime?
  coolDownExpiresAt   DateTime?
  User                User @relation(fields:[userId],references:[id]);
  Book                Book @relation(fields:[bookId],references:[bookId])

  createdAt           DateTime       @default(now())
  updatedAt           DateTime       @updatedAt

  @@index([userId,bookId])
}
BorrowRequest.userId - User.id;
BorrowRequest.bookid - Book.id;
```

### LoginOTP

- otp expires time 10 mins

```
LoginOTP[icon:mail,color:white]{
  id          String @id @default(uuid())
  otp         String
  isUsed      Boolean @default(false)
  userId      String
  User        User @relation(fields:[userId],reference:[id])
  expiresAt   DateTime

  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt

  @@index([userId])
  @@unique([userId,otp])
}
LoginOTP.userId > User.id;
```

### RegisterOTP

- otp expires time 10 mins

```
RegisterOTP[icon:mail,color:white]{
  id          String @id @default(uuid())
  otp         String
  email       String
  isUsed      Boolean @default(false)
  expiresAt   DateTime

  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt
}
```
