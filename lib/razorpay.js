"use client";

export async function loadRazorpay() {
  // Ensure the function runs only in the browser
  if (typeof window === "undefined") {
    return;
  }

  // Check if Razorpay is already loaded
  if (window.Razorpay) {
    return window.Razorpay;
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(window.Razorpay);
    script.onerror = () => reject(new Error("Failed to load Razorpay"));
    
    document.body.appendChild(script);
  });
}
