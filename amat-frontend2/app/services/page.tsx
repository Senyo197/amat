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
          <h1 className="text-white text-3xl md:text-4xl font-bold mt-10">
            Our Services
          </h1>
        }
        className="w-full max-w-[1000px] lg:max-w-[1200px] h-auto md:h-[800px] relative p-5"
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
      </BlueCard>
      <br />
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-[1200px] space-y-6 md:space-y-0">
        <BlueCard
          title={null}
          className="w-full md:w-[45%] h-[300px] md:h-[400px] bg-blue-900"
          backgroundImageUrl={Consult.src}
        />
        <div className="w-full md:w-[50%] text-left px-5 md:px-10">
          <h2 className="text-blue-900 text-2xl md:text-3xl font-bold">
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
            <Link href="/about">
              <span className="text-black font-sans border border-blue-800 px-4 py-2 rounded-full hover:bg-blue-800 hover:text-white transition-colors font-semibold">
                About AMaT-HCL
              </span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
