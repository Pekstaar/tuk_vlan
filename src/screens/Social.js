import { SideNav } from "../components/SideNav";
import Header from "../components/social/Header";

const Social = () => {
  return (
    <main className="container mx-auto p-2 flex flex-col ">
      <div
        className="bg-white  flex px-2"
        style={{ height: "96vh", minHeight: "730px" }}
      >
        {/* side Icons Nav */}
        <SideNav />

        <div className="bg-gray-200 flex flex-1 flex-grow">
          {/* TODO: Add social main header */}
          <Header />

          {/* TODO: Add Social main body */}
        </div>
      </div>
    </main>
  );
};

export default Social;
