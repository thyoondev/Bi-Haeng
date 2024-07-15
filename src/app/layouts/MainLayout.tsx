import HeaderLayout from "./HeaderLayout";
import NavLayout from "./NavLayout";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="grid min-h-screen w-full md:pl-[56px]">
      <NavLayout />
      <div className="flex flex-col">
        <HeaderLayout />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
