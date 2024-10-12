function BanList({banList, addToBanList}) {
  return (
    <div className="banlist-overlay">
      <div className="banlist-content">
        <h1 className="text-center mt-2.5">Ban List</h1>
        <ul>
          {banList.map((item, index) => (
            <li key={index}><s>{item}</s></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BanList;