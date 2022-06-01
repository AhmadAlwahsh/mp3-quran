import React, { useState, useEffect } from "react";

const Inputs = ({ reciters, setAudioSrc }) => {
  const [activeRewaya, setActiveRewaya] = useState("حفص عن عاصم");
  const [activeQaree, setActiveQaree] = useState("أحمد الحذيفي");
  const [suraId, setSuraId] = useState("1");

  function count(str, find) {
    return str.split(find).length - 1;
  }

  const fullQuranData = reciters.filter(function (reciter) {
    return reciter.suras.length === 347;
  });

  const rewaya = fullQuranData.filter(function (reciter) {
    return reciter.rewaya === activeRewaya;
  });

  const obj = fullQuranData.filter(function (reciter) {
    return reciter.rewaya === activeRewaya && reciter.name === activeQaree;
  });

  obj.map((e) => console.log(e));
  console.log(obj);
  console.log(rewaya.length);

  const audioSrc = `${obj[0] ? obj[0].Server : null}/${suraId.padStart(3, 0)}.mp3`;

  setAudioSrc(audioSrc);

  // السور

  const [items, setItems] = useState({});

  const fetchItems = async () => {
    const api = await fetch("https://api.alquran.cloud/v1/surah");
    const data = await api.json();

    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <form className="inputs">
      <div>
        <label htmlFor="rewaya">الرواية</label>
        <select
          id="rewaya"
          onChange={(e) => {
            setActiveRewaya(e.target.value);
          }}
        >
          <option>- اختر الرواية -</option>
          <option>حفص عن عاصم</option>
          <option value="شعبة  عن عاصم">شعبة عن عاصم</option>
          <option>قالون عن نافع</option>
          <option>قالون عن نافع من طريق أبي نشيط</option>
          <option>ورش عن نافع</option>
          <option>ورش عن نافع من طريق الأزرق</option>
          <option>ورش عن نافع من طريق أبي بكر الأصبهاني</option>
          <option>الدوري عن أبي عمرو</option>
          <option>السوسي عن أبي عمرو</option>
          <option>البزي عن ابن كثير</option>
          <option>قنبل عن ابن كثير</option>
          <option>البزي وقنبل عن ابن كثير</option>
          <option>خلف عن حمزة</option>
          <option>الدوري عن الكسائي</option>
          <option>ابن ذكوان عن أبي عامر</option>
          <option>قراءة يعقوب الحضرمي بروايتي رويس وروح</option>
        </select>
      </div>
      <div>
        <label htmlFor="qaree">القارئ</label>
        <select
          id="qaree"
          onChange={(e) => {
            setActiveQaree(e.target.value);
          }}
        >
          <option>- اختر القارئ -</option>
          {rewaya.map((qaree) => {
            return <option>{qaree.name}</option>;
          })}
        </select>
      </div>
      <div>
        <label htmlFor="sura">السورة</label>
        <select id="sura" onChange={(e) => setSuraId(e.target.value)}>
          <option>- اختر السورة -</option>
          {items.data
            ? items.data.map(function (e) {
                return <option value={e.number}>{e.name}</option>;
              })
            : null}
        </select>
      </div>
    </form>
  );
};

export default Inputs;
