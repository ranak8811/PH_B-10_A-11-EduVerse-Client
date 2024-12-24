import axios from "axios";
import Heading from "../components/Heading";
import { useEffect, useState } from "react";
import ServiceCard from "../components/ServiceCard";
import useTitle from "../../public/PageTitle/title";
import { useLoaderData } from "react-router-dom";

const AllServices = () => {
  useTitle("All Services");
  const [allServices, setAllServices] = useState([]);
  const [search, setSearch] = useState("");
  const { count } = useLoaderData();
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const numberOfPages = Math.ceil(count / itemsPerPage);

  const pages = [...Array(numberOfPages).keys()];

  const fetchPopularServices = async () => {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/allServices?searchParams=${search}&page=${currentPage}&size=${itemsPerPage}`
    );
    setAllServices(data);
  };

  useEffect(() => {
    fetchPopularServices();
  }, [search, currentPage, itemsPerPage]);

  const handleItemsPerPage = (e) => {
    const value = parseInt(e.target.value);
    setItemsPerPage(value);
    setCurrentPage(0);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <header>
        <Heading
          title={"All Courses"}
          subtitle={
            "Explore our extensive library of courses designed to empower your learning journey. Whether you're seeking to acquire new skills, advance your career, or simply satisfy your curiosity, you'll find a diverse range of engaging courses taught by expert instructors. From beginner-friendly introductions to advanced specializations, our platform offers something for everyone, ensuring you can find the perfect learning path to achieve your goals."
          }
        ></Heading>
      </header>

      <div className="max-w-[600px] mx-auto mb-4">
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          name="search"
          placeholder="Search courses using title..."
          className="input input-bordered w-full"
          required
        />
      </div>

      <section className="grid grid-cols-1 gap-10">
        {allServices.map((course) => (
          <ServiceCard key={course._id} course={course}></ServiceCard>
        ))}
      </section>

      <div className="text-center my-8 space-y-4">
        <p className="text-gray-600 dark:text-gray-300 font-medium">
          Current Page: <span className="font-bold">{currentPage + 1}</span>
        </p>

        {/* Pagination Controls */}
        <div className="flex justify-center flex-wrap items-center gap-2">
          <button
            onClick={handlePrevPage}
            className={`btn ${
              currentPage === 0
                ? "btn-disabled bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                : "bg-green-500 text-white hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800"
            }`}
          >
            Prev
          </button>
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg border-2 ${
                currentPage === page
                  ? "bg-green-500 text-white border-green-500"
                  : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border-gray-400"
              } hover:bg-green-400 dark:hover:bg-green-600`}
            >
              {page + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            className={`btn ${
              currentPage === pages.length - 1
                ? "btn-disabled bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                : "bg-green-500 text-white hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800"
            }`}
          >
            Next
          </button>
        </div>

        {/* Items Per Page Dropdown */}
        <div>
          <label
            htmlFor="itemsPerPage"
            className="text-gray-600 dark:text-gray-300 font-medium mr-2"
          >
            Items per page:
          </label>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPage}
            id="itemsPerPage"
            className="p-2 border border-gray-400 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white"
          >
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AllServices;

// import axios from "axios";
// import Heading from "../components/Heading";
// import { useEffect, useState } from "react";
// import ServiceCard from "../components/ServiceCard";
// import useTitle from "../../public/PageTitle/title";
// import { useLoaderData } from "react-router-dom";

// const AllServices = () => {
//   useTitle("All Services");
//   const [allServices, setAllServices] = useState([]);
//   const [search, setSearch] = useState("");
//   const { count } = useLoaderData();
//   const [currentPage, setCurrentPage] = useState(0);
//   const [itemsPerPage, setItemsPerPage] = useState(2);
//   // const itemsPerPage = 3;
//   const numberOfPages = Math.ceil(count / itemsPerPage);

//   // const pages = [];
//   // for (let i = 0; i < numberOfPages; i++) {
//   //   pages.push(i);
//   // }
//   // console.log(pages);

//   const pages = [...Array(numberOfPages).keys()];
//   console.log(pages);

//   const fetchPopularServices = async () => {
//     const { data } = await axios.get(
//       `${
//         import.meta.env.VITE_API_URL
//       }/allServices?searchParams=${search}&page=${currentPage}&size=${itemsPerPage}`
//     );
//     setAllServices(data);
//   };

//   useEffect(() => {
//     fetchPopularServices();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [search, currentPage, itemsPerPage]);
//   console.log(count);

//   const handleItemsPerPage = (e) => {
//     console.log(e.target.value);
//     const value = parseInt(e.target.value);
//     setItemsPerPage(value);
//     setCurrentPage(0);
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 0) {
//       setCurrentPage(currentPage - 1);
//     }
//   };
//   const handleNextPage = () => {
//     if (currentPage < pages.length - 1) {
//       setCurrentPage(currentPage + 1);
//     }
//   };
//   return (
//     <div>
//       <header>
//         <Heading
//           title={"All Courses"}
//           subtitle={
//             "Explore our extensive library of courses designed to empower your learning journey. Whether you're seeking to acquire new skills, advance your career, or simply satisfy your curiosity, you'll find a diverse range of engaging courses taught by expert instructors. From beginner-friendly introductions to advanced specializations, our platform offers something for everyone, ensuring you can find the perfect learning path to achieve your goals."
//           }
//         ></Heading>
//       </header>

//       <div className="max-w-[600px] mx-auto mb-4">
//         <input
//           onChange={(e) => setSearch(e.target.value)}
//           type="text"
//           name="search"
//           placeholder="Search courses using title..."
//           className="input input-bordered w-full"
//           required
//         />
//       </div>

//       <section className="grid grid-cols-1 gap-10">
//         {allServices.map((course) => (
//           <ServiceCard key={course._id} course={course}></ServiceCard>
//         ))}
//       </section>

//       <div className="text-center my-8 space-x-2">
//         <p>Current Page: {currentPage}</p>

//         <button onClick={handlePrevPage}>Prev</button>
//         {pages.map((page) => (
//           <button
//             className={currentPage === page ? "bg-green-400" : "btn"}
//             onClick={() => setCurrentPage(page)}
//             key={page}
//             // className="btn"
//           >
//             {page}
//           </button>
//         ))}
//         <button onClick={handleNextPage}>Next</button>

//         <select
//           value={itemsPerPage}
//           onChange={handleItemsPerPage}
//           name=""
//           id=""
//         >
//           <option value="2">2</option>
//           <option value="4">4</option>
//           <option value="5">5</option>
//         </select>
//       </div>
//     </div>
//   );
// };

// export default AllServices;
