const Unauthorized = () => {
    return (
      <div className="flex flex-col items-center justify-center h-[100vh] bg-gray-800">
        <h1 className="text-red-600 font-bold text-2xl md:text-[50px] sm:text-2xl">
          Unauthorized Access
        </h1>
        <p className="text-sm text-white md:text-lg sm:text-base mt-4">
          You do not have permission to view this page.😠
        </p>
      </div>
    );
  };
  
  export default Unauthorized;
  