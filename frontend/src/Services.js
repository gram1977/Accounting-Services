function Services() {
  return (
    <section className="PageSection" aria-labelledby="services-title">
      <h1 id="services-title">Services</h1>
      <img
        className="ServicesImage"
        src={`${process.env.PUBLIC_URL}/SimarWebSite.jpeg`}
        alt="Remote accounting services overview"
      />
    </section>
  );
}

export default Services;
