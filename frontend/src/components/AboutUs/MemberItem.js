import "./MemberItem.css";

const MemberItem = (props) => {
  const { name, content, image } = props;
  return (
    <div className="d-flex justify-content-center mb-3">
      <div id="box-body" className="row mx-4 mb-4">
        <div className="col-lg-2 text-center mb-2">
          <img id="about-image" src={image} alt={name} />
        </div>
        <div className="col">
          <h5 className="mt-2 name">{name}</h5>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default MemberItem;
