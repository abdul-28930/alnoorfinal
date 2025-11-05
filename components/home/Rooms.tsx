import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../../index.module.css";
import {
  FaBed,
  FaBath,
  FaWifi,
  FaSnowflake,
  FaElevator,
  FaBellConcierge,
  FaShirt,
  FaNewspaper,
  FaTv,
  FaFire,
} from "react-icons/fa6";
import { FaParking } from "react-icons/fa";
import { MdCleaningServices, MdSmokeFree } from "react-icons/md";
import { GiHairStrands, GiWaterDrop, GiTeapot } from "react-icons/gi";
// REMOVED: import CorporateSection from "./corporate";

// Enhanced Room Data type with more details
interface RoomData {
  title: string;
  image: string;
  bathCount: number;
  bedCount: number;
  hasWifi: boolean;
  description: string;
  pricePerNight: number;
  featured?: boolean;
  amenities: string[];
  inclusions: string[];
}

// Map amenity names to icons
const amenityIcons: Record<string, JSX.Element> = {
  Fridge: <FaSnowflake />,
  Lift: <FaElevator />,
  "Wi-Fi": <FaWifi />,
  "Free Parking": <FaParking />,
  "24×7 Room Service": <FaBellConcierge />,
  "Laundry(PAID)": <FaShirt />,
  "Power Backup": <FaFire />,
  Newspaper: <FaNewspaper />,
  Housekeeping: <MdCleaningServices />,
  "Hair Conditioning": <GiHairStrands />,
  "Smoke Detector": <MdSmokeFree />,
  TV: <FaTv />,
  "Electric Kettle": <GiTeapot />,
  Toiletries: <GiWaterDrop />,
};

// Branch data
interface BranchData {
  name: string;
  phone: string;
  email: string;
}

const branches: BranchData[] = [
  {
    name: "Triplicane Branch",
    phone: "7338944222",
    email: "booking@alnoorpalace.in",
  },
  {
    name: "Parrys Branch",
    phone: "7338944222",
    email: "booking@alnoorpalace.in",
  },
  {
    name: "Electronic City Branch",
    phone: "7338944222",
    email: "booking@alnoorpalace.in",
  },
  {
    name: "Hyderabad Branch",
    phone: "7338944222",
    email: "booking@alnoorpalace.in",
  },
  {
    name: "Koramangala Branch",
    phone: "7338944222",
    email: "booking@alnoorpalace.in",
  },
  {
    name: "Ooty Branch",
    phone: "7338944222",
    email: "booking@alnoorpalace.in",
  },
  {
    name: "Koyambedu Branch",
    phone: "7338944222",
    email: "booking@alnoorpalace.in",
  },
];

// Define common amenities and default rooms
const commonAmenities = [
  "Fridge",
  "Power Backup",
  "Free Parking",
  "Newspaper",
  "Wi-Fi",
  "Housekeeping",
];

const defaultRooms: RoomData[] = [
  {
    title: "Deluxe",
    image: "/Images/room-1 1.png",
    bathCount: 1,
    bedCount: 1,
    hasWifi: true,
    description:
      "Our cozy Deluxe room offers comfort and convenience for your stay.",
    pricePerNight: 799,
    amenities: commonAmenities,
    inclusions: ["TV", "Electric Kettle", "Toiletries"],
  },
  {
    title: "Deluxe Triple ",
    image: "/Images/room-1 1.png",
    bathCount: 1,
    bedCount: 3,
    hasWifi: true,
    description: "Perfect for families or small groups.",
    pricePerNight: 1500,
    amenities: commonAmenities,
    inclusions: ["TV", "Electric Kettle", "Toiletries"],
  },
  {
    title: "Deluxe Quad",
    image: "/Images/room-1 1.png",
    bathCount: 1,
    bedCount: 4,
    hasWifi: true,
    description: "Our Deluxe Quad room provides ample space for four guests.",
    pricePerNight: 2000,
    amenities: commonAmenities,
    inclusions: ["TV", "Electric Kettle", "Toiletries"],
  },
  {
    title: "King Suite",
    image: "/Images/room-1 1.png",
    bathCount: 1,
    bedCount: 2,
    hasWifi: true,
    description: "Experience luxury in our King Suite.",
    pricePerNight: 2500,
    featured: true,
    amenities: commonAmenities,
    inclusions: ["TV", "Electric Kettle", "Toiletries"],
  },
  {
    title: "Residential Suite",
    image: "/Images/room-1 1.png",
    bathCount: 2,
    bedCount: 3,
    hasWifi: true,
    description:
      "Our premium Residential Suite offers home-away-from-home experience.",
    pricePerNight: 3000,
    featured: true,
    amenities: commonAmenities,
    inclusions: ["TV", "Electric Kettle", "Toiletries"],
  },
];

