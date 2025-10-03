import clsx from "clsx";
import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { BasicButton } from "../../components-styled/Button/Button.styles";

// Inspo från https://dev.to/silviaespanagil/how-to-create-a-scroll-to-top-button-with-react-17do

function ScrollButton() {
  const [showGoTop, setShowGoTop] = useState(false);

  const handleVisibleButton = () => {
    setShowGoTop(window.pageYOffset > 50);
  };

  const handleScrollUp = () => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleVisibleButton);
  }, []);

  const classNames = clsx("font-color__dark-purple", { "d-none": !showGoTop });

  return (
    <BasicButton aria-label="Till toppen" className={classNames} onClick={handleScrollUp}>
      <FaArrowUp aria-hidden={true} />
      <span className="heading-4">Till toppen</span>
    </BasicButton>
  );
}

export default ScrollButton;
