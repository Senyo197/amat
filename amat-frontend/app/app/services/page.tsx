import BlueCard from "../_components/BlueCard";
import Doctors from "../_assets/doctors.jpg";
import Consult from "../_assets/consult.jpg";
import Link from "next/link";

export default function Services() {
  return (
    <section className="mb-20 p-5 pt-32 flex flex-col items-center space-y-10 relative">
      {/* Larger BlueCard */}
      <BlueCard
        title={
          <h1 className="text-white text-4xl font-bold mt-10">Our Services</h1>
        }
        className="w-full md:max-w-[1000px] lg:max-w-[1200px] h-[800px] relative"
        backgroundImageUrl={Doctors.src}
      >
        <p className="text-white text-2xl mt-5">
          At AMaT-HCL® we provide 24/7 Medical and Health <br />
          advisory and resources and expertise advisory.
        </p>
        <p className="text-white mt-5">
          We offer a seamless healthcare technology platform that enhances
          patient care, optimizes provider workflows, <br /> and ensures secure
          integration with medical systems
        </p>
        <div
          className="absolute bg-blue-50 rounded-lg shadow-lg p-6 flex flex-col justify-start space-y-4"
          style={{
            width: "800px",
            height: "400px",
            top: "45%",
            left: "2%",
          }}
        >
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for hospitals, locations, and services here"
              className="w-full px-10 py-3 rounded-lg border border-blue-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <div className="absolute left-3 top-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M16.5 10.5A6.5 6.5 0 1110.5 4a6.5 6.5 0 016 6.5z"
                />
              </svg>
            </div>
          </div>
          <div
            className="absolute bg-blue-200 rounded-lg shadow-lg p-6 flex flex-col items-start space-y-2"
            style={{
              width: "230px",
              height: "200px",
              top: "35%",
              left: "3%",
            }}
          >
            <div className="relative cursor-pointer group flex flex-col items-start">
              <img
                src="https://cdn-icons-png.flaticon.com/128/4320/4320371.png"
                alt="Hospital Icon"
                className="h-20 w-20 group-hover:opacity-80 transition duration-200 mt-5"
              />
              <span className="text-blue-900 font-semibold text-xl">
                Hospitals
              </span>
              <div className="flex items-center space-x-2 mt-2 group-hover:text-blue-600">
                <span className="text-blue-950 font-medium transition duration-200 text-xl">
                  Explore
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-900 group-hover:text-blue-600 transition duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div
            className="absolute bg-blue-200 rounded-lg shadow-lg p-6 flex flex-col items-start space-y-2"
            style={{
              width: "230px",
              height: "200px",
              top: "35%",
              left: "35%",
            }}
          >
            <div className="relative cursor-pointer group flex flex-col items-start">
              <img
                src="https://cdn-icons-png.flaticon.com/128/684/684908.png"
                alt="Location Icon"
                className="h-20 w-20 group-hover:opacity-80 group-hover:filter group-hover:brightness-150 transition duration-200 mt-5"
              />
              <span className="text-blue-950 font-semibold text-xl">
                Location
              </span>
              <div className="flex items-center space-x-2 mt-2 group-hover:text-blue-600">
                <span className="text-blue-900 font-medium transition duration-200 text-xl">
                  Explore
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-900 group-hover:text-blue-600 transition duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div
            className="absolute bg-blue-200 rounded-lg shadow-lg p-6 flex flex-col items-start space-y-2"
            style={{
              width: "230px",
              height: "200px",
              top: "35%",
              left: "68%",
            }}
          >
            <div className="relative cursor-pointer group flex flex-col items-start">
              <img
                src="https://cdn-icons-png.flaticon.com/128/2706/2706950.png"
                alt="Services Icon"
                className="h-20 w-20 group-hover:opacity-80 transition duration-200 mt-5"
              />
              <span className="text-blue-950 font-semibold text-xl">
                Services
              </span>
              <div className="flex items-center space-x-2 mt-2 group-hover:text-blue-600">
                <span className="text-blue-900 font-medium transition duration-200 text-xl">
                  Explore
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-900 group-hover:text-blue-600 transition duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </BlueCard>
      <br />
      <div className="flex flex-row items-center justify-between w-full md:max-w-[1200px]">
        <BlueCard
          title={null}
          className="w-full md:w-[500px] h-[400px] bg-blue-900 ml-10"
          backgroundImageUrl={Consult.src}
        />
        <div className="w-full md:w-[600px] text-left pl-10">
          <h2 className="text-blue-900 text-3xl font-bold">
            Building Healthy Communities
          </h2>
          <p className="text-blue-900 mt-4 text-lg">
            Our team of experienced doctors and specialists provide thorough and
            accurate medical consultation, ensuring the best treatment for our
            patients. With our advanced technology, we offer virtual
            consultation for the convenience of our clients. Empowering
            healthcare professionals with seamless consultation, Emergency
            Ambulance service, equipment supply, and workflow automation
            services. We understand the challenges of managing a busy healthcare
            facility. That's why we offer customized workflow automation
            solutions to streamline processes and improve efficiency, ultimately
            leading to better patient care.
            <br />
            <br />
            <Link href="/signup">
              <span className="text-black font-sans border border-blue-300 px-4 py-2 rounded-full hover:bg-blue-300 hover:text-white transition-colors font-semibold">
                About AMaT-HCL
              </span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
