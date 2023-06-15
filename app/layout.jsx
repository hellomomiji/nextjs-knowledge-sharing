import Nav from '@components/Nav';
import '@styles/globals.css';
import Provider from '@components/Provider';

export const metadata = {
  title: 'Shared Prompts',
  description: 'Discover and Share AI Prompts',
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="griadient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
