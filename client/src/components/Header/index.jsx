import React from "react";
import PandaLogo from "../../assets/panda-knits-logo-v2.png";

function Header() {
  return (
    <header>
      <section className="panda-logo">
        <img className="panda-logo-img" src={PandaLogo} />
        <article className="panda-logo-text">
          <span>panda</span>
          <span>knits</span>
        </article>
      </section>
    </header>
  );
}

export default Header;
