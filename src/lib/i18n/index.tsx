"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { kk, type Dict } from "./kk";
import { ru } from "./ru";

export type Lang = "kk" | "ru";

const dicts: Record<Lang, Dict> = { kk, ru };

type Ctx = { lang: Lang; t: Dict; setLang: (l: Lang) => void };

const LangContext = createContext<Ctx>({ lang: "kk", t: kk, setLang: () => {} });

/** Казахский — всегда язык по умолчанию при загрузке; переключение без перезагрузки. */
export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("kk");

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = dicts[lang].meta.title;
  }, [lang]);

  const value = useMemo(() => ({ lang, t: dicts[lang], setLang }), [lang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
