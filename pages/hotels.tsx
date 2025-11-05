import { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import styles from '../index.module.css';

interface Hotel {
  name: string;
  city: string;
  lat: number;
  lng: number;
  phone?: string;
  description?: string;
  rooms: string[];
  services: string[];
}

const hotels: Hotel[] = [
  {
    name: 'Triplicane',
    city: 'Chennai, Tamil Nadu',
    lat: 13.0665,
    lng: 80.2789,
    phone: '7338944222',
    description: 'Nestled in the heart of Chennai, our Triplicane location offers a perfect blend of traditional charm and modern comfort. Experience authentic South Indian hospitality while enjoying easy access to the city\'s cultural landmarks and business districts.',
    rooms: ['Deluxe', 'Quadruple', 'Suite', 'Triple'],
    services: ['Rooms & Apartment', 'Laundry Services', 'Food & Restaurant', 'Parking', '24 Hours Room Service', 'Power Backup'],
  },
  {
    name: 'Parrys',
    city: 'Chennai, Tamil Nadu',
    lat: 13.0855,
    lng: 80.2822,
    phone: '7338944222',
    description: 'Located in the bustling commercial hub of Parrys, our hotel provides exceptional accommodations for business and leisure travelers. With its prime location near major transportation hubs, guests enjoy seamless connectivity to the entire city.',
    rooms: ['Deluxe', 'Standard'],
    services: ['Rooms & Apartment', 'Laundry Services', 'Food & Restaurant', 'Parking', '24 Hours Room Service', 'Power Backup'],
  },
  {
    name: 'Electronic City',
    city: 'Bengaluru, Karnataka',
    lat: 12.8456,
    lng: 77.6634,
    phone: '7338944222',
    description: 'Situated in Bengaluru\'s thriving tech corridor, our Electronic City branch caters to the modern professional. Enjoy state-of-the-art facilities and premium amenities while being close to major IT parks and corporate offices.',
    rooms: ['Deluxe', 'Deluxe Fam', 'Deluxe Twin'],
    services: ['Rooms & Apartment', 'Laundry Services', 'Food & Restaurant', 'Parking', '24 Hours Room Service', 'Power Backup'],
  },
  {
    name: 'Hyderabad',
    city: 'Hyderabad, Telangana',
    lat: 17.3850,
    lng: 78.4867,
    phone: '7338944222',
    description: 'Discover the perfect balance of luxury and convenience at our Hyderabad location. Whether you\'re visiting for business or exploring the city\'s rich heritage, our hotel offers a comfortable retreat with world-class service and amenities.',
    rooms: ['Classic', 'Deluxe', 'Suite'],
    services: ['Rooms & Apartment', 'Laundry Services', 'Food & Restaurant', 'Parking', '24 Hours Room Service', 'Power Backup'],
  },
  {
    name: 'Koramangala',
    city: 'Bengaluru, Karnataka',
    lat: 12.9352,
    lng: 77.6245,
    phone: '7338944222',
    description: 'Experience premium hospitality in one of Bengaluru\'s most vibrant neighborhoods. Our Koramangala property combines contemporary design with warm service, making it an ideal choice for both business travelers and families seeking a memorable stay.',
    rooms: ['Deluxe Double', 'Deluxe Twin', 'Junior Suite'],
    services: ['Rooms & Apartment', 'Laundry Services', 'Food & Restaurant', 'Parking', '24 Hours Room Service', 'Power Backup'],
  },
  {
    name: 'Ooty',
    city: 'Ooty, Tamil Nadu',
    lat: 11.4102,
    lng: 76.6950,
    phone: '7338944222',
    description: 'Escape to the serene hills of Ooty with our beautifully located property. Surrounded by tea gardens and cool mountain air, this hotel offers a peaceful retreat perfect for relaxation while providing all modern comforts for a delightful stay.',
    rooms: ['Deluxe', 'Standard'],
    services: ['Rooms & Apartment', 'Laundry Services', 'Food & Restaurant', 'Parking', '24 Hours Room Service', 'Power Backup'],
  },
  {
    name: 'Koyambedu',
    city: 'Chennai, Tamil Nadu',
    lat: 13.0665,
    lng: 80.2043,
    phone: '7338944222',
    description: 'Also known as Smart Homes, our Koyambedu location offers modern accommodations in the heart of Chennai. Perfect for both business and leisure travelers seeking comfort and convenience.',
    rooms: ['Deluxe', 'Deluxe Quad'],
    services: ['Rooms & Apartment', 'Laundry Services', 'Food & Restaurant', 'Parking', '24 Hours Room Service', 'Power Backup'],
  },
];

const HotelsPage = () => {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(hotels[0]);
  const [expandedHotelIndex, setExpandedHotelIndex] = useState<number | null>(null);

  return (
    <Layout
      title="Our Hotels - Al Noor Group"
      description="Explore our luxury hotels across India"
    >
      <div className={styles.hotelsPage}>
        <Head>
          <title>Our Hotels - Al Noor Group of Hotels Locations</title>
          <meta
            name="description"
            content="Explore Al Noor Group of Hotels locations: Triplicane Chennai, Parrys Chennai, Electronic City Bengaluru, Hyderabad, Koramangala, Ooty. Premium rooms and services at every branch."
          />
          <meta name="keywords" content="al noor hotels locations, al noor palace hotels, hotels in triplicane chennai, triplicane hotels near me, hotels in parrys chennai, parrys corner hotels, hotels in electronic city bangalore, electronic city hotels near me, hotels in koramangala bangalore, koramangala hotels near me, hotels in koyambedu chennai, koyambedu hotels near bus stand, hotels in hyderabad, hyderabad budget hotels, hotels in ooty, ooty hill station hotels, chennai hotels list, bangalore hotels list, budget hotels chennai, cheap hotels bangalore, affordable hotels hyderabad, hotel branches india, hotel locations india" />
          <link rel="canonical" href="https://alnoorpalace.in/hotels" />
          
          {/* Open Graph Meta Tags */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Our Hotels - Al Noor Group" />
          <meta property="og:description" content="Discover our luxury hotel locations across India" />
          <meta property="og:url" content="https://alnoorpalace.in/hotels" />
          <meta property="og:image" content="https://alnoorpalace.in/Images/Finlogo.png" />
          
          <link rel="icon" href="/Images/Finlogo.png" />
        </Head>

        <div className={styles.hotelsContainer}>
          <h1 className={styles.hotelsTitle}>Our Hotels</h1>
          <p className={styles.hotelsSubtitle}>
            Discover our luxury accommodations across India
          </p>

          <div className={styles.hotelsGrid}>
            {/* Hotels List */}
            <div className={styles.hotelsList}>
              {hotels.map((hotel, index) => (
                <div key={index}>
                  <div
                    className={`${styles.hotelSidebarItem} ${
                      selectedHotel?.name === hotel.name
                        ? styles.hotelSidebarActive
                        : ''
                    }`}
                    onClick={() => {
                      setSelectedHotel(hotel);
                      setExpandedHotelIndex(expandedHotelIndex === index ? null : index);
                    }}
                    onMouseEnter={() => setSelectedHotel(hotel)}
                  >
                    <div className={styles.hotelIcon}>
                      <img src="/Images/hotel.png" alt="Hotel" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', color: '#333', fontSize: '0.95rem' }}>{hotel.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#666' }}>{hotel.city.split(',')[0]}</div>
                    </div>
                  </div>
                  
                  {/* Mobile Accordion - Details Below Item */}
                  {expandedHotelIndex === index && (
                    <div className={styles.mobileHotelDetails}>
                      <div style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'flex-start', 
                        justifyContent: 'flex-start', 
                        height: 'auto', 
                        color: '#666', 
                        padding: '1.5rem', 
                        marginTop: '0.75rem',
                        background: 'linear-gradient(135deg, #fff5e6 0%, #ffe8cc 100%)',
                        borderRadius: '16px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}>
                        <h3 style={{ marginBottom: '0.5rem', color: '#333', fontSize: '1.5rem', width: '100%', textAlign: 'center' }}>
                          {hotel.name}
                        </h3>
                        <p style={{ color: '#666', marginBottom: '0.5rem', width: '100%', textAlign: 'center' }}>
                          {hotel.city}
                        </p>
                        {hotel.phone && (
                          <p style={{ color: '#666', marginBottom: '1.5rem', width: '100%', textAlign: 'center' }}>
                            📞 {hotel.phone}
                          </p>
                        )}
                        
                        {hotel.description && (
                          <div style={{ width: '100%', marginBottom: '1.5rem', textAlign: 'center' }}>
                            <p style={{ color: '#666', lineHeight: '1.6', fontSize: '0.95rem', padding: '0 1rem' }}>
                              {hotel.description}
                            </p>
                          </div>
                        )}
                        
                        <div style={{ width: '100%', marginBottom: '1.5rem' }}>
                          <h4 style={{ color: '#e8a345', fontSize: '1.2rem', marginBottom: '0.75rem', fontWeight: 'bold', textAlign: 'center' }}>
                            Rooms Available:
                          </h4>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
                            {hotel.rooms.map((room, idx) => (
                              <div key={idx} style={{ 
                                fontSize: '0.95rem', 
                                color: '#666', 
                                padding: '0.75rem', 
                                background: '#fffaf5', 
                                borderRadius: '8px',
                                border: '1px solid rgba(232, 163, 69, 0.2)',
                                boxShadow: '0 4px 8px rgba(232, 163, 69, 0.15)',
                                textAlign: 'center',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                              }}>
                                {room}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div style={{ width: '100%' }}>
                          <h4 style={{ color: '#e8a345', fontSize: '1.2rem', marginBottom: '0.75rem', fontWeight: 'bold', textAlign: 'center' }}>
                            Services:
                          </h4>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem' }}>
                            {hotel.services.map((service, idx) => (
                              <div key={idx} style={{ 
                                fontSize: '0.95rem', 
                                color: '#666', 
                                padding: '0.75rem', 
                                background: '#fffaf5', 
                                borderRadius: '8px',
                                border: '1px solid rgba(232, 163, 69, 0.2)',
                                boxShadow: '0 4px 8px rgba(232, 163, 69, 0.15)',
                                textAlign: 'center',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                              }}>
                                {service}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Hotel Details - Desktop Only */}
            <div className={styles.globeContainer}>
              {selectedHotel ? (
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'flex-start', 
                  justifyContent: 'flex-start', 
                  height: 'auto', 
                  color: '#666', 
                  padding: '2rem', 
                  overflowY: 'auto',
                  background: 'linear-gradient(135deg, #fff5e6 0%, #ffe8cc 100%)',
                  borderRadius: '16px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                  <h3 style={{ marginBottom: '0.5rem', color: '#333', fontSize: '1.8rem', width: '100%', textAlign: 'center' }}>
                    {selectedHotel.name}
                  </h3>
                  <p style={{ color: '#666', marginBottom: '0.5rem', width: '100%', textAlign: 'center' }}>
                    {selectedHotel.city}
                  </p>
                  {selectedHotel.phone && (
                    <p style={{ color: '#666', marginBottom: '1.5rem', width: '100%', textAlign: 'center' }}>
                      📞 {selectedHotel.phone}
                    </p>
                  )}
                  
                  {selectedHotel.description && (
                    <div style={{ width: '100%', marginBottom: '1.5rem', textAlign: 'center' }}>
                      <p style={{ color: '#666', lineHeight: '1.6', fontSize: '0.95rem', padding: '0 1rem' }}>
                        {selectedHotel.description}
                      </p>
                    </div>
                  )}
                  
                  <div style={{ width: '100%', marginBottom: '1.5rem' }}>
                    <h4 style={{ color: '#e8a345', fontSize: '1.2rem', marginBottom: '0.75rem', fontWeight: 'bold', textAlign: 'center' }}>
                      Rooms Available:
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
                      {selectedHotel.rooms.map((room, idx) => (
                        <div key={idx} style={{ 
                          fontSize: '0.95rem', 
                          color: '#666', 
                          padding: '0.75rem', 
                          background: '#fffaf5', 
                          borderRadius: '8px',
                          border: '1px solid rgba(232, 163, 69, 0.2)',
                          boxShadow: '0 4px 8px rgba(232, 163, 69, 0.15)',
                          textAlign: 'center',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}>
                          {room}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div style={{ width: '100%' }}>
                    <h4 style={{ color: '#e8a345', fontSize: '1.2rem', marginBottom: '0.75rem', fontWeight: 'bold', textAlign: 'center' }}>
                      Services:
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem' }}>
                      {selectedHotel.services.map((service, idx) => (
                        <div key={idx} style={{ 
                          fontSize: '0.95rem', 
                          color: '#666', 
                          padding: '0.75rem', 
                          background: '#fffaf5', 
                          borderRadius: '8px',
                          border: '1px solid rgba(232, 163, 69, 0.2)',
                          boxShadow: '0 4px 8px rgba(232, 163, 69, 0.15)',
                          textAlign: 'center',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}>
                          {service}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HotelsPage;


