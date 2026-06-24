import { useState } from "react";

const DEFAULT_PROD_API_URL =
  "https://accounting-services-backend-g6cyg2h0amajb0aw.southindia-01.azurewebsites.net";

const API_URL = (() => {
  const configuredApiUrl = process.env.REACT_APP_API_URL?.trim();
  const isLocalHostRuntime = window.location.hostname === "localhost";
  const pointsToLocalHost =
    configuredApiUrl?.includes("localhost") ||
    configuredApiUrl?.includes("127.0.0.1");

  if (isLocalHostRuntime) {
    return configuredApiUrl || "http://localhost:4000";
  }

  if (configuredApiUrl && !pointsToLocalHost) {
    return configuredApiUrl;
  }

  return DEFAULT_PROD_API_URL;
})();

function Contact() {
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitMessage("");

    const form = event.currentTarget;

    const formData = new FormData(form);
    const payload = {
      name: formData.get("name")?.toString().trim() || "",
      address: formData.get("address")?.toString().trim() || "",
      contactNumber: formData.get("contactNumber")?.toString().trim() || "",
      email: formData.get("email")?.toString().trim() || "",
      notes: formData.get("notes")?.toString().trim() || "",
    };

    try {
      const response = await fetch(`${API_URL}/api/admin/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Submit failed with status ${response.status}`);
      }

      setSubmitMessage("Form submitted successfully.");
      form.reset();
    } catch (error) {
      setSubmitMessage(error.message || "Failed to submit form.");
    }
  };

  return (
    <section className="PageSection" aria-labelledby="contact-title">
      <h1 id="contact-title">Contact</h1>
      <p>
        Call or message us for a consultation and onboarding plan for your
        accounting process.
      </p>

      <form
        className="ContactForm"
        aria-label="Contact form"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" autoComplete="name" required />

        <label htmlFor="address">Address</label>
        <input
          id="address"
          name="address"
          type="text"
          autoComplete="street-address"
          required
        />

        <label htmlFor="contactNumber">Contact Number</label>
        <input
          id="contactNumber"
          name="contactNumber"
          type="tel"
          autoComplete="tel"
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />

        <label htmlFor="notes">Notes</label>
        <textarea id="notes" name="notes" rows={4} />

        <button type="submit">Submit</button>
        {submitMessage ? <p>{submitMessage}</p> : null}
      </form>
    </section>
  );
}

export default Contact;
