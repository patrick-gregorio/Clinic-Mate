import doctorsImg from "../../assets/logo/WhoWeAreDoctors.png";
import whiteCircle from "../../assets/logo/whiteCircleLogo2.png";
import doctorMeeting from "../../assets/logo/doctorMeeting.png";
import quote from "../../assets/logo/quote.png";
import qualifiedDoctor from "../../assets/logo/qualifiedDoctor.png";
export default function AboutUs() {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-[#0E8ED3]">
        <div className=" relative overflow-hidden  rounded-2xl bg-linear-to-r from-[#FFFFFF] to-[#B3E5FC]">
          <div className=" grid grid-cols-1 gap-8 px-6 pt-6 sm:px-10 sm:pt-10 md:grid-cols-2">
            <div className="z-10 flex flex-col justify-center mb-10">
              <div className="mb-12 flex flex-col justify-start  gap-3 ">
                <span className="text-md font-semibold tracking-[0.18em]">
                  WHO WE ARE
                </span>
                <span className="h-px w-96 bg-[#0E8ED3]" />
              </div>

              <h2 className="max-w-xl text-3xl font-bold leading-tight  sm:text-4xl">
                Your Partner in Modern Healthcare
              </h2>

              <p className="mt-4 max-w-xl ">
                Guided by our commitment to quality service and innovation,
                ClinicMate aims to make healthcare simple, reliable, and within
                reach. Our platform lets Filipinos book online appointments with
                ease, ensuring convenience, efficiency, and helping them live
                healthier, more confident lives.
              </p>
            </div>
            <img
              src={doctorsImg}
              alt="Clinic doctors"
              className=" w-full max-w-sm  md:max-w-md lg:max-w-lg xl:max-w-xl object-contain mx-auto"
            />
          </div>
        </div>

        <h3 className="mt-14 mb-7 text-center text-2xl font-extrabold  sm:text-3xl">
          Choose ClinicMate
        </h3>

        <div className="overflow-hidden rounded-2xl ">
          <div className="rounded-t-2xl bg-linear-to-b from-[#0288D0] to-white  py-6 text-center sm:py-10">
            <div className="mx-auto mb-3 inline-flex items-center gap-2 text-white/90">
              <img src={whiteCircle} className="w-5 h-5"></img>
              <span className="text-[11px] font-semibold tracking-[0.2em]">
                EXPERT MEDICAL TREATMENT
              </span>
            </div>
            <p className="mb-10 text-base font-semibold leading-snug text-white sm:text-lg">
              Our team helps you get your life back on track.
            </p>

            <img
              src={doctorMeeting}
              alt="Medical team briefing"
              className="block h-auto w-full object-cover"
            />

            <div className="flex flex-row mx-auto p-12 text-2xl">
              <img src={quote} className="w-20 h-12 inline"></img>
              <p className="mt-5">
                “Our mission is to deliver compassionate and high-quality
                healthcare to every patient. We strive to promote wellness and
                improve lives through excellence and integrity in medical
                service.”
              </p>
            </div>
          </div>
        </div>

        <h3 className="mt-14 mb-7 text-center text-2xl font-extrabold  sm:text-3xl">
          Our qualified team is ready to help you.
        </h3>

        <div className="flex justify-center gap-x-28 py-10 px-10 md:mt-10 md:py-0 bg-[#28B6F6] rounded-2xl">
          <div className="flex flex-col justify-center align-middle">
            <h4 className="text-white/95 text-xl font-extrabold sm:text-2xl">
              ClinicMate Services
            </h4>

            <div className="mt-5  grid grid-cols-1 gap-9 sm:grid-cols-2">
              {[
                "Primary Care",
                "Dermatology",
                "General Surgery",
                "Cardiology",
                "Endocrinology",
                "Urology",
                "Nephrology",
                "Oncology",
                "Pulmonology",
                "Ophthalmology",
              ].map((label) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-8 w-8 text-[#28B6F6]"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M9 16.2l-3.5-3.5L4 14.2 9 19l11-11-1.5-1.5z" />
                    </svg>
                  </span>
                  <span className="text-white/95 ">{label}</span>
                </div>
              ))}
            </div>
            <div>
              <button
                type="button"
                className="mt-12 inline-flex items-center gap-3 rounded-full bg-[#0A4C6F] px-4 py-2 text-sm font-semibold hover:bg-[#063e5c] text-white cursor-pointer"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-slate-900">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M7 2h2v2h6V2h2v2h3v18H4V4h3V2zm13 6H6v12h14V8zM8 11h4v4H8v-4z" />
                  </svg>
                </span>
                Book an appointment
              </button>
            </div>
          </div>

          <div className="hidden sm:block">
            <img alt="Doctor" src={qualifiedDoctor} />
          </div>
        </div>
        <h3 className=" mt-14 text-center text-2xl font-extrabold mb-7 sm:text-3xl">
          Delivering Quality Healthcare
        </h3>
        <div className="rounded-2xl bg-linear-to-b from-white  to-[#0288D0] px-5 pb-5">
          <div className="rounded-2xl mx-auto bg-white px-6 py-10 sm:px-10">
            <div className="grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 grid h-24 w-24 place-items-center rounded-full bg-sky-500 text-white">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-12 w-12"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 12a4 4 0 100-8 4 4 0 000 8zm7 8v-2a5 5 0 00-5-5H10a5 5 0 00-5 5v2h14z" />
                  </svg>
                </div>
                <div className="text-xl font-extrabold  sm:text-2xl mb-10">
                  1.5 Million+
                </div>
                <p className="mt-2 ">
                  Trusted by Filipinos nationwide for accessible healthcare.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 grid h-24 w-24 place-items-center rounded-full bg-sky-500 text-white">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-12 w-12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {" "}
                    <path d="M8 3v2M16 3v2" />{" "}
                    <rect x="3" y="5" width="18" height="16" rx="2" />{" "}
                    <path d="M3 9h18" /> <path d="M8 14l3 3 5-5" />{" "}
                  </svg>
                </div>
                <div className="text-xl font-extrabold  sm:text-2xl mb-10">
                  1 Million+
                </div>
                <p className="mt-2 ">Seamless scheduling anytime, anywhere.</p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 grid h-24 w-24 place-items-center rounded-full bg-sky-500 text-white">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-12 w-12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 3l7 4v5c0 5-3.5 8.6-7 9-3.5-.4-7-4-7-9V7l7-4z" />
                    <path d="M12 9v6M9 12h6" />
                  </svg>
                </div>
                <div className="text-xl font-extrabold  sm:text-2xl mb-10">
                  100,000+
                </div>
                <p className="mt-2 ">
                  A growing network of trusted healthcare professionals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
