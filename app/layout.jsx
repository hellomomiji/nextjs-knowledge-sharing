import Nav from '@components/Nav';
import '@styles/globals.css';
import Provider from '@components/Provider';

export const metadata = {
  title: 'Campus DevShare',
  description: 'Join our vibrant community to discover, create, and share valuable learning tips, practical insights, and innovative ideas. Elevate your learning journey at Campus DevShare, where knowledge knows no boundaries',
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
