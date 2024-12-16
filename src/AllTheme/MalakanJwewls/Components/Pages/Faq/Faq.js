import React from 'react';
import './FAQ.scss';

export default function FAQ() {
  const faqs = [
    {
      id: 1,
      question: "What Is Creator Studio?",
      answer: "Creator Studio is a generative AI tool that repurposes any video into 40+ types of content for your end-to-end marketing funnel. It combines the power of AI and editing capabilities to make content generation fast, easy, and affordable. With just a few clicks, you can have enough content to market your course, coaching program, podcast, and community for weeks."
    },
    {
      id: 2,
      question: "What Are The Benefits Of Using Creator Studio?",
      answer: "Creator Studio streamlines your content creation process, saves time, and maximizes your video content's potential. It automatically generates multiple content pieces from a single video, ensuring consistent messaging across all your marketing channels while significantly reducing production time and costs."
    },
    {
      id: 3,
      question: "How Are Top Creators Using AI To Grow Their Audience?",
      answer: "Top creators are leveraging AI to automate their content repurposing, create consistent posting schedules, and reach audiences across multiple platforms. They use Creator Studio to transform long-form content into engaging short-form videos, social media posts, and email marketing materials."
    },
    {
      id: 4,
      question: "What Kinds Of Content Does Creator Studio Generate?",
      answer: "Creator Studio generates a wide variety of content including short-form videos, social media posts, blog articles, email newsletters, and promotional materials. Each piece of content is optimized for its intended platform while maintaining your original message and branding."
    },
    {
      id: 5,
      question: "What Is Content Repurposing?",
      answer: "Content repurposing is the practice of taking existing content and adapting it into different formats to reach new audiences and maximize its value. This could mean turning a webinar into short social media clips, blog posts, or email sequences."
    }
  ];

  return (
    <section className="faq-section">
      <div className="container">
        <h2 className="faq-title">FAQ</h2>
        <div className="faq-list">
          {faqs.map((faq) => (
            <div key={faq.id} className="faq-item">
              <h3 className="faq-question">
                <span className="faq-id">{faq.id}.</span>
                {faq.question}
              </h3>
              <p className="faq-answer">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
