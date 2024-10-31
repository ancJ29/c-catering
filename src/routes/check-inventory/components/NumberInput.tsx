import {
  NumberInput as MantineNumberInput,
  NumberInputProps as MantineNumberInputProps,
} from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { useCallback } from "react";

interface NumberInputProps extends MantineNumberInputProps {
  onChangeValue: (value: number) => void;
}

const NumberInput = ({
  onChangeValue,
  ...props
}: NumberInputProps) => {
  const [value, setValue] = useDebouncedState(
    props.defaultValue || 0,
    300,
  );

  const onChange = (value: string | number) => {
    setValue(value);
  };

  const blur = useCallback(() => {
    onChangeValue(parseInt(value.toString()));
  }, [onChangeValue, value]);

  return (
    <MantineNumberInput
      value={value}
      onChange={onChange}
      onBlur={blur}
      {...props}
    />
  );
};

export default NumberInput;
