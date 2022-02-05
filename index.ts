type ID<T, Tag extends string> = T & { __id: Tag };

type UserId = ID<number, 'UserId'>;

type ProductId = ID<number, 'ProductId'>;

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

getUser(5 as UserId);
const userId = 5 as UserId;
getUser(userId);

getProduct(8 as ProductId);
const productId = 8 as ProductId;
getProduct(productId);

getUser(productId);
getProduct(userId);
