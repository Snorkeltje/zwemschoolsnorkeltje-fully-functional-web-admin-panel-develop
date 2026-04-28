import { RouterProvider } from 'react-router';
import { router } from './routes';
import { LanguageProvider } from './config/LanguageContext';
import { AuthProvider } from '../lib/auth-context';

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <RouterProvider router={router} />
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
