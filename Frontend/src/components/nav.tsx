type Properties = {
  leftName: string;
  leftIcon: string;
  rightName: [string, string, string];
};

function Nav(properties: Properties) {
  return (
    <nav className="w-full relative">
      <div className="w-full h-16"></div>
      <div className="fixed top-2 left-1/2 -translate-x-1/2 flex justify-center items-center w-10/12 glass z-50">
        <div className="w-11/12 flex justify-between">
          <div className=" flex space-x-2 items-center cursor-pointer">
            <div className="">
              <img
                src={`/${properties.leftIcon}`}
                alt="Console"
                className="w-12 fiveHundredPx:w-10"
              />
            </div>
            <div className="-mb-2 fiveHundredPx:text-sm fiveHundredPx:-mt-2">{properties.leftName}</div>
          </div>

          <div className="flex justify-evenly items-center space-x-6 fiveHundredPx:text-sm">
            {properties.rightName.map((name, index) => {
              return <p className="hover:border-b-2 cursor-pointer" key={index}>{name}</p>;
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
