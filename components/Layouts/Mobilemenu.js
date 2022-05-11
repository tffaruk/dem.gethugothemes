import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "styles/header.module.scss";
import menu from "../../config/menu.json";

const Mobilemenu = ({ toggle, isOpen, category }) => {
  const { main_menu } = menu;
  const router = useRouter();
  const [isDropDown, setDropDown] = useState(false);

  const handleDropdown = () => {
    toggle();
    if (isDropDown) {
      setDropDown(!isDropDown);
    }
  };
  return (
    <>
      <div className={`${styles.mobileMenu} ${isOpen ? styles.show : ""} `}>
        <div className="d-flex align-items-center justify-content-between">
          <Link href="/">
            <a className={`navbar-brand ${styles.navbarBrand} ${styles.logo}`}>
              <Image
                className="Image-fluid mw-75"
                src="/images/logo/logo.png"
                alt="logo"
                width="160"
                height="50"
              />
            </a>
          </Link>
          <svg
            data-toggle="mobile-menu-close"
            onClick={toggle}
            className={styles.mobileMenuClose}
            datatoggle="mobile-menu"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
          </svg>
        </div>
        <div className={styles.menuMainMenuContainer}>
          <ul id="primary-menu" className="list-unstyled mb-0 mt-2">
            {main_menu.map((menu, i) => (
              <li
                key={`main_menu-${i}`}
                className={` ${styles.menuItem} ${
                  menu.child ? styles.menuItemHasChildren : ""
                }`}
                onClick={() => menu.child && setDropDown(!isDropDown)}
              >
                <Link href={menu.url}>
                  <a rel={menu.rel}>{menu.name}</a>
                </Link>
                {menu.child && (
                  <ul
                    className={`${styles.subMenu} ${
                      isDropDown == true ? styles.show : ""
                    }`}
                  >
                    {category.map((child, i) => (
                      <li
                        key={`child-${i}`}
                        className={`${styles.menuItem} ${
                          router.asPath == `/categories/${child}`
                            ? styles.active
                            : null
                        }`}
                        onClick={() => handleDropdown}
                      >
                        <Link href={`/categories/${child}`}>
                          <a className="text-capitalize">{child}</a>
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
    </>
  );
};

export default Mobilemenu;
