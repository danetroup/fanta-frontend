import React, { useState } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import ButtonGroup from '../../../components/ui/ButtonGroup';
import Input from '../../../components/ui/Input';
import SearchInput from '../../../components/ui/SearchInput'; // <-- Import new component
import Select from '../../../components/ui/Select';
import Checkbox from '../../../components/ui/Checkbox';
import Radio from '../../../components/ui/Radio';
import ToggleSwitch from '../../../components/ui/ToggleSwitch';
import ComboBox from '../../../components/ui/ComboBox';
import MultiSelect from '../../../components/ui/MultiSelect';
import DatePicker from '../../../components/ui/DatePicker';
import FileUpload from '../../../components/forms/FileUpload';
import FormTemplate, { type FormField } from '../../../components/forms/FormTemplate';
import { useToast } from '../../../components/ui/ToastContainer';
import PageHeader from '../../../components/templates/PageHeader'; // Import PageHeader
import SectionHeader from '../../../components/templates/SectionHeader'; // Import SectionHeader
import Icon from '../../../components/ui/Icon'; // Import Icon

// Define the MultiSelectOption type (should match the one in MultiSelect.tsx)
interface MultiSelectOption {
  value: string;
  label: string;
}

const FormsSection: React.FC = () => {
  const { addToast } = useToast();

  // Inputs & Selects states
  const [selectedOption, setSelectedOption] = useState('option1');
  const [isChecked, setIsChecked] = useState(false);
  const [isToggled, setIsToggled] = useState(true);
  const [selectedRadio, setSelectedRadio] = useState('optionA');
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const isError = inputValue.length > 0 && inputValue.length < 5;


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
      <PageHeader
        title="Form Components"
        description="A collection of components for building forms, including inputs, selects, and buttons."
      />

      <SectionHeader title="Buttons & Button Groups" />
      <Card id="form-buttons" className="scroll-mt-20" padding="p-6">
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
          <Button variant="primary" iconBefore={<Icon name="plus" />}>Create</Button>
          <Button variant="outline" iconAfter={<Icon name="send" />}>Send</Button>
          <Button variant="secondary" iconBefore={<Icon name="plus" />} />
        </div>
        
        <h4 className="text-lg font-semibold mb-2 text-text">Button Groups</h4>
        <div className="flex flex-wrap items-center gap-8">
          <div>
            <ButtonGroup>
              <Button variant="primary">Profile</Button>
              <Button variant="primary">Settings</Button>
              <Button variant="primary">Logout</Button>
            </ButtonGroup>
          </div>
          <div>
            <ButtonGroup>
              <Button variant="outline">Copy</Button>
              <Button variant="outline">Paste</Button>
            </ButtonGroup>
          </div>
          <div>
            <ButtonGroup>
              <Button variant="outline" iconBefore={<Icon name="plus" />} />
              <Button variant="outline" iconBefore={<Icon name="edit" />} />
              <Button variant="outline" iconBefore={<Icon name="send" />} />
            </ButtonGroup>
          </div>
        </div>
      </Card>

      <SectionHeader title="Standard Inputs" />
      <Card id="form-inputs" className="scroll-mt-20" padding="p-6">
        <div className="space-y-6 max-w-md">
          <Input
            label="Standard Input"
            type="text"
            placeholder="Placeholder text..."
          />
          <Input
            label="Required Input"
            type="text"
            placeholder="e.g., Your Name"
            required
          />
          <Input
            label="Optional Input"
            type="text"
            placeholder="e.g., Nickname"
            showOptionalLabel
          />
          <Input
            label="Validation Example"
            type="text"
            placeholder="Type here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            error={isError}
            helperText={isError ? "Input must be at least 5 characters long." : "This is a hint."}
            required
          />
          <Input
            label="Disabled Input"
            type="text"
            placeholder="Disabled"
            disabled
          />
        </div>
      </Card>

      <SectionHeader title="Standard & Search Inputs" />
      <Card id="form-search" className="scroll-mt-20" padding="p-6">
        <div className="space-y-6 max-w-md">
          <Input
            label="Standard Input"
            type="text"
            placeholder="Placeholder text..."
          />
          <Input
            label="Validation Example"
            type="text"
            placeholder="Type here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            error={isError}
            helperText={isError ? "Input must be at least 5 characters long." : "This is a hint."}
            required
          />
          <div>
            <label className="block text-sm font-medium text-text-light mb-1">Search Input</label>
            <SearchInput placeholder="Search for anything..." />
          </div>
        </div>
      </Card>

      <SectionHeader title="Selection Controls" />
      <Card id="form-select" className="scroll-mt-20" padding="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-semibold text-text">Selects</h4>
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
          <div className="space-y-4">
            <h4 className="font-semibold text-text">Checkboxes & Toggles</h4>
            <Checkbox
              label="Remember me"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <Checkbox label="Opt-in to newsletter" defaultChecked />
            <ToggleSwitch
              label="Enable Notifications"
              checked={isToggled}
              onChange={setIsToggled}
            />
             <ToggleSwitch
              label="Disabled Toggle"
              checked={false}
              onChange={() => {}}
              disabled
            />
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-text">Radio Buttons</h4>
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
        </div>
      </Card>

      <SectionHeader title="Advanced Inputs" />
      <Card id="form-combo" className="scroll-mt-20" padding="p-6">
        <div className="space-y-6 max-w-md">
          <ComboBox
            label="Combo Box (Autocomplete)"
            options={fruitOptions}
            value={selectedFruit}
            onOptionSelect={(value, label) => { // <-- Change 'onSelect' to 'onOptionSelect'
              setSelectedFruit(value);
              addToast(`Selected: ${label} (Value: ${value})`, 'info');
            }}
            placeholder="Search for a fruit..."
          />
          <MultiSelect
            label="Multi-Select"
            options={countryOptions}
            value={selectedCountries}
            onChange={setSelectedCountries}
            placeholder="Select countries..."
          />
          <DatePicker
            label="Date Picker"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            placeholderText="Click to select a date"
            isClearable
          />
        </div>
      </Card>
      
      <SectionHeader title="File Upload" />
      <Card id="form-upload" className="scroll-mt-20" padding="p-6">
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

      <SectionHeader title="Form Template" />
      <Card id="form-form" className="scroll-mt-20" padding="p-0">
        <FormTemplate
          title="User Registration"
          fields={userProfileFields}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          submitButtonText="Register"
        />
      </Card>
    </div>
  );
};

export default FormsSection;
