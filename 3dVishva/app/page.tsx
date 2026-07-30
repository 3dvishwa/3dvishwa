import Hero from "../components/home/Hero";
import Services from "../components/home/Services";
import About from "../components/home/About";
import Portfolio from "../components/home/Portfolio";
import Process from "../components/home/Process";
import Technology from "../components/home/Technology";
import Pricing from "../components/home/Pricing";
import Testimonials from "../components/home/Testimonials";
import FAQ from "../components/home/FAQ";
import Contact from "../components/home/Contact";


export default function Home() {

  return (
    <>

      <section id="home">
        <Hero />
      </section>


      <section id="services">
        <Services />
      </section>


      <section id="about">
        <About />
      </section>


      <section id="portfolio">
        <Portfolio />
      </section>


      <section id="process">
        <Process />
      </section>


      <section id="technology">
        <Technology />
      </section>


      <section id="pricing">
        <Pricing />
      </section>


      <section id="testimonials">
        <Testimonials />
      </section>


      <section id="faq">
        <FAQ />
      </section>


      <section id="contact">
        <Contact />
      </section>

    </>
  );
}