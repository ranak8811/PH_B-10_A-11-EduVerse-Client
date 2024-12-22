import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Heading from "../components/Heading";
import axios from "axios";
import ServiceCard from "../components/ServiceCard";
import { Link } from "react-router-dom";

const Home = () => {
  const [popularServices, setPopularServices] = useState([]);

  const fetchPopularServices = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/popularServices`
    );
    setPopularServices(data);
  };

  useEffect(() => {
    fetchPopularServices();
  }, []);

  console.log(popularServices);
  return (
    <div>
      <header>
        <Banner></Banner>
      </header>
      <section>
        <Heading
          title={"Popular Courses"}
          subtitle={
            "Dive deep into subjects taught by renowned professionals who bring real-world experience and insights to the classroom. Gain valuable skills and knowledge from those who have achieved success in their respective fields"
          }
        ></Heading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {popularServices.map((course) => (
            <ServiceCard key={course._id} course={course}></ServiceCard>
          ))}
        </div>

        <div className="text-center">
          <Link
            to={"/allServices"}
            className="btn mt-8 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 dark:from-green-500 dark:to-green-700 dark:hover:from-green-600 dark:hover:to-green-800 text-white font-bold px-6 py-3 rounded-lg"
          >
            Show All
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