// Booking form data interface
interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  branch: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfDays: number;
  additionalQuery: string;
}

interface RoomsProps {
  rooms?: RoomData[];
  onBookNow?: (room: RoomData) => void;
}

const Rooms: React.FC<RoomsProps> = ({ rooms = defaultRooms, onBookNow }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<RoomData | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [currentView, setCurrentView] = useState<'branches' | 'rooms'>('branches');
  const [selectedBranchName, setSelectedBranchName] = useState<string | null>(null);
  const [filterCity, setFilterCity] = useState<string>("");
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    phone: "",
    email: "",
    branch: "Triplicane Branch",
    checkInDate: "",
    checkOutDate: "",
    numberOfDays: 1,
    additionalQuery: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<BookingFormData>>({});
  const modalRef = useRef<HTMLDivElement>(null);
  const initRef = useRef<boolean>(false);

  // Branch data for selection
  const branchesList = [
    { name: "Triplicane", city: "Chennai", displayName: "Triplicane Branch" },
    { name: "Parrys", city: "Chennai", displayName: "Parrys Branch" },
    { name: "Electronic City", city: "Bengaluru", displayName: "Electronic City Branch" },
    { name: "Hyderabad", city: "Hyderabad", displayName: "Hyderabad Branch" },
    { name: "Koramangala", city: "Bengaluru", displayName: "Koramangala Branch" },
    { name: "Ooty", city: "Ooty", displayName: "Ooty Branch" },
    { name: "Koyambedu", city: "Chennai", displayName: "Koyambedu Branch" }
  ];

  // Unique cities for filter dropdown
  const cities = Array.from(new Set(branchesList.map(b => b.city)));

  // Branch-specific room types mapping
  const branchRoomTypesMap: Record<string, { name: string; price: number; features: string[] }[]> = {
    "Triplicane Branch": [
      { name: "Deluxe", price: 899, features: ["1 Bed", "1 Bath", "Max 2 Pax"] },
      { name: "Quadruple", price: 1999, features: ["2 Beds", "1 Bath", "Max 5 Pax"] },
      { name: "Suite", price: 2999, features: ["1 Bed", "1 Bath", "Max 2 Pax"] },
      { name: "Triple", price: 1499, features: ["2 Beds", "1 Bath", "Max 3 Pax"] }
    ],
    "Parrys Branch": [
      { name: "Deluxe", price: 1499, features: ["2 Beds", "2 Baths", "Max 4 Pax"] },
      { name: "Standard", price: 799, features: ["1 Bed", "1 Bath", "Max 2 Pax"] }
    ],
    "Electronic City Branch": [
      { name: "Deluxe", price: 899, features: ["1 Bed", "1 Bath", "Max 2 Pax"] },
      { name: "Deluxe Fam", price: 1999, features: ["2 Beds", "1 Bath", "Max 4 Pax"] },
      { name: "Deluxe Twin", price: 1499, features: ["2 Beds", "1 Bath", "Max 3 Pax"] }
    ],
    "Hyderabad Branch": [
      { name: "Classic", price: 899, features: ["1 Bed", "1 Bath", "Max 2 Pax"] },
      { name: "Deluxe", price: 1499, features: ["1 Bed", "1 Bath", "Max 2 Pax"] },
      { name: "Suite", price: 1999, features: ["1 Bed", "1 Bath", "Max 2 Pax"] }
    ],
    "Koramangala Branch": [
      { name: "Deluxe Double", price: 899, features: ["1 Bed", "1 Bath", "Max 2 Pax"] },
      { name: "Deluxe Twin", price: 1499, features: ["2 Beds", "1 Bath", "Max 3 Pax"] },
      { name: "Junior Suite", price: 1999, features: ["1 Bed", "1 Bath", "Max 2 Pax"] }
    ],
    "Ooty Branch": [
      { name: "Deluxe", price: 1499, features: ["2 Beds", "2 Baths", "Max 4 Pax"] },
      { name: "Standard", price: 899, features: ["1 Bed", "1 Bath", "Max 2 Pax"] }
    ],
    "Koyambedu Branch": [
      { name: "Deluxe", price: 899, features: ["1 Bed", "1 Bath", "Max 2 Pax"] },
      { name: "Deluxe Quad", price: 1999, features: ["2 Beds", "1 Bath", "Max 4 Pax"] }
    ]
  };

  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Removed auto-scrolling to prevent page jump when opening the form

  // Calculate number of days between check-in and check-out dates
  useEffect(() => {
    if (formData.checkInDate && formData.checkOutDate) {
      const checkIn = new Date(formData.checkInDate);
      const checkOut = new Date(formData.checkOutDate);
      const timeDiff = checkOut.getTime() - checkIn.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (daysDiff > 0) {
        setFormData((prev) => ({ ...prev, numberOfDays: daysDiff }));
      }
    }
  }, [formData.checkInDate, formData.checkOutDate]);

  // Format price with comma separators
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Get amenity icon or default to text
  const getAmenityIcon = (amenity: string) => {
    return amenityIcons[amenity] || null;
  };

  // Handle view details button click
  const handleViewDetails = (index: number) => {
    if (flippedIndex === index) {
      setFlippedIndex(null);
    } else {
      setFlippedIndex(index);
    }
  };

  // Handle branch selection
  const handleBranchSelect = (branchDisplayName: string) => {
    setSelectedBranchName(branchDisplayName);
    setCurrentView('rooms');
    // Update URL query for browser history/back support
    const nextQuery = { ...router.query, branch: branchDisplayName } as Record<string, string>;
    router.push({ pathname: router.pathname, query: nextQuery }, undefined, { shallow: true });
  };

  // Handle room type selection from branch rooms
  const handleRoomTypeSelect = (roomName: string, roomPrice: number) => {
    // Create a RoomData object from selected room type
    const roomData: RoomData = {
      title: roomName,
      image: "/Images/room-1 1.png",
      bathCount: 1,
      bedCount: 1,
      hasWifi: true,
      description: `Premium ${roomName} room at ${selectedBranchName}`,
      pricePerNight: roomPrice,
      amenities: commonAmenities,
      inclusions: ["TV", "Electric Kettle", "Toiletries"]
    };
    handleBookNow(roomData);
  };

  // Sync component state with URL (browser back/forward)
  useEffect(() => {
    const q = router.query as Record<string, string | string[] | undefined>;
    const branchParam = typeof q.branch === 'string' ? q.branch : undefined;
    if (branchParam) {
      if (currentView !== 'rooms' || selectedBranchName !== branchParam) {
        setSelectedBranchName(branchParam);
        setCurrentView('rooms');
      }
    } else {
      if (currentView !== 'branches') {
        setCurrentView('branches');
        setSelectedBranchName(null);
      }
    }
  }, [router.query]);

  // On initial load, always clear branch query so refresh lands on home
  useEffect(() => {
    if (!router.isReady || initRef.current) return;
    initRef.current = true;
    if ((router.query as any)?.branch) {
      router.replace({ pathname: router.pathname }, undefined, { shallow: true });
      setCurrentView('branches');
      setSelectedBranchName(null);
    }
  }, [router.isReady]);

  // Handle book now button click
  const handleBookNow = (room: RoomData) => {
    setSelectedRoom(room);
    setShowBookingForm(true);
    setFormSubmitted(false);

    // Reset form data
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

    setFormData({
      name: "",
      phone: "",
      email: "",
      branch: selectedBranchName || "Triplicane Branch",
      checkInDate: formatDateForInput(tomorrow),
      checkOutDate: formatDateForInput(dayAfterTomorrow),
      numberOfDays: 1,
      additionalQuery: "",
    });

    // If an external onBookNow function is provided, call it
    if (onBookNow) {
      onBookNow(room);
    }
  };

  // Format date for input field (YYYY-MM-DD)
  const formatDateForInput = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field if it exists
    if (formErrors[name as keyof BookingFormData]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors: Partial<BookingFormData> = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      errors.phone = "Please enter a valid 10-digit phone number";
    }

    // Email validation - only validate if email is provided (since it's optional)
    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.checkInDate) {
      errors.checkInDate = "Check-in date is required";
    }

    if (!formData.checkOutDate) {
      errors.checkOutDate = "Check-out date is required";
    } else if (
      new Date(formData.checkOutDate) <= new Date(formData.checkInDate)
    ) {
      errors.checkOutDate = "Check-out date must be after check-in date";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
 
    if(isSubmitting)return // Prevent multiple submissions


    setIsSubmitting(true); // Set submitting state


try{
    if (validateForm()) {
      // Here you would typically send the data to your backend
      // For now, we'll just simulate a successful submission
      console.log("Form submitted:", formData);
      console.log("Selected room:", selectedRoom);
console.log("Branch",formData.branch);

      try {
        const response = await fetch("/api/send-booking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            room_type: selectedRoom?.title,
            name: formData.name,
            phone: formData.phone,
            email: formData.email || "N/A",
            branch: formData.branch,
            checkin: formData.checkInDate,
            checkout: formData.checkOutDate,
            days: formData.numberOfDays,
            query: formData.additionalQuery || "None",
          }),
        });
      
        if (response.ok) {
          setFormSubmitted(true);
          setTimeout(() => setShowBookingForm(false), 3000);
        } else {
          alert("❌ Failed to send booking email. Please try again.");
        }
      } catch (error) {
        console.error("❌ API Error:", error);
        alert("Something went wrong. Please try again later.");
      }


      // In a real implementation, you would send this data to your backend
      const emailBody = `
        Booking Details:
        ----------------
        Room Type: ${selectedRoom?.title}
        Guest Name: ${formData.name}
        Phone: ${formData.phone}
        Email: ${formData.email}
        Branch: ${formData.branch}
        Check-in Date: ${formData.checkInDate}
        Check-out Date: ${formData.checkOutDate}
        Number of Days: ${formData.numberOfDays}
        Room Rate: ₹${selectedRoom?.pricePerNight}/night
        Total Amount: ₹${
          (selectedRoom?.pricePerNight || 0) * formData.numberOfDays
        }
        Additional Query: ${formData.additionalQuery || "None"}
      `;

      console.log("Email body:", emailBody);

      // Close the form after 3 seconds
      setTimeout(() => {
        setShowBookingForm(false);
      }, 3000);
    }
  }catch(error){
  console.error("Error submitting form:", error);
  alert("Something went wrong. Please try again later.");
  }finally{
    setIsSubmitting(false); // Reset submitting state
  }
  };

  return (
    <section className={`${styles.roomsSection} fade-in-element`} id="rooms">
      <div className={styles.sectionHeader}>
        <Image
          className={styles.sectionDivider}
          width={51}
          height={2}
          alt=""
          src="/Icons/Line 4.svg"
        />
        <h2 className={styles.sectionTitle}>Our Luxury Rooms</h2>
        <Image
          className={styles.sectionDivider}
          width={51}
          height={2}
          alt=""
          src="/Icons/Line 3.svg"
        />
      </div>
      <h3 className={styles.subHeading}>
        <span>More than </span>
        <span className={styles.accentText}>75+ ROOMS</span>
        <span> available across 7 branches</span>
      </h3>

      {currentView === 'branches' && (
        <>
          <div style={{ maxWidth: '1200px', margin: '0 auto 1rem', display: 'flex', justifyContent: 'flex-end' }}>
            <label htmlFor="cityFilter" style={{ marginRight: '8px', color: '#555' }}>Filter by city:</label>
            <select
              id="cityFilter"
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              style={{ padding: '8px 10px', border: '1px solid #ddd', borderRadius: 6 }}
            >
              <option value="">All</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className={styles.branchGrid}>
          {(filterCity ? branchesList.filter(b => b.city === filterCity) : branchesList).map((branch, index) => (
            <div
              key={index}
              className={`${styles.flipCard} ${styles.branchCard} ${styles.popIn} ${styles.cardFadeIn} ${isLoading ? styles.shimmer : ""}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleBranchSelect(branch.displayName)}
            >
              <div className={`${styles.flipCardFront} ${styles.branchCardFront}`}>
                <Image
                  className={styles.roomImage}
                  src="/Images/room-1 1.png"
                  alt={branch.name}
                  width={400}
                  height={180}
                />
                <div className={`${styles.cardTitle} ${styles.branchCardTitle}`}>
                  <div>
                    <div className={styles.branchAreaLabel}>Area name</div>
                    <div className={styles.branchAreaValue}>{branch.name}</div>
                  </div>
                </div>
                <p className={styles.branchCity}>{branch.city}</p>
                <button className={styles.viewDetailsBtn}>
                  View Rooms
                </button>
              </div>
            </div>
          ))}
          </div>
        </>
      )}

      {currentView === 'rooms' && selectedBranchName && (
        <>
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <button 
              type="button"
              onClick={() => {
                // Remove query param so browser back navigates correctly
                const nextQuery = { ...router.query } as Record<string, string | string[]>;
                delete nextQuery.branch;
                router.push({ pathname: router.pathname, query: nextQuery }, undefined, { shallow: true });
                setCurrentView('branches');
                setSelectedBranchName(null);
              }}
              style={{ padding: '0.5rem 1rem', background: '#e8a345', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              ← Back to Branches
            </button>
            <h4 style={{ marginTop: '1rem', color: '#333' }}>Rooms at {selectedBranchName}</h4>
          </div>
          <div className={styles.roomsGrid}>
            {branchRoomTypesMap[selectedBranchName]?.map((roomType, index) => (
              <div
                key={index}
                className={`${styles.flipCard} ${styles.popIn} ${styles.cardFadeIn} ${isLoading ? styles.shimmer : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleRoomTypeSelect(roomType.name, roomType.price)}
              >
                <div className={`${styles.flipCardFront} ${styles.roomCardFront}`}>
                  <Image
                    className={styles.roomImage}
                    src="/Images/room-1 1.png"
                    alt={roomType.name}
                    width={400}
                    height={180}
                  />
                  <div className={`${styles.cardTitle} ${styles.roomCardTitle}`}>
                    <h3>{roomType.name}</h3>
                    <p className={styles.cardPrice}>₹{formatPrice(roomType.price)} onwards</p>
                  </div>
                  <div className={`${styles.amenitiesGrid} ${styles.roomCardAmenities}`}>
                    {roomType.features.map((feature, idx) => (
                      <span key={idx}>{feature}</span>
                    ))}
                  </div>
                  <button className={styles.viewDetailsBtn}>
                    Select Room
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* REMOVED: Corporate Section component from here */}

      {/* Booking Form Modal - With scroll behavior */}
      {showBookingForm && selectedRoom && (
        <>
          <div
            className={styles.modalOverlay}
            onClick={() => !formSubmitted && setShowBookingForm(false)}
          />
          <div ref={modalRef} className={`${styles.modal} ${styles.modalCompact}`}>
            {formSubmitted ? (
              <div className={styles.successMessage}>
                <h3>Thank You!</h3>
                <p>
                  Your booking request for {selectedRoom.title} has been
                  submitted successfully.
                </p>
                <p>We will contact you shortly to confirm your reservation.</p>
              </div>
            ) : (
              <>
                <button
                  className={styles.closeModalBtn}
                  onClick={() => setShowBookingForm(false)}
                >
                  ×
                </button>
                <h3>Book {selectedRoom.title}</h3>
                <p className={styles.bookingPrice}>
                  ₹{formatPrice(selectedRoom.pricePerNight)} onwards per night
                </p>

                <form
                  onSubmit={handleSubmitForm}
                  className={`${styles.bookingForm} ${styles.bookingFormCompact}`}
                >
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={formErrors.name ? styles.inputError : ""}
                      required
                    />
                    {formErrors.name && (
                      <span className={styles.errorText}>
                        {formErrors.name}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={formErrors.phone ? styles.inputError : ""}
                      required
                    />
                    {formErrors.phone && (
                      <span className={styles.errorText}>
                        {formErrors.phone}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email Address (Optional)</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={formErrors.email ? styles.inputError : ""}
                    />
                    {formErrors.email && (
                      <span className={styles.errorText}>
                        {formErrors.email}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="branch">Select Branch *</label>
                    <select
                      id="branch"
                      name="branch"
                      value={formData.branch}
                      onChange={handleInputChange}
                      required
                    >
                      {branches.map((branch, index) => (
                        <option key={index} value={branch.name}>
                          {branch.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={`${styles.formRow} ${styles.fullWidth}`}>
                    <div className={styles.formGroup}>
                      <label htmlFor="checkInDate">Check-in Date *</label>
                      <input
                        type="date"
                        id="checkInDate"
                        name="checkInDate"
                        value={formData.checkInDate}
                        onChange={handleInputChange}
                        className={
                          formErrors.checkInDate ? styles.inputError : ""
                        }
                        required
                        min={formatDateForInput(new Date())}
                      />
                      {formErrors.checkInDate && (
                        <span className={styles.errorText}>
                          {formErrors.checkInDate}
                        </span>
                      )}
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="checkOutDate">Check-out Date *</label>
                      <input
                        type="date"
                        id="checkOutDate"
                        name="checkOutDate"
                        value={formData.checkOutDate}
                        onChange={handleInputChange}
                        className={
                          formErrors.checkOutDate ? styles.inputError : ""
                        }
                        required
                        min={formData.checkInDate}
                      />
                      {formErrors.checkOutDate && (
                        <span className={styles.errorText}>
                          {formErrors.checkOutDate}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label htmlFor="additionalQuery">
                      Additional Requests or Queries
                    </label>
                    <textarea
                      id="additionalQuery"
                      name="additionalQuery"
                      value={formData.additionalQuery}
                      onChange={handleInputChange}
                      rows={2}
                    />
                  </div>

                  <div className={`${styles.formTotal} ${styles.fullWidth}`}>
                    <span>Total Amount:</span>
                    <span>
                      ₹
                      {formatPrice(
                        selectedRoom.pricePerNight * formData.numberOfDays
                      )}{" "}
                      onwards
                    </span>
                  </div>

                  <div className={`${styles.formButtons} ${styles.fullWidth}`}>
                    <button
                      type="button"
                      className={styles.cancelButton}
                      onClick={() => setShowBookingForm(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                    {isSubmitting?"Sending":"Submit Booking"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default Rooms;
