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
    template: 'Write a professional reply to this email: {{email_body}}',
    metadata: {
      tags: ['email', 'business', 'reply'],
      updated_at: '2024-06-10',
    },
  },
  {
    id: '3',
    name: 'Product Description Writer',
    description: 'Create a compelling product description for e-commerce.',
    domain: 'marketing',
    complexity: 'expert',
    template: 'Write a product description for: {{product_details}}',
    metadata: {
      tags: ['product', 'marketing', 'ecommerce'],
      updated_at: '2024-06-15',
    },
  },
]; 