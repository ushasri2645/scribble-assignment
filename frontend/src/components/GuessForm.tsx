import { useState } from "react";

interface GuessFormProps {
  disabled?: boolean;
}

export function GuessForm({ disabled = false }: GuessFormProps) {
  const [guessText, setGuessText] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="form__field">
        <span>Guess the word</span>
        <input
          className="form__input"
          value={guessText}
          onChange={(event) => setGuessText(event.target.value)}
          placeholder="Placeholder guess"
          disabled={disabled}
        />
      </label>
      <div className="button-row button-row--compact">
        <button className="button button--primary" type="submit" disabled={disabled}>
          Placeholder Submit
        </button>
      </div>
    </form>
  );
}
