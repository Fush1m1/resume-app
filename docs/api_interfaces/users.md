# User

## props

| prop | type | required | notes |
|--------------------|-----------------|------|----------------------------------------|
| `id`              | `number`       | T |  |
| `name`            | `string`       | T |  |
| `email`           | `string`       | T |  |
| `createdAt`       | `Date`         | T |  |
| `deletedAt`       | `Date`         | F |  |
| `isAdmin`         | `boolean`      | T |  |
| `isArtist`        | `boolean`      | T |  |

## sample

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  deletedAt?: Date;
  boolean: isAdmin;
  boolean: isArtist;
}

const exampleUser: User = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  createdAt: new Date("2025-01-01T10:00:00Z"),
  deletedAt: undefined,
  isAdmin: false,
  isArtist: true,
};
```
