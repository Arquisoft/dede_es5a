import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../App';
import ProductList from "./ProductList";
import {Product} from "../../shared/shareddtypes";

test('check that the list of products renders propertly', async () => {
  // Arrange
  const productList: Product[] = [
    {
      "_id": "6228ea24dc1289fc6e1c3b12",
      "name": "British",
      "type": "Medium",
      "price": 20,
      "brand": "Silk",
      "description": "Typical British",
      "image": "images/products/British.jpg",
      "disponibility": [
        {
          "size": 40,
          "stock": 5
        },
        {
          "size": 41,
          "stock": 2
        },
        {
          "size": 42,
          "stock": 1
        },
        {
          "size": 37,
          "stock": 5
        }
      ]
    },
    {
      "_id": "6228ea24dc1289fc6e1c3b13",
      "name": "Irish",
      "type": "High",
      "price": 20,
      "brand": "Silk",
      "description": "Typical Irish",
      "image": "images/products/Irish.jpg",
      "disponibility": [
        {
          "size": 40,
          "stock": 3
        },
        {
          "size": 46,
          "stock": 2
        },
        {
          "size": 42,
          "stock": 1
        },
        {
          "size": 37,
          "stock": 5
        }
      ]
    }
  ];

  // Act
  const {getByText} = render(<ProductList products={productList}/>);


  // Assert
  expect(screen.getByText(productList[0].name.toUpperCase())).toBeInTheDocument();
  
  expect(screen.getByText(productList[1].name.toUpperCase())).toBeInTheDocument();
});
