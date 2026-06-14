import { useState } from "react";

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
    };

    try {
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";
      const response = await fetch(`${API_URL}/admin/`, {
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

        <button type="submit">Submit</button>
        {submitMessage ? <p>{submitMessage}</p> : null}
      </form>
    </section>
  );
}

export default Contact;
