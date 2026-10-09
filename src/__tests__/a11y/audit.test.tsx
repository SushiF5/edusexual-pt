import React from "react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { I18nProvider } from "@/i18n/context";
import HeaderNav, { navTabIds } from "@/components/HeaderNav";
import HomeTab from "@/components/HomeTab";
import FaqTab from "@/components/FaqTab";
import QuizTab from "@/components/QuizTab";
import DoubtsTab from "@/components/DoubtsTab";
import ResourcesTab from "@/components/ResourcesTab";
import PodcastTab from "@/components/PodcastTab";
import MythBusterGame from "@/components/MythBusterGame";
import MenstrualCycleSim from "@/components/MenstrualCycleSim";
import GlossaryTab from "@/components/GlossaryTab";
import ToolsTab from "@/components/ToolsTab";
import ContraceptiveComparator from "@/components/ContraceptiveComparator";
import RightsTab from "@/components/RightsTab";
import ResourcesInPortugal from "@/components/ResourcesInPortugal";
import RelationshipsConsentTool from "@/components/RelationshipsConsentTool";
import StiTestingGuideTool from "@/components/StiTestingGuideTool";
import AudioPlayer from "@/components/AudioPlayer";
import GlobalSearchModal from "@/components/GlobalSearchModal";
import BookmarksModal from "@/components/BookmarksModal";
import AudioTranscriptModal from "@/components/AudioTranscriptModal";
import FontSizeControls from "@/components/FontSizeControls";
import StepByStepGuides from "@/components/StepByStepGuides";
import StitchLayout from "@/components/StitchLayout";
import QuickExitButton from "@/components/QuickExitButton";
import { translations } from "@/i18n/all-translations";
import { Audience, TabId } from "@/types";
import { Episode } from "@/types";

const t = translations.pt;

function mount(ui: React.ReactNode) {
  return render(<I18nProvider>{ui}</I18nProvider>);
}

// jsdom não calcula estilos reais, pelo que a regra de contraste de cor
// (WCAG 1.4.3) não é fiável aqui — já coberta por src/__tests__/lib/contrast.test.ts.
const axeOptions = {
  rules: {
    "color-contrast": { enabled: false },
  },
};

// Wrapper que fornece as props de estado que a página normalmente injeta
// nos tabs presentacionais via DoubtsProvider / PodcastProvider.
function DoubtsWrapper() {
  const [questionForm, setQuestionForm] = React.useState({ name: "", question: "" });
  const [submitted, setSubmitted] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);
  return (
    <DoubtsTab
      audience="jovens"
      submitted={submitted}
      setSubmitted={setSubmitted}
      questionForm={questionForm}
      setQuestionForm={setQuestionForm}
      isSending={isSending}
      setIsSending={setIsSending}
    />
  );
}

function PodcastWrapper() {
  const [episodes, setEpisodes] = React.useState<Episode[]>([]);
  const [podcastLoading, setPodcastLoading] = React.useState(false);
  const [playingEpisode, setPlayingEpisode] = React.useState<Episode | null>(null);
  return (
    <PodcastTab
      episodes={episodes}
      setEpisodes={setEpisodes}
      podcastLoading={podcastLoading}
      setPodcastLoading={setPodcastLoading}
      playingEpisode={playingEpisode}
      setPlayingEpisode={setPlayingEpisode}
    />
  );
}

beforeAll(() => {
  if (typeof globalThis.fetch === "undefined") {
    globalThis.fetch = jest.fn(() =>
      Promise.resolve({ ok: true, json: async () => ({ episodes: [] }) })
    ) as unknown as typeof fetch;
  }
});

