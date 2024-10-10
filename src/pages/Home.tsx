import React, { useState, useEffect } from 'react';
import { IonContent, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import './Home.css';

const AplikasiCuaca: React.FC = () => {
  const [kota, setKota] = useState<string>('Manado');
  const [cuaca, setCuaca] = useState<any>(null);

  const kunciAPI = 'ad73fbd4d6da5e2cbf23761a1acd976a';

  const dapatkanCuaca = async () => {
    if (!kota) return;

    try {
      const respons = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${kota}&units=metric&appid=${kunciAPI}&lang=id`);
      const data = await respons.json();
      setCuaca(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    dapatkanCuaca();
  }, [kota]);

  return (
    <IonContent>
      <div className="weather-app-container">
        {cuaca && (
          <IonCard className="weather-card">
            <div className="input-section">
              <div className="search-box">
                <IonIcon icon={searchOutline} className="search-icon" />
                <IonInput value={kota} placeholder="Cari kota" onIonChange={(e) => setKota(e.detail.value!)} clearInput class="city-input" />
              </div>
            </div>
            <IonCardHeader className="city-header">
              <h3>Cuaca Kota {kota}</h3>
            </IonCardHeader>
            <IonCardContent>
              <div className="weather-icon">
                <img src={`https://openweathermap.org/img/wn/${cuaca.weather[0].icon}@4x.png`} alt="Weather Icon" />
              </div>
              <h1 className="temperature">{Math.round(cuaca.main.temp)}°C</h1>
              <p className="description">{cuaca.weather[0].description}</p>
              <div className="weather-details">
                <div className="detail-box">
                  <p>Angin</p>
                  <p>{cuaca.wind.speed} m/s</p>
                </div>
                <div className="detail-box">
                  <p>Kelembaban</p>
                  <p>{cuaca.main.humidity}%</p>
                </div>
                <div className="detail-box">
                  <p>Jarak Pandang</p>
                  <p>{cuaca.visibility / 1000} km</p>
                </div>
                <div className="detail-box">
                  <p>Arah Angin</p>
                  <p>{cuaca.wind.deg}°</p>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        )}
      </div>
    </IonContent>
  );
};

export default AplikasiCuaca;
