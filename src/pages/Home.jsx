import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Heading from "../components/Heading";
import axios from "axios";
import ServiceCard from "../components/ServiceCard";

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
      </section>
    </div>
  );
};

export default Home;
