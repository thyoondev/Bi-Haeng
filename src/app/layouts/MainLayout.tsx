import HeaderLayout from "./HeaderLayout";
import NavLayout from "./NavLayout";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="grid min-h-screen w-full pl-[56px]">
      <NavLayout />
      <div className="flex flex-col">
        <HeaderLayout />
        <main className="grid grid-rows-2 md:grid-rows-1 lg:grid-rows-1 flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
