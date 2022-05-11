import Image from "next/image";
import Link from "next/link";
import menu from "../../config/menu.json";
import styles from "styles/header.module.scss";
import common from "styles/common.module.scss";
import { useState, useEffect } from "react";
import Search from "components/Search";
import Mobilemenu from "./Mobilemenu";
import { useRouter } from "next/router";
import { useAppContext } from "context/state";

const Header = ({ toggle, isOpen }) => {
  const { category } = useAppContext();
  const { main_menu } = menu;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [key, setKey] = useState("");
  const [os, setOs] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setOs(navigator.platform.indexOf("Mac") > -1);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setModalIsOpen(false);
      } else if (os && e.metaKey && e.key === "k") {
        e.preventDefault();
        setModalIsOpen(!modalIsOpen);
      } else if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setModalIsOpen(!modalIsOpen);
      }
    });
    if (os) {
      setKey("⌘K");
    } else {
      setKey("Ctrl K");
    }
  }, [modalIsOpen, os]);
  return (
    <>
      <header>
        <div className={styles.headerNavigation}>
          <div className={`${common.container} container position-relative`}>
            <div className="row">
              <div className="col-md-12">
                <nav
                  className={`navbar navbar-expand-lg navbar-light bg-transparent ${styles.navbar}`}
                >
                  <Link href="/">
                    <a
                      className={`navbar-brand d-inline-flex ${styles.logo} ${styles.navbarBrand} py-0`}
                    >
                      <Image
                        className="Image-fluid"
                        src="/images/logo/logo.png"
                        alt="logo"
                        width="191"
                        height="60"
                      />
                    </a>
                  </Link>
                  <div className="navbar-action">
                    <button
                      className={`${styles.searchToggler} d-inline-block d-lg-none lh-1`}
                      type="button"
                      data-toggle="search-toggler"
                      title="Search"
                      onClick={() => setModalIsOpen(!modalIsOpen)}
                    >
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted"
                        aria-hidden="true"
                      >
                        <path d="m19 19-3.5-3.5"></path>
                        <circle cx="11" cy="11" r="6"></circle>
                      </svg>
                    </button>
                    <button
                      className={`${styles.navbarToggler} navbar-toggler shadow-none border`}
                      type="button"
                      data-toggle="mobile-menu"
                      title="Menu"
                      onClick={toggle}
                    >
                      <span
                        className={`navbar-toggler-icon ${styles.navbarTogglerIcon}`}
                      ></span>
                    </button>
                  </div>
                  <div
                    className="collapse navbar-collapse text-center text-xl-right"
                    id="navbarSupportedContent"
                  >
                    <div className="mx-auto text-center">
                      <div className={`${styles.menuMainMenuContainer}`}>
                        <ul
                          id="primary-menu"
                          className={`navbar-nav ml-auto ${styles.headerMenu} ${styles.mainMenu} d-inline-block`}
                        >
                          {main_menu.map((menu, i) => (
                            <li
                              key={`main_menu-${i}`}
                              className={` ${styles.menuItem} ${
                                router.asPath == menu.url ? styles.active : null
                              } ${
                                menu.child ? styles.menuItemHasChildren : ""
                              }`}
                            >
                              <Link href={menu.url}>
                                <a rel={menu.rel}>{menu.name}</a>
                              </Link>
                              {menu.child && (
                                <ul className={styles.subMenu}>
                                  {category.map((child, i) => (
                                    <li
                                      key={`child-${i}`}
                                      className={`${styles.menuItem} ${
                                        router.asPath == `/categories/${child}`
                                          ? styles.active
                                          : ""
                                      }`}
                                    >
                                      <Link href={`/categories/${child}`}>
                                        <a className="text-capitalize">
                                          {child}
                                        </a>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div
                      className={`form-inline ${styles.headerSearchBlock} ${
                        os ? styles.macOS : ""
                      }`}
                      datatext={key}
                    >
                      <button
                        className={styles.searchBtn}
                        title="Search"
                        onClick={() => setModalIsOpen(!modalIsOpen)}
                      >
                        <svg
                          width="24"
                          height="24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-muted"
                          aria-hidden="true"
                        >
                          <path d="m19 19-3.5-3.5"></path>
                          <circle cx="11" cy="11" r="6"></circle>
                        </svg>
                      </button>
                      <input
                        type="search"
                        placeholder="Search hugo theme"
                        name="s"
                        title="Search for:"
                        required
                        readOnly
                        onClick={() => setModalIsOpen(!modalIsOpen)}
                      />
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${styles.mobileMenuToggleOverlay} ${
            isOpen ? styles.mobileMenuToggleOverlayShow : ""
          }`}
          data-toggle="mobile-menu-close"
          onClick={toggle}
        ></div>

        <div className={styles.headerHeightFix}></div>
        <Mobilemenu toggle={toggle} isOpen={isOpen} category={category} />
      </header>
      <Search modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
    </>
  );
};

export default Header;
