type Props = {
  id: string;
  lable: string;
};

export default function Lable({ id, lable }: Props) {
  return (
    <label htmlFor={id} className="authform_input-lable">
      {lable}
    </label>
  );
}
