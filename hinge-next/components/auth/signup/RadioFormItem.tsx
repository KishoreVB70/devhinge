import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroupItem } from "@/components/ui/radio-group";

export default function RadioFormItem({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <FormItem className="flex items-center space-x-3 space-y-0">
      <FormControl>
        <RadioGroupItem value={value} />
      </FormControl>
      <FormLabel className="font-normal">{label}</FormLabel>
    </FormItem>
  );
}
