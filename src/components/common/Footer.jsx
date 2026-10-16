import logo from "../../assets/logo/Logo2.png";
function Footer() {
  return (
    <footer className="bg-[#0A8CD2] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          <div className="space-y-6">
            <div className="flex flex-row items-center gap-2">
              <img src={logo} className="w-10 h-10"></img>
              <p className="text-[22px] ">ClinicMate</p>
            </div>

            <div className="flex items-center gap-5">
              <a
                href="#"
                aria-label="Facebook"
                className="transition-opacity hover:opacity-80"
              >
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    fill="white"
                    d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06C2 17.08 5.657 21.245 10.438 22v-7.03H7.898v-2.91h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.196 2.238.196v2.47h-1.26c-1.242 0-1.63.774-1.63 1.567v1.884h2.773l-.443 2.91h-2.33V22C18.343 21.245 22 17.08 22 12.06z"
                  />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="transition-opacity hover:opacity-80"
              >
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    fill="white"
                    d="M22.46 6c-.77.34-1.6.58-2.46.69a4.26 4.26 0 0 0 1.87-2.35 8.51 8.51 0 0 1-2.7 1.03A4.24 4.24 0 0 0 12.1 8.2c0 .33.04.65.11.96A12.03 12.03 0 0 1 3.15 5.16a4.24 4.24 0 0 0 1.31 5.66 4.21 4.21 0 0 1-1.92-.53v.05c0 2.06 1.47 3.78 3.42 4.17-.36.1-.74.15-1.13.15-.28 0-.55-.03-.81-.08.55 1.72 2.16 2.97 4.07 3a8.52 8.52 0 0 1-5.28 1.82c-.34 0-.68-.02-1.01-.06A12.02 12.02 0 0 0 8 21c7.72 0 11.94-6.47 11.94-12.08 0-.18-.01-.36-.02-.54A8.7 8.7 0 0 0 22.46 6z"
                  />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="transition-opacity hover:opacity-80"
              >
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    fill="white"
                    d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zM17.6 6.4a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2z"
                  />
                  <path
                    fill="white"
                    d="M17.8 2H6.2A4.2 4.2 0 0 0 2 6.2v11.6A4.2 4.2 0 0 0 6.2 22h11.6a4.2 4.2 0 0 0 4.2-4.2V6.2A4.2 4.2 0 0 0 17.8 2zm2.6 15.8a2.6 2.6 0 0 1-2.6 2.6H6.2a2.6 2.6 0 0 1-2.6-2.6V6.2A2.6 2.6 0 0 1 6.2 3.6h11.6a2.6 2.6 0 0 1 2.6 2.6v11.6z"
                  />
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="transition-opacity hover:opacity-80"
              >
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    fill="white"
                    d="M4.98 3.5a2.5 2.5 0 1 0 0 5.001 2.5 2.5 0 0 0 0-5zM3.5 9h3v12h-3zM14.5 9c-2.02 0-3 1.11-3 1.11V9h-3v12h3v-6.5c0-1.72.86-2.7 2.25-2.7 1.21 0 1.75.86 1.75 2.7V21h3v-6.96C18.5 10.86 17.08 9 14.5 9z"
                  />
                </svg>
              </a>
            </div>

            <p className="text-2xl md:text-3xl font-semibold tracking-tight">
              Open 24 hours!
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Contact</h3>
            <div className="space-y-3 text-[17px] leading-relaxed">
              <p>
                Guinhawa, City of Malolos,
                <br />
                Bulacan, Philippines.
              </p>
              <p>clinicmate@gmail.com</p>
              <p>(02) 8765-4321</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Book an appointment</h3>
            <p className="max-w-xs text-[17px] leading-relaxed">
              The doctorate staff members are well trained professionals
            </p>

            <a
              href="tel:+2212345611"
              className="inline-flex items-center gap-3 rounded-xl border border-white px-5 py-3 text-base font-medium transition-colors hover:bg-white hover:text-[#0A8CD2] focus:outline-none focus:ring-2 focus:ring-white/70"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M6.62 10.79a15.054 15.054 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.25c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C11.85 21 3 12.15 3 2a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z"
                />
              </svg>
              <span className="tracking-wide">+22-123-45611</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
