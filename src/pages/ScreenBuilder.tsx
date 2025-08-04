// src/pages/ScreenBuilder.tsx
import React, { useState } from 'react';
import { wizardManifest } from '../wizardManifest';

// Import basic UI components to build the ScreenBuilder itself
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
// No DefaultLayout import here anymore


const ScreenBuilder: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [pageConfig, setPageConfig] = useState<any>({});

  // --- Step Content Components ---

  const Step1ChooseCanvas: React.FC<{ onSelect: (canvasType: string) => void; selected: string | null }> = ({ onSelect, selected }) => {
    // Dynamically generate canvas options based on component categories
    // This approach aggregates categories and provides a simple description.
    const getCanvasOptions = () => {
      const categories = new Set<string>();
      wizardManifest.components.forEach(comp => categories.add(comp.category));
      wizardManifest.layouts.forEach(layout => categories.add(layout.category));

      const options = [];

      if (categories.has('charts') || categories.has('data-display')) {
        options.push({ id: 'dashboard', label: 'Dashboard Page', description: 'A page with various charts and data tables.' });
      }
      if (categories.has('data-display')) {
        options.push({ id: 'data-display', label: 'Data Display Page', description: 'Focus on presenting tabular data or lists.' });
      }
      if (categories.has('form')) {
        options.push({ id: 'form-entry', label: 'Form Entry Page', description: 'A page designed for user input and data submission.' });
      }
      if (categories.has('ui') || categories.has('feedback') || categories.has('navigation')) {
        options.push({ id: 'component-showcase', label: 'Component Showcase', description: 'Explore and test individual UI components from the library.' });
      }
      // Always include a blank canvas option
      options.push({ id: 'custom-blank', label: 'Custom Blank Page', description: 'Start from a clean slate with basic layout structure.' });

      return options;
    };

    const canvasOptions = getCanvasOptions();

    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-text">Step 1: Choose Your Canvas</h2>
        <p className="text-text-light">What kind of page are you building today?</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          {canvasOptions.map(option => (
            <Card
              key={option.id}
              className={`cursor-pointer p-4 hover:border-primary transition-colors ${selected === option.id ? 'border-2 border-primary ring-2 ring-primary' : ''}`}
              onClick={() => onSelect(option.id)}
            >
              <h3 className="font-semibold text-xl text-text mb-2">{option.label}</h3>
              <p className="text-text-light text-sm">{option.description}</p>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const Step2PickBlocks: React.FC<{ onSelect: (componentIds: string[]) => void; selected: string[]; canvasType: string | null }> = ({ onSelect, selected, canvasType }) => {
    // Refine availableComponents based on canvasType
    const getAvailableComponents = () => {
      let filtered = wizardManifest.components;

      switch (canvasType) {
        case 'dashboard':
          filtered = filtered.filter(comp => comp.category === 'charts' || comp.category === 'data-display' || comp.name === 'StatCard' || comp.name === 'ActivityFeed');
          break;
        case 'data-display':
          filtered = filtered.filter(comp => comp.category === 'data-display' || comp.name === 'Table' || comp.name === 'DataTable' || comp.name === 'Pagination' || comp.name === 'EmptyState');
          break;
        case 'form-entry':
          filtered = filtered.filter(comp => comp.category === 'form' || comp.name === 'Button' || comp.name === 'Card');
          break;
        case 'component-showcase':
          // For showcase, show almost everything except maybe specific layout components
          filtered = wizardManifest.components.filter(comp => !['layout', 'templates-patterns'].includes(comp.category));
          break;
        case 'custom-blank':
        default:
          // For blank, show fundamental UI components or let user pick freely
          filtered = wizardManifest.components.filter(comp => ['ui', 'layout', 'form', 'data-display', 'charts'].includes(comp.category));
          break;
      }
      return filtered.sort((a,b) => a.name.localeCompare(b.name)); // Sort alphabetically
    };

    const availableComponents = getAvailableComponents();

    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-text">Step 2: Pick Your Blocks</h2>
        <p className="text-text-light">Select the components you want to include on your page.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableComponents.map(comp => (
            <Card
              key={comp.name}
              className={`cursor-pointer hover:border-primary p-4 transition-colors ${selected.includes(comp.name) ? 'border-2 border-primary ring-2 ring-primary' : ''}`}
              onClick={() => {
                const newSelection = selected.includes(comp.name)
                  ? selected.filter(id => id !== comp.name)
                  : [...selected, comp.name];
                onSelect(newSelection);
              }}
            >
              <h3 className="font-semibold text-lg text-text">{comp.name}</h3>
              <p className="text-text-light text-sm">{comp.description}</p>
              <p className="text-xs text-muted-foreground mt-1">Category: {comp.category}</p>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const Step3CustomizeBlocks: React.FC<{ config: any; onUpdate: (newConfig: any) => void }> = ({ config, onUpdate }) => {
    // This step will be the most dynamic and complex
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-text">Step 3: Customize Your Blocks</h2>
        <p className="text-text-light">Configure the properties for your selected components.</p>
        <div className="space-y-6">
          {config.selectedComponents && config.selectedComponents.length > 0 ? (
            config.selectedComponents.map((compName: string) => {
              const componentData = wizardManifest.components.find(c => c.name === compName) ||
                                   wizardManifest.layouts.find(l => l.name === compName) ||
                                   wizardManifest.utils.find(u => u.name === compName) ||
                                   wizardManifest.hooks.find(h => h.name === compName); // Include other categories

              if (!componentData) return null;

              return (
                <Card key={compName} className="p-4 border-l-4 border-primary space-y-3">
                  <h4 className="text-xl font-semibold text-text">{componentData.name} Properties</h4>
                  {componentData.props && componentData.props.length > 0 ? (
                    componentData.props.map(prop => (
                      <div key={prop.name}>
                        <label htmlFor={`${compName}-${prop.name}`} className="block text-sm font-medium text-text-light mb-1">
                          {prop.name}: <span className="text-xs text-muted-foreground">({prop.type})</span>
                        </label>
                        {/* More sophisticated prop type handling will go here */}
                        <Input
                          id={`${compName}-${prop.name}`}
                          type="text"
                          placeholder={prop.description}
                          value={config.componentProps?.[compName]?.[prop.name] || prop.default || ''}
                          onChange={(e) => {
                            onUpdate({
                              ...config,
                              componentProps: {
                                ...(config.componentProps || {}),
                                [compName]: {
                                  ...(config.componentProps?.[compName] || {}),
                                  [prop.name]: e.target.value,
                                },
                              },
                            });
                          }}
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-text-light text-sm">No customizable properties for this component.</p>
                  )}
                </Card>
              );
            })
          ) : (
            <p className="text-text-light">No components selected in the previous step to customize.</p>
          )}
        </div>
      </div>
    );
  };

  const Step4LayoutAndPolish: React.FC<{ config: any; onUpdate: (newConfig: any) => void }> = ({ config, onUpdate }) => {
    const layoutOptions = wizardManifest.layouts.filter(layout => layout.category === 'layout');
    // More robust way to get availableThemes from ThemeProvider
    const themeProviderProps = wizardManifest.utils.find(util => util.name === 'ThemeProvider')?.props;
    const availableThemesProp = themeProviderProps?.find(p => p.name === 'availableThemes');
    let themeOptions: string[] = ['light', 'dark']; // Default fallback
    if (availableThemesProp && availableThemesProp.type && availableThemesProp.type.startsWith('ThemeName[]')) {
        // This is a bit of a hack to parse the 'ThemeName' enum values from its type string
        // Assumes ThemeName is defined as 'light' | 'dark' | ...
        const themeEnumType = wizardManifest.utils.find(util => util.name === 'ThemeName' && util.category === 'utility'); // Assuming you'd make a WizardEntry for ThemeName type itself
        // A more robust way would be to import ThemeName directly and iterate it, or parse it carefully
        themeOptions = wizardManifest.utils.find(u => u.name === 'ThemeProvider')?.availableThemes || themeOptions; // This line won't work yet based on current manifest structure for availableThemes
        // Instead, we hardcode, or extend wizardManifest for enum types if needed.
        // For now, let's rely on the direct parse from ThemeContext or a fixed list
        // From ThemeContext.tsx: export type ThemeName = 'light' | 'dark' | 'corporate' | 'midnight' | 'blueprint';
        themeOptions = ['light', 'dark', 'corporate', 'midnight', 'blueprint'];
    }


    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-text">Step 4: Layout & Polish</h2>
        <p className="text-text-light">Choose your page layout and give it a title.</p>
        <Card className="p-4 space-y-4">
          <h4 className="text-xl font-semibold text-text">Page Title</h4>
          <Input
            label="Page Title"
            placeholder="e.g., My New Dashboard"
            value={config.pageTitle || ''}
            onChange={(e) => onUpdate({ ...config, pageTitle: e.target.value })}
          />

          <h4 className="text-xl font-semibold text-text mt-6">Layout</h4>
          <div className="flex space-x-4">
            {layoutOptions.map(layout => (
              <Button
                key={layout.name}
                variant={config.layout === layout.name ? 'primary' : 'outline'}
                onClick={() => onUpdate({ ...config, layout: layout.name })}
              >
                {layout.name}
              </Button>
            ))}
             <Button
                variant={config.layout === 'Blank Canvas' ? 'primary' : 'outline'}
                onClick={() => onUpdate({ ...config, layout: 'Blank Canvas' })}
              >
                Blank Canvas
              </Button>
          </div>

          <h4 className="text-xl font-semibold text-text mt-6">Default Theme</h4>
          <div className="flex space-x-4">
            {themeOptions.map(themeName => (
              <Button
                key={themeName}
                variant={config.initialTheme === themeName ? 'primary' : 'outline'}
                onClick={() => onUpdate({ ...config, initialTheme: themeName })}
              >
                {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    );
  };

  const Step5GenerateCode: React.FC<{ config: any }> = ({ config }) => {
    // This is where the magic happens! We'll generate the actual code here.
    // For now, let's just show the collected config.
    const generatedCode = `
// Generated code for ${config.pageTitle || 'Untitled Page'}
// Layout: ${config.layout || 'None'}
// Initial Theme: ${config.initialTheme || 'light'}

// Selected Components and their props:
${JSON.stringify(config.componentProps, null, 2)}

// You'll implement the actual JSX generation logic here!
    `;

    const generatedAIPropmt = `
    Generate a React/TypeScript page using the Fanta boilerplate.
    The page title should be: "${config.pageTitle || 'Untitled Page'}".
    It should use the "${config.layout || 'Blank Canvas'}" layout.
    The initial theme should be "${config.initialTheme || 'light'}".

    Include the following components with these properties:
    ${JSON.stringify(config.componentProps, null, 2)}

    Please provide the full JSX code, including all necessary imports.
    `;

    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-text">Step 5: Your Code / AI Prompt is Ready!</h2>
        <p className="text-text-light">Copy the generated code or AI prompt below:</p>
        <Card className="p-4 bg-background-alt">
          <h3 className="text-xl font-semibold text-text mb-2">Generated JSX Code</h3>
          <pre className="whitespace-pre-wrap break-all bg-card-alt text-text-light p-4 rounded-md overflow-x-auto">
            <code>{generatedCode}</code>
          </pre>
          <Button onClick={() => navigator.clipboard.writeText(generatedCode)} className="mt-4" variant="primary">
            Copy Code
          </Button>
        </Card>

        <Card className="p-4 bg-background-alt mt-6">
          <h3 className="text-xl font-semibold text-text mb-2">Generated AI Prompt</h3>
          <pre className="whitespace-pre-wrap break-all bg-card-alt text-text-light p-4 rounded-md overflow-x-auto">
            <code>{generatedAIPropmt}</code>
          </pre>
          <Button onClick={() => navigator.clipboard.writeText(generatedAIPropmt)} className="mt-4" variant="secondary">
            Copy AI Prompt
          </Button>
        </Card>
      </div>
    );
  };
  // --- End Step Content Components ---


  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1ChooseCanvas
          onSelect={(canvasType) => setPageConfig({ ...pageConfig, canvasType, selectedComponents: [] })}
          selected={pageConfig.canvasType || null}
        />;
      case 2:
        return <Step2PickBlocks
          onSelect={(components) => setPageConfig({ ...pageConfig, selectedComponents: components, componentProps: {} })}
          selected={pageConfig.selectedComponents || []}
          canvasType={pageConfig.canvasType || null} // Pass canvasType to Step2
        />;
      case 3:
        return <Step3CustomizeBlocks
          config={pageConfig}
          onUpdate={setPageConfig}
        />;
      case 4:
        return <Step4LayoutAndPolish
          config={pageConfig}
          onUpdate={setPageConfig}
        />;
      case 5:
        return <Step5GenerateCode config={pageConfig} />;
      default:
        return <div>Unknown Step</div>;
    }
  };

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const getMaxSteps = () => 5; // Fixed number of steps for now

  return (
    // REMOVE THE DefaultLayout WRAPPER HERE.
    // The content of ScreenBuilder should directly be placed within the <main> tag of DefaultLayout from App.tsx.
    <Card className="p-8 max-w-4xl mx-auto my-10 space-y-8">
      {renderStepContent()}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-8">
        {currentStep > 1 && (
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
        )}
        {currentStep < getMaxSteps() ? (
          <Button variant="primary" onClick={handleNext} className="ml-auto">
            Next
          </Button>
        ) : (
          <span className="ml-auto"></span> // Keep layout consistent
        )}
      </div>
    </Card>
  );
};

export default ScreenBuilder;