# **User**

## props

| prop | type | required | notes |
|--------------------|-----------------|------|----------------------------------------|
| `id`              | `number`       | T |  |
| `name`            | `string`       | T |  |
| `email`           | `string`       | T |  |
| `age`             | `number`       | F |  |
| `isActive`        | `boolean`      | T |  |
| `createdAt`       | `Date`         | T |  |
| `roles`           | `string[]`     | T |  |

## sample

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  isActive: boolean;
  createdAt: Date;
  roles: string[];
}

const exampleUser: User = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  isActive: true,
  createdAt: new Date(),
  roles: ["admin", "editor"]
};
```
