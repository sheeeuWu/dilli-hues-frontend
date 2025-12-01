"use client";
import { useState } from "react";
import StaticHeader from "../../app/components/StaticHeader"
import Footer from "../../app/components/Footer";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

export default function AddPlacePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleStep1Submit = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(2);
  };

  const handleStep2Submit = (data) => {
    const finalPayload = { ...formData, ...data };
    console.log("Submitting full place data:", finalPayload);

    // TODO: Replace with API call
    // axios.post('/api/places', finalPayload)
    alert("Place submitted successfully!");
    setStep(1);
  };

  return (
    <>
      <StaticHeader />

      <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-12 bg-white">
        {step === 1 && <StepOne onNext={handleStep1Submit} />}
        {step === 2 && (
          <StepTwo
  onBack={() => setStep(1)}
  onSubmit={handleStep2Submit}
  placeId={formData.id}
/>
        )}
      </main>

      <Footer />
    </>
  );
}