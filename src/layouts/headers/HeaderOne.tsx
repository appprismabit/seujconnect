"use client";
import Link from "next/link";
import HeaderTopOne from "./menu/HeaderTopOne";
import Image from "next/image";
import NavMenu from "./menu/NavMenu";
import React, { useEffect, useState } from "react";
import UseSticky from "@/hooks/UseSticky";
import MobileSidebar from "./menu/MobileSidebar";
import InjectableSvg from "@/hooks/InjectableSvg";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch
import { RootState } from "@/redux/store";
import { initializeToken, UserDetails } from "@/redux/features/authSlice";

const TotalCart = dynamic(() => import("@/components/common/TotalCart"), {
  ssr: false,
});
const TotalWishlist = dynamic(
  () => import("@/components/common/TotalWishlist"),
  { ssr: false }
);
const CustomSelect = dynamic(() => import("@/ui/CustomSelect"), { ssr: false });

import logo from "@/assets/img/logo/seuj_connect.png";
import { useRouter } from "next/navigation";

const HeaderOne = () => {
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [isLogin, setLogin] = React.useState(0);

  const handleSelectChange = (option: React.SetStateAction<null>) => {
    setSelectedOption(option);
  };

  const { sticky } = UseSticky();
  const [isActive, setIsActive] = useState<boolean>(false);

  const router = useRouter();
  const dispatch = useDispatch(); // Initialize dispatch

  const token = useSelector((state: RootState) => state.auth.token);
  const userDetails = useSelector(
    (state: RootState) => state.auth.user
  ) as UserDetails | null;

  // this is done only to handle the page refresh
  useEffect(() => {
    if (typeof window !== "undefined") {
      dispatch(initializeToken());
    }
  }, [dispatch]);

  return (
    <>
      <header>
        <HeaderTopOne />
        <div id="header-fixed-height"></div>
        <div
          id="sticky-header"
          className={`tg-header__area ${sticky ? "sticky-menu" : ""}`}
        >
          <div className="container custom-container">
            <div className="row">
              <div className="col-12">
                <div className="tgmenu__wrap">
                  <nav className="tgmenu__nav">
                    <div className="logo">
                      <Link href="/">
                        <Image src={logo} alt="Logo" width={200} />
                      </Link>
                    </div>
                    <div className="tgmenu__navbar-wrap tgmenu__main-menu d-none d-xl-flex">
                      <NavMenu />
                    </div>
                    <div className="tgmenu__action">
                      <ul className="list-wrap">
                        {!token ? (
                          <Link className="btn btn-two" href="/login">
                            Log in
                          </Link>
                        ) : (
                          <Link className="btn " href="/author/author-dashboard">
                            <i className="fa fa-user" aria-hidden="true"></i>
                          </Link>
                        )}
                      </ul>
                    </div>
                    <div className="mobile-login-btn">
                      {token && (
                        <Link href="/author/author-dashboard">
                          <InjectableSvg
                            src="/assets/img/icons/user.svg"
                            alt=""
                            className="injectable"
                          />
                        </Link>
                      )}
                    </div>
                    <div
                      onClick={() => setIsActive(true)}
                      className="mobile-nav-toggler"
                    >
                      <i className="tg-flaticon-menu-1"></i>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <MobileSidebar
        isActive={isActive}
        setIsActive={setIsActive}
        isLogin={token}
      />
    </>
  );
};

export default HeaderOne;
