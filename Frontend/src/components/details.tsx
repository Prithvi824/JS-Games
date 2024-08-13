type info = {
  heading: string;
  para: string;
};

function Details(info: info) {
  return (
    <div className=" w-10/12 flex justify-center items-center p-2 mt-4">
      <div className="text-center">
        <h1 className="font-rubik text-3xl">{info.heading}</h1>
        <p className="font-notoSans text-base text-wrap opacity-90">{info.para}</p>
      </div>
    </div>
  );
}

export default Details;
