// Sample data for the application

export const sampleForms = [
  {
    id: '1',
    title: 'Customer Feedback Form',
    description: 'Collect feedback from our customers',
    fields: [
      {
        id: 'name',
        type: 'text',
        label: 'Your Name',
        required: true
      },
      {
        id: 'email',
        type: 'email',
        label: 'Email Address',
        required: true
      },
      {
        id: 'rating',
        type: 'radio',
        label: 'How would you rate our service?',
        required: true,
        options: ['Excellent', 'Good', 'Average', 'Poor']
      },
      {
        id: 'comments',
        type: 'textarea',
        label: 'Additional Comments',
        required: false
      }
    ],
    createdAt: '2025-01-15T10:30:00Z',
    responses: 24
  },
  {
    id: '2',
    title: 'Employee Satisfaction Survey',
    description: 'Measure employee satisfaction and engagement',
    fields: [
      {
        id: 'department',
        type: 'dropdown',
        label: 'Department',
        required: true,
        options: ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance']
      },
      {
        id: 'satisfaction',
        type: 'radio',
        label: 'How satisfied are you with your job?',
        required: true,
        options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied']
      },
      {
        id: 'recommend',
        type: 'radio',
        label: 'Would you recommend this company as a great place to work?',
        required: true,
        options: ['Yes', 'No', 'Not sure']
      },
      {
        id: 'suggestions',
        type: 'textarea',
        label: 'Suggestions for improvement',
        required: false
      }
    ],
    createdAt: '2025-01-10T14:45:00Z',
    responses: 42
  }
];

export const fieldTypes = [
  { type: 'text', icon: 'fas fa-font', label: 'Text Input' },
  { type: 'textarea', icon: 'fas fa-paragraph', label: 'Text Area' },
  { type: 'email', icon: 'fas fa-envelope', label: 'Email' },
  { type: 'number', icon: 'fas fa-hashtag', label: 'Number' },
  { type: 'date', icon: 'fas fa-calendar', label: 'Date' },
  { type: 'radio', icon: 'fas fa-dot-circle', label: 'Multiple Choice' },
  { type: 'checkbox', icon: 'fas fa-check-square', label: 'Checkboxes' },
  { type: 'dropdown', icon: 'fas fa-caret-down', label: 'Dropdown' }
];