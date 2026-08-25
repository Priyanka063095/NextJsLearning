import { defineArrayMember, defineField } from "sanity";
import { authorType } from "./authorType";

const TEMPLATE_OPTIONS = [
    { title: 'Standard Article', value: 'standard' },
    { title: 'Case Study', value: 'case-study' },
    { title: 'Product Announcement', value: 'announcement' },
    { title: 'Guide / Listicle', value: 'guide' },
];

export const post = {
    name: "blog",
    type: 'document',
    title: 'Blog',
    groups: [
        { name: 'content', title: 'Content', default: true },
        { name: 'caseStudy', title: 'Case Study' },
        { name: 'announcement', title: 'Announcement' },
    ],
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            group: 'content',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            group: 'content',
            options: {
                source: 'title',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'template',
            type: 'string',
            title: 'Template',
            description: 'Choose how this post should be displayed on the site.',
            group: 'content',
            options: {
                list: TEMPLATE_OPTIONS,
                layout: 'radio',
            },
            initialValue: 'standard',
            validation: (Rule) => Rule.required(),
        }),
         defineField({
            name: 'summary',
            type: 'string',
            title:'Summary',
            group: 'content',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'image',
            type: 'image',
            title:'Image',
            group: 'content',
            options: { hotspot: true },
        }),
        defineField({
            name: 'content',
            type: 'blockContent',
            title:'Content',
            group: 'content',
        }),
        defineField({
            name: 'author',
            type: 'reference',
            title: 'Author',
            group: 'content',
            to: [{
                type: authorType.name
            }]
        }),
        defineField({
            name: 'category',
            type: 'reference',
            title: 'Category',
            group: 'content',
            to: [{ type: 'category' }],
        }),
        defineField({
            name: 'tags',
            type: 'array',
            title: 'Tags',
            group: 'content',
            of: [defineArrayMember({ type: 'string' })],
            options: { layout: 'tags' },
        }),
        defineField({
            name: 'publishedAt',
            type: 'datetime',
            title: 'Published At',
            group: 'content',
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: 'featured',
            type: 'boolean',
            title: 'Featured',
            description: 'Pin this post at the top of the blog listing.',
            group: 'content',
            initialValue: false,
        }),

        // --- Case Study template fields ---
        defineField({
            name: 'clientName',
            type: 'string',
            title: 'Client Name',
            group: 'caseStudy',
            hidden: ({ document }) => document?.template !== 'case-study',
        }),
        defineField({
            name: 'stats',
            type: 'array',
            title: 'Highlighted Stats',
            group: 'caseStudy',
            hidden: ({ document }) => document?.template !== 'case-study',
            of: [
                defineArrayMember({
                    type: 'object',
                    name: 'stat',
                    fields: [
                        defineField({ name: 'value', type: 'string', title: 'Value' }),
                        defineField({ name: 'label', type: 'string', title: 'Label' }),
                    ],
                    preview: {
                        select: { title: 'value', subtitle: 'label' },
                    },
                }),
            ],
        }),
        defineField({
            name: 'quote',
            type: 'text',
            title: 'Pull Quote',
            group: 'caseStudy',
            hidden: ({ document }) => document?.template !== 'case-study',
        }),
        defineField({
            name: 'quoteAuthor',
            type: 'string',
            title: 'Quote Author',
            description: 'e.g. "Name, Title — Company"',
            group: 'caseStudy',
            hidden: ({ document }) => document?.template !== 'case-study',
        }),

        // --- Announcement template fields ---
        defineField({
            name: 'ctaLabel',
            type: 'string',
            title: 'CTA Label',
            group: 'announcement',
            hidden: ({ document }) => document?.template !== 'announcement',
        }),
        defineField({
            name: 'ctaHref',
            type: 'string',
            title: 'CTA Link',
            group: 'announcement',
            hidden: ({ document }) => document?.template !== 'announcement',
        }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'template', media: 'image' },
  },
}
