import { useState, useEffect } from "react";
import CapitalsInput from "./components/CapitalsInput";
import FuelInput from "./components/FuelInput";
import SearchButton from "./components/SearchButton";
import Results from "./components/Results";
import LoadingMessage from "./components/LoadingMessage";
import { StreamProcessor } from "./utils/StreamProcessor";

function App() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");
  const [fuelEfficiency, setFuelEfficiency] = useState("");
  const [capitals, setCapitals] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({
    start: false,
    end: false,
    fuelPrice: false,
    fuelEfficiency: false,
  });

  useEffect(() => {
    const fetchCapitals = async () => {
      const response = await fetch("http://localhost:3000/capitals");
      const data = await response.json();
      setCapitals(data);
    };

    fetchCapitals();
  }, []);

  const hasAnyError = (error) => {
    let formError = {
      start: !start,
      end: !end,
      fuelPrice: !fuelPrice || parseFloat(fuelPrice) <= 0,
      fuelEfficiency: !fuelEfficiency || parseFloat(fuelEfficiency) <= 0,
    };

    setError(formError);

    return Object.values(formError).includes(true);
  };

  const handleSearch = async () => {
    if (hasAnyError) {
      return;
    }

    try {
      setLoading(true);

      const streamProcessor = new StreamProcessor();

      const response = await fetch("http://localhost:3000/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start,
          end,
          fuelPrice: parseFloat(fuelPrice),
          fuelEfficiency: parseFloat(fuelEfficiency),
        }),
      });

      await streamProcessor
        .process(response)
        .then((result) => setResult([...result]));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Caminho Econômico</h1>

      <CapitalsInput
        label="Origem"
        value={start}
        onChange={(e) => setStart(e.target.value)}
        capitalsList={capitals}
        error={error.start}
      />

      <CapitalsInput
        label="Destino"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        capitalsList={capitals}
        error={error.end}
      />

      <FuelInput
        label="Preço do Combustível (R$)"
        value={fuelPrice}
        onChange={(e) => setFuelPrice(e.target.value)}
        placeholder="Digite o preço do combustível"
        error={error.fuelPrice}
      />

      <FuelInput
        label="Autonomia (km/l)"
        value={fuelEfficiency}
        onChange={(e) => setFuelEfficiency(e.target.value)}
        placeholder="Digite a autonomia do veículo"
        error={error.fuelEfficiency}
      />

      <SearchButton onClick={handleSearch} loading={loading} />

      {loading && <LoadingMessage />}

      {result && result.length > 0 && <Results result={result} />}
    </div>
  );
}

export default App;
