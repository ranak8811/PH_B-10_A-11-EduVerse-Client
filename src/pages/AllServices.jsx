import axios from "axios";
import Heading from "../components/Heading";
import { useEffect, useState } from "react";
import ServiceCard from "../components/ServiceCard";
import useTitle from "../../public/PageTitle/title";

const AllServices = () => {
  useTitle("All Services");
  const [allServices, setAllServices] = useState([]);
  const [search, setSearch] = useState("");

  const fetchPopularServices = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/allServices?searchParams=${search}`
    );
    setAllServices(data);
  };

  useEffect(() => {
    fetchPopularServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  console.log(search);
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
    </div>
  );
};

export default AllServices;
