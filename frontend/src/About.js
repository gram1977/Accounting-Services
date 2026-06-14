function About() {
  return (
    <section className="PageSection AboutPage" aria-labelledby="about-title">
      <div className="AboutHero">
        <div className="AboutContent">
          <p className="AboutEyebrow">About Kairo Accounting</p>
          <h1 id="about-title">Confidence in your numbers, without doing the math.</h1>
          <p>
            We run accounting, bookkeeping, and reporting workflows so founders can focus on growth.
            You get structured monthly closes, responsive support, and practical insights for what to do next.
          </p>

          <ul className="AboutHighlights" aria-label="Key outcomes">
            <li>Monthly books closed on time</li>
            <li>Tax-ready records and clear reporting</li>
            <li>Dedicated support for day-to-day finance operations</li>
          </ul>

          <div className="AboutCtas">
            <button type="button" className="AboutPrimaryButton">Schedule Call</button>
            <button type="button" className="AboutSecondaryButton">See Services</button>
          </div>
        </div>

        <aside className="AboutCards" aria-label="Service outcomes">
          <article className="AboutCard">
            <span className="AboutCardLabel">Expenses</span>
            <h3>Categorized</h3>
          </article>
          <article className="AboutCard">
            <span className="AboutCardLabel">Financial Reports</span>
            <h3>Delivered</h3>
          </article>
          <article className="AboutCard">
            <span className="AboutCardLabel">Monthly Close</span>
            <h3>Completed</h3>
          </article>
          <article className="AboutCard">
            <span className="AboutCardLabel">Time Saved</span>
            <h3>8+ hrs per month</h3>
          </article>
          <article className="AboutCard">
            <span className="AboutCardLabel">Support</span>
            <h3>Dedicated Team</h3>
          </article>
        </aside>
      </div>

      <section className="AboutShowcase" aria-label="Bookkeeping and tax showcase">
        <div className="AboutShowcaseLeft">
          <p className="AboutShowcaseBrand">Kairo</p>
          <h2>
            Make bookkeeping
            <br />
            and tax <span>easy</span>
          </h2>
          <p>
            Pay your bills, get paid, and track everything with a dedicated accounting team.
          </p>
          <div className="AboutShowcaseActions">
            <button type="button" className="AboutShowcasePrimary">Explore Our Services</button>
            <button type="button" className="AboutShowcaseLink">Lets talk -&gt;</button>
          </div>
        </div>

      </section>

      <section className="AboutLightShowcase" aria-label="Modern bookkeeping solutions">
        <div className="AboutLightLeft">
          <p className="AboutLightEyebrow">Kairo 360</p>
          <h2>
            The best bookkeeping services and accounting solutions for your business.
          </h2>
          <p>
            Running a business is hard, your finances should not be.
            Since 2012, we have delivered expert bookkeeping services,
            tax readiness, and fractional CFO support.
          </p>
          <button type="button" className="AboutLightPrimary">Free Consultation</button>
        </div>

        <div className="AboutLightOrbit" aria-label="Bookkeeping workflow">
          <div className="AboutOrbitRing" />
          <div className="AboutOrbitCenter">360</div>

          <article className="AboutOrbitCard AboutOrbitCardTopLeft">
            <span>Advisor</span>
            <h3>Next Availability</h3>
          </article>

          <article className="AboutOrbitCard AboutOrbitCardTopRight">
            <span>Payroll</span>
            <h3>Processed</h3>
          </article>

          <article className="AboutOrbitCard AboutOrbitCardBottomLeft">
            <span>Taxes</span>
            <h3>Filed</h3>
          </article>

          <article className="AboutOrbitCard AboutOrbitCardBottomRight">
            <span>Performance</span>
            <h3>Metrics Ready</h3>
          </article>
        </div>
      </section>
    </section>
  );
}

export default About;
