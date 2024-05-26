import { NumericFormat } from 'react-number-format';

const AmountFormat = ({
  amount,
  fixedDecimal,
}: {
  amount: number | string;
  fixedDecimal?: boolean;
}) => {
  return (
    <NumericFormat
      displayType='text'
      thousandSeparator=','
      decimalSeparator='.'
      decimalScale={2}
      value={amount}
      fixedDecimalScale={fixedDecimal}
    />
  );
};

export default AmountFormat;
