import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
          personal {
            name
            data
          }
        }
      }
    }
  }
`;

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
        name
      }
      personal {
        name
        data
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      price
      quantity
      category {
        _id
        name
      }
      personal {
        name
        data
      }
    }
  }
`;

export const QUERY_SINGLE_ORDER = gql`
  query Query($id: ID!) {
    order(_id: $id) {
      products {
        _id
        description
        image
        name
        price
        quantity
      }
      _id
      purchaseDate
    }
  }
`;
