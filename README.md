# Andorra

In large projects, we usually have way more than one data model.

Except very rare situations, in every data model, we have an ID field.

For example;

```typescript
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}
```

If a function returns a `User` or `Product`, we can use the `ID` to find the data in the database.

That means, seperate functions can be used to find a `User` or `Product` by their `ID`s.

But, what if a developer pass `ID` of a product to a function that expects an `ID` of a `User`?

More generally, how can we differentiate `ID` of a `User` from `ID` of a `Product`?

In the [index.ts](./index.ts) file, we have a type to differentiate `ID` fields of different data models.

```typescript
type ID<T, Tag extends string> = T & { __id: Tag };
```

Basically, we `tag` different `ID` fields and make sure the expected `ID` field is tagged with the correct `tag`.

```typescript
type UserId = ID<number, 'UserId'>;

type ProductId = ID<number, 'ProductId'>;
```

In the below example, we have seperate functions that return `User` and `Product` objects, from different `ID`s.

```typescript
const getUser = (id: UserId) => {
  return {
    id,
    name: 'Engin Polat 🧑‍💻',
  };
};

const getProduct = (id: ProductId) => {
  return {
    id,
    name: 'Surface Book 3 Pro 💻',
  };
};
```

We can call these functions ONLY by passing correct `ID` to them.

```typescript
getUser(5 as UserId);
const userId = 5 as UserId;
getUser(userId);
```

Either it should be a `UserId` or a `number` that explicitely casted to `UserId`.

```typescript
getProduct(8 as ProductId);
const productId = 8 as ProductId;
getProduct(productId);
```

It's the same with `ProductId` field in the above example.

Good part is, it's not possible to call `getUser` with a `ProductId` or `getProduct` with a `UserId`.

```typescript
// We can't even compile the below code
getUser(productId);
getProduct(userId);
```
