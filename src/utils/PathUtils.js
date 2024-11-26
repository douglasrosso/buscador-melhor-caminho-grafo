class PathUtils {
  static getInitialInfo() {
    return {
      start: "",
      end: "",
      fuelPrice: "",
      fuelEfficiency: "",
    };
  }
  static getInitialFormErrors() {
    return {
      start: false,
      end: false,
      fuelPrice: false,
      fuelEfficiency: false,
    };
  }

  static isAllFieldsFilled(path, setError) {
    let formError = {
      start: !path.start,
      end: !path.end,
      fuelPrice: !path.fuelPrice || parseFloat(path.fuelPrice) <= 0,
      fuelEfficiency:
        !path.fuelEfficiency || parseFloat(path.fuelEfficiency) <= 0,
    };

    setError(formError);

    return Object.values(formError).includes(true);
  }
}

export default PathUtils;
