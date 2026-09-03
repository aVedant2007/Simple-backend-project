# Simple-backend-project — Build a Simple Newsletter Backend


## Objective

Build a minimal and clean **Express.js backend** using **PostgreSQL** and **Prisma ORM** to manage **newsletter articles**, **subscribers**, and **comments**.

The goal is simplicity: all logic will be kept inside route files (no separate controllers, services, or utils folders). The backend must support creating, reading, updating, and deleting newsletter content stored in **Tiptap JSON format**.

---

## Stack

- Language: **JavaScript**
- Framework: **Express.js**
- ORM: **Prisma**
- Database: **PostgreSQL (use local postgresql)**

### Learning  Material

[Backend with NodeJS, ExpressJS, JWT, PostgreSQL, Prisma](https://www.youtube.com/watch?v=g09PoiCob4Y&t=1826s)

---

## Tables & Fields

### 1. `articles` table

| Column | Type | Notes |
| --- | --- | --- |
| `id` | UUID (PK) | Auto-generated |
| `slug` | text (unique) | URL-friendly string |
| `title` | text | Required |
| `description` | text | Required |
| `contents` | JSONB | Tiptap content (required) |
| `cover_image` | text (nullable) | Optional image URL |
| `published_at` | timestamp | Optional |
| `tags` | text[] | Array of strings |
| `category_id` | UUID (nullable) | FK to `categories` |
| `status` | text | e.g. draft, published, archived |
| `type` | text | e.g. newsletter, update, etc. |
| `estimated_read_time` | integer | Minutes |
| `created_at` | timestamp | Default: now() |

---

### 2. `categories` table

| Column | Type | Notes |
| --- | --- | --- |
| `id` | UUID (PK) |  |
| `name` | text | Unique |
| `slug` | text | Optional |

---

### 3. `subscribers` table

| Column | Type | Notes |
| --- | --- | --- |
| `id` | UUID (PK) |  |
| `email` | text | Required & unique |
| `subscribed_at` | timestamp | Default: now() |
| `is_verified` | boolean | Default: false |
| `unsubscribe_token` | text | Optional for email link |

---

### 4. `comments` table

| Column | Type | Notes |
| --- | --- | --- |
| `id` | UUID (PK) |  |
| `article_id` | UUID | FK to `articles` |
| `author_name` | text | Optional / anonymous allowed |
| `content` | text | Comment content |
| `created_at` | timestamp | Default: now() |

---

## Routes to Implement

### Articles

| Method | Route | Description |
| --- | --- | --- |
| GET | `/articles` | List all published articles |
| GET | `/articles/all` | List all articles |
| GET | `/articles/:slug` | Get article by slug |
| POST | `/articles` | Create new article |
| PUT | `/articles/:id` | Update article |
| DELETE | `/articles/:id` | Delete article |

### Categories

| Method | Route | Description |
| --- | --- | --- |
| GET | `/categories` | List all |
| POST | `/categories` | Create new |

### Subscribers

| Method | Route | Description |
| --- | --- | --- |
| POST | `/subscribe` | Subscribe by email |
| GET | `/subscribers` | List all (optional) |

### Comments

| Method | Route | Description |
| --- | --- | --- |
| GET | `/articles/:id/comments` | List comments for article |
| POST | `/articles/:id/comments` | Add a comment |

---

## Project Structure (Simple)

```
/backend
├── /prisma
│   ├── schema.prisma
│   └── migrations/
├── /src
│   ├── routes/
│   │   ├── articles.js
│   │   ├── categories.js
│   │   ├── comments.js
│   │   └── subscribers.js
│   └── index.js
├── .env
├── package.json
└── README.md

```

> All logic should stay inside route files (no controllers/middleware/utils).

---

## Requirements Recap

- Use **JavaScript/TypeScript**
- Use **Express** + **Prisma**
- Use **PostgreSQL**
- Keep everything simple, in route files
- No authentication required
- Include timestamps & article status logic