describe("Auditoria de acessibilidade WCAG 2.1 (jest-axe)", () => {
  it("HeaderNav não tem violações de acessibilidade", async () => {
    const { container } = mount(
      <div>
        <HeaderNav
          activeTab="home"
          setActiveTab={jest.fn()}
          locale="pt"
          setLocale={jest.fn()}
          darkMode={false}
          toggleDarkMode={jest.fn()}
          setShowAudienceSelector={jest.fn()}
          mobileMenuOpen={false}
          setMobileMenuOpen={jest.fn()}
          t={t}
        />
        <main id="main-content" />
      </div>
    );
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("HomeTab (jovens) não tem violações de acessibilidade", async () => {
    const { container } = mount(<HomeTab audience="jovens" setActiveTab={jest.fn()} />);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("FaqTab não tem violações de acessibilidade", async () => {
    const { container } = mount(<FaqTab />);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("QuizTab não tem violações de acessibilidade", async () => {
    const { container } = mount(<QuizTab audience="jovens" />);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("DoubtsTab não tem violações de acessibilidade", async () => {
    const { container } = mount(<DoubtsWrapper />);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("ResourcesTab não tem violações de acessibilidade", async () => {
    const { container } = mount(<ResourcesTab audience="jovens" />);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("PodcastTab não tem violações de acessibilidade", async () => {
    const { container } = mount(<PodcastWrapper />);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("HomeTab em todas as audiences (crianças/jovens/adultos) sem violações", async () => {
    const audiences: Audience[] = ["criancas", "jovens", "adultos"];
    for (const audience of audiences) {
      const { container, unmount } = mount(<HomeTab audience={audience} setActiveTab={jest.fn()} />);
      expect(await axe(container, axeOptions)).toHaveNoViolations();
      unmount();
    }
    expect(navTabIds.length).toBeGreaterThan(0);
  });

  it("MythBusterGame não tem violações de acessibilidade", async () => {
    const { container } = mount(<MythBusterGame onBookmark={jest.fn()} isBookmarked={jest.fn()} />);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("MenstrualCycleSim não tem violações de acessibilidade", async () => {
    const { container } = mount(<MenstrualCycleSim />);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("GlossaryTab não tem violações de acessibilidade", async () => {
    const { container } = mount(<GlossaryTab onBookmark={jest.fn()} isBookmarked={jest.fn()} />);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("ToolsTab não tem violações de acessibilidade", async () => {
    const onBookmark = jest.fn();
    const isBookmarked = jest.fn().mockReturnValue(false);
    const { container } = mount(<ToolsTab onBookmark={onBookmark} isBookmarked={isBookmarked} />);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("ContraceptiveComparator não tem violações de acessibilidade", async () => {
    const onBookmark = jest.fn();
    const isBookmarked = jest.fn().mockReturnValue(false);
    const { container } = mount(<ContraceptiveComparator onBookmark={onBookmark} isBookmarked={isBookmarked} />);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("RightsTab não tem violações de acessibilidade", async () => {
    const onBookmark = jest.fn();
    const isBookmarked = jest.fn().mockReturnValue(false);
    const { container } = mount(<RightsTab onBookmark={onBookmark} isBookmarked={isBookmarked} />);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("ResourcesInPortugal não tem violações de acessibilidade", async () => {
    const { container } = mount(<ResourcesInPortugal audience="jovens" />);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("RelationshipsConsentTool não tem violações de acessibilidade", async () => {
    const onBookmark = jest.fn();
    const isBookmarked = jest.fn().mockReturnValue(false);
    const { container } = mount(<RelationshipsConsentTool onBookmark={onBookmark} isBookmarked={isBookmarked} />);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("StiTestingGuideTool não tem violações de acessibilidade", async () => {
    const onBookmark = jest.fn();
    const isBookmarked = jest.fn().mockReturnValue(false);
    const { container } = mount(<StiTestingGuideTool onBookmark={onBookmark} isBookmarked={isBookmarked} />);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("AudioPlayer não tem violações de acessibilidade", async () => {
    const { container } = mount(
      <AudioPlayer
        src="/audio/MP3/test.mp3"
        title="Teste de Áudio"
        fallbackText="O teu navegador não suporta áudio."
        textToRead="Texto para leitura"
      />
    );
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("GlobalSearchModal não tem violações de acessibilidade", async () => {
    const { container } = mount(
      <GlobalSearchModal
        isOpen={true}
        onClose={jest.fn()}
        onNavigateTab={jest.fn()}
      />
    );
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("BookmarksModal não tem violações de acessibilidade", async () => {
    const { container } = mount(
      <BookmarksModal
        isOpen={true}
        onClose={jest.fn()}
        bookmarks={[]}
        onRemoveBookmark={jest.fn()}
        onNavigateTab={jest.fn()}
      />
    );
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("AudioTranscriptModal não tem violações de acessibilidade", async () => {
    const episode: Episode = {
      title: "Episódio Teste",
      description: "Descrição do episódio teste.",
      link: "https://example.com/1",
      pubDate: "2026-01-01",
      duration: "10:00",
      episode: 1,
      season: 1,
      image: null,
      audioUrl: "https://example.com/1.mp3",
      guid: "guid-1",
    };
    const { container } = mount(
      <AudioTranscriptModal episode={episode} onClose={jest.fn()} />
    );
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("FontSizeControls não tem violações de acessibilidade", async () => {
    const { container } = mount(<FontSizeControls />);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("StepByStepGuides não tem violações de acessibilidade", async () => {
    const { container } = mount(<StepByStepGuides />);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("StitchLayout não tem violações de acessibilidade", async () => {
    const { container } = mount(
      <StitchLayout htmlUrl="https://example.com" onClose={jest.fn()} />
    );
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("QuickExitButton não tem violações de acessibilidade", async () => {
    const { container } = mount(<QuickExitButton />);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
