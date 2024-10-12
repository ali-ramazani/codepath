const ExploredSoFar = ({ exploredItems }) => {
  return (
    <div className="explored-sofar-overlay">
      <div className="explored-sofar-content">
        <h1>Items Explored So Far</h1>
        <ul>
          {exploredItems && exploredItems.map((item, index) => (
            <li className="mt-2.5" key={index}>
              {index + 1}) {item.title} - {item.culture}
              <img src={item.primaryimageurl} alt={item.title} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExploredSoFar;

