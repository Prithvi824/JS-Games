type LoaderOptions = {
  width: string,
  padding: string,
  color: string,
}

function Loader(options: LoaderOptions) {
  return (
    <div className="loader" style={{width: `${options.width}`, padding:`${options.padding}`}}>
      <svg className="circular" viewBox="25 25 50 50">
        <circle
          className="path"
          stroke={`${options.color}`}
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth="2"
          strokeMiterlimit="10"
        ></circle>
      </svg>
    </div>
  );
}

export default Loader;
