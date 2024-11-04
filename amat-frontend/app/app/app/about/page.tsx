import BlueCard from "../_components/BlueCard";
import Vision from "../_assets/vision.png";
import Mission from "../_assets/mission.jpg";
import Image from "next/image";

export default function About() {
  return (
    <section className="mb-20 p-5 pt-32">
      <h1 className="text-3xl font-bold mb-6 text-blue-900 ml-10">About Us</h1>
      <BlueCard
        title={<h3 className="text-black">Reaching out to the world!</h3>}
        className="h-[160px] w-[750px] bg-blue-400"
      >
        <p className="text-black text-lg">
          At AMaT-HCL® we provide 24/7 Medical and Health advisory and resources
          and expertise advisory.
        </p>
      </BlueCard>

      <div className="flex flex-col lg:flex-row mt-10 gap-6">
        <div className="flex-1 flex flex-col justify-center ml-20">
          <h2 className="text-blue-900 text-2xl font-semibold mb-4">
            OUR VISION
          </h2>
          <h4 className="text-blue-900 text-xl font-bold mb-4">
            Revolutionizing Medical Services
          </h4>
          <p className="text-blue-900 mb-4">
            Provide affordable, quality healthcare and equipment to all.
            Empowering healthcare professionals with seamless consultation,
            ambulance service, equipment supply, and workflow automation.
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-96 h-72 relative rounded-full overflow-hidden border-4 border-blue-900">
            <Image src={Vision} alt="Vision" layout="fill" objectFit="cover" />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row mt-10 gap-6">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-96 h-72 relative rounded-full overflow-hidden border-4 border-blue-900">
            <Image
              src={Mission}
              alt="Mission"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center ml-20">
          <h2 className="text-blue-900 text-2xl font-semibold mb-4">
            OUR MISSION
          </h2>
          <h4 className="text-blue-900 text-xl font-bold mb-4">
            Efficient Workflow Automation
          </h4>
          <p className="text-blue-900 mb-4">
            We understand the challenges of managing a busy healthcare facility.
            That's why we offer customized workflow automation solutions to
            streamline processes and improve efficiency, ultimately leading to
            better outcomes.
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-10 mb-10">
        <div className="text-center">
          <h2 className="text-blue-900 text-3xl font-semibold mb-4">
            Seamless Consultation
          </h2>
          <p className="text-blue-900">
            Our team of experienced doctors and specialists provide thorough and
            accurate medical consultation, ensuring the best treatment for our
            patients. With our advanced technology, we offer virtual
            consultation for the convenience of our clients.
          </p>
        </div>
      </div>
    </section>
  );
}
