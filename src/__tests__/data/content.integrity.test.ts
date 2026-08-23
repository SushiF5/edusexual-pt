import { topics } from "@/data/content-topics";
import { quizQuestions } from "@/data/content-quiz";
import { frequentlyAskedQuestions } from "@/data/content-faq";
import { guides } from "@/data/content-guides";

describe("Content Integrity", () => {
  describe("Topics", () => {
    it("all topic IDs are unique", () => {
      const ids = topics.map((t) => t.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    it("all article IDs within each topic are unique", () => {
      topics.forEach((topic) => {
        const articleIds = topic.articles.map((a) => a.id);
        const uniqueIds = new Set(articleIds);
        expect(articleIds.length).toBe(uniqueIds.size);
      });
    });

    it("all topics have required fields", () => {
      topics.forEach((topic) => {
        expect(topic.id).toBeTruthy();
        expect(topic.title).toBeTruthy();
        expect(topic.description).toBeTruthy();
        expect(topic.icon).toBeTruthy();
        expect(topic.audience).toBeTruthy();
        expect(topic.articles.length).toBeGreaterThan(0);
      });
    });

    it("all articles have required fields", () => {
      topics.forEach((topic) => {
        topic.articles.forEach((article) => {
          expect(article.id).toBeTruthy();
          expect(article.title).toBeTruthy();
          expect(article.content).toBeTruthy();
          expect(article.category).toBeTruthy();
        });
      });
    });
  });

  describe("Quiz Questions", () => {
    it("all correctAnswer indices are within options bounds", () => {
      quizQuestions.forEach((q) => {
        expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
        expect(q.correctAnswer).toBeLessThan(q.options.length);
      });
    });

    it("all questions have required fields", () => {
      quizQuestions.forEach((q) => {
        expect(q.id).toBeTruthy();
        expect(q.question).toBeTruthy();
        expect(q.options.length).toBeGreaterThan(0);
        expect(q.explanation).toBeTruthy();
        expect(q.topic).toBeTruthy();
        expect(q.audience).toBeTruthy();
      });
    });

    it("all questions have at least 2 options", () => {
      quizQuestions.forEach((q) => {
        expect(q.options.length).toBeGreaterThanOrEqual(2);
      });
    });

    it("all quiz IDs are unique", () => {
      const ids = quizQuestions.map((q) => q.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });
  });

  describe("FAQ Entries", () => {
    it("all FAQ entries have required fields", () => {
      frequentlyAskedQuestions.forEach((faq) => {
        expect(faq.id).toBeTruthy();
        expect(faq.question).toBeTruthy();
        expect(faq.answer).toBeTruthy();
        expect(faq.audience.length).toBeGreaterThan(0);
      });
    });

    it("all FAQ IDs are unique", () => {
      const ids = frequentlyAskedQuestions.map((f) => f.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });
  });

  describe("Guides", () => {
    it("all guide IDs are unique", () => {
      const ids = guides.map((g) => g.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    it("all guides have required fields", () => {
      guides.forEach((guide) => {
        expect(guide.id).toBeTruthy();
        expect(guide.title).toBeTruthy();
        expect(guide.description).toBeTruthy();
        expect(guide.icon).toBeTruthy();
        expect(guide.audience).toBeTruthy();
        expect(guide.sections.length).toBeGreaterThan(0);
      });
    });

    it("all guide sections have required fields", () => {
      guides.forEach((guide) => {
        guide.sections.forEach((section) => {
          expect(section.heading).toBeTruthy();
          expect(section.body).toBeTruthy();
        });
      });
    });
  });
});