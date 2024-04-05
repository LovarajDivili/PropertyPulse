import Navbar from '../components/Navbar'
import '../assests/styles/global.css'
import Footer from '../components/Footer'
import AuthProvider from './../components/AuthProvider';

export const metadata = {
  title:'propertyPulse | Find the Perfect Rental',
  description: 'Find your dream rental property'
}

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="eng">
      <body>
      <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
    </ AuthProvider > 
  );
};

export default MainLayout;
