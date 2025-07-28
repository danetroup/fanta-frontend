// src/components/forms/FormTemplate.tsx
import React, { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Checkbox from '../ui/Checkbox';
import Radio from '../ui/Radio';
import Card from '../ui/Card';

// Define common props for a form field
interface FormFieldBase {
  name: string;
  label: string;
  className?: string;
  disabled?: boolean;
}

// Input Field
interface FormInput extends FormFieldBase {
  type: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  value?: string | number; // Optional for controlled components
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Select Field
interface SelectOption {
  value: string | number;
  label: string;
}

interface FormSelect extends FormFieldBase {
  type: 'select';
  options: SelectOption[];
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

// Checkbox Field
interface FormCheckbox extends FormFieldBase {
  type: 'checkbox';
  checked?: boolean; // Optional for controlled components
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Radio Field (part of a group, 'name' is crucial for grouping)
interface FormRadio extends FormFieldBase {
  type: 'radio';
  value: string | number;
  checked?: boolean; // Optional for controlled components
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  radioGroup?: string; // Identifier for the radio group (will be passed as 'name' prop to Radio component)
}

// Union type for all possible form fields
export type FormField = FormInput | FormSelect | FormCheckbox | FormRadio;

interface FormTemplateProps {
  title: string;
  fields: FormField[];
  onSubmit: (formData: Record<string, any>) => void;
  onCancel?: () => void;
  submitButtonText?: string;
  cancelButtonText?: string;
  className?: string; // For the outer form container
}

const FormTemplate: React.FC<FormTemplateProps> = ({
  title,
  fields,
  onSubmit,
  onCancel,
  submitButtonText = 'Submit',
  cancelButtonText = 'Cancel',
  className,
}) => {
  // Simple internal state management for uncontrolled components, or can be used as initial state for controlled
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const initialState: Record<string, any> = {};
    fields.forEach(field => {
      if (field.type === 'checkbox') {
        initialState[field.name] = (field as FormCheckbox).checked || false;
      } else if (field.type === 'radio') {
        // Radio buttons are a bit special, typically managed by checking the group's selected value
        // For simple template, we'll initialize the group value if one is checked
        if ((field as FormRadio).checked) {
          initialState[(field as FormRadio).radioGroup || field.name] = (field as FormRadio).value;
        }
      }
      else {
        initialState[field.name] = (field as FormInput | FormSelect).value || '';
      }
    });
    return initialState;
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else if (type === 'radio') {
      setFormData(prev => ({ ...prev, [(e.target as HTMLInputElement).name]: value }));
    }
    else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderField = (field: FormField) => {
    const commonProps = {
      id: field.name,
      name: field.name,
      label: field.label,
      className: field.className,
      disabled: field.disabled,
      // For simplicity, this template uses uncontrolled approach if onChange is not provided,
      // otherwise, it expects external control.
      // Here, we'll bind to internal state for a basic template.
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
        return (
          <Input
            {...commonProps}
            type={field.type}
            placeholder={(field as FormInput).placeholder}
            value={formData[field.name] || ''}
            onChange={handleChange}
          />
        );
      case 'select':
        return (
          <Select
            {...commonProps}
            options={(field as FormSelect).options}
            value={formData[field.name] || ''}
            onChange={handleChange}
          />
        );
      case 'checkbox':
        return (
          <Checkbox
            {...commonProps}
            checked={formData[field.name]}
            onChange={handleChange}
          />
        );
      case 'radio':
        return (
          <Radio
            {...commonProps}
            name={(field as FormRadio).radioGroup || field.name} // Radio 'name' defines the group
            value={field.value}
            checked={formData[(field as FormRadio).radioGroup || field.name] === field.value}
            onChange={handleChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card className={`p-6 ${className || ''}`}>
      <h2 className="text-3xl font-semibold text-text mb-6">{title}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {fields.map((field) => (
          <div key={field.name + (field.type === 'radio' ? field.value : '')}> {/* Unique key for radios */}
            {renderField(field)}
          </div>
        ))}
        <div className="flex justify-end space-x-4 pt-4 border-t border-border mt-6">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              {cancelButtonText}
            </Button>
          )}
          <Button type="submit" variant="primary">
            {submitButtonText}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default FormTemplate;