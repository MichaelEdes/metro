import "./BurgerIcon.css";

function BurgerIcon({ isOpen, setIsOpen }) {
  const handleIconClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      id="nav-icon2"
      className={isOpen ? `open` : ""}
      onClick={handleIconClick}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

export default BurgerIcon;
