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
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC6mgqOTKsu7HrisWvZBxnt0gV9ACKg91GHnt1rRvEZ0yblbWqX7aTJ7EYNvplqZqcR1Jdst5Izw8DXjBGNCLS642-4vyUQJ5tbz9SUCzi6EfqvXyC06WA-6B9Q_AWIzEnaduuptaC6a3SkjTCW5pih-p_L9mX72P3guHP9-3NRdZGL36OqGfPC54gmSggPrmnarVWR7dq0Q8ocIvFDSi7t_kM7LgdlYReI9MLLyaKuXnRaeyxqzxw5N1UMoxv0pXVw1w0M8YrKkEM ",
    },
  ];

  return (
    <>
      <NavigationPanel className="create-page">
        <div>11111111</div>
      </NavigationPanel>
      <div className="px-40 flex flex-1 justify-center py-5 h-screen">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight min-w-72">
              Создание нового квиза
            </p>
          </div>
          <h3 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
            Выберите методо создания
          </h3>
          {cards.map((card, index) => (
            <div key={index} className="p-4">
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
      <Footer></Footer>
    </>
  );
}
