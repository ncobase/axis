import { useState } from 'react';

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useForm } from 'react-hook-form';

import {
  ColorPickerComponent,
  IconPickerComponent,
  Input,
  Label,
  Section,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './components';
import { Form } from './form';
import { FieldRender } from './render';
import { FormLayout } from './types';

import { Button } from '@/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/card';
import { Icons } from '@/icon';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/tabs';
import { ScrollView } from '@/views';

export const FormBuilder = ({ className }: { className?: string }) => {
  // Active tab state
  const [activeTab, setActiveTab] = useState('preview');

  // Form layout and theme state
  const [formLayout, setFormLayout] = useState('default');
  const [formTheme, setFormTheme] = useState('light');

  // Active section for editing
  const [activeSectionId, setActiveSectionId] = useState('section1');

  // State for currently editing field (modal)
  const [editingField, setEditingField] = useState(null);

  // Form sections state
  const [formSections, setFormSections] = useState<any>([
    {
      id: 'section1',
      title: 'Personal Information',
      subtitle: 'Personal details and contact information',
      icon: 'IconUser',
      collapsible: true,
      fields: [
        {
          title: 'Full Name',
          name: 'fullName',
          type: 'text',
          prependIcon: 'IconUser',
          defaultValue: '',
          placeholder: 'Enter your full name',
          rules: { required: 'Full name is required' }
        },
        {
          title: 'Email Address',
          name: 'email',
          type: 'email',
          prependIcon: 'IconMail',
          defaultValue: '',
          placeholder: 'example@domain.com',
          rules: {
            required: 'Email address is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          }
        },
        {
          title: 'Phone Number',
          name: 'phoneNumber',
          type: 'text',
          prependIcon: 'IconPhone',
          defaultValue: '',
          placeholder: 'Enter your phone number'
        },
        {
          title: 'Date of Birth',
          name: 'dateOfBirth',
          type: 'date',
          defaultValue: new Date(1990, 0, 1)
        },
        {
          title: 'Gender',
          name: 'gender',
          type: 'radio',
          defaultValue: 'male',
          options: [
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
            { label: 'Other', value: 'other' },
            { label: 'Prefer not to say', value: 'not_specified' }
          ],
          className: 'col-span-full',
          elementClassName: 'gap-6'
        },
        {
          title: 'Profile Picture',
          name: 'profilePicture',
          type: 'uploader',
          defaultValue: null,
          className: 'col-span-full',
          placeholderText: {
            main: 'Upload profile picture',
            sub: 'or drag and drop',
            hint: 'JPG, PNG or GIF (max. 2MB)'
          },
          maxFiles: 1,
          maxSize: 2 * 1024 * 1024
        }
      ]
    },
    {
      id: 'section2',
      title: 'Employment Information',
      subtitle: 'Job details and work experience',
      icon: 'IconBriefcase',
      collapsible: true,
      fields: [
        {
          title: 'Job Title',
          name: 'jobTitle',
          type: 'text',
          prependIcon: 'IconBriefcase',
          defaultValue: '',
          placeholder: 'Enter your job title'
        },
        {
          title: 'Department',
          name: 'department',
          type: 'select',
          defaultValue: '',
          placeholder: 'Select department',
          options: [
            { label: 'Engineering', value: 'engineering' },
            { label: 'Marketing', value: 'marketing' },
            { label: 'Sales', value: 'sales' },
            { label: 'Finance', value: 'finance' },
            { label: 'Human Resources', value: 'hr' },
            { label: 'Operations', value: 'operations' },
            { label: 'Research & Development', value: 'r_and_d' }
          ]
        },
        {
          title: 'Employment Type',
          name: 'employmentType',
          type: 'select',
          defaultValue: 'full_time',
          options: [
            { label: 'Full-time', value: 'full_time' },
            { label: 'Part-time', value: 'part_time' },
            { label: 'Contract', value: 'contract' },
            { label: 'Internship', value: 'internship' },
            { label: 'Freelance', value: 'freelance' }
          ]
        },
        {
          title: 'Employment Period',
          name: 'employmentPeriod',
          type: 'date-range',
          defaultValue: {
            from: new Date(),
            to: null
          }
        },
        {
          title: 'Skills',
          name: 'skills',
          type: 'multi-select',
          defaultValue: [],
          placeholder: 'Select skills',
          options: [
            { label: 'JavaScript', value: 'javascript' },
            { label: 'React', value: 'react' },
            { label: 'TypeScript', value: 'typescript' },
            { label: 'Node.js', value: 'nodejs' },
            { label: 'HTML/CSS', value: 'html_css' },
            { label: 'UI/UX Design', value: 'ui_ux' },
            { label: 'Project Management', value: 'project_management' },
            { label: 'Marketing', value: 'marketing' },
            { label: 'Sales', value: 'sales' },
            { label: 'Finance', value: 'finance' }
          ],
          className: 'col-span-full'
        },
        {
          title: 'Resume/CV',
          name: 'resume',
          type: 'uploader',
          defaultValue: null,
          placeholderText: {
            main: 'Upload resume/CV',
            sub: 'or drag and drop',
            hint: 'PDF, DOC or DOCX (max. 5MB)'
          },
          maxFiles: 1,
          maxSize: 5 * 1024 * 1024,
          className: 'col-span-full'
        }
      ]
    },
    {
      id: 'section3',
      title: 'Address Information',
      subtitle: 'Residential and mailing address',
      icon: 'IconBuilding',
      collapsible: true,
      fields: [
        {
          title: 'Street Address',
          name: 'streetAddress',
          type: 'text',
          prependIcon: 'IconBuilding',
          defaultValue: '',
          placeholder: 'Enter street address',
          className: 'col-span-full'
        },
        {
          title: 'City',
          name: 'city',
          type: 'text',
          defaultValue: '',
          placeholder: 'Enter city'
        },
        {
          title: 'State/Province',
          name: 'state',
          type: 'text',
          defaultValue: '',
          placeholder: 'Enter state or province'
        },
        {
          title: 'Country',
          name: 'country',
          type: 'select',
          defaultValue: 'us',
          options: [
            { label: 'United States', value: 'us' },
            { label: 'Canada', value: 'ca' },
            { label: 'United Kingdom', value: 'gb' },
            { label: 'Australia', value: 'au' },
            { label: 'Germany', value: 'de' },
            { label: 'France', value: 'fr' },
            { label: 'Japan', value: 'jp' },
            { label: 'China', value: 'cn' },
            { label: 'India', value: 'in' },
            { label: 'Brazil', value: 'br' }
          ]
        },
        {
          title: 'Postal/ZIP Code',
          name: 'postalCode',
          type: 'text',
          defaultValue: '',
          placeholder: 'Enter postal or ZIP code'
        },
        {
          title: 'Address Type',
          name: 'addressType',
          type: 'radio',
          defaultValue: 'residential',
          options: [
            { label: 'Residential', value: 'residential' },
            { label: 'Business', value: 'business' }
          ]
        }
      ]
    },
    {
      id: 'section4',
      title: 'Additional Information',
      subtitle: 'Preferences and other details',
      icon: 'IconSettings',
      collapsible: true,
      fields: [
        {
          title: 'Biography',
          name: 'biography',
          type: 'textarea',
          defaultValue: '',
          placeholder: 'Tell us about yourself...',
          className: 'col-span-full'
        },
        {
          title: 'Website',
          name: 'website',
          type: 'text',
          prependIcon: 'IconWorld',
          defaultValue: '',
          placeholder: 'https://'
        },
        {
          title: 'Social Media',
          name: 'socialMedia',
          type: 'text',
          prependIcon: 'IconBrandTwitter',
          defaultValue: '',
          placeholder: '@username'
        },
        {
          title: 'Preferred Theme',
          name: 'theme',
          type: 'color',
          defaultValue: '#3b82f6',
          presetColors: [
            '#ef4444',
            '#f97316',
            '#eab308',
            '#22c55e',
            '#3b82f6',
            '#8b5cf6',
            '#ec4899'
          ]
        },
        {
          title: 'Preferred Icon',
          name: 'preferredIcon',
          type: 'icon',
          defaultValue: 'IconStar'
        },
        {
          title: 'Categories',
          name: 'categories',
          type: 'tree-select',
          defaultValue: [],
          multiple: true,
          placeholder: 'Select categories',
          options: [
            {
              label: 'Technology',
              value: 'tech',
              children: [
                { label: 'Programming', value: 'programming' },
                { label: 'Hardware', value: 'hardware' },
                { label: 'Software', value: 'software' }
              ]
            },
            {
              label: 'Business',
              value: 'business',
              children: [
                { label: 'Marketing', value: 'marketing' },
                { label: 'Finance', value: 'finance' },
                { label: 'Operations', value: 'operations' }
              ]
            },
            {
              label: 'Creative',
              value: 'creative',
              children: [
                { label: 'Design', value: 'design' },
                { label: 'Writing', value: 'writing' },
                { label: 'Music', value: 'music' }
              ]
            }
          ],
          className: 'col-span-full'
        },
        {
          title: 'Notifications',
          name: 'notifications',
          type: 'checkbox',
          defaultValue: ['email'],
          options: [
            { label: 'Email notifications', value: 'email' },
            { label: 'SMS notifications', value: 'sms' },
            { label: 'Push notifications', value: 'push' }
          ],
          className: 'col-span-full'
        },
        {
          title: 'Newsletter',
          name: 'newsletter',
          type: 'switch',
          defaultValue: true
        },
        {
          title: 'Terms of Service',
          name: 'termsOfService',
          type: 'checkbox',
          defaultValue: [],
          options: [
            { label: 'I agree to the Terms of Service and Privacy Policy', value: 'agreed' }
          ],
          className: 'col-span-full',
          rules: { required: 'You must agree to the Terms of Service' }
        }
      ]
    }
  ]);

  // Form field templates - organized by category
  const fieldTemplates = {
    basic: [
      {
        type: 'text',
        title: 'Text Input',
        icon: 'IconType',
        template: {
          title: 'Text Field',
          name: 'textField',
          type: 'text',
          prependIcon: 'IconType',
          defaultValue: '',
          placeholder: 'Enter text',
          rules: { required: 'This field is required' }
        }
      },
      {
        type: 'number',
        title: 'Number Input',
        icon: 'IconNumber',
        template: {
          title: 'Number Field',
          name: 'numberField',
          type: 'number',
          prependIcon: 'IconNumber',
          defaultValue: 0,
          placeholder: 'Enter number',
          rules: { required: 'This field is required' }
        }
      },
      {
        type: 'email',
        title: 'Email Input',
        icon: 'IconMail',
        template: {
          title: 'Email Address',
          name: 'emailField',
          type: 'email',
          prependIcon: 'IconMail',
          defaultValue: '',
          placeholder: 'Enter email address',
          rules: {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          }
        }
      },
      {
        type: 'password',
        title: 'Password Input',
        icon: 'IconLock',
        template: {
          title: 'Password',
          name: 'passwordField',
          type: 'password',
          prependIcon: 'IconLock',
          defaultValue: '',
          placeholder: 'Enter password',
          rules: {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters'
            }
          }
        }
      },
      {
        type: 'textarea',
        title: 'Text Area',
        icon: 'IconTextPlus',
        template: {
          title: 'Text Area',
          name: 'textareaField',
          type: 'textarea',
          defaultValue: '',
          placeholder: 'Enter long text',
          className: 'col-span-full'
        }
      }
    ],
    selection: [
      {
        type: 'select',
        title: 'Dropdown Select',
        icon: 'IconSelect',
        template: {
          title: 'Select Field',
          name: 'selectField',
          type: 'select',
          defaultValue: '',
          placeholder: 'Select an option',
          options: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' }
          ],
          rules: { required: 'Please select an option' }
        }
      },
      {
        type: 'multi-select',
        title: 'Multi Select',
        icon: 'IconList',
        template: {
          title: 'Multi Select Field',
          name: 'multiSelectField',
          type: 'multi-select',
          defaultValue: [],
          placeholder: 'Select multiple options',
          options: [
            { label: 'Option A', value: 'optionA' },
            { label: 'Option B', value: 'optionB' },
            { label: 'Option C', value: 'optionC' },
            { label: 'Option D', value: 'optionD' }
          ],
          className: 'col-span-full'
        }
      },
      {
        type: 'tree-select',
        title: 'Tree Select',
        icon: 'IconHierarchy',
        template: {
          title: 'Tree Select Field',
          name: 'treeSelectField',
          type: 'tree-select',
          defaultValue: [],
          placeholder: 'Select hierarchical options',
          multiple: true,
          options: [
            {
              label: 'Category 1',
              value: 'cat1',
              children: [
                { label: 'Subcategory 1.1', value: 'subcat1.1' },
                { label: 'Subcategory 1.2', value: 'subcat1.2' }
              ]
            },
            {
              label: 'Category 2',
              value: 'cat2',
              children: [
                { label: 'Subcategory 2.1', value: 'subcat2.1' },
                { label: 'Subcategory 2.2', value: 'subcat2.2' }
              ]
            }
          ],
          className: 'col-span-full'
        }
      },
      {
        type: 'checkbox',
        title: 'Checkboxes',
        icon: 'IconSquareCheck',
        template: {
          title: 'Checkbox Field',
          name: 'checkboxField',
          type: 'checkbox',
          defaultValue: [],
          options: [
            { label: 'Option One', value: 'one' },
            { label: 'Option Two', value: 'two' },
            { label: 'Option Three', value: 'three' }
          ],
          className: 'col-span-full',
          elementClassName: 'gap-8'
        }
      },
      {
        type: 'radio',
        title: 'Radio Buttons',
        icon: 'IconCircleCheck',
        template: {
          title: 'Radio Field',
          name: 'radioField',
          type: 'radio',
          defaultValue: '',
          options: [
            { label: 'Option X', value: 'x' },
            { label: 'Option Y', value: 'y' },
            { label: 'Option Z', value: 'z' }
          ],
          className: 'col-span-full',
          elementClassName: 'gap-8'
        }
      },
      {
        type: 'switch',
        title: 'Switch Toggle',
        icon: 'IconToggleRight',
        template: {
          title: 'Switch Field',
          name: 'switchField',
          type: 'switch',
          defaultValue: false
        }
      }
    ],
    advanced: [
      {
        type: 'date',
        title: 'Date Picker',
        icon: 'IconCalendar',
        template: {
          title: 'Date Field',
          name: 'dateField',
          type: 'date',
          defaultValue: new Date()
        }
      },
      {
        type: 'date-range',
        title: 'Date Range Picker',
        icon: 'IconCalendarDue',
        template: {
          title: 'Date Range Field',
          name: 'dateRangeField',
          type: 'date-range',
          defaultValue: {
            from: new Date(),
            to: new Date(new Date().setMonth(new Date().getMonth() + 1))
          }
        }
      },
      {
        type: 'uploader',
        title: 'File Uploader',
        icon: 'IconCloudUpload',
        template: {
          title: 'Upload Field',
          name: 'uploadField',
          type: 'uploader',
          defaultValue: null,
          className: 'col-span-full',
          placeholderText: {
            main: 'Upload your files',
            sub: 'or drag and drop',
            hint: 'Maximum file size: 5MB'
          },
          maxFiles: 5,
          maxSize: 5 * 1024 * 1024
        }
      },
      {
        type: 'color',
        title: 'Color Picker',
        icon: 'IconPalette',
        template: {
          title: 'Color Field',
          name: 'colorField',
          type: 'color',
          defaultValue: '#3b82f6',
          presetColors: [
            '#ef4444',
            '#f97316',
            '#eab308',
            '#22c55e',
            '#3b82f6',
            '#8b5cf6',
            '#ec4899'
          ]
        }
      },
      {
        type: 'icon',
        title: 'Icon Picker',
        icon: 'IconCategory',
        template: {
          title: 'Icon Field',
          name: 'iconField',
          type: 'icon',
          defaultValue: 'IconStar',
          searchable: true,
          categorized: true
        }
      },
      {
        type: 'hidden',
        title: 'Hidden Field',
        icon: 'IconEyeOff',
        template: {
          title: 'Hidden Field',
          name: 'hiddenField',
          type: 'hidden',
          defaultValue: ''
        }
      }
    ]
  };

  // Find active section
  const activeSection =
    formSections.find(section => section.id === activeSectionId) || formSections[0];

  // Format fields for form component - Get all fields from all sections
  // const getAllFormFields = (): FormField[] => {
  //   return formSections.flatMap(section => section.fields);
  // };

  // Handle form submission
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = formData => {
    console.log('Form submitted:', formData);
    alert('Form submitted successfully! Check console for details.');
  };

  // Add a new field to the active section
  const addField = (templateType, category) => {
    const template = fieldTemplates[category].find(t => t.type === templateType)?.template;
    if (!template) return;

    // Create a new field with unique name
    const timestamp = Date.now();
    const newField = {
      ...template,
      name: `${template.name}${timestamp}`
    };

    // Add the field to the active section
    const updatedSections = formSections.map(section => {
      if (section.id === activeSectionId) {
        return {
          ...section,
          fields: [...section.fields, newField]
        };
      }
      return section;
    });

    setFormSections(updatedSections);
  };

  // Remove a field from a section
  const removeField = (sectionId, fieldIndex) => {
    const updatedSections = formSections.map(section => {
      if (section.id === sectionId) {
        const updatedFields = [...section.fields];
        updatedFields.splice(fieldIndex, 1);
        return {
          ...section,
          fields: updatedFields
        };
      }
      return section;
    });

    setFormSections(updatedSections);
  };

  // Update a field in a section
  const updateField = (sectionId, fieldIndex, updatedField) => {
    const updatedSections = formSections.map(section => {
      if (section.id === sectionId) {
        const updatedFields = [...section.fields];
        updatedFields[fieldIndex] = updatedField;
        return {
          ...section,
          fields: updatedFields
        };
      }
      return section;
    });

    setFormSections(updatedSections);
  };

  // Add a new section
  const addSection = () => {
    const newSectionId = `section${formSections.length + 1}`;
    const newSection = {
      id: newSectionId,
      title: `New Section ${formSections.length + 1}`,
      subtitle: 'Section description',
      icon: 'IconFolders',
      collapsible: true,
      fields: []
    };

    setFormSections([...formSections, newSection]);
    setActiveSectionId(newSectionId);
  };

  // Remove a section
  const removeSection = sectionId => {
    if (formSections.length <= 1) {
      alert('You cannot remove the last section');
      return;
    }

    const updatedSections = formSections.filter(section => section.id !== sectionId);
    setFormSections(updatedSections);

    // Update active section if the removed section was active
    if (activeSectionId === sectionId) {
      setActiveSectionId(updatedSections[0]?.id);
    }
  };

  // Update a section
  const updateSection = (sectionId, updatedSection) => {
    const updatedSections = formSections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          ...updatedSection
        };
      }
      return section;
    });

    setFormSections(updatedSections);
  };

  // Generate code for the form
  const generateFormCode = () => {
    return `import { Form, Section } from '@ncobase/react';
import { useForm } from 'react-hook-form';

const MyForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
  };

  const sections = ${JSON.stringify(formSections, null, 2)};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {sections.map(section => (
        <Section
          key={section.id}
          title={section.title}
          subtitle={section.subtitle}
          icon={section.icon}
          collapsible={section.collapsible}
          className="mb-6"
        >
          <Form
            control={control}
            errors={errors}
            fields={section.fields}
            layout="${formLayout}"
          />
        </Section>
      ))}
      <div className="mt-6 flex justify-end">
        <button type="button" className="mr-4 px-4 py-2 border border-slate-300 rounded-sm">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-sm">Submit</button>
      </div>
    </form>
  );
};

export default MyForm;`;
  };

  // Reorder fields within a section
  const moveField = (sectionId, sourceIndex, destinationIndex) => {
    if (sourceIndex === destinationIndex) return;

    const updatedSections = formSections.map(section => {
      if (section.id === sectionId) {
        const updatedFields = [...section.fields];
        const [movedField] = updatedFields.splice(sourceIndex, 1);
        updatedFields.splice(destinationIndex, 0, movedField);

        return {
          ...section,
          fields: updatedFields
        };
      }
      return section;
    });

    setFormSections(updatedSections);
  };

  // Move field between sections
  const moveFieldToSection = (fromSectionId, fieldIndex, toSectionId) => {
    if (fromSectionId === toSectionId) return;

    const fromSection = formSections.find(section => section.id === fromSectionId);
    if (!fromSection) return;

    const fieldToMove = fromSection.fields[fieldIndex];
    if (!fieldToMove) return;

    const updatedSections = formSections.map(section => {
      if (section.id === fromSectionId) {
        const updatedFields = [...section.fields];
        updatedFields.splice(fieldIndex, 1);
        return {
          ...section,
          fields: updatedFields
        };
      }
      if (section.id === toSectionId) {
        return {
          ...section,
          fields: [...section.fields, fieldToMove]
        };
      }
      return section;
    });

    setFormSections(updatedSections);
  };

  // Duplicate a field within a section
  const duplicateField = (sectionId, fieldIndex) => {
    const section = formSections.find(section => section.id === sectionId);
    if (!section) return;

    const fieldToDuplicate = section.fields[fieldIndex];
    if (!fieldToDuplicate) return;

    const duplicatedField = {
      ...fieldToDuplicate,
      name: `${fieldToDuplicate.name}_copy`,
      title: `${fieldToDuplicate.title} (Copy)`
    };

    const updatedSections = formSections.map(section => {
      if (section.id === sectionId) {
        const updatedFields = [...section.fields];
        updatedFields.splice(fieldIndex + 1, 0, duplicatedField);
        return {
          ...section,
          fields: updatedFields
        };
      }
      return section;
    });

    setFormSections(updatedSections);
  };

  // Handle drag end from @hello-pangea/dnd
  const handleDragEnd = result => {
    const { destination, source, type } = result;

    // If there's no destination (dropped outside droppable), do nothing
    if (!destination) return;

    // If dropped in the same position, do nothing
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // Handle section reordering
    if (type === 'section') {
      const reorderedSections = [...formSections];
      const [removed] = reorderedSections.splice(source.index, 1);
      reorderedSections.splice(destination.index, 0, removed);
      setFormSections(reorderedSections);
      return;
    }

    // Handle field reordering within the same section
    if (source.droppableId === destination.droppableId) {
      moveField(source.droppableId, source.index, destination.index);
      return;
    }

    // Handle field moving between sections
    moveFieldToSection(source.droppableId, source.index, destination.droppableId);
  };

  // Theme setup
  const getThemeClasses = () => {
    return formTheme === 'dark' ? 'bg-slate-900 text-slate-200' : 'bg-white text-slate-800';
  };

  // Field picker component
  const FieldPicker = ({ category, title }) => (
    <div className='mb-6'>
      <h3 className='font-medium text-lg mb-2'>{title}</h3>
      <div className='grid grid-cols-3 gap-2'>
        {fieldTemplates[category].map(template => (
          <Button
            key={template.type}
            variant='outline-slate'
            className='flex items-center justify-start p-2 h-auto'
            onClick={() => addField(template.type, category)}
          >
            <Icons name={template.icon} className='mr-2 shrink-0' />
            <span className='truncate text-left'>{template.title}</span>
          </Button>
        ))}
      </div>
    </div>
  );

  // Draggable Field component
  const DraggableField = ({ sectionId, field, index }) => {
    return (
      <Draggable draggableId={`${sectionId}-field-${index}`} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className={`p-4 border border-slate-200 rounded-md ${formTheme === 'dark' ? 'bg-slate-800' : 'bg-white'} mb-4 ${snapshot.isDragging ? 'shadow-lg' : ''}`}
          >
            <div className='flex justify-between items-center mb-4'>
              <div className='flex items-center'>
                <div {...provided.dragHandleProps} className='mr-2 cursor-move'>
                  <Icons name='IconGripVertical' className='text-slate-400' />
                </div>
                <Icons name={field.prependIcon || 'IconForms'} className='mr-2' />
                <h3 className='font-medium'>
                  {field.title || 'Field'}{' '}
                  <span className='text-slate-400 text-sm'>({field.type})</span>
                </h3>
              </div>
              <div className='flex gap-2'>
                <Button
                  size='sm'
                  variant='outline-slate'
                  onClick={() => duplicateField(sectionId, index)}
                  title='Duplicate field'
                >
                  <Icons name='IconCopy' />
                </Button>
                <Button
                  size='sm'
                  variant='outline-primary'
                  onClick={() => setEditingField({ sectionId, fieldIndex: index, field })}
                  title='Edit field'
                >
                  <Icons name='IconPencil' />
                </Button>
                <Button
                  size='sm'
                  variant='outline-danger'
                  onClick={() => removeField(sectionId, index)}
                  title='Remove field'
                >
                  <Icons name='IconTrash' />
                </Button>
              </div>
            </div>

            <div className='mb-2 border-b border-slate-100 pb-2'>
              <FieldRender
                {...field}
                onChange={() => {}} // Placeholder onChange
              />
            </div>
          </div>
        )}
      </Draggable>
    );
  };

  // Draggable Section component
  const DraggableSection = ({ section, index }) => {
    return (
      <Draggable draggableId={`section-${section.id}`} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className={`mb-6 ${snapshot.isDragging ? 'opacity-60' : ''}`}
          >
            <div
              className={`p-4 border ${formTheme === 'dark' ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'} rounded-md mb-2`}
            >
              <div className='flex justify-between items-center'>
                <div className='flex items-center'>
                  <div {...provided.dragHandleProps} className='mr-2 cursor-move'>
                    <Icons name='IconGripVertical' className='text-slate-400' />
                  </div>
                  <Icons name={section.icon || 'IconFolders'} className='mr-2' />
                  <div>
                    <h3 className='font-medium'>{section.title}</h3>
                    <p className='text-sm text-slate-500'>{section.subtitle}</p>
                  </div>
                </div>
                <div className='flex gap-2'>
                  <Button
                    size='sm'
                    variant={section.id === activeSectionId ? 'primary' : 'outline-slate'}
                    onClick={() => setActiveSectionId(section.id)}
                  >
                    {section.id === activeSectionId ? 'Active' : 'Edit Section'}
                  </Button>
                  <Button
                    size='sm'
                    variant='outline-danger'
                    onClick={() => removeSection(section.id)}
                    title='Remove section'
                    disabled={formSections.length <= 1}
                  >
                    <Icons name='IconTrash' />
                  </Button>
                </div>
              </div>
            </div>

            <Droppable droppableId={section.id} type='field'>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`p-4 min-h-[100px] border ${formTheme === 'dark' ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'} rounded-md ${snapshot.isDraggingOver ? (formTheme === 'dark' ? 'bg-slate-800' : 'bg-slate-100') : ''}`}
                >
                  {section.fields.length === 0 ? (
                    <div className='p-8 border border-dashed border-slate-300 rounded-md text-center'>
                      <Icons name='IconForms' className='mx-auto mb-2 text-slate-400' size={32} />
                      <p className='text-slate-500'>
                        Drag fields here or add new fields from the left panel
                      </p>
                    </div>
                  ) : (
                    section.fields.map((field, fieldIndex) => (
                      <DraggableField
                        key={`${field.name}-${fieldIndex}`}
                        sectionId={section.id}
                        field={field}
                        index={fieldIndex}
                      />
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    );
  };

  // Field editor modal component
  const FieldEditorModal = () => {
    if (!editingField) return null;

    const { sectionId, fieldIndex, field } = editingField;
    const [fieldData, setFieldData] = useState({ ...field });

    const handleChange = (prop, value) => {
      setFieldData({
        ...fieldData,
        [prop]: value
      });
    };

    const applyChanges = () => {
      updateField(sectionId, fieldIndex, fieldData);
      setEditingField(null);
    };

    const closeModal = () => {
      setEditingField(null);
    };

    return (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
        <div
          className={`w-3/4 max-w-3xl max-h-[80vh] overflow-auto rounded-lg shadow-xl ${formTheme === 'dark' ? 'bg-slate-800' : 'bg-white'}`}
        >
          <div
            className={`flex justify-between items-center p-4 border-b ${formTheme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}
          >
            <h2 className='text-xl font-semibold'>Edit Field: {fieldData.title}</h2>
            <Button variant='unstyle' onClick={closeModal}>
              <Icons name='IconX' />
            </Button>
          </div>

          <div className='p-6 overflow-auto'>
            <div className='grid grid-cols-2 gap-4 mb-4'>
              <div className='flex flex-col gap-y-1'>
                <Label>Field Title</Label>
                <Input
                  type='text'
                  value={fieldData.title || ''}
                  onChange={e => handleChange('title', e.target.value)}
                />
              </div>
              <div className='flex flex-col gap-y-1'>
                <Label>Field Name</Label>
                <Input
                  type='text'
                  value={fieldData.name || ''}
                  onChange={e => handleChange('name', e.target.value)}
                />
              </div>

              {fieldData.type !== 'hidden' && (
                <div className='flex flex-col gap-y-1'>
                  <Label>Required</Label>
                  <Select
                    value={fieldData.rules?.required ? 'yes' : 'no'}
                    onValueChange={value => {
                      if (value === 'yes') {
                        handleChange('rules', {
                          ...fieldData.rules,
                          required: `Please enter ${fieldData.title}`
                        });
                      } else {
                        const updatedRules = { ...fieldData.rules };
                        delete updatedRules.required;
                        handleChange('rules', updatedRules);
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='yes'>Yes</SelectItem>
                      <SelectItem value='no'>No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {(fieldData.type === 'text' ||
                fieldData.type === 'email' ||
                fieldData.type === 'password' ||
                fieldData.type === 'number' ||
                fieldData.type === 'textarea') && (
                <div className='flex flex-col gap-y-1'>
                  <Label>Placeholder</Label>
                  <Input
                    type='text'
                    value={fieldData.placeholder || ''}
                    onChange={e => handleChange('placeholder', e.target.value)}
                  />
                </div>
              )}

              {(fieldData.type === 'text' ||
                fieldData.type === 'email' ||
                fieldData.type === 'password' ||
                fieldData.type === 'number') && (
                <div className='flex flex-col gap-y-1'>
                  <Label>Prepend Icon</Label>
                  <Select
                    value={fieldData.prependIcon || ''}
                    onValueChange={value => handleChange('prependIcon', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select Icon' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='none'>None</SelectItem>
                      <SelectItem value='IconUser'>User</SelectItem>
                      <SelectItem value='IconMail'>Mail</SelectItem>
                      <SelectItem value='IconLock'>Lock</SelectItem>
                      <SelectItem value='IconPhone'>Phone</SelectItem>
                      <SelectItem value='IconCalendar'>Calendar</SelectItem>
                      <SelectItem value='IconHash'>Hash</SelectItem>
                      <SelectItem value='IconSearch'>Search</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {['select', 'multi-select', 'radio', 'checkbox'].includes(fieldData.type) && (
                <div className='col-span-2 flex flex-col gap-y-1'>
                  <Label>Options</Label>
                  <div
                    className={`border rounded-md p-3 ${formTheme === 'dark' ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-slate-50'}`}
                  >
                    {fieldData.options?.map((option, optIndex) => (
                      <div key={optIndex} className='flex items-center gap-2 mb-2'>
                        <Input
                          type='text'
                          value={option.label}
                          onChange={e => {
                            const updatedOptions = [...fieldData.options];
                            updatedOptions[optIndex] = {
                              ...updatedOptions[optIndex],
                              label: e.target.value
                            };
                            handleChange('options', updatedOptions);
                          }}
                          placeholder='Label'
                          className='flex-1'
                        />
                        <Input
                          type='text'
                          value={option.value}
                          onChange={e => {
                            const updatedOptions = [...fieldData.options];
                            updatedOptions[optIndex] = {
                              ...updatedOptions[optIndex],
                              value: e.target.value
                            };
                            handleChange('options', updatedOptions);
                          }}
                          placeholder='Value'
                          className='flex-1'
                        />
                        <Button
                          variant='outline-danger'
                          size='sm'
                          onClick={() => {
                            const updatedOptions = [...fieldData.options];
                            updatedOptions.splice(optIndex, 1);
                            handleChange('options', updatedOptions);
                          }}
                        >
                          <Icons name='IconTrash' />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant='outline-slate'
                      size='sm'
                      onClick={() => {
                        const options = fieldData.options || [];
                        handleChange('options', [
                          ...options,
                          { label: 'New Option', value: `option${options.length + 1}` }
                        ]);
                      }}
                    >
                      <Icons name='IconPlus' className='mr-2' />
                      Add Option
                    </Button>
                  </div>
                </div>
              )}

              {fieldData.type === 'tree-select' && (
                <div className='col-span-2 flex flex-col gap-y-1'>
                  <Label>Multiple Selection</Label>
                  <Select
                    value={fieldData.multiple ? 'yes' : 'no'}
                    onValueChange={value => handleChange('multiple', value === 'yes')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='yes'>Yes</SelectItem>
                      <SelectItem value='no'>No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {fieldData.type === 'uploader' && (
                <>
                  <div className='flex flex-col gap-y-1'>
                    <Label>Max Files</Label>
                    <Input
                      type='number'
                      value={fieldData.maxFiles || 1}
                      onChange={e => handleChange('maxFiles', parseInt(e.target.value))}
                      min='1'
                    />
                  </div>
                  <div className='flex flex-col gap-y-1'>
                    <Label>Max Size (bytes)</Label>
                    <Input
                      type='number'
                      value={fieldData.maxSize || 1048576}
                      onChange={e => handleChange('maxSize', parseInt(e.target.value))}
                      min='1024'
                    />
                  </div>
                </>
              )}

              {fieldData.type === 'color' && (
                <div className='col-span-2'>
                  <Label>Default Color</Label>
                  <div className='mt-2'>
                    <ColorPickerComponent
                      value={fieldData.defaultValue || '#000000'}
                      onChange={color => handleChange('defaultValue', color)}
                      presetColors={
                        fieldData.presetColors || [
                          '#ff0000',
                          '#ff8000',
                          '#ffff00',
                          '#80ff00',
                          '#00ff00',
                          '#00ff80',
                          '#00ffff',
                          '#0080ff',
                          '#0000ff',
                          '#8000ff',
                          '#ff00ff',
                          '#ff0080',
                          '#ffffff',
                          '#c0c0c0',
                          '#808080',
                          '#404040',
                          '#000000'
                        ]
                      }
                    />
                  </div>
                </div>
              )}

              {fieldData.type === 'icon' && (
                <div className='col-span-2'>
                  <Label>Default Icon</Label>
                  <div className='mt-2'>
                    <IconPickerComponent
                      value={fieldData.defaultValue || ''}
                      onChange={icon => handleChange('defaultValue', icon)}
                    />
                  </div>
                </div>
              )}

              <div className='col-span-2 mt-2'>
                <Label>Column Width</Label>
                <Select
                  value={fieldData.className?.includes('col-span-full') ? 'full' : 'half'}
                  onValueChange={value => {
                    if (value === 'full') {
                      handleChange(
                        'className',
                        `col-span-full ${fieldData.className?.replace('col-span-full', '').trim() || ''}`
                      );
                    } else {
                      handleChange(
                        'className',
                        (fieldData.className || '').replace('col-span-full', '').trim()
                      );
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select width' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='half'>Half width (default)</SelectItem>
                    <SelectItem value='full'>Full width</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div
            className={`flex justify-end p-4 border-t ${formTheme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}
          >
            <Button variant='outline-slate' onClick={closeModal} className='mr-2'>
              Cancel
            </Button>
            <Button variant='primary' onClick={applyChanges}>
              <Icons name='IconDeviceFloppy' className='mr-2' />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    );
  };

  // Section editor component
  const SectionEditor = () => {
    if (!activeSection) return null;

    const [sectionData, setSectionData] = useState({ ...activeSection });

    const handleChange = (prop, value) => {
      setSectionData({
        ...sectionData,
        [prop]: value
      });
    };

    const applyChanges = () => {
      updateSection(activeSection.id, sectionData);
    };

    return (
      <div
        className={`p-4 border ${formTheme === 'dark' ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'} rounded-md mb-4`}
      >
        <div className='flex justify-between items-center mb-4'>
          <div className='flex items-center'>
            <Icons name={sectionData.icon || 'IconFolders'} className='mr-2' />
            <h3 className='font-medium'>{sectionData.title || 'Section'}</h3>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4 mb-4'>
          <div className='flex flex-col gap-y-1'>
            <Label>Section Title</Label>
            <Input
              type='text'
              value={sectionData.title || ''}
              onChange={e => handleChange('title', e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-y-1'>
            <Label>Section Subtitle</Label>
            <Input
              type='text'
              value={sectionData.subtitle || ''}
              onChange={e => handleChange('subtitle', e.target.value)}
            />
          </div>

          <div className='flex flex-col gap-y-1'>
            <Label>Icon</Label>
            <Select
              value={sectionData.icon || ''}
              onValueChange={value => handleChange('icon', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select Icon' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='IconFolders'>Folders</SelectItem>
                <SelectItem value='IconUser'>User</SelectItem>
                <SelectItem value='IconSettings'>Settings</SelectItem>
                <SelectItem value='IconClipboard'>Clipboard</SelectItem>
                <SelectItem value='IconBuilding'>Building</SelectItem>
                <SelectItem value='IconFileText'>Document</SelectItem>
                <SelectItem value='IconBriefcase'>Briefcase</SelectItem>
                <SelectItem value='IconBook'>Book</SelectItem>
                <SelectItem value='IconChartBar'>Chart</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='flex flex-col gap-y-1'>
            <Label>Collapsible</Label>
            <Select
              value={sectionData.collapsible ? 'yes' : 'no'}
              onValueChange={value => handleChange('collapsible', value === 'yes')}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='yes'>Yes</SelectItem>
                <SelectItem value='no'>No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='col-span-2 flex justify-end mt-4'>
            <Button variant='primary' onClick={applyChanges}>
              <Icons name='IconDeviceFloppy' className='mr-2' />
              Apply Changes
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`transition-colors duration-200 ${getThemeClasses()} ${className}`}>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-semibold'>Form Builder</h1>
        <div className='flex items-center gap-4'>
          <Select value={formLayout} onValueChange={setFormLayout}>
            <SelectTrigger className='w-40'>
              <SelectValue placeholder='Select Layout' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='default'>Default Grid</SelectItem>
              <SelectItem value='single'>Single Column</SelectItem>
              <SelectItem value='inline'>Inline Layout</SelectItem>
              <SelectItem value='custom'>Custom Layout</SelectItem>
            </SelectContent>
          </Select>

          <Select value={formTheme} onValueChange={setFormTheme}>
            <SelectTrigger className='w-40'>
              <SelectValue placeholder='Select Theme' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='light'>Light Theme</SelectItem>
              <SelectItem value='dark'>Dark Theme</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant='outline-slate'
            className='py-2.5'
            onClick={() => setActiveTab('preview')}
          >
            <Icons name='IconEye' className='mr-2' />
            Preview
          </Button>
          <Button variant='outline-slate' className='py-2.5' onClick={() => setActiveTab('edit')}>
            <Icons name='IconSettings' className='mr-2' />
            Configure
          </Button>
          <Button className='py-2.5' onClick={handleSubmit(onSubmit)}>
            <Icons name='IconDeviceFloppy' className='mr-2' />
            Save Form
          </Button>
        </div>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className='mb-4 flex w-full justify-start'>
          <TabsTrigger
            value='preview'
            className='data-[state=active]:border-primary-500 data-[state=active]:text-primary-500'
          >
            Form Preview
          </TabsTrigger>
          <TabsTrigger
            value='edit'
            className='data-[state=active]:border-blue-500 data-[state=active]:text-blue-500'
          >
            Form Builder
          </TabsTrigger>
          <TabsTrigger
            value='code'
            className='data-[state=active]:border-purple-500 data-[state=active]:text-purple-500'
          >
            Generated Code
          </TabsTrigger>
        </TabsList>

        <TabsContent value='preview'>
          <Card className={formTheme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}>
            <CardHeader
              className={`p-4 border-b ${formTheme === 'dark' ? 'border-slate-700' : 'border-slate-100'}`}
            >
              <CardTitle className='text-lg font-normal'>Form Preview</CardTitle>
            </CardHeader>
            <CardContent className='p-6'>
              {formSections.map(section => (
                <Section
                  key={section.id}
                  title={section.title}
                  subtitle={section.subtitle}
                  icon={section.icon}
                  collapsible={section.collapsible}
                  className={`mb-6 ${formTheme === 'dark' ? 'border-slate-700 bg-slate-800' : ''}`}
                  titleClassName={formTheme === 'dark' ? 'text-slate-200' : ''}
                  subtitleClassName={formTheme === 'dark' ? 'text-slate-400' : ''}
                  contentClassName={formTheme === 'dark' ? 'bg-slate-900' : ''}
                >
                  <Form
                    onSubmit={handleSubmit(onSubmit)}
                    control={control}
                    errors={errors}
                    fields={section.fields}
                    layout={formLayout as FormLayout}
                  />
                </Section>
              ))}
              <div className='mt-6 flex justify-end'>
                <Button type='button' variant='outline-slate' className='mr-4'>
                  Cancel
                </Button>
                <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='edit'>
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className='grid grid-cols-4 gap-4'>
              <div className='col-span-1'>
                <Card className={formTheme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}>
                  <CardHeader
                    className={`p-4 border-b ${formTheme === 'dark' ? 'border-slate-700' : 'border-slate-100'}`}
                  >
                    <CardTitle className='text-lg font-normal'>Field Templates</CardTitle>
                  </CardHeader>
                  <CardContent className='p-4'>
                    <ScrollView className='max-h-[calc(100vh-300px)]'>
                      <FieldPicker category='basic' title='Basic Fields' />
                      <FieldPicker category='selection' title='Selection Fields' />
                      <FieldPicker category='advanced' title='Advanced Fields' />

                      <div className='mt-8'>
                        <h3 className='font-medium text-lg mb-2'>Sections</h3>
                        <div className='flex flex-col gap-2'>
                          {formSections.map(section => (
                            <Button
                              key={section.id}
                              variant={section.id === activeSectionId ? 'primary' : 'outline-slate'}
                              className='justify-start'
                              onClick={() => setActiveSectionId(section.id)}
                            >
                              <Icons name={section.icon || 'IconFolders'} className='mr-2' />
                              {section.title}
                            </Button>
                          ))}
                          <Button variant='outline-slate' onClick={addSection}>
                            <Icons name='IconPlus' className='mr-2' />
                            Add Section
                          </Button>
                        </div>
                      </div>
                    </ScrollView>
                  </CardContent>
                </Card>
              </div>

              <div className='col-span-3'>
                <Card className={formTheme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}>
                  <CardHeader
                    className={`p-4 border-b ${formTheme === 'dark' ? 'border-slate-700' : 'border-slate-100'}`}
                  >
                    <CardTitle className='text-lg font-normal'>Section Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className='p-4'>
                    <ScrollView className='max-h-[calc(100vh-300px)]'>
                      <SectionEditor />

                      <div className='mt-6'>
                        <h3 className='font-medium text-lg mb-4'>Form Layout</h3>
                        <Droppable droppableId='sections' type='section'>
                          {provided => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className='space-y-4'
                            >
                              {formSections.map((section, index) => (
                                <DraggableSection
                                  key={section.id}
                                  section={section}
                                  index={index}
                                />
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </div>
                    </ScrollView>
                  </CardContent>
                </Card>
              </div>
            </div>
          </DragDropContext>
        </TabsContent>

        <TabsContent value='code'>
          <Card className={formTheme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}>
            <CardHeader
              className={`p-4 border-b ${formTheme === 'dark' ? 'border-slate-700' : 'border-slate-100'}`}
            >
              <CardTitle className='text-lg font-normal'>Generated Form Code</CardTitle>
            </CardHeader>
            <CardContent className='p-6'>
              <pre
                className={`p-4 rounded-md overflow-auto max-h-[calc(100vh-300px)] ${formTheme === 'dark' ? 'bg-slate-900 text-slate-300' : 'bg-slate-900 text-slate-50'}`}
              >
                {generateFormCode()}
              </pre>

              <div className='mt-4 flex justify-end'>
                <Button
                  variant='outline-primary'
                  onClick={() => {
                    navigator.clipboard.writeText(generateFormCode());
                    alert('Code copied to clipboard!');
                  }}
                >
                  <Icons name='IconCopy' className='mr-2' />
                  Copy Code
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {/* Render the field editor modal */}
      {editingField && <FieldEditorModal />}
    </div>
  );
};
