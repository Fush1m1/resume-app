```mermaid
erDiagram
  users {
    bigint id PK
    string name
    string avatar_url
    timestamp created_at
    timestamp deleted_at
  }
```