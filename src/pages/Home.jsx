import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Heading from "../components/Heading";
import axios from "axios";
import ServiceCard from "../components/ServiceCard";
import { Link } from "react-router-dom";
import useTitle from "../../public/PageTitle/title";
import { motion } from "framer-motion";
import Newsletter from "../components/Newsletter";

const Home = () => {
  useTitle("Home");
  const [popularServices, setPopularServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [faqData] = useState([
    {
      question: "What courses are available?",
      answer:
        "We offer a wide range of courses including technology, arts, business, and more.",
    },
    {
      question: "Are courses beginner-friendly?",
      answer:
        "Yes, we offer courses suitable for beginners and advanced learners alike.",
    },
    {
      question: "Can I get a certificate?",
      answer:
        "Yes, upon completing a course, you will receive a certificate of achievement.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept credit cards, PayPal, and other secure payment methods.",
    },
    {
      question: "Can I access the courses anytime?",
      answer: "Yes, all courses are available 24/7 for self-paced learning.",
    },
  ]);

  const fetchPopularServices = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/popularServices`
    );
    setPopularServices(data);
  };

  useEffect(() => {
    fetchPopularServices();

    setReviews([
      {
        stars: 5,
        review:
          "Amazing course! Highly recommended. I particularly enjoyed the instructor's engaging teaching style and the real-world case studies. I would recommend this course to anyone interested in PHA.",
        name: "Alice Johnson",
      },
      {
        stars: 4,
        review:
          "Very informative and well-structured. I particularly enjoyed the clear and concise explanations of complex concepts. I would recommend this course to those seeking a solid foundation in EEE.",
        name: "Bob Smith",
      },
      {
        stars: 5,
        review:
          "Helped me a lot in my career. I particularly appreciated the practical exercises and real-world projects. I would recommend this course to professionals looking to enhance their skills in CSE.",
        name: "Catherine Lee",
      },
      {
        stars: 4,
        review:
          "Great course content! I particularly enjoyed the variety of learning materials, including videos, articles, and quizzes. I would recommend this course to anyone looking to expand their knowledge in Math.",
        name: "David Brown",
      },
      {
        stars: 5,
        review:
          "Learned a lot from this. I particularly valued the instructor's feedback and support throughout the course. I would recommend this course to anyone seeking a comprehensive learning experience in Physics.",
        name: "Eve Turner",
      },
      {
        stars: 4,
        review:
          "Good, but could be improved. I particularly enjoyed the course content, but I found the pacing to be a bit too fast. I would recommend this course to those who are already familiar with the basics of History.",
        name: "Frank White",
      },
    ]);
  }, []);

  return (
    <div className="px-2 lg:px-0">
      <header id="home">
        <Banner></Banner>
      </header>

      <section className="my-4" id="pop-courses">
        <Heading
          title={"Popular Courses"}
          subtitle={
            "Dive deep into subjects taught by renowned professionals who bring real-world experience and insights to the classroom."
          }
        ></Heading>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularServices.map((course) => (
              <ServiceCard key={course._id} course={course}></ServiceCard>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to={"/allServices"}
              className="border border-red-500 
              text-red-500 
              hover:bg-red-500
              dark:border-green-500
              dark:hover:bg-green-500
              dark:text-green-500
              hover:text-white
              dark:hover:text-white
              transition 
              duration-300
              rounded-lg 
              py-3 
              px-6"
            >
              Show All
            </Link>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-100 dark:bg-gray-900">
        <Heading
          title={"Trusted By"}
          subtitle={"Hear what our learners have to say about our courses"}
        ></Heading>

        <div className="relative overflow-hidden h-96 container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ y: 100 }}
                animate={{ y: -200 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: index * 0.5,
                }}
                className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 hover:shadow-xl hover:scale-105 transition-transform"
              >
                <div className="flex items-center mb-3">
                  <span className="text-yellow-400 text-lg">
                    {"★".repeat(review.stars)}{" "}
                    <span className="text-gray-400">
                      {"★".repeat(5 - review.stars)}
                    </span>
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic">
                  {review.review}
                </p>
                <p className="text-gray-900 dark:text-gray-100 font-bold mt-2">
                  - {review.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-200 dark:bg-gray-900">
        <Heading
          title={"Frequently Asked Questions"}
          subtitle={"Have questions? We've got answers."}
        ></Heading>

        <div className="max-w-4xl mx-auto">
          {faqData.map((faq, index) => (
            <details
              key={index}
              className="mb-4 border border-gray-300 dark:border-gray-700 rounded-lg p-4 group"
            >
              <summary className="cursor-pointer text-lg font-semibold text-gray-700 dark:text-gray-300">
                {faq.question}
              </summary>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section>
        <Newsletter></Newsletter>
      </section>
    </div>
  );
};

export default Home;
