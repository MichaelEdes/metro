import React from "react";
import "./About.css";
function About() {
  return (
    <div className="about-container">
      <img
        src="https://10619-2.s.cdn12.com/rests/original/108_513799217.jpg"
        alt="sandwich shop"
      />
      <div className="about-content">
        <h1>About Metro Sandwich Co.</h1>
        <p>
          Metro Sandwich Co. has a rich and deep history rooted in the hearts of
          Glasgow and Newcastle. Established in 2000, our brand was born out of
          a simple yet profound love for sandwiches and the community we serve.
        </p>
        <p>
          We began as a small sandwich shop in the bustling streets of Glasgow,
          using only the finest local produce. We were driven by the goal of
          providing quality food and a welcoming atmosphere to anyone stepping
          through our doors. The authenticity and consistency of our service
          rapidly gained us a loyal customer base, leading to our outstanding
          reputation today.
        </p>
        <p>
          We expanded to Newcastle in 2005, carrying with us the same core
          values and commitment to serving fresh, hearty, and delicious
          sandwiches. Even as we grew, we remained dedicated to supporting local
          suppliers, ensuring the highest quality ingredients in our products,
          and strengthening the local communities we're part of.
        </p>
        <p>
          Over the years, we've remained true to our original vision of crafting
          the best sandwiches in town, while always seeking to innovate and
          improve. Today, Metro Sandwich Co. is a familiar and loved presence in
          both cities, proud to serve our customers and contribute positively to
          the local communities.
        </p>
        <p>
          We're always excited to welcome new faces into our shops, so come by
          and enjoy a sandwich - whether you're in Glasgow or Newcastle, you're
          always welcome at Metro Sandwich Co.
        </p>
      </div>
    </div>
  );
}

export default About;
