import { motion as Motion } from "framer-motion";

function PassAuthModal({ isOpen, onClose, errorMessage }) {
  if (!isOpen) return null;

  return (
    <>
      <Motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex items-center justify-center z-60 rounded-2xl"
      >
        <div className="bg-white rounded-lg p-6 w-80 shadow-xl mx-4">
          <div className="flex items-center mb-4">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-sm font-bold">!</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Error</h3>
          </div>

          <p className="text-gray-600 mb-6">{errorMessage}</p>

          <button
            onClick={onClose}
            className="w-full bg-[#0A4C6F] text-white py-2 rounded-lg hover:bg-[#083854] transition-colors"
          >
            Try Again
          </button>
        </div>
      </Motion.div>
    </>
  );
}

export default PassAuthModal;
