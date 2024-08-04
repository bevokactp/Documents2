
import { useState, useEffect } from "react";

const db_file_path = "./data/start_datetime.json";

export default function useStartDateTime() {
  const [startDateTimeKolodar, setStartDateTimeKolodar] = useState(null);

  useEffect(() => {
    fetch(db_file_path)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setStartDateTimeKolodar(data.start_datetime);
      })
      .catch((error) =>
        console.error("Error fetching startDateTimeKolodar:", error)
      );
  }, []);

  return startDateTimeKolodar;
}
