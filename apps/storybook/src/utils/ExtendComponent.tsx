import { FieldWrapper, FieldsType } from "@fiber/react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { classNames } from "@rafty/ui";
import React from "react";
import { Controller } from "react-hook-form";

export function ExtendComponent(props: FieldsType) {
  const { name, field } = props;

  return (
    <FieldWrapper
      name={name}
      label={field.label}
      description={field.description}
    >
      <Controller
        name={name}
        defaultValue={50}
        render={({ field: { onChange, value, ...register } }) => (
          <>
            <Slider
              {...register}
              onValueChange={(value) => onChange(value[0])}
              value={[value]}
              max={100}
              step={1}
            />
            <div className="text-secondary-500 font-semibold">{value}</div>
          </>
        )}
      />
    </FieldWrapper>
  );
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={classNames(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="bg-secondary-400 relative h-2 w-full grow overflow-hidden rounded-full">
      <SliderPrimitive.Range className="bg-primary-300 absolute h-full" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="border-primary ring-offset-background focus-visible:ring-ring bg-primary-600 block h-5 w-5 rounded-full border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;
