import { RouterProvider } from 'react-router';
import { router } from './routes';
import { LanguageProvider } from './config/LanguageContext';
import { AuthProvider } from '../lib/auth-context';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <LanguageProvider>
          <RouterProvider router={router} />
        </LanguageProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
