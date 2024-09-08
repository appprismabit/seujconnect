import AboutUs from "@/components/inner-pages/about-us";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Seuj Connect",
};
const page = () => {
  return (
    <Wrapper>
      <AboutUs />
    </Wrapper>
  );
};

export default page;
