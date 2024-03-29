import { SideNav } from "../components/SideNav";
import {
  Body,
  LeftPanel,
  MiddlePanel,
  RightPanel,
} from "../components/social/components";

import Header from "../components/social/Header";

const Social = () => {
  return (
    <main className=" mx-auto p-2 flex flex-col ">
      <div
        className="bg-white  flex px-2 overflow-hidden"
        style={{ height: "98vh", minHeight: "730px" }}
      >
        {/* side Icons Nav */}
        <SideNav />

        <div className="bg-gray-200 flex flex-1 flex-grow flex-col items-center">
          {/* TODO: Add social main header */}
          <Header />

          {/* TODO: Add Social main body */}
          <Body>
            {/* left panel */}
            <LeftPanel />
            {/* middle panel */}
            <MiddlePanel />

            {/* right panel */}
            <RightPanel />
          </Body>
        </div>
      </div>
    </main>
  );
};

export default Social;
