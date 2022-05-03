import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import * as GetUserAddress from "../../helpers/userAddress";

import UserAddress from './UserAddress';

jest.mock('@inrupt/solid-client');

test('check that the user address renders propertly', async () => {

  const address = [
    [
      'street address 1',
      'locality 1',
      'postal code 1',
      'region 1',
      'country name 1'
    ],
    [
      'street address 2',
      'locality 2',
      'postal code 2',
      'region 2',
      'country name 2'
    ]
  ];

  jest.spyOn(GetUserAddress, 'default').mockImplementation((_webId) => Promise.resolve(address));

  // Act
  await act(async () => {  
    render(<UserAddress webID='prueba'/>);
  });

  // Assert
  for (let i = 0; i < address.length; i++) {
    expect(screen.getByText(address[i][0] + ', ' + address[i][2])).toBeInTheDocument();
    expect(screen.getByText(address[i][1] + ', (' + address[i][3] + ')' )).toBeInTheDocument();
    expect(screen.getByText(address[i][4])).toBeInTheDocument();
  }
});
