/**
 * Официальные документы детского сада.
 *
 * Пока массив пуст, в разделе «Құжаттар» показывается аккуратное пустое состояние.
 * Чтобы добавить документ, положите файл в public/documents/ и допишите объект:
 *
 *   {
 *     title: { kk: "Жарғы", ru: "Устав" },
 *     url: "/documents/ustav.pdf",
 *     kind: "pdf",
 *   },
 *   {
 *     title: { kk: "Лицензия", ru: "Лицензия" },
 *     url: "https://drive.google.com/file/d/.../view",
 *     kind: "link",
 *   },
 */
export type DocumentItem = {
  title: { kk: string; ru: string };
  url: string;
  kind: "pdf" | "link";
};

export const documents: DocumentItem[] = [];
