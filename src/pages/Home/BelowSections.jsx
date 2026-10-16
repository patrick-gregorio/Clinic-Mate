import doctorSmile from "../../assets/logo/doctorSmile.png";
import pulmonology from "../../assets/logo/pulmonology.png";
import oncology from "../../assets/logo/oncology.png";
import ophthalmology from "../../assets/logo/ophthalmology.png";
import handCare from "../../assets/logo/handCare.png";
import { NavLink } from "react-router";
function BelowSections() {
  return (
    <>
      <div className="mx-auto max-w-6xl p-4  sm:p-6">
        <section className="rounded-3xl  bg-linear-to-b from-[#0288D0] to-[#88CAE9]  text-white ">
          <div className="px-6 py-6 sm:px-10 sm:py-8 ">
            <h1 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight ">
              Book an Appointment in 5 Easy Steps!
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-8 md:gap-8 px-6  sm:px-10 md:pb-0">
            <div className="md:col-span-5 lg:col-span-5 flex items-end justify-center">
              <img
                src={doctorSmile}
                alt="Smiling doctor pointing up"
                className="max-h-[360px] w-auto object-contain "
              />
            </div>

            <div className="md:col-span-7 lg:col-span-7">
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0  hidden md:block">
                  <span className="block h-full w-px bg-white/50"></span>
                </div>

                <ol className="space-y-4 sm:space-y-5 text-[#0E8ED3]">
                  <li className="relative flex items-center gap-4 md:gap-6">
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white font-extrabold shadow ring-1 ring-blue-100">
                      1
                    </div>
                    <div className="flex-1">
                      <div className="rounded-2xl bg-white/95 px-4 py-3 shadow-lg">
                        Visit the “Book an Appointment” section.
                      </div>
                    </div>
                  </li>

                  <li className="relative flex items-center gap-4 md:gap-6">
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white font-extrabold shadow ring-1 ring-blue-100">
                      2
                    </div>
                    <div className="flex-1">
                      <div className="rounded-2xl bg-white/95 px-4 py-3 shadow-lg">
                        Choose how you’d like to consult.
                      </div>
                    </div>
                  </li>

                  <li className="relative flex items-center gap-4 md:gap-6">
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white font-extrabold shadow ring-1 ring-blue-100">
                      3
                    </div>
                    <div className="flex-1">
                      <div className="rounded-2xl bg-white/95 px-4 py-3 shadow-lg">
                        Pick your preferred clinic location.
                      </div>
                    </div>
                  </li>

                  <li className="relative flex items-center gap-4 md:gap-6">
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white  font-extrabold shadow ring-1 ring-blue-100">
                      4
                    </div>
                    <div className="flex-1">
                      <div className="rounded-2xl bg-white/95 px-4 py-3 shadow-lg">
                        Select the doctor you want.
                      </div>
                    </div>
                  </li>

                  <li className="relative flex items-center gap-4 md:gap-6">
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white font-extrabold shadow ring-1 ring-blue-100">
                      5
                    </div>
                    <div className="flex-1">
                      <div className="rounded-2xl bg-white/95 px-4 py-3 shadow-lg">
                        Choose date &amp; time that works for you.
                      </div>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="w-full bg-white text-[#0E8ED3]">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Our Top 3 Specialties
          </h2>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-10 items-start justify-items-center">
            <div className="flex flex-col items-center text-center">
              <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-full overflow-hidden ring-8 ring-sky-100 shadow">
                <img
                  src={pulmonology}
                  alt="Pulmonology"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-4 text-2xl font-semibold">Pulmonology</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-full overflow-hidden ring-8 ring-sky-100 shadow">
                <img
                  src={oncology}
                  alt="Oncology"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-4 text-2xl font-semibold ">Oncology</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-full overflow-hidden ring-8 ring-sky-100 shadow">
                <img
                  src={ophthalmology}
                  alt="Ophthalmology"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-4 text-2xl font-semibold ">Ophthalmology</p>
            </div>
          </div>

          <div className="mt-14 flex justify-center">
            <NavLink
              to="/aboutus"
              type="button"
              aria-label="View all services"
              className="inline-flex items-center px-6 py-3 rounded-full text-white font-medium shadow-sm  bg-[#0A4C6F] hover:bg-[#083a55] cursor-pointer"
            >
              View All Services
            </NavLink>
          </div>

          <div className=" mt-14 px-5 pb-5 rounded-2xl  bg-linear-to-b from-[#FFFFFF] to-[#0288D0]">
            <div className=" rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 bg-white ">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-sky-900">
                    Ready to Take Control
                    <br className="hidden sm:block" /> of Your Health?
                  </h3>

                  <p className="mt-5 text-sm sm:text-base text-slate-600">
                    Join thousands of Filipinos making their healthcare simpler
                    and more convenient with ClinicMate.
                  </p>

                  <div className="mt-6">
                    <NavLink
                      to="/booking"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-sky-700 text-white font-semibold shadow hover:bg-sky-800 cursor-pointer"
                    >
                      <span>Book Your First Appointment Today</span>
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </NavLink>
                  </div>
                </div>

                <div className="flex justify-center lg:justify-end">
                  <img
                    src={handCare}
                    alt="Hands cupping a heart illustration"
                    className="w-64 sm:w-3xs md:w-1xl max-w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default BelowSections;
