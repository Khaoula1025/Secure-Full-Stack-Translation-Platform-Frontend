"use client";
import React, { useState } from "react";
function page() {
    const [text, setText] = useState("");
    const [language, setLanguage] = useState("");
    console.log(language)
    const [translation, setTranslation] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch('api/translate',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({text,language})
    })
    const data= await res.json()
    console.log(data[0])
    setTranslation(data[0].translation_text)

  }
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">Enter texte to translate</label>
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          placeholder="write text"
        />
        <select
          name=""
          id=""
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
          }}
        >
          <option value="en_to_fr">english to french</option>
          <option value="fr_to_en">french to english </option>
        </select>
        <button type='submit'>translate</button>
      </form>
      {translation}
    </div>
  );
}

export default page;
