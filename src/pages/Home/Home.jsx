import doctorIcon from "../../assets/logo/doctorIcon.png";
import handHeart from "../../assets/logo/handHeart.png";
import book from "../../assets/logo/book.png";
import healthHeart from "../../assets/logo/healthHeart.png";
import like from "../../assets/logo/like.png";
import convenience from "../../assets/logo/convenience.png";
import doctorDenzel from "../../assets/logo/doctorDenzel.png";
import BelowSections from "./BelowSections";
import { NavLink } from "react-router";

function InfoCard({ title, desc, icon }) {
  return (
    <div className="relative rounded-2xl bg-white  p-5 shadow-sm">
      <div className="pr-10">
        <div className="font-semibold text-[#0E8ED3]">{title}</div>
        <p className="text-sm leading-5 text-[#0E8ED3]/90 mt-1">{desc}</p>
      </div>

      <div className="absolute right-4 top-4 rounded-xl ">
        {icon || <span className="block h-6 w-6" />}
      </div>
    </div>
  );
}

function Feature({ title, desc, icon }) {
  return (
    <div className=" flex flex-col  items-center rounded-2xl bg-[#28B6F6] text-white p-6 shadow-lg">
      <div className="h-30 w-30">{icon}</div>
      <h3 className="mt-4 mb-5 text-2xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-white/90">{desc}</p>
    </div>
  );
}

function Home() {
  return (
    <>
      <div className=" mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <section className="relative  rounded-3xl bg-linear-to-b from-[#0288D0] to-[#88CAE9] px-5 pt-5 sm:p-8 lg:px-12 lg:pt-12 lg:p-0 text-white shadow-xl">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                Where Appointments Meet
                <br />
                Efficiency.
              </h1>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <InfoCard
                  title="Expert Doctors"
                  desc="Book your health consultation with top Medicare doctors for exceptional and personalized care today."
                  icon={<img src={doctorIcon} className="h-6 w-6"></img>}
                />
                <InfoCard
                  title="Appointment"
                  desc="Schedule your appointment with the best Medicare doctors for expert healthcare and personalized advice."
                  icon={<img src={handHeart} className="h-6 w-6"></img>}
                />
              </div>

              <p className="mt-6 text-white/90 max-w-xl text-center">
                Manage patient appointments, records, and consultations all in
                one platform.
              </p>

              <div className="flex justify-end">
                <NavLink
                  className="mt-6 inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 font-medium text-white  bg-[#0A4C6F] hover:bg-[#083a55] cursor-pointer"
                  type="button"
                  to="/booking"
                >
                  {<img src={book} className="h-4 w-4"></img>}
                  Book Now
                </NavLink>
              </div>
            </div>

            <div>
              <img
                src={doctorDenzel}
                alt="Doctor portrait"
                className="mx-auto md:ml-auto max-h-[550px] w-auto object-contain drop-shadow-xl"
              />
            </div>
          </div>
        </section>

        <section className="mt-10 sm:mt-14 lg:mt-16">
          <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            <span className="  text-[#0E8ED3]">Why Choose ClinicMate?</span>
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Feature
              icon={<img src={like}></img>}
              title="Simple and Reliable"
              desc="Healthcare made simple, reliable, and accessible through our commitment to quality service and innovation."
            />
            <Feature
              icon={<img src={convenience}></img>}
              title="Ultimate Convenience"
              desc="Book appointments with ease, efficiency, and convenience anytime using our leading online platform."
            />
            <Feature
              icon={<img src={healthHeart}></img>}
              title="Healthier Lives"
              desc="Helping you live healthier and more confident lives by connecting you with our trusted network."
            />
          </div>
        </section>

        <div className="mt-14 flex justify-center ">
          <NavLink
            to="/aboutus"
            type="button"
            aria-label="Discover ClinicMate"
            className="inline-flex items-center px-6 py-3 rounded-full text-white font-medium shadow-sm  bg-[#0A4C6F] hover:bg-[#083a55] cursor-pointer"
          >
            <span>Discover ClinicMate &nbsp;</span>
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

      <BelowSections />
    </>
  );
}

export default Home;
