"use client"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Lottie from "lottie-react"
import registrationAnimation from "../../public/registration.json"
import successAnimation from "../../public/success.json"
import { motion } from "framer-motion"

const usnRegex = /^[0-9][A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{3}$/
const emailRegex = /^[a-zA-Z0-9._%+-]+@sode-edu\.in$/

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  usn: z
    .string()
    .toUpperCase()
    .regex(usnRegex, { message: "USN must be in the format 4XX2YXX043." }),
  email: z.string().regex(emailRegex, { message: "Email must end with @sode-edu.in." }),
  year: z.string().nonempty("Please select your year of study."),
  phone: z.string().length(10, { message: "Phone number must be exactly 10 digits." }),
})

type FormField = "name" | "usn" | "email" | "year" | "phone";

const RegisterPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [remainingSeats, setRemainingSeats] = useState(null)
  const [showAgreement, setShowAgreement] = useState(false)
  const [formValues, setFormValues] = useState<FormValues | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      usn: "",
      email: "",
      year: "",
      phone: "",
    },
  })

  useEffect(() => {
    const fetchRemainingSeats = async () => {
      try {
        const response = await fetch("/api/remaining-seats")
        if (response.ok) {
          const data = await response.json()
          setRemainingSeats(data.remainingSeats)
        }
      } catch (error) {
        console.error("Error fetching remaining seats:", error)
      }
    }
    fetchRemainingSeats()
  }, [])

  interface FormValues {
    name: string;
    usn: string;
    email: string;
    year: string;
    phone: string;
  }

  const onSubmit = (values: FormValues): void => {
    setFormValues(values)
    setShowAgreement(true)
  }

  const handleConfirmRegistration = async () => {
    if (!formValues) return

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      })

      if (response.ok) {
        setShowSuccess(true)
        setTimeout(() => {
          setShowSuccess(false)
          
        }, 9000)
      } else {
        const data = await response.json()
        alert(data.error || "An error occurred during registration.")
      }
    } catch (error) {
      alert("An error occurred during registration.")
    } finally {
      setIsSubmitting(false)
      setShowAgreement(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 font-sans">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto p-6"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Animation Section */}
            <div className="flex flex-col items-center">
              <Lottie
                animationData={registrationAnimation}
                loop={true}
                className="w-24 sm:w-32 md:w-full h-auto"
              />
              {remainingSeats !== null && (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="bg-purple-600/10 backdrop-blur-md rounded-xl p-4 mt-4 shadow-lg"
                >
                  <p className="text-center text-xl font-bold text-white">
                    <span className="text-pink-400">{remainingSeats}</span> Seats Remaining
                  </p>
                </motion.div>
              )}
            </div>

            {/* Form Section */}
            <div className="bg-gray-800/70 backdrop-blur-md rounded-xl p-8 shadow-xl border border-purple-700">
              <h1 className="text-4xl font-extrabold text-white mb-8 text-center">Join the Workshop</h1>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {[
                  { name: "name", label: "Full Name", placeholder: "John Doe", type: "text" },
                  { name: "usn", label: "USN", placeholder: "4MW21AD043", type: "text" },
                  { name: "email", label: "College Email", placeholder: "example@sode-edu.in", type: "email" },
                  { name: "phone", label: "Phone Number", placeholder: "1234567890", type: "tel" },
                ].map((field) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-2"
                  >
                    <label className="block text-sm font-medium text-gray-300">{field.label}</label>
                    <input
                      {...register(field.name as FormField)}
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 transition duration-150"
                    />
                    {errors[field.name as keyof typeof formSchema.shape] && (
                      <p className="text-red-400 text-xs italic">{errors[field.name as keyof typeof formSchema.shape]?.message}</p>
                    )}
                  </motion.div>
                ))}

                {/* Year Select */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-2"
                >
                  <label className="block text-sm font-medium text-gray-300">Year of Study</label>
                  <select
                    {...register("year")}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 text-white transition duration-150"
                  >
                    <option value="">Select your year</option>
                    {[1, 2, 3, 4].map((year) => (
                      <option key={year} value={year.toString()} className="text-gray-900">
                        {year === 1 ? "First" : year === 2 ? "Second" : year === 3 ? "Third" : "Fourth"} Year
                      </option>
                    ))}
                  </select>
                  {errors.year && <p className="text-red-400 text-xs italic">{errors.year.message}</p>}
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition transform hover:scale-105 shadow-lg ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Registering..." : "Register Now"}
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Agreement Modal */}
      {showAgreement && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-gray-800 rounded-xl p-8 max-w-md w-full shadow-xl border border-purple-700"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Registration Agreement</h2>
            <div className="space-y-4 text-gray-300">
              <p>By registering for this workshop, you agree to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Attend the entire workshop session</li>
                <li>Allow usage of provided details for attendance</li>
                <li>Follow the workshop&#39;s code of conduct</li>
                <li>Notify cancellations 24 hours before the event</li>
              </ul>
            </div>
            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => setShowAgreement(false)}
                className="px-6 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRegistration}
                className="px-6 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-500 transition-colors"
              >
                I Agree
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Loading Modal */}
      {isSubmitting && !showSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-gray-800 rounded-xl p-8 max-w-xs w-full shadow-xl border border-purple-700 text-center"
          >
            <div className="flex flex-col items-center">
              <svg
                className="animate-spin h-8 w-8 text-pink-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              <h2 className="text-xl text-white mt-4">Registering...</h2>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-gray-800 rounded-xl p-8 max-w-md w-full shadow-xl border border-purple-700 text-center"
          >
            <Lottie
              animationData={successAnimation}
              loop={false}
              className="w-32 h-32 mx-auto"
            />
            <h2 className="text-2xl font-bold text-white mb-4">Registration Successful!</h2>
            <div className="space-y-4">
              <p className="text-gray-300">We&#39;re excited to have you join us!</p>
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mt-4">
                <div className="flex items-center space-x-2">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-blue-400" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <p className="text-blue-400 font-medium">Please check your email for further details!</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default RegisterPage
