import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

import css from "../Footer/Footer.module.css";

export default function Footer() {
  return (
    <div className={css.mainFooterCont}>
      <div className={css.footerText}>
        <div className={css.footerBefore}></div>
        <Link
          target="_blank"
          to={"https://github.com/Andromeda-NGC224/DBB_test_app"}
        >
          <FaGithub className={css.footerIcon} />
        </Link>
        <p className={css.footerText}>©2024 dbb-test-app.vercel.app</p>
      </div>
    </div>
  );
}
