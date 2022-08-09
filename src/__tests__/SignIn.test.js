import React from 'react';
import { render, screen, fireEvent, waitFor } from '../setupTests';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { signIn } from '../Components/services/authServices';
import axios from 'axios';

import { SignInForm } from '../Components/utils';

const server = setupServer(
  rest.post('http://localhost:3001/users/sign_in', (req, res, ctx) => {
    return res(ctx.json({ id: 1, username: "testing", admin: false }));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


describe("testing signin form", () => {
  test("Renders the Signin Form", () => {
    render(<SignInForm />);

    const email = screen.getByTestId('sign-in-email');
    const password = screen.getByTestId('sign-in-password');

    expect(
      email.value
    ).toBe("");
    expect(
      password.value
    ).toBe("");
  });
  test("email field fills correctly", () => {
    render(<SignInForm />);

    const email = screen.getByTestId('sign-in-email');
    fireEvent.change(email, { target: { value: "1@qwerty.com" } });
    expect(
      email.value
    ).toBe("1@qwerty.com");
  });
  test("password field fills correctly", () => {
    render(<SignInForm />);

    const password = screen.getByTestId('sign-in-password');
    fireEvent.change(password, { target: { value: "qwerty" } });
    expect(
      password.value
    ).toBe("qwerty");
  });
  test("clicking toggle password visibility changes password input type to text", () => {
    render(<SignInForm />);

    const password = screen.getByTestId('sign-in-password');
    const visibilityToggle = screen.getByLabelText('toggle password visibility');

    expect(password).toHaveAttribute('type', 'password');
    fireEvent.click(visibilityToggle);
    expect(password).toHaveAttribute('type', 'text');
  });
  test("Submit Resets Form", async () => {

    render(<SignInForm />);

    const email = screen.getByTestId('sign-in-email');
    const password = screen.getByTestId('sign-in-password');
    const submitButton = screen.getByTestId('sign-in-submit');

    fireEvent.change(email, { target: { value: "1@qwerty" } });
    fireEvent.change(password, { target: { value: "qwerty" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        email.value
      ).toBe("");
      expect(
        password.value
      ).toBe("");
    });
  });
});