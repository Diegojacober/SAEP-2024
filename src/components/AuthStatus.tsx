'use client';

import React from 'react';
import { fakeAuthProvider } from '../auth';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: any;
  signin: (user: string, password: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>(null);

  let signin = async (newUser: string, password: string, callback: VoidFunction) => {

    const formData = new URLSearchParams();
        formData.append('username', newUser);
        formData.append('password', password);

        try {
          fakeAuthProvider.signin(() => {
          });
            const response = await fetch('http://localhost:8000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Allow-Origin': '*'
                },
                body: formData.toString(),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setUser(data);
                callback();
            } else {
                console.log('Failed to login:', response.statusText);
            }

            return;
        } catch (err) {
            console.log('Error:', err);
        }
  };

  let signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

export default function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center">
        <span className="text-xl font-bold text-gray-800">SAEP 2024</span>
      </div>
      <div>
        <button  onClick={() => {
          auth.signout(() => navigate("/"));
        }} className="text-red-600 hover:text-red-900">Logout</button>
      </div>
    </div>

  );
}