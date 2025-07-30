import React, { useState } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import ButtonGroup from '../../../components/ui/ButtonGroup'; // <-- Import ButtonGroup
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Checkbox from '../../../components/ui/Checkbox';
import Radio from '../../../components/ui/Radio';
import ComboBox from '../../../components/ui/ComboBox';
import MultiSelect from '../../../components/ui/MultiSelect';
import DatePicker from '../../../components/ui/DatePicker';
import FileUpload from '../../../components/forms/FileUpload'; // Note: forms component
import FormTemplate, { type FormField } from '../../../components/forms/FormTemplate'; // Note: forms component
import { useToast } from '../../../components/ui/ToastContainer'; // Assuming toasts might be triggered from form interactions
import { type ToastType } from '../../../components/ui/Toast'; // Assuming toasts might be triggered from form interactions

// Define the MultiSelectOption type (should match the one in MultiSelect.tsx)
interface MultiSelectOption {
  value: string;
  label: string;
}

// Simple SVG Icons for button examples
const PlusIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
  </svg>
);

const SendIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    </svg>
);

const EditIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
    </svg>
);


const FormsSection: React.FC = () => {
  const { addToast } = useToast();

  // Inputs & Selects states
  const [selectedOption, setSelectedOption] = useState('option1');
  const [isChecked, setIsChecked] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState('optionA');
  const [isLoading, setIsLoading] = useState(false);


  const selectOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  // ComboBox states
  const [selectedFruit, setSelectedFruit] = useState<string | number | null>('apple');
  const fruitOptions = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
    { value: 'grape', label: 'Grape' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'blueberry', label: 'Blueberry' },
  ];

  // MultiSelect states
  const [selectedCountries, setSelectedCountries] = useState<MultiSelectOption[] | null>([
    { value: 'usa', label: 'United States' },
    { value: 'can', label: 'Canada' }
  ]);
  const countryOptions: MultiSelectOption[] = [
    { value: 'usa', label: 'United States' },
    { value: 'can', label: 'Canada' },
    { value: 'mex', label: 'Mexico' },
    { value: 'gbr', label: 'United Kingdom' },
    { value: 'fra', label: 'France' },
    { value: 'deu', label: 'Germany' },
  ];

  // DatePicker state
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // File Upload
  const handleFileUpload = (files: File[]) => {
    addToast(`Files uploaded: ${files.map(f => f.name).join(', ')}`, 'success');
    console.log('Uploaded files:', files);
  };

  // Form Template
  const handleFormSubmit = (formData: Record<string, any>) => {
    alert('Form Submitted:\n' + JSON.stringify(formData, null, 2));
    addToast('Form submitted successfully!', 'success');
  };

  const handleFormCancel = () => {
    alert('Form Cancelled!');
    addToast('Form submission cancelled.', 'info');
  };

  const userProfileFields: FormField[] = [
    { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
    { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john.doe@example.com' },
    {
      name: 'country',
      label: 'Country',
      type: 'select',
      options: [
        { value: '', label: 'Select country...' },
        { value: 'usa', label: 'United States' },
        { value: 'can', label: 'Canada' },
        { value: 'mex', label: 'Mexico' },
      ],
      value: 'can', // Default selected value
    },
    { name: 'subscribeNewsletter', label: 'Subscribe to Newsletter', type: 'checkbox', checked: true },
    { name: 'termsAccepted', label: 'Accept Terms and Conditions', type: 'checkbox' },
    { name: 'gender', label: 'Male', type: 'radio', value: 'male', radioGroup: 'gender' },
    { name: 'gender', label: 'Female', type: 'radio', value: 'female', radioGroup: 'gender' },
    { name: 'gender', label: 'Prefer not to say', type: 'radio', value: 'other', radioGroup: 'gender' },
    { name: 'password', label: 'New Password', type: 'password' },
  ];


  return (
    <div className="space-y-8 p-6">
      <h2 className="text-3xl font-semibold mb-4 text-text">Form Components</h2>

      <Card padding="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-text">Buttons</h3>
        <p className="text-text-light mb-6">
          Includes variants, sizes, disabled states, and support for icons, loading states, and full-width.
        </p>
        
        <h4 className="text-lg font-semibold mb-2 text-text">Variants & Sizes</h4>
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="lg">Large</Button>
        </div>

        <h4 className="text-lg font-semibold mb-2 text-text">States</h4>
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="outline" disabled>Disabled Outline</Button>
          <Button variant="primary" loading={isLoading} onClick={() => { setIsLoading(true); setTimeout(() => setIsLoading(false), 2000); }}>
            {isLoading ? 'Loading...' : 'Click to Load'}
          </Button>
        </div>

        <h4 className="text-lg font-semibold mb-2 text-text">Icons</h4>
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <Button variant="primary" iconBefore={<PlusIcon />}>Create</Button>
          <Button variant="outline" iconAfter={<SendIcon />}>Send</Button>
          <Button variant="secondary" iconBefore={<PlusIcon />} />
        </div>
        
        <h4 className="text-lg font-semibold mb-2 text-text">Full Width</h4>
        <div className="space-y-2">
            <Button variant="primary" fullWidth>Full Width Button</Button>
            <Button variant="outline" fullWidth>Full Width Outline</Button>
        </div>
      </Card>

      {/* NEW Button Group Section */}
      <Card padding="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-text">Button Groups</h3>
        <p className="text-text-light mb-6">
          Use the `ButtonGroup` component to connect related buttons into a single, seamless group.
        </p>
        <div className="flex flex-wrap items-center gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-2 text-text">Primary Group</h4>
            <ButtonGroup>
              <Button variant="primary">Profile</Button>
              <Button variant="primary">Settings</Button>
              <Button variant="primary">Logout</Button>
            </ButtonGroup>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2 text-text">Outline Group</h4>
            <ButtonGroup>
              <Button variant="outline">Copy</Button>
              <Button variant="outline">Paste</Button>
            </ButtonGroup>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2 text-text">Icon Group</h4>
            <ButtonGroup>
              <Button variant="outline" iconBefore={<PlusIcon />} />
              <Button variant="outline" iconBefore={<EditIcon />} />
              <Button variant="outline" iconBefore={<SendIcon />} />
            </ButtonGroup>
          </div>
        </div>
      </Card>

      <Card padding="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-text">Inputs</h3>
        <div className="space-y-4 max-w-md">
          <Input type="text" placeholder="Standard Input" />
          <Input type="email" placeholder="Email Input" />
          <Input type="password" placeholder="Password Input" />
          <Input type="text" placeholder="Disabled Input" disabled />
        </div>
      </Card>

      <Card padding="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-text">Selects</h3>
        <div className="space-y-4 max-w-md">
          <Select
            label="Choose an option"
            options={selectOptions}
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          />
          <Select
            label="Disabled Select"
            options={selectOptions}
            value="option2"
            disabled
          />
        </div>
      </Card>

      <Card padding="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-text">Checkboxes</h3>
        <div className="space-y-4 max-w-md">
          <Checkbox
            label="Remember me"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <Checkbox label="Opt-in to newsletter" defaultChecked />
          <Checkbox label="Disabled checkbox" disabled />
          <Checkbox label="Disabled & checked" defaultChecked disabled />
        </div>
      </Card>

      <Card padding="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-text">Radios</h3>
        <div className="space-y-4 max-w-md">
          <Radio
            name="radioGroup1"
            label="Option A"
            value="optionA"
            checked={selectedRadio === 'optionA'}
            onChange={(e) => setSelectedRadio(e.target.value)}
          />
          <Radio
            name="radioGroup1"
            label="Option B"
            value="optionB"
            checked={selectedRadio === 'optionB'}
            onChange={(e) => setSelectedRadio(e.target.value)}
          />
          <Radio
            name="radioGroup1"
            label="Disabled Option C"
            value="optionC"
            disabled
          />
        </div>
      </Card>

      <Card padding="p-6">
        <h3 className="text-2xl font-semibold mt-8 mb-4 text-text">Combo Box (Autocomplete Select)</h3>
        <div className="space-y-4 max-w-md">
          <ComboBox
            label="Select a Fruit"
            options={fruitOptions}
            value={selectedFruit}
            onSelect={(value, label) => {
              setSelectedFruit(value);
              alert(`Selected: ${label} (Value: ${value})`);
            }}
            placeholder="Search for a fruit..."
          />
          <ComboBox
            label="Disabled Combo Box"
            options={fruitOptions}
            value="orange"
            disabled
          />
        </div>
      </Card>

      <Card padding="p-6">
        <h3 className="text-2xl font-semibold mt-8 mb-4 text-text">Multi-Select</h3>
        <div className="space-y-4 max-w-md">
          <MultiSelect
            label="Select Multiple Countries"
            options={countryOptions}
            value={selectedCountries}
            onChange={setSelectedCountries}
            placeholder="Select countries..."
          />
          <MultiSelect
            label="Disabled Multi-Select"
            options={countryOptions}
            value={[{ value: 'gbr', label: 'United Kingdom' }]}
            isDisabled
          />
          <MultiSelect
            label="Multi-Select with Clear/Search Disabled"
            options={countryOptions}
            isClearable={false}
            isSearchable={false}
            value={[{ value: 'fra', label: 'France' }]}
            onChange={setSelectedCountries}
          />
        </div>
      </Card>

      <Card padding="p-6">
        <h3 className="text-xl font-semibold mt-8 mb-4 text-text">Date Picker</h3>
        <div className="space-y-4 max-w-md">
          <DatePicker
            label="Select a Date"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            placeholderText="Click to select a date"
            isClearable
          />
          <DatePicker
            label="Disabled Date Picker"
            selected={new Date()}
            onChange={() => {}}
            disabled
          />
        </div>
      </Card>

      <Card padding="p-6">
        <h3 className="text-xl font-semibold mt-8 mb-4 text-text">File Upload</h3>
        <div className="space-y-4 max-w-md">
          <FileUpload
            label="Upload your document (PDF, TXT)"
            onFileUpload={handleFileUpload}
            multiple={false}
            acceptedFileTypes=".pdf,.txt"
          />
          <FileUpload
            label="Upload multiple images"
            onFileUpload={handleFileUpload}
            multiple={true}
            acceptedFileTypes="image/*"
          />
        </div>
      </Card>

      <Card padding="p-6">
        <h3 className="text-xl font-semibold mt-8 mb-4 text-text">Form Template Example</h3>
        <div className="max-w-2xl mx-auto"> {/* Max width for form template */}
          <FormTemplate
            title="User Registration"
            fields={userProfileFields}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            submitButtonText="Register"
          />
        </div>
      </Card>
    </div>
  );
};

export default FormsSection;
