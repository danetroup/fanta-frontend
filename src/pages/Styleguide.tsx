// src/pages/Styleguide.tsx
import React from 'react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import Select from '../components/ui/Select';
import Checkbox from '../components/ui/Checkbox';
import Radio from '../components/ui/Radio';
import Tooltip from '../components/ui/Tooltip';
import { Menu, MenuItem } from '../components/ui/Menu';
import { List, ListItem, DefinitionList, DefinitionTerm, DefinitionDescription } from '../components/ui/List';
import Drawer from '../components/ui/Drawer';
import FormTemplate, { type FormField } from '../components/forms/FormTemplate';
import ComboBox from '../components/ui/ComboBox';
import MultiSelect from '../components/ui/MultiSelect';
import DatePicker from '../components/ui/DatePicker';
import FileUpload from '../components/forms/FileUpload'; // <--- ADD THIS IMPORT
import { useTheme, type ThemeName } from '../contexts'; // To display current theme info
import { useState } from 'react';

// Define the MultiSelectOption type (should match the one in MultiSelect.tsx)
interface MultiSelectOption {
  value: string;
  label: string;
}

const Styleguide: React.FC = () => {
  const { theme, availableThemes, setTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('option1');
  const [isChecked, setIsChecked] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState('optionA');

  // Drawer states
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
  const [isTopDrawerOpen, setIsTopDrawerOpen] = useState(false);
  const [isBottomDrawerOpen, setIsBottomDrawerOpen] = useState(false);

  // ComboBox states
  const [selectedFruit, setSelectedFruit] = useState<string | number | null>('apple');

  // MultiSelect states
  const [selectedCountries, setSelectedCountries] = useState<MultiSelectOption[] | null>([
    { value: 'usa', label: 'United States' },
    { value: 'can', label: 'Canada' }
  ]);

  // DatePicker state
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const selectOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const fruitOptions = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
    { value: 'grape', label: 'Grape' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'blueberry', label: 'Blueberry' },
  ];

  const countryOptions: MultiSelectOption[] = [
    { value: 'usa', label: 'United States' },
    { value: 'can', label: 'Canada' },
    { value: 'mex', label: 'Mexico' },
    { value: 'gbr', label: 'United Kingdom' },
    { value: 'fra', label: 'France' },
    { value: 'deu', label: 'Germany' },
  ];


  const handleMenuItemClick = (item: string) => {
    alert(`Menu Item Clicked: ${item}`);
  };

  const handleFileUpload = (files: File[]) => {
    alert(`Files uploaded: ${files.map(f => f.name).join(', ')}`);
    console.log('Uploaded files:', files);
  };

  // --- FormTemplate Example Data ---
  const handleFormSubmit = (formData: Record<string, any>) => {
    alert('Form Submitted:\n' + JSON.stringify(formData, null, 2));
  };

  const handleFormCancel = () => {
    alert('Form Cancelled!');
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
  // --- End FormTemplate Example Data ---


  return (
    <div className="p-8 space-y-12">
      <h1 className="text-4xl font-bold text-text mb-6">Style Guide & Component Showcase</h1>

      {/* Theme Info */}
      <Card className="p-6">
        <h2 className="text-3xl font-semibold mb-4 text-text">Current Theme</h2>
        <p className="text-lg text-text">
          Active Theme: <span className="font-bold text-primary">{theme.charAt(0).toUpperCase() + theme.slice(1)} Mode</span>
        </p>
        <p className="text-lg text-text mt-2">
          Available Themes: {availableThemes.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(', ')}
        </p>
        <div className="mt-4 flex items-center space-x-2">
          <label htmlFor="styleguide-theme-select" className="text-text">Switch Theme:</label>
          <Select
            id="styleguide-theme-select"
            options={availableThemes.map(t => ({ value: t, label: t.charAt(0).toUpperCase() + t.slice(1) + ' Mode' }))}
            value={theme}
            onChange={(e) => setTheme(e.target.value as ThemeName)}
            className="w-36"
          />
        </div>
      </Card>

      {/* Colors */}
      <Card className="p-6">
        <h2 className="text-3xl font-semibold mb-4 text-text">Colors</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div className="flex flex-col items-center p-4 rounded-md bg-primary text-white">Primary</div>
          <div className="flex flex-col items-center p-4 rounded-md bg-secondary text-white">Secondary</div>
          <div className="flex flex-col items-center p-4 rounded-md bg-accent text-white">Accent</div>
          <div className="flex flex-col items-center p-4 rounded-md bg-background text-text border border-border">Background</div>
          <div className="flex flex-col items-center p-4 rounded-md bg-card text-text border border-border">Card</div>
          <div className="flex flex-col items-center p-4 rounded-md bg-red-600 text-white">Red-600</div>
          <div className="flex flex-col items-center p-4 rounded-md bg-green-600 text-white">Green-600</div>
          <div className="flex flex-col items-center p-4 rounded-md bg-blue-600 text-white">Blue-600</div>
        </div>
      </Card>

      {/* Typography */}
      <Card className="p-6">
        <h2 className="text-3xl font-semibold mb-4 text-text">Typography</h2>
        <h1 className="text-5xl font-extrabold text-text mb-2">Heading 1 (Extrabold)</h1>
        <h2 className="text-4xl font-bold text-text mb-2">Heading 2 (Bold)</h2>
        <h3 className="text-3xl font-semibold text-text mb-2">Heading 3 (Semibold)</h3>
        <h4 className="text-2xl font-medium text-text mb-2">Heading 4 (Medium)</h4>
        <h5 className="text-xl font-normal text-text mb-2">Heading 5 (Normal)</h5>
        <h6 className="text-lg font-light text-text mb-2">Heading 6 (Light)</h6>
        <p className="text-base text-text mb-2">Paragraph text at base size. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p className="text-sm text-text-light">Small text, often used for secondary information or captions.</p>
      </Card>

      {/* Buttons */}
      <Card className="p-6">
        <h2 className="text-3xl font-semibold mb-4 text-text">Buttons</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="accent">Accent Button</Button>
          <Button variant="danger">Danger Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="primary" size="sm">Small Btn</Button>
          <Button variant="primary" size="lg">Large Button</Button>
          <Button variant="primary" disabled>Disabled Btn</Button>
          <Button variant="outline" disabled>Disabled Outline</Button>
        </div>
      </Card>

      {/* Inputs */}
      <Card className="p-6">
        <h2 className="text-3xl font-semibold mb-4 text-text">Inputs</h2>
        <div className="space-y-4 max-w-md">
          <Input type="text" placeholder="Standard Input" />
          <Input type="email" placeholder="Email Input" />
          <Input type="password" placeholder="Password Input" />
          <Input type="text" placeholder="Disabled Input" disabled />
        </div>
      </Card>

      {/* Selects */}
      <Card className="p-6">
        <h2 className="text-3xl font-semibold mb-4 text-text">Selects</h2>
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

      {/* Checkboxes */}
      <Card className="p-6">
        <h2 className="text-3xl font-semibold mb-4 text-text">Checkboxes</h2>
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

      {/* Radios */}
      <Card className="p-6">
        <h2 className="text-3xl font-semibold mb-4 text-text">Radios</h2>
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

      {/* Tooltips */}
      <Card className="p-6">
        <h2 className="text-3xl font-semibold mb-4 text-text">Tooltips</h2>
        <div className="flex flex-wrap items-center gap-8">
          <Tooltip content="This is a top tooltip." position="top">
            <Button variant="secondary">Hover Me (Top)</Button>
          </Tooltip>
          <Tooltip content="This is a right tooltip with more content." position="right">
            <Button variant="secondary">Hover Me (Right)</Button>
          </Tooltip>
          <Tooltip content="Tooltip at the bottom." position="bottom">
            <Button variant="secondary">Hover Me (Bottom)</Button>
          </Tooltip>
          <Tooltip content="Left-aligned tooltip." position="left">
            <Button variant="secondary">Hover Me (Left)</Button>
          </Tooltip>
        </div>
      </Card>

      {/* Menus */}
      <Card className="p-6">
        <h2 className="text-3xl font-semibold mb-4 text-text">Menus</h2>
        <div className="flex flex-wrap items-center gap-8">
          <Menu
            trigger={<Button variant="primary">Open Menu (Right)</Button>}
            position="bottom-right"
          >
            <MenuItem onClick={() => handleMenuItemClick('Item 1')}>Menu Item 1</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('Item 2')}>Menu Item 2</MenuItem>
            <MenuItem disabled>Disabled Item</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('Item 3')}>Menu Item 3</MenuItem>
          </Menu>
          <Menu
            trigger={<Button variant="secondary">Open Menu (Left)</Button>}
            position="bottom-left"
          >
            <MenuItem onClick={() => handleMenuItemClick('Another 1')}>Another Item 1</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('Another 2')}>Another Item 2</MenuItem>
          </Menu>
        </div>
      </Card>

      {/* Lists */}
      <Card className="p-6">
        <h2 className="text-3xl font-semibold mb-4 text-text">Lists & Definition Lists</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-text">Unordered List</h3>
            <List type="ul">
              <ListItem>First unordered list item</ListItem>
              <ListItem>Second unordered list item</ListItem>
              <ListItem>Third unordered list item</ListItem>
            </List>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-text">Ordered List</h3>
            <List type="ol">
              <ListItem>First ordered list item</ListItem>
              <ListItem>Second ordered list item</ListItem>
              <ListItem>Third ordered list item</ListItem>
            </List>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold mb-2 text-text">Definition List</h3>
            <DefinitionList>
              <DefinitionTerm>Term 1</DefinitionTerm>
              <DefinitionDescription>Description for term 1. This provides more details about the term.</DefinitionDescription>
              <DefinitionTerm>Term 2</DefinitionTerm>
              <DefinitionDescription>Description for term 2.</DefinitionDescription>
              <DefinitionTerm>Another Term</DefinitionTerm>
              <DefinitionDescription>This is a longer description that spans multiple lines to show wrapping behavior.</DefinitionDescription>
            </DefinitionList>
          </div>
        </div>
      </Card>

      {/* Drawers */}
      <Card className="p-6">
        <h2 className="text-3xl font-semibold mb-4 text-text">Drawers</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button onClick={() => setIsRightDrawerOpen(true)} variant="primary">Open Right Drawer</Button>
          <Button onClick={() => setIsLeftDrawerOpen(true)} variant="secondary">Open Left Drawer</Button>
          <Button onClick={() => setIsTopDrawerOpen(true)} variant="accent">Open Top Drawer</Button>
          <Button onClick={() => setIsBottomDrawerOpen(true)} variant="danger">Open Bottom Drawer</Button>
        </div>

        {/* Right Drawer */}
        <Drawer
          isOpen={isRightDrawerOpen}
          onClose={() => setIsRightDrawerOpen(false)}
          position="right"
          size="300px"
          title="Right-Side Drawer"
        >
          <p className="text-text">This drawer slides in from the right.</p>
          <Input type="text" placeholder="Drawer input" className="mt-4" />
          <Button variant="primary" className="mt-4">Action</Button>
        </Drawer>

        {/* Left Drawer */}
        <Drawer
          isOpen={isLeftDrawerOpen}
          onClose={() => setIsLeftDrawerOpen(false)}
          position="left"
          size="25%"
          title="Left-Side Drawer (25%)"
        >
          <p className="text-text">This drawer slides in from the left and has a responsive width.</p>
          <p className="text-text mt-2">Try resizing your browser!</p>
        </Drawer>

        {/* Top Drawer */}
        <Drawer
          isOpen={isTopDrawerOpen}
          onClose={() => setIsTopDrawerOpen(false)}
          position="top"
          size="150px"
          title="Top Drawer"
        >
          <p className="text-text">This short drawer slides down from the top.</p>
        </Drawer>

        {/* Bottom Drawer */}
        <Drawer
          isOpen={isBottomDrawerOpen}
          onClose={() => setIsBottomDrawerOpen(false)}
          position="bottom"
          size="50%"
          title="Bottom Drawer (50%)"
        >
          <p className="text-text">This drawer slides up from the bottom.</p>
          <div className="h-20 bg-primary/20 mt-4 rounded p-2 text-sm text-primary">
            Scrollable content example.
          </div>
        </Drawer>
      </Card>

      {/* Combo Box */}
      <Card className="p-6">
        <h2 className="text-3xl font-semibold mb-4 text-text">Combo Box (Autocomplete Select)</h2>
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

      {/* Multi-Select */}
      <Card className="p-6">
        <h2 className="text-3xl font-semibold mb-4 text-text">Multi-Select</h2>
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

      {/* Date Picker */}
      <Card className="p-6">
        <h2 className="text-3xl font-semibold mb-4 text-text">Date Picker</h2>
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

      {/* File Upload */} {/* <--- NEW SECTION ADDED HERE */}
      <Card className="p-6">
        <h2 className="text-3xl font-semibold mb-4 text-text">File Upload</h2>
        <div className="space-y-4 max-w-md">
          <FileUpload
            label="Upload your document (PDF, TXT)"
            onFileUpload={handleFileUpload}
            acceptedFileTypes=".pdf,.txt"
          />
          <FileUpload
            label="Upload multiple images"
            onFileUpload={handleFileUpload}
            multiple
            acceptedFileTypes="image/*"
          />
        </div>
      </Card>


      {/* Form Template */}
      <Card className="p-6 max-w-2xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4 text-text">Form Template Example</h2>
        <FormTemplate
          title="User Registration"
          fields={userProfileFields}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          submitButtonText="Register"
        />
      </Card>


      {/* Cards */}
      <Card className="p-6">
        <h2 className="text-3xl font-semibold mb-4 text-text">Cards (Self-Contained)</h2>
        <p className="text-text">This whole section is wrapped in a Card component.</p>
        <Card className="p-4 mt-4 bg-primary/10 border-primary/50 text-primary">
          <p>This is a nested card with custom Tailwind styles applied directly.</p>
        </Card>
      </Card>

      {/* Modals */}
      <Card className="p-6">
        <h2 className="text-3xl font-semibold mb-4 text-text">Modals</h2>
        <Button onClick={() => setIsModalOpen(true)} variant="accent">Open Styleguide Modal</Button>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Styleguide Test Modal"
          footer={
            <>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Close</Button>
              <Button variant="primary">Confirm</Button>
            </>
          }
        >
          <p className="text-text">This is a modal instance from the style guide.</p>
          <Input type="text" placeholder="Input inside Modal" className="mt-4" />
        </Modal>
      </Card>
    </div>
  );
};

export default Styleguide;