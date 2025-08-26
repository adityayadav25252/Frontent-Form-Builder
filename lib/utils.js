// Utility functions

export const generateId = () => {
  return 'field-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const getInitialFormData = () => {
  return {
    title: 'Untitled Form',
    description: '',
    fields: []
  };
};

export const duplicateForm = (form) => {
  return {
    ...form,
    id: generateId(),
    title: form.title + ' (Copy)',
    createdAt: new Date().toISOString(),
    responses: 0
  };
};