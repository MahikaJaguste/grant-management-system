
const Header = ({ title, tabs, onTabClick }) => {
  return (
    <header>
      <h1>{title}</h1>
      <nav>
        <ul>
          {tabs.map((tab, index) => (
            <li key={index} onClick={() => onTabClick(tab.path)}>
              {tab.label}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
