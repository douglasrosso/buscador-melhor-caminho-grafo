import LoadingMessage from "./components/LoadingMessage";
import { StreamProcessor } from "./utils/StreamProcessor";
import DataListInput from "./components/DataListInput";
import SearchButton from "./components/SearchButton";
import Notification from "./components/Notification";
import NumberInput from "./components/NumberInput";
import NoResult from "./components/NoResult";
import { useState, useEffect } from "react";
import Results from "./components/Results";
import PathUtils from "./utils/PathUtils";

function App() {
  const [error, setError] = useState(PathUtils.getInitialFormErrors());
  const [path, setPath] = useState(PathUtils.getInitialInfo());
  const [notification, setNotification] = useState("");
  const [loading, setLoading] = useState(false);
  const [capitals, setCapitals] = useState([]);
  const [result, setResult] = useState(null);

  const clearPageState = () => {
    setNotification("");
    setResult(null);
  };

  const handleFieldChanged = (e) => {
    const { name, value } = e.target;

    setPath((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: false }));
  };

  const fetchCapitals = async () => {
    try {
      const response = await fetch("http://localhost:3000/capitals");
      const data = await response.json();
      setCapitals(data);
    } catch {
      setNotification("Erro ao carregar a lista de capitais.");
    }
  };

  const postCalculatePaths = async () => {
    return fetch("http://localhost:3000/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...path,
        fuelPrice: parseFloat(path.fuelPrice),
        fuelEfficiency: parseFloat(path.fuelEfficiency),
      }),
    });
  };

  const handleSearch = async () => {
    if (PathUtils.isAllFieldsFilled(path, setError)) {
      setNotification("Por favor, preencha todos os campos corretamente.");
      return;
    }

    try {
      setLoading(true);
      clearPageState();

      const streamProcessor = new StreamProcessor();

      const response = await postCalculatePaths();

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

  useEffect(() => {
    fetchCapitals();
  }, []);

  return (
    <div className="container">
      <h1>Caminho Econômico</h1>

      <Notification
        message={notification}
        onClose={() => setNotification("")}
      />

      <DataListInput
        label="Origem"
        name="start"
        value={path.start}
        onChange={handleFieldChanged}
        capitalsList={capitals}
        error={error.start}
      />

      <DataListInput
        label="Destino"
        name="end"
        value={path.end}
        onChange={handleFieldChanged}
        capitalsList={capitals}
        error={error.end}
      />

      <NumberInput
        label="Preço do Combustível (R$)"
        name="fuelPrice"
        value={path.fuelPrice}
        onChange={handleFieldChanged}
        placeholder="Digite o preço do combustível"
        error={error.fuelPrice}
      />

      <NumberInput
        label="Autonomia (km/l)"
        name="fuelEfficiency"
        value={path.fuelEfficiency}
        onChange={handleFieldChanged}
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
