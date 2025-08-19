import { Outlet } from 'react-router-dom';
import Navbar from '../common/components/shared/Navbar';

const MainLayout = () => {

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-200 `}>
      <Navbar />
      <div className="flex-1 mt-10">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
