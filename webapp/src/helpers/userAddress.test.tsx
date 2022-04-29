import GetUserAddress from "../helpers/userAddress";
import * as solid from "@inrupt/solid-client";
import { OfflinePin } from "@mui/icons-material";

jest.mock('@inrupt/solid-client');

test('check that adress is generated correctly', async () => {


  jest.spyOn(solid, 'getUrlAll').mockImplementation((_profile, _type) => ['address1', 'address2']);
  jest.spyOn(solid, 'getStringNoLocale').mockImplementation((_profile, _type) => 'field');

  // Act
  const address = await GetUserAddress('');

  // Assert
  for (let i = 0; i < address.length; i++) {
    expect(address[i][0]).toBe('field');
    expect(address[i][1]).toBe('field');
    expect(address[i][2]).toBe('field');
    expect(address[i][3]).toBe('field');
    expect(address[i][4]).toBe('field');
  }
});

test('check that adress is generated correctly when there isn\'t one', async () => {


  jest.spyOn(solid, 'getUrlAll').mockImplementation((_profile, _type) => []);
  jest.spyOn(solid, 'getStringNoLocale').mockImplementation((_profile, _type) => 'field');

  // Act
  const address = await GetUserAddress('');

  // Assert
    expect(address.length).toBe(0);
  
});