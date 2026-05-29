function Contact() {
  return (
    <section className="PageSection" aria-labelledby="contact-title">
      <h1 id="contact-title">Contact</h1>
      <p>
        Call or message us for a consultation and onboarding plan for your
        accounting process.
      </p>

      <form className="ContactForm" aria-label="Contact form">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" autoComplete="name" required />

        <label htmlFor="address">Address</label>
        <input id="address" name="address" type="text" autoComplete="street-address" required />

        <label htmlFor="contactNumber">Contact Number</label>
        <input id="contactNumber" name="contactNumber" type="tel" autoComplete="tel" required />

        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" required />

        <button type="submit">Submit</button>
      </form>
    </section>
  );
}

export default Contact;
