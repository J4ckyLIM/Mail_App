import { FormControl, FormLabel, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FC, HTMLInputTypeAttribute, ReactNode } from "react";

interface FormInputProps {
  icon?: ReactNode;
  label: string;
  placeholder: string;
  value: string;
  inputType: HTMLInputTypeAttribute;
  isRequired?: boolean;
  onChange: (event: any) => void;
}

const FormInput: FC<FormInputProps> = ({ icon, label, placeholder, inputType, value, onChange, isRequired = false }) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        {icon && (
          <InputLeftElement pointerEvents='none'>
            {icon}
          </InputLeftElement>
        )}
        <Input type={inputType} placeholder={placeholder} isRequired value={value} onChange={onChange}/>
      </InputGroup>
    </FormControl>
  );
};

export default FormInput;