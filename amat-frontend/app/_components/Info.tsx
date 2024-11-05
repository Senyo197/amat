import React from "react";

export default function Info() {
  return (
    <section className="mb-12 px-4">
      <div className="container mx-auto py-8">
        {/* Adjusted for layout */}
        <div className="bg-primary-700 rounded-lg shadow-lg overflow-hidden dark:bg-blue-200">
          <div className="flex flex-col lg:flex-row lg:gap-8 items-center">
            {/* Text Section */}
            <div className="flex-1 p-4 text-center lg:text-left">
              <h1 className="max-w-2xl mb-2 text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight leading-tight dark:text-black">
                Advans Medical and Trendy Health Consultancy
              </h1>
              <p className="max-w-2xl mb-4 text-gray-200 font-light md:text-lg dark:text-gray-600">
                Live Right Live Well: Consult A Doctor Anytime
              </p>
              <div className="flex flex-col md:flex-row gap-3 justify-center lg:justify-start">
                <a
                  href="#"
                  className="px-4 py-2 text-base font-medium text-center text-black bg-primary-800 rounded-lg hover:bg-primary-900 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                >
                  Get started
                </a>
                <a
                  href="#"
                  className="px-4 py-2 text-base font-medium text-center text-blue-200 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-blue-900 dark:border-blue-200 dark:hover:bg-blue-400 dark:focus:ring-gray-800"
                >
                  Speak Us
                </a>
              </div>
            </div>
            {/* Card Section */}
            <div className="w-full max-w-sm mx-auto lg:mx-0 lg:max-w-md p-6 bg-white shadow-sm border border-slate-200 rounded-lg">
              <div className="flex items-center gap-4 text-slate-800">
                <img
                  src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Tania Andrew"
                  className="h-14 w-14 rounded-full object-cover object-center"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h5 className="text-lg md:text-xl font-semibold text-slate-800">
                      Dr. Joshua
                    </h5>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 text-yellow-600"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs font-bold text-slate-500 mt-0.5">
                    Medical Doctor @ Ridge Hospital
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-sm md:text-base text-slate-600 font-light leading-normal">
                  &quot;Wherever the art of Medicine is loved, there is also a
                  love of Humanity!!!&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
