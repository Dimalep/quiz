import Footer from "../../../shared/components/footer/Footer";
import NavigationPanel from "../../../shared/components/navigation-panel/NavigationPanel";
import QuizCard from "./components/QuizCard";
//Styles
import "./quiz_card_styles.css";

export default function SelectTypeCreation() {
  const cards = [
    {
      title: "Создать в ручную",
      type: 1,
      description:
        "Создайте свой тест с нуля, добавляя вопросы и ответы по отдельности.",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDJeo3EPsxic22nwm3MIHlfd2F4d3dQUzFeQlgKPSuddxu0wxmKWGTbRVPGcQFrDjyJmBJ-l31vPpMr1JVBewSZ99avHu5I1WP1JXjkr0nOSFBdRp6-gNN4_yOZRHTn254bYAM2poMCZW0WSYADb3c2E6dLC8f0tbNBzrC80peNN9iBMAzzjTUve_1435FWulniCe6Jj4zyTigbcdACctX7R_ALlEtBt-3sDMlTBb-C8TRv_eTCs1D6t94Hx_TBVgeS4vsI1rSs0cc ",
    },
    {
      title: "Создать с помощью ИИ",
      type: 2,
      description:
        "Автоматически создайте тест на основе темы или ключевых слов с помощью искусственного интеллекта.",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD-Pm7KO7Y4pFP6pdv3AoKDBom8OItGTs6-miFAhDxacF7mdchJUEpnADvA8d9cJhyyEzf-jKnu59E_a0yhMU-NXy7kBQFpyGrzWPjh27ikKgf1ZOLSwVInzPG9OkRkXa6Aq_RLSuSBEYGBf0bcwN5VlyCgXHCNU5HggwNHoc3fSqidmShJZHNXy2Ctmbget7dCIQn6QUhhEKXYIW0qI4NWV4NZtdmkxLe9U5c04LW3DLT_-Dk-GSQXE_k2mnYuvJkuja_BDUZS7mk ",
    },
    {
      title: "Использовать документы",
      type: 3,
      description:
        "Загрузите документ (например, PDF, DOCX) и позвольте нам извлечь вопросы и ответы для создания теста.",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC6mgqOTKsu7HrisWvZBxnt0gV9ACKg91GHnt1rRvEZ0yblbWqX7aTJ7EYNvplqZqcR1Jdst5Izw8DXjBGNCLS642-4vyUQJ5tbz9SUCzi6EfqvXyC06WA-6B9Q_AWIzEnaduupta6a3SkjTCW5pih-p_L9mX72P3guHP9-3NRdZGL36OqGfPC54gmSggPrmnarVWR7dq0Q8ocIvFDSi7t_kM7LgdlYReI9MLLyaKuXnRaeyxqzxw5N1UMoxv0pXVw1w0M8YrKkEM ",
    },
  ];

  return (
    <div className="quiz-creation-container">
      <NavigationPanel className="create-page">
        <div className="nav-placeholder">Создание квиза</div>
      </NavigationPanel>

      <div className="quiz-creation-content">
        <div className="content-header">
          <h1 className="page-title">Создание нового квиза</h1>
          <h3 className="page-subtitle">Выберите метод создания</h3>
        </div>

        <div className="cards-container">
          {cards.map((card, index) => (
            <div key={index} className="card-wrapper">
              <QuizCard
                title={card.title}
                description={card.description}
                imageUrl={card.imageUrl}
                selectedType={card.type}
              />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
