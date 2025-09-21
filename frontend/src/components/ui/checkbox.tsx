import * as React from "react"

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked, onChange, className, ...props }, ref) => {
    return (
      <input
        type="checkbox"
        ref={ref}
        checked={checked}
        onChange={(e) => {
          e.stopPropagation(); // 阻止事件冒泡
          onChange?.(e.target.checked);
        }}
        className={`h-4 w-4 rounded border border-gray-300 cursor-pointer ${className}`}
        {...props}
      />
    )
  }
)

Checkbox.displayName = "Checkbox"

export { Checkbox }
