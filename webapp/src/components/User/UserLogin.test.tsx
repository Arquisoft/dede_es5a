import {getByRole, render, screen, waitFor} from '@testing-library/react';

import UserLogin from './UserLogIn';
import UserEvent from '@testing-library/user-event';

jest.mock('@inrupt/solid-client');

test('check the pod inrupt provider', async () => {

  render(<UserLogin />);

  UserEvent.click(getByRole(screen.getByTestId("provider"),"button"));
  await waitFor(() => UserEvent.click(screen.getByText("https://broker.pod.inrupt.com")));
  expect(screen.getByRole("listbox")).toHaveTextContent("https://broker.pod.inrupt.com");
 
});

test('check the inrupt provider', async () => {

 render(<UserLogin />);

 UserEvent.click(getByRole(screen.getByTestId("provider"),"button"));
 await waitFor(() => UserEvent.click(screen.getByText("https://inrupt.net")));
 expect(screen.getByRole('button',{expanded:false})).toHaveTextContent("https://inrupt.net");

});

test('check the solid community provider', async () => {

 render(<UserLogin />);

 UserEvent.click(getByRole(screen.getByTestId("provider"),"button"));
 await waitFor(() => UserEvent.click(screen.getByText("https://solidcommunity.net/")));
 expect(screen.getByRole('button',{expanded:false})).toHaveTextContent("https://solidcommunity.net/");

});

test('check the login button', async () => {

 render(<UserLogin />);

 const signIn = await screen.getByText('Sign In')
 await waitFor(() => expect(signIn).toBeInTheDocument())
});
