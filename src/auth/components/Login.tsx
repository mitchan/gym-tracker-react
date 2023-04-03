import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';

import { Button } from '../../core/Button';
import { InputText } from '../../core/input/InputText';
import { auth } from '../../firebase/firebase';

export function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      console.error(error);
    });
  }

  return (
    <div className="h-full flex justify-center items-center">
      <form onSubmit={handleSubmit} className="px-5 w-full">
        <InputText
          label="Email"
          name="email"
          value={email}
          onChange={setEmail}
        />

        <InputText
          type="password"
          label="Password"
          name="password"
          value={password}
          onChange={setPassword}
        />

        <Button label="Login" type="submit" />
      </form>
    </div>
  );
}
