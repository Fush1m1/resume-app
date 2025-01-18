```mermaid
erDiagram
  users {
    bigint id PK
    string name
    string email
    
    string avatar_url
    timestamp created_at
    timestamp deleted_at
  }

  artworks {
    bigint id PK
    bigint auther_id 
    string name
  }
```