'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'sonner';
import { store, persistor } from '../../../redux/store';

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            classNames: {
              toast: 'bg-orange-500 text-white rounded-xl shadow-md',
            },
          }}
        />
      </PersistGate>
    </Provider>
  );
}