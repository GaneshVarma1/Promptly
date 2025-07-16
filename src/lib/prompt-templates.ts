// Static prompt templates for PromptGalleryTab
export type PromptTemplate = {
  id: string;
  name: string;
  description: string;
  domain: string;
  complexity: string;
  template: string;
  metadata: {
    tags: string[];
    updated_at: string;
  };
};

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: '1',
    name: 'Blog Post Idea Generator',
    description: 'Generate creative blog post ideas for any topic.',
    domain: 'creative',
    complexity: 'beginner',
    template: 'Suggest 5 blog post ideas about {{topic}}.',
    metadata: {
      tags: ['blog', 'ideas', 'content'],
      updated_at: '2024-06-01',
    },
  },
  {
    id: '2',
    name: 'Email Responder',
    description: 'Draft a polite and professional response to an email.',
    domain: 'business',
    complexity: 'intermediate',
    template: 'Write a professional reply to the following email: {{email}}',
    metadata: {
      tags: ['email', 'business', 'reply'],
      updated_at: '2024-06-02',
    },
  },
  {
    id: '3',
    name: 'Meeting Summary Generator',
    description: 'Summarize the key points and action items from a meeting transcript.',
    domain: 'business',
    complexity: 'intermediate',
    template: 'Summarize the following meeting transcript, highlighting key points and action items: {{transcript}}',
    metadata: {
      tags: ['meeting', 'summary', 'business'],
      updated_at: '2024-06-03',
    },
  },
  {
    id: '4',
    name: 'Job Description Writer',
    description: 'Create a detailed job description for a given role.',
    domain: 'hr',
    complexity: 'expert',
    template: 'Write a comprehensive job description for the following role: {{role}}',
    metadata: {
      tags: ['job', 'hr', 'description'],
      updated_at: '2024-06-04',
    },
  },
  {
    id: '5',
    name: 'Technical Documentation Generator',
    description: 'Generate clear technical documentation for a software feature.',
    domain: 'technical',
    complexity: 'expert',
    template: 'Write technical documentation for the following feature: {{feature}}',
    metadata: {
      tags: ['documentation', 'technical', 'software'],
      updated_at: '2024-06-05',
    },
  },
  {
    id: '6',
    name: 'Sales Email Draft',
    description: 'Draft a persuasive sales email for a product or service.',
    domain: 'sales',
    complexity: 'intermediate',
    template: 'Write a persuasive sales email for the following product or service: {{product}}',
    metadata: {
      tags: ['sales', 'email', 'business'],
      updated_at: '2024-06-06',
    },
  },
  {
    id: '7',
    name: 'Project Status Update',
    description: 'Generate a concise project status update for stakeholders.',
    domain: 'project management',
    complexity: 'beginner',
    template: 'Write a project status update for the following project: {{project}}',
    metadata: {
      tags: ['project', 'status', 'update'],
      updated_at: '2024-06-07',
    },
  },
  {
    id: '8',
    name: 'Customer Support Response',
    description: 'Draft a helpful and empathetic response to a customer inquiry.',
    domain: 'support',
    complexity: 'intermediate',
    template: 'Write a customer support response to the following inquiry: {{inquiry}}',
    metadata: {
      tags: ['support', 'customer', 'response'],
      updated_at: '2024-06-08',
    },
  },
  {
    id: '9',
    name: 'Product Description Writer',
    description: 'Create a compelling product description for e-commerce.',
    domain: 'marketing',
    complexity: 'expert',
    template: 'Write a product description for: {{product_details}}',
    metadata: {
      tags: ['product', 'marketing', 'ecommerce'],
      updated_at: '2024-06-09',
    },
  },
  {
    id: '10',
    name: 'Performance Review Summary',
    description: 'Summarize an employee performance review with strengths and areas for improvement.',
    domain: 'hr',
    complexity: 'intermediate',
    template: 'Summarize the following performance review, highlighting strengths and areas for improvement: {{review}}',
    metadata: {
      tags: ['performance', 'review', 'hr'],
      updated_at: '2024-06-10',
    },
  },
]; 