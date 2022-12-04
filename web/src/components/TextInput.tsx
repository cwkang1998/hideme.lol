type TextInputType = {
  title: string;
  value: string;
  onChange: any;
};

export const TextInput = ({ title, value, onChange }: TextInputType) => {
  return (
    <div>
      <p className="inputTitle">{title}</p>
      <input
        type="text"
        className="inputBox"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
