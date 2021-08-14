const Title = (props) => {
  const { name } = props;
  return (
    <div className="text-center">
      <h1>{name}</h1>
    </div>
  );
};

export default Title;
