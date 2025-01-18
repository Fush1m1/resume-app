```mermaid
erDiagram
  users {
    bigint id PK
    string name
    string email
    timestamp createdAt
    timestamp deletedAt
    boolean isAdmin
    boolean isArtist
  }

  artworks {
    bigint id PK
    bigint auther_id 
    string name
  }
```