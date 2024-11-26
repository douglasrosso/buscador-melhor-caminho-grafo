import { useState, useEffect } from "react";
import CapitalsInput from "./components/CapitalsInput";
import FuelInput from "./components/FuelInput";
import SearchButton from "./components/SearchButton";
import Results from "./components/Results";
import LoadingMessage from "./components/LoadingMessage";
import { StreamProcessor } from "./utils/StreamProcessor";
import Notification from "./components/Notification";
import NoResult from "./components/NoResult";

function App() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");
  const [fuelEfficiency, setFuelEfficiency] = useState("");
  const [capitals, setCapitals] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");

  const [error, setError] = useState({
    start: false,
    end: false,
    fuelPrice: false,
    fuelEfficiency: false,
  });

  useEffect(() => {
    const fetchCapitals = async () => {
      try {
        const response = await fetch("http://localhost:3000/capitals");
        const data = await response.json();
        setCapitals(data);
      } catch {
        setNotification("Erro ao carregar a lista de capitais.");
      }
    };

    fetchCapitals();
  }, []);

  const isAllFieldsFilled = () => {
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
    if (isAllFieldsFilled()) {
      setNotification("Por favor, preencha todos os campos corretamente.");
      return;
    }

    try {
      setLoading(true);
      setNotification("");
      setResult(null);

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

      if (!response.ok) {
        const errorData = await response.json();
        setNotification(errorData.error || "Erro ao calcular o caminho.");
        return;
      }

      await streamProcessor
        .process(response)
        .then((result) => setResult([...result]));
    } catch (e) {
      setNotification("Erro ao se comunicar com o servidor.");
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Caminho Econômico</h1>

      <Notification
        message={notification}
        onClose={() => setNotification("")}
      />

      <CapitalsInput
        label="Origem"
        value={start}
        onChange={(e) => {
          setStart(e.target.value);
          setError((prev) => ({ ...prev, start: false }));
        }}
        capitalsList={capitals}
        error={error.start}
      />

      <CapitalsInput
        label="Destino"
        value={end}
        onChange={(e) => {
          setEnd(e.target.value);
          setError((prev) => ({ ...prev, end: false }));
        }}
        capitalsList={capitals}
        error={error.end}
      />

      <FuelInput
        label="Preço do Combustível (R$)"
        value={fuelPrice}
        onChange={(e) => {
          setFuelPrice(e.target.value);
          setError((prev) => ({ ...prev, fuelPrice: false }));
        }}
        placeholder="Digite o preço do combustível"
        error={error.fuelPrice}
      />

      <FuelInput
        label="Autonomia (km/l)"
        value={fuelEfficiency}
        onChange={(e) => {
          setFuelEfficiency(e.target.value);
          setError((prev) => ({ ...prev, fuelEfficiency: false }));
        }}
        placeholder="Digite a autonomia do veículo"
        error={error.fuelEfficiency}
      />

      <SearchButton onClick={handleSearch} loading={loading} />

      {loading && <LoadingMessage />}
      {result?.length === 0 && <NoResult />}
      {result?.length > 0 && <Results result={result} />}
    </div>
  );
}

export default App;
