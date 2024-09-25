import {BtnArrow} from "@/svg/BtnArrow";
import Image from "next/image";
import Link from "next/link";


const DashboardBanner = ({ style }: any) => {
  return (
    <div className="dashboard__top-wrap">
      <div className="dashboard__instructor-info">
        <div className="dashboard__instructor-info-left"></div>
        <div className="dashboard__instructor-info-right">
          <Link href="/author/author-add-article" className="btn btn-two arrow-btn">
            Create a New Article <BtnArrow />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardBanner;
